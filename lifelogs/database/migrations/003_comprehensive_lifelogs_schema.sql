-- LifeLog OS Comprehensive Database Schema
-- This migration creates the full data model for the life logging system
-- Includes block-based widget system for rich content

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS entry_shares CASCADE;
DROP TABLE IF EXISTS entry_comments CASCADE;
DROP TABLE IF EXISTS entry_insights CASCADE;
DROP TABLE IF EXISTS entry_embeddings CASCADE;
DROP TABLE IF EXISTS entry_tags CASCADE;
DROP TABLE IF EXISTS entry_people CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS entries CASCADE;
DROP TABLE IF EXISTS attachments CASCADE;
DROP TABLE IF EXISTS people CASCADE;
DROP TABLE IF EXISTS widget_templates CASCADE;
DROP TABLE IF EXISTS integrations CASCADE;
DROP TABLE IF EXISTS sync_logs CASCADE;
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS search_queries CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create profiles table for extended user data (consolidated with user settings)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Basic profile info
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    encryption_key TEXT,
    timezone TEXT DEFAULT 'UTC',
    preferences JSONB DEFAULT '{}',
    
    -- AI preferences (app-controlled, user-friendly)
    auto_tagging BOOLEAN DEFAULT true,
    auto_summary BOOLEAN DEFAULT true,
    auto_insights BOOLEAN DEFAULT true,
    
    -- User's own API keys (optional, for subscribers)
    openai_api_key TEXT, -- Encrypted user's OpenAI key
    anthropic_api_key TEXT, -- Encrypted user's Anthropic key
    google_api_key TEXT, -- Encrypted user's Google AI key
    use_own_api_keys BOOLEAN DEFAULT false, -- Whether to use user's keys vs app's
    
    -- Privacy settings
    default_visibility TEXT DEFAULT 'private' CHECK (
        default_visibility IN ('private', 'shared', 'public')
    ),
    share_analytics BOOLEAN DEFAULT false,
    
    -- UI preferences
    theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    timeline_view TEXT DEFAULT 'masonry' CHECK (timeline_view IN ('list', 'masonry', 'calendar')),
    date_format TEXT DEFAULT 'relative',
    
    -- Notification settings
    email_notifications BOOLEAN DEFAULT true,
    comment_notifications BOOLEAN DEFAULT true,
    share_notifications BOOLEAN DEFAULT true,
    insight_notifications BOOLEAN DEFAULT true,
    
    -- Integration settings
    gmail_sync_enabled BOOLEAN DEFAULT false,
    calendar_sync_enabled BOOLEAN DEFAULT false,
    photos_sync_enabled BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create people table for relationship management (contacts/other people user tracks)
CREATE TABLE people (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE, -- Who owns this contact record
    
    -- Person identification
    name TEXT NOT NULL, -- Always present (e.g., "Marcos", "Mom", "Sarah")
    email TEXT, -- May be present even if not an app user
    avatar_url TEXT,
    
    -- App user connection (optional)
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- NULL if not an app user
    
    -- Contact source and metadata
    source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'google_contacts', 'gmail', 'calendar', 'mention')),
    external_id TEXT, -- ID from external source (Google contacts, etc.)
    metadata JSONB DEFAULT '{}', -- Store additional contact info, social handles, etc.
    
    -- Relationship context
    relationship_type TEXT, -- 'family', 'friend', 'colleague', 'acquaintance', etc.
    importance INTEGER CHECK (importance >= 1 AND importance <= 5), -- How important/close is this person
    
    -- Status tracking
    is_app_user BOOLEAN GENERATED ALWAYS AS (auth_user_id IS NOT NULL) STORED,
    last_mentioned_at TIMESTAMP WITH TIME ZONE, -- Last time mentioned in an entry
    mention_count INTEGER DEFAULT 0, -- How often they're mentioned
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create entries table (core content) - renamed from memories
CREATE TABLE entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT,
    body JSONB NOT NULL, -- Rich document with blocks: {"blocks": [{"id": "uuid", "type": "text|widget", "content": "..."}]}
    summary TEXT, -- AI-generated summary
    visibility TEXT DEFAULT 'private' CHECK (visibility IN ('private', 'shared', 'public')),
    
    -- AI-enhanced fields
    sentiment REAL, -- -1 to 1 sentiment score
    mood INTEGER CHECK (mood >= 1 AND mood <= 10),
    energy INTEGER CHECK (energy >= 1 AND energy <= 10),
    
    -- Source and context
    source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'gmail', 'calendar', 'import')),
    source_id TEXT, -- External ID from source system
    source_url TEXT, -- Link back to original
    
    -- Temporal data
    entry_date TIMESTAMP WITH TIME ZONE NOT NULL, -- When the entry actually happened
    location_name TEXT, -- Human-readable location
    location_coords POINT, -- GPS coordinates
    timezone TEXT,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    is_draft BOOLEAN DEFAULT false,
    is_archived BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    
    -- Full-text search
    search_vector tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(summary, '')), 'B')
    ) STORED
);

