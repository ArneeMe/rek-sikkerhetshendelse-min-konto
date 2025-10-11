export const COMPANY_CODES = {
    'ALPHA': { id: 1, name: 'Telesør Alpha' },
    'BRAVO': { id: 2, name: 'Telesør Bravo' },
    'CHARLIE': { id: 3, name: 'Telesør Charlie' },
    'DELTA': { id: 4, name: 'Telesør Delta' },
    'ECHO': { id: 5, name: 'Telesør Echo' },
    'FOXTROT': { id: 6, name: 'Telesør Foxtrot' },
    'GOLF': { id: 7, name: 'Telesør Golf' },
    'HOTEL': { id: 8, name: 'Telesør Hotel' },
    'INDIA': { id: 9, name: 'Telesør India' },
    'JULIET': { id: 10, name: 'Telesør Juliet' },
    'ADMIN-2024': { id: 0, name: 'Administrator', isAdmin: true },
} as const;

export type CompanyCode = keyof typeof COMPANY_CODES;

export function validateCompanyCode(code: string): { id: number; name: string; isAdmin?: boolean } | null {
    const upperCode = code.toUpperCase();
    if (upperCode in COMPANY_CODES) {
        return COMPANY_CODES[upperCode as CompanyCode];
    }
    return null;
}