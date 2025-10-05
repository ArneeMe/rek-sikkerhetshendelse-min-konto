// src/app/game/comms/page.tsx
import { DivisionGuard } from '@/components/game/DivisionGuard';
import { PageHeader } from '@/components/game/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Building2, Shield, AlertTriangle } from 'lucide-react';

export default function CommunicationsPage() {
    return (
        <DivisionGuard pagePath="/game/comms">
            <div className="space-y-6">
                <PageHeader
                    icon={Phone}
                    title="Communications"
                    description="External communications and stakeholder updates"
                />

                {/* NSM Communication */}
                <Card className="bg-slate-900 border-slate-700">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-blue-400" />
                                NSM (Nasjonal Sikkerhetsmyndighet)
                            </CardTitle>
                            <Badge className="bg-orange-600">Action Required</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="text-sm text-slate-300">
                            <p className="font-semibold mb-2">Status: Incident Reported</p>
                            <p className="text-slate-400">
                                NSM has been notified of the security incident. They are requesting a detailed timeline
                                of events and an assessment of compromised systems within 24 hours.
                            </p>
                        </div>
                        <div className="flex gap-2 text-xs text-slate-500">
                            <span>Last contact: 2 hours ago</span>
                            <span>•</span>
                            <span>Priority: High</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Datatilsynet Communication */}
                <Card className="bg-slate-900 border-slate-700">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-purple-400" />
                                Datatilsynet
                            </CardTitle>
                            <Badge variant="outline">72 Hours Remaining</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="text-sm text-slate-300">
                            <p className="font-semibold mb-2">GDPR Breach Notification</p>
                            <p className="text-slate-400">
                                Personal data breach notification deadline: 72 hours from discovery.
                                Must include: nature of breach, affected individuals, likely consequences, and mitigation measures.
                            </p>
                        </div>
                        <div className="flex gap-2 text-xs text-slate-500">
                            <span>Deadline: Tomorrow 14:00</span>
                            <span>•</span>
                            <span>Status: Pending</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Board Communication */}
                <Card className="bg-slate-900 border-slate-700">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                Board of Directors
                            </CardTitle>
                            <Badge className="bg-red-600">Urgent</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="text-sm text-slate-300">
                            <p className="font-semibold mb-2">Emergency Board Meeting Scheduled</p>
                            <p className="text-slate-400">
                                Board requires immediate briefing on: incident scope, financial impact,
                                customer communication strategy, and recovery timeline. Meeting in 4 hours.
                            </p>
                        </div>
                        <div className="flex gap-2 text-xs text-slate-500">
                            <span>Meeting: Today 16:00</span>
                            <span>•</span>
                            <span>Attendees: All board members + CISO</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Ransom Note */}
                <Card className="bg-slate-900 border-red-900">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-red-400">
                                <AlertTriangle className="w-5 h-5" />
                                Threat Actor Communication
                            </CardTitle>
                            <Badge className="bg-red-600">Critical</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="text-sm text-slate-300">
                            <p className="font-semibold mb-2">Ransom Demand Received</p>
                            <div className="bg-slate-950 p-4 rounded border border-red-900 font-mono text-xs text-red-300">
                                <p>We have access to your systems and backups.</p>
                                <p className="mt-2">This is not about money. This is about your company support for [REDACTED POLITICAL ISSUE].</p>
                                <p className="mt-2">We will continue disrupting your operations until you publicly retract your position.</p>
                                <p className="mt-2">- NordStorm APT</p>
                            </div>
                        </div>
                        <div className="flex gap-2 text-xs text-slate-500">
                            <span>Received: 6 hours ago</span>
                            <span>•</span>
                            <span>Type: Hacktivism</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DivisionGuard>
    );
}