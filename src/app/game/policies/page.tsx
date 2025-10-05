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
                    title="Policies & Compliance"
                    description="Security policies and compliance status"
                />

                {/* Compliance Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-slate-900 border-slate-700">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-slate-400">Policies Compliant</div>
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
                                    <div className="text-sm text-slate-400">Violations</div>
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
                                    <div className="text-sm text-slate-400">Pending Review</div>
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
                            Policy Violations Detected
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Violation 1 */}
                        <div className="border-l-4 border-red-600 pl-4 py-2">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-slate-100">Two-Person Approval Bypass</h4>
                                <Badge className="bg-red-600">Critical</Badge>
                            </div>
                            <p className="text-sm text-slate-400 mb-2">
                                Production deployment at 07:45 violated two-person approval policy.
                                CTO override was used without documented justification.
                            </p>
                            <div className="text-xs text-slate-500">
                                <span>Policy: SEC-004 (Change Management)</span>
                                <span className="mx-2">•</span>
                                <span>Occurred: 6 months ago</span>
                                <span className="mx-2">•</span>
                                <span>Approved by: CTO (unauthorized override)</span>
                            </div>
                        </div>

                        {/* Violation 2 */}
                        <div className="border-l-4 border-red-600 pl-4 py-2">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-slate-100">Excessive Admin Privileges</h4>
                                <Badge className="bg-red-600">Critical</Badge>
                            </div>
                            <p className="text-sm text-slate-400 mb-2">
                                Database Administrator role has access to production, backups, AND network infrastructure.
                                Violates principle of least privilege.
                            </p>
                            <div className="text-xs text-slate-500">
                                <span>Policy: SEC-002 (Access Control)</span>
                                <span className="mx-2">•</span>
                                <span>User: Ola Hansen (ID 47291)</span>
                                <span className="mx-2">•</span>
                                <span>Duration: 6 months</span>
                            </div>
                        </div>

                        {/* Violation 3 */}
                        <div className="border-l-4 border-orange-600 pl-4 py-2">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-slate-100">Outdated Backup Policy</h4>
                                <Badge className="bg-orange-600">High</Badge>
                            </div>
                            <p className="text-sm text-slate-400 mb-2">
                                Last backup is 4 days old. Policy requires daily backups with 24-hour retention verification.
                            </p>
                            <div className="text-xs text-slate-500">
                                <span>Policy: SEC-007 (Backup & Recovery)</span>
                                <span className="mx-2">•</span>
                                <span>Last backup: 4 days ago</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Security Recommendations */}
                <Card className="bg-slate-900 border-slate-700">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-400" />
                            Recommended Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Immediately revoke unauthorized CTO override privileges</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Implement role separation for database administrators</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Enforce mandatory two-person approval for all production changes</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Review and update access control matrix quarterly</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>Conduct immediate security audit of all privileged accounts</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </DivisionGuard>
    );
}
