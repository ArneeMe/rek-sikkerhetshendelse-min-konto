import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Cyber Security Game',
    description: 'Security Operations Center Training',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}
