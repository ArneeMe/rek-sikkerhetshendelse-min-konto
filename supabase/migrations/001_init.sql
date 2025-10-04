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
                        division TEXT CHECK (division IN ('tech', 'non-tech', 'management')),  -- null = visible to all divisions
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
                      division TEXT CHECK (division IN ('tech', 'non-tech', 'management')),  -- null = visible to all divisions
                      timestamp TIMESTAMPTZ DEFAULT NOW(),
                      level TEXT NOT NULL CHECK (level IN ('info', 'warning', 'error', 'critical')),
                      source TEXT NOT NULL,  -- server id reference
                      message TEXT NOT NULL
);
-- supabase/migrations/005_game_sessions.sql
-- Tables for timed event system

-- Game sessions table (tracks when games start/end)
CREATE TABLE game_sessions (
                               id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                               started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                               duration_minutes INT DEFAULT 120,
                               status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'ended')),
                               created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scheduled events table (template events with relative timing)
CREATE TABLE scheduled_events (
                                  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                  trigger_at_minutes INT NOT NULL,  -- Minutes after game start
                                  division TEXT CHECK (division IN ('tech', 'non-tech', 'management')),
                                  type TEXT NOT NULL CHECK (type IN ('email', 'tweet', 'alert', 'server-status')),
                                  title TEXT NOT NULL,
                                  content TEXT NOT NULL,
                                  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
                                  from_sender TEXT,
                                  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_game_sessions_status ON game_sessions(status);
CREATE INDEX idx_scheduled_events_trigger ON scheduled_events(trigger_at_minutes);
CREATE INDEX idx_servers_status ON servers(status);
CREATE INDEX idx_events_company ON events(company_id);
CREATE INDEX idx_events_division ON events(division);
CREATE INDEX idx_events_created ON events(created_at DESC);
CREATE INDEX idx_logs_company ON logs(company_id);
CREATE INDEX idx_logs_division ON logs(division);
CREATE INDEX idx_logs_source ON logs(source);
CREATE INDEX idx_logs_timestamp ON logs(timestamp DESC);