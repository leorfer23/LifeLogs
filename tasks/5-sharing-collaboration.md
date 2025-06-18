# 5.0 Sharing & Collaboration Features

## Overview

Build secure, real-time collaboration features that allow users to share memories with controlled permissions and enable collaborative editing, commenting, and discussion.

## Key Features

- **Secure Sharing**: Encrypted sharing with time-limited access
- **Role-based Permissions**: View, comment, edit roles
- **Real-time Collaboration**: Live editing and comments
- **Invitation System**: Email-based collaboration invites
- **Version History**: Track changes and edits
- **Comment System**: Threaded discussions on memories

## Tech Stack

- **Real-time**: Supabase Realtime for live collaboration
- **Encryption**: Web Crypto API + server-side AES-256
- **Auth**: Fine-grained RLS policies in Supabase
- **Email**: Resend.com for transactional emails
- **Collaboration**: Y.js for operational transformation
- **Notifications**: Supabase Edge Functions + webhooks

## Tasks

### 5.1 Sharing Infrastructure

- [ ] Create sharing permissions data model
- [ ] Build role-based access control (RBAC)
- [ ] Set up Supabase RLS policies for shared content
- [ ] Create sharing invitation system
- [ ] Build share link generation and validation
- [ ] Add sharing expiration and revocation

### 5.2 Encryption & Security

- [ ] Implement AES-256 encryption for shared content
- [ ] Create key derivation for shared memories
- [ ] Build secure URL signing for access control
- [ ] Add rate limiting for sharing operations
- [ ] Create audit logging for security events
- [ ] Implement sharing analytics and monitoring

### 5.3 Invitation & User Management

- [ ] Build email invitation system with Resend
- [ ] Create user discovery and autocomplete
- [ ] Add contact management and address book
- [ ] Build invitation acceptance and onboarding
- [ ] Create user role management interface
- [ ] Add bulk invitation capabilities

### 5.4 Real-time Collaboration

