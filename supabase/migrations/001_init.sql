-- supabase/migrations/001_init.sql
-- Core database schema for cyber security game
-- Single company (Nordavind AS) with multiple teams
-- NO DIVISIONS - only team-based filtering

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
                                  type TEXT NOT NULL CHECK (type IN ('email', 'tweet', 'alert', 'server-status')),
                                  title TEXT NOT NULL,
                                  content TEXT NOT NULL,
                                  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
                                  from_sender TEXT,
                                  created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE app_logs (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                          timestamp TIMESTAMPTZ NOT NULL,
                          event_type TEXT NOT NULL,
                          user_name TEXT NOT NULL,
                          source_ip TEXT NOT NULL,
                          target_resource TEXT NOT NULL,
                          action TEXT NOT NULL,
                          details TEXT NOT NULL,
                          result TEXT NOT NULL,
                          created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Database Logs
CREATE TABLE db_logs (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         timestamp TIMESTAMPTZ NOT NULL,
                         event_type TEXT NOT NULL,
                         user_name TEXT NOT NULL,
                         source_ip TEXT NOT NULL,
                         database_name TEXT NOT NULL,
                         query TEXT NOT NULL,
                         rows_affected TEXT NOT NULL,
                         details TEXT NOT NULL,
                         result TEXT NOT NULL,
                         created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Azure Audit Logs
CREATE TABLE azure_audit_logs (
                                  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                  timestamp TIMESTAMPTZ NOT NULL,
                                  actor TEXT NOT NULL,
                                  action TEXT NOT NULL,
                                  target TEXT NOT NULL,
                                  target_type TEXT NOT NULL,
                                  details TEXT NOT NULL,
                                  source_ip TEXT NOT NULL,
                                  result TEXT NOT NULL,
                                  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Azure Sign-in Logs
CREATE TABLE azure_signin_logs (
                                   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                   timestamp TIMESTAMPTZ NOT NULL,
                                   user_name TEXT NOT NULL,
                                   source_ip TEXT NOT NULL,
                                   location TEXT NOT NULL,
                                   application TEXT NOT NULL,
                                   status TEXT NOT NULL,
                                   failure_reason TEXT,
                                   device_info TEXT NOT NULL,
                                   created_at TIMESTAMPTZ DEFAULT NOW()
);

- Channels table
CREATE TABLE channels (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                          name TEXT NOT NULL UNIQUE,
                          description TEXT,
                          created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                          channel_id UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
                          sender_name TEXT NOT NULL,
                          role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'system', 'admin')),
                          content TEXT NOT NULL,
                          timestamp TIMESTAMPTZ DEFAULT NOW(),
                          created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_messages_channel ON messages(channel_id);
CREATE INDEX idx_messages_timestamp ON messages(timestamp DESC);

-- Indexes
CREATE INDEX idx_app_logs_timestamp ON app_logs(timestamp DESC);
CREATE INDEX idx_db_logs_timestamp ON db_logs(timestamp DESC);
CREATE INDEX idx_azure_audit_logs_timestamp ON azure_audit_logs(timestamp DESC);
CREATE INDEX idx_azure_signin_logs_timestamp ON azure_signin_logs(timestamp DESC);



-- ===== INDEXES =====
-- Servers
CREATE INDEX idx_servers_status ON servers(status);

-- Events
CREATE INDEX idx_events_team ON events(team_id);
CREATE INDEX idx_events_created ON events(created_at DESC);

-- Logs
CREATE INDEX idx_logs_team ON logs(team_id);
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

-- User Activity
CREATE INDEX idx_user_activity_team ON user_activity(team_id);

-- Network Connections
CREATE INDEX idx_network_connections_team ON network_connections(team_id);

-- Game Sessions
CREATE INDEX idx_game_sessions_status ON game_sessions(status);

-- Scheduled Events
CREATE INDEX idx_scheduled_events_trigger ON scheduled_events(trigger_at_minutes);