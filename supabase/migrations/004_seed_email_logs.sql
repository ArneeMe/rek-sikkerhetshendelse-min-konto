-- ==========================================
-- KATEGORI B: EKSTERNE EPOSTER (10 stk)
-- ==========================================

-- EMAIL 1: Phishing til Ola og Mari
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'security@microsoft-login-secure.com',
           'ola.hansen@nordavind.no; mari.hansen@nordavind.no',
           'Urgent: Microsoft 365 Security Alert - Immediate Action Required',
           'Dear Microsoft 365 User,

       We have detected unusual activity on your account and need you to verify your identity immediately.

       Your account will be suspended in 24 hours if you do not take action.

       Click here to verify your account: https://microsoft-login-secure.com/verify

       This is an automated security measure to protect your data.

       Best regards,
       Microsoft Security Team

       ---
       This email was sent to: ola.hansen@nordavind.no, mari.hansen@nordavind.no',
           '2024-10-10 13:58:00+02',
           'external'
       );

-- EMAIL 2: Mari rapporterer phishing til CISO
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'mari.hansen@nordavind.no',
           'ingrid.volden@nordavind.no',
           'Mistenkelig Microsoft-epost - phishing?',
           'Hei Ingrid,

       Fikk akkurat en epost som ser veldig sketchy ut. Står at Microsoft-kontoen min skal suspenderes. Domenet ser fake ut: "microsoft-login-secure.com"

       Ola fikk samme mailen. Tror ikke jeg skal klikke på den?

       Mari',
           '2024-10-10 14:02:00+02',
           'internal'
       );

-- EMAIL 3: Phishing confirmation til Ola (etter han klikket)
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'security@microsoft-login-secure.com',
           'ola.hansen@nordavind.no',
           'Your Microsoft 365 Account Has Been Verified',
           'Dear Ola Hansen,

       Thank you for verifying your account. Your Microsoft 365 services will continue without interruption.

       If you did not perform this verification, please contact your IT administrator immediately.

       Best regards,
       Microsoft Security Team',
           '2024-10-10 16:30:00+02',
           'external'
       );

-- EMAIL 4: Kunde 1 - Tyskland
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'johan.berg@techcorp-germany.de',
           'support@nordavind.no',
           'Cannot access SafeVault from Germany',
           'Hello,

       I am currently in Berlin and cannot access my SafeVault account. I get "Access Denied" error even though my credentials are correct.

       This is urgent as I need to access our backup files for a client presentation.

       Can you help?

       Best regards,
       Johan Berg
       TechCorp GmbH',
           '2024-10-11 09:45:00+02',
           'external'
       );

-- EMAIL 5: Kunde 2 - UK
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'lisa.andersen@digitalagency.co.uk',
           'support@nordavind.no',
           'Login issues - urgent!',
           'Hi SafeVault Support,

       I have been unable to log in since yesterday. I am based in London and have been using SafeVault for 6 months without issues.

       Now I suddenly get blocked. Is there a problem with your service?

       Please respond ASAP.

       Lisa Andersen
       Digital Agency UK',
           '2024-10-12 08:30:00+02',
           'external'
       );

-- EMAIL 6: Kunde 3 - Bedriftskunde (til Sandra direkte)
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'it-support@storpartner.no',
           'sandra.lekve@nordavind.no',
           'CRITICAL: Our team locked out of SafeVault',
           'Sandra,

       We have 12 employees who cannot access SafeVault since this morning. They are all getting "Access Denied" errors.

       This is affecting our operations. We need this resolved immediately or we will have to consider alternative solutions.

       Please call me: +47 xxx xx xxx

       Best regards,
       Petter Johnsen
       IT Manager, StorPartner AS',
           '2024-10-13 11:15:00+02',
           'external'
       );

-- EMAIL 7: Daglig Azure rapport (normal - 10. okt)
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'azure-reports@microsoft.com',
           'kjetil.berg@nordavind.no; christian.hein@nordavind.no',
           'Azure Daily Summary - October 10, 2024',
           'Azure Resource Health Summary
       Date: October 10, 2024

       Your Azure resources:
       - Virtual Machines: 6 running, 0 issues
       - Databases: 3 healthy
       - Storage: 89% capacity
       - Network: Normal traffic patterns

       Sign-in summary (last 24h):
       - Total sign-ins: 147
       - Failed sign-ins: 3
       - Locations: Norway (142), Other (5)

       No critical alerts in the last 24 hours.

       View full report: https://portal.azure.com/reports',
           '2024-10-10 08:00:00+02',
           'system'
       );

-- EMAIL 8: Daglig Azure rapport (mistenkelig aktivitet - 11. okt)
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'azure-reports@microsoft.com',
           'kjetil.berg@nordavind.no; christian.hein@nordavind.no',
           'Azure Daily Summary - October 11, 2024',
           'Azure Resource Health Summary
       Date: October 11, 2024

       Your Azure resources:
       - Virtual Machines: 6 running, 0 issues
       - Databases: 3 healthy
       - Storage: 91% capacity
       - Network: Elevated traffic detected

       Sign-in summary (last 24h):
       - Total sign-ins: 189
       - Failed sign-ins: 2
       - Locations: Norway (156), Romania (2), Other (31)

       1 informational alert in the last 24 hours.

       View full report: https://portal.azure.com/reports',
           '2024-10-11 08:00:00+02',
           'system'
       );

