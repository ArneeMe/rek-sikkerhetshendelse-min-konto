export const COMPANY_CODES = {
    'ALPHA': { id: 1, name: 'Telesør Alpha' },
    'BRAVO': { id: 2, name: 'Telesør Bravo' },
    'CHARLIE': { id: 3, name: 'Telesør Charlie' },
    'ADMIN-2024': { id: 0, name: 'Administrator', isAdmin: true },
} as const;

export const DIVISIONS = [
    { id: 'tech', name: 'Drift', description: 'Drift og infrastruktur - servere, logger, nettverk' },
    { id: 'non-tech', name: 'Organisasjon', description: 'HR og organisasjon - brukersporing, e-post, roller' },
    { id: 'management', name: 'Ledelse og Kommunikasjon', description: 'Strategiske beslutninger, CISO, retningslinjer' },
] as const;

export type CompanyCode = keyof typeof COMPANY_CODES;
export type Division = typeof DIVISIONS[number]['id'];

export function validateCompanyCode(code: string): { id: number; name: string; isAdmin?: boolean } | null {
    const upperCode = code.toUpperCase();
    if (upperCode in COMPANY_CODES) {
        return COMPANY_CODES[upperCode as CompanyCode];
    }
    return null;
}