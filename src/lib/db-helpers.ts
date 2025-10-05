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
 * Apply company filter to query
 * Returns rows where company_id matches OR company_id is null (broadcast)
 */

export function applyCompanyFilter<T>(query: T, companyId: number): T { // eslint-disable-next-line
    return (query as any).or(`company_id.eq.${companyId},company_id.is.null`) as T;
}
/**
 * Apply both company and division filters
 */
export function applyStandardFilters<T>(
    query: T,
    companyId: number,
    division?: string,
): T {
    let filteredQuery = applyCompanyFilter(query, companyId);
    if (division) {
        filteredQuery = applyDivisionFilter(filteredQuery, division);
    }

    return filteredQuery;
}