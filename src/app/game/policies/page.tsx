// src/app/game/policies/page.tsx
import { DivisionGuard } from '@/components/game/DivisionGuard';
import { PageHeader } from '@/components/game/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function PoliciesPage() {
    return (
        <DivisionGuard pagePath="/game/policies">
            <div className="space-y-6">
                <PageHeader
                    icon={Shield}
                    title="Retningslinjer og etterlevelse"
                    description="Sikkerhetsretningslinjer og etterlevingsstatus"
                />

                {/* Compliance Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-slate-900 border-slate-700">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-slate-400">Retningslinjer etterlevd</div>
                                    <div className="text-2xl font-bold text-green-400 mt-1">12/15</div>
                                </div>
                                <CheckCircle className="w-8 h-8 text-green-400" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-700">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-slate-400">Brudd</div>
                                    <div className="text-2xl font-bold text-red-400 mt-1">3</div>
                                </div>
                                <XCircle className="w-8 h-8 text-red-400" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border-slate-700">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-slate-400">Venter på gjennomgang</div>
                                    <div className="text-2xl font-bold text-orange-400 mt-1">2</div>
                                </div>
                                <AlertCircle className="w-8 h-8 text-orange-400" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Policy Violations */}
                <Card className="bg-slate-900 border-slate-700">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <XCircle className="w-5 h-5 text-red-400" />
                            Regelbrudd oppdaget
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Violation 1 */}
                        <div className="border-l-4 border-red-600 pl-4 py-2">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-slate-100">Omgåelse av to-persons godkjenning</h4>
                                <Badge className="bg-red-600">Kritisk</Badge>
                            </div>
                            <p className="text-sm text-slate-400 mb-2">
                                Produksjonsdistribusjon kl 07:45 brøt med to-persons godkjenningspolicy.
                                CTO-override ble brukt uten dokumentert begrunnelse.
                            </p>
                            <div className="text-xs text-slate-500">
                                <span>Retningslinje: SEC-004 (Endringshåndtering)</span>
                                <span className="mx-2">•</span>
                                <span>Skjedde: for 6 måneder siden</span>
                                <span className="mx-2">•</span>
                                <span>Godkjent av: CTO (uautorisert override)</span>
                            </div>
                        </div>

                        {/* Violation 2 */}
                        <div className="border-l-4 border-red-600 pl-4 py-2">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-slate-100">Overdrevne administratorrettigheter</h4>
                                <Badge className="bg-red-600">Kritisk</Badge>
                            </div>
                            <p className="text-sm text-slate-400 mb-2">
                                Databaseadministrator-rollen har tilgang til produksjon, backuper OG nettverksinfrastruktur.
                                Bryter med prinsippet om minste privilegium.
                            </p>
                            <div className="text-xs text-slate-500">
                                <span>Retningslinje: SEC-002 (Tilgangskontroll)</span>
                                <span className="mx-2">•</span>
                                <span>Bruker: Ola Hansen (ID 47291)</span>
                                <span className="mx-2">•</span>
                                <span>Varighet: 6 måneder</span>
                            </div>
                        </div>

                        {/* Violation 3 */}
                        <div className="border-l-4 border-orange-600 pl-4 py-2">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-slate-100">Utdatert backup-policy</h4>
                                <Badge className="bg-orange-600">Høy</Badge>
                            </div>
                            <p className="text-sm text-slate-400 mb-2">
                                Siste backup er 4 dager gammel. Policy krever daglige backuper med 24-timers bekreftelse.
                            </p>
                            <div className="text-xs text-slate-500">
                                <span>Retningslinje: SEC-007 (Backup & Gjenoppretting)</span>
                                <span className="mx-2">•</span>
                                <span>Siste backup: for 4 dager siden</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Security Recommendations */}
                <Card className="bg-slate-900 border-slate-700">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-400" />
                            Anbefalte handlinger
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Tilbakekall umiddelbart uautoriserte CTO-override-privilegier</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Implementer rolleseparasjon for databaseadministratorer</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Håndhev obligatorisk to-persons godkjenning for alle produksjonsendringer</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Gjennomgå og oppdater tilgangskontrollmatrise kvartalsvis</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Utfør umiddelbar sikkerhetsrevisjon av alle privilegerte kontoer</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </DivisionGuard>
    );
}
