# 3.0 Memory Capture System

## Overview

Build an intuitive, AI-powered memory capture system with support for text, images, voice, and rich media. Focus on minimal friction and delightful user experience with intelligent assistance.

## Key Features

- **⌘K Command Bar**: Modal overlay for quick capture
- **AI-Powered WYSIWYG Editor**: Intelligent block-based editor with AI assistance
- **Multi-modal Input**: Text, voice, images, files with AI processing
- **Auto-save Drafts**: Persistent draft system with conflict resolution
- **Voice-to-Text**: Real-time transcription with AI enhancement
- **Smart Suggestions**: AI-powered content completion and improvement

## Tech Stack

- **Editor**: Lexical (Meta's editor framework) with custom AI extensions
- **AI Writing**: OpenAI GPT-4o + Vercel AI SDK for streaming
- **Voice**: Web Speech API + OpenAI Whisper API
- **Upload**: Supabase Storage + @supabase/storage-js
- **Drag & Drop**: @dnd-kit/core for advanced interactions
- **Forms**: React Hook Form v7 + Zod validation
- **Auto-save**: Debounced saves with optimistic UI

## Why Lexical for LifeLogs

### Perfect for Memory Capture

- **Custom Memory Nodes**: Link memories, add temporal navigation
- **Voice Integration**: Native voice memo blocks with transcription
- **AI-First Design**: Stream AI responses directly into content
- **Infinite Blocks**: Any content type you can imagine
- **Performance**: Handles large life logs (50,000+ words)
- **Collaboration**: Built-in operational transforms for sharing

### Core Architecture Benefits

- **React 18+ Optimized**: Concurrent features, better performance
- **TypeScript Native**: Full type safety throughout
- **Plugin System**: Modular feature development
- **Meta Backed**: Long-term stability and updates
- **Modern Patterns**: Hooks, context, modern React patterns

## Editor Architecture Decision

### Option A: Lexical (Recommended)

- **Meta's modern editor framework** - completely free
- **Extensible plugin system** - build custom AI features
- **TypeScript-first** - excellent developer experience
- **Performance optimized** - handles large documents
- **Active development** - backed by Meta

### Option B: Slate.js

- **Completely customizable** - build exactly what you need
- **Immutable document model** - predictable state management
- **Plugin architecture** - modular feature development
- **Smaller bundle size** - minimal core

### Option C: Custom ContentEditable

- **Full control** - no framework limitations
- **Minimal dependencies** - lightweight solution
- **Learning opportunity** - deep understanding of editing
- **More development time** - requires building everything

**Recommendation**: Use **Lexical** for the best balance of features, performance, and development speed.

## Tasks

### 3.1 Command Bar Foundation

- [ ] Create modal command bar with keyboard trigger (⌘K)
- [ ] Build command palette with fuzzy search
- [ ] Implement command routing and execution
- [ ] Add command history and recent commands
- [ ] Create command suggestions and autocomplete
- [ ] Build contextual commands based on selection

### 3.2 AI-Powered WYSIWYG Editor

- [ ] Set up Lexical editor with React integration
- [ ] Create custom block-based architecture (like Notion)
- [ ] Build AI writing assistant integration with streaming
- [ ] Implement custom toolbar with formatting controls
- [ ] Add smart text completion and suggestions
- [ ] Create AI-powered content transformation tools

### 3.3 Custom Block System & Content Types

- [ ] Build extensible block system with Lexical nodes
- [ ] Create custom text blocks with rich formatting
- [ ] Implement heading blocks (H1-H6) with auto-styling
- [ ] Add quote blocks with attribution styling
- [ ] Build callout/alert blocks with custom components
- [ ] Create divider, spacer, and media blocks

### 3.4 AI Writing Features

- [ ] Implement "Continue writing" AI assistance
- [ ] Add "Improve writing" content enhancement
- [ ] Create "Change tone" text transformation
- [ ] Build "Summarize" content condensation
- [ ] Add "Expand on this" content extension
- [ ] Implement "Fix grammar" correction

### 3.5 Voice Recording & AI Transcription

- [ ] Implement Web Speech API for browser recording
- [ ] Create voice recording UI with waveform visualization
- [ ] Add start/stop/pause controls with keyboard shortcuts
- [ ] Build audio file handling and compression
- [ ] Integrate OpenAI Whisper for accurate transcription
- [ ] Add speaker detection and labeling with AI

### 3.6 Media Integration & AI Processing

- [ ] Set up Supabase Storage with intelligent organization
- [ ] Create drag-and-drop zones with visual feedback
- [ ] Build image upload with AI-powered alt text generation
- [ ] Implement automatic image compression and optimization
- [ ] Add AI-powered image captioning and description
- [ ] Create video/audio preview with AI-generated summaries

### 3.7 Slash Commands & Quick Actions

- [ ] Build "/" slash command system for quick insertion
- [ ] Create AI command suggestions based on context
- [ ] Add "/ai" commands for AI-powered content generation
- [ ] Implement "/voice" for voice recording blocks
- [ ] Build "/image" for smart image insertion
- [ ] Add "/template" for reusable content templates

### 3.8 Smart Auto-save & Conflict Resolution

- [ ] Implement debounced auto-save (2s idle timeout)
- [ ] Create draft persistence with version tracking
- [ ] Build conflict resolution for simultaneous edits
- [ ] Add visual indicators for save states
- [ ] Implement optimistic updates for better UX
- [ ] Create AI-powered draft recovery suggestions

### 3.9 Content Intelligence & Enhancement

- [ ] Build AI-powered tag suggestions based on content
- [ ] Create automatic link detection and preview generation
- [ ] Implement smart formatting suggestions
- [ ] Add content structure recommendations
- [ ] Build readability analysis and suggestions
- [ ] Create automatic cross-references to existing memories

### 3.10 Advanced Editor Features

- [ ] Implement collaborative editing with conflict resolution
- [ ] Add version history with visual diffs
- [ ] Create comment system within editor blocks
- [ ] Build mention system (@people, @memories)
- [ ] Add equation/math block support
- [ ] Implement code block with syntax highlighting

## AI Editor Extensions

### Core AI Features

```typescript
// AI-powered editor extensions
interface AIEditorExtensions {
  // Writing assistance
  continueWriting: () => Promise<string>;
  improveText: (text: string) => Promise<string>;
  changeTone: (text: string, tone: WritingTone) => Promise<string>;
  fixGrammar: (text: string) => Promise<string>;

  // Content generation
  generateOutline: (topic: string) => Promise<string[]>;
  expandIdea: (text: string) => Promise<string>;
  summarizeContent: (text: string) => Promise<string>;

  // Smart suggestions
  suggestTags: (content: string) => Promise<string[]>;
  suggestTitle: (content: string) => Promise<string>;
  generateDescription: (content: string) => Promise<string>;
}

type WritingTone =
  | "professional"
  | "casual"
  | "friendly"
  | "formal"
  | "creative"
  | "persuasive";
```

### AI Commands

```typescript
// Slash commands with AI integration
const AI_COMMANDS = [
  {
    command: "/ai-continue",
    description: "Continue writing with AI",
    action: () => aiExtensions.continueWriting(),
  },
  {
    command: "/ai-improve",
    description: "Improve selected text",
    action: (text: string) => aiExtensions.improveText(text),
  },
  {
    command: "/ai-summarize",
    description: "Summarize content",
    action: (text: string) => aiExtensions.summarizeContent(text),
  },
  {
    command: "/ai-outline",
    description: "Generate outline for topic",
    action: (topic: string) => aiExtensions.generateOutline(topic),
  },
];
```

## Component Architecture

### Editor Components

```typescript
// Main Editor System
<AIEditor />              // Main AI-powered editor
<EditorToolbar />         // Floating formatting toolbar
<SlashCommandMenu />      // / command palette
<AIAssistantPanel />      // Side panel for AI features

// Block Components
<TextBlock />             // Rich text content
<HeadingBlock />          // H1-H6 headers
<ImageBlock />            // Images with AI captions
<VoiceBlock />            // Audio recordings with transcripts
<QuoteBlock />            // Quoted content
<CalloutBlock />          // Alert/info boxes
<CodeBlock />             // Code with syntax highlighting

// AI Features
<AIWritingAssistant />    // Writing suggestions overlay
<AIContentGenerator />    // Content generation interface
<VoiceTranscriber />      // Real-time voice transcription
<SmartSuggestions />      // Contextual suggestions
```

### Editor State Management

```typescript
// Zustand store for editor state
interface EditorStore {
  // Document state
  content: EditorContent;
  isDirty: boolean;
  lastSaved: Date | null;

  // AI state
  isAIProcessing: boolean;
  aiSuggestions: AISuggestion[];
  selectedText: string | null;

  // Voice state
  isRecording: boolean;
  audioBlob: Blob | null;
  transcription: string | null;

  // Actions
  updateContent: (content: EditorContent) => void;
  saveDocument: () => Promise<void>;
  generateAISuggestion: (prompt: string) => Promise<void>;
  startVoiceRecording: () => void;
  stopVoiceRecording: () => void;
}
```

## Voice Integration

### Advanced Voice Features

```typescript
interface VoiceFeatures {
  // Recording capabilities
  recordAudio: () => Promise<Blob>;
  pauseRecording: () => void;
  resumeRecording: () => void;

  // AI transcription
  transcribeAudio: (audio: Blob) => Promise<TranscriptionResult>;
  improveTranscription: (text: string) => Promise<string>;

  // Voice commands
  processVoiceCommand: (command: string) => Promise<EditorAction>;
  enableVoiceCommands: () => void;
}

interface TranscriptionResult {
  text: string;
  confidence: number;
  speakers?: Speaker[];
  timestamps?: Timestamp[];
  language: string;
}
```

### Voice Commands

```typescript
// Voice commands for hands-free editing
const VOICE_COMMANDS = [
  "new paragraph",
  "add heading",
  "insert image",
  "start quote",
  "create list",
  "save document",
  "improve this text",
  "continue writing",
];
```

## AI Prompts for Editor

### Writing Assistant Prompts

```typescript
const WRITING_PROMPTS = {
  continueWriting: `
    Continue writing the following text in the same style and tone:
    
    "{previousText}"
    
    Write 1-2 more sentences that naturally follow this content.
  `,

  improveText: `
    Improve the following text for clarity, flow, and engagement:
    
    "{selectedText}"
    
    Keep the same meaning but make it more compelling and well-written.
  `,

  changeTone: `
    Rewrite the following text in a {tone} tone:
    
    "{selectedText}"
    
    Maintain the core message while adjusting the style and voice.
  `,

  generateOutline: `
    Create a structured outline for the topic: "{topic}"
    
    Provide 3-5 main points with 2-3 sub-points each.
    Format as a clear hierarchy.
  `,

  suggestTags: `
    Based on this content, suggest 3-8 relevant tags:
    
    "{content}"
    
    Return tags as lowercase with hyphens (e.g., "work-meeting", "family-time").
  `,
};
```

## Performance & Optimization

### Editor Performance

- Virtual scrolling for long documents
- Lazy loading of media blocks
- Efficient diff algorithms for collaboration
- Background AI processing
- Optimistic updates for responsiveness

### AI Response Streaming

```typescript
// Streaming AI responses for real-time feedback
const streamAIResponse = async (prompt: string) => {
  const stream = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      // Update editor with streaming content
      updateEditorContent(content);
    }
  }
};
```

## Accessibility & Keyboard Shortcuts

### Editor Shortcuts

- `⌘B` - Bold text
- `⌘I` - Italic text
- `⌘K` - Insert link
- `⌘/` - Show slash commands
- `⌘J` - AI writing assistant
- `⌘Shift+V` - Paste without formatting
- `⌘Z/⌘Y` - Undo/redo
- `⌘Enter` - Save and close
- `⌘Shift+A` - AI improve selection

### Voice Shortcuts

- `⌘Shift+R` - Start/stop recording
- `⌘Shift+T` - Transcribe audio
- `⌘Shift+V` - Voice command mode

## Success Criteria

- [ ] Editor feels as responsive as native apps
- [ ] AI suggestions are contextually relevant (>85% approval)
- [ ] Voice transcription accuracy >95%
- [ ] Auto-save never loses user data
- [ ] All features work via keyboard shortcuts
- [ ] Editor handles documents up to 50,000 words
- [ ] AI responses stream in real-time (<2s first token)
- [ ] Block system is infinitely extensible

## Building Custom Editor Features

### Lexical Setup & Core Implementation

```bash
# Install Lexical packages
npm install lexical @lexical/react @lexical/utils @lexical/rich-text @lexical/selection
npm install @lexical/list @lexical/link @lexical/code @lexical/table @lexical/mark
```

### Core Editor Components

```typescript
// Custom Lexical Editor Setup
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  EditorState,
  LexicalEditor,
} from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";

// Custom AI Editor Component
const AIEditor: React.FC = () => {
  const initialConfig = {
    namespace: "LifeLogsEditor",
    theme: customEditorTheme,
    onError: (error: Error) => console.error(error),
    nodes: [
      // Custom nodes we'll build
      HeadingNode,
      QuoteNode,
      CalloutNode,
      ImageNode,
      VoiceNode,
      AITextNode,
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={
              <div className="editor-placeholder">Start writing...</div>
            }
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <AIAssistantPlugin />
          <SlashCommandPlugin />
          <VoicePlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};
```

### Custom Block Nodes

```typescript
// Custom Heading Node
class HeadingNode extends ElementNode {
  __tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  static getType(): string {
    return "heading";
  }

  constructor(tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", key?: string) {
    super(key);
    this.__tag = tag;
  }

  createDOM(): HTMLElement {
    const tag = this.__tag;
    const element = document.createElement(tag);
    element.className = `editor-heading editor-heading-${tag}`;
    return element;
  }

  static importJSON(serializedNode: any): HeadingNode {
    const { tag } = serializedNode;
    return new HeadingNode(tag);
  }

  exportJSON(): any {
    return {
      ...super.exportJSON(),
      tag: this.__tag,
      type: "heading",
    };
  }
}

// Custom Quote Node
class QuoteNode extends ElementNode {
  static getType(): string {
    return "quote";
  }

  createDOM(): HTMLElement {
    const element = document.createElement("blockquote");
    element.className = "editor-quote";
    return element;
  }

  static importJSON(serializedNode: any): QuoteNode {
    return new QuoteNode();
  }

  exportJSON(): any {
    return {
      ...super.exportJSON(),
      type: "quote",
    };
  }
}

// Custom AI-Generated Text Node
class AITextNode extends TextNode {
  __isAIGenerated: boolean;

  constructor(text: string, isAIGenerated: boolean = false, key?: string) {
    super(text, key);
    this.__isAIGenerated = isAIGenerated;
  }

  createDOM(): HTMLElement {
    const element = super.createDOM();
    if (this.__isAIGenerated) {
      element.className += " ai-generated-text";
      element.setAttribute("data-ai-generated", "true");
    }
    return element;
  }
}
```

### AI Integration Plugin

```typescript
// AI Assistant Plugin for Lexical
const AIAssistantPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [isAIProcessing, setIsAIProcessing] = useState(false);

  const handleAICommand = async (command: string, selectedText?: string) => {
    setIsAIProcessing(true);

    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful writing assistant." },
          { role: "user", content: `${command}: ${selectedText}` },
        ],
        stream: true,
      });

      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          // Stream AI response into editor
          streamResponseIntoEditor(stream, selection);
        }
      });
    } catch (error) {
      console.error("AI command failed:", error);
    } finally {
      setIsAIProcessing(false);
    }
  };

  // Listen for AI commands
  useEffect(() => {
    return editor.registerCommand(
      AI_COMMAND,
      (payload: { command: string; text?: string }) => {
        handleAICommand(payload.command, payload.text);
        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  return null;
};

// Stream AI response into editor
const streamResponseIntoEditor = async (
  stream: any,
  selection: RangeSelection
) => {
  let accumulatedText = "";

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      accumulatedText += content;

      // Update editor with new content
      selection.insertText(content);
    }
  }
};
```

### Slash Command System

```typescript
// Slash Command Plugin
const SlashCommandPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [showCommands, setShowCommands] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const commands = [
    {
      name: "heading1",
      description: "Heading 1",
      icon: "📝",
      action: () => insertHeading("h1"),
    },
    {
      name: "heading2",
      description: "Heading 2",
      icon: "📝",
      action: () => insertHeading("h2"),
    },
    {
      name: "quote",
      description: "Quote block",
      icon: "💬",
      action: () => insertQuote(),
    },
    {
      name: "callout",
      description: "Callout box",
      icon: "💡",
      action: () => insertCallout(),
    },
    {
      name: "image",
      description: "Insert image",
      icon: "🖼️",
      action: () => insertImage(),
    },
    {
      name: "voice",
      description: "Voice recording",
      icon: "🎤",
      action: () => startVoiceRecording(),
    },
    {
      name: "ai-continue",
      description: "Continue with AI",
      icon: "🤖",
      action: () => continueWithAI(),
    },
    {
      name: "ai-improve",
      description: "Improve text",
      icon: "✨",
      action: () => improveWithAI(),
    },
  ];

  const insertHeading = (tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const headingNode = new HeadingNode(tag);
        selection.insertNodes([headingNode]);
      }
    });
  };

  const insertQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const quoteNode = new QuoteNode();
        selection.insertNodes([quoteNode]);
      }
    });
  };

  // Listen for slash commands
  useEffect(() => {
    return editor.registerTextContentListener((textContent: string) => {
      const lastChar = textContent.slice(-1);
      if (lastChar === "/") {
        setShowCommands(true);
      }
    });
  }, [editor]);

  return showCommands ? (
    <CommandMenu
      commands={commands}
      onSelect={(command) => {
        command.action();
        setShowCommands(false);
      }}
    />
  ) : null;
};
```

### Voice Integration

```typescript
// Voice Plugin for Lexical
const VoicePlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const transcription = await transcribeAudio(audioBlob);

        // Insert transcription into editor
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            selection.insertText(transcription);
          }
        });
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");
    formData.append("model", "whisper-1");

    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: formData,
      }
    );

    const result = await response.json();
    return result.text;
  };

  // Register voice commands
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.shiftKey && event.key === "R") {
        event.preventDefault();
        if (isRecording) {
          stopRecording();
        } else {
          startRecording();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isRecording]);

  return null;
};
```

### Custom Toolbar

```typescript
// Custom Toolbar Component
const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const formatText = (format: "bold" | "italic" | "underline") => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText(format);
      }
    });
  };

  return (
    <div className="toolbar">
      <ToolbarButton
        onClick={() => formatText("bold")}
        active={isBold}
        icon="B"
        tooltip="Bold (⌘B)"
      />
      <ToolbarButton
        onClick={() => formatText("italic")}
        active={isItalic}
        icon="I"
        tooltip="Italic (⌘I)"
      />
      <ToolbarSeparator />
      <ToolbarButton
        onClick={() => insertHeading("h1")}
        icon="H1"
        tooltip="Heading 1"
      />
      <ToolbarButton
        onClick={() => insertHeading("h2")}
        icon="H2"
        tooltip="Heading 2"
      />
      <ToolbarSeparator />
      <ToolbarButton
        onClick={() => triggerAIAssistant()}
        icon="🤖"
        tooltip="AI Assistant (⌘J)"
      />
    </div>
  );
};
```

## Week 1 Implementation Plan

### Day 1: Lexical Setup & Basic Editor

```bash
# Project setup
npm install lexical @lexical/react @lexical/utils @lexical/rich-text
npm install @lexical/selection @lexical/history @lexical/clipboard
npm install @lexical/list @lexical/link @lexical/code

# Create basic editor structure
src/
  components/
    editor/
      AIEditor.tsx          # Main editor component
      plugins/              # All editor plugins
        ToolbarPlugin.tsx
        AIAssistantPlugin.tsx
        SlashCommandPlugin.tsx
      nodes/                # Custom node definitions
        HeadingNode.ts
        QuoteNode.ts
        VoiceNode.ts
      theme/                # Editor styling
        editorTheme.ts
```

### Day 2: Custom Nodes & Blocks

- [ ] Create HeadingNode (H1-H6)
- [ ] Build QuoteNode with attribution
- [ ] Add CalloutNode for alerts/info boxes
- [ ] Implement basic drag & drop for blocks
- [ ] Style all nodes with Tailwind

### Day 3: Slash Commands & Toolbar

- [ ] Build slash command system (`/heading`, `/quote`, etc.)
- [ ] Create floating toolbar for formatting
- [ ] Add keyboard shortcuts (⌘B, ⌘I, ⌘K)
- [ ] Implement command palette integration

### Day 4: Auto-save & State Management

- [ ] Set up Zustand store for editor state
- [ ] Implement debounced auto-save (2s delay)
- [ ] Add draft persistence with localStorage
- [ ] Create save status indicators

### Day 5: Polish & Testing

- [ ] Add loading states and skeleton screens
- [ ] Implement error boundaries
- [ ] Write unit tests for core functionality
- [ ] Performance optimization and bundle analysis

**Goal**: Working Lexical editor with custom blocks and auto-save

## Complete 4-Week Development Roadmap

### Week 2: AI Integration & Voice

- [ ] **OpenAI Integration**: Set up streaming GPT-4o responses
- [ ] **AI Commands**: `/ai-continue`, `/ai-improve`, `/ai-summarize`
- [ ] **Voice Recording**: Web Speech API + MediaRecorder
- [ ] **Whisper Transcription**: Real-time audio-to-text
- [ ] **AI Suggestions**: Smart content recommendations
- [ ] **Streaming UI**: Real-time text generation feedback

### Week 3: Advanced Features & Media

- [ ] **Image Blocks**: Upload, resize, AI captions
- [ ] **Voice Memo Blocks**: Audio with transcription overlay
- [ ] **Memory Linking**: Cross-reference other memories
- [ ] **Smart Templates**: AI-generated content templates
- [ ] **Collaborative Editing**: Real-time multi-user support
- [ ] **Version History**: Track and restore changes

### Week 4: Performance & Polish

- [ ] **Virtual Scrolling**: Handle 50,000+ word documents
- [ ] **Bundle Optimization**: Code splitting and lazy loading
- [ ] **Accessibility**: Full keyboard navigation, screen readers
- [ ] **Mobile Support**: Touch gestures and responsive design
- [ ] **Error Handling**: Graceful degradation and recovery
- [ ] **Production Testing**: Load testing and optimization

## Immediate Next Steps (Start Today!)

### 1. Create Project Structure

```bash
# In your Next.js project
mkdir -p src/components/editor/{plugins,nodes,theme,utils}
mkdir -p src/hooks/editor
mkdir -p src/types/editor
```

### 2. Install Lexical Dependencies

```bash
npm install lexical @lexical/react @lexical/utils @lexical/rich-text
npm install @lexical/selection @lexical/history @lexical/clipboard
npm install @lexical/list @lexical/link @lexical/code @lexical/mark
```

### 3. Create Basic Editor Component

```typescript
// src/components/editor/AIEditor.tsx
"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { editorTheme } from "./theme/editorTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";

const AIEditor: React.FC = () => {
  const initialConfig = {
    namespace: "LifeLogsEditor",
    theme: editorTheme,
    onError: (error: Error) => {
      console.error("Lexical Error:", error);
    },
    nodes: [
      // We'll add custom nodes here
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative">
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[400px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            }
            placeholder={
              <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                Start writing your memory...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default AIEditor;
```

### 4. Create Basic Theme

```typescript
// src/components/editor/theme/editorTheme.ts
export const editorTheme = {
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
  paragraph: "mb-1",
  heading: {
    h1: "text-4xl font-bold mb-4",
    h2: "text-3xl font-bold mb-3",
    h3: "text-2xl font-bold mb-2",
    h4: "text-xl font-bold mb-2",
    h5: "text-lg font-bold mb-2",
    h6: "text-base font-bold mb-2",
  },
  quote: "border-l-4 border-gray-300 pl-4 italic text-gray-600",
  list: {
    ol: "list-decimal ml-4",
    ul: "list-disc ml-4",
  },
};
```

### 5. Create Basic Toolbar

```typescript
// src/components/editor/plugins/ToolbarPlugin.tsx
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { useState } from "react";

const ToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const formatBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  };

  const formatItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  };

  return (
    <div className="flex gap-2 p-2 border-b">
      <button
        onClick={formatBold}
        className={`px-3 py-1 rounded ${
          isBold ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        B
      </button>
      <button
        onClick={formatItalic}
        className={`px-3 py-1 rounded ${
          isItalic ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        I
      </button>
    </div>
  );
};

export default ToolbarPlugin;
```

## Success Metrics for Week 1

- [ ] Editor renders and accepts text input
- [ ] Basic formatting (bold, italic) works
- [ ] Auto-save functionality implemented
- [ ] No performance issues with 1000+ words
- [ ] Keyboard shortcuts functional
- [ ] Mobile-responsive design

**Your Lexical journey starts now! 🚀 Focus on getting the basic editor working first, then we'll add the AI magic in Week 2.**
