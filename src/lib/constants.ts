export const COMPANY_CODES = {
    'ALPHA': { id: 1, name: 'Company A' },
    'BRAVO': { id: 2, name: 'Company B' },
    'CHARLIE': { id: 3, name: 'Company C' },
    'ADMIN-2024': { id: 0, name: 'Admin', isAdmin: true },
} as const;

export const DIVISIONS = [
    { id: 'tech', name: 'Tech Division', description: 'Technical team - servers, logs, network' },
    { id: 'non-tech', name: 'Non-Tech Division', description: 'User tracking, emails, roles' },
    { id: 'management', name: 'Management', description: 'Strategic decisions, CISO, policies' },
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