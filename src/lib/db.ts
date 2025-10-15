// src/lib/db.ts
// Main database module - barrel export for all database operations

// Game session management
export {
    startGameSession,
    getActiveGameSession,
    endGameSession,
    getScheduledEventsForTime,
} from './db/db-game-sessions';

// Server operations
export {
    getServers,
    getServerById,
    updateServer,
} from './db/db-servers';

// Events management
export {
    getEvents,
    getEventById,
    markEventAsRead,
    createEvent,
    createScheduledEvent,
} from './db/db-events';

// Logs management
export {
    getAppLogs,
    getDbLogs,
    getAzureAuditLogs,
    getAzureSigninLogs,
    getCriticalLogsCount,
} from './db/db-logs';

// User activity
export {
    getUserActivity,
    getUserActivityById,
    getSuspiciousUsers,
    updateUserStatus,
} from './db/db-user-activity';

// Network connections
export {
    getNetworkConnections,
    getNetworkConnectionsByStatus,
    getSuspiciousConnections,
    getBlockedConnections,
    updateConnectionStatus,
} from './db/db-network';