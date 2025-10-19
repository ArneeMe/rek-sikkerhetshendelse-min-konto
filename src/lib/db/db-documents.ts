// src/lib/db/db-documents.ts
import { supabase } from "../supabase";
import type { DatabaseDocument } from "@/types/database";
import { applyTeamFilter } from "@/lib/db-helpers";

export async function getDocuments(
  teamId: number
): Promise<DatabaseDocument[]> {
  let query = supabase
    .from("documents")
    .select("*")
    .order("title", { ascending: true });

  query = applyTeamFilter(query, teamId);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching documents:", error);
    return [];
  }

  return (data || []) as DatabaseDocument[];
}

export async function getDocumentById(
  documentId: string,
  teamId: number
): Promise<DatabaseDocument | null> {
  let query = supabase
    .from("documents")
    .select("*")
    .eq("id", documentId)
    .single();

  query = applyTeamFilter(query, teamId);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching document:", error);
    return null;
  }

  return data as DatabaseDocument;
}