-- EMAIL 9: GitHub notification (subtle)
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'notifications@github.com',
           'marius.arder@nordavind.no',
           '[GitHub] Repository activity in nordavind/safevault-backend',
           'Hi @mariusarder,

       Recent activity in nordavind/safevault-backend:

       - 3 new commits to main
       - 1 pull request merged
       - Repository settings updated

       View repository: https://github.com/nordavind/safevault-backend

       ---
       You are receiving this because you are watching this repository.',
           '2024-10-13 14:22:00+02',
           'external'
       );

-- EMAIL 10: Phishing awareness training (ironic timing)
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'training@securityawareness.no',
           'all@nordavind.no',
           'Reminder: Complete Your Q4 Phishing Awareness Training',
           'Dear Team,

       This is a reminder to complete your mandatory Q4 Phishing Awareness Training.

       Training topics include:
       - Recognizing phishing emails
       - Verifying sender addresses
       - Suspicious links and attachments
       - Reporting security incidents

       Deadline: October 31, 2024

       Access training: https://training.securityawareness.no

       Stay safe!

       Security Awareness Team',
           '2024-10-09 16:30:00+02',
           'external'
       );

-- ==========================================
-- KATEGORI C: INTERNE EPOSTER (20 stk)
-- ==========================================

-- EMAIL 11: Frithjof - ferieoversikt
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'frithjof.fredriksen@nordavind.no',
           'all@nordavind.no',
           '📅 Ferieoversikt uke 42',
           'Hei alle!

       OLA HANSEN: 15-25. oktober (Syden! 🌴)

       God tur!

       Frithjof
       HR Manager',
           '2024-10-10 08:00:00+02',
           'internal'
       );

-- EMAIL 12: Ingrid svarer Mari om phishing
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'ingrid.volden@nordavind.no',
           'mari.hansen@nordavind.no',
           'RE: Mistenkelig Microsoft-epost - phishing?',
           'Takk for at du rapporterer, Mari!

       Ja, dette er definitivt phishing. Bra at du ikke klikket! Jeg sender en advarsel til resten av teamet.
       Mvh,
       Ingrid Volden
       CISO',
           '2024-10-10 14:30:00+02',
           'internal'
       );

-- EMAIL 13: Mari usikker på Ola
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'mari.hansen@nordavind.no',
           'ingrid.volden@nordavind.no',
           'RE: Mistenkelig Microsoft-epost - phishing?',
           'Vet ikke helt... han sa noe om at han skulle sjekke kontoen sin før han dro på ferie.

       Kan du sende ham en melding?

       Mari',
           '2024-10-10 14:45:00+02',
           'internal'
       );

-- EMAIL 14: Kjetil observerer Romania IP
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'kjetil.berg@nordavind.no',
           'arne.natskar@nordavind.no',
           'Noen API calls fra Romania i natt?',
           'Hei Arne,

       Så noen Azure audit entries kl. 03:00 fra rumensk IP. Står som Ola sin konto, men han er vel på ferie? Sikkert VPN-relay eller noe.

       Mvh,
       Kjetil',
           '2024-10-11 09:30:00+02',
           'internal'
       );

-- EMAIL 15: Arne svarer - ser legit ut
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'arne.natskar@nordavind.no',
           'kjetil.berg@nordavind.no',
           'RE: Noen API calls fra Romania i natt?',
           'Jepp, Ola er på ferie til 25.

       Sjekket firewall - autentisering ser legit ut. Kanskje han bruker VPN fra ferien? Folk gjør rare ting 😅

       - Arne',
           '2024-10-11 10:15:00+02',
           'internal'
       );

-- EMAIL 16: Sandra om kundeklager (start)
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'sandra.lekve@nordavind.no',
           'synne.berg@nordavind.no',
           'Noen kunder får ikke logget inn',
           'Hei Synne,

       Har fått 3 tickets om at folk får "Access Denied". Ser du noe feil i prod? De sier credentials er riktige.

       Mvh,
       Sandra',
           '2024-10-11 11:00:00+02',
           'internal'
       );

-- EMAIL 17: Synne bagatelliserer
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'synne.berg@nordavind.no',
           'sandra.lekve@nordavind.no',
           'RE: Noen kunder får ikke logget inn',
           'Ingen feil i login-koden. Kanskje de skriver feil passord? 😅

       Hvis det fortsetter, send meg bruker-IDer så sjekker jeg.

       - Synne',
           '2024-10-11 11:45:00+02',
           'internal'
       );

-- EMAIL 18: Kjetil eskalerer til CTO
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'kjetil.berg@nordavind.no',
           'christian.hein@nordavind.no',
           'Litt rare audit logs fra i natt',
           'Christian,

       Så at noen Azure AD queries ble kjørt midt på natten. Står som Ola sin konto. Bør jeg grave mer i dette?

       Kjetil',
           '2024-10-11 14:45:00+02',
           'internal'
       );

