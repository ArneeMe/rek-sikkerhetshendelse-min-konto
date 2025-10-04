-- supabase/migrations/001_schema.sql
-- Core database schema for cyber security game

-- Servers/Basestations table
CREATE TABLE servers (
                         id TEXT PRIMARY KEY,
                         name TEXT NOT NULL,
                         status TEXT NOT NULL CHECK (status IN ('online', 'warning', 'critical', 'offline')),
                         load INT DEFAULT 0 CHECK (load >= 0 AND load <= 100),
                         alerts INT DEFAULT 0,
                         updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table (inbox items, alerts, emails, tweets)
CREATE TABLE events (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        company_id INT,  -- null = broadcast to all companies
                        type TEXT NOT NULL CHECK (type IN ('email', 'tweet', 'alert', 'server-status')),
                        title TEXT NOT NULL,
                        content TEXT NOT NULL,
                        severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
                        from_sender TEXT,  -- email address or twitter handle
                        read BOOLEAN DEFAULT false,
                        created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Logs table (system logs)
CREATE TABLE logs (
                      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                      company_id INT,  -- null = visible to all companies
                      timestamp TIMESTAMPTZ DEFAULT NOW(),
                      level TEXT NOT NULL CHECK (level IN ('info', 'warning', 'error', 'critical')),
                      source TEXT NOT NULL,  -- server id reference
                      message TEXT NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_servers_status ON servers(status);
CREATE INDEX idx_events_company ON events(company_id);
CREATE INDEX idx_events_created ON events(created_at DESC);
CREATE INDEX idx_logs_company ON logs(company_id);
CREATE INDEX idx_logs_source ON logs(source);
CREATE INDEX idx_logs_timestamp ON logs(timestamp DESC);