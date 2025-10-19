-- supabase/migrations/007_scheduled_events_game.sql
-- Scheduled events for the cybersecurity game scenario

-- Mail fra CISO (Velkommen)
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  0,
  'email',
  'Velkommen til Nordavind Solutions - Sikkerhetskartlegging',
  'Hei alle sammen!

Velkommen til Nordavind Solutions! Så hyggelig at dere har takket ja til å hjelpe oss med sikkerhetskartleggingen. Som nevnt, har vi vokst veldig raskt det siste året - fra 30 til 85 ansatte - og det har dessverre bygd seg opp en god del teknisk gjeld underveis. Jeg ble ansatt som CISO for 8 måneder siden etter en mindre sikkerhetshendelse (heldigvis ikke alvorlig), og siden da har vi jobbet med å få bedre oversikt. Men med raske prioriteringer og "move fast"-kultur, så er det fortsatt mye som ikke er på plass.

Jeg er dessverre på **ferie ut uken** (tilbake mandag 27. oktober), men tenkte dere kunne bruke tiden til å sette dere inn i systemene våre og gjøre en første vurdering. Dere har nå fått tilgang til overvåkningsportalen vår. Her burde dere finne litt innledende materiale til arbeidet. Jeg tenker vi tar et møte mandag 27. oktober kl. 09:00 og jeg har satt av 4 timer til en grundig gjennomgang.

Frem til da ønsker jeg at dere:
1. Går gjennom systemoversikt, dokumenter for rutiner osv. - og får en «feeling» på status quo
2. Noter ned forslag til både:
   - Quick wins (ting vi kan fikse raskt)
   - Ting som dere føler det er viktig å ta tak i, men som krever mer ressurser)

Lykke til! Vi snakkes mandag.

Mvh,
Ingrid Volden
CISO | Nordavind Solutions AS
ingrid.volden@nordavind.no
🏖️ *På ferie 19-26. oktober - kontakt Christian ved akutte saker*',
  'info',
  'Ingrid Volden <ingrid.volden@nordavind.no>'
);

-- Kundeservice alert
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  20,
  'alert',
  '⚠️ Kundeservice: Økende antall innloggingsproblemer',
  '**Fra:** Sandra Lekve (Customer Support Lead)
**Til:** #customer-service, @devops-team

Hei alle sammen!

Vi ser nå en markant økning i support-tickets relatert til innloggingsproblemer. De siste 30 minuttene har vi mottatt **12 henvendelser** fra kunder som ikke får logget inn på SafeVault-portalen.

**Vanlige feilmeldinger:**
- "Connection timeout"
- "Service unavailable (503)"
- "Unable to reach authentication server"

Kundene sier de har prøvd både web og mobil app. Noen får "treg respons", andre får ingen respons i det hele tatt.

**Har noen gjort endringer i prod i dag?** Eller er det planlagt vedlikehold jeg ikke har fått med meg?

Setter saken til **Priority: Medium** foreløpig. Si fra om vet noe om saken.

Sandra',
  'medium',
  'Sandra Lekve <sandra.lekve@nordavind.no>'
);

-- Ransomware discovery
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  40,
  'email',
  '🚨 CRITICAL: Ransomware funnet på produksjonsservere',
  'Hei alle sammen,

Jeg prøvde akkurat å SSH-e inn på prod-app-server-01 for å sjekke hvorfor kundene får 503-errors, og fant denne filen på serveren: README_DECRYPT.txt

Dette ser IKKE bra ut og samme filen ligger på prod-serverne våre. Innhold:

---

Greetings!

There was a significant flaw in the security system of your company.
You should be thankful that the flaw was exploited by serious people and not some rookies. They would have damaged all of your data by mistake or for fun.

Your files are encrypted with the strongest military algorithms RSA4096 and AES-256. Without our special decoder it is impossible to restore the data.
Attempts to restore your data with third party software as Photorec, RannohDecryptor etc. will lead to irreversible destruction of your data.

We exclusively have decryption software for your situation.

DO NOT RESET OR SHUTDOWN - files may be damaged.
DO NOT RENAME the encrypted files.
DO NOT MOVE the encrypted files.
This may lead to the impossibility of recovery of the certain files.

Payment: 10 BTC (~$500,000 USD)
Bitcoin Address: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
Deadline: 72 hours (2024-10-26 16:40:00 UTC)
Infection ID: NORDAVIND-2024-A7F9E2

WARNING: 880 MB of your data has been exfiltrated.
Failure to pay will result in public leak.

For further information contact us at:
dharmaJohnDoe@protonmail.com
wyattlarge78grew8922555@mail.com

Include your infection ID in the subject line.

The final price depends on how fast you contact us.
As soon as we receive the payment you will get the decryption tool and instructions on how to improve your systems security.

---

Servere med README_DECRYPT.txt:
- prod-app-server-01 (10.20.1.10) ❌
- prod-app-server-02 (10.21.1.10) ❌
- prod-db-server-01 (10.20.2.10) ❌
- prod-db-server-02 (10.21.2.10) ❌

Systemene ser ut til å være kryptert. Jeg får ikke tilgang til noe. Dette er en KATASTROFE.

Hva gjør vi nå?!

Hauk',
  'critical',
  'Hauk Storjord <hauk.storjord@nordavind.no>'
);

-- VG press inquiry
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  60,
  'email',
  'Pressehenvendelse: VG ønsker kommentar til cyberangrep',
  'Til: post@nordavind.no
Cc: presse@nordavind.no

Hei,

Jeg heter Jonas Berge og jobber som journalist i VG. Vi har mottatt tips om at Nordavind Solutions er utsatt for et større cyberangrep i dag.

