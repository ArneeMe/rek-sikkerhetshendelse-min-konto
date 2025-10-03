export const COMPANY_CODES = {
    'ALPHA': { id: 1, name: 'Company A' },
    'BRAVO': { id: 2, name: 'Company B' },
    'CHARLIE': { id: 3, name: 'Company C' },
    'ADMIN-2024': { id: 0, name: 'Admin', isAdmin: true },
} as const;

export type CompanyCode = keyof typeof COMPANY_CODES;

export function validateCompanyCode(code: string): { id: number; name: string; isAdmin?: boolean } | null {
    const upperCode = code.toUpperCase();
    if (upperCode in COMPANY_CODES) {
        return COMPANY_CODES[upperCode as CompanyCode];
    }
    return null;
}
