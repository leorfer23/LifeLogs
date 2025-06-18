# LifeLog OS — PRD (MVP v0.1)

## 1. Goal

Ship an invite-only web app that lets a single user:

1. Capture memories in text, image, or voice.
2. See them in a unified timeline/masonry.
3. Retrieve them via AI search.
4. Share a memory with one collaborator who can comment/edit.

## 2. Success Metrics

| Metric                      | Target after 30 days |
| --------------------------- | -------------------- |
| Day-7 Retention             | ≥ 40 %               |
| Avg. memories created / DAU | ≥ 3                  |
| Search latency (p95)        | < 300 ms             |
| “Delight” survey (1–5)      | ≥ 4.0                |

## 3. Key Features

1. **Capture Command Bar (⌘ K)**
   - Modal opens centred; accepts text, drag-n-drop images, voice record.
   - Auto-save draft after 2 s idle.
2. **AI Enrichment Pipeline**
   - Background cron → OpenAI → tags (`#food`, `#travel`), sentiment, entities.
   - Store embeddings (pgvector) for semantic search.
3. **Timeline / Masonry View**
   - Infinite scroll; lazy-loaded media.
   - Hover shows quick actions (edit, share).
4. **Memory Editor**
   - Rich-text WYSIWYG.
   - Side-panel suggestions: related memories, people, places.
   - Inline @mention to link memories/people.
5. **Sharing & Permissions**
   - “Share” → add e-mail → role: view / comment / edit.
   - Server-side AES; signed URL valid for logged-in collaborator.
6. **Integrations (read-only)**
   - Gmail: pull last 30 days threads with “has:attachment” or stars.
   - Google Calendar: import events → timeline entries.

## 4. Out of Scope for MVP

- Mobile native / offline PWA.
- External health/Spotify/YouTube integrations.
- End-to-end encryption & local-only key store.
- Public profiles / follow system.

## 5. Constraints & Risks

- One-person dev team → ruthless scope control.
- AI cost: budget 100 K tokens per user / month.
- GDPR export / delete must be rock-solid.