-- Create widget templates table for available widget types
CREATE TABLE widget_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- NULL for system templates
    
    -- Widget details
    widget_type TEXT NOT NULL, -- 'milestone', 'yearly_overview', 'goal_tracker', etc.
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT DEFAULT '#6366f1',
    
    -- Schema and defaults
    schema_version INTEGER DEFAULT 1,
    json_schema JSONB NOT NULL, -- JSON Schema for validation
    default_content JSONB NOT NULL, -- Default data when widget is inserted
    
    -- UI configuration  
    ui_config JSONB DEFAULT '{}', -- How to render this widget
    
    -- Metadata
    is_system BOOLEAN DEFAULT false, -- Built-in system widgets
    is_active BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create attachments table for media
CREATE TABLE attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entry_id UUID NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- File information
    type TEXT NOT NULL CHECK (type IN ('image', 'audio', 'video', 'document', 'link')),
    filename TEXT NOT NULL,
    storage_path TEXT NOT NULL, -- Supabase storage path
    file_size BIGINT,
    mime_type TEXT,
    
    -- Media-specific metadata
    duration REAL, -- For audio/video in seconds
    width INTEGER, -- For images/videos
    height INTEGER, -- For images/videos
    transcription TEXT, -- For audio/video
    alt_text TEXT, -- For accessibility
    
    -- Rich metadata
    metadata JSONB DEFAULT '{}', -- EXIF, thumbnail URLs, etc.
    
    -- Processing status
    processing_status TEXT DEFAULT 'pending' CHECK (
        processing_status IN ('pending', 'processing', 'completed', 'failed')
    ),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create tags table (hierarchical)
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL, -- URL-friendly version
    color TEXT DEFAULT '#6366f1',
    icon TEXT, -- Icon name or emoji
    description TEXT,
    parent_tag_id UUID REFERENCES tags(id) ON DELETE SET NULL, -- For hierarchical tags
    
    -- AI vs manual
    is_system BOOLEAN DEFAULT false, -- AI-generated system tags
    confidence REAL, -- AI confidence for system tags
    
    -- Usage stats
    usage_count INTEGER DEFAULT 0,
    last_used_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create entry-tag junction table
CREATE TABLE entry_tags (
    entry_id UUID NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    confidence REAL, -- AI confidence score for auto-tags
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_by TEXT DEFAULT 'user' CHECK (created_by IN ('user', 'ai')),
    PRIMARY KEY (entry_id, tag_id)
);

