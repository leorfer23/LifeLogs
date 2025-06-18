### ER Diagram (tables & key fields)

users

- id (uuid PK)
- email, name
- encryption_key (text)
- created_at

memories

- id (uuid PK)
- user_id (FK → users)
- title (text)
- body (richtext JSON)
- created_at, updated_at
- visibility (‘private’ | ‘shared’ | ‘public’)

attachments

- id (uuid PK)
- memory_id (FK)
- type (‘image’ | ‘audio’ | ‘file’)
- storage_path (text)
- transcription (text, nullable)
- metadata (jsonb) -- EXIF, duration, etc.

people

- id (uuid PK)
- user_id (owner)
- name, avatar_url, source (‘google_contacts’ | ‘manual’)

memory_people (junction)

- memory_id
- person_id
- role (‘author’, ‘participant’)

tags

- id serial PK
- name text unique

memory_tags

- memory_id
- tag_id

embeddings

- memory_id
- vector -- pgvector 1536 dims

shares

- id uuid PK
- memory_id
- collaborator_email
- permission (‘view’ | ‘comment’ | ‘edit’)
- status (‘pending’ | ‘accepted’)
- created_at

integrations

- id uuid PK
- user_id
- provider (‘gmail’ | ‘gcal’)
- refresh_token, scope
- connected_at