-- EMAIL 19: CTO shutter ned Kjetil
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'christian.hein@nordavind.no',
           'kjetil.berg@nordavind.no',
           'RE: Litt rare audit logs fra i natt',
           'Kjetil,

       Vi kan ikke bruke hele dagen på false positives. Sjekk med Ingrid hvis du er bekymret, men jeg tipper det er VPN-greier. Vi har release på fredag.

       Christian',
           '2024-10-11 15:20:00+02',
           'internal'
       );

-- EMAIL 20: Synne - login-siden ser annerledes ut
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'synne.berg@nordavind.no',
           'team-privatperson@nordavind.no',
           'Login-siden ser annerledes ut?',
           'Fikk melding fra en kunde om at noe ser "off".

       Har dere sett noe rart? Eller kanskje browser cache issues?

       - Synne',
           '2024-10-11 16:00:00+02',
           'internal'
       );

-- EMAIL 21: Mari Hansen spør om phishing igjen
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'mari.hansen@nordavind.no',
           'ingrid.volden@nordavind.no',
           'Hørte du noe fra Ola om den phishing-mailen?',
           'Hei Ingrid,

Fikk akkurat en epost som ser veldig sketchy ut. Står at Microsoft-kontoen min skal suspenderes. Domenet ser fake ut: "microsoft-login-secure.com"

Tror ikke jeg skal klikke på den?

Mari',
           '2024-10-11 16:30:00+02',
           'internal'
       );

-- EMAIL 22: Sandra - flere klager (mest utlandet)
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'sandra.lekve@nordavind.no',
           'synne.berg@nordavind.no; eirik.dahlen@nordavind.no',
           'Flere innloggingsproblemer - mest utlandet',
           'Hei,

       Nå 8 tickets. Ser ut som det mest er folk fra utlandet som får problemer. Noen som har sjekket Azure-innstillinger?

       Sandra',
           '2024-10-12 09:15:00+02',
           'internal'
       );

-- EMAIL 23: Mari - ingen deployment
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'mari.hansen@nordavind.no',
           'synne.berg@nordavind.no',
           'RE: Login-siden ser annerledes ut?',
           'Sjekket deployment history - ingen endringer siden 8. oktober.

       Probably cache.

       Mari',
           '2024-10-12 11:30:00+02',
           'internal'
       );

-- EMAIL 24: Eirik skal sjekke
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'eirik.dahlen@nordavind.no',
           'sandra.lekve@nordavind.no',
           'RE: Flere innloggingsproblemer',
           'Skal sjekke Azure policies.

       Men vi har ikke gjort endringer på et par uker, så rart at det plutselig skjer nå.

       Eirik',
           '2024-10-13 10:00:00+02',
           'internal'
       );

-- EMAIL 25: Hauk - Ola glemte å logge ut
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'hauk.storjord@nordavind.no',
           'marius.arder@nordavind.no',
           'Ola glemte å logge ut før ferie?',
           'Ser at Ola sin session fortsatt er aktiv.

       Typisk Ola 😂

       Kan du terminere den?

       Hauk',
           '2024-10-13 14:00:00+02',
           'internal'
       );

-- EMAIL 26: Didrik - database backup i natt?
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'didrik.saether@nordavind.no',
           'kjetil.berg@nordavind.no; arne.natskar@nordavind.no',
           'Database backup i natt?',
           'Morgen!

       Noen som kjørte manual backup i natt? Så litt høy disk I/O rundt kl 02:30.

       Didrik',
           '2024-10-14 08:30:00+02',
           'internal'
       );

-- EMAIL 27: Arne - ikke meg
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'arne.natskar@nordavind.no',
           'didrik.saether@nordavind.no',
           'RE: Database backup i natt?',
           'Ikke meg. Kanskje automatisk job? Eller Kjetil testet noe?

       Arne',
           '2024-10-14 09:15:00+02',
           'internal'
       );

-- EMAIL 28: Marius - .env fil slettet
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'marius.arder@nordavind.no',
           'team-bedrift@nordavind.no',
           'FYI: Slettet gammel .env fil fra Discord',
           'Ryddet litt i #team-bedrift.

       Fant en gammel .env fil jeg hadde postet for testing. Slettet nå.

       Marius',
           '2024-10-14 11:00:00+02',
           'internal'
       );

-- EMAIL 29: Arne - SSH-trafikk
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'arne.natskar@nordavind.no',
           'kjetil.berg@nordavind.no',
           'Jobbet noen sent i natt?',
           'Så litt SSH-trafikk til prod-servere kl. 02:00.

       Automatiske jobber eller noen som debugger?

       - Arne',
           '2024-10-15 09:00:00+02',
           'internal'
       );

-- EMAIL 30: Kjetil vil ha møte om logs
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'kjetil.berg@nordavind.no',
           'arne.natskar@nordavind.no; didrik.saether@nordavind.no',
           'Møte i morgen om logs?',
           'Tenkte vi kunne ta en rask gjennomgang av siste ukes logs. 30 min?

       Bare for å dobbeltsjekke at alt er ok.

       Kjetil',
           '2024-10-15 13:30:00+02',
           'internal'
       );

-- EMAIL 31: Christian - bra initiativ
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'christian.hein@nordavind.no',
           'kjetil.berg@nordavind.no; arne.natskar@nordavind.no; didrik.saether@nordavind.no',
           'RE: Møte i morgen om logs?',
           'Bra initiativ. Ta det med Ingrid også, hun vil sikkert være med.

       Kl 10:00 i morgen?

       Christian',
           '2024-10-16 10:00:00+02',
           'internal'
       );

