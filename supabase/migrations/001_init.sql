-- supabase/migrations/001_init.sql
-- Initial database schema for cyber security game

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
                      source TEXT NOT NULL,  -- server id: vest, ost, nord, nodnett
                      message TEXT NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_events_company ON events(company_id);
CREATE INDEX idx_events_created ON events(created_at DESC);
CREATE INDEX idx_logs_company ON logs(company_id);
CREATE INDEX idx_logs_source ON logs(source);
CREATE INDEX idx_logs_timestamp ON logs(timestamp DESC);