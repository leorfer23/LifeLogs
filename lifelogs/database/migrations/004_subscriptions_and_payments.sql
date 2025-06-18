-- LifeLog OS Subscription and Payment Management
-- This migration creates the subscription and billing system

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS usage_logs CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS subscription_plans CASCADE;

-- Create subscription plans table
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Plan details
    name TEXT NOT NULL UNIQUE, -- 'free', 'pro', 'enterprise'
    display_name TEXT NOT NULL, -- 'Free', 'LifeLog Pro', 'Enterprise'
    description TEXT,
    
    -- Pricing
    price_monthly DECIMAL(10,2) NOT NULL DEFAULT 0, -- Monthly price in USD
    price_yearly DECIMAL(10,2), -- Annual price in USD (optional discount)
    
    -- AI Usage limits (per month)
    ai_requests_limit INTEGER NOT NULL DEFAULT 0, -- Number of AI requests
    storage_limit_gb INTEGER NOT NULL DEFAULT 1, -- Storage limit in GB
    embeddings_limit INTEGER NOT NULL DEFAULT 0, -- Vector embeddings limit
    
    -- Features
    features JSONB NOT NULL DEFAULT '{}', -- Feature flags: {"advanced_insights": true, "api_access": false}
    
    -- Integrations
    max_integrations INTEGER NOT NULL DEFAULT 1, -- How many external integrations
    
    -- Sharing and collaboration
    max_shared_entries INTEGER NOT NULL DEFAULT 0, -- How many entries can be shared
    can_collaborate BOOLEAN DEFAULT false, -- Can invite others to collaborate
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_public BOOLEAN DEFAULT true, -- Visible to users for signup
    sort_order INTEGER DEFAULT 0, -- Display order
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    
    -- Subscription details
    status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete', 'paused')) DEFAULT 'active',
    billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'yearly')) DEFAULT 'monthly',
    
    -- Dates
    started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    canceled_at TIMESTAMP WITH TIME ZONE,
    trial_end TIMESTAMP WITH TIME ZONE,
    
    -- Payment provider data
    stripe_subscription_id TEXT UNIQUE, -- Stripe subscription ID
    stripe_customer_id TEXT, -- Stripe customer ID
    
    -- Usage tracking (current period)
    current_ai_requests INTEGER DEFAULT 0,
    current_storage_gb DECIMAL(10,3) DEFAULT 0,
    current_embeddings INTEGER DEFAULT 0,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create payments table for transaction history
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- Payment details
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    status TEXT NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed', 'canceled', 'refunded')),
    
    -- What this payment is for
    billing_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    billing_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    description TEXT, -- Human readable description
    
    -- Payment provider data
    stripe_payment_intent_id TEXT UNIQUE,
    stripe_invoice_id TEXT,
    payment_method TEXT, -- 'card', 'bank_transfer', etc.
    
    -- Failure details
    failure_reason TEXT,
    failure_code TEXT,
    
    -- Dates
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    paid_at TIMESTAMP WITH TIME ZONE,
    refunded_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create usage logs for tracking AI usage
