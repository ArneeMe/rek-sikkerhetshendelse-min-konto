// src/lib/db-helpers.ts

/**
 * Apply team filter to query
 * Returns rows where team_id matches OR team_id is null (broadcast to all teams)
 */
export function applyTeamFilter<T>(query: T, teamId: number): T { // eslint-disable-next-line
    return (query as any).or(`team_id.eq.${teamId},team_id.is.null`) as T;
}