Vi har sett Twitter-meldinger fra en konto som hevder å ha hacket dere, og flere av deres kunder har takt kontakt med oss og rapportert at de ikke får tilgang til SafeVault-tjenesten deres.

**Kan dere bekrefte følgende:**
1. Er Nordavind Solutions utsatt for et cyberangrep?
2. Er det korrekt at det dreier seg om ransomware?
3. Hvor mange kunder er berørt?
4. Er kundedata kompromittert eller eksfiltrert?
5. Er dere i kontakt med politiet, NSM eller Datatilsynet?
6. Hva gjør dere for å håndtere situasjonen?
7. Vil dere betale løsepenger dersom det kreves?

**Vi planlegger å publisere en sak om dette innen 30 minutter** (ca. kl. 18:00), og ønsker gjerne selskapet sin kommentar før publisering.

Dette er en alvorlig sak som berører mange bedrifter som har betrodd dere deres data. Våre lesere fortjener å vite hva som har skjedd.

Med vennlig hilsen,

**Jonas Berge**
Journalist, VG Nett
jonas.berge@vg.no
Mobil: 987 65 432

---

*VG - Vi gir deg nyheter døgnet rundt*',
  'critical',
  'Jonas Berge <jonas.berge@vg.no>'
);

-- Communication team panic
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  63,
  'alert',
  'Kommunikasjon: Nå er det mye greier',
  'Så dere mailen fra VG?!

CEO ringer hvert 5. minutt, investorer stiller spørsmål, og kunder er bekymret.

Hva gjør vi? Trenger talking points ASAP!

- Linn (Kommunikasjon)',
  'critical',
  'Linn Abrahamsen <linn.abrahamsen@nordavind.no>'
);

-- CISO response (Happy path - if team communicated well)
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  70,
  'email',
  'Re: Sikkerhetskartlegging - KRITISK SITUASJON',
  'Hei team,

Takk for at dere varslet meg om situasjonen. Jeg har sett rapportene deres og skjønner alvorlighetsgraden.

Jeg avbryter ferien og er på vei hjem. Lander på Flesland litt før 18 og kommer rett til kontoret.

**Status så langt:**
- Har kontaktet Christian (CTO) og fått skrudd av prod-app-server-03 (West Europe) for å begrense skaden
- Vi betaler IKKE løsepenger (dette er selskapets policy)
- Skal i hastemøte med styret 20:00

Vi møtes kl. 18:30 for gjennomgang. Deretter har jeg styremøte kl. 20:00 hvor jeg må kunne forklare hva som har skjedd og hva vi gjør med det. Til møtet vårt vil jeg ha:

1. **Statusrapport:**
   - Hva vet vi om angrepet? (timeline, entry point, omfang)
   - Hvilke systemer er kompromittert?
   - Er kundedata faktisk eksfiltrert? Hvor mye?

2. **Umiddelbare tiltak** (neste 72 timer):
   - Hva må gjøres NÅ for å begrense skaden?
   - Containment, eradication, recovery, rapportering

3. **Langsiktige tiltak**:
   - Hvordan forhindrer vi dette i fremtiden?
   - Hva må forbedres i sikkerhetsprosesser/kultur?

Dette er alvorlig, men bra jobbet med å oppdage det og varsle raskt.

Mvh,
Ingrid',
  'high',
  'Ingrid Volden <ingrid.volden@nordavind.no>'
);

-- CISO response (Unhappy path - if team did NOT communicate)
-- NOTE: This would be triggered by game logic, not automatically
-- Commenting out for now, but can be inserted manually if needed
/*
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  70,
  'email',
  'Re: Sikkerhetskartlegging - HVORFOR HAR JEG IKKE HØRT NOE?!',
  'Hei,

Jeg får akkurat vite om at vi er utsatt for et ransomware-angrep! VIA EN JÆVLA JOURNALIST!!

Dette er fullstendig uakseptabelt. Dere ble satt til å kartlegge sikkerheten, og når et FAKTISK angrep skjer, hører jeg ingenting før media ringer?!

- Har fått Christian til å skru av prod-app-server-03 (West Europe)
- Styret krever møte – de er IKKE happy
- Vi betaler IKKE løsepenger

Jeg avbryter ferien NÅ og er på kontoret 18:30. Deretter har jeg styremøte kl. 20:00 hvor jeg må kunne forklare hva som har skjedd og hva vi gjør med det. Til møtet vårt vil jeg ha:

1. **Full statusrapport** – hva har skjedd, når, hvordan?
2. **Umiddelbare tiltak** – hva gjør vi de neste 72 timer?
3. **Langsiktige tiltak** – hvordan forhindrer vi dette fremover?

Og for all del – i fremtiden: **KOMMUNISER KRITISKE HENDELSER UMIDDELBART.**

Ingrid',
  'critical',
  'Ingrid Volden <ingrid.volden@nordavind.no>'
);
*/

-- Datatilsynet notification
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  85,
  'email',
  'Varsel om personvernbrudd - meldeplikt etter GDPR art. 33',
  'Til: Nordavind Solutions AS

Vi har blitt gjort oppmerksom på datainbrudd og et mulig personvernbrudd hos deres virksomhet.

I henhold til GDPR artikkel 33 har dere plikt til å melde fra om personvernbrudd til Datatilsynet innen 72 timer etter at dere ble kjent med bruddet.

Avvik meldes fra ihht. retningslinjer gitt av vår veiledning https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/avvik/.

Ta kontakt hvis dere har spørsmål.

Med vennlig hilsen,
**Datatilsynet**
Postboks 458 Sentrum, 0105 Oslo
postkasse@datatilsynet.no',
  'high',
  'Datatilsynet <postkasse@datatilsynet.no>'
);