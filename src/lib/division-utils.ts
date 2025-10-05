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
    if (!division) return 'Unknown';

    const names: Record<string, string> = {
        'tech': 'Tech Division',
        'non-tech': 'Non-Tech Division',
        'management': 'Management',
    };

    return names[division] || division;
}