# Diagram Visual - Visit Sulsel

Dokumen ini berisi diagram-diagram visual untuk presentasi business plan Visit Sulsel.

---

## 0. Tahapan Pendekatan ke Gubernur

```mermaid
flowchart LR
    subgraph Tahap1[TAHAP 1: PROPOSAL KE GUBERNUR]
        A[Surat Resmi] --> B[Grand Design]
        B --> C[Demo Mockup]
        C --> D[Presentasi]
    end
    
    subgraph Tahap2[TAHAP 2: PERSETUJUAN]
        E[Review Dinas Terkait]
        F[Audiensi Gubernur]
        G[Persetujuan Prinsip]
    end
    
    subgraph Tahap3[TAHAP 3: EKSEKUSI]
        H[Pembentukan Tim]
        I[Alokasi Anggaran]
        J[Kick-off Project]
    end
    
    Tahap1 --> Tahap2 --> Tahap3
```

---

## 1. Ekosistem Platform Visit Sulsel

```mermaid
flowchart TB
    subgraph Wisatawan[Wisatawan]
        W1[Domestik]
        W2[Mancanegara]
        W3[MICE/Corporate]
    end
    
    subgraph Platform[Visit Sulsel Platform]
        direction TB
        P1[Destinasi & Booking]
        P2[Marketplace UMKM]
        P3[Creator Hub]
        P4[Tour Guide]
        P5[Komunitas]
    end
    
    subgraph Stakeholder[Stakeholder Lokal]
        S1[UMKM Lokal]
        S2[Tour Guide]
        S3[Kreator Konten]
        S4[Hotel & Akomodasi]
        S5[Pengelola Destinasi]
    end
    
    Wisatawan --> Platform
    Platform --> Stakeholder
    
    S1 -->|Produk| P2
    S2 -->|Layanan| P4
    S3 -->|Konten| P3
    S4 -->|Kamar| P1
    S5 -->|Tiket| P1
```

---

## 2. Alur Bisnis dan Revenue

```mermaid
flowchart LR
    subgraph Input[INPUT]
        U[User/Wisatawan]
    end
    
    subgraph Platform[VISIT SULSEL]
        direction TB
        T1[Transaksi Booking]
        T2[Transaksi Marketplace]
        T3[Transaksi Jasa]
    end
    
    subgraph Revenue[REVENUE STREAMS]
        R1["Komisi Booking (10-15%)"]
        R2["Komisi Marketplace (5-15%)"]
        R3["Fee Jasa (10-15%)"]
        R4[Iklan & Premium]
    end
    
    subgraph Output[OUTPUT]
        O1[UMKM]
        O2[Guide]
        O3[Kreator]
        O4[Akomodasi]
    end
    
    U --> T1 & T2 & T3
    T1 --> R1
    T2 --> R2
    T3 --> R3
    Platform --> R4
    
    R1 --> O4
    R2 --> O1
    R3 --> O2 & O3
```

---

## 3. Model Bisnis Canvas

```mermaid
flowchart TB
    subgraph KP[Key Partners]
        KP1[Pemprov Sulsel]
        KP2[Dinas Pariwisata]
        KP3[Bank/Payment]
        KP4[Telkom/ISP]
    end
    
    subgraph KA[Key Activities]
        KA1[Platform Development]
        KA2[Onboarding UMKM]
        KA3[Marketing]
        KA4[Customer Service]
    end
    
    subgraph VP[Value Proposition]
        VP1[All-in-One Platform]
        VP2[Lokal First]
        VP3[Dampak Terukur]
    end
    
    subgraph CR[Customer Relations]
        CR1[24/7 Support]
        CR2[Komunitas]
        CR3[Loyalty Program]
    end
    
    subgraph CS[Customer Segments]
        CS1[Wisatawan Domestik]
        CS2[Wisatawan Asing]
        CS3[UMKM Lokal]
        CS4[Kreator/Guide]
    end
    
    KP --> KA --> VP --> CR --> CS
```

---

## 4. User Journey - Wisatawan

```mermaid
journey
    title Perjalanan User di Visit Sulsel
    section Discovery
      Cari destinasi: 5: Wisatawan
      Baca review: 4: Wisatawan
      Lihat itinerary: 4: Wisatawan
    section Planning
      Pilih paket: 5: Wisatawan
      Booking guide: 4: Wisatawan
      Booking hotel: 5: Wisatawan
    section Transaction
      Pembayaran: 5: Wisatawan
      Konfirmasi: 5: Wisatawan
    section Experience
      Traveling: 5: Wisatawan
      Belanja UMKM: 4: Wisatawan
      Foto dengan kreator: 4: Wisatawan
    section Post-trip
      Tulis review: 4: Wisatawan
      Share di komunitas: 3: Wisatawan
      Repeat order: 5: Wisatawan
```

---

## 5. Arsitektur Teknis Platform

