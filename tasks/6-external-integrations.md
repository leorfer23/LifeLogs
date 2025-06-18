# 6.0 External Integrations (Gmail & Calendar)

## Overview

Build seamless integrations with Gmail and Google Calendar to automatically import relevant content and events into the memory timeline, providing a comprehensive life logging experience.

## Key Features

- **Gmail Integration**: Import starred emails and threads with attachments
- **Calendar Integration**: Import events and convert to timeline entries
- **OAuth 2.0 Flow**: Secure Google authentication and permissions
- **Background Sync**: Automatic periodic synchronization
- **Smart Filtering**: Only import relevant/meaningful content
- **Deduplication**: Prevent duplicate entries and content

## Tech Stack

- **OAuth**: Google Identity Platform + NextAuth.js
- **APIs**: Gmail API v1 + Google Calendar API v3
- **Background Jobs**: Supabase Edge Functions + Cron
- **Rate Limiting**: Token bucket algorithm for API calls
- **Webhooks**: Google Cloud Pub/Sub for real-time updates
- **Data Processing**: Server-side parsing and transformation

## Tasks

### 6.1 Google OAuth Setup

- [ ] Create Google Cloud Console project
- [ ] Configure OAuth 2.0 credentials and scopes
- [ ] Set up OAuth consent screen and verification
- [ ] Configure redirect URIs and domain verification
- [ ] Add required API scopes for Gmail and Calendar
- [ ] Set up service account for server-side operations

### 6.2 Authentication & Authorization

- [ ] Integrate Google OAuth with NextAuth.js
- [ ] Handle OAuth token refresh and rotation
- [ ] Store encrypted OAuth tokens in database
- [ ] Create permission management interface
- [ ] Add integration connection/disconnection flows
- [ ] Build authorization status monitoring

### 6.3 Gmail API Integration

- [ ] Set up Gmail API client and authentication
- [ ] Create message filtering and search functionality
- [ ] Build thread fetching and parsing
- [ ] Extract email metadata and content
- [ ] Handle attachment downloading and processing
- [ ] Create email-to-memory conversion logic

### 6.4 Google Calendar Integration

- [ ] Set up Calendar API client and authentication
- [ ] Create event fetching and filtering
- [ ] Build calendar event parsing
- [ ] Extract event details and metadata
- [ ] Create event-to-memory conversion logic
- [ ] Handle recurring events and exceptions

### 6.5 Background Synchronization

- [ ] Create Supabase Edge Functions for sync jobs
- [ ] Build incremental sync with delta updates
- [ ] Implement rate limiting and quota management
- [ ] Create sync scheduling and cron jobs
- [ ] Add sync status tracking and reporting
- [ ] Build error handling and retry logic

### 6.6 Data Processing Pipeline

- [ ] Create content parsing and extraction
- [ ] Build deduplication logic for imported content
- [ ] Implement content filtering and relevance scoring
- [ ] Add metadata extraction and enrichment
- [ ] Create import validation and quality checks
- [ ] Build content transformation and formatting

### 6.7 Real-time Updates

- [ ] Set up Google Cloud Pub/Sub webhooks
- [ ] Create webhook endpoints for real-time updates
- [ ] Handle push notifications from Google APIs
- [ ] Build real-time sync for new emails/events
- [ ] Create webhook authentication and security
- [ ] Add webhook error handling and monitoring

### 6.8 User Interface & Controls

- [ ] Create integration settings and preferences
- [ ] Build connection status and health monitoring
- [ ] Add import history and activity logs
- [ ] Create selective sync and filtering controls
- [ ] Build integration onboarding and setup flow
- [ ] Add troubleshooting and diagnostic tools

### 6.9 Data Management

- [ ] Create imported content categorization
- [ ] Build content archiving and cleanup
- [ ] Add data export and backup capabilities
- [ ] Create GDPR compliance and data deletion
- [ ] Build integration data analytics
- [ ] Add storage optimization and compression

### 6.10 Performance & Monitoring

- [ ] Create API usage monitoring and alerts
- [ ] Build sync performance optimization
- [ ] Add integration health checks and status
- [ ] Create error tracking and diagnostics
- [ ] Build usage analytics and reporting
- [ ] Add cost monitoring for API usage

## Component Architecture