-- Bekreft antall eposter
SELECT COUNT(*) as total_emails, type, COUNT(*) as count_per_type
FROM emails
GROUP BY type
ORDER BY type;

SELECT 'Total emails: ' || COUNT(*) FROM emails;

-- EMAIL: Christian om release fredag
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'christian.hein@nordavind.no',
           'all@nordavind.no',
           'Release v2.8 - fredag 11. oktober',
           'Hei team,

       Vi releaser v2.8 på fredag. Ingen breaking changes, men vi må være ekstra oppmerksomme denne uken.

       Code freeze: Torsdag kl 16:00
       Deploy window: Fredag 08:00-10:00

       Gi beskjed hvis noen ser potensielle issues.

       Christian',
           '2024-10-08 09:00:00+02',
           'internal'
       );

-- EMAIL: Marius deler kode i Discord (context for senere .env leak)
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'marius.arder@nordavind.no',
           'team-bedrift@nordavind.no',
           'Quick fix for database connection issue',
           'Hei team,

       Fikset den connection pool timeout-feilen. Postet solution i #team-bedrift på Discord.

       Back to normal nå!

       Marius',
           '2024-10-08 14:30:00+02',
           'internal'
       );

-- EMAIL: Hauk klager på Ola sine sessions
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'hauk.storjord@nordavind.no',
           'ola.hansen@nordavind.no',
           'Husk å logge ut når du er ferdig! 😅',
           'Ola,

       Fant 3 aktive sessions fra deg i prod i går kveld. Husk å logg ut...!

       Vi må være bedre på dette.

       Hauk',
           '2024-10-09 08:45:00+02',
           'internal'
       );

-- EMAIL: Ola bekrefter ferie
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'ola.hansen@nordavind.no',
           'team-bedrift@nordavind.no',
           'OOO: 15-25. oktober',
           'Hei alle,

       Jeg er på ferie 15-25. oktober.

       Marius tar over mine oppgaver. Emergency: Ring meg, men helst ikke 😎

       Sees!

       Ola',
           '2024-10-09 11:00:00+02',
           'internal'
       );

-- EMAIL: Ingrid om security policy update
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'ingrid.volden@nordavind.no',
           'all@nordavind.no',
           'Updated: Multi-factor authentication policy',
           'Hei team,

       Vi har oppdatert MFA-policy i Azure AD. Nå kreves MFA for:
       - Alle admin-kontoer
       - Innlogging fra utlandet
       - Nye enheter

       Gi beskjed hvis dere opplever problemer.

       Mvh,
       Ingrid Volden, CISO',
           '2024-10-09 13:00:00+02',
           'internal'
       );

-- EMAIL: Synne om kunde feedback
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'synne.berg@nordavind.no',
           'team-privatperson@nordavind.no',
           'Positive feedback fra kunder! 🎉',
           'Hei team,

       Fikk masse god feedback på den nye UI-en. Kunder elsker den nye dashboard-viewen.

       Good job everyone!

       Synne',
           '2024-10-09 15:30:00+02',
           'internal'
       );

-- EMAIL: Kjetil om automated backup test
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'kjetil.berg@nordavind.no',
           'arne.natskar@nordavind.no; didrik.saether@nordavind.no',
           'Testing automated backups i natt',
           'Hei,

       Kjører test av ny backup-procedure i natt kl 02:00. Kan gi litt ekstra disk I/O.

       FYI hvis dere ser noe i logs.

       Kjetil',
           '2024-10-09 16:00:00+02',
           'internal'
       );

-- EMAIL: Sandra om support metrics
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'sandra.lekve@nordavind.no',
           'kristian.rosland@nordavind.no; christian.hein@nordavind.no',
           'Q4 Support Metrics - Looking Good! 📊',
           'Hei,

       September stats:
       - Average response time: 2.4 hours (target: 4h)
       - Customer satisfaction: 94%
       - Open tickets: 12 (all low priority)

       Team is doing great!

       Sandra',
           '2024-10-10 07:30:00+02',
           'internal'
       );



-- STØY: Kristian om board meeting
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'kristian.rosland@nordavind.no',
           'christian.hein@nordavind.no; ingrid.volden@nordavind.no',
           'Board meeting preparation - Q4 presentation',
           'Hei,

       Board meeting 25. oktober. Trenger oppdaterte tall fra dere:
       - Christian: Tech roadmap + infrastructure costs
       - Ingrid: Security posture status

       Deadline: 20. oktober

       Takk!
       Kristian',
           '2024-10-11 10:30:00+02',
           'internal'
       );

-- STØY: HR om ny ansatt
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'frithjof.fredriksen@nordavind.no',
           'all@nordavind.no',
           'Ny kooollegaa!',
           'Hei alle,

       Vi får en ny kollega på mandag 14. oktober!

       Emma Johansen starter som Junior Developer i Team Privatperson. Vær så snill å ønsk henne velkommen!

       Frithjof
       HR Manager',
           '2024-10-11 13:00:00+02',
           'internal'
       );

