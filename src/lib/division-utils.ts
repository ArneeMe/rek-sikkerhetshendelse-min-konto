// src/lib/division-utils.ts
import { NAVIGATION, NavItem } from './navigation-config';

/**
 * Get navigation items for any user (no division filtering)
 */
export function getNavItems(): NavItem[] {
    return NAVIGATION;
}