### Integration Components

```typescript
// Integration Management
<IntegrationCard />       // Provider connection card
<IntegrationStatus />     // Connection health status
<SyncProgress />          // Import progress indicator
<IntegrationSettings />   // Configuration and preferences

// Content Display
<ImportedContent />       // Imported email/event display
<GmailThread />          // Email thread component
<CalendarEvent />        // Calendar event component
<ImportHistory />        // Import activity log

// Configuration
<ScopeSelector />        // Permission scope management
<FilterSettings />       // Content filtering options
<SyncScheduler />        // Sync frequency settings
<DataControls />         // Data management options
```

### Integration Hooks

```typescript
// Gmail integration hook
const useGmailIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("idle");
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const connect = async () => {
    // Initiate OAuth flow
  };

  const disconnect = async () => {
    // Revoke tokens and cleanup
  };

  const sync = async (options?: SyncOptions) => {
    // Trigger manual sync
  };

  return { isConnected, syncStatus, lastSync, connect, disconnect, sync };
};

// Calendar integration hook
const useCalendarIntegration = () => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);

  const selectCalendar = (calendarId: string) => {
    // Add calendar to sync list
  };

  const syncCalendar = async (calendarId: string) => {
    // Sync specific calendar
  };

  return { calendars, selectedCalendars, selectCalendar, syncCalendar };
};
```

## Database Schema

### Integration Management

```sql
-- Integration connections
CREATE TABLE user_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  provider text NOT NULL CHECK (provider IN ('gmail', 'google_calendar')),
  provider_user_id text NOT NULL,
  provider_email text,
  access_token_encrypted text NOT NULL,
  refresh_token_encrypted text,
  token_expires_at timestamptz,
  scopes text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  last_sync_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, provider, provider_user_id)
);

-- Sync jobs tracking
CREATE TABLE integration_sync_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  integration_id uuid REFERENCES user_integrations(id) ON DELETE CASCADE,
  job_type text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  error_message text,
  items_processed int DEFAULT 0,
  items_imported int DEFAULT 0,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Imported content tracking
CREATE TABLE imported_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  memory_id uuid REFERENCES memories(id) ON DELETE CASCADE,
  integration_id uuid REFERENCES user_integrations(id) ON DELETE CASCADE,
  provider_id text NOT NULL, -- Gmail message ID, Calendar event ID
  provider_type text NOT NULL,
  import_date timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  UNIQUE(integration_id, provider_id)
);
```

### Content Mapping

```sql
-- Gmail thread mapping
CREATE TABLE gmail_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  memory_id uuid REFERENCES memories(id) ON DELETE CASCADE,
  thread_id text NOT NULL,
  message_ids text[] DEFAULT '{}',
  subject text,
  participants text[] DEFAULT '{}',
  has_attachments boolean DEFAULT false,
  labels text[] DEFAULT '{}',
  importance_score float DEFAULT 0.0
);

-- Calendar event mapping
CREATE TABLE calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  memory_id uuid REFERENCES memories(id) ON DELETE CASCADE,
  event_id text NOT NULL,
  calendar_id text NOT NULL,
  title text,
  description text,
  location text,
  start_time timestamptz,
  end_time timestamptz,
  attendees text[] DEFAULT '{}',
  event_type text,
  importance_score float DEFAULT 0.0
);
```

## API Endpoints

### Integration Management

```typescript
// POST /api/integrations/connect
interface ConnectIntegrationRequest {
  provider: "gmail" | "google_calendar";
  authorizationCode: string;
  redirectUri: string;
}

// DELETE /api/integrations/[id]/disconnect
interface DisconnectIntegrationResponse {
  success: boolean;
  message: string;
}

// POST /api/integrations/[id]/sync
interface TriggerSyncRequest {
  force?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}
```

### Content Import

```typescript
// GET /api/integrations/gmail/messages
interface GmailImportRequest {
  query?: string;
  maxResults?: number;
  pageToken?: string;
}

// GET /api/integrations/calendar/events
interface CalendarImportRequest {
  calendarId: string;
  timeMin: string;
  timeMax: string;
  maxResults?: number;
}
```

## Gmail Integration Details

### OAuth Scopes Required

```typescript
const GMAIL_SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.metadata",
];
```

