// src/lib/db-helpers.ts

/**
 * Apply division filter to query
 * Returns rows where division matches OR division is null (broadcast)
 */
export function applyDivisionFilter<T>(query: T, division?: string): T {
    if (division) { // eslint-disable-next-line
        return (query as any).or(`division.eq.${division},division.is.null`) as T;
    }
    return query;
}

/**
 * Apply team filter to query
 * Returns rows where team_id matches OR team_id is null (broadcast to all teams)
 */
export function applyTeamFilter<T>(query: T, teamId: number): T { // eslint-disable-next-line
    return (query as any).or(`team_id.eq.${teamId},team_id.is.null`) as T;
}

/**
 * Apply both team and division filters
 */
export function applyStandardFilters<T>(
    query: T,
    teamId: number,
    division?: string,
): T {
    let filteredQuery = applyTeamFilter(query, teamId);
    if (division) {
        filteredQuery = applyDivisionFilter(filteredQuery, division);
    }

    return filteredQuery;
}