-- Create entry-people junction table
CREATE TABLE entry_people (
    entry_id UUID NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
    person_id UUID NOT NULL REFERENCES people(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'participant' CHECK (role IN ('author', 'participant', 'mentioned')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    PRIMARY KEY (entry_id, person_id)
);

-- Create embeddings table for AI search
CREATE TABLE entry_embeddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entry_id UUID NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- Vector data
    embedding vector(1536) NOT NULL,
    model TEXT DEFAULT 'text-embedding-3-large',
    content_hash TEXT NOT NULL, -- To detect when re-embedding is needed
    
    -- Metadata
    embedding_type TEXT DEFAULT 'content' CHECK (
        embedding_type IN ('content', 'title', 'summary', 'attachment')
    ),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create shares table for collaboration
CREATE TABLE entry_shares (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entry_id UUID NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- Sharing target (either user or email for invites)
    shared_with_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    collaborator_email TEXT, -- For pending invites
    
    -- Permissions
    permission TEXT NOT NULL CHECK (permission IN ('view', 'comment', 'edit')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'revoked')),
    
    -- Settings
    can_reshare BOOLEAN DEFAULT false,
    expires_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    invite_token TEXT, -- For secure sharing links
    last_accessed_at TIMESTAMP WITH TIME ZONE,
    access_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    
    CHECK (
        (shared_with_id IS NOT NULL AND collaborator_email IS NULL) OR
        (shared_with_id IS NULL AND collaborator_email IS NOT NULL)
    )
);

-- Create comments table for collaboration
CREATE TABLE entry_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entry_id UUID NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- Comment content
    content TEXT NOT NULL,
    content_type TEXT DEFAULT 'text' CHECK (content_type IN ('text', 'rich')),
    
    -- Threading
    parent_comment_id UUID REFERENCES entry_comments(id) ON DELETE CASCADE,
    thread_id UUID, -- Root comment of the thread
    
    -- Status
    is_resolved BOOLEAN DEFAULT false, -- For feedback/review comments
    is_private BOOLEAN DEFAULT false, -- Private notes vs public comments
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create insights table for AI-generated analysis
CREATE TABLE entry_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entry_id UUID NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- Insight details
    type TEXT NOT NULL CHECK (type IN (
        'pattern', 'correlation', 'anomaly', 'trend', 'relationship', 'summary'
    )),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    confidence REAL NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
    
    -- Data
    insight_data JSONB DEFAULT '{}', -- Structured insight data
    related_entry_ids UUID[], -- Related entries
    
    -- Status
    is_dismissed BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create integrations table
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- Integration details
    provider TEXT NOT NULL CHECK (provider IN ('gmail', 'google_calendar', 'google_photos', 'instagram')),
    provider_user_id TEXT, -- External user ID
    
    -- Auth tokens (should be encrypted in production)
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    scope TEXT[], -- Granted permissions
    
    -- Sync settings
    sync_enabled BOOLEAN DEFAULT true,
    sync_frequency TEXT DEFAULT 'hourly' CHECK (
        sync_frequency IN ('realtime', 'hourly', 'daily', 'weekly', 'manual')
    ),
    last_sync_at TIMESTAMP WITH TIME ZONE,
    next_sync_at TIMESTAMP WITH TIME ZONE,
    
    -- Settings
    import_settings JSONB DEFAULT '{}', -- Provider-specific settings
    
    -- Status
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'error', 'revoked')),
    error_message TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create sync logs for debugging
CREATE TABLE sync_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    integration_id UUID NOT NULL REFERENCES integrations(id) ON DELETE CASCADE,
    
    -- Sync details
    sync_type TEXT NOT NULL CHECK (sync_type IN ('full', 'incremental', 'manual')),
    status TEXT NOT NULL CHECK (status IN ('started', 'completed', 'failed')),
    
    -- Results
    items_processed INTEGER DEFAULT 0,
    items_created INTEGER DEFAULT 0,
    items_updated INTEGER DEFAULT 0,
    items_skipped INTEGER DEFAULT 0,
    
    -- Error handling
    error_message TEXT,
    error_details JSONB,
    
    -- Timing
    started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE,
    duration_ms INTEGER
);

-- Create activity logs for audit trail
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- Activity details
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    
    -- Context
    ip_address INET,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create search queries table for analytics
