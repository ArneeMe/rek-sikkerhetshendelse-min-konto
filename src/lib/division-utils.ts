// src/lib/division-utils.ts
import { DIVISION_NAV, PAGE_ACCESS, NavItem } from './navigation-config';

/**
 * Check if a user's division can access a specific page
 */
export function canAccessPage(
    userDivision: string | undefined,
    pagePath: string
): boolean {
    if (!userDivision) return false;

    const allowedDivisions = PAGE_ACCESS[pagePath];
    if (!allowedDivisions) return false;

    return allowedDivisions.includes(userDivision);
}

/**
 * Get navigation items for a specific division
 */
export function getDivisionNavItems(division: string | undefined): NavItem[] {
    if (!division) return [];
    return DIVISION_NAV[division] || [];
}

/**
 * Get division display name
 */
export function getDivisionDisplayName(division: string | undefined): string {
    if (!division) return 'Ukjent';

    const names: Record<string, string> = {
        'tech': 'Drift',
        'non-tech': 'Organisasjon',
        'management': 'Ledelse og Kommunikasjon',
    };

    return names[division] || division;
}