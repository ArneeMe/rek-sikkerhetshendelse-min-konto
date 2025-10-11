// src/app/game/comms/page.tsx
import { PageHeader } from '@/components/game/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Building2, Shield, AlertTriangle } from 'lucide-react';

export default function CommunicationsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                icon={Phone}
                title="Kommunikasjon"
                description="Ekstern kommunikasjon og oppdateringer til interessenter"
            />

            {/* NSM Communication */}
            <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-400" />
                            NSM (Nasjonal Sikkerhetsmyndighet)
                        </CardTitle>
                        <Badge className="bg-orange-600">Handling påkrevd</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="text-sm text-slate-300">
                        <p className="font-semibold mb-2">Status: Hendelse rapportert</p>
                        <p className="text-slate-400">
                            NSM er varslet om sikkerhetshendelsen. De ber om en detaljert tidslinje
                            av hendelser og en vurdering av kompromitterte systemer innen 24 timer.
                        </p>
                    </div>
                    <div className="flex gap-2 text-xs text-slate-500">
                        <span>Siste kontakt: for 2 timer siden</span>
                        <span>•</span>
                        <span>Prioritet: Høy</span>
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
                        <Badge variant="outline">72 timer gjenstår</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="text-sm text-slate-300">
                        <p className="font-semibold mb-2">GDPR bruddvarsel</p>
                        <p className="text-slate-400">
                            Frist for varsel om personopplysningsbrudd: 72 timer fra oppdagelse.
                            Må inkludere: type brudd, berørte individer, sannsynlige konsekvenser og mottiltak.
                        </p>
                    </div>
                    <div className="flex gap-2 text-xs text-slate-500">
                        <span>Frist: I morgen 14:00</span>
                        <span>•</span>
                        <span>Status: Venter</span>
                    </div>
                </CardContent>
            </Card>

            {/* Board Communication */}
            <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            Styret
                        </CardTitle>
                        <Badge className="bg-red-600">Haster</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="text-sm text-slate-300">
                        <p className="font-semibold mb-2">Hastemøte i styret planlagt</p>
                        <p className="text-slate-400">
                            Styret krever umiddelbar briefing om: omfang av hendelsen, økonomisk påvirkning,
                            kundekommunikasjonsstrategi og gjenopprettingstidslinje. Møte om 4 timer.
                        </p>
                    </div>
                    <div className="flex gap-2 text-xs text-slate-500">
                        <span>Møte: I dag 16:00</span>
                        <span>•</span>
                        <span>Deltakere: Alle styremedlemmer + CISO</span>
                    </div>
                </CardContent>
            </Card>

            {/* Ransom Note */}
            <Card className="bg-slate-900 border-red-900">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-red-400">
                            <AlertTriangle className="w-5 h-5" />
                            Trusselsaktør-kommunikasjon
                        </CardTitle>
                        <Badge className="bg-red-600">Kritisk</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="text-sm text-slate-300">
                        <p className="font-semibold mb-2">Løsepengeforespørsel mottatt</p>
                        <div className="bg-slate-950 p-4 rounded border border-red-900 font-mono text-xs text-red-300">
                            <p>Vi har tilgang til deres systemer og backuper.</p>
                            <p className="mt-2">Dette handler ikke om penger. Dette handler om deres selskapsstøtte til [SLADDET POLITISK SAK].</p>
                            <p className="mt-2">Vi vil fortsette å forstyrre deres drift til dere offentlig trekker tilbake deres posisjon.</p>
                            <p className="mt-2">- NordStorm APT</p>
                        </div>
                    </div>
                    <div className="flex gap-2 text-xs text-slate-500">
                        <span>Mottatt: for 6 timer siden</span>
                        <span>•</span>
                        <span>Type: Hacktivisme</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}