# Nordavind Solutions - Nettverksarkitektur (Internt)

## IP-Adresse Ranges

| Nettverk                          | IP Range       | Beskrivelse                              |
| --------------------------------- | -------------- | ---------------------------------------- |
| **Oslo Kontor (On-Premise)**      | `10.0.1.0/24`  | Ansattes workstations + infrastruktur    |
| **VPN Pool (Remote Access)**      | `10.10.0.0/24` | Dynamiske IPs tildelt ved VPN-tilkobling |
| **Azure - Norway East (Primary)** | `10.20.0.0/16` | Produksjonsservere (app + db)            |
| **Azure - Norway West (DR)**      | `10.21.0.0/16` | Disaster Recovery / Load balancing       |
| **Azure - West Europe (Global)**  | `10.22.0.0/16` | Global skalering (internasjonale kunder) |

## Nettverkstopologi

```
┌───────────────────────────────────────┐
│                 INTERNET              │
└────────────────────┬──────────────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
    ┌─────▼─────┐        ┌─────▼─────┐
    │ Firewall  │        │VPN Gateway│
    │10.0.1.254 │        │10.0.1.253 │
    └─────┬─────┘        └─────┬─────┘
          │                    │
          └──────────┬─────────┘
                     │
    ┌────────────────▼────────────────┐
    │  OSLO KONTOR (10.0.1.0/24)      │
    │  • Ansattes PCs (10.0.1.x)      │
    │  • File Server (10.0.1.200)     │
    └────────────────┬────────────────┘
                     │
                     │ (VPN Tunnel)
                     │
    ┌────────────────▼────────────────┐
    │   VPN POOL    (10.10.0.0/24)    │
    │   • Ola:      10.10.0.15        │
    │   • Kjetil:   10.10.0.22        │
    │   • Marius:   10.10.0.20        │
    │   • etc.                        │
    └────────────────┬────────────────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
    ┌────▼────┐ ┌────▼────┐ ┌───▼────┐
    │ NORWAY  │ │ NORWAY  │ │  WEST  │
    │  EAST   │ │  WEST   │ │ EUROPE │
    │10.20/16 │ │10.21/16 │ │10.22/16│
    └─────────┘ └─────────┘ └────────┘

    app-01:      app-02:      app-03:
    10.20.1.10   10.21.1.10   10.22.1.10

    db-01:       db-02:       db-03:
    10.20.2.10   10.21.2.10   10.22.2.10
```

# NordaVind AS - Personalgalleri (Kompakt)

## Ledelse

### **Kristian Rosland** - CEO

- **Epost:** kristian.rosland@nordavind.no
- **Kontor-PC:** `10.0.1.100`
- **Traits:** Visjonær leder med teknisk bakgrunn. Tidligere utvikler som jobbet seg opp. Vil ha rask vekst, men forstår tekniske utfordringer. Svarer alltid på Slack innen 5 minutter.

### **Christian Hein** - CTO

- **Epost:** christian.hein@nordavind.no
- **Kontor-PC:** `10.0.1.101`
- **Traits:** Teknisk visjonær, frustrert over teknisk gjeld. Pusher hardt for modernisering og skyløsninger. Skriver fortsatt kode når han får tid. Litt utålmodig.

### **Ingrid Volden** - CISO (Chief Information Security Officer)

- **Epost:** ingrid.volden@nordavind.no
- **Kontor-PC:** `10.0.1.102`
- **Traits:** Erfaren sikkerhetsleder. Ansatt for 8 måneder siden etter sikkerhetshendelse i 2024. Lager gode sikkerhetsdokumenter, men sliter med å få folk til å følge dem. Metodisk og grundig.

---

## Team DevOps (Infrastruktur & Platform)

### **Kjetil Berg** - Lead DevOps Engineer

- **Epost:** kjetil.berg@nordavind.no
- **Kontor-PC:** `10.0.1.087`
- **VPN:** `10.10.0.22`
- **Traits:** Ansvarlig for CI/CD, Kubernetes og Azure-infrastruktur. Strukturert og metodisk. Pedantisk med logging. **Oppdaget noe rart i logs i forrige uke, men ble avfeid som "false positive".**

### **Arne Natskår** - DevOps Engineer (Nettverk & Sikkerhet)

- **Epost:** arne.natskar@nordavind.no
- **Kontor-PC:** `10.0.1.111`
- **Traits:** "Old school" admin som lærer seg Azure. Overvåker nettverk som en hauk. Sender ofte varsel om "unormal trafikk". Jobber ofte nattskift. Samarbeider tett med Ingrid (CISO).

### **Didrik Sæther** - DevOps Engineer (Database)