-- STØY: Synne om design review
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'synne.berg@nordavind.no',
           'eirik.dahlen@nordavind.no; mari.hansen@nordavind.no',
           'Design review - new onboarding flow',
           'Hei team,

       Kan dere review den nye onboarding-flyten? Figma link i Slack.

       Trenger feedback innen i morgen for å rekke fredags-release.

       Synne',
           '2024-10-11 14:15:00+02',
           'internal'
       );

-- STØY: Faktura fra leverandør
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'invoices@azure.microsoft.com',
           'kristian.rosland@nordavind.no; christian.hein@nordavind.no',
           'Microsoft Azure Invoice - October 2024',
           'Your Microsoft Azure invoice is ready.

       Account: NordeVind AS
       Invoice period: October 1-31, 2024
       Amount due: NOK 48,327.00
       Due date: October 25, 2024

       View invoice: https://portal.azure.com/billing

       Thank you for using Microsoft Azure.',
           '2024-10-12 06:00:00+02',
           'external'
       );

-- STØY: Hauk om bug fix
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'hauk.storjord@nordavind.no',
           'marius.arder@nordavind.no',
           'Fixed that race condition bug',
           'Marius,

       Den race condition-buggen i backup scheduler er fikset. Pushet til staging.

       Can you review PR #847?

       Hauk',
           '2024-10-12 10:45:00+02',
           'internal'
       );

-- STØY: Sandra om lunch & learn
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'sandra.lekve@nordavind.no',
           'all@nordavind.no',
           'Lunch & Learn fredag: Customer Service best practices',
           'Hei alle!

       Lunch & Learn på fredag kl 12:00 - jeg holder presentasjon om hvordan vi kan forbedre customer experience.

       Pizza blir servert! 🍕

       Påmelding: slack

       Sandra',
           '2024-10-12 11:30:00+02',
           'internal'
       );

-- STØY: Marius om code review
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'marius.arder@nordavind.no',
           'team-bedrift@nordavind.no',
           'Code review needed - API rate limiting',
           'Team,

       Trenger eyes på ny rate limiting implementation. Ganske kritisk for release.

       PR #851 - please review ASAP

       Marius',
           '2024-10-13 09:00:00+02',
           'internal'
       );

-- STØY: Arne om nettverksvedlikehold (planned)
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'arne.natskar@nordavind.no',
           'all@nordavind.no',
           'Planlagt nettverksvedlikehold - lørdag 19. okt',
           'Hei,

       Vi oppgraderer firewall-firmware på lørdag 19. oktober kl 06:00-08:00.

       Kan gi kortvarige avbrudd i VPN-tilgang. Planlegg deretter hvis dere jobber helg.

       Arne',
           '2024-10-13 13:30:00+02',
           'internal'
       );

-- STØY: Mari med spørsmål om dokumentasjon
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'mari.hansen@nordavind.no',
           'synne.berg@nordavind.no',
           'Hvor finner jeg API documentation?',
           'Hei Synne,

       Kan ikke finne API docs for customer endpoints. Er de i Confluence eller GitHub wiki?

       Trenger det for testing.

       Mari',
           '2024-10-13 15:00:00+02',
           'internal'
       );

-- STØY: Ekstern recruiter
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'recruiter@techtalent.no',
           'christian.hein@nordavind.no',
           'Senior DevOps Engineer kandidater',
           'Hei Christian,

       Vi har 3 sterke kandidater til Senior DevOps-stillingen. Kan vi sette opp intervjuer neste uke?

       Kandidatprofiler vedlagt.

       Mvh,
       Lisa Berg
       TechTalent Rekruttering',
           '2024-10-14 09:30:00+02',
           'external'
       );

-- STØY: Didrik om database performance
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'didrik.saether@nordavind.no',
           'kjetil.berg@nordavind.no; christian.hein@nordavind.no',
           'Database performance optimization results',
           'Hei,

       Kjørte index optimization i helgen. Query performance er opp 23%!

       Detailed metrics i attached report.

       Didrik',
           '2024-10-14 10:00:00+02',
           'internal'
       );

-- STØY: GitHub security alert (legitimate)
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'noreply@github.com',
           'marius.arder@nordavind.no; hauk.storjord@nordavind.no',
           '[GitHub] Dependabot alert: lodash vulnerability',
           'Dependabot found a security vulnerability in one of your dependencies.

       Repository: nordavind/safevault-backend
       Package: lodash
       Severity: Moderate

       Update to lodash@4.17.21 or later to fix this vulnerability.

       View alert: https://github.com/nordavind/safevault-backend/security',
           '2024-10-14 14:45:00+02',
           'external'
       );

-- STØY: Synne om UX research
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'synne.berg@nordavind.no',
           'team-privatperson@nordavind.no',
           'User testing sessions - signup for slots',
           'Hei,

       Vi kjører user testing neste uke. Trenger observers fra teamet.

       Signup sheet i Slack. Please join minst én session!

       Synne',
           '2024-10-15 11:00:00+02',
           'internal'
       );

-- STØY: Christian om tech debt
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'christian.hein@nordavind.no',
           'marius.arder@nordavind.no; synne.berg@nordavind.no; kjetil.berg@nordavind.no',
           'Q4 Tech Debt Sprint planning',
           'Team leads,

       La oss sette av 2 uker i november for tech debt. Send meg prioriterte items innen fredag.

       Focus: Performance, security, documentation

       Christian',
           '2024-10-15 14:00:00+02',
           'internal'
       );