```mermaid
flowchart TB
    subgraph Client[Client Layer]
        C1[Web App - Next.js]
        C2[Mobile App - React Native]
        C3[Admin Dashboard]
    end
    
    subgraph API[API Gateway]
        AG[API Gateway / Load Balancer]
    end
    
    subgraph Services[Microservices]
        S1[Auth Service]
        S2[Booking Service]
        S3[Marketplace Service]
        S4[User Service]
        S5[Payment Service]
        S6[Notification Service]
    end
    
    subgraph Data[Data Layer]
        D1[(PostgreSQL)]
        D2[(Redis Cache)]
        D3[(Elasticsearch)]
        D4[Cloud Storage]
    end
    
    subgraph External[External Services]
        E1[Payment Gateway]
        E2[Maps API]
        E3[SMS/Email]
        E4[Analytics]
    end
    
    Client --> AG
    AG --> Services
    Services --> Data
    Services --> External
```

---

## 6. Roadmap Timeline

```mermaid
gantt
    title Roadmap Pengembangan Visit Sulsel
    dateFormat  YYYY-MM
    section Fase 1 - Foundation
    Finalisasi Badan Usaha    :2026-01, 2M
    Backend Development       :2026-01, 3M
    Payment Integration       :2026-02, 2M
    Onboarding UMKM          :2026-02, 4M
    Soft Launch              :milestone, 2026-04, 0d
    Grand Launch             :milestone, 2026-06, 0d
    
    section Fase 2 - Growth
    Mobile App Development    :2026-05, 3M
    User Acquisition         :2026-07, 4M
    Partnership Expansion    :2026-08, 3M
    
    section Fase 3 - Scale
    AI Recommendation        :2027-01, 4M
    Regional Expansion       :2027-04, 6M
    International Market     :2027-07, 5M
```

---

## 7. Struktur Organisasi

```mermaid
flowchart TB
    DD[Dewan Direksi]
    DU[Direktur Utama]
    
    DD --> DU
    
    DU --> DT[Direktur Teknologi]
    DU --> DO[Direktur Operasional]
    DU --> DM[Direktur Marketing]
    
    DT --> Dev[Dev Team]
    DT --> IT[IT Operations]
    
    DO --> Part[Partnership]
    DO --> CS[Customer Service]
    
    DM --> Dig[Digital Marketing]
    DM --> Cont[Content Team]
```

---

## 8. Perbandingan Model Badan Usaha

```mermaid
flowchart LR
    subgraph A[Opsi A: BUMD]
        A1[100% Pemprov]
        A2[Kontrol Penuh]
        A3[Revenue untuk PAD]
    end
    
    subgraph B[Opsi B: PPP]
        B1[51% Pemprov]
        B2[49% Swasta]
        B3[Shared Risk/Reward]
    end
    
    subgraph C[Opsi C: BUMN Kolaborasi]
        C1[Pemprov + Telkom/BNI]
        C2[Enterprise Capability]
        C3[National Network]
    end
    
    Decision{Keputusan Meeting}
    
    A --> Decision
    B --> Decision
    C --> Decision
```

---

## 9. Proyeksi Keuangan

```mermaid
xychart-beta
    title "Proyeksi Revenue vs Cost (Miliar Rupiah)"
    x-axis [Q1-26, Q2-26, Q3-26, Q4-26, Q1-27, Q2-27, Q3-27, Q4-27]
    y-axis "Miliar Rupiah" 0 --> 12
    bar [0.3, 0.6, 1.2, 2.0, 3.0, 4.5, 6.0, 8.5]
    line [1.5, 1.8, 2.0, 2.2, 2.5, 2.8, 3.0, 3.5]
```

---

## 10. Dampak Ekonomi

```mermaid
pie showData
    title Distribusi Dampak Ekonomi Visit Sulsel
    "UMKM Marketplace" : 35
    "Tour Guide" : 20
    "Kreator Konten" : 15
    "Akomodasi" : 20
    "PAD Pemprov" : 10
```

---

## 11. Matriks Stakeholder

```mermaid
quadrantChart
    title Stakeholder Analysis
    x-axis Low Interest --> High Interest
    y-axis Low Power --> High Power
    quadrant-1 Key Players
    quadrant-2 Keep Satisfied
    quadrant-3 Monitor
    quadrant-4 Keep Informed
    Pemprov: [0.9, 0.9]
    Dinas_Pariwisata: [0.85, 0.75]
    UMKM: [0.8, 0.4]
    Wisatawan: [0.7, 0.3]
    Tour_Guide: [0.6, 0.35]
    Kreator: [0.5, 0.3]
    Media: [0.4, 0.5]
    Investor: [0.75, 0.7]
```

---

## 12. Analisis SWOT

