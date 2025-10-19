// src/app/game/documents/documents-client.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, X } from "lucide-react";
import { DatabaseDocument } from "@/types/database";
import { format } from "date-fns";

interface DocumentsClientProps {
  documents: DatabaseDocument[];
}

export function DocumentsClient({ documents }: DocumentsClientProps) {
  const [selectedDocument, setSelectedDocument] =
    useState<DatabaseDocument | null>(null);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "policy":
        return <Badge className="bg-blue-600">Retningslinjer</Badge>;
      case "procedure":
        return <Badge className="bg-purple-600">Prosedyre</Badge>;
      case "guide":
        return <Badge className="bg-green-600">Veiledning</Badge>;
      default:
        return <Badge variant="outline">Annet</Badge>;
    }
  };

  return (
    <>
      {/* Document List */}
      <div className="space-y-3">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <Card
              key={doc.id}
              className="bg-slate-900 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
              onClick={() => setSelectedDocument(doc)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-100 mb-1">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Oppdatert:{" "}
                        {format(new Date(doc.updated_at), "dd.MM.yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getCategoryBadge(doc.category)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-8 text-center text-slate-400">
              Ingen dokumenter tilgjengelig
            </CardContent>
          </Card>
        )}
      </div>

      {/* Document Modal/Popup */}
      {selectedDocument && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDocument(null)}
        >
          <div
            className="bg-slate-900 border-2 border-slate-700 rounded-xl max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div className="flex items-center gap-3 flex-1">
                <FileText className="w-6 h-6 text-blue-400" />
                <div>
                  <h2 className="text-xl font-bold text-slate-100">
                    {selectedDocument.title}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Oppdatert:{" "}
                    {format(
                      new Date(selectedDocument.updated_at),
                      "dd. MMMM yyyy, HH:mm"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getCategoryBadge(selectedDocument.category)}
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Lukk"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
              <div className="prose prose-invert prose-slate max-w-none">
                <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {selectedDocument.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
