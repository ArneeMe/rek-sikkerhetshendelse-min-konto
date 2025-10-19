-- supabase/migrations/002_seed.sql
-- Seed initial data for testing
-- NO DIVISIONS - only team-based data

-- ===== SERVERS =====
INSERT INTO servers (id, name, status, load, alerts) VALUES
                                                         ('vest', 'Vest Basestasjon', 'online', 45, 0),
                                                         ('ost', 'Øst Basestasjon', 'critical', 92, 3),
                                                         ('nord', 'Nord Basestasjon', 'warning', 78, 1),
                                                         ('nodnett', 'Nødnett Basestasjon', 'offline', 0, 5);

-- ===== INITIAL EVENTS (Broadcast to all teams) =====
INSERT INTO events (team_id, type, title, content, severity, from_sender, read) VALUES
                                                                                    (NULL, 'alert', 'Unusual Network Traffic Detected', 'Multiple failed login attempts from IP 192.168.45.22 at 23:00', 'high', NULL, false),
                                                                                    (NULL, 'email', 'RE: Phishing Email Report', 'Email logs show User ID 47291 clicked suspicious link yesterday at 19:47', 'critical', 'security@company.com', false),
                                                                                    (NULL, 'alert', 'Security Incident - CISO Briefing', 'Ransom note received via secure channel. NSM has been notified. Awaiting further instructions.', 'critical', 'CISO', false);

-- ===== INITIAL LOGS (Broadcast to all teams) =====
INSERT INTO logs (team_id, level, source, message) VALUES
                                                       (NULL, 'critical', 'ost', 'Basestasjon Øst - Connection timeout from IP 192.168.45.22 at 23:00:15'),
                                                       (NULL, 'error', 'nodnett', 'Nødnett - Database authentication failed, connection pool exhausted'),
                                                       (NULL, 'warning', 'auth-system', 'User ID 47291 (DB Admin role) accessed production systems outside normal hours'),
                                                       (NULL, 'error', 'email-server', 'Phishing email opened by 3 users: IDs 47291, 52103, 61847'),
                                                       (NULL, 'warning', 'policy-system', 'Two-person approval bypassed for deployment at 07:45 - CTO override approved 6 months ago');

-- ===== SCHEDULED EVENTS (Released over time) =====


-- ===== INITIAL EVENTS (Broadcast to all teams) =====
INSERT INTO events (team_id, type, title, content, severity, from_sender, read) VALUES
                                                                                    (NULL, 'alert', 'Welcome to Nordavind',
                                                                                     'Welcome to the Nordavind Security Operations Center. You are now part of our incident response team. Monitor all systems carefully and report any suspicious activity immediately.',
                                                                                     'low', 'System', false),

                                                                                    (NULL, 'email', 'Tech Overview from Dev',
                                                                                     'Hi team! Quick overview of our infrastructure:

                                                                                - 4 main base stations: Vest, Øst, Nord, and Nødnett
                                                                                - Production databases with daily backup schedule
                                                                                - Azure AD with conditional access policies
                                                                                - All administrative actions require two-person approval (per company policy)

                                                                                Database Admin (Ola Hansen, ID: 47291) has elevated privileges across prod systems.

                                                                                Let me know if you have questions!

                                                                                Best,
                                                                                Development Team',
                                                                                     'low', 'dev-team@nordavind.no', false);

-- ===== INITIAL LOGS (Broadcast to all teams) =====
INSERT INTO logs (team_id, level, source, message) VALUES
                                                       (NULL, 'info', 'vest', 'Basestasjon Vest - System startup complete, all services running normally'),
                                                       (NULL, 'info', 'ost', 'Basestasjon Øst - Monitoring initialized, load at 45%'),
                                                       (NULL, 'info', 'nord', 'Basestasjon Nord - Connection established, status nominal'),
                                                       (NULL, 'info', 'nodnett', 'Nødnett - Emergency systems online and ready');

-- ===== SCHEDULED EVENTS (Released over time) =====

-- 1 minute event - CISO Alert
INSERT INTO scheduled_events (trigger_at_minutes, type, title, content, severity, from_sender) VALUES
    (1, 'alert', 'URGENT: Security Incident Detected',
     'Team, we have detected suspicious activity on our network.

Initial findings:
- Multiple failed login attempts from unknown IP addresses
- Unusual access patterns to production databases
- Potential compromise of administrative credentials

Please review all system logs immediately and report any anomalies.

All personnel should be on high alert. Emergency protocols may be activated.

- CISO, Nordavind AS',
     'critical', 'CISO');

