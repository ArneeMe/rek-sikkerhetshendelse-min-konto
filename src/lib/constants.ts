export const COMPANY_CODES = {
    'NORD': { id: 1, name: 'Nordavind' },
    'VEST': { id: 2, name: 'Vestavind' },
    'OST': { id: 3, name: 'Østavind' },
    'SOR': { id: 4, name: 'Søravind' },
    'NORDVEST': { id: 5, name: 'Nordevestavind' },
    'SOROST': { id: 6, name: 'Sørøstavind' },
    'SORVEST': { id: 7, name: 'Sørvestavind' },
    'NORDOST': { id: 8, name: 'Nordøstavind' },
    'ADMIN-2025': { id: 0, name: 'Administrator', isAdmin: true },
} as const;

export type CompanyCode = keyof typeof COMPANY_CODES;

export function validateCompanyCode(code: string): { id: number; name: string; isAdmin?: boolean } | null {
    const upperCode = code.toUpperCase();
    if (upperCode in COMPANY_CODES) {
        return COMPANY_CODES[upperCode as CompanyCode];
    }
    return null;
}