- **Epost:** didrik.saether@nordavind.no
- **Kontor-PC:** `10.0.1.112`
- **Traits:** Ansvarlig for databaser og storage. Paranoid om database-sikkerhet. **La merke til mistenkelig FTP-trafikk i går kveld.** Sjekker logs hver morgen med kaffen.

---

## Team Bedrift (B2B Product)

### **Marius Arder** - Senior Developer (Team Lead)

- **Epost:** marius.arder@nordavind.no
- **Kontor-PC:** `10.0.1.120`
- **VPN IP:** `10.10.0.20`
- **Traits:** Team lead for Bedrift. "Move fast and break things"-mentalitet. Hardkoder gjerne credentials "midlertidig". Deler kode-snippets i Discord uten å tenke på sensitive data.

### **Ola Hansen** - Senior Developer

- **Epost:** ola.hansen@nordavind.no
- **Kontor-PC:** `10.0.1.142`
- **VPN IP:** `10.10.0.15`
- **Traits:** Erfaren utvikler, men litt slurvete med sikkerhet. Klikker fort på lenker. **PÅ FERIE 15-25. OKTOBER!** Elsker å løse problemer, men dokumenterer sjelden. Bruker "👍" på alt i chat.

### **Hauk Storjord** - Full Stack Developer

- **Epost:** hauk.storjord@nordavind.no
- **Kontor-PC:** `10.0.1.121`
- **VPN IP:** `10.10.0.21`
- **Traits:** Pragmatisk og løsningsorientert. God på både frontend og backend. Ofte involvert i brannslukning. **Svært dårlig på å logge ut av systemer.** Jobber sent.

---

## Team Privatperson (B2C Product)

### **Synne Stokkevåg Berg** - Senior Developer (Team Lead)

- **Epost:** synne.berg@nordavind.no
- **Kontor-PC:** `10.0.1.130`
- **Traits:** Lead for Privatperson. Fokusert på UX og React. **Spurte i Discord om "noen hadde endret login-siden" i går.** Jobber ofte hjemmefra.

### **Eirik Dahlen** - Developer

- **Epost:** eirik.dahlen@nordavind.no
- **Kontor-PC:** `10.0.1.131`
- **Traits:** Allrounder som hopper mellom frontend og backend. God på å fikse ting raskt, men tar noen ganger snarveier. Har tilgang til prod "for debugging".

### **Mari Hansen** - Junior Developer

- **Epost:** mari.hansen@nordavind.no
- **Kontor-PC:** `10.0.1.156`
- **Traits:** Nyutdannet og ivrig. Stiller mange spørsmål i Discord. Bekymret for å gjøre feil. **Tok phishing-training for 2 måneder siden og husker den godt.** Rapporterte fishy mail til Ingrid forrige måned.

---

## Customer Service

### **Sandra Lekve** - Customer Support Lead

- **Epost:** sandra.lekve@nordavind.no
- **Kontor-PC:** `10.0.1.160`
- **Traits:** Vennlig og tålmodig. Leder supportteamet. **Rapporterte at kunder klaget på "rare innloggingsproblemer" i morges.** Har ikke teknisk bakgrunn.

---

## Administrativt

### **Frithjof Fredriksen** - HR Manager

- **Epost:** frithjof.fredriksen@nordavind.no
- **Kontor-PC:** `10.0.1.170`
- **Traits:** Administrerer feriekalender og personopplysninger. **Oppdaterer #ferie-kanalen daglig.** Tilgang til sensitiv ansattdata. Ingen VPN-tilgang (kun kontor). Litt gammelmodig, men nøye med detaljer.

---

## Mistenkelige/Kompromitterte IP-adresser

- `185.220.101.42` - TOR exit node (Romania)
- `103.75.32.18` - Mistenkelig IP (Vietnam)
- `45.142.212.61` - Kjent malware C2 (Russia)
- `194.26.192.77` - Phishing infrastruktur (Moldova)

---

## Discord Kanaler

- **#team-devops** - DevOps (Kjetil, Arne, Didrik)
- **#team-bedrift** - B2B (Marius, Ola, Hauk)
- **#team-privatperson** - B2C (Synne, Eirik, Mari)
- **#customer-service** - Support (Sandra)
- **#security** - Sikkerhet (Ingrid, Arne, Christian)
- **#ferie** - Feriekalender (alle)
- **#general** - Generell chat

---

## Viktige notater for øvelsen:

- **Phishing-mail** sendt til flere i Team Bedrift, men **Ola klikket**
- **Conditional Access** modifisert **18. oktober kl. 23:47** (mens Ola på ferie)
- **Feriekalender** (#ferie): **Ola på ferie 15-25. oktober**
- **Sandra** mottok **kundeklager om innlogging**
- **Synne** spurte om **noen endret login-siden**
- **Didrik** la merke til **mistenkelig FTP-trafikk**
- **Kjetil** oppdaget rare ting i logs, men ble avfeid