CREATE TABLE search_queries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- Query details
    query TEXT NOT NULL,
    query_type TEXT DEFAULT 'semantic' CHECK (query_type IN ('semantic', 'fulltext', 'filter')),
    
    -- Results
    results_count INTEGER DEFAULT 0,
    selected_result_id UUID REFERENCES entries(id),
    
    -- Timing
    response_time_ms INTEGER,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert system widget templates

-- Yearly Overview Widget
INSERT INTO widget_templates (
    widget_type, name, description, icon, color, is_system,
    json_schema, default_content, ui_config
) VALUES (
    'yearly_overview',
    'Annual Life Review',
    'Comprehensive yearly overview tracking major life dimensions',
    '📅',
    '#8b5cf6',
    true,
    '{
        "type": "object",
        "properties": {
            "year": {"type": "integer", "title": "Year"},
            "age": {"type": "integer", "title": "Age"},
            "studies": {"type": "string", "title": "Education/Studies"},
            "relationships": {"type": "string", "title": "Relationships"},
            "children": {"type": "string", "title": "Children"},
            "long_trips": {"type": "string", "title": "Long Trips"},
            "short_trips": {"type": "string", "title": "Short Trips"},
            "work": {"type": "string", "title": "Work/Career"},
            "side_hustle": {"type": "string", "title": "Side Hustle"},
            "sports": {"type": "string", "title": "Sports/Fitness"},
            "important_events": {"type": "string", "title": "Important Events"},
            "car": {"type": "string", "title": "Car/Transportation"},
            "housing": {"type": "string", "title": "Housing/Living Situation"},
            "phone": {"type": "string", "title": "Phone/Technology"},
            "additional_info": {"type": "string", "title": "Additional Information"},
            "annual_salary_usd": {"type": "number", "title": "Annual Salary (USD)"}
        }
    }',
    '{
        "year": null,
        "age": null,
        "studies": "",
        "relationships": "",
        "children": "",
        "long_trips": "",
        "short_trips": "",
        "work": "",
        "side_hustle": "",
        "sports": "",
        "important_events": "",
        "car": "",
        "housing": "",
        "phone": "",
        "additional_info": "",
        "annual_salary_usd": null
    }',
    '{
        "display": "table",
        "editable": true,
        "fields": [
            {"key": "year", "type": "number", "label": "Year", "width": "80px"},
            {"key": "age", "type": "number", "label": "Age", "width": "60px"},
            {"key": "studies", "type": "text", "label": "Studies", "width": "150px"},
            {"key": "relationships", "type": "text", "label": "Relationships", "width": "150px"},
            {"key": "work", "type": "text", "label": "Work", "width": "150px"},
            {"key": "side_hustle", "type": "text", "label": "Side Hustle", "width": "120px"},
            {"key": "long_trips", "type": "text", "label": "Long Trips", "width": "120px"},
            {"key": "short_trips", "type": "text", "label": "Short Trips", "width": "120px"},
            {"key": "sports", "type": "text", "label": "Sports", "width": "100px"},
            {"key": "important_events", "type": "text", "label": "Important", "width": "120px"},
            {"key": "car", "type": "text", "label": "Car", "width": "100px"},
            {"key": "housing", "type": "text", "label": "Housing", "width": "100px"},
            {"key": "phone", "type": "text", "label": "Phone", "width": "100px"},
            {"key": "annual_salary_usd", "type": "number", "label": "Salary (USD)", "width": "100px"}
        ]
    }'
);

