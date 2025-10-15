// src/app/admin/csv-upload.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

export function CsvUpload() {
    const [table, setTable] = useState<string>('app_logs');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError('');
            setSuccess('');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('table', table);

            const response = await fetch('/api/admin/upload-csv', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || 'Upload failed');
                setLoading(false);
                return;
            }

            setSuccess(result.message || 'Upload successful');
            setFile(null);
            // Reset file input
            const fileInput = document.getElementById('csv-file-input') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Last opp CSV
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Table Selection */}
                <div>
                    <label className="text-sm text-slate-400 mb-2 block">Loggtype</label>
                    <Select value={table} onValueChange={setTable}>
                        <SelectTrigger className="bg-slate-800 border-slate-700">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="app_logs">App Server Logs</SelectItem>
                            <SelectItem value="db_logs">Database Logs</SelectItem>
                            <SelectItem value="azure_audit_logs">Azure Audit Logs</SelectItem>
                            <SelectItem value="azure_signin_logs">Azure Sign-in Logs</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* File Upload */}
                <div>
                    <label className="text-sm text-slate-400 mb-2 block">CSV-fil</label>
                    <input
                        id="csv-file-input"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="w-full text-sm text-slate-400
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-slate-800 file:text-slate-300
                            hover:file:bg-slate-700
                            cursor-pointer"
                    />
                    {file && (
                        <p className="text-xs text-slate-500 mt-2">
                            Valgt: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                        </p>
                    )}
                </div>

                {/* Upload Button */}
                <Button
                    onClick={handleUpload}
                    disabled={loading || !file}
                    className="w-full"
                >
                    {loading ? 'Laster opp...' : 'Last opp CSV'}
                </Button>

                {/* Success Message */}
                {success && (
                    <div className="p-4 bg-green-900/20 border border-green-800 rounded-lg">
                        <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            <span className="font-semibold">{success}</span>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
                        <div className="flex items-center gap-2 text-red-400">
                            <AlertCircle className="w-4 h-4" />
                            <span className="font-semibold">{error}</span>
                        </div>
                    </div>
                )}

                {/* Format Info */}
                <div className="text-xs text-slate-500 space-y-1">
                    <p className="font-semibold">CSV Format:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>App Logs: Timestamp, EventType, User, SourceIP, TargetResource, Action, Details, Result</li>
                        <li>DB Logs: Timestamp, EventType, User, SourceIP, Database, Query, RowsAffected, Details, Result</li>
                        <li>Azure Audit: Timestamp, Actor, Action, Target, TargetType, Details, SourceIP, Result</li>
                        <li>Azure Sign-in: Timestamp, User, SourceIP, Location, Application, Status, FailureReason, DeviceInfo</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}