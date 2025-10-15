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

-- Immediate events (0 minutes)
INSERT INTO scheduled_events (trigger_at_minutes, type, title, content, severity, from_sender) VALUES
                                                                                                   (0, 'alert', 'System Started', 'Security monitoring system initialized. All basestations online.', 'low', NULL),
                                                                                                   (0, 'email', 'Daily Report', 'Good morning team. Please review yesterday''s access logs.', 'low', 'security@company.com'),
                                                                                                   (0, 'alert', 'Game Session Started', 'Incident response exercise has begun. Monitor your teams.', 'low', 'CISO');

-- 5 minute events
INSERT INTO scheduled_events (trigger_at_minutes, type, title, content, severity) VALUES
                                                                                      (5, 'alert', 'Unusual Network Traffic', 'Multiple failed login attempts detected from IP 192.168.45.22 at 23:00', 'high'),
                                                                                      (5, 'email', 'Phishing Report', 'Email logs show User ID 47291 clicked suspicious link yesterday at 19:47', 'critical');

-- 15 minute events
INSERT INTO scheduled_events (trigger_at_minutes, type, title, content, severity) VALUES
                                                                                      (15, 'alert', 'Basestasjon Øst Critical', 'Connection timeout, server not responding. Load: 92%', 'critical'),
                                                                                      (15, 'alert', 'CISO Briefing Required', 'Security incident detected. NSM notification may be required.', 'high');

-- 30 minute events
INSERT INTO scheduled_events (trigger_at_minutes, type, title, content, severity, from_sender) VALUES
                                                                                                   (30, 'tweet', '@Telesør Network Issues', '@Telesor your network is down in Oslo. Multiple users reporting outages. #NetworkDown', 'medium', '@concerned_user');

-- ===== EMAILS (Broadcast to all teams) =====
-- Note: {COMPANY} placeholder should be replaced with actual company name in application

INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type) VALUES
    (NULL, 'admin@microsoft-support-verify.com', 'ola.hansen@company.no', 'URGENT: Microsoft 365 License Expiring Today!',
     'Dear User,

Your Microsoft 365 license will expire in 24 hours. To avoid service interruption, please verify your account immediately.

Click here to verify: http://microsoft-verify-account.com/renew

Failure to verify will result in:
- Loss of email access
- Deletion of all files in OneDrive
- Suspension of Teams access

This is an automated message from Microsoft Support.

Best regards,
Microsoft 365 Support Team',
     '2024-10-03 19:00:00', 'external');

INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type) VALUES
    (NULL, 'hr@company.no', 'everyone@company.no', 'Ferieoversikt - Oktober',
     'Hei alle,

Her er ferieoversikten for oktober:

- Ola Hansen (DB Administrator): 3. oktober - 10. oktober
- Kari Nordmann (Utvikler): 15. oktober - 22. oktober
- Per Jensen (Systemadministrator): Ingen ferie

Husk å koordinere med teamet deres før dere tar fri.

Hilsen,
HR-avdelingen',
     '2024-10-01 09:00:00', 'internal');

INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type) VALUES
    (NULL, 'security@company.no', 'everyone@company.no', 'ADVARSEL: Phishing-kampanje oppdaget',
     'Kjære kolleger,

Vi har oppdaget en aktiv phishing-kampanje som utgir seg for å være fra Microsoft Support.

IKKE klikk på lenker i e-poster som:
- Hevder at kontoen din utløper
- Ber om umiddelbar handling
- Kommer fra ukjente domener

Hvis du har klikket på en slik lenke, kontakt IT-support umiddelbart.

Med vennlig hilsen,
IT-Sikkerhet',
     '2024-10-04 08:30:00', 'internal');

INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type) VALUES
    (NULL, 'azure-alerts@system.company.no', 'it-admin@company.no', 'Azure AD Alert: Conditional Access Policy Modified',
     'ALERT: Conditional Access Policy Change Detected

Policy Name: MFA_Required_Policy
Modified By: ola.hansen@company.no
Timestamp: 2024-10-04 23:15:47 UTC
IP Address: 185.220.101.47 (Location: Unknown)
Change: Policy disabled

This is an automated alert from Azure Active Directory.',
     '2024-10-04 23:16:00', 'system');

INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type) VALUES
    (NULL, 'ola.hansen@company.no', 'per.jensen@company.no', 'RE: Backup-rutiner',
     'Hei Per,

Takk for oppdateringen. Jeg har lagt merke til at siste backup er fra mandag. Skal vi ikke ha daglige backuper?

Kan du sjekke om backup-scriptet kjører som det skal?

Mvh,
Ola',
     '2024-10-02 14:30:00', 'internal');

INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type) VALUES
    (NULL, 'per.jensen@company.no', 'ola.hansen@company.no', 'RE: RE: Backup-rutiner',
     'Hei Ola,

Jeg sjekket nettopp. Backup-scriptet feilet i går kveld pga disk space issues. Jeg har ryddet opp og kjører manuell backup nå.

Skal fikse automatikken i morgen tidlig.

Per',
     '2024-10-02 15:45:00', 'internal');

INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type) VALUES
    (NULL, 'kunde@eksempel.no', 'support@company.no', 'Spørsmål om tjenesten',
     'Hei,

Vi har opplevd noen problemer med nettverksforbindelsen den siste uken. Spesielt i Oslo-området.

Kan dere sjekke om det er noen kjente problemer?

Med vennlig hilsen,
Anne Larsen
Eksempel AS',
     '2024-10-04 10:15:00', 'external');

INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type) VALUES
    (NULL, 'kari.nordmann@company.no', 'it-admin@company.no', 'Trenger tilgang til Prod-server',
     'Hei,

Jeg trenger midlertidig tilgang til prod-serveren for å debugge en kritisk bug i produksjon.

Kan jeg få SSH-tilgang til server Øst?

Takk,
Kari',
     '2024-10-03 11:20:00', 'internal');

INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type) VALUES
    (NULL, 'monitoring@system.company.no', 'it-admin@company.no', 'Alert: Unusual File Activity Detected',
     'WARNING: Unusual File Upload Detected

Server: Øst Basestasjon
File: system_update.exe (2.4 MB)
Uploaded By: Remote session from IP 185.220.101.47
Timestamp: 2024-10-04 23:47:22 UTC
Location: /tmp/

This file was not digitally signed and does not match any known system updates.

Automated Security Monitor',
     '2024-10-04 23:48:00', 'system');

INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type) VALUES
    (NULL, 'ceo@company.no', 'everyone@company.no', 'Selskapets posisjon på bærekraft',
     'Kjære alle,

Som dere kanskje har sett i mediene, har vi tatt en klar posisjon på bærekraft og grønn energi.

Vi er stolte av vårt samarbeid med regjeringen om utfasing av fossile brensler i telekom-sektoren.

Dette er riktig for miljøet og riktig for fremtiden.

Med vennlig hilsen,
Direktøren',
     '2024-09-15 12:00:00', 'internal');