-- Milestone Widget
INSERT INTO widget_templates (
    widget_type, name, description, icon, color, is_system,
    json_schema, default_content, ui_config
) VALUES (
    'milestone',
    'Life Milestone',
    'Track important life achievements and events',
    '🏆',
    '#f59e0b',
    true,
    '{
        "type": "object",
        "properties": {
            "title": {"type": "string", "title": "Milestone Title"},
            "category": {
                "type": "string", 
                "enum": ["education", "career", "relationship", "health", "personal", "travel", "financial", "creative", "family", "other"],
                "title": "Category"
            },
            "achievement_date": {"type": "string", "format": "date", "title": "Achievement Date"},
            "description": {"type": "string", "title": "Description"},
            "impact_score": {"type": "integer", "minimum": 1, "maximum": 10, "title": "Impact Score"},
            "celebration": {"type": "string", "title": "How did you celebrate?"},
            "lessons_learned": {"type": "string", "title": "Lessons Learned"}
        }
    }',
    '{
        "title": "",
        "category": "personal",
        "achievement_date": "",
        "description": "",
        "impact_score": 5,
        "celebration": "",
        "lessons_learned": ""
    }',
    '{
        "display": "card",
        "editable": true,
        "layout": "vertical",
        "sections": [
            {
                "title": "Basic Information",
                "fields": ["title", "category", "achievement_date"]
            },
            {
                "title": "Details",
                "fields": ["description", "impact_score"]
            },
            {
                "title": "Reflection",
                "fields": ["celebration", "lessons_learned"]
            }
        ]
    }'
);

-- Goal Tracker Widget
INSERT INTO widget_templates (
    widget_type, name, description, icon, color, is_system,
    json_schema, default_content, ui_config
) VALUES (
    'goal_tracker',
    'Goal Tracker',
    'Track personal and professional goals with progress',
    '🎯',
    '#10b981',
    true,
    '{
        "type": "object",
        "properties": {
            "title": {"type": "string", "title": "Goal Title"},
            "category": {
                "type": "string",
                "enum": ["health", "career", "financial", "personal", "relationship", "education", "travel", "creative"],
                "title": "Category"
            },
            "target_date": {"type": "string", "format": "date", "title": "Target Date"},
            "status": {
                "type": "string", 
                "enum": ["not_started", "in_progress", "completed", "paused"],
                "title": "Status"
            },
            "progress_percentage": {"type": "integer", "minimum": 0, "maximum": 100, "title": "Progress %"},
            "description": {"type": "string", "title": "Description"}
        }
    }',
    '{
        "title": "",
        "category": "personal",
        "target_date": "",
        "status": "not_started",
        "progress_percentage": 0,
        "description": ""
    }',
    '{
        "display": "progress_card",
        "editable": true,
        "show_progress_bar": true,
        "fields": [
            {"key": "title", "type": "text", "label": "Goal"},
            {"key": "category", "type": "select", "label": "Category"},
            {"key": "target_date", "type": "date", "label": "Target"},
            {"key": "status", "type": "select", "label": "Status"},
            {"key": "progress_percentage", "type": "slider", "label": "Progress"},
            {"key": "description", "type": "textarea", "label": "Description"}
        ]
    }'
);

-- Simple table widget for custom data
INSERT INTO widget_templates (
    widget_type, name, description, icon, color, is_system,
    json_schema, default_content, ui_config
) VALUES (
    'simple_table',
    'Simple Table',
    'Create custom tables for any structured data',
    '📊',
    '#6366f1',
    true,
    '{
        "type": "object",
        "properties": {
            "headers": {
                "type": "array",
                "items": {"type": "string"},
                "title": "Column Headers"
            },
            "rows": {
                "type": "array",
                "items": {
                    "type": "array",
                    "items": {"type": "string"}
                },
                "title": "Table Data"
            }
        }
    }',
    '{
        "headers": ["Column 1", "Column 2", "Column 3"],
        "rows": [
            ["", "", ""],
            ["", "", ""]
        ]
    }',
    '{
        "display": "editable_table",
        "editable": true,
        "allow_add_rows": true,
        "allow_add_columns": true,
        "allow_delete_rows": true,
        "allow_delete_columns": true
    }'
);

