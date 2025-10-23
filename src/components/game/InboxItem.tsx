// src/components/game/InboxItem.tsx
"use client";

import { useState } from "react";
import { Event } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Mail,
  X,
  AlertTriangle,
  Server,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface InboxItemProps {
  event: Event;
}

export function InboxItem({ event }: InboxItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = () => {
    switch (event.type) {
      case "email":
        return <Mail className="w-4 h-4" />;
      case "tweet":
        return <X className="w-4 h-4" />;
      case "alert":
        return <AlertTriangle className="w-4 h-4" />;
      case "server-status":
        return <Server className="w-4 h-4" />;
    }
  };

  const getSeverityBadge = () => {
    switch (event.severity) {
      case "low":
        return <Badge className="bg-blue-600">Lav</Badge>;
      case "medium":
        return <Badge className="bg-yellow-600">Medium</Badge>;
      case "high":
        return <Badge className="bg-orange-600">Høy</Badge>;
      case "critical":
        return <Badge className="bg-red-600">Kritisk</Badge>;
    }
  };

  const getTypeLabel = () => {
    switch (event.type) {
      case "email":
        return "E-post";
      case "tweet":
        return "Tweet";
      case "alert":
        return "Varsel";
      case "server-status":
        return "Serverstatus";
    }
  };

  return (
      <Card
          className={`transition-colors ${
              !event.read
                  ? "bg-slate-800 border-slate-700 hover:border-slate-600 border-l-4 border-l-blue-500"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
          }`}
      >
          <CardContent className="p-4">
              {/* Collapsed View - Always visible - Clickable header */}
              <div
                  className="flex items-center justify-between gap-3 cursor-pointer"
                  onClick={() => setIsExpanded(!isExpanded)}
              >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className={`flex-shrink-0 ${
                !event.read ? "text-slate-300" : "text-slate-500"
              }`}
            >
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3
                  className={`font-semibold truncate ${
                    !event.read ? "text-slate-100" : "text-slate-400"
                  }`}
                >
                  {event.title}
                </h3>
                {!event.read && (
                  <Badge variant="outline" className="text-xs flex-shrink-0">
                    Ny
                  </Badge>
                )}
              </div>
              {event.from && (
                <div
                  className={`text-xs mb-1 truncate ${
                    !event.read ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Fra: {event.from}
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{format(event.timestamp, "dd.MM.yyyy HH:mm")}</span>
                <span>•</span>
                <span>{getTypeLabel()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {getSeverityBadge()}
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>

        {/* Expanded View - Full content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="space-y-3">
              {/* Metadata */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-slate-500">Type:</span>{" "}
                  <span className="text-slate-300">{getTypeLabel()}</span>
                </div>
                <div>
                  <span className="text-slate-500">Tidspunkt:</span>{" "}
                  <span className="text-slate-300">
                    {format(event.timestamp, "dd. MMMM yyyy, HH:mm:ss")}
                  </span>
                </div>
                {event.from && (
                  <div className="col-span-2">
                    <span className="text-slate-500">Fra:</span>{" "}
                    <span className="text-slate-300">{event.from}</span>
                  </div>
                )}
              </div>

              {/* Content with preserved line breaks */}
              <div className="pt-3 border-t border-slate-800">
                <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {event.content}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}