- [ ] Set up Supabase Realtime subscriptions
- [ ] Implement Y.js for collaborative editing
- [ ] Build presence indicators (who's online)
- [ ] Create real-time cursor tracking
- [ ] Add conflict resolution for simultaneous edits
- [ ] Build collaborative rich text editing

### 5.5 Comment System

- [ ] Create threaded comment data model
- [ ] Build comment UI with replies and reactions
- [ ] Add @mention functionality in comments
- [ ] Implement comment notifications
- [ ] Create comment moderation tools
- [ ] Add comment search and filtering

### 5.6 Permission Management

- [ ] Build granular permission system
- [ ] Create role inheritance and delegation
- [ ] Add time-based access controls
- [ ] Build permission inheritance for nested content
- [ ] Create permission request and approval flows
- [ ] Add permission audit trails

### 5.7 Notification System

- [ ] Set up real-time in-app notifications
- [ ] Build email notification preferences
- [ ] Create notification batching and digest
- [ ] Add push notifications for mobile
- [ ] Build notification history and management
- [ ] Create notification templates and customization

### 5.8 Collaboration UI/UX

- [ ] Create sharing modal with permission controls
- [ ] Build collaborative toolbar and indicators
- [ ] Add user avatars and presence indicators
- [ ] Create activity feed for shared memories
- [ ] Build permission visualization
- [ ] Add collaboration onboarding and help

### 5.9 Version Control & History

- [ ] Implement version tracking for shared memories
- [ ] Build visual diff for content changes
- [ ] Create version restoration functionality
- [ ] Add change attribution and timestamps
- [ ] Build collaborative editing history
- [ ] Create version branching for conflicts

### 5.10 Analytics & Insights

- [ ] Track sharing and collaboration metrics
- [ ] Build engagement analytics for shared content
- [ ] Create collaboration health metrics
- [ ] Add user behavior analytics
- [ ] Build sharing performance monitoring
- [ ] Create collaboration reporting dashboard

## Component Architecture

### Sharing Components

```typescript
// Sharing Interface
<ShareModal />          // Main sharing dialog
<ShareButton />         // Trigger sharing action
<PermissionSelector />  // Role and permission picker
<InviteForm />         // Email invitation form

// Collaboration UI
<CollaboratorList />    // Show active collaborators
<PresenceIndicator />   // Online status indicators
<CommentThread />       // Threaded comment display
<ActivityFeed />        // Recent collaboration activity

// Permission Management
<PermissionMatrix />    // Visual permission grid
<RoleEditor />          // Custom role creation
<AccessControlList />   // ACL management
<ShareLinkManager />    // Link generation and control
```

### Real-time Hooks

```typescript
// Collaboration hooks
const useCollaboration = (memoryId: string) => {
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [presence, setPresence] = useState<PresenceState>({});

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel(`memory:${memoryId}`)
      .on("presence", { event: "sync" }, () => {
        // Handle presence updates
      })
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "shared_memories",
        },
        (payload) => {
          // Handle permission changes
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [memoryId]);

  return { collaborators, presence };
};

// Comment system hook
const useComments = (memoryId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const addComment = async (content: string, parentId?: string) => {
    // Add comment with optimistic update
  };

  const updateComment = async (id: string, content: string) => {
    // Update comment with real-time sync
  };

  return { comments, addComment, updateComment };
};
```

## Database Schema

### Sharing & Permissions

```sql
-- Shared memories table
CREATE TABLE shared_memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  memory_id uuid REFERENCES memories(id) ON DELETE CASCADE,
  owner_id uuid REFERENCES users(id) ON DELETE CASCADE,
  shared_with_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('viewer', 'commenter', 'editor', 'admin')),
  permissions jsonb DEFAULT '{}'::jsonb,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Share links table
CREATE TABLE share_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  memory_id uuid REFERENCES memories(id) ON DELETE CASCADE,
  token text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('viewer', 'commenter', 'editor')),
  expires_at timestamptz,
  max_uses int,
  use_count int DEFAULT 0,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Comments table
CREATE TABLE memory_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  memory_id uuid REFERENCES memories(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES memory_comments(id) ON DELETE CASCADE,
  content text NOT NULL,
  content_html text,
  reactions jsonb DEFAULT '{}'::jsonb,
  edited_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Activity log
CREATE TABLE collaboration_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  memory_id uuid REFERENCES memories(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  action text NOT NULL,
  details jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);
```

### RLS Policies

```sql
-- Memory access policy
CREATE POLICY "Users can access shared memories"
ON memories FOR ALL
USING (
  user_id = auth.uid() OR
  id IN (
    SELECT memory_id FROM shared_memories
    WHERE shared_with_id = auth.uid()
    AND (expires_at IS NULL OR expires_at > now())
  )
);

-- Comment access policy
CREATE POLICY "Users can see comments on accessible memories"
ON memory_comments FOR SELECT
USING (
  memory_id IN (
    SELECT id FROM memories
    WHERE user_id = auth.uid()
    OR id IN (
      SELECT memory_id FROM shared_memories
      WHERE shared_with_id = auth.uid()
    )
  )
);

-- Comment creation policy
CREATE POLICY "Users can comment on shared memories"
ON memory_comments FOR INSERT
WITH CHECK (
  memory_id IN (
    SELECT memory_id FROM shared_memories
    WHERE shared_with_id = auth.uid()
    AND role IN ('commenter', 'editor', 'admin')
  )
);
```

## API Endpoints

### Sharing Management

```typescript
// POST /api/memories/[id]/share
interface ShareMemoryRequest {
  userEmail: string;
  role: "viewer" | "commenter" | "editor";
  message?: string;
  expiresAt?: string;
}

// POST /api/memories/[id]/share-link
interface CreateShareLinkRequest {
  role: "viewer" | "commenter" | "editor";
  expiresAt?: string;
  maxUses?: number;
}

// GET /api/memories/[id]/collaborators
interface CollaboratorsResponse {
  collaborators: Collaborator[];
  permissions: Permission[];
  shareLinks: ShareLink[];
}
```

### Comment System

```typescript
// POST /api/memories/[id]/comments
interface CreateCommentRequest {
  content: string;
  parentId?: string;
  mentions?: string[];
}

// GET /api/memories/[id]/comments
interface CommentsResponse {
  comments: Comment[];
  total: number;
  hasMore: boolean;
}

// PATCH /api/comments/[id]
interface UpdateCommentRequest {
  content: string;
}
```

### Real-time Events

```typescript
// Real-time event types
interface CollaborationEvent {
  type: "presence" | "edit" | "comment" | "permission";
  memoryId: string;
  userId: string;
  data: any;
  timestamp: string;
}

// Presence tracking
interface PresenceState {
  [userId: string]: {
    name: string;
    avatar: string;
    cursor?: { x: number; y: number };
    selection?: { start: number; end: number };
    lastSeen: string;
  };
}
```

## Email Templates

### Invitation Email

```html
<!DOCTYPE html>
<html>
  <head>
    <title>You've been invited to collaborate</title>
  </head>
  <body>
    <h1>{{inviterName}} shared a memory with you</h1>
    <p>You've been invited to {{role}} on "{{memoryTitle}}"</p>

    {{#if message}}
    <blockquote>{{message}}</blockquote>
    {{/if}}

    <a
      href="{{acceptUrl}}"
      style="background: #007AFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;"
    >
      View Memory
    </a>

    <p>
      This invitation {{#if expiresAt}}expires on {{expiresAt}}{{else}}never
      expires{{/if}}.
    </p>
  </body>
</html>
```

### Comment Notification

```html
<!DOCTYPE html>
<html>
  <head>
    <title>New comment on your memory</title>
  </head>
  <body>
    <h1>{{commenterName}} commented on "{{memoryTitle}}"</h1>

    <div
      style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;"
    >
      {{commentContent}}
    </div>

    <a href="{{memoryUrl}}#comment-{{commentId}}">View Comment</a>
  </body>
</html>
```

## Security Considerations

### Encryption

- All shared content encrypted with AES-256
- Unique keys per sharing relationship
- Key derivation from user credentials
- No plaintext storage of sensitive data

### Access Control

- Time-based expiration for all shares
- Rate limiting on sharing operations
- Audit logging for all permission changes
- Secure token generation for share links

### Privacy

- Granular permission controls
- Data ownership clearly defined
- Easy revocation of access
- GDPR-compliant data handling

## Success Criteria

- [ ] Sharing workflow takes <30 seconds
- [ ] Real-time collaboration feels instant
- [ ] Comment system supports threaded discussions
- [ ] Permission changes propagate immediately
- [ ] Email invitations have >80% acceptance rate
- [ ] Security audit passes all requirements
- [ ] Collaboration features scale to 100+ users per memory