-- 5 minute events
INSERT INTO scheduled_events (trigger_at_minutes, type, title, content, severity, from_sender) VALUES
                                                                                                   (5, 'alert', 'Unusual Network Traffic',
                                                                                                    'Network monitoring has detected multiple failed login attempts from IP 192.168.45.22 at 23:00 UTC. Source appears to be attempting brute force access to database servers.',
                                                                                                    'high', 'Security Monitoring'),

                                                                                                   (5, 'email', 'RE: Database Access Issues',
                                                                                                    'Hi IT Security,

                                                                                               I tried to access the production database this morning but my credentials were rejected. I know I am currently on vacation, but I left my laptop at the office and someone may have accessed it.

                                                                                               Can you check if there have been any login attempts from my account while I have been away?

                                                                                               Regards,
                                                                                               Ola Hansen
                                                                                               DB Administrator',
                                                                                                    'high', 'ola.hansen@nordavind.no');

-- 10 minute events
INSERT INTO scheduled_events (trigger_at_minutes, type, title, content, severity, from_sender) VALUES
                                                                                                   (10, 'alert', 'Azure AD Policy Modification Detected',
                                                                                                    'ALERT: Conditional Access Policy "MFA_Required_Policy" was DISABLED at 23:15 UTC.

                                                                                               Modified by: ola.hansen@nordavind.no
                                                                                               Source IP: 185.220.101.47 (Unknown location - TOR exit node suspected)

                                                                                               This is a critical security policy that requires multi-factor authentication for all users. Immediate investigation required.',
                                                                                                    'critical', 'Azure Security Center'),

-- 15 minute events
INSERT INTO scheduled_events (trigger_at_minutes, type, title, content, severity) VALUES
                                                                                      (15, 'alert', 'Data Exfiltration Detected',
                                                                                       'CRITICAL: Large data transfer detected from production database.

                                                                                  Details:
                                                                                  - Source: Production DB (Øst basestasjon)
                                                                                  - Destination: External IP 185.220.101.47
                                                                                  - Protocol: FTP
                                                                                  - Data volume: 2.4 GB
                                                                                  - Timestamp: 23:47 UTC

                                                                                  This matches known patterns of data theft. Incident response protocol initiated.',
                                                                                       'critical'),

                                                                                      (15, 'tweet', 'Customer Complaints',
                                                                                       '@Nordavind your service has been terrible today! Network keeps dropping and I cannot reach support. What is going on?? #NordavindDown #BadService',
                                                                                       'medium');

-- 20 minute events
INSERT INTO scheduled_events (trigger_at_minutes, type, title, content, severity, from_sender) VALUES
                                                                                                   (20, 'email', 'NSM Notification Required',
                                                                                                    'Legal/Compliance Team,

                                                                                               Based on the ongoing security incident, we are legally required to notify NSM (Nasjonal Sikkerhetsmyndighet) within 24 hours of discovery.

                                                                                               The incident involves:
                                                                                               - Unauthorized access to systems
                                                                                               - Potential data breach
                                                                                               - Critical infrastructure (telecommunications)

                                                                                               Please prepare incident report for NSM submission.

                                                                                               Compliance Officer',
                                                                                                    'critical', 'compliance@nordavind.no'),



-- ===== EMAILS (Broadcast to all teams) =====
-- Note: {COMPANY} placeholder should be replaced with actual company name in application



-- Seed channels
INSERT INTO channels (name, description) VALUES
                                             ('general', 'General company discussion'),
                                             ('security', 'Security team and incident response'),
                                             ('ferie', 'Vacation calendar and time off');

-- Seed example messages with roles
INSERT INTO messages (channel_id, sender_name, role, content, timestamp) VALUES
                                                                             ((SELECT id FROM channels WHERE name = 'general'), 'kari.nordmann', 'user', 'God morgen alle! ☀️', '2024-10-03 08:15:00'),
                                                                             ((SELECT id FROM channels WHERE name = 'general'), 'per.jensen', 'user', 'Morgen! Noen som vet om Ola er tilbake i dag?', '2024-10-03 08:22:00'),
                                                                             ((SELECT id FROM channels WHERE name = 'general'), 'kari.nordmann', 'user', 'Han er på ferie denne uken tror jeg', '2024-10-03 08:25:00'),
                                                                             ((SELECT id FROM channels WHERE name = 'ferie'), 'hr@company.no', 'system', 'Ola Hansen er på ferie 3. oktober - 10. oktober', '2024-10-01 10:00:00'),
                                                                             ((SELECT id FROM channels WHERE name = 'ferie'), 'hr@company.no', 'system', 'Kari Nordmann tar ferie 15. oktober - 22. oktober', '2024-10-01 10:01:00'),
                                                                             ((SELECT id FROM channels WHERE name = 'security'), 'security@company.no', 'system', 'Reminder: Monthly phishing training er på fredag kl 14:00', '2024-10-02 09:00:00'),
                                                                             ((SELECT id FROM channels WHERE name = 'security'), 'per.jensen', 'user', 'Jeg har sett noen rare login-forsøk i natt...', '2024-10-04 08:30:00'),
                                                                             ((SELECT id FROM channels WHERE name = 'security'), 'security@company.no', 'system', 'Vi undersøker. Hold dere oppdatert.', '2024-10-04 08:45:00');