-- STØY: Ekstern kunde - success story
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'ceo@happycustomer.no',
           'kristian.rosland@nordavind.no',
           'Thank you - SafeVault saved us!',
           'Hi Kristian,

       Just wanted to say thank you. We had a hardware failure last week and SafeVault saved our entire business. Recovery was flawless.

       Happy to be a reference customer if you need one!

       Best regards,
       Thomas Andersen
       CEO, HappyCustomer AS',
           '2024-10-15 16:00:00+02',
           'external'
       );

-- STØY: Eirik om testing
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'eirik.dahlen@nordavind.no',
           'synne.berg@nordavind.no; mari.hansen@nordavind.no',
           'Test coverage nå over 80%! 🎉',
           'Team,

       Vi har nå 82% test coverage på frontend! Goal var 80% innen Q4.

       Good work everyone!

       Eirik',
           '2024-10-16 09:30:00+02',
           'internal'
       );

-- STØY: Frithjof om Halloween
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'frithjof.fredriksen@nordavind.no',
           'all@nordavind.no',
           '🎃 Halloween party - 31. oktober!',
           'Hei alle!

       Kontoret stenger kl 15:00 på Halloween. Vi har party med costume contest!

       Prizes:
       🥇 Best costume: 2000 kr
       🥈 Funniest: 1000 kr
       🥉 Most creative: 500 kr

       Sign up i Slack!

       Frithjof',
           '2024-10-16 13:00:00+02',
           'internal'
       );



-- STØY: Kort melding fra Hauk om kaffe
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'hauk.storjord@nordavind.no',
           'team-bedrift@nordavind.no',
           'Kaffemaskin ødelagt igjen 😭',
           'Noen som vet hvor nøkkelen til Nespresso-maskinen er?

       H',
           '2024-10-11 08:15:00+02',
           'internal'
       );

-- STØY: Detaljert teknisk diskusjon
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'didrik.saether@nordavind.no',
           'kjetil.berg@nordavind.no',
           'PostgreSQL connection pooling - forslag til forbedring',
           'Hei Kjetil,

       Har sett på connection pool config. Her er mine forslag:

       Nåværende:
       - max_connections: 100
       - pool_size: 20
       - pool_timeout: 30s

       Foreslått:
       - max_connections: 150
       - pool_size: 30
       - pool_timeout: 45s
       - pool_pre_ping: true (viktig!)

       Rationale: Vi ser økende concurrent users, spesielt 14:00-16:00. Med pre_ping unngår vi stale connections.

       Kan vi teste dette i staging først? Trenger ca 2 dager for proper load testing.

       Tanker?

       Didrik',
           '2024-10-11 11:30:00+02',
           'internal'
       );

-- STØY: Ekstern vendor - veldig kort
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'support@cloudflare.com',
           'arne.natskar@nordavind.no',
           'Your Cloudflare SSL certificate will expire soon',
           'Certificate: *.nordavind.no
       Expires: November 15, 2024

       Renew now: https://dash.cloudflare.com/ssl',
           '2024-10-11 12:00:00+02',
           'external'
       );

-- STØY: Mari stiller mange spørsmål (karakteristisk)
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'mari.hansen@nordavind.no',
           'eirik.dahlen@nordavind.no',
           'Spørsmål om React hooks best practices',
           'Hei Eirik!

       Har noen spørsmål om koden din i UserProfile component:

       1. Hvorfor bruker du useCallback her? Er det for performance?
       2. Skal jeg også bruke useMemo for den store lista?
       3. Når skal jeg egentlig bruke useEffect vs useLayoutEffect?
       4. Er det ok å ha så mange useState, eller burde jeg bruke useReducer?

       Sorry for alle spørsmålene! Prøver å lære best practices 😊

       Mari',
           '2024-10-11 15:45:00+02',
           'internal'
       );

-- STØY: Synne - veldig kort svar
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'synne.berg@nordavind.no',
           'mari.hansen@nordavind.no',
           'RE: Spørsmål om React hooks best practices',
           'Eirik er best på dette, men generelt:

       1. Ja
       2. Bare hvis perf problem
       3. 99% av gangene: useEffect
       4. useReducer når complex state logic

       // Synne',
           '2024-10-11 16:10:00+02',
           'internal'
       );

-- STØY: Marius med lengre update
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'marius.arder@nordavind.no',
           'christian.hein@nordavind.no',
           'Status: B2B API v3 migration',
           'Hei Christian,

       Quick status på API v3 migreringen:

       ✅ Ferdig:
       - Authentication flow (OAuth2)
       - Customer endpoints (alle CRUD operations)
       - Backup job endpoints
       - Webhook system
       - Documentation (Swagger)

       🟡 In progress:
       - Restore endpoints (80% done, Hauk jobber med det)
       - Rate limiting (testing i staging)
       - Legacy v2 deprecation warnings

       ❌ Ikke startet:
       - Advanced analytics endpoints (Q1 2025)
       - Batch operations (deprioritert)

       Timeline: On track for release 11. oktober!

       Biggest risk: Rate limiting må testes grundig. Har sett noen edge cases med burst traffic.

       Mvh,
       Marius',
           '2024-10-12 14:00:00+02',
           'internal'
       );

