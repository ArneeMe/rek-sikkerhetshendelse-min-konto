// src/lib/constants.ts
// Single company (Nordavind AS) with multiple teams

export const COMPANY_NAME = 'Nordavind AS';

export const TEAM_CODES = {
    'BEDKOMS BESTE': { id: 1, name: 'Bedkoms beste' },
    'WEBKOM WARRIORS': { id: 2, name: 'Webkom warriors' },
    'GODHJERTET GNIST': { id: 3, name: 'Godhjertet Gnist' },
    'ESCAPE ESC': { id: 4, name: 'Escape ESC' },
    'HELTENDE HYGGKOM': { id: 5, name: 'Heltende Hyggkom' },
    'TAKTISKE TILDE': { id: 6, name: 'Taktiske Tilde' },
    'CONSULTING COMMANDOER': { id: 7, name: 'Consulting Commandoer' },
    'PROGRAMMERBAR PATRULJEN': { id: 8, name: 'Programmerbar patruljen' },
    'ADMIN-2025': { id: 0, name: 'Administrator', isAdmin: true },
} as const;

export type TeamCode = keyof typeof TEAM_CODES;

// Normalize input: remove extra spaces, dots, convert to uppercase
function normalizeCode(code: string): string {
    return code
        .toUpperCase()
        .replace(/\s+/g, ' ')  // Normalize multiple spaces to single space
        .replace(/\./g, '')     // Remove dots
        .trim();
}

export function validateTeamCode(code: string): { id: number; name: string; isAdmin?: boolean } | null {
    const normalized = normalizeCode(code);

    if (normalized in TEAM_CODES) {
        return TEAM_CODES[normalized as TeamCode];
    }
    return null;
}