-- Create performance indexes
CREATE INDEX idx_entries_user_id_date ON entries(user_id, entry_date DESC);
CREATE INDEX idx_entries_user_id_created ON entries(user_id, created_at DESC);
CREATE INDEX idx_entries_visibility ON entries(visibility) WHERE visibility != 'private';
CREATE INDEX idx_entries_source ON entries(source, source_id);
CREATE INDEX idx_entries_search ON entries USING gin(search_vector);
CREATE INDEX idx_entries_location ON entries USING gist(location_coords) WHERE location_coords IS NOT NULL;

CREATE INDEX idx_attachments_entry_id ON attachments(entry_id);
CREATE INDEX idx_attachments_type ON attachments(type);
CREATE INDEX idx_attachments_processing ON attachments(processing_status) WHERE processing_status != 'completed';

CREATE INDEX idx_tags_user_id_name ON tags(user_id, name);
CREATE INDEX idx_tags_parent ON tags(parent_tag_id) WHERE parent_tag_id IS NOT NULL;
CREATE INDEX idx_tags_usage ON tags(usage_count DESC, last_used_at DESC);

CREATE INDEX idx_entry_tags_entry ON entry_tags(entry_id);
CREATE INDEX idx_entry_tags_tag ON entry_tags(tag_id);

CREATE INDEX idx_entry_people_entry ON entry_people(entry_id);
CREATE INDEX idx_entry_people_person ON entry_people(person_id);

CREATE INDEX idx_entry_embeddings_user ON entry_embeddings(user_id);
CREATE INDEX idx_entry_embeddings_vector ON entry_embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX idx_entry_shares_owner ON entry_shares(owner_id);
CREATE INDEX idx_entry_shares_shared_with ON entry_shares(shared_with_id) WHERE shared_with_id IS NOT NULL;
CREATE INDEX idx_entry_shares_email ON entry_shares(collaborator_email) WHERE collaborator_email IS NOT NULL;
CREATE INDEX idx_entry_shares_token ON entry_shares(invite_token) WHERE invite_token IS NOT NULL;

CREATE INDEX idx_entry_comments_entry ON entry_comments(entry_id);
CREATE INDEX idx_entry_comments_user ON entry_comments(user_id);
CREATE INDEX idx_entry_comments_thread ON entry_comments(thread_id) WHERE thread_id IS NOT NULL;

CREATE INDEX idx_entry_insights_entry ON entry_insights(entry_id);
CREATE INDEX idx_entry_insights_type ON entry_insights(type, confidence DESC);

CREATE INDEX idx_integrations_user_provider ON integrations(user_id, provider);
CREATE INDEX idx_integrations_sync ON integrations(sync_enabled, next_sync_at) WHERE sync_enabled = true;

CREATE INDEX idx_sync_logs_integration ON sync_logs(integration_id, started_at DESC);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id, created_at DESC);
CREATE INDEX idx_search_queries_user ON search_queries(user_id, created_at DESC);

CREATE INDEX idx_people_user_id ON people(user_id);
CREATE INDEX idx_people_source ON people(source, external_id);
CREATE INDEX idx_people_auth_user ON people(auth_user_id) WHERE auth_user_id IS NOT NULL;
CREATE INDEX idx_people_app_users ON people(user_id, is_app_user) WHERE is_app_user = true;
CREATE INDEX idx_people_mentions ON people(user_id, mention_count DESC, last_mentioned_at DESC);
CREATE INDEX idx_people_email ON people(email) WHERE email IS NOT NULL;

CREATE INDEX idx_widget_templates_type ON widget_templates(widget_type, is_system);
CREATE INDEX idx_widget_templates_user ON widget_templates(user_id) WHERE user_id IS NOT NULL;