-- STØY: Kunde - fornøyd (på norsk)
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'kristine.oslo@byggfirma.no',
           'support@nordavind.no',
           'Veldig fornøyd med supporten! ⭐⭐⭐⭐⭐',
           'Hei,

       Bare si tusen takk til Sandra for super hjelp i dag. Hun fikset problemet mitt på 10 minutter!

       Dere har virkelig god kundeservice.

       Mvh,
       Kristine Oslo
       Byggfirma Oslo AS',
           '2024-10-12 15:30:00+02',
           'external'
       );

-- STØY: Kjetil - teknisk men kort
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'kjetil.berg@nordavind.no',
           'arne.natskar@nordavind.no',
           'Kubernetes nodes upgrade - OK?',
           'Arne,

       Kan jeg upgraade k8s nodes i staging i morgen kl 14? Tar ca 30 min.

       K',
           '2024-10-12 16:00:00+02',
           'internal'
       );

-- STØY: Arne - veldig kort
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'arne.natskar@nordavind.no',
           'kjetil.berg@nordavind.no',
           'RE: Kubernetes nodes upgrade - OK?',
           'Go ahead 👍',
           '2024-10-12 16:05:00+02',
           'internal'
       );

-- STØY: Ingrid - lang og detaljert sikkerhetspolicy
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'ingrid.volden@nordavind.no',
           'all@nordavind.no',
           'Oppdatert: Passordpolicy og sikkerhetspraksis',
           'Hei alle,

       Vi har oppdatert vår passordpolicy i tråd med nye retningslinjer fra NSM. Her er de viktigste endringene:

       PASSORDKRAV (gjeldende fra 1. november):
       - Minimum 14 tegn (opp fra 12)
       - Må inneholde: store/små bokstaver, tall, spesialtegn
       - Ikke tillatt: Vanlige ord, firma-navn, tidligere passord
       - Rotasjon: Hver 90. dag (admins: hver 60. dag)

       TOFAKTORAUTENTISERING:
       - Obligatorisk for alle fra 1. november
       - Anbefalt metode: Microsoft Authenticator app
       - Backup: SMS (kun for nødstilfelle)

       VPN-TILGANG:
       - Kun godkjente enheter (må registreres hos IT)
       - Automatisk timeout etter 8 timer inaktivitet
       - Logging av all VPN-aktivitet

       PHISHING AWARENESS:
       - Alle MÅ gjennomføre Q4 training innen 31. oktober
       - Rapporter mistenkelige eposter til security@nordavind.no
       - Aldri klikk på lenker fra ukjente avsendere
       - Sjekk alltid avsender-domene nøye

       KONSEKVENSER VED BRUDD:
       - 1. gang: Verbal advarsel + re-training
       - 2. gang: Skriftlig advarsel
       - 3. gang: Kan føre til oppsigelse

       Spørsmål? Book møte med meg eller send epost.

       Mvh,
       Ingrid Volden
       Chief Information Security Officer (CISO)',
           '2024-10-13 08:00:00+02',
           'internal'
       );

-- STØY: Hauk - casual respons på Ingrid
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'hauk.storjord@nordavind.no',
           'marius.arder@nordavind.no',
           'RE: Oppdatert passordpolicy',
           '14 tegn?? 😱

       Må lage nytt passord management system for hjernen min...

       H',
           '2024-10-13 08:30:00+02',
           'internal'
       );

-- STØY: Ekstern konferanse-invitasjon
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'speaker@nordicdevcon.com',
           'christian.hein@nordavind.no',
           'Speaker invitation: Nordic DevCon 2025',
           'Hi Christian,

       We would love to have you as a speaker at Nordic DevCon 2025 (March 15-17, Copenhagen).

       Topic suggestion: "Scaling SaaS infrastructure: Lessons from the trenches"

       Benefits:
       - Full conference pass
       - Travel + hotel covered
       - Speaker dinner
       - Networking with 500+ developers

       Interested? Let me know by October 20.

       Best,
       Emma Larsen
       Nordic DevCon Program Committee',
           '2024-10-13 10:00:00+02',
           'external'
       );

-- STØY: Sandra videresender kompliment
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'sandra.lekve@nordavind.no',
           'synne.berg@nordavind.no; eirik.dahlen@nordavind.no',
           'FWD: Veldig fornøyd med supporten!',
           'Sånn vi liker det! 😊

       Dere lager et produkt folk elsker.

       Sandra

       ---
       [Forwarded email from kristine.oslo@byggfirma.no]',
           '2024-10-13 11:00:00+02',
           'internal'
       );

-- STØY: Didrik - medium lengde, teknisk
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'didrik.saether@nordavind.no',
           'team-devops@nordavind.no',
           'Database backup verification results - September',
           'Hei team,

       Månedlig backup verification for september er ferdig:

       Stats:
       - Total backups: 2,847
       - Successful: 2,845 (99.93%)
       - Failed: 2 (begge pga. timeout under high load)
       - Average backup time: 4.2 min
       - Largest backup: 127 GB

       Failed backups:
       - 2024-09-15: customer_id 1847 (re-run successful)
       - 2024-09-23: customer_id 2103 (re-run successful)

       Recommendation: Øk timeout fra 15 til 20 min for large customers (>100GB).

       Full report: [link]

       Didrik',
           '2024-10-14 07:30:00+02',
           'internal'
       );

