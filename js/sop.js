// =====================================================
// HR Psychology Portal - SOP Data
// =====================================================

const SOP_DATA = [
  {
    code: 'SOP-HRD-001',
    title: 'Rekrutmen dan Seleksi Karyawan',
    subtitle: 'Employee Recruitment & Selection Process',
    content: `
      <h4>🎯 Tujuan</h4>
      <p>Memastikan proses rekrutmen dan seleksi karyawan berjalan secara terstruktur, objektif, dan sesuai dengan kebutuhan organisasi.</p>
      
      <h4 style="margin-top:1rem">📋 Ruang Lingkup</h4>
      <p>SOP ini berlaku untuk semua proses perekrutan karyawan tetap, karyawan kontrak, dan magang di seluruh departemen.</p>
      
      <h4 style="margin-top:1rem">⚡ Prosedur</h4>
      <ol style="padding-left:1.5rem;line-height:2">
        <li><strong>Identifikasi Kebutuhan</strong> — Departemen mengajukan MPP (Man Power Planning) ke HRD minimal 1 bulan sebelumnya</li>
        <li><strong>Penyusunan Job Description</strong> — HRD bersama departemen menyusun deskripsi dan spesifikasi jabatan</li>
        <li><strong>Sourcing Kandidat</strong> — Posting lowongan di platform digital, referral internal, job fair</li>
        <li><strong>Seleksi Administratif</strong> — Screening CV sesuai kualifikasi minimum (5 hari kerja)</li>
        <li><strong>Tes Psikologi</strong> — Pelaksanaan serangkaian tes psikometri sesuai level jabatan</li>
        <li><strong>Interview HRD</strong> — Wawancara kompetensi dan kecocokan budaya organisasi</li>
        <li><strong>Interview User</strong> — Wawancara teknis oleh kepala departemen yang bersangkutan</li>
        <li><strong>Medical Check-Up</strong> — Pemeriksaan kesehatan untuk kandidat yang lolos seleksi</li>
        <li><strong>Offering Letter</strong> — Penawaran kerja dan negosiasi kompensasi</li>
        <li><strong>On-boarding</strong> — Orientasi dan induksi karyawan baru (1-3 hari)</li>
      </ol>
      
      <h4 style="margin-top:1rem">📊 Standar Waktu</h4>
      <table style="width:100%;border-collapse:collapse;font-size:.85rem">
        <tr style="background:#f3f4f6"><th style="padding:.4rem;text-align:left">Tahap</th><th style="padding:.4rem">Target Waktu</th></tr>
        <tr><td style="padding:.4rem">Screening CV</td><td style="padding:.4rem;text-align:center">5 HK</td></tr>
        <tr style="background:#f9fafb"><td style="padding:.4rem">Tes Psikologi</td><td style="padding:.4rem;text-align:center">1-2 HK</td></tr>
        <tr><td style="padding:.4rem">Interview</td><td style="padding:.4rem;text-align:center">3-5 HK</td></tr>
        <tr style="background:#f9fafb"><td style="padding:.4rem">Total proses</td><td style="padding:.4rem;text-align:center">Max 30 HK</td></tr>
      </table>
    `
  },
  {
    code: 'SOP-HRD-002',
    title: 'Pelaksanaan Tes Psikologi',
    subtitle: 'Psychological Testing Administration',
    content: `
      <h4>🎯 Tujuan</h4>
      <p>Memastikan pelaksanaan tes psikologi berjalan secara standar, valid, dan reliabel untuk mendukung pengambilan keputusan HRD.</p>
      
      <h4 style="margin-top:1rem">📋 Jenis Tes per Level Jabatan</h4>
      <table style="width:100%;border-collapse:collapse;font-size:.85rem">
        <tr style="background:#1a56db;color:#fff"><th style="padding:.5rem;text-align:left">Level</th><th style="padding:.5rem">Tes Wajib</th><th style="padding:.5rem">Tes Tambahan</th></tr>
        <tr><td style="padding:.5rem;font-weight:600">Staff</td><td style="padding:.5rem">IST/CFIT, DISC, BFI, PAPIKOSTIK</td><td style="padding:.5rem">AQ, VAK</td></tr>
        <tr style="background:#f9fafb"><td style="padding:.5rem;font-weight:600">Supervisor</td><td style="padding:.5rem">IST/WPT, MBTI, MSDT, Holland</td><td style="padding:.5rem">EPPS, 16PF</td></tr>
        <tr><td style="padding:.5rem;font-weight:600">Manager</td><td style="padding:.5rem">IST/WPT, MMPI, MSAI, Enneagram</td><td style="padding:.5rem">BDI (jika diperlukan)</td></tr>
        <tr style="background:#f9fafb"><td style="padding:.5rem;font-weight:600">Senior Manager+</td><td style="padding:.5rem">IST/WPT, MMPI, MSDT, MSAI</td><td style="padding:.5rem">Holland, Enneagram</td></tr>
      </table>
      
      <h4 style="margin-top:1rem">⚡ Prosedur Pelaksanaan</h4>
      <ol style="padding-left:1.5rem;line-height:2">
        <li><strong>Persiapan ruangan</strong> — Ruang tenang, penerangan baik, 1 testee per meja</li>
        <li><strong>Registrasi testee</strong> — Verifikasi identitas, pengisian data pribadi</li>
        <li><strong>Briefing</strong> — Penjelasan tujuan dan prosedur tes (tidak diberitahu nama tes)</li>
        <li><strong>Pelaksanaan tes</strong> — Sesuai urutan standar, batas waktu diterapkan ketat</li>
        <li><strong>Skoring</strong> — Dilakukan oleh psikolog atau teknisi psikologi bersertifikat</li>
        <li><strong>Interpretasi</strong> — Oleh psikolog berlisensi (S2 Psikologi/M.Psi.)</li>
        <li><strong>Pembuatan laporan</strong> — Laporan psikologi dalam 3-5 HK setelah tes</li>
      </ol>

      <h4 style="margin-top:1rem">⚠️ Etika dan Kerahasiaan</h4>
      <ul style="padding-left:1.5rem;line-height:2">
        <li>Hasil tes bersifat RAHASIA, hanya dibagikan ke HRD dan manajemen yang berwenang</li>
        <li>Testee berhak mendapat umpan balik umum atas hasil tes</li>
        <li>Data testee disimpan minimal 5 tahun dalam sistem yang aman</li>
        <li>Dilarang menggunakan hasil tes untuk diskriminasi berbasis SARA</li>
      </ul>
    `
  },
  {
    code: 'SOP-HRD-003',
    title: 'Penilaian Kinerja Karyawan',
    subtitle: 'Employee Performance Appraisal',
    content: `
      <h4>🎯 Tujuan</h4>
      <p>Mengukur dan mengevaluasi kinerja karyawan secara objektif sebagai dasar pengembangan dan penghargaan.</p>
      
      <h4 style="margin-top:1rem">📋 Siklus Penilaian</h4>
      <ul style="padding-left:1.5rem;line-height:2">
        <li><strong>Penilaian Mid-Year</strong> — Juni/Juli setiap tahun (penilaian tengah tahun)</li>
        <li><strong>Penilaian End-Year</strong> — Desember setiap tahun (penilaian tahunan)</li>
        <li><strong>Penilaian Probasi</strong> — Bulan ke-3 dan ke-6 masa percobaan</li>
      </ul>
      
      <h4 style="margin-top:1rem">📊 Komponen Penilaian</h4>
      <table style="width:100%;border-collapse:collapse;font-size:.85rem">
        <tr style="background:#1a56db;color:#fff"><th style="padding:.5rem">Komponen</th><th style="padding:.5rem">Bobot</th><th style="padding:.5rem">Deskripsi</th></tr>
        <tr><td style="padding:.5rem">KPI (Key Performance Indicator)</td><td style="padding:.5rem;text-align:center">50%</td><td style="padding:.5rem">Target terukur sesuai jabatan</td></tr>
        <tr style="background:#f9fafb"><td style="padding:.5rem">Kompetensi</td><td style="padding:.5rem;text-align:center">30%</td><td style="padding:.5rem">Hard & soft competency</td></tr>
        <tr><td style="padding:.5rem">Perilaku/Attitude</td><td style="padding:.5rem;text-align:center">20%</td><td style="padding:.5rem">Kedisiplinan, kerja sama, inisiatif</td></tr>
      </table>
      
      <h4 style="margin-top:1rem">⭐ Skala Penilaian</h4>
      <table style="width:100%;border-collapse:collapse;font-size:.85rem">
        <tr style="background:#1a56db;color:#fff"><th style="padding:.5rem">Nilai</th><th style="padding:.5rem">Kategori</th><th style="padding:.5rem">Deskripsi</th></tr>
        <tr><td style="padding:.5rem;text-align:center;font-weight:800">5</td><td style="padding:.5rem">Sangat Baik (Excellent)</td><td style="padding:.5rem">Jauh melampaui target, role model</td></tr>
        <tr style="background:#f9fafb"><td style="padding:.5rem;text-align:center;font-weight:800">4</td><td style="padding:.5rem">Baik (Good)</td><td style="padding:.5rem">Melampaui sebagian target</td></tr>
        <tr><td style="padding:.5rem;text-align:center;font-weight:800">3</td><td style="padding:.5rem">Cukup (Satisfactory)</td><td style="padding:.5rem">Memenuhi target</td></tr>
        <tr style="background:#f9fafb"><td style="padding:.5rem;text-align:center;font-weight:800">2</td><td style="padding:.5rem">Perlu Perbaikan (Needs Improvement)</td><td style="padding:.5rem">Belum memenuhi target</td></tr>
        <tr><td style="padding:.5rem;text-align:center;font-weight:800">1</td><td style="padding:.5rem">Tidak Memuaskan (Unsatisfactory)</td><td style="padding:.5rem">Jauh di bawah target</td></tr>
      </table>
    `
  },
  {
    code: 'SOP-HRD-004',
    title: 'Pengembangan dan Pelatihan Karyawan',
    subtitle: 'Training & Development',
    content: `
      <h4>🎯 Tujuan</h4>
      <p>Meningkatkan kompetensi dan kapabilitas karyawan secara terencana dan berkesinambungan.</p>
      
      <h4 style="margin-top:1rem">⚡ Prosedur TNA (Training Need Analysis)</h4>
      <ol style="padding-left:1.5rem;line-height:2">
        <li>Identifikasi gap kompetensi dari hasil penilaian kinerja</li>
        <li>Pemetaan kebutuhan pelatihan per departemen</li>
        <li>Penyusunan Training Plan tahunan</li>
        <li>Alokasi anggaran pelatihan</li>
        <li>Pelaksanaan dan monitoring pelatihan</li>
        <li>Evaluasi efektivitas pelatihan (Kirkpatrick Level 1-4)</li>
      </ol>
      
      <h4 style="margin-top:1rem">📊 Jenis Program Pengembangan</h4>
      <ul style="padding-left:1.5rem;line-height:2">
        <li><strong>In-house Training</strong> — Pelatihan internal oleh trainer internal/external</li>
        <li><strong>External Training</strong> — Seminar, workshop, conference</li>
        <li><strong>E-Learning</strong> — Platform pembelajaran online</li>
        <li><strong>Coaching & Mentoring</strong> — Pembimbingan oleh atasan langsung</li>
        <li><strong>Job Rotation</strong> — Rotasi jabatan untuk pengembangan karier</li>
        <li><strong>Study Tour</strong> — Kunjungan benchmarking ke perusahaan lain</li>
      </ul>
    `
  },
  {
    code: 'SOP-HRD-005',
    title: 'Manajemen Penggajian (Payroll)',
    subtitle: 'Payroll Management',
    content: `
      <h4>🎯 Tujuan</h4>
      <p>Memastikan penggajian karyawan dilakukan secara akurat, tepat waktu, dan sesuai peraturan perundang-undangan.</p>
      
      <h4 style="margin-top:1rem">⚡ Siklus Penggajian</h4>
      <table style="width:100%;border-collapse:collapse;font-size:.85rem">
        <tr style="background:#1a56db;color:#fff"><th style="padding:.5rem">Tanggal</th><th style="padding:.5rem">Aktivitas</th><th style="padding:.5rem">PIC</th></tr>
        <tr><td style="padding:.5rem;text-align:center">1-5</td><td style="padding:.5rem">Rekap absensi dan lembur</td><td style="padding:.5rem">Admin HRD</td></tr>
        <tr style="background:#f9fafb"><td style="padding:.5rem;text-align:center">6-10</td><td style="padding:.5rem">Perhitungan gaji, PPh 21, BPJS</td><td style="padding:.5rem">Payroll Officer</td></tr>
        <tr><td style="padding:.5rem;text-align:center">11-14</td><td style="padding:.5rem">Verifikasi dan approval</td><td style="padding:.5rem">HRD Manager</td></tr>
        <tr style="background:#f9fafb"><td style="padding:.5rem;text-align:center">15/25</td><td style="padding:.5rem">Transfer gaji ke rekening karyawan</td><td style="padding:.5rem">Finance</td></tr>
        <tr><td style="padding:.5rem;text-align:center">26-30</td><td style="padding:.5rem">Distribusi slip gaji</td><td style="padding:.5rem">Admin HRD</td></tr>
      </table>
    `
  },
  {
    code: 'SOP-HRD-006',
    title: 'Manajemen Hubungan Industrial',
    subtitle: 'Industrial Relations Management',
    content: `
      <h4>🎯 Tujuan</h4>
      <p>Menciptakan hubungan industrial yang harmonis antara perusahaan, karyawan, dan serikat pekerja.</p>
      
      <h4 style="margin-top:1rem">📋 Jenis Pelanggaran dan Sanksi</h4>
      <table style="width:100%;border-collapse:collapse;font-size:.85rem">
        <tr style="background:#1a56db;color:#fff"><th style="padding:.5rem">Kategori</th><th style="padding:.5rem">Contoh Pelanggaran</th><th style="padding:.5rem">Sanksi</th></tr>
        <tr><td style="padding:.5rem">Ringan</td><td style="padding:.5rem">Terlambat, tidak disiplin</td><td style="padding:.5rem">SP 1</td></tr>
        <tr style="background:#f9fafb"><td style="padding:.5rem">Sedang</td><td style="padding:.5rem">Absen tanpa izin, tidak mencapai target</td><td style="padding:.5rem">SP 2</td></tr>
        <tr><td style="padding:.5rem">Berat</td><td style="padding:.5rem">Pencurian, penipuan, pelecehan</td><td style="padding:.5rem">SP 3 / PHK</td></tr>
      </table>
      
      <h4 style="margin-top:1rem">⚡ Prosedur Penanganan Keluhan</h4>
      <ol style="padding-left:1.5rem;line-height:2">
        <li>Karyawan menyampaikan keluhan secara tertulis ke HRD</li>
        <li>HRD melakukan investigasi dalam 5 HK</li>
        <li>Mediasi antara karyawan dan atasan langsung</li>
        <li>Keputusan dari manajemen dalam 10 HK</li>
        <li>Jika tidak selesai: escalate ke Disnaker</li>
      </ol>
    `
  },
  {
    code: 'SOP-HRD-007',
    title: 'Onboarding Karyawan Baru',
    subtitle: 'New Employee Onboarding',
    content: `
      <h4>🎯 Tujuan</h4>
      <p>Memastikan karyawan baru mendapatkan orientasi yang komprehensif dan terintegrasi ke lingkungan kerja dengan cepat dan efektif.</p>
      
      <h4 style="margin-top:1rem">📅 Program Onboarding (Hari 1-90)</h4>
      <table style="width:100%;border-collapse:collapse;font-size:.85rem">
        <tr style="background:#1a56db;color:#fff"><th style="padding:.5rem">Periode</th><th style="padding:.5rem">Program</th></tr>
        <tr><td style="padding:.5rem;font-weight:600">Hari 1</td><td style="padding:.5rem">Welcome meeting, profil perusahaan, perkenalan tim</td></tr>
        <tr style="background:#f9fafb"><td style="padding:.5rem;font-weight:600">Hari 2-5</td><td style="padding:.5rem">Orientasi departemen, job shadowing, pemahaman SOP</td></tr>
        <tr><td style="padding:.5rem;font-weight:600">Minggu 2-4</td><td style="padding:.5rem">Training on-the-job, mentoring oleh senior</td></tr>
        <tr style="background:#f9fafb"><td style="padding:.5rem;font-weight:600">Bulan 2-3</td><td style="padding:.5rem">Evaluasi probasi, penetapan target awal</td></tr>
      </table>
      
      <h4 style="margin-top:1rem">📋 Checklist Onboarding</h4>
      <ul style="padding-left:1.5rem;line-height:2">
        <li>☐ Pembuatan email dan akses sistem</li>
        <li>☐ Penyediaan peralatan kerja</li>
        <li>☐ Kartu karyawan dan akses gedung</li>
        <li>☐ Pendaftaran BPJS Kesehatan dan Ketenagakerjaan</li>
        <li>☐ Penandatanganan kontrak dan NDA</li>
        <li>☐ Pengenalan budaya dan nilai perusahaan</li>
        <li>☐ Penetapan mentor/buddy</li>
      </ul>
    `
  },
  {
    code: 'SOP-HRD-008',
    title: 'Pemutusan Hubungan Kerja (PHK)',
    subtitle: 'Employee Termination',
    content: `
      <h4>🎯 Tujuan</h4>
      <p>Memastikan proses pemutusan hubungan kerja dilakukan sesuai ketentuan hukum ketenagakerjaan yang berlaku.</p>
      
      <h4 style="margin-top:1rem">📋 Jenis PHK</h4>
      <ul style="padding-left:1.5rem;line-height:2">
        <li><strong>Resign</strong> — Atas permintaan karyawan (notice 1 bulan)</li>
        <li><strong>PHK Efisiensi</strong> — Perusahaan mengakhiri hubungan kerja karena alasan bisnis</li>
        <li><strong>PHK Disiplin</strong> — Karena pelanggaran berat setelah SP 1, 2, 3</li>
        <li><strong>Pensiun</strong> — Mencapai usia pensiun (55-65 tahun sesuai kebijakan)</li>
        <li><strong>Meninggal dunia</strong> — Hak-hak diserahkan kepada ahli waris</li>
      </ul>
      
      <h4 style="margin-top:1rem">💰 Hak-hak Karyawan PHK (UU No.11/2020 & PP 35/2021)</h4>
      <table style="width:100%;border-collapse:collapse;font-size:.85rem">
        <tr style="background:#1a56db;color:#fff"><th style="padding:.5rem">Komponen</th><th style="padding:.5rem">Ketentuan</th></tr>
        <tr><td style="padding:.5rem">Uang Pesangon</td><td style="padding:.5rem">1-9x upah sesuai masa kerja</td></tr>
        <tr style="background:#f9fafb"><td style="padding:.5rem">Uang Penghargaan Masa Kerja</td><td style="padding:.5rem">2-10x upah (masa kerja 3-24+ thn)</td></tr>
        <tr><td style="padding:.5rem">Uang Penggantian Hak</td><td style="padding:.5rem">Cuti tahunan, biaya perumahan 15%</td></tr>
      </table>
      
      <h4 style="margin-top:1rem">⚡ Prosedur Exit</h4>
      <ol style="padding-left:1.5rem;line-height:2">
        <li>Exit interview oleh HRD</li>
        <li>Serah terima pekerjaan dan aset perusahaan</li>
        <li>Penyelesaian administrasi dan perhitungan hak</li>
        <li>Pemberian surat pengalaman kerja</li>
        <li>Penonaktifan akses dan sistem</li>
      </ol>
    `
  },
];
