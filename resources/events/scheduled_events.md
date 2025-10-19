# Nordavind Solutions - Workshop Kjøreplan 23. Oktober 2025

## Bakgrunn (Hva som har skjedd før workshopen)

Nordavind Solutions ble utsatt for et sofistikert cyberangrep som startet 10. oktober med en phishing-email til Ola Hansen (Senior Developer). Angriperne har siden kompromittert flere brukerkontoer, eksfiltrert 880 MB kundedata fra databasen (14. okt), og deployert ransomware til alle produksjonsservere (16. okt kl. 23:47). Ransomware ligger nå dormant på serverne, satt til å aktiveres via cron job 23. oktober kl. 16:40 - midt under workshopen. Studentene tror de er leid inn for en rutinemessig sikkerhetskartlegging og vet ingenting om det forestående angrepet.

## Live Events Timeline

| Tid   | Type       | Fra                    | Tittel                            | Innhold (Sammendrag)                                                                                                                                                                                  | Studentoppgave                                 |
| ----- | ---------- | ---------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 16:30 | Email      | Ingrid Volden (CISO)   | Velkommen til Nordavind Solutions | CISO på ferie, ber studentene gjøre sikkerhetskartlegging. Tilgang til logger, personalgalleri, nettverksdok. Møte mandag 28. okt for gjennomgang.                                                    | Analysere logger og systemer                   |
| 16:40 | (Bakgrunn) | -                      | Ransomware Trigger                | Cron job aktiveres: `/usr/local/bin/WindowsUpdateService.exe --encrypt`. Filkryptering starter på `prod-app-server-01 (10.20.1.10)`.                                                                  | (Ikke synlig for studenter ennå)               |
| 16:50 | Alert      | Sandra Lekve (Support) | Innloggingsproblemer              | 12 support-tickets siste 10–15 min. Feilmeldinger: “Connection timeout”, “503”, “Unable to reach auth server”. Berørte kunder: Byggmester Hansen AS, Regnskap Nord AS, Laksevåg Tannklinikk +9 andre. | Undersøk hvorfor tjenester feiler              |
| 17:00 | (Bakgrunn) | -                      | Spredning til andre servere       | Ransomware sprer seg til app-server-02/03 og alle database-servere. PostgreSQL connections timing out.                                                                                                | (Synlig hvis de sjekker logs)                  |
| 17:10 | Alert      | Monitoring System      | Ransomware Note                   | `README_DECRYPT.txt` på alle servere. “YOUR FILES ENCRYPTED. Pay 50 BTC within 72 hours or data leak. Contact: [TOR link]”                                                                            | Skifte til incident response                   |
| 17:25 | Tweet      | @NordavindHacked       | Offentlig trussel                 | “Nordavind Solutions hacked. Vi sitter på 200+ bedrifters backup-data. Data leaks innen 48 timer hvis ikke betaling. #cybersecurity #breach”                                                          | Vurder kommunikasjonsstrategi                  |
| 17:30 | Email      | VG Journalist          | Media forespørsel                 | “Vi har hørt om cyberangrep. Kan dere bekrefte ransomware? Publiserer sak innen 30 min. Ring tilbake snarest.”                                                                                        | Hva sier man til pressen?                      |
| 17:33 | Alert      | Kommunikasjon          | Intern panikk                     | “CEO får telefoner fra kunder. Investorer stiller spørsmål. Trenger talking points ASAP! Hva vet vi? Hva kan jeg si?”                                                                                 | Sammenfatte status, lage komm-strategi         |
| 17:40 | Email      | Ingrid Volden (CISO)   | CISO Reaksjon                     | Hvis god komm: “Takk for info! Avbryter ferie. Fortsett analysen – finn HVORDAN og HVEM.” Hvis dårlig: “HVORFOR ikke hørt før?! Virtuelt møte om 10 min!”                                             | Belønning/konsekvens for kommunikasjon         |
| 17:55 | Email      | anonymous@protonmail   | Proof of Data                     | “880 MB eksfiltrert inkl. kundenavn, email, telefon, credentials. Se vedlagt sample (50 records). 50 BTC. 72 timer. Database: prod-db-server-01, 10.20.2.10, exported 2024-10-14 02:29:42”            | Verifiser om data er ekte (sjekk 14. okt logs) |
| 18:15 | System     | Facilitator            | Spilletid slutt                   | Workshop avsluttes. Forbered presentasjon av funn, analyse og anbefalinger.                                                                                                                           | Sammenfatte timeline, root cause, remediation  |
| 18:25 | -          | Facilitator            | Debrief & Avslutning              | Gjennomgang av “fasit”, diskusjon, læringspunkter, Q&A                                                                                                                                                | Refleksjon og læring                           |

## Coach Notes

**Før workshopen:**

- Sørg for at alle logger er tilgjengelige og lesbare
- Test at scheduled events trigges til riktig tid
- Ha "fasit" tilgjengelig for å kunne guide studenter

**Under workshopen:**

- Observér hvordan team samarbeider og kommuniserer
- Vær tilgjengelig for spørsmål, men ikke gi svar direkte
- Oppmuntre til systematisk tilnærming (ikke panikk)
- Noter ned interessante funn/diskusjoner for debrief

**Etter workshopen:**

- Samle feedback fra studenter
- Diskuter hva som fungerte bra og hva som kan forbedres
- Del ressurser for videre læring (MITRE ATT&CK, NIST framework, etc.)