-- Create partial unique indexes (replacing UNIQUE constraints with WHERE clauses)
CREATE UNIQUE INDEX idx_people_user_external_unique ON people(user_id, external_id, source);
CREATE UNIQUE INDEX idx_people_user_name_unique ON people(user_id, name); -- Prevent duplicate names per user
CREATE UNIQUE INDEX idx_people_auth_user_unique ON people(user_id, auth_user_id) WHERE auth_user_id IS NOT NULL; -- One record per app user per owner
CREATE UNIQUE INDEX idx_entry_embeddings_unique ON entry_embeddings(entry_id, model, embedding_type);
CREATE UNIQUE INDEX idx_entry_shares_user_unique ON entry_shares(entry_id, shared_with_id) WHERE shared_with_id IS NOT NULL;
CREATE UNIQUE INDEX idx_entry_shares_email_unique ON entry_shares(entry_id, collaborator_email) WHERE collaborator_email IS NOT NULL;
CREATE UNIQUE INDEX idx_entry_shares_token_unique ON entry_shares(invite_token) WHERE invite_token IS NOT NULL;
CREATE UNIQUE INDEX idx_integrations_user_provider_unique ON integrations(user_id, provider);
CREATE UNIQUE INDEX idx_tags_user_slug_unique ON tags(user_id, slug);
CREATE UNIQUE INDEX idx_widget_templates_user_unique ON widget_templates(user_id, widget_type, name) WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX idx_widget_templates_system_unique ON widget_templates(widget_type, name) WHERE user_id IS NULL;

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_people_updated_at BEFORE UPDATE ON people FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_entries_updated_at BEFORE UPDATE ON entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON tags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_entry_shares_updated_at BEFORE UPDATE ON entry_shares FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_entry_comments_updated_at BEFORE UPDATE ON entry_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_widget_templates_updated_at BEFORE UPDATE ON widget_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE widget_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Entries policies
CREATE POLICY "Users can view their own entries" ON entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view shared entries" ON entries FOR SELECT USING (
    visibility = 'public' OR 
    (visibility = 'shared' AND id IN (
        SELECT entry_id FROM entry_shares 
        WHERE shared_with_id = auth.uid() AND status = 'accepted'
    ))
);
CREATE POLICY "Users can insert their own entries" ON entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own entries" ON entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own entries" ON entries FOR DELETE USING (auth.uid() = user_id);

-- Attachments policies
CREATE POLICY "Users can view attachments of accessible entries" ON attachments FOR SELECT USING (
    user_id = auth.uid() OR
    entry_id IN (
        SELECT id FROM entries WHERE 
        user_id = auth.uid() OR 
        visibility = 'public' OR
        (visibility = 'shared' AND id IN (
            SELECT entry_id FROM entry_shares 
            WHERE shared_with_id = auth.uid() AND status = 'accepted'
        ))
    )
);
CREATE POLICY "Users can insert attachments to their entries" ON attachments FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their attachments" ON attachments FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their attachments" ON attachments FOR DELETE USING (user_id = auth.uid());

-- Tags policies
CREATE POLICY "Users can view their own tags" ON tags FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert their own tags" ON tags FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own tags" ON tags FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own tags" ON tags FOR DELETE USING (user_id = auth.uid());

-- Entry tags policies
CREATE POLICY "Users can view entry tags for accessible entries" ON entry_tags FOR SELECT USING (
    entry_id IN (
        SELECT id FROM entries WHERE 
        user_id = auth.uid() OR 
        visibility = 'public' OR
        (visibility = 'shared' AND id IN (
            SELECT entry_id FROM entry_shares 
            WHERE shared_with_id = auth.uid() AND status = 'accepted'
        ))
    )
);
CREATE POLICY "Users can manage tags on their entries" ON entry_tags FOR ALL USING (
    entry_id IN (SELECT id FROM entries WHERE user_id = auth.uid())
);

-- People policies
CREATE POLICY "Users can view their own people" ON people FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert their own people" ON people FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own people" ON people FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own people" ON people FOR DELETE USING (user_id = auth.uid());

