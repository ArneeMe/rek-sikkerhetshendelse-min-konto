import { PageHeader } from "@/components/game/PageHeader";
import { FileText } from "lucide-react";
import { getSession } from "@/lib/session";
import { getDocuments } from "@/lib/db";
import { DocumentsClient } from "./document-client";

export default async function DocumentsPage() {
  const session = await getSession();
  const documents = await getDocuments(session!.teamId);

  return (
    <div className="space-y-6">
      <PageHeader
        icon={FileText}
        title="Dokumenter"
        description="Styrende dokumenter, retningslinjer og prosedyrer"
      />

      <DocumentsClient documents={documents} />
    </div>
  );
}
