-- supabase/migrations/004_update_seed.sql
-- Update seed data to use only scheduled_events (no static events table)

-- Clear existing scheduled events

-- ===== IMMEDIATE EVENTS (trigger_at_minutes = 0) =====
-- These appear as soon as the game starts

INSERT INTO scheduled_events (team_id, trigger_at_minutes, type, title, content, severity, from_sender) VALUES
                                                                                                            (NULL, 0, 'alert', 'Welcome to Nordavind',
                                                                                                             'Welcome to the Nordavind Security Operations Center. You are now part of our incident response team. Monitor all systems carefully and report any suspicious activity immediately.',
                                                                                                             'low', 'System'),

                                                                                                            (NULL, 0, 'email', 'Tech Overview from Dev',
                                                                                                             'Hi team! Quick overview of our infrastructure:

                                                                                                            - 4 main base stations: Vest, Øst, Nord, and Nødnett
                                                                                                            - Production databases with daily backup schedule
                                                                                                            - Azure AD with conditional access policies
                                                                                                            - All administrative actions require two-person approval (per company policy)

                                                                                                            Database Admin (Ola Hansen, ID: 47291) has elevated privileges across prod systems.

                                                                                                            Let me know if you have questions!

                                                                                                            Best,
                                                                                                            Development Team',
                                                                                                             'low', 'dev-team@nordavind.no');

-- ===== 1 MINUTE EVENT =====
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

-- ===== 5 MINUTE EVENTS =====
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

-- ===== 10 MINUTE EVENTS =====
INSERT INTO scheduled_events (trigger_at_minutes, type, title, content, severity, from_sender) VALUES
    (10, 'alert', 'Azure AD Policy Modification Detected',
     'ALERT: Conditional Access Policy "MFA_Required_Policy" was DISABLED at 23:15 UTC.

    Modified by: ola.hansen@nordavind.no
    Source IP: 185.220.101.47 (Unknown location - TOR exit node suspected)

    This is a critical security policy that requires multi-factor authentication for all users. Immediate investigation required.',
     'critical', 'Azure Security Center');

-- ===== 15 MINUTE EVENTS =====
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

-- ===== 20 MINUTE EVENTS =====
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
     'critical', 'compliance@nordavind.no');

-- ===== 25 MINUTE EVENTS =====
INSERT INTO scheduled_events (trigger_at_minutes, type, title, content, severity, from_sender) VALUES
    (25, 'alert', 'Ransom Note Received',
     'CRITICAL: Communication received from threat actor via secure channel.

    MESSAGE:
    "We have access to your systems and backups. This is not about money. This is about your company support for [REDACTED POLITICAL ISSUE]. We will continue to disrupt your operations until you publicly withdraw your position.

    - NordStorm APT"

    This appears to be hacktivism rather than financially motivated attack.',
     'critical', 'CISO');

-- ===== 30 MINUTE EVENTS =====
INSERT INTO scheduled_events (trigger_at_minutes, type, title, content, severity, from_sender) VALUES
    (30, 'email', 'Board Meeting Scheduled',
     'All Leadership,

    Emergency board meeting scheduled in 4 hours to discuss:
    - Scope of security incident
    - Financial impact assessment
    - Customer communication strategy
    - Recovery timeline

    Attendance mandatory. CISO will present initial findings.

    Board Secretary',
     'high', 'board@nordavind.no');