-- Entry people policies
CREATE POLICY "Users can view entry people for accessible entries" ON entry_people FOR SELECT USING (
    entry_id IN (
        SELECT id FROM entries WHERE 
        user_id = auth.uid() OR 
        visibility = 'public' OR
        (visibility = 'shared' AND id IN (
            SELECT entry_id FROM entry_shares 
            WHERE shared_with_id = auth.uid() AND status = 'accepted'
        ))
    )
);
CREATE POLICY "Users can manage people on their entries" ON entry_people FOR ALL USING (
    entry_id IN (SELECT id FROM entries WHERE user_id = auth.uid())
);

-- Entry embeddings policies
CREATE POLICY "Users can view embeddings for accessible entries" ON entry_embeddings FOR SELECT USING (
    user_id = auth.uid() OR
    entry_id IN (
        SELECT id FROM entries WHERE 
        visibility = 'public' OR
        (visibility = 'shared' AND id IN (
            SELECT entry_id FROM entry_shares 
            WHERE shared_with_id = auth.uid() AND status = 'accepted'
        ))
    )
);
CREATE POLICY "Users can manage embeddings for their entries" ON entry_embeddings FOR ALL USING (user_id = auth.uid());

-- Entry shares policies
CREATE POLICY "Users can view shares they own or are shared with" ON entry_shares FOR SELECT USING (
    owner_id = auth.uid() OR shared_with_id = auth.uid()
);
CREATE POLICY "Users can create shares for their entries" ON entry_shares FOR INSERT WITH CHECK (owner_id = auth.uid());
CREATE POLICY "Users can update shares they own" ON entry_shares FOR UPDATE USING (owner_id = auth.uid());
CREATE POLICY "Users can delete shares they own" ON entry_shares FOR DELETE USING (owner_id = auth.uid());

-- Entry comments policies
CREATE POLICY "Users can view comments on accessible entries" ON entry_comments FOR SELECT USING (
    entry_id IN (
        SELECT id FROM entries WHERE 
        user_id = auth.uid() OR 
        visibility = 'public' OR
        (visibility = 'shared' AND id IN (
            SELECT entry_id FROM entry_shares 
            WHERE shared_with_id = auth.uid() AND status = 'accepted'
        ))
    )
);
CREATE POLICY "Users can create comments on accessible entries" ON entry_comments FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    entry_id IN (
        SELECT id FROM entries WHERE 
        user_id = auth.uid() OR 
        visibility = 'public' OR
        (visibility = 'shared' AND id IN (
            SELECT entry_id FROM entry_shares 
            WHERE shared_with_id = auth.uid() AND status = 'accepted'
        ))
    )
);
CREATE POLICY "Users can update their own comments" ON entry_comments FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own comments" ON entry_comments FOR DELETE USING (user_id = auth.uid());

-- Entry insights policies
CREATE POLICY "Users can view insights for their entries" ON entry_insights FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can manage insights for their entries" ON entry_insights FOR ALL USING (user_id = auth.uid());

-- Widget templates policies
CREATE POLICY "Users can view system templates and their own" ON widget_templates FOR SELECT USING (
    is_system = true OR user_id = auth.uid()
);
CREATE POLICY "Users can create their own templates" ON widget_templates FOR INSERT WITH CHECK (
    user_id = auth.uid() AND is_system = false
);
CREATE POLICY "Users can update their own templates" ON widget_templates FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own templates" ON widget_templates FOR DELETE USING (user_id = auth.uid());

-- Integrations policies
CREATE POLICY "Users can view their own integrations" ON integrations FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can manage their own integrations" ON integrations FOR ALL USING (user_id = auth.uid());

-- Sync logs policies
CREATE POLICY "Users can view sync logs for their integrations" ON sync_logs FOR SELECT USING (
    integration_id IN (SELECT id FROM integrations WHERE user_id = auth.uid())
);

-- Activity logs policies
CREATE POLICY "Users can view their own activity logs" ON activity_logs FOR SELECT USING (user_id = auth.uid());

-- Search queries policies
CREATE POLICY "Users can view their own search queries" ON search_queries FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert their own search queries" ON search_queries FOR INSERT WITH CHECK (user_id = auth.uid()); 