### Message Filtering

```typescript
// Smart filtering for relevant emails
const GMAIL_FILTERS = {
  starred: "is:starred",
  important: "is:important",
  withAttachments: "has:attachment",
  fromContacts: "from:contact",
  recentThreads: "newer_than:30d",
  excludePromotions: "-category:promotions",
  excludeSpam: "-is:spam -is:trash",
};

// Combined filter query
const buildGmailQuery = (filters: string[]) => {
  return filters.join(" ");
};
```

### Content Processing

```typescript
interface ProcessedEmail {
  id: string;
  threadId: string;
  subject: string;
  from: EmailAddress;
  to: EmailAddress[];
  date: Date;
  body: {
    text: string;
    html: string;
  };
  attachments: Attachment[];
  labels: string[];
  importance: number;
}

// Email to memory conversion
const convertEmailToMemory = (email: ProcessedEmail): CreateMemoryRequest => {
  return {
    content: `Email: ${email.subject}\n\nFrom: ${email.from.name} <${email.from.email}>\n\n${email.body.text}`,
    blocks: [
      {
        type: "text",
        content: {
          html: email.body.html,
          text: email.body.text,
        },
      },
    ],
    tags: ["email", ...email.labels],
    metadata: {
      source: "gmail",
      threadId: email.threadId,
      messageId: email.id,
      participants: [email.from, ...email.to],
    },
  };
};
```

## Google Calendar Integration Details

### OAuth Scopes Required

```typescript
const CALENDAR_SCOPES = [
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/calendar.events.readonly",
];
```

### Event Filtering

```typescript
// Filter for meaningful events
const shouldImportEvent = (event: CalendarEvent): boolean => {
  // Skip declined events
  if (
    event.attendees?.some(
      (a) => a.email === userEmail && a.responseStatus === "declined"
    )
  ) {
    return false;
  }

  // Skip all-day events that are too generic
  if (event.start.date && isGenericTitle(event.summary)) {
    return false;
  }

  // Import events with attachments or descriptions
  if (event.attachments?.length || event.description) {
    return true;
  }

  // Import events with multiple attendees (meetings)
  if (event.attendees?.length > 1) {
    return true;
  }

  return false;
};
```

### Content Processing

```typescript
interface ProcessedEvent {
  id: string;
  calendarId: string;
  title: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
  attendees: Attendee[];
  attachments: Attachment[];
  importance: number;
}

// Event to memory conversion
const convertEventToMemory = (event: ProcessedEvent): CreateMemoryRequest => {
  const duration = differenceInHours(event.end, event.start);
  const attendeeNames = event.attendees
    .map((a) => a.displayName || a.email)
    .join(", ");

  return {
    content: `${event.title}\n\n${event.description || ""}${
      event.location ? `\nLocation: ${event.location}` : ""
    }${attendeeNames ? `\nAttendees: ${attendeeNames}` : ""}`,
    blocks: [
      {
        type: "text",
        content: {
          text: event.description || "",
          html: event.description || "",
        },
      },
    ],
    tags: ["calendar", "event", duration > 2 ? "meeting" : "appointment"],
    metadata: {
      source: "google_calendar",
      eventId: event.id,
      calendarId: event.calendarId,
      startTime: event.start,
      endTime: event.end,
      location: event.location,
      attendees: event.attendees,
    },
  };
};
```

## Sync Strategies

### Incremental Sync

- Use Gmail historyId for efficient delta updates
- Use Calendar API's updatedMin parameter
- Track last sync timestamps per integration
- Handle API rate limits gracefully

### Batch Processing

- Process imports in batches of 50-100 items
- Use background jobs for large imports
- Provide progress updates to users
- Handle failures with retry logic

### Deduplication

- Use provider IDs to prevent duplicates
- Check for existing memories before import
- Handle updates to existing imported content
- Maintain mapping between provider items and memories

## Success Criteria

- [ ] Gmail integration imports starred/important emails
- [ ] Calendar integration captures meaningful events
- [ ] OAuth flow completes in <60 seconds
- [ ] Background sync runs reliably every hour
- [ ] Imported content is properly categorized and tagged
- [ ] No duplicate memories are created
- [ ] Integration health monitoring alerts on issues
- [ ] API rate limits are respected and managed
