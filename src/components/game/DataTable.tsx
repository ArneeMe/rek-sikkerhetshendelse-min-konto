// src/components/game/DataTable.tsx
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T) => ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
                                                                 columns,
                                                                 data,
                                                                 emptyMessage = 'Ingen data tilgjengelig'
                                                             }: DataTableProps<T>) {
    if (data.length === 0) {
        return (
            <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-8 text-center text-slate-400">
                    {emptyMessage}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-slate-900 border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-800">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className={`px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider ${column.className || ''}`}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                    {data.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className={`px-4 py-3 text-sm text-slate-300 ${column.className || ''}`}>
                                    {column.render
                                        ? column.render(item)
                                        : String(item[column.key as keyof T] || '-')}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}