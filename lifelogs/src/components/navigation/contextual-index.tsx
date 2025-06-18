"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PaneHeader, PaneContent } from "@/components/layout/three-pane-layout";
import {
  Plus,
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  MapPin,
  Users,
  Search,
  Filter,
  SortAsc,
  Star,
  Bookmark,
} from "lucide-react";

interface MemoryItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "meeting" | "personal" | "travel" | "note" | "bookmark";
  people?: string[];
  location?: string;
  tags?: string[];
  isFavorite?: boolean;
}

interface PersonItem {
  id: string;
  name: string;
  avatar?: string;
  relationship: string;
  lastInteraction: string;
  memoryCount: number;
}

interface PlaceItem {
  id: string;
  name: string;
  address: string;
  visitCount: number;
  lastVisit: string;
  memoryCount: number;
}

// Sample data
const sampleMemories: MemoryItem[] = [
  {
    id: "1",
    title: "Team Meeting Notes",
    description: "Discussed Q4 planning and roadmap priorities",
    timestamp: "2 hours ago",
    type: "meeting",
    people: ["Sarah", "Mike", "Alex"],
    tags: ["work", "planning"],
  },
  {
    id: "2",
    title: "Coffee with Sarah",
    description: "Caught up on life and shared travel stories",
    timestamp: "Yesterday",
    type: "personal",
    people: ["Sarah"],
    location: "Blue Bottle Coffee",
    tags: ["friends", "coffee"],
    isFavorite: true,
  },
  {
    id: "3",
    title: "Trip to Japan",
    description: "Amazing experience in Tokyo and Kyoto",
    timestamp: "Last week",
    type: "travel",
    location: "Tokyo, Japan",
    tags: ["travel", "vacation"],
    isFavorite: true,
  },
  {
    id: "4",
    title: "Weekend Hiking",
    description: "Beautiful trail at Mount Tamalpais",
    timestamp: "3 days ago",
    type: "personal",
    location: "Mount Tamalpais, CA",
    tags: ["hiking", "nature"],
  },
];

const samplePeople: PersonItem[] = [
  {
    id: "1",
    name: "Sarah Chen",
    relationship: "Close Friend",
    lastInteraction: "Yesterday",
    memoryCount: 12,
  },
  {
    id: "2",
    name: "Mike Rodriguez",
    relationship: "Colleague",
    lastInteraction: "2 hours ago",
    memoryCount: 8,
  },
  {
    id: "3",
    name: "Alex Kim",
    relationship: "Team Member",
    lastInteraction: "2 hours ago",
    memoryCount: 15,
  },
  {
    id: "4",
    name: "Emma Thompson",
    relationship: "Friend",
    lastInteraction: "1 week ago",
    memoryCount: 6,
  },
];

const samplePlaces: PlaceItem[] = [
  {
    id: "1",
    name: "Blue Bottle Coffee",
    address: "Downtown, SF",
    visitCount: 23,
    lastVisit: "Yesterday",
    memoryCount: 8,
  },
  {
    id: "2",
    name: "Tokyo, Japan",
    address: "Shibuya District",
    visitCount: 1,
    lastVisit: "Last week",
    memoryCount: 15,
  },
  {
    id: "3",
    name: "Office - WeWork",
    address: "SOMA, San Francisco",
    visitCount: 156,
    lastVisit: "2 hours ago",
    memoryCount: 42,
  },
  {
    id: "4",
    name: "Mount Tamalpais",
    address: "Mill Valley, CA",
    visitCount: 5,
    lastVisit: "3 days ago",
    memoryCount: 5,
  },
];

interface ContextualIndexProps {
  activeView: string;
  onMemorySelect?: (memory: MemoryItem) => void;
  onPersonSelect?: (person: PersonItem) => void;
  onPlaceSelect?: (place: PlaceItem) => void;
  className?: string;
}

export function ContextualIndex({
  activeView,
  onMemorySelect,
  onPersonSelect,
  onPlaceSelect,
  className,
}: ContextualIndexProps) {
  const renderContent = () => {
    switch (activeView) {
      case "timeline":
        return (
          <TimelineView memories={sampleMemories} onSelect={onMemorySelect} />
        );
      case "memory-graph":
        return (
          <MemoryGraphView
            memories={sampleMemories}
            onSelect={onMemorySelect}
          />
        );
      case "people":
        return <PeopleView people={samplePeople} onSelect={onPersonSelect} />;
      case "places":
        return <PlacesView places={samplePlaces} onSelect={onPlaceSelect} />;
      case "search":
        return (
          <SearchView memories={sampleMemories} onSelect={onMemorySelect} />
        );
      default:
        return (
          <TimelineView memories={sampleMemories} onSelect={onMemorySelect} />
        );
    }
  };

  return (
    <div className={cn("h-full flex flex-col", className)}>
      {renderContent()}
    </div>
  );
}