CREATE TABLE usage_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
    
    -- Usage details
    usage_type TEXT NOT NULL CHECK (usage_type IN (
        'ai_request', 'embedding_generation', 'storage_used', 'integration_sync'
    )),
    
    -- Quantities
    quantity DECIMAL(10,3) NOT NULL DEFAULT 1, -- Amount used (requests, GB, etc.)
    cost_usd DECIMAL(10,4), -- Cost in USD (if using app's APIs)
    
    -- Context
    resource_type TEXT, -- 'entry', 'attachment', 'insight', etc.
    resource_id UUID, -- ID of the related resource
    provider TEXT, -- 'openai', 'anthropic', 'google', 'user_api'
    model_used TEXT, -- Specific model used
    
    -- Request details for AI usage
    input_tokens INTEGER, -- For language models
    output_tokens INTEGER, -- For language models
    
    -- Metadata
    metadata JSONB DEFAULT '{}', -- Additional context
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default subscription plans
INSERT INTO subscription_plans (
    name, display_name, description, 
    price_monthly, price_yearly,
    ai_requests_limit, storage_limit_gb, embeddings_limit,
    features, max_integrations, max_shared_entries, can_collaborate
) VALUES 
-- Free Plan
(
    'free',
    'LifeLog Free',
    'Get started with basic life logging features',
    0.00, 0.00,
    50, 1, 100, -- 50 AI requests, 1GB storage, 100 embeddings
    '{"export": false, "advanced_insights": false, "api_access": false}',
    1, 5, false
),
-- Pro Plan  
(
    'pro',
    'LifeLog Pro',
    'Unlimited life logging with advanced AI insights',
    9.99, 99.00, -- $9.99/month, $99/year (2 months free)
    -1, 50, -1, -- Unlimited AI requests and embeddings, 50GB storage
    '{"export": true, "advanced_insights": true, "api_access": true, "priority_support": true}',
    5, -1, true -- 5 integrations, unlimited sharing, collaboration
),
-- Enterprise Plan
(
    'enterprise', 
    'LifeLog Enterprise',
    'For teams and organizations with advanced needs',
    29.99, 299.00,
    -1, 500, -1, -- Unlimited AI, 500GB storage
    '{"export": true, "advanced_insights": true, "api_access": true, "priority_support": true, "white_label": true, "sso": true}',
    -1, -1, true -- Unlimited everything
);

-- Create indexes for performance
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_period ON subscriptions(current_period_start, current_period_end);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_subscription_id) WHERE stripe_subscription_id IS NOT NULL;
CREATE UNIQUE INDEX idx_subscriptions_user_active_unique ON subscriptions(user_id) WHERE status = 'active'; -- One active subscription per user

CREATE INDEX idx_payments_subscription ON payments(subscription_id);
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_period ON payments(billing_period_start, billing_period_end);

CREATE INDEX idx_usage_logs_user ON usage_logs(user_id, created_at DESC);
CREATE INDEX idx_usage_logs_subscription ON usage_logs(subscription_id, created_at DESC);
CREATE INDEX idx_usage_logs_type ON usage_logs(usage_type, created_at DESC);

-- Create updated_at triggers
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON subscription_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- Subscription plans policies (public read)
CREATE POLICY "Anyone can view active public plans" ON subscription_plans FOR SELECT USING (is_active = true AND is_public = true);

-- Subscriptions policies  
CREATE POLICY "Users can view their own subscriptions" ON subscriptions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update their own subscription metadata" ON subscriptions FOR UPDATE USING (user_id = auth.uid());

-- Payments policies
CREATE POLICY "Users can view their own payments" ON payments FOR SELECT USING (user_id = auth.uid());

-- Usage logs policies
CREATE POLICY "Users can view their own usage logs" ON usage_logs FOR SELECT USING (user_id = auth.uid());

-- Helper functions for subscription checks
CREATE OR REPLACE FUNCTION get_user_subscription(user_uuid UUID)
RETURNS subscriptions AS $$
DECLARE
    sub subscriptions;
BEGIN
    SELECT * INTO sub 
    FROM subscriptions 
    WHERE user_id = user_uuid AND status = 'active'
    ORDER BY created_at DESC 
    LIMIT 1;
    
    RETURN sub;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION check_usage_limit(user_uuid UUID, usage_type_param TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    sub subscriptions;
    plan subscription_plans;
    current_usage INTEGER;
    usage_limit INTEGER;
BEGIN
    -- Get user's active subscription
    SELECT * INTO sub FROM get_user_subscription(user_uuid);
    
    IF sub IS NULL THEN
        RETURN false; -- No active subscription
    END IF;
    
    -- Get the plan details
    SELECT * INTO plan FROM subscription_plans WHERE id = sub.plan_id;
    
    -- Check based on usage type
    CASE usage_type_param
        WHEN 'ai_request' THEN
            usage_limit := plan.ai_requests_limit;
            current_usage := sub.current_ai_requests;
        WHEN 'embedding' THEN
            usage_limit := plan.embeddings_limit;
            current_usage := sub.current_embeddings;
        ELSE
            RETURN false;
    END CASE;
    
    -- -1 means unlimited
    IF usage_limit = -1 THEN
        RETURN true;
    END IF;
    
    RETURN current_usage < usage_limit;
END;
$$ LANGUAGE plpgsql; 