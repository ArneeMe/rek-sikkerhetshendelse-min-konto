-- Mail fra CISO
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  0,  -- Starter ved 16:30 (0 minutter inn)
  'email',
  'Velkommen til Nordavind Solutions - Sikkerhetskartlegging',
  'Hei alle sammen!\n\nVelkommen til Nordavind Solutions! Så hyggelig at dere har takket ja til å hjelpe oss med sikkerhetskartleggingen. Som nevnt, har vi vokst veldig raskt det siste året - fra 30 til 85 ansatte - og det har dessverre bygd seg opp en god del teknisk gjeld underveis. Jeg ble ansatt som CISO for 8 måneder siden etter en mindre sikkerhetshendelse (heldigvis ikke alvorlig), og siden da har vi jobbet med å få bedre oversikt. Men med raske prioriteringer og "move fast"-kultur, så er det fortsatt mye som ikke er på plass.\n\nJeg er dessverre på **ferie ut uken** (tilbake mandag 27. oktober), men tenkte dere kunne bruke tiden til å sette dere inn i systemene våre og gjøre en første vurdering. Dere har nå fått tilgang til overvåkningsportalen vår. Her burde dere finne litt innledende materiale til arbeidet. Jeg tenker vi tar et møte mandag 27. oktober kl. 09:00 og jeg har satt av 4 timer til en grundig gjennomgang.\n\nFrem til da ønsker jeg at dere:\n1. Går gjennom systemoversikt, dokumenter for rutiner osv. - og får en «feeling» på status quo\n2. Noter ned forslag til både:\n   - Quick wins (ting vi kan fikse raskt)\n   - Ting som dere føler det er viktig å ta tak i, men som krever mer ressurser)\n\nLykke til! Vi snakkes mandag.\n\nMvh,\nIngrid Volden\nCISO | Nordavind Solutions AS\ningrid.volden@nordavind.no\n🏖️ *På ferie 19-26. oktober - kontakt Christian ved akutte saker*',
  'info',
  'Ingrid Volden <ingrid.volden@nordavind.no>'
);

-- Kundeservice
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  20,  -- 20 minutter etter start (16:50)
  'alert',
  '⚠️ Kundeservice: Økende antall innloggingsproblemer',
  '**Fra:** Sandra Lekve (Customer Support Lead)\n**Til:** #customer-service, @devops-team\n\nHei alle sammen!\n\nVi ser nå en markant økning i support-tickets relatert til innloggingsproblemer. De siste 30 minuttene har vi mottatt **12 henvendelser** fra kunder som ikke får logget inn på SafeVault-portalen.\n\n**Vanlige feilmeldinger:**\n- "Connection timeout"\n- "Service unavailable (503)"\n- "Unable to reach authentication server"\n\nKundene sier de har prøvd både web og mobil app. Noen får "treg respons", andre får ingen respons i det hele tatt.\n\n**Har noen gjort endringer i prod i dag?** Eller er det planlagt vedlikehold jeg ikke har fått med meg?\n\nSetter saken til **Priority: Medium** foreløpig. Si fra om vet noe om saken.\n\nSandra',
  'medium',
  'Sandra Lekve <sandra.lekve@nordavind.no>'
);

