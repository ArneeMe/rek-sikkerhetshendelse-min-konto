// src/lib/constants.ts
// Single company (Nordavind AS) with multiple teams

export const COMPANY_NAME = 'Nordavind AS';

export const TEAM_CODES = {
    'ALFA': { id: 1, name: 'Team Alfa' },
    'BRAVO': { id: 2, name: 'Team Bravo' },
    'CHARLIE': { id: 3, name: 'Team Charlie' },
    'DELTA': { id: 4, name: 'Team Delta' },
    'ECHO': { id: 5, name: 'Team Echo' },
    'FOXTROT': { id: 6, name: 'Team Foxtrot' },
    'GOLF': { id: 7, name: 'Team Golf' },
    'HOTEL': { id: 8, name: 'Team Hotel' },
    'ADMIN-2025': { id: 0, name: 'Administrator', isAdmin: true },
} as const;

export type TeamCode = keyof typeof TEAM_CODES;

export function validateTeamCode(code: string): { id: number; name: string; isAdmin?: boolean } | null {
    const upperCode = code.toUpperCase();
    if (upperCode in TEAM_CODES) {
        return TEAM_CODES[upperCode as TeamCode];
    }
    return null;
}