# 🧠 Portal Psikologi HR
**HR Psychology Test Management Portal**

Aplikasi web statis bilingual (Indonesia/English) untuk manajemen tes psikologi HR.

---

## 🚀 Cara Membuka

Buka file `index.html` langsung di browser:
```
C:\Users\bpvpsurakarta\.gemini\antigravity\scratch\hr-portal\index.html
```

Tidak memerlukan server atau koneksi internet (100% offline).

---

## 📋 Fitur

### ✅ Test Catalog (29 Tes)
| # | Kode | Nama | Kategori | Auto-Skor |
|---|------|------|----------|-----------|
| 1 | CFIT | Culture Fair Intelligence Test | Inteligensi | ✅ |
| 2 | IST | Intelligenz-Struktur-Test | Inteligensi | ✅ |
| 3 | MIT | Multiple Intelligences Test | Inteligensi | ✅ |
| 4 | TIU | Tes Intelegensi Umum 5-6 | Inteligensi | ✅ |
| 5 | SPM | Standard Progressive Matrices | Inteligensi | ✅ |
| 6 | Army Alpha | Army Alpha | Inteligensi | ✅ |
| 7 | WPT | Wonderlic Personnel Test | Inteligensi | ✅ |
| 8 | Kraeplin | Kraeplin/Pauli | Psikomotor | ✅ |
| 9 | 16PF | Sixteen Personality Factors | Kepribadian | ✅ |
| 10 | BFI | Big Five Inventory | Kepribadian | ✅ |
| 11 | DISC | DISC | Kepribadian | ✅ |
| 12 | EPPS | Edwards Personal Preference Schedule | Kepribadian | ✅ |
| 13 | MBTI | Myers-Briggs Type Indicator | Kepribadian | ✅ |
| 14 | Personality | General Personality Test | Kepribadian | ✅ |
| 15 | MSAI | Multifactor Self-Assessment Inventory | Kepemimpinan | ✅ |
| 16 | MSDT | Management Style Diagnostic Test | Kepemimpinan | ✅ |
| 17 | PAPIKOSTIK | PAPI Kostick | Perilaku Kerja | ✅ |
| 18 | WARTEG | Wartegg Zeichen Test | Proyektif | ⚠️ Kualitatif |
| 19 | AQ | Adversity Quotient | Ketangguhan | ✅ |
| 20 | Enneagram | Enneagram | Kepribadian | ✅ |
| 21 | RMIB | Rothwell Miller Interest Blank | Minat | ✅ |
| 22 | Kuder | Kuder Preference Record | Minat | ✅ |
| 23 | CBI | Counterproductive Behavior Index | Integritas | ✅ |
| 24 | Holland | Holland RIASEC | Minat | ✅ |
| 25 | MMPI | Minnesota Multiphasic Personality Inventory | Klinis | ✅ |
| 26 | BDI | Beck Depression Inventory | Klinis | ✅ |
| 27 | VAK | Visual/Auditory/Kinesthetic | Gaya Belajar | ✅ |
| 28 | 16PF | 16 Personality Factors | Kepribadian | ✅ |

### 📊 Dashboard
- Statistik total tes, sesi, dan hasil
- Distribusi tes per kategori
- Akses cepat ke tes-tes populer

### 👥 Manajemen Sesi
- Buat sesi tes dengan nama dan daftar peserta
- Kelola status sesi (aktif/selesai)

### 📋 Direktori SOP
- 8 SOP HRD lengkap dengan prosedur detail
- Expandable accordion format

### 🌐 Bilingual
- Toggle bahasa Indonesia ↔ English
- Preferensi bahasa tersimpan di localStorage

---

## 🏗️ Struktur File

```
hr-portal/
├── index.html          ← Entry point
├── css/
│   └── style.css       ← Semua styling (21 KB)
└── js/
    ├── app.js          ← Core app, router, dashboard, session management (40 KB)
    ├── tests.js        ← 29 test modules dengan scoring engines (109 KB)
    └── sop.js          ← 8 SOP HRD dengan konten lengkap (17 KB)
```

---

## 💾 Data Storage
- Hasil tes disimpan di **browser localStorage** (persisten per browser)
- Data tidak dikirim ke server manapun (100% private)
- Export melalui fungsi Print/Cetak browser

---

## ⚠️ Catatan Penting
1. **WARTEG & tes proyektif**: Memerlukan interpretasi psikolog berlisensi
2. **MMPI**: Bersifat klinis, harus diinterpretasi oleh psikolog/psikiater
3. **WPT, TIU, Army Alpha**: Buku soal fisik diperlukan; proktor memasukkan jawaban
4. **SPM, CFIT**: Materi visual; proktor memasukkan jawaban testee
5. Semua data testee bersifat **RAHASIA** sesuai Kode Etik Psikologi Indonesia

---

## 🔧 Pengembangan Lanjutan
- Integrasi database server untuk multi-user
- Export PDF laporan psikologi otomatis
- Modul pelaporan dan analitik batch
- Mobile app (PWA)

---

*Dibuat untuk penggunaan internal HR psikologi | © 2026*