-- Ransomware
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  40,  -- 40 minutter etter start (17:10)
  'email',
  '🚨 CRITICAL: Ransomware funnet på produksjonsservere',
  'Hei alle sammen,\n\nJeg prøvde akkurat å SSH-e inn på prod-app-server-01 for å sjekke hvorfor kundene får 503-errors, og fant denne filen på serveren: README_DECRYPT.txt\n\nDette ser IKKE bra ut og samme filen ligger på prod-serverne våre. Innhold:\n\n---\n\nGreetings!\n\nThere was a significant flaw in the security system of your company.\nYou should be thankful that the flaw was exploited by serious people and not some rookies. They would have damaged all of your data by mistake or for fun.\n\nYour files are encrypted with the strongest military algorithms RSA4096 and AES-256. Without our special decoder it is impossible to restore the data.\nAttempts to restore your data with third party software as Photorec, RannohDecryptor etc. will lead to irreversible destruction of your data.\n\nWe exclusively have decryption software for your situation.\n\nDO NOT RESET OR SHUTDOWN - files may be damaged.\nDO NOT RENAME the encrypted files.\nDO NOT MOVE the encrypted files.\nThis may lead to the impossibility of recovery of the certain files.\n\nPayment: 10 BTC (~$500,000 USD)\nBitcoin Address: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh\nDeadline: 72 hours (2024-10-26 16:40:00 UTC)\nInfection ID: NORDAVIND-2024-A7F9E2\n\nWARNING: 880 MB of your data has been exfiltrated.\nFailure to pay will result in public leak.\n\nFor further information contact us at:\ndharmaJohnDoe@protonmail.com\nwyattlarge78grew8922555@mail.com\n\nInclude your infection ID in the subject line.\n\nThe final price depends on how fast you contact us.\nAs soon as we receive the payment you will get the decryption tool and instructions on how to improve your systems security.\n\n---\n\nServere med README_DECRYPT.txt:\n- prod-app-server-01 (10.20.1.10) ❌\n- prod-app-server-02 (10.21.1.10) ❌\n- prod-db-server-01 (10.20.2.10) ❌\n- prod-db-server-02 (10.21.2.10) ❌\n\nSystemene ser ut til å være kryptert. Jeg får ikke tilgang til noe. Dette er en KATASTROFE.\n\nHva gjør vi nå?!\n\nHauk',
  'critical',
  'Hauk Storjord <hauk.storjord@nordavind.no>'
);

-- VG
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  60,  -- 60 minutter etter start (17:30)
  'email',
  'Pressehenvendelse: VG ønsker kommentar til cyberangrep',
  'Til: post@nordavind.no\nCc: presse@nordavind.no\n\nHei,\n\nJeg heter Jonas Berge og jobber som journalist i VG. Vi har mottatt tips om at Nordavind Solutions er utsatt for et større cyberangrep i dag.\n\nVi har sett Twitter-meldinger fra en konto som hevder å ha hacket dere, og flere av deres kunder har tatt kontakt med oss og rapportert at de ikke får tilgang til SafeVault-tjenesten deres.\n\n**Kan dere bekrefte følgende:**\n1. Er Nordavind Solutions utsatt for et cyberangrep?\n2. Er det korrekt at det dreier seg om ransomware?\n3. Hvor mange kunder er berørt?\n4. Er kundedata kompromittert eller eksfiltrert?\n5. Er dere i kontakt med politiet, NSM eller Datatilsynet?\n6. Hva gjør dere for å håndtere situasjonen?\n7. Vil dere betale løsepenger dersom det kreves?\n\n**Vi planlegger å publisere en sak om dette innen 30 minutter** (ca. kl. 18:00), og ønsker gjerne selskapet sin kommentar før publisering.\n\nDette er en alvorlig sak som berører mange bedrifter som har betrodd dere deres data. Våre lesere fortjener å vite hva som har skjedd.\n\nMed vennlig hilsen,\n\n**Jonas Berge**\nJournalist, VG Nett\njonas.berge@vg.no\nMobil: 987 65 432\n\n---\n\n*VG - Vi gir deg nyheter døgnet rundt*',
  'critical',
  'Jonas Berge <jonas.berge@vg.no>'
);


-- NÅ ER DET MYE GREIER!
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  63,  -- 63 minutter etter start (17:33)
  'alert',
  'Kommunikasjon: Nå er det mye greier',
  'Så dere mailen fra VG?!\n\nCEO ringer hvert 5. minutt, investorer stiller spørsmål, og kunder er bekymret.\n\nHva gjør vi? Trenger talking points ASAP!\n\n- Linn (Kommunikasjon)',
  'critical',
  'Linn Abrahamsen <linn.abrahamsen@nordavind.no>'
);