-- STØY: Veldig kort fra Kristian
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'kristian.rosland@nordavind.no',
           'all@nordavind.no',
           'Fredagspils 🍺',
           'Fredagspils kl 16:00 i kantina!

       K',
           '2024-10-11 14:00:00+02',
           'internal'
       );

-- STØY: Mari følger opp Ingrid (karakteristisk at hun følger opp)
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'mari.hansen@nordavind.no',
           'ingrid.volden@nordavind.no',
           'Fulgte du opp den phishing-mailen med Ola?',
           'Hei Ingrid,

       Har ikke hørt noe mer om den Microsoft-mailen fra forrige uke. Fikk du sjekket med Ola om han klikket?

       Bare lurer 😊

       Mari',
           '2024-10-14 13:00:00+02',
           'internal'
       );

-- STØY: Ingrid - kort svar
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'ingrid.volden@nordavind.no',
           'mari.hansen@nordavind.no',
           'RE: Fulgte du opp den phishing-mailen med Ola?',
           'Han er på ferie til 25. Tar det når han kommer tilbake.

       Takk for at du holder øye! 👍

       Ingrid',
           '2024-10-14 13:30:00+02',
           'internal'
       );

-- STØY: Ekstern leverandør - automated
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'noreply@slack.com',
           'kristian.rosland@nordavind.no',
           'Your Slack workspace: NordeVind - Monthly usage report',
           'Workspace: NordeVind
       Period: September 2024

       Active members: 24
       Messages sent: 8,429
       Files shared: 342
       Most active channel: #general (1,847 messages)

       Current plan: Business+ ($12.50/user/month)
       Next billing date: November 1, 2024

       View full report: https://nordavind.slack.com/stats',
           '2024-10-14 09:00:00+02',
           'external'
       );

-- STØY: Eirik - detaljert teknisk forklaring
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'eirik.dahlen@nordavind.no',
           'mari.hansen@nordavind.no',
           'RE: Spørsmål om React hooks best practices',
           'Hei Mari!

       God at du spør! Her er litt mer utdypende svar:

       1. useCallback:
       Ja, det er for performance. Funksjonen blir "memorized" så den ikke re-creates ved hver render. MEN: bruk det bare når du faktisk har performance issues. Premature optimization er ofte verre enn problemet.

       2. useMemo:
       Samme prinsipp. Hvis lista er <1000 items, trenger du det sannsynligvis ikke. Profiler først!

       3. useEffect vs useLayoutEffect:
       - useEffect: 99% av gangene. Kjører ETTER render
       - useLayoutEffect: Kun når du må mutate DOM før browser painter (sjeldent)

       Tommelfingerregel: Start med useEffect. Hvis du ser "flicker", bytt til useLayoutEffect.

       4. useState vs useReducer:
       - useState: Simple state (1-3 values, independent)
       - useReducer: Complex state med mange relaterte updates

       Example: Form med 10 fields? useReducer.
       Example: Toggle button? useState.

       Protip: Se på koden min i `UserProfile.tsx` - der bruker jeg useReducer fordi form state er kompleks.

       Spør gjerne mer!

       Eirik',
           '2024-10-14 15:00:00+02',
           'internal'
       );

-- STØY: Marius - veldig kort
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'marius.arder@nordavind.no',
           'hauk.storjord@nordavind.no',
           'Merge conflict i PR #851',
           'Hauk - fix merge conflict i din PR. Blokkerer releasen.

       M',
           '2024-10-15 10:00:00+02',
           'internal'
       );

-- STØY: Hauk - litt irritert
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'hauk.storjord@nordavind.no',
           'marius.arder@nordavind.no',
           'RE: Merge conflict i PR #851',
           'Done. Men var DIN commit som caused conflict btw 😅

       Next time: pull before push

       H',
           '2024-10-15 10:15:00+02',
           'internal'
       );

-- STØY: Frithjof - medium lengde, administrativt
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'frithjof.fredriksen@nordavind.no',
           'all@nordavind.no',
           'Påminnelse: Timeføring for september',
           'Hei alle,

       Mangler fortsatt timeføring for september fra:
       - Eirik Dahlen
       - Mari Hansen
       - Hauk Storjord

       Frist var 5. oktober. Trenger dette for lønnskjøring.

       Link til system: https://timeregistrering.nordavind.no

       Takk!

       Frithjof Fredriksen
       HR Manager',
           '2024-10-15 12:00:00+02',
           'internal'
       );

-- STØY: Christian med motiverende melding
INSERT INTO emails (team_id, sender, recipient, subject, body, timestamp, type)
VALUES (
           NULL,
           'christian.hein@nordavind.no',
           'all@nordavind.no',
           'Great work team! 🚀',
           'Team,

       Vil bare si at Q3 har vært fantastisk. Vi leverte:

       ✅ 47 features
       ✅ 99.8% uptime
       ✅ 0 critical bugs
       ✅ Customer satisfaction opp til 94%

       Stolt av dere alle. La oss gjøre Q4 enda bedre!

       Fredagspils på meg 🍺

       Christian',
           '2024-10-11 16:30:00+02',
           'internal'
       );