```mermaid
quadrantChart
    title SWOT Analysis Visit Sulsel
    x-axis Harmful --> Helpful
    y-axis External --> Internal
    quadrant-1 Strengths
    quadrant-2 Weaknesses
    quadrant-3 Threats
    quadrant-4 Opportunities
    LocalFirst: [0.8, 0.8]
    AllInOne: [0.75, 0.85]
    GovSupport: [0.7, 0.7]
    LimitedBudget: [0.3, 0.75]
    NewTeam: [0.25, 0.8]
    Competition: [0.2, 0.3]
    Regulation: [0.35, 0.25]
    Tourism_Growth: [0.85, 0.3]
    Digital_Trend: [0.8, 0.35]
```

---

## 13. Strategi Pertumbuhan ala Startup Sukses

```mermaid
flowchart TB
    subgraph Gojek[PELAJARAN DARI GOJEK]
        G1[Solve Real Problem]
        G2[Start Local, Scale National]
        G3[Super App Ecosystem]
        G4[Driver as Partner]
    end
    
    subgraph Aruna[PELAJARAN DARI ARUNA]
        A1[Empower Local Community]
        A2[Direct-to-Consumer Model]
        A3[Technology + Human Touch]
        A4[Impact Measurement]
    end
    
    subgraph VisitSulsel[APLIKASI DI VISIT SULSEL]
        V1[Solve Tourism Fragmentation]
        V2[Start Sulsel, Scale Indonesia Timur]
        V3[Super App Pariwisata]
        V4[UMKM & Guide as Partner]
        V5[Empower Local Economy]
        V6[Direct Booking Model]
        V7[Tech + Local Guide]
        V8[PAD & Jobs Dashboard]
    end
    
    Gojek --> VisitSulsel
    Aruna --> VisitSulsel
```

---

## 14. Skema Pendanaan dari Pemprov

```mermaid
flowchart TB
    subgraph Sumber[SUMBER DANA PEMPROV]
        S1[APBD Sulsel]
        S2[Penyertaan Modal BUMD]
        S3[DAK Pariwisata]
    end
    
    subgraph Alokasi[ALOKASI DANA]
        A1[Pengembangan Platform]
        A2[Operasional Tim]
        A3[Marketing & Subsidi]
        A4[Onboarding UMKM/Guide]
    end
    
    subgraph Return[RETURN KE DAERAH]
        R1[Revenue Platform]
        R2[PAD dari Pajak]
        R3[Lapangan Kerja]
        R4[Multiplier Effect]
    end
    
    Sumber --> Alokasi --> Return
    Return -->|Reinvestasi| Alokasi
```

---

## 15. Struktur Tim dan Field Team

```mermaid
flowchart TB
    DD[Dewan Direksi]
    DU[Direktur Utama]
    
    DD --> DU
    
    DU --> DT[Direktur Teknologi<br/>15-25 orang]
    DU --> DO[Direktur Operasional<br/>35-50 orang]
    DU --> DM[Direktur Marketing<br/>15-20 orang]
    DU --> DF[Direktur Keuangan<br/>10-15 orang]
    
    DO --> Field[FIELD TEAM<br/>24 orang di 6 region]
    
    Field --> R1[Makassar Raya]
    Field --> R2[Toraja]
    Field --> R3[Pantai Selatan]
    Field --> R4[Bone Raya]
    Field --> R5[Luwu Raya]
    Field --> R6[Sulsel Barat]
```

---

## 16. Proyeksi Pertumbuhan Tim

```mermaid
xychart-beta
    title "Proyeksi Jumlah Tim Visit Sulsel"
    x-axis ["2026-Q1", "2026-Q3", "2027", "2028", "2029"]
    y-axis "Jumlah Karyawan" 0 --> 150
    bar [25, 55, 85, 110, 130]
```

---

## 17. Fase Pertumbuhan Platform

```mermaid
flowchart LR
    subgraph Phase1[FASE 1: FOUNDATION]
        P1A[Build Core Platform]
        P1B[Onboard Early Adopters]
        P1C[Prove Unit Economics]
    end
    
    subgraph Phase2[FASE 2: TRACTION]
        P2A[Aggressive Marketing]
        P2B[Partnership Expansion]
        P2C[Feature Enhancement]
    end
    
    subgraph Phase3[FASE 3: SCALE]
        P3A[Regional Expansion]
        P3B[New Revenue Streams]
        P3C[Profitability]
    end
    
    Phase1 -->|6-12 bulan| Phase2 -->|12-18 bulan| Phase3
```

---

## Cara Menggunakan Diagram

### Untuk Presentasi
1. Copy kode mermaid ke [Mermaid Live Editor](https://mermaid.live)
2. Export sebagai PNG/SVG
3. Masukkan ke slide presentasi

### Untuk Dokumentasi
- Diagram dapat di-render langsung di GitHub, GitLab, atau Notion
- Gunakan plugin Mermaid di editor markdown

### Tools Rendering
- **Online**: mermaid.live, github.com
- **VS Code**: Markdown Preview Mermaid Support
- **Notion**: Built-in support
- **Confluence**: Mermaid plugin

---

*Diagram dibuat untuk mendukung Business Plan Visit Sulsel*