-- CISO (Fornøyd)
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  from_sender
) VALUES (
  70,  -- 70 minutter etter start (17:40)
  'email',
  'Re: Sikkerhetskartlegging - KRITISK SITUASJON',
  'Hei team,\n\nTakk for at dere varslet meg om situasjonen. Jeg har sett rapportene deres og skjønner alvorlighetsgraden.\n\nJeg avbryter ferien og er på vei hjem. Lander på Flesland litt før 18 og kommer rett til kontoret.\n\n**Status så langt:**\n- Har kontaktet Christian (CTO) og fått skrudd av prod-app-server-03 (West Europe) for å begrense skaden\n- Vi betaler IKKE løsepenger (dette er selskapets policy)\n- Skal i hastemøte med styret 20:00\n\nVi møtes kl. 18:30 for gjennomgang. Deretter har jeg styremøte kl. 20:00 hvor jeg må kunne forklare hva som har skjedd og hva vi gjør med det. Til møtet vårt vil jeg ha:\n\n1. **Statusrapport:**\n   - Hva vet vi om angrepet? (timeline, entry point, omfang)\n   - Hvilke systemer er kompromittert?\n   - Er kundedata faktisk eksfiltrert? Hvor mye?\n\n2. **Umiddelbare tiltak** (neste 72 timer):\n   - Hva må gjøres NÅ for å begrense skaden?\n   - Containment, eradication, recovery, rapportering\n\n3. **Langsiktige tiltak**:\n   - Hvordan forhindrer vi dette i fremtiden?\n   - Hva må forbedres i sikkerhetsprosesser/kultur?\n\nDette er alvorlig, men bra jobbet med å oppdage det og varsle raskt.\n\nMvh,\nIngrid',
  'Ingrid Volden <ingrid.volden@nordavind.no>'
);

-- CISO (Misfornøyd)
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  70,  -- 70 minutter etter start (17:40)
  'email',
  'Re: Sikkerhetskartlegging - HVORFOR HAR JEG IKKE HØRT NOE?!',
  'Hei,\n\nJeg får akkurat vite om at vi er utsatt for et ransomware-angrep! VIA EN JÆVLA JOURNALIST!!\n\nDette er fullstendig uakseptabelt. Dere ble satt til å kartlegge sikkerheten, og når et FAKTISK angrep skjer, hører jeg ingenting før media ringer?!\n\n- Har fått Christian til å skru av prod-app-server-03 (West Europe)\n- Styret krever møte – de er IKKE happy\n- Vi betaler IKKE løsepenger\n\nJeg avbryter ferien NÅ og er på kontoret 18:30. Deretter har jeg styremøte kl. 20:00 hvor jeg må kunne forklare hva som har skjedd og hva vi gjør med det. Til møtet vårt vil jeg ha:\n\n1. **Full statusrapport** – hva har skjedd, når, hvordan?\n2. **Umiddelbare tiltak** – hva gjør vi de neste 72 timer?\n3. **Langsiktige tiltak** – hvordan forhindrer vi dette fremover?\n\nOg for all del – i fremtiden: **KOMMUNISER KRITISKE HENDELSER UMIDDELBART.**\n\nIngrid',
  'critical',
  'Ingrid Volden <ingrid.volden@nordavind.no>'
);

-- Datatilsynet
INSERT INTO scheduled_events (
  trigger_at_minutes,
  type,
  title,
  content,
  severity,
  from_sender
) VALUES (
  85,  -- 85 minutter etter start (17:55)
  'email',
  'Varsel om personvernbrudd - meldeplikt etter GDPR art. 33',
  'Til: Nordavind Solutions AS\n\nVi har blitt gjort oppmerksom på datainbrudd og et mulig personvernbrudd hos deres virksomhet.\n\nI henhold til GDPR artikkel 33 har dere plikt til å melde fra om personvernbrudd til Datatilsynet innen 72 timer etter at dere ble kjent med bruddet.\n\nAvvik meldes fra ihht. retningslinjer gitt av vår veiledning https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/avvik/.\n\nTa kontakt hvis dere har spørsmål.\n\nMed vennlig hilsen,\n**Datatilsynet**\nPostboks 458 Sentrum, 0105 Oslo\npostkasse@datatilsynet.no',
  'high',
  'Datatilsynet <postkasse@datatilsynet.no>'
);
