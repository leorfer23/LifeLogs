// LifeLog OS Comprehensive Database Types

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  encryption_key?: string;
  timezone: string;
  preferences: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Person {
  id: string;
  user_id: string;
  name: string;
  email?: string;
  avatar_url?: string;
  source: "manual" | "google_contacts" | "gmail" | "calendar";
  external_id?: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// Block-based content system (Notion-like)
export interface TextBlock {
  id: string;
  type: "text";
  content: string; // Rich text content (HTML or markdown)
}

export interface WidgetBlock {
  id: string;
  type: "widget";
  widget_type: string; // 'yearly_overview', 'milestone', 'goal_tracker', etc.
  content: Record<string, unknown>; // Widget-specific data
}

export interface ImageBlock {
  id: string;
  type: "image";
  content: {
    url: string;
    alt?: string;
    caption?: string;
  };
}

export interface VideoBlock {
  id: string;
  type: "video";
  content: {
    url: string;
    caption?: string;
    thumbnail?: string;
  };
}

export type Block = TextBlock | WidgetBlock | ImageBlock | VideoBlock;

export interface RichDocument {
  blocks: Block[];
}

export interface Entry {
  id: string;
  user_id: string;
  title?: string;
  body: RichDocument; // Rich document with blocks
  summary?: string;
  visibility: "private" | "shared" | "public";

  // AI-enhanced fields
  sentiment?: number; // -1 to 1
  mood?: number; // 1-10
  energy?: number; // 1-10

  // Source and context
  source: "manual" | "gmail" | "calendar" | "import";
  source_id?: string;
  source_url?: string;

  // Temporal data
  entry_date: string;
  location_name?: string;
  location_coords?: [number, number]; // [lat, lng]
  timezone?: string;

  // Metadata
  metadata: Record<string, unknown>;
  is_draft: boolean;
  is_archived: boolean;

  created_at: string;
  updated_at: string;
}

// Widget system types
export interface WidgetTemplate {
  id: string;
  user_id?: string; // NULL for system templates
  widget_type: string;
  name: string;
  description?: string;
  icon?: string;
  color: string;
  schema_version: number;
  json_schema: Record<string, unknown>; // JSON Schema for validation
  default_content: Record<string, unknown>; // Default values when widget is inserted
  ui_config: Record<string, unknown>; // UI rendering configuration
  is_system: boolean;
  is_active: boolean;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

// Specific widget content types
export interface YearlyOverviewWidget {
  year?: number;
  age?: number;
  studies?: string;
  relationships?: string;
  children?: string;
  long_trips?: string;
  short_trips?: string;
  work?: string;
  side_hustle?: string;
  sports?: string;
  important_events?: string;
  car?: string;
  housing?: string;
  phone?: string;
  additional_info?: string;
  annual_salary_usd?: number;
}

export interface MilestoneWidget {
  title?: string;
  category?:
    | "education"
    | "career"
    | "relationship"
    | "health"
    | "personal"
    | "travel"
    | "financial"
    | "creative"
    | "family"
    | "other";
  achievement_date?: string;
  description?: string;
  impact_score?: number; // 1-10
  celebration?: string;
  lessons_learned?: string;
}

export interface GoalTrackerWidget {
  title?: string;
  category?:
    | "health"
    | "career"
    | "financial"
    | "personal"
    | "relationship"
    | "education"
    | "travel"
    | "creative";
  target_date?: string;
  status?: "not_started" | "in_progress" | "completed" | "paused";
  progress_percentage?: number; // 0-100
  description?: string;
}

export interface SimpleTableWidget {
  headers: string[];
  rows: string[][];
}

// Helper for typed widget blocks
export interface TypedWidgetBlock<T = Record<string, unknown>>
  extends Omit<WidgetBlock, "content"> {
  content: T;
}

export interface Attachment {
  id: string;
  entry_id: string;
  user_id: string;

  // File information
  type: "image" | "audio" | "video" | "document" | "link";
  filename: string;
  storage_path: string;
  file_size?: number;
  mime_type?: string;

  // Media-specific metadata
  duration?: number; // seconds
  width?: number;
  height?: number;
  transcription?: string;
  alt_text?: string;

  // Rich metadata
  metadata: Record<string, unknown>;

  // Processing status
  processing_status: "pending" | "processing" | "completed" | "failed";

  created_at: string;
}

export interface Tag {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  color: string;
  icon?: string;
  description?: string;
  parent_tag_id?: string;

  // AI vs manual
  is_system: boolean;
  confidence?: number;

  // Usage stats
  usage_count: number;
  last_used_at?: string;

  created_at: string;
  updated_at: string;
}

export interface EntryTag {
  entry_id: string;
  tag_id: string;
  confidence?: number;
  created_at: string;
  created_by: "user" | "ai";
}

export interface EntryPerson {
  entry_id: string;
  person_id: string;
  role: "author" | "participant" | "mentioned";
  created_at: string;
}

export interface EntryEmbedding {
  id: string;
  entry_id: string;
  user_id: string;

  // Vector data
  embedding: number[];
  model: string;
  content_hash: string;

  // Metadata
  embedding_type: "content" | "title" | "summary" | "attachment";

  created_at: string;
}

export interface EntryShare {
  id: string;
  entry_id: string;
  owner_id: string;

  // Sharing target
  shared_with_id?: string;
  collaborator_email?: string;

  // Permissions
  permission: "view" | "comment" | "edit";
  status: "pending" | "accepted" | "declined" | "revoked";

  // Settings
  can_reshare: boolean;
  expires_at?: string;

  // Metadata
  invite_token?: string;
  last_accessed_at?: string;
  access_count: number;

  created_at: string;
  updated_at: string;
}

export interface EntryComment {
  id: string;
  entry_id: string;
  user_id: string;

  // Comment content
  content: string;
  content_type: "text" | "rich";

  // Threading
  parent_comment_id?: string;
  thread_id?: string;

  // Status
  is_resolved: boolean;
  is_private: boolean;

  // Metadata
  metadata: Record<string, unknown>;

  created_at: string;
  updated_at: string;
}

export interface EntryInsight {
  id: string;
  entry_id: string;
  user_id: string;

  // Insight details
  type:
    | "pattern"
    | "correlation"
    | "anomaly"
    | "trend"
    | "relationship"
    | "summary";
  title: string;
  description: string;
  confidence: number; // 0 to 1

  // Data
  insight_data: Record<string, unknown>;
  related_entry_ids: string[];

  // Status
  is_dismissed: boolean;
  is_pinned: boolean;

  created_at: string;
}

export interface Integration {
  id: string;
  user_id: string;

  // Integration details
  provider: "gmail" | "google_calendar" | "google_photos" | "instagram";
  provider_user_id?: string;

  // Auth tokens
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  scope: string[];

  // Sync settings
  sync_enabled: boolean;
  sync_frequency: "realtime" | "hourly" | "daily" | "weekly" | "manual";
  last_sync_at?: string;
  next_sync_at?: string;

  // Settings
  import_settings: Record<string, unknown>;

  // Status
  status: "active" | "paused" | "error" | "revoked";
  error_message?: string;

  created_at: string;
  updated_at: string;
}

export interface SyncLog {
  id: string;
  integration_id: string;

  // Sync details
  sync_type: "full" | "incremental" | "manual";
  status: "started" | "completed" | "failed";

  // Results
  items_processed: number;
  items_created: number;
  items_updated: number;
  items_skipped: number;

  // Error handling
  error_message?: string;
  error_details?: Record<string, unknown>;

  // Timing
  started_at: string;
  completed_at?: string;
  duration_ms?: number;
}

export interface UserSettings {
  id: string;
  user_id: string;

  // AI preferences
  ai_model: string;
  embedding_model: string;
  auto_tagging: boolean;
  auto_summary: boolean;
  auto_insights: boolean;

  // Privacy settings
  default_visibility: "private" | "shared" | "public";
  share_analytics: boolean;

  // UI preferences
  theme: "light" | "dark" | "system";
  timeline_view: "list" | "masonry" | "calendar";
  date_format: string;

  // Notification settings
  email_notifications: boolean;
  comment_notifications: boolean;
  share_notifications: boolean;
  insight_notifications: boolean;

  // Integration settings
  gmail_sync_enabled: boolean;
  calendar_sync_enabled: boolean;
  photos_sync_enabled: boolean;

  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;

  // Activity details
  action: string;
  resource_type: string;
  resource_id?: string;

  // Context
  ip_address?: string;
  user_agent?: string;
  metadata: Record<string, unknown>;

  created_at: string;
}

export interface SearchQuery {
  id: string;
  user_id: string;

  // Query details
  query: string;
  query_type: "semantic" | "fulltext" | "filter";

  // Results
  results_count: number;
  selected_result_id?: string;

  // Timing
  response_time_ms?: number;

  created_at: string;
}

// Helper types for complex queries
export interface EntryWithDetails extends Entry {
  attachments?: Attachment[];
  tags?: Array<EntryTag & { tag: Tag }>;
  people?: Array<EntryPerson & { person: Person }>;
  comments?: Array<
    EntryComment & { user: Pick<User, "id" | "name" | "avatar"> }
  >;
  shares?: Array<
    EntryShare & {
      shared_with?: Pick<User, "id" | "name" | "avatar" | "email">;
    }
  >;
  insights?: EntryInsight[];
}

export interface UserWithSettings extends User {
  settings?: UserSettings;
}

export interface TagWithHierarchy extends Tag {
  parent?: Tag;
  children?: Tag[];
}

export interface PersonWithStats extends Person {
  entry_count?: number;
  last_entry_at?: string;
}

export interface EntrySearchResult extends Entry {
  similarity?: number;
  rank?: number;
  highlights?: {
    title?: string[];
    summary?: string[];
    content?: string[];
  };
}

// Form types for creating/updating
export type CreateEntry = Omit<Entry, "id" | "created_at" | "updated_at">;
export type UpdateEntry = Partial<CreateEntry>;

export type CreateAttachment = Omit<Attachment, "id" | "created_at">;
export type CreateTag = Omit<
  Tag,
  "id" | "created_at" | "updated_at" | "usage_count" | "last_used_at"
>;
export type CreatePerson = Omit<Person, "id" | "created_at" | "updated_at">;
export type CreateEntryComment = Omit<
  EntryComment,
  "id" | "created_at" | "updated_at"
>;
export type CreateEntryShare = Omit<
  EntryShare,
  "id" | "created_at" | "updated_at" | "access_count" | "last_accessed_at"
>;
export type CreateWidgetTemplate = Omit<
  WidgetTemplate,
  "id" | "created_at" | "updated_at" | "usage_count"
>;

// API response types
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface EntryFilters {
  tags?: string[];
  people?: string[];
  date_from?: string;
  date_to?: string;
  source?: Entry["source"][];
  visibility?: Entry["visibility"][];
  has_attachments?: boolean;
  attachment_types?: Attachment["type"][];
  has_widgets?: boolean;
  widget_types?: string[];
  location?: {
    center: [number, number];
    radius_km: number;
  };
}

export interface SearchOptions {
  query?: string;
  filters?: EntryFilters;
  sort?: "relevance" | "date" | "created" | "updated";
  order?: "asc" | "desc";
  page?: number;
  per_page?: number;
}

// Widget helpers
export interface WidgetStats {
  widget_type: string;
  count: number;
  last_used: string;
  template?: WidgetTemplate;
}

// Block editor helpers
export interface BlockOperation {
  type: "insert" | "update" | "delete" | "move";
  blockId: string;
  position?: number;
  data?: Partial<Block>;
}

export interface EditorState {
  blocks: Block[];
  selection?: {
    blockId: string;
    offset?: number;
  };
  history: RichDocument[];
  historyIndex: number;
}
