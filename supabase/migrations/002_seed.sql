-- supabase/migrations/002_seed.sql
-- Seed initial data for testing

-- Insert some events (visible to all companies)
INSERT INTO events (company_id, type, title, content, severity, from_sender, read) VALUES
                                                                                       (NULL, 'alert', 'Unusual Login Activity Detected', 'Multiple failed login attempts detected from IP 192.168.45.22', 'high', NULL, false),
                                                                                       (NULL, 'email', 'RE: Urgent System Maintenance', 'Hi team, I need you to verify your credentials at this link immediately...', 'critical', 'admin@techsupport-verify.com', false),
                                                                                       (NULL, 'tweet', '@Telesør mention', '@Telesor your network is down in Oslo. Are you having issues? #outage', 'medium', '@concerned_user', false);

-- Insert some logs (visible to all companies)
INSERT INTO logs (company_id, level, source, message) VALUES
                                                          (NULL, 'critical', 'ost', 'Basestasjon Øst - Connection timeout, server not responding'),
                                                          (NULL, 'warning', 'nord', 'Basestasjon Nord - High memory usage: 78% of available RAM'),
                                                          (NULL, 'error', 'nodnett', 'Nødnett - Multiple failed authentication attempts detected');