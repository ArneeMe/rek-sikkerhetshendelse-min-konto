-- supabase/migrations/001_init.sql
-- Core database schema for cyber security game
-- Single company (Nordavind AS) with multiple teams

-- ===== SERVERS TABLE =====
CREATE TABLE servers (
                         id TEXT PRIMARY KEY,
                         name TEXT NOT NULL,
                         status TEXT NOT NULL CHECK (status IN ('online', 'warning', 'critical', 'offline')),
                         load INT DEFAULT 0 CHECK (load >= 0 AND load <= 100),
                         alerts INT DEFAULT 0,
                         updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== EVENTS TABLE =====
-- Inbox items, alerts, emails, tweets
CREATE TABLE events (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        team_id INT,  -- null = broadcast to all teams
                        division TEXT CHECK (division IN ('tech', 'non-tech', 'management')),  -- null = visible to all divisions
                        type TEXT NOT NULL CHECK (type IN ('email', 'tweet', 'alert', 'server-status')),
                        title TEXT NOT NULL,
                        content TEXT NOT NULL,
                        severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
                        from_sender TEXT,  -- email address or twitter handle
                        read BOOLEAN DEFAULT false,
                        created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== LOGS TABLE =====
-- System logs
CREATE TABLE logs (
                      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                      team_id INT,  -- null = visible to all teams
                      division TEXT CHECK (division IN ('tech', 'non-tech', 'management')),  -- null = visible to all divisions
                      timestamp TIMESTAMPTZ DEFAULT NOW(),
                      level TEXT NOT NULL CHECK (level IN ('info', 'warning', 'error', 'critical')),
                      source TEXT NOT NULL,  -- server id reference
                      message TEXT NOT NULL
);

-- ===== EMAILS TABLE =====
-- Email archive/logs
CREATE TABLE emails (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        team_id INT,  -- null = visible to all teams
                        sender TEXT NOT NULL,
                        recipient TEXT NOT NULL,
                        subject TEXT NOT NULL,
                        body TEXT NOT NULL,
                        timestamp TIMESTAMPTZ DEFAULT NOW(),
                        type TEXT NOT NULL CHECK (type IN ('internal', 'external', 'system')),
                        created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== EMAIL LOGS TABLE =====
-- Email tracking/metrics
CREATE TABLE email_logs (
                            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                            team_id INT,
                            division TEXT CHECK (division IN ('tech', 'non-tech', 'management')),
                            timestamp TIMESTAMPTZ DEFAULT NOW(),
                            sender TEXT NOT NULL,
                            recipient TEXT NOT NULL,
                            subject TEXT NOT NULL,
                            status TEXT NOT NULL CHECK (status IN ('legitimate', 'phishing', 'suspicious')),
                            opened INT DEFAULT 0,
                            clicked INT DEFAULT 0
);

-- ===== USER ACTIVITY TABLE =====
-- User behavior tracking
CREATE TABLE user_activity (
                               id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                               team_id INT,
                               division TEXT CHECK (division IN ('tech', 'non-tech', 'management')),
                               user_id TEXT NOT NULL,
                               name TEXT NOT NULL,
                               role TEXT NOT NULL,
                               last_login TIMESTAMPTZ,
                               location TEXT,
                               status TEXT NOT NULL CHECK (status IN ('normal', 'suspicious', 'clicked-phishing', 'compromised'))
);

-- ===== NETWORK CONNECTIONS TABLE =====
-- Network traffic monitoring
CREATE TABLE network_connections (
                                     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                     team_id INT,
                                     division TEXT CHECK (division IN ('tech', 'non-tech', 'management')),
                                     timestamp TIMESTAMPTZ DEFAULT NOW(),
                                     source TEXT NOT NULL,
                                     destination TEXT NOT NULL,
                                     port INT NOT NULL,
                                     protocol TEXT NOT NULL,
                                     status TEXT NOT NULL CHECK (status IN ('active', 'suspicious', 'blocked')),
                                     traffic TEXT NOT NULL
);

-- ===== GAME SESSIONS TABLE =====
-- Tracks when games start/end for timed events
CREATE TABLE game_sessions (
                               id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                               started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                               duration_minutes INT DEFAULT 120,
                               status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'ended')),
                               created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== SCHEDULED EVENTS TABLE =====
-- Template events that trigger at specific times during the game
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

-- ===== INDEXES =====
-- Servers
CREATE INDEX idx_servers_status ON servers(status);

-- Events
CREATE INDEX idx_events_team ON events(team_id);
CREATE INDEX idx_events_division ON events(division);
CREATE INDEX idx_events_created ON events(created_at DESC);

-- Logs
CREATE INDEX idx_logs_team ON logs(team_id);
CREATE INDEX idx_logs_division ON logs(division);
CREATE INDEX idx_logs_source ON logs(source);
CREATE INDEX idx_logs_timestamp ON logs(timestamp DESC);

-- Emails
CREATE INDEX idx_emails_team ON emails(team_id);
CREATE INDEX idx_emails_timestamp ON emails(timestamp DESC);
CREATE INDEX idx_emails_sender ON emails(sender);
CREATE INDEX idx_emails_recipient ON emails(recipient);
CREATE INDEX idx_emails_type ON emails(type);

-- Email Logs
CREATE INDEX idx_email_logs_team ON email_logs(team_id);
CREATE INDEX idx_email_logs_division ON email_logs(division);

-- User Activity
CREATE INDEX idx_user_activity_team ON user_activity(team_id);
CREATE INDEX idx_user_activity_division ON user_activity(division);

-- Network Connections
CREATE INDEX idx_network_connections_team ON network_connections(team_id);
CREATE INDEX idx_network_connections_division ON network_connections(division);

-- Game Sessions
CREATE INDEX idx_game_sessions_status ON game_sessions(status);

-- Scheduled Events
CREATE INDEX idx_scheduled_events_trigger ON scheduled_events(trigger_at_minutes);