// Timeline View Component
function TimelineView({
  memories,
  onSelect,
}: {
  memories: MemoryItem[];
  onSelect?: (memory: MemoryItem) => void;
}) {
  return (
    <>
      <PaneHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-sm font-semibold">Timeline</h2>
            <p className="text-xs text-muted-foreground">Recent memories</p>
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost">
              <Filter className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PaneHeader>
      <PaneContent className="p-4 space-y-3">
        {memories.map((memory) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            onClick={() => onSelect?.(memory)}
          />
        ))}
      </PaneContent>
    </>
  );
}

// Memory Graph View Component
function MemoryGraphView({
  memories,
  onSelect,
}: {
  memories: MemoryItem[];
  onSelect?: (memory: MemoryItem) => void;
}) {
  const connectedMemories = memories.filter(
    (m) => m.people && m.people.length > 0
  );

  return (
    <>
      <PaneHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-sm font-semibold">Connected Memories</h2>
            <p className="text-xs text-muted-foreground">
              Linked by people & places
            </p>
          </div>
          <Button size="sm" variant="ghost">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </PaneHeader>
      <PaneContent className="p-4 space-y-3">
        {connectedMemories.map((memory) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            onClick={() => onSelect?.(memory)}
            showConnections
          />
        ))}
      </PaneContent>
    </>
  );
}

// People View Component
function PeopleView({
  people,
  onSelect,
}: {
  people: PersonItem[];
  onSelect?: (person: PersonItem) => void;
}) {
  return (
    <>
      <PaneHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-sm font-semibold">People</h2>
            <p className="text-xs text-muted-foreground">
              {people.length} connections
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost">
              <SortAsc className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PaneHeader>
      <PaneContent className="p-4 space-y-3">
        {people.map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            onClick={() => onSelect?.(person)}
          />
        ))}
      </PaneContent>
    </>
  );
}

// Places View Component
function PlacesView({
  places,
  onSelect,
}: {
  places: PlaceItem[];
  onSelect?: (place: PlaceItem) => void;
}) {
  return (
    <>
      <PaneHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-sm font-semibold">Places</h2>
            <p className="text-xs text-muted-foreground">
              {places.length} locations
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost">
              <SortAsc className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PaneHeader>
      <PaneContent className="p-4 space-y-3">
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            onClick={() => onSelect?.(place)}
          />
        ))}
      </PaneContent>
    </>
  );
}

// Search View Component
function SearchView({
  memories,
  onSelect,
}: {
  memories: MemoryItem[];
  onSelect?: (memory: MemoryItem) => void;
}) {
  return (
    <>
      <PaneHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-sm font-semibold">Search</h2>
            <p className="text-xs text-muted-foreground">Find your memories</p>
          </div>
          <Button size="sm" variant="ghost">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </PaneHeader>
      <PaneContent className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search memories, people, places..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-3">
          {memories.slice(0, 2).map((memory) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              onClick={() => onSelect?.(memory)}
            />
          ))}
        </div>
      </PaneContent>
    </>
  );
}

// Memory Card Component
function MemoryCard({
  memory,
  onClick,
  showConnections = false,
}: {
  memory: MemoryItem;
  onClick?: () => void;
  showConnections?: boolean;
}) {
  const getTypeIcon = () => {
    switch (memory.type) {
      case "meeting":
        return <Calendar className="h-4 w-4 text-primary" />;
      case "personal":
        return <Heart className="h-4 w-4 text-accent" />;
      case "travel":
        return <MapPin className="h-4 w-4 text-success" />;
      case "note":
        return <MessageCircle className="h-4 w-4 text-warning" />;
      case "bookmark":
        return <Bookmark className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Calendar className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Card
      className="p-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          {getTypeIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-sm truncate">{memory.title}</h3>
            {memory.isFavorite && (
              <Star className="h-3 w-3 text-warning fill-current ml-2 shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {memory.description}
          </p>

          {showConnections && (memory.people || memory.location) && (
            <div className="flex items-center gap-2 mt-2">
              {memory.people && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {memory.people.join(", ")}
                  </span>
                </div>
              )}
              {memory.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {memory.location}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {memory.timestamp}
              </span>
            </div>

            {memory.tags && (
              <div className="flex items-center gap-1">
                {memory.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

// Person Card Component
function PersonCard({
  person,
  onClick,
}: {
  person: PersonItem;
  onClick?: () => void;
}) {
  return (
    <Card
      className="p-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
          <Users className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm">{person.name}</h3>
          <p className="text-xs text-muted-foreground">{person.relationship}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              Last: {person.lastInteraction}
            </span>
            <span className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded">
              {person.memoryCount} memories
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Place Card Component
function PlaceCard({
  place,
  onClick,
}: {
  place: PlaceItem;
  onClick?: () => void;
}) {
  return (
    <Card
      className="p-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-success/20 to-warning/20 rounded-full flex items-center justify-center">
          <MapPin className="h-4 w-4 text-success" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm">{place.name}</h3>
          <p className="text-xs text-muted-foreground">{place.address}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              Visited {place.visitCount} times
            </span>
            <span className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded">
              {place.memoryCount} memories
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
