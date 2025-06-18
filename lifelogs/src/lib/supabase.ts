import { createClient } from "@supabase/supabase-js";
import type {
  User,
  Entry,
  Tag,
  EntryWithDetails,
  UserWithSettings,
  EntryComment,
  EntryShare,
} from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Server-side Supabase client with service role key (only available on server)
export const createSupabaseAdmin = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is required for admin operations"
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Helper function to get authenticated user from server components
export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting user:", error);
    return null;
  }
  return user;
}

// Helper function to check if user is authenticated
export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    throw new Error("Authentication required");
  }
  return user;
}

// Database helper functions using direct Supabase queries

// User operations
export async function createUser(
  data: Omit<User, "id" | "created_at" | "updated_at">
) {
  const { data: user, error } = await supabase
    .from("users")
    .insert(data)
    .select("*, settings:user_settings(*)")
    .single();

  if (error) throw error;
  return user as UserWithSettings;
}

export async function getUserWithSettings(id: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*, settings:user_settings(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as UserWithSettings;
}

// Entry operations
export async function createEntry(
  data: Omit<Entry, "id" | "created_at" | "updated_at">
) {
  const { data: entry, error } = await supabase
    .from("entries")
    .insert(data)
    .select(
      `
      *,
      tags:entry_tags(
        *,
        tag:tags(*)
      )
    `
    )
    .single();

  if (error) throw error;
  return entry as EntryWithDetails;
}

export async function getUserEntries(userId: string, limit = 20) {
  const { data, error } = await supabase
    .from("entries")
    .select(
      `
      *,
      tags:entry_tags(
        *,
        tag:tags(*)
      )
    `
    )
    .eq("user_id", userId)
    .order("entry_date", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as EntryWithDetails[];
}

// Tag operations
export async function createTag(
  data: Omit<Tag, "id" | "created_at" | "updated_at">
) {
  const { data: tag, error } = await supabase
    .from("tags")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return tag as Tag;
}

export async function getUserTags(userId: string) {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .eq("user_id", userId)
    .order("name", { ascending: true });

  if (error) throw error;
  return data as Tag[];
}

// Vector similarity search (once we run the migrations)
export async function findSimilarEntries(
  userId: string,
  queryEmbedding: number[],
  limit = 5,
  threshold = 0.8
) {
  const { data, error } = await supabase.rpc("find_similar_entries", {
    query_embedding: queryEmbedding,
    user_id: userId,
    match_threshold: threshold,
    match_count: limit,
  });

  if (error) throw error;
  return data as Array<Entry & { similarity: number }>;
}

// Comment operations
export async function createComment(
  data: Omit<EntryComment, "id" | "created_at" | "updated_at">
) {
  const { data: comment, error } = await supabase
    .from("entry_comments")
    .insert(data)
    .select(
      `
      *,
      user:users(id, name, avatar)
    `
    )
    .single();

  if (error) throw error;
  return comment;
}

export async function getEntryComments(entryId: string) {
  const { data, error } = await supabase
    .from("entry_comments")
    .select(
      `
      *,
      user:users(id, name, avatar)
    `
    )
    .eq("entry_id", entryId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function updateComment(
  id: string,
  updates: { content?: string; is_edited?: boolean }
) {
  const { data, error } = await supabase
    .from("entry_comments")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select(
      `
      *,
      user:users(id, name, avatar)
    `
    )
    .single();

  if (error) throw error;
  return data;
}

export async function deleteComment(id: string) {
  const { error } = await supabase.from("entry_comments").delete().eq("id", id);

  if (error) throw error;
}

// Sharing operations
export async function shareEntry(data: Omit<EntryShare, "id" | "created_at">) {
  const { data: share, error } = await supabase
    .from("entry_shares")
    .insert(data)
    .select(
      `
      *,
      shared_with:users!shared_with_id(id, name, avatar, email)
    `
    )
    .single();

  if (error) throw error;
  return share;
}

export async function getEntryShares(entryId: string) {
  const { data, error } = await supabase
    .from("entry_shares")
    .select(
      `
      *,
      shared_with:users!shared_with_id(id, name, avatar, email)
    `
    )
    .eq("entry_id", entryId);

  if (error) throw error;
  return data;
}

export async function updateSharePermissions(
  shareId: string,
  permissions: "view" | "comment" | "edit"
) {
  const { data, error } = await supabase
    .from("entry_shares")
    .update({ permissions })
    .eq("id", shareId)
    .select(
      `
      *,
      shared_with:users!shared_with_id(id, name, avatar, email)
    `
    )
    .single();

  if (error) throw error;
  return data;
}

export async function removeShare(shareId: string) {
  const { error } = await supabase
    .from("entry_shares")
    .delete()
    .eq("id", shareId);

  if (error) throw error;
}

// Enhanced entry operations with comments and sharing
export async function getEntryWithComments(entryId: string) {
  const { data, error } = await supabase
    .from("entries")
    .select(
      `
      *,
      tags:entry_tags(
        *,
        tag:tags(*)
      ),
      comments:entry_comments(
        *,
        user:users(id, name, avatar)
      )
    `
    )
    .eq("id", entryId)
    .single();

  if (error) throw error;
  return data as EntryWithDetails;
}

export async function getUserEntriesWithComments(userId: string, limit = 20) {
  const { data, error } = await supabase
    .from("entries")
    .select(
      `
      *,
      tags:entry_tags(
        *,
        tag:tags(*)
      ),
      comments:entry_comments(
        *,
        user:users(id, name, avatar)
      )
    `
    )
    .eq("user_id", userId)
    .order("entry_date", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as EntryWithDetails[];
}
