-- supabase/migrations/002_seed.sql
-- Seed initial data for testing

-- Insert some events (visible to all companies)
-- supabase/migrations/003_seed_events.sql
-- Seed data for initial events (minimal examples per division)

-- Tech division event
INSERT INTO events (company_id, division, type, title, content, severity, from_sender, read) VALUES
    (NULL, 'tech', 'alert', 'Unusual Network Traffic Detected', 'Multiple failed login attempts from IP 192.168.45.22 at 23:00', 'high', NULL, false);

-- Non-Tech division event
INSERT INTO events (company_id, division, type, title, content, severity, from_sender, read) VALUES
    (NULL, 'non-tech', 'email', 'RE: Phishing Email Report', 'Email logs show User ID 47291 clicked suspicious link yesterday at 19:47', 'critical', 'security@company.com', false);

-- Management division event
INSERT INTO events (company_id, division, type, title, content, severity, from_sender, read) VALUES
    (NULL, 'management', 'alert', 'Security Incident - CISO Briefing', 'Ransom note received via secure channel. NSM has been notified. Awaiting further instructions.', 'critical', 'CISO', false);
-- supabase/migrations/004_seed_logs.sql
-- Seed data for initial logs (minimal examples per division)

-- Tech division logs (technical details)
INSERT INTO logs (company_id, division, level, source, message) VALUES
                                                                    (NULL, 'tech', 'critical', 'ost', 'Basestasjon Øst - Connection timeout from IP 192.168.45.22 at 23:00:15'),
                                                                    (NULL, 'tech', 'error', 'nodnett', 'Nødnett - Database authentication failed, connection pool exhausted');

-- Non-Tech division logs (user/role info)
INSERT INTO logs (company_id, division, level, source, message) VALUES
                                                                    (NULL, 'non-tech', 'warning', 'auth-system', 'User ID 47291 (DB Admin role) accessed production systems outside normal hours'),
                                                                    (NULL, 'non-tech', 'error', 'email-server', 'Phishing email opened by 3 users: IDs 47291, 52103, 61847');

-- Management division logs (policy/approval)
INSERT INTO logs (company_id, division, level, source, message) VALUES
    (NULL, 'management', 'warning', 'policy-system', 'Two-person approval bypassed for deployment at 07:45 - CTO override approved 6 months ago');

INSERT INTO servers (id, name, status, load, alerts) VALUES
                                                         ('vest', 'Vest Basestasjon', 'online', 45, 0),
                                                         ('ost', 'Øst Basestasjon', 'critical', 92, 3),
                                                         ('nord', 'Nord Basestasjon', 'warning', 78, 1),
                                                         ('nodnett', 'Nødnett Basestasjon', 'offline', 0, 5);
