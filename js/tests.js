// =====================================================
// HR Psychology Portal - Test Catalog & Scoring Engines
// All 29 psychometric tests
// =====================================================

const TEST_CATALOG = [

// ═══════════════════════════════════════════════════
// 1. CFIT — Culture Fair Intelligence Test
// ═══════════════════════════════════════════════════
{
  id: 'cfit', name: 'CFIT (Culture Fair Intelligence Test)',
  category: 'intelligence', icon: '🧩',
  items: 46, timeLimit: 12, autoScore: true,
  desc: 'Non-verbal intelligence test measuring fluid reasoning',
  descId: 'Tes kecerdasan non-verbal yang mengukur kemampuan penalaran',
  getQuestions() {
    // CFIT Scale 3A - representative items (proctor enters answers for actual test)
    const q = [];
    for (let i = 1; i <= 46; i++) {
      q.push({ type: 'choice', text: `Soal ${i}: Pilih gambar yang melengkapi pola (item administrasi - proktor memasukkan jawaban testee)`, options: ['A','B','C','D','E'] });
    }
    return q;
  },
  score(answers, participant) {
    const key = [0,3,1,0,2,4,1,3,2,0,4,1,3,2,1,4,0,2,3,1,
                 2,0,4,3,1,2,0,4,1,3,2,1,0,4,3,2,1,0,3,4,
                 1,2,0,3,4,1]; // answer keys A=0,B=1,C=2,D=3,E=4
    let rs = 0;
    Object.entries(answers).forEach(([idx, val]) => {
      if (parseInt(idx) < key.length && val === key[parseInt(idx)]) rs++;
    });
    // RS → IQ conversion table
    const iqTable = [59,60,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,
                     97,99,101,103,105,107,109,111,113,115,117,119,121,123,125,127,129,131,133,135,137,139,141,143,145,146];
    const iq = iqTable[Math.min(rs, 45)] || 59;
    let cat, catEn;
    if (iq < 70) { cat = 'Keterbelakangan Mental'; catEn = 'Mental Retardation'; }
    else if (iq < 80) { cat = 'Borderline'; catEn = 'Borderline'; }
    else if (iq < 90) { cat = 'Rata-rata Bawah'; catEn = 'Low Average'; }
    else if (iq < 110) { cat = 'Rata-rata'; catEn = 'Average'; }
    else if (iq < 120) { cat = 'Rata-rata Atas'; catEn = 'High Average'; }
    else if (iq < 140) { cat = 'Superior'; catEn = 'Superior'; }
    else { cat = 'Genius'; catEn = 'Genius'; }
    return { score: rs, iq, type: `IQ ${iq}`, category: cat, categoryEn: catEn, interpretation: `Skor Mentah: ${rs}/46, IQ: ${iq} — ${cat}` };
  },
  renderResult(r) {
    const iqColor = r.iq >= 110 ? 'var(--secondary)' : r.iq >= 90 ? 'var(--primary)' : r.iq >= 70 ? 'var(--warning)' : 'var(--danger)';
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#1e429f,#1a56db)">
        <div style="font-size:.9rem;opacity:.8">IQ Score</div>
        <div class="result-type" style="font-size:3rem">${r.iq}</div>
        <div class="result-score">${r.category} / ${r.categoryEn}</div>
      </div>
      <div class="card" style="margin-top:1rem">
        <div class="card-header"><span class="card-title">📊 Norma CFIT Skala 3A</span></div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:.5rem">
            ${[['<70','Keterbelakangan','#fee2e2','#991b1b'],['70-79','Borderline','#fef3c7','#92400e'],
               ['80-89','Rata-rata Bawah','#fff7ed','#9a3412'],['90-109','Rata-rata','#dbeafe','#1d4ed8'],
               ['110-119','Rata-rata Atas','#d1fae5','#065f46'],['120-139','Superior','#ede9fe','#5b21b6'],
               ['≥140','Genius','#fce7f3','#9d174d']].map(([range,cat,bg,color]) => `
              <div style="background:${bg};border-radius:8px;padding:.6rem;border:2px solid ${r.category.includes(cat)||cat.includes(r.category.split(' ')[0])?color:'transparent'}">
                <div style="font-weight:800;color:${color};font-size:1rem">${range}</div>
                <div style="font-size:.75rem;color:${color}">${cat}</div>
              </div>
            `).join('')}
          </div>
          <div class="alert alert-info" style="margin-top:1rem">
            <span>📋</span>
            <div>Skor Mentah (RS) Anda: <strong>${r.score}/46</strong> → IQ: <strong>${r.iq}</strong> → Kategori: <strong>${r.category}</strong></div>
          </div>
        </div>
      </div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 2. BDI — Beck Depression Inventory
// ═══════════════════════════════════════════════════
{
  id: 'bdi', name: 'BDI (Beck Depression Inventory)',
  category: 'clinical', icon: '🧠',
  items: 21, timeLimit: null, autoScore: true,
  desc: 'Measures depression severity across 21 symptom domains',
  descId: 'Mengukur tingkat depresi dalam 21 domain gejala',
  getQuestions() {
    return [
      { type:'choice', text:'1. Perasaan sedih', options:['Saya tidak merasa sedih (0)','Saya merasa sedih (1)','Saya merasa sedih sepanjang waktu dan tidak dapat menghilangkannya (2)','Saya begitu sedih sehingga tidak tahan lagi (3)'] },
      { type:'choice', text:'2. Pandangan terhadap masa depan', options:['Saya tidak merasa berkecil hati (0)','Saya merasa berkecil hati terhadap masa depan (1)','Saya merasa tidak ada sesuatu yang saya nantikan (2)','Saya merasa tidak ada harapan di masa depan (3)'] },
      { type:'choice', text:'3. Perasaan gagal', options:['Saya tidak merasa gagal (0)','Saya merasa lebih banyak mengalami kegagalan (1)','Kalau meninjau kembali hidup saya, yang saya lihat hanyalah kegagalan (2)','Saya merasa sebagai pribadi yang gagal total (3)'] },
      { type:'choice', text:'4. Ketidakpuasan', options:['Saya memperoleh kepuasan seperti biasanya (0)','Saya tidak dapat menikmati segala sesuatu seperti biasanya (1)','Saya tidak lagi memperoleh kepuasan yang nyata (2)','Saya merasa tidak puas atau bosan terhadap apa saja (3)'] },
      { type:'choice', text:'5. Perasaan bersalah', options:['Saya tidak merasa bersalah (0)','Saya cukup sering merasa bersalah (1)','Saya sering merasa sangat bersalah (2)','Saya merasa bersalah sepanjang waktu (3)'] },
      { type:'choice', text:'6. Perasaan dihukum', options:['Saya tidak merasa sedang dihukum (0)','Saya merasa mungkin dihukum (1)','Saya mengharapkan agar dihukum (2)','Saya merasa sedang dihukum (3)'] },
      { type:'choice', text:'7. Kekecewaan terhadap diri sendiri', options:['Saya tidak merasa kecewa terhadap diri sendiri (0)','Saya merasa kecewa terhadap diri sendiri (1)','Saya merasa jijik terhadap diri sendiri (2)','Saya membenci diri sendiri (3)'] },
      { type:'choice', text:'8. Menyalahkan diri sendiri', options:['Saya tidak merasa lebih buruk dari orang lain (0)','Saya selalu mencela diri sendiri karena kelemahan saya (1)','Saya menyalahkan diri sendiri sepanjang waktu (2)','Saya menyalahkan diri sendiri atas semua hal buruk (3)'] },
      { type:'choice', text:'9. Pikiran bunuh diri', options:['Saya tidak mempunyai pikiran untuk bunuh diri (0)','Saya mempunyai pikiran bunuh diri tetapi tidak akan melaksanakannya (1)','Saya ingin bunuh diri (2)','Saya akan bunuh diri kalau ada kesempatan (3)'] },
      { type:'choice', text:'10. Menangis', options:['Saya tidak menangis lebih dari biasanya (0)','Sekarang saya lebih banyak menangis (1)','Sekarang saya menangis sepanjang waktu (2)','Saya biasanya dapat menangis tetapi sekarang tidak dapat (3)'] },
      { type:'choice', text:'11. Perasaan jengkel/marah', options:['Saya tidak merasa lebih jengkel dari sebelumnya (0)','Saya lebih mudah jengkel atau marah dari biasanya (1)','Saya sekarang merasa jengkel sepanjang waktu (2)','Saya tidak dibuat jengkel oleh hal-hal yang biasanya menjengkelkan (3)'] },
      { type:'choice', text:'12. Minat terhadap orang lain', options:['Saya masih tetap senang bergaul (0)','Saya kurang berminat pada orang lain dibanding biasanya (1)','Saya kehilangan sebagian besar minat terhadap orang lain (2)','Saya telah kehilangan seluruh minat terhadap orang lain (3)'] },
      { type:'choice', text:'13. Pengambilan keputusan', options:['Saya mengambil keputusan sama baiknya dengan sebelumnya (0)','Saya lebih banyak menunda keputusan (1)','Saya mempunyai kesulitan lebih besar dalam mengambil keputusan (2)','Saya sama sekali tidak dapat mengambil keputusan (3)'] },
      { type:'choice', text:'14. Penampilan/perubahan fisik', options:['Saya tidak merasa kelihatan lebih jelek (0)','Saya merasa cemas jangan-jangan saya tua atau tidak menarik (1)','Saya merasa ada perubahan pada penampilan saya yang membuat tidak menarik (2)','Saya yakin bahwa saya kelihatan jelek (3)'] },
      { type:'choice', text:'15. Kemampuan bekerja', options:['Saya dapat bekerja dengan baik seperti sebelumnya (0)','Saya membutuhkan usaha istimewa untuk mulai mengerjakan sesuatu (1)','Saya harus memaksa diri untuk mengerjakan sesuatu (2)','Saya sama sekali tidak dapat mengerjakan apa-apa (3)'] },
      { type:'choice', text:'16. Kualitas tidur', options:['Saya dapat tidur nyenyak seperti biasanya (0)','Saya tidak dapat tidur nyenyak seperti biasanya (1)','Saya bangun 2-3 jam lebih awal dan sukar tidur kembali (2)','Saya bangun beberapa jam lebih awal dan tidak dapat tidur kembali (3)'] },
      { type:'choice', text:'17. Kelelahan', options:['Saya tidak lebih lelah dari biasanya (0)','Saya lebih mudah lelah dari biasanya (1)','Saya hampir selalu merasa lelah (2)','Saya merasa terlalu lelah untuk mengerjakan apapun (3)'] },
      { type:'choice', text:'18. Nafsu makan', options:['Nafsu makan saya masih seperti biasanya (0)','Nafsu makan saya tidak sebesar biasanya (1)','Sekarang nafsu makan saya jauh lebih berkurang (2)','Saya tidak mempunyai nafsu makan sama sekali (3)'] },
      { type:'choice', text:'19. Penurunan berat badan', options:['Saya tidak banyak kehilangan berat badan (0)','Saya telah kehilangan berat badan 2,5 kg lebih (1)','Saya telah kehilangan berat badan 5 kg lebih (2)','Saya telah kehilangan berat badan 7,5 kg lebih (3)'] },
      { type:'choice', text:'20. Kekhawatiran tentang kesehatan', options:['Saya tidak mencemaskan kesehatan melebihi biasanya (0)','Saya cemas akan masalah kesehatan fisik (1)','Saya sangat cemas akan kesehatan fisik saya (2)','Saya begitu cemas sehingga tidak dapat berpikir hal-hal lainnya (3)'] },
      { type:'choice', text:'21. Minat seksual', options:['Saya tidak merasa ada perubahan minat terhadap seks (0)','Saya kurang berminat terhadap seks dibanding biasanya (1)','Sekarang saya sangat kurang berminat terhadap seks (2)','Saya sama sekali kehilangan minat terhadap seks (3)'] },
    ];
  },
  score(answers) {
    let total = 0;
    Object.values(answers).forEach(v => total += v);
    let cat, catEn, color;
    if (total <= 10) { cat = 'Normal'; catEn = 'Normal'; color = 'var(--secondary)'; }
    else if (total <= 16) { cat = 'Mild Mood Disturbance'; catEn = 'Mild Mood Disturbance'; color = 'var(--primary)'; }
    else if (total <= 20) { cat = 'Borderline Klinis'; catEn = 'Borderline Clinical'; color = 'var(--warning)'; }
    else if (total <= 30) { cat = 'Depresi Sedang'; catEn = 'Moderate Depression'; color = 'var(--accent)'; }
    else if (total <= 40) { cat = 'Depresi Berat'; catEn = 'Severe Depression'; color = 'var(--danger)'; }
    else { cat = 'Depresi Ekstrem'; catEn = 'Extreme Depression'; color = 'var(--danger)'; }
    return { score: total, type: cat, typeEn: catEn, color, interpretation: `Total skor BDI: ${total}/63 — ${cat}` };
  },
  renderResult(r) {
    const pct = Math.round(r.score / 63 * 100);
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#1e429f,${r.color||'#1a56db'})">
        <div style="font-size:.9rem;opacity:.8">Total Skor BDI</div>
        <div class="result-type">${r.score} / 63</div>
        <div class="result-score">${r.type}</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        <div class="scale-bar-row"><div class="scale-bar-label"><span>Tingkat Depresi</span><span>${pct}%</span></div>
        <div class="scale-bar"><div class="scale-bar-fill" style="width:${pct}%;background:${r.color}"></div></div></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin-top:1rem">
          ${[['0-10','Normal','#d1fae5','#065f46'],['11-16','Mild','#dbeafe','#1d4ed8'],['17-20','Borderline','#fef9c3','#854d0e'],
             ['21-30','Sedang','#fed7aa','#9a3412'],['31-40','Berat','#fecaca','#991b1b'],['41+','Ekstrem','#fee2e2','#991b1b']].map(([range,cat,bg,col]) => `
            <div style="background:${bg};border-radius:8px;padding:.6rem;text-align:center;border:2px solid ${r.type.toLowerCase().includes(cat.toLowerCase())||cat==='Normal'&&r.type==='Normal'?col:'transparent'}">
              <div style="font-weight:800;color:${col}">${range}</div>
              <div style="font-size:.75rem;color:${col}">${cat}</div>
            </div>
          `).join('')}
        </div>
        ${r.score >= 17 ? '<div class="alert alert-warning" style="margin-top:1rem"><span>⚠️</span><div>Disarankan konsultasi dengan psikolog/psikiater untuk evaluasi lebih lanjut.</div></div>' : ''}
      </div></div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 3. VAK — Visual/Auditory/Kinesthetic Learning Style
// ═══════════════════════════════════════════════════
{
  id: 'vak', name: 'VAK (Gaya Belajar Visual-Auditori-Kinestetik)',
  category: 'learning', icon: '👁',
  items: 36, timeLimit: null, autoScore: true,
  desc: 'Identifies dominant learning style: Visual, Auditory, or Kinesthetic',
  descId: 'Mengidentifikasi gaya belajar dominan: Visual, Auditori, atau Kinestetik',
  getQuestions() {
    const items = [
      {text:'Saya lebih suka mendengarkan buku dari tape recorder daripada membacanya.',cat:'A'},
      {text:'Ketika memasang sesuatu, pertama-tama saya membaca petunjuknya.',cat:'V'},
      {text:'Saya lebih suka membaca daripada mendengarkan ceramah.',cat:'V'},
      {text:'Bila sedang sendirian, saya selalu bermain musik, bersenandung, atau bernyanyi.',cat:'A'},
      {text:'Saya lebih suka bermain olahraga daripada membaca buku.',cat:'K'},
      {text:'Saya selalu bisa menunjukkan arah utara/selatan tanpa alat di mana saja.',cat:'V'},
      {text:'Saya suka menulis surat, sastra, atau jurnal.',cat:'V'},
      {text:'Saya suka mengatakan "aku dengar bahwa..." atau "suara itu bagus".',cat:'A'},
      {text:'Kamarku, meja belajar, atau rumah selalu tak teratur.',cat:'K'},
      {text:'Saya suka bekerja dengan tangan dan membuat sesuatu.',cat:'K'},
      {text:'Saya sangat tahu tentang kata-kata nyanyian yang saya dengar.',cat:'A'},
      {text:'Ketika orang lain berbicara, saya selalu menggambarkan di pikiran tentang apa yang dikatakan.',cat:'V'},
      {text:'Saya menyukai olahraga dan saya berpendapat saya seorang atlet yang baik.',cat:'K'},
      {text:'Mudah saja berbicara panjang lebar di telepon dengan teman-teman.',cat:'A'},
      {text:'Tanpa musik, hidup ini tidaklah menyenangkan.',cat:'A'},
      {text:'Saya sangat senang di organisasi sosial dan selalu memulai pembicaraan.',cat:'A'},
      {text:'Saya dapat dengan mudah menentukan apakah objek-objek di kertas sama tanpa alat bantu.',cat:'V'},
      {text:'Saya sering mengatakan "Aku merasa perlu menangani keluhan ini".',cat:'K'},
      {text:'Ketika ingat kembali suatu pengalaman, saya sering melihat gambar tentang pengalaman itu.',cat:'V'},
      {text:'Ketika ingat suatu pengalaman, saya kebanyakan mendengar suara dan percakapan.',cat:'A'},
      {text:'Bila ingat suatu pengalaman, saya sering ingat bagaimana saya merasa tentangnya.',cat:'K'},
      {text:'Saya lebih suka musik daripada lukisan.',cat:'A'},
      {text:'Saya sering mencoret-coret/menggambar ketika menelpon atau dalam rapat.',cat:'V'},
      {text:'Saya lebih suka melakukan sesuatu daripada membuat laporan tertulis.',cat:'K'},
      {text:'Saya suka membaca cerita daripada mendengarkan cerita.',cat:'V'},
      {text:'Saya selalu berbicara secara pelan.',cat:'K'},
      {text:'Saya lebih suka berbicara daripada menulis.',cat:'A'},
      {text:'Tulisan tanganku tidak selalu dibutuhkan.',cat:'K'},
      {text:'Saya biasa menggunakan jari untuk menunjuk saat membaca.',cat:'K'},
      {text:'Saya dapat mengalihkan dan menambahkan angka dengan cepat di kepala saya.',cat:'V'},
      {text:'Saya suka mengeja dan saya seorang pembaca yang baik.',cat:'V'},
      {text:'Saya mengeluh sangat bingung bila seseorang mengajak bicara ketika sedang nonton TV.',cat:'A'},
      {text:'Saya suka mencatat perintah-perintah yang orang berikan.',cat:'V'},
      {text:'Saya dapat mudah mengingat apa yang orang katakan.',cat:'A'},
      {text:'Saya lebih belajar dengan cara melakukan.',cat:'K'},
      {text:'Sangat menyiksa diriku untuk tetap duduk dalam waktu lama.',cat:'K'},
    ];
    return items.map(item => ({ type: 'yn', text: item.text, cat: item.cat }));
  },
  score(answers) {
    const qs = this.getQuestions();
    let V=0, A=0, K=0;
    Object.entries(answers).forEach(([idx, val]) => {
      if (val === 1) {
        const cat = qs[parseInt(idx)]?.cat;
        if (cat === 'V') V++;
        else if (cat === 'A') A++;
        else if (cat === 'K') K++;
      }
    });
    const max = Math.max(V, A, K);
    let type;
    if (V === max && V > A && V > K) type = 'Visual';
    else if (A === max && A > V && A > K) type = 'Auditori';
    else if (K === max) type = 'Kinestetik';
    else type = [V>A&&V>K?'Visual':A>K?'Auditori':'Kinestetik'].join('/');
    return { score: `V:${V} A:${A} K:${K}`, V, A, K, type, interpretation: `Gaya belajar dominan: ${type}` };
  },
  renderResult(r) {
    const total = r.V + r.A + r.K || 1;
    const styles = [
      {code:'V', label:'Visual', score:r.V, pct:Math.round(r.V/total*100), desc:'Memahami informasi melalui apa yang dilihat. Rapi, teratur, berbicara cepat, pemikir visual.', color:'#1d4ed8', bg:'#dbeafe'},
      {code:'A', label:'Auditori', score:r.A, pct:Math.round(r.A/total*100), desc:'Memahami informasi melalui apa yang didengar. Suka berbicara, berdiskusi, mudah mengingat ceramah.', color:'#065f46', bg:'#d1fae5'},
      {code:'K', label:'Kinestetik', score:r.K, pct:Math.round(r.K/total*100), desc:'Belajar melalui gerakan, emosi, dan sentuhan. Berbicara pelan, belajar dengan melakukan.', color:'#9d174d', bg:'#fce7f3'},
    ];
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#1e429f,#0e9f6e)">
        <div style="font-size:.9rem;opacity:.8">Gaya Belajar Dominan</div>
        <div class="result-type">${r.type}</div>
        <div class="result-score">${r.score}</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1rem">
        ${styles.map(s => `
          <div class="card ${r.type===s.label?'':''}" style="border:3px solid ${r.type===s.label?s.color:'var(--border)'}">
            <div class="card-body">
              <div style="font-size:2rem;text-align:center;padding:.5rem;background:${s.bg};border-radius:8px;margin-bottom:.75rem">
                ${s.code==='V'?'👁':s.code==='A'?'👂':'🤸'}
              </div>
              <div class="font-bold text-center" style="font-size:1.1rem;margin-bottom:.5rem">${s.label}</div>
              <div class="scale-bar" style="margin-bottom:.4rem"><div class="scale-bar-fill" style="width:${s.pct}%;background:${s.color}"></div></div>
              <div class="text-center font-bold" style="color:${s.color}">${s.score} / ${total} (${s.pct}%)</div>
              ${r.type===s.label?`<div class="alert alert-info" style="margin-top:.75rem;font-size:.78rem">${s.desc}</div>`:''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 4. AQ — Adversity Quotient
// ═══════════════════════════════════════════════════
{
  id: 'aq', name: 'AQ (Adversity Quotient)',
  category: 'resilience', icon: '⛰',
  items: 15, timeLimit: null, autoScore: true,
  desc: 'Measures ability to overcome adversity and challenges (Quitter/Camper/Climber)',
  descId: 'Mengukur kemampuan menghadapi rintangan (Quitter/Camper/Climber)',
  getQuestions() {
    return [
      {type:'choice',text:'1. Bagi saya, kesulitan adalah:',options:['a. Sesuatu yang harus dihindari','b. Sesuatu yang bisa dicoba untuk dihadapi','c. Bagian dari hidup. Menghindari kesulitan sama saja dengan menghindari kehidupan']},
      {type:'choice',text:'2. Keyakinan saya terhadap masa depan adalah:',options:['a. Saya tidak berani menjamin, saya akan menunggu dan melihat','b. Melihat kemampuan sekarang, saya cukup yakin','c. Saya belum seberapa yakin, tetapi saya berharap bisa berhasil']},
      {type:'choice',text:'3. Jika menghadapi masalah yang sangat sulit dicapai keberhasilannya, tanggapan saya:',options:['a. Saya akan mengerjakannya, tidak peduli betapapun sulitnya','b. Saya akan mencoba, namun jika keadaan bertambah buruk saya akan berhenti','c. Saya tidak mau mengerjakannya, karena ini mustahil']},
      {type:'choice',text:'4. Saya adalah orang yang:',options:['a. Kadang-kadang menyerah tergantung situasi','b. Mudah menyerah','c. Pantang menyerah']},
      {type:'choice',text:'5. Bagi saya, pengembangan diri adalah:',options:['a. Cukup perlu','b. Hal yang tidak seberapa perlu','c. Segalanya']},
      {type:'choice',text:'6. Sikap saya terhadap perubahan adalah:',options:['a. Saya selalu menerima perubahan yang ditawarkan','b. Saya agak sulit menyesuaikan diri dengan perubahan','c. Saya akan lihat dulu perubahan seperti apa baru memutuskan']},
      {type:'choice',text:'7. Saya tergolong sebagai orang yang:',options:['a. Menunjukkan beberapa usaha jika memang diperlukan','b. Ambisius','c. Santai, tidak terlalu berambisi']},
      {type:'choice',text:'8. Di antara tiga hal berikut, yang paling sesuai dengan diri saya:',options:['a. Saya sudah puas dengan kehidupan sekarang','b. Dalam hal tertentu saya sudah puas','c. Masih banyak hal yang perlu saya capai']},
      {type:'choice',text:'9. Jika menghadapi masalah yang sangat sulit, saya cenderung:',options:['a. Menghadapi dan menyelesaikan hingga berhasil','b. Menghindarinya','c. Menghadapinya namun jika merasa tidak mampu akan berhenti']},
      {type:'choice',text:'10. Saya adalah orang yang:',options:['a. Sangat suka tantangan/hal baru','b. Suka melakukan hal-hal yang sudah ada sebagaimana mestinya','c. Mencoba sesuatu yang baru']},
      {type:'choice',text:'11. Jika lingkungan menawarkan sesuatu yang baru:',options:['a. Saya cenderung menolaknya','b. Saya akan mencobanya tetapi tidak menjamin keberhasilannya','c. Saya langsung ikut serta dan melakukan hingga mencapai keberhasilan']},
      {type:'choice',text:'12. Slogan yang paling sesuai dengan diri saya:',options:['a. Lakukan sekarang atau tidak sama sekali','b. Nikmati hidup ini bersama teman selagi masih muda','c. Pertimbangkan dulu masak-masak baru mengambil langkah']},
      {type:'choice',text:'13. Orang yang bertanggung jawab terhadap kemajuan diri saya adalah:',options:['a. Lingkungan dan diri saya','b. Lingkungan saya (keluarga, saudara, teman)','c. Sepenuhnya diri saya']},
      {type:'choice',text:'14. Saya termotivasi untuk melakukan sesuatu jika:',options:['a. Saya merasa mampu','b. Saya telah mengevaluasi kemampuan saya','c. Walaupun merasa tidak mampu, saya tetap akan melakukannya']},
      {type:'choice',text:'15. Kebanyakan waktu luang, saya gunakan untuk:',options:['a. Membaca buku','b. Menghadiri seminar/pelatihan dan mengikuti kegiatan di luar','c. Kumpul bersama teman']},
    ];
  },
  score(answers) {
    // Scoring key: each Q has a=X, b=Y, c=Z mapping to Q/Ca/Cl
    const keys = [
      ['Q','Ca','Cl'], // Q1: a=Q, b=Ca, c=Cl
      ['Q','Cl','Ca'], // Q2
      ['Cl','Ca','Q'], // Q3: a=Cl, b=Ca, c=Q
      ['Ca','Q','Cl'], // Q4
      ['Ca','Q','Cl'], // Q5
      ['Cl','Q','Ca'], // Q6
      ['Ca','Cl','Q'], // Q7
      ['Ca','Ca','Cl'], // Q8: a=Ca(sat), b=Ca, c=Cl
      ['Cl','Q','Ca'], // Q9
      ['Cl','Ca','Ca'], // Q10
      ['Q','Ca','Cl'], // Q11
      ['Cl','Ca','Ca'], // Q12
      ['Ca','Q','Cl'], // Q13
      ['Ca','Ca','Cl'], // Q14
      ['Ca','Cl','Q'], // Q15
    ];
    let Q=0, Ca=0, Cl=0;
    Object.entries(answers).forEach(([idx, val]) => {
      const key = keys[parseInt(idx)];
      if (key) { const type = key[val]; if (type==='Q') Q++; else if (type==='Ca') Ca++; else if (type==='Cl') Cl++; }
    });
    const max = Math.max(Q, Ca, Cl);
    let type, typeEn, desc;
    if (Cl === max) {
      type = 'CLIMBER'; typeEn = 'Climber';
      desc = 'Seseorang yang seumur hidup membaktikan dirinya pada pendakian. Climber tidak mudah menyerah, selalu berusaha menyelesaikan masalah, dan pantang menyerah.';
    } else if (Ca === max) {
      type = 'CAMPER'; typeEn = 'Camper';
      desc = 'Seseorang yang mau berusaha mendaki namun berhenti pada satu titik tertentu. Camper puas ketika mencapai suatu tahapan, cukup puas dengan kondisi yang ada.';
    } else {
      type = 'QUITTER'; typeEn = 'Quitter';
      desc = 'Seseorang yang memilih keluar dari tantangan kehidupan. Quitter tidak mau berjuang, menghindari kesulitan, dan mudah menyerah.';
    }
    return { score: `Q:${Q} Ca:${Ca} Cl:${Cl}`, Q, Ca, Cl, type, typeEn, desc, interpretation: `Tipe AQ: ${type}` };
  },
  renderResult(r) {
    const colors = {CLIMBER:'var(--secondary)', CAMPER:'var(--primary)', QUITTER:'var(--danger)'};
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#064e3b,${colors[r.type]||'#1a56db'})">
        <div style="font-size:.9rem;opacity:.8">Adversity Quotient Type</div>
        <div class="result-type">${r.type}</div>
        <div class="result-score">${r.score}</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        <p style="line-height:1.6">${r.desc}</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-top:1rem">
          ${[['⛺','Quitter','Q',r.Q,'var(--danger)','#fee2e2'],['🏕','Camper','Ca',r.Ca,'var(--primary)','#dbeafe'],['⛰','Climber','Cl',r.Cl,'var(--secondary)','#d1fae5']].map(([icon,name,code,score,color,bg]) => `
            <div style="background:${bg};border-radius:8px;padding:1rem;text-align:center;border:3px solid ${r.type.startsWith(name.toUpperCase())?color:'transparent'}">
              <div style="font-size:2rem">${icon}</div>
              <div style="font-weight:800;color:${color};font-size:1.1rem">${name}</div>
              <div style="font-size:1.5rem;font-weight:800;color:${color}">${score}</div>
            </div>
          `).join('')}
        </div>
      </div></div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 5. MBTI — Myers-Briggs Type Indicator
// ═══════════════════════════════════════════════════
{
  id: 'mbti', name: 'MBTI (Myers-Briggs Type Indicator)',
  category: 'personality', icon: '🧭',
  items: 70, timeLimit: null, autoScore: true,
  desc: '16-type personality classification: E/I, S/N, T/F, J/P dimensions',
  descId: 'Klasifikasi kepribadian 16 tipe: dimensi E/I, S/N, T/F, J/P',
  getQuestions() {
    // MBTI: 70 items, A=dimension1, B=dimension2
    // Dimensions: E/I(1-21), S/N(22-42), T/F(43-56), J/P(57-70)
    const items = [
      // E/I items (a=E, b=I)
      {a:'Bergaul dengan banyak orang termasuk yang baru dikenal',b:'Bergaul dengan beberapa orang yang telah dikenal saja'},
      {a:'Realistik',b:'Spekulatif'},
      {a:'Tenggelam dalam mengandai-andai adalah hal yang buruk',b:'Terlanjur basah kerepotan di tengah jalan adalah hal yang buruk'},
      {a:'Prinsip',b:'Perasaan'},
      {a:'Argumen logis lebih meyakinkan',b:'Argumen emotif (feeling) lebih meyakinkan'},
      {a:'Bekerja menggunakan batas waktu',b:'Bekerja kapan-kapan saja'},
      {a:'Memilih secara berhati-hati',b:'Memilih secara spontan'},
      {a:'Tinggal sampai pesta berakhir dengan semakin segar',b:'Meninggalkan pesta lebih cepat dengan kondisi capai'},
      {a:'Lebih banyak menggunakan akal sehat',b:'Imajinatif'},
      {a:'Lebih tertarik pada apa yang aktual',b:'Lebih tertarik pada apa yang mungkin'},
      {a:'Memutuskan berdasarkan hukum daripada situasi',b:'Memutuskan berdasarkan situasi daripada hukum'},
      {a:'Tidak melibatkan perasaan dan menjaga jarak saat mendekati orang',b:'Melibatkan diri secara pribadi saat mendekati orang'},
      {a:'Tepat waktu',b:'Santai'},
      {a:'Terganggu oleh hal yang tidak terselesaikan',b:'Terganggu oleh hal yang sudah terselesaikan'},
      {a:'Mengetahui kejadian yang dialami orang lain',b:'Biasanya ketinggalan berita'},
      {a:'Mengerjakan dengan cara lazim',b:'Mengerjakan dengan cara sendiri'},
      {a:'Memilih penulis dengan kata-kata arti sebenarnya',b:'Memilih penulis yang menggunakan kiasan'},
      {a:'Konsisten dengan pemikiran/ide sendiri lebih penting',b:'Menjaga keharmonisan hubungan sosial lebih penting'},
      {a:'Membuat keputusan logis',b:'Membuat keputusan berdasar nilai-nilai'},
      {a:'Menyukai segala hal terselesaikan',b:'Membiarkan berbagai pilihan dengan berbagai kemungkinan'},
      {a:'Tegas, saklek, keras pendirian',b:'Santai, bisa menyesuaikan pendirian (easy-going)'},
      // S/N items (a=S, b=N)
      {a:'Langsung berbicara di telepon',b:'Menyusun dulu kata-kata yang diucapkan'},
      {a:'Fakta menggambarkan apa yang terjadi',b:'Fakta biasanya perlu diinterpretasi'},
      {a:'Bekerja dengan informasi praktis',b:'Bekerja dengan ide-ide abstrak'},
      {a:'Berpikiran jernih',b:'Berperasaan hangat'},
      {a:'Menjadi adil daripada pemaaf',b:'Menjadi pemaaf daripada adil'},
      {a:'Pengalaman harus direncanakan dan berdasarkan pilihan',b:'Pengalaman biarlah berjalan dengan sendirinya'},
      {a:'Langsung beli/dipesankan',b:'Mempunyai pilihan-pilihan'},
      {a:'Memulai pembicaraan dalam pertemuan',b:'Menunggu untuk ditanya dalam pertemuan'},
      {a:'Akal sehat gaya tradisional bisa dipercaya',b:'Akal sehat gaya tradisional sering menimbulkan salah tafsir'},
      {a:'Anak-anak tidak cukup sering melakukan kegiatan bermanfaat',b:'Anak-anak tidak cukup berfantasi'},
      {a:'Mempertahankan prinsip',b:'Bersikap simpatik'},
      {a:'Lebih bersikap tegas daripada lemah lembut',b:'Lebih lemah lembut daripada tegas'},
      {a:'Menjaga hal-hal agar terorganisasi',b:'Menjaga hal-hal agar terbuka untuk kemungkinan'},
      {a:'Menghargai sesuatu yang pasti',b:'Menghargai sesuatu yang berubah-ubah'},
      {a:'Interaksi baru menggugah semangat',b:'Interaksi baru menguras tenaga'},
      {a:'Menggambarkan diri sebagai orang praktis',b:'Menggambarkan diri sebagai orang teoritis'},
      {a:'Melihat orang dari bagaimana kemanfaatannya',b:'Melihat orang dari bagaimana kelihatannya'},
      {a:'Mendiskusikan suatu topik sampai tuntas',b:'Mencapai kesepakatan tentang permasalahan'},
      {a:'Lebih banyak menggunakan pemikiran',b:'Lebih banyak menggunakan perasaan'},
      {a:'Nyaman dengan pekerjaan berdasarkan kontrak',b:'Nyaman dengan pekerjaan tidak terikat'},
      // T/F items (a=T, b=F)
      {a:'Rapi dan teratur',b:'Tergantung situasi'},
      {a:'Banyak teman dengan hubungan singkat',b:'Beberapa teman dengan hubungan lama'},
      {a:'Beranjak pada fakta-fakta',b:'Beranjak pada kaidah-kaidah'},
      {a:'Tertarik pada produksi dan distribusi',b:'Tertarik pada perencana dan penelitian'},
      {a:'Orang yang sangat logis patut dipuji',b:'Orang yang sangat sentimentil patut dipuji'},
      {a:'Menghargai diri karena berpendirian teguh',b:'Menghargai diri karena penuh pengabdian'},
      {a:'Membaca buku lebih berguna daripada menonton film',b:'Menonton film lebih menyenangkan daripada membaca buku'},
      {a:'Lebih suka bekerja sama dengan orang yang efisien',b:'Lebih suka bekerja dengan orang yang tulus'},
      {a:'Berada di antara orang banyak tidak terlalu melelahkan',b:'Berada di antara orang banyak sangat melelahkan'},
      {a:'Faktual adalah kata yang paling menggambarkan saya',b:'Sentimentil adalah kata yang paling menggambarkan saya'},
      {a:'Menganggap meninggalkan rencana itu menjengkelkan',b:'Menganggap meninggalkan rencana itu menyenangkan'},
      {a:'Lebih suka bergaul dengan orang yang terkenal',b:'Lebih suka bergaul dengan orang biasa'},
      {a:'Lebih suka berbicara daripada mendengarkan',b:'Lebih suka mendengarkan daripada berbicara'},
      {a:'Tidak suka pekerjaan rutin',b:'Suka pekerjaan rutin'},
      // J/P items (a=J, b=P)
      {a:'Orang mudah datang kepada saya untuk minta saran',b:'Orang jarang meminta saran kepada saya'},
      {a:'Lebih suka membuat aturan daripada mengikutinya',b:'Lebih suka mengikuti aturan daripada membuatnya'},
      {a:'Saya orang yang lebih banyak mengambil inisiatif',b:'Saya orang yang lebih banyak mengikuti'},
      {a:'Sangat menghargai keadilan',b:'Sangat menghargai kesetiaan'},
      {a:'Tidak terlalu dipengaruhi perasaan sendiri',b:'Sangat dipengaruhi perasaan sendiri'},
      {a:'Lebih suka bekerja keras secara terencana',b:'Lebih suka bekerja pada momen yang tepat'},
      {a:'Ketika orang marah kepada saya, saya bisa mengerti alasannya',b:'Ketika orang marah, saya sulit mengerti alasannya'},
      {a:'Lebih sering menjadi orang yang memperkenalkan',b:'Lebih sering diperkenalkan oleh orang lain'},
      {a:'Menyimpan barang di tempat yang tetap',b:'Menaruh barang di berbagai tempat'},
      {a:'Menyukai perubahan berencana',b:'Menyukai perubahan spontan'},
      {a:'Bersikap tegas ketika membuat penilaian',b:'Sulit bersikap tegas ketika membuat penilaian'},
    ];
    return items.map(item => ({ type:'choice', text: item.a + ' ATAU ' + item.b, a: item.a, b: item.b, options: ['A: ' + item.a, 'B: ' + item.b] }));
  },
  score(answers) {
    let E=0,I=0,S=0,N=0,T=0,F=0,J=0,P=0;
    Object.entries(answers).forEach(([idx, val]) => {
      const i = parseInt(idx);
      if (i < 21) { if (val===0) E++; else I++; }
      else if (i < 41) { if (val===0) S++; else N++; }
      else if (i < 55) { if (val===0) T++; else F++; }
      else { if (val===0) J++; else P++; }
    });
    const type = (E>=I?'E':'I')+(S>=N?'S':'N')+(T>=F?'T':'F')+(J>=P?'J':'P');
    const descriptions = {
      ISTJ:'Inspektur — Bertanggung jawab, terorganisasi, dan dapat diandalkan. Menghargai tradisi dan loyalitas.',
      ISFJ:'Pelindung — Hangat, berkomitmen, dan selalu siap membantu. Setia dan perhatian terhadap detail.',
      INFJ:'Konselor — Visioner, intuitif, dan idealis. Peduli terhadap orang lain dan mencari makna lebih dalam.',
      INTJ:'Arsitek — Strategis, mandiri, dan berpendirian kuat. Pemikir analitis dengan visi jangka panjang.',
      ISTP:'Kraf — Praktis, taktis, dan tenang dalam krisis. Ahli dalam memahami cara kerja sesuatu.',
      ISFP:'Seniman — Fleksibel, toleran, dan sensitif. Menghargai kebebasan dan berkomitmen pada nilai-nilainya.',
      INFP:'Penyembuh — Idealis, empatik, dan penuh kasih. Termotivasi oleh nilai-nilai pribadi yang kuat.',
      INTP:'Pemikir — Logis, analitis, dan objektif. Menikmati teori dan mencari prinsip-prinsip mendasar.',
      ESTP:'Promotor — Pragmatis, tegas, dan berorientasi pada hasil. Hidup di saat ini dan menyukai tindakan.',
      ESFP:'Performer — Spontan, energetik, dan antusias. Menikmati orang dan pengalaman baru.',
      ENFP:'Juara — Antusias, kreatif, dan bermotivasi tinggi. Terinspirasi oleh kemungkinan-kemungkinan baru.',
      ENTP:'Visioner — Cerdas, ingin tahu, dan menyukai debat intelektual. Pandai menghasilkan ide-ide inovatif.',
      ESTJ:'Eksekutif — Praktis, terorganisasi, dan tegas. Ahli dalam mengelola orang dan proyek.',
      ESFJ:'Penyedia — Hangat, kooperatif, dan setia. Sangat perhatian terhadap kebutuhan orang lain.',
      ENFJ:'Guru — Karismatik, empatik, dan berbakat memimpin. Mendorong pertumbuhan pada orang lain.',
      ENTJ:'Komandan — Tegas, terorganisasi, dan berorientasi pada pencapaian. Pemimpin alami yang strategis.',
    };
    return { type, E,I,S,N,T,F,J,P, description: descriptions[type]||'', interpretation: `Tipe MBTI: ${type}` };
  },
  renderResult(r) {
    const dims = [
      {l:'E',r:'I',lv:r.E,rv:r.I,ldesc:'Extroversion','rdesc':'Introversion',color:'#1d4ed8'},
      {l:'S',r:'N',lv:r.S,rv:r.N,ldesc:'Sensing',rdesc:'iNtuition',color:'#065f46'},
      {l:'T',r:'F',lv:r.T,rv:r.F,ldesc:'Thinking',rdesc:'Feeling',color:'#9d174d'},
      {l:'J',r:'P',lv:r.J,rv:r.P,ldesc:'Judging',rdesc:'Perceiving',color:'#92400e'},
    ];
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#312e81,#1a56db)">
        <div style="font-size:.9rem;opacity:.8">MBTI Personality Type</div>
        <div class="result-type" style="font-size:3rem;letter-spacing:.1em">${r.type}</div>
        <div class="result-score">${r.description.split(' — ')[0]}</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        <p style="line-height:1.6;margin-bottom:1rem">${r.description}</p>
        ${dims.map(d => {
          const total = d.lv + d.rv || 1;
          const pct = Math.round(d.lv / total * 100);
          return `
            <div style="margin-bottom:.75rem">
              <div style="display:flex;justify-content:space-between;font-size:.82rem;font-weight:700;margin-bottom:.3rem">
                <span style="color:${d.color}">${d.l} (${d.ldesc}) — ${d.lv}</span>
                <span>${d.r} (${d.rdesc}) — ${d.rv}</span>
              </div>
              <div class="scale-bar"><div class="scale-bar-fill" style="width:${pct}%;background:${d.color}"></div></div>
            </div>
          `;
        }).join('')}
      </div></div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 6. BFI — Big Five Inventory
// ═══════════════════════════════════════════════════
{
  id: 'bfi', name: 'BFI (Big Five Inventory)',
  category: 'personality', icon: '⭐',
  items: 44, timeLimit: null, autoScore: true,
  desc: 'Measures 5 major personality traits: OCEAN model',
  descId: 'Mengukur 5 dimensi kepribadian utama: model OCEAN',
  getQuestions() {
    // BFI-44 items - scoring: items 2,6,8,9,12,18,21,23,24,27,31,34,35,37,41,43 are reversed
    const reversed = new Set([1,5,7,8,11,17,20,22,23,26,30,33,34,36,40,42]); // 0-indexed
    const texts = [
      'Saya melihat diri saya sebagai orang yang cerewet, banyak ngobrol',
      'Saya melihat diri saya sebagai orang yang cenderung mencari-cari kesalahan pada orang lain',
      'Saya melihat diri saya sebagai orang yang melakukan pekerjaan dengan teliti',
      'Saya melihat diri saya sebagai orang yang murung, sering sedih',
      'Saya melihat diri saya sebagai orang yang orisinil, penuh ide baru',
      'Saya melihat diri saya sebagai orang yang pendiam',
      'Saya melihat diri saya sebagai orang yang suka menolong, tidak egois pada orang lain',
      'Saya melihat diri saya sebagai orang yang bisa ceroboh',
      'Saya melihat diri saya sebagai orang yang santai, menangani stress dengan baik',
      'Saya melihat diri saya sebagai orang yang ingin tahu banyak hal',
      'Saya melihat diri saya sebagai orang yang penuh dengan energi',
      'Saya melihat diri saya sebagai orang yang sering memulai pertengkaran',
      'Saya melihat diri saya sebagai orang yang dapat dipercaya',
      'Saya melihat diri saya sebagai orang yang bisa tegang / sering cemas',
      'Saya melihat diri saya sebagai orang yang cerdas, penuh refleksi diri, pemikir',
      'Saya melihat diri saya sebagai orang yang dapat membangkitkan antusiasme',
      'Saya melihat diri saya sebagai orang yang memaafkan orang lain',
      'Saya melihat diri saya sebagai orang yang cenderung tidak teratur',
      'Saya melihat diri saya sebagai orang yang banyak khawatir',
      'Saya melihat diri saya sebagai orang yang memiliki imajinasi tinggi',
      'Saya melihat diri saya sebagai orang yang umumnya pendiam dan pemalu',
      'Saya melihat diri saya sebagai orang yang umumnya dapat mempercayai orang lain',
      'Saya melihat diri saya sebagai orang yang cenderung malas',
      'Saya melihat diri saya sebagai orang yang emosinya stabil, tidak mudah sedih',
      'Saya melihat diri saya sebagai orang yang inovatif, orang yang bisa diandalkan',
      'Saya melihat diri saya sebagai orang yang memiliki kepribadian yang tegas',
      'Saya melihat diri saya sebagai orang yang bisa bersikap dingin dan menjaga jarak',
      'Saya melihat diri saya sebagai orang yang berkomitmen sampai selesai',
      'Saya melihat diri saya sebagai orang yang bisa berubah-ubah suasana hatinya',
      'Saya melihat diri saya sebagai orang yang menghargai pengalaman artistik dan estetika',
      'Saya melihat diri saya sebagai orang yang terkadang malu-malu dan tertutup',
      'Saya melihat diri saya sebagai orang yang perhatian dan baik terhadap hampir semua orang',
      'Saya melihat diri saya sebagai orang yang melakukan hal-hal efisien',
      'Saya melihat diri saya sebagai orang yang tetap tenang dalam situasi tegang',
      'Saya melihat diri saya sebagai orang yang lebih suka pekerjaan rutin',
      'Saya melihat diri saya sebagai orang yang terbuka dan supel (extrovert)',
      'Saya melihat diri saya sebagai orang yang terkadang tidak ramah pada orang lain',
      'Saya melihat diri saya sebagai orang yang membuat rencana dan melaksanakannya',
      'Saya melihat diri saya sebagai orang yang mudah gugup',
      'Saya melihat diri saya sebagai orang yang suka merenung dan bermain dengan ide-ide',
      'Saya melihat diri saya sebagai orang yang memiliki sedikit minat terhadap seni',
      'Saya melihat diri saya sebagai orang yang suka bekerja sama dengan orang lain',
      'Saya melihat diri saya sebagai orang yang mudah terdistraksi',
      'Saya melihat diri saya sebagai orang yang memiliki kecerdasan artistik yang baik',
    ];
    return texts.map((text, i) => ({
      type: 'likert',
      text: `${i+1}. ${text}`,
      options: ['Sangat Tidak Setuju (1)','Tidak Setuju (2)','Netral (3)','Setuju (4)','Sangat Setuju (5)'],
      reversed: reversed.has(i)
    }));
  },
  score(answers) {
    const qs = this.getQuestions();
    // E: items 1,6,11,16,21,26,31,36 (0-indexed: 0,5,10,15,20,25,30,35)
    // A: 2,7,12,17,22,27,32,37,42 (1,6,11,16,21,26,31,36,41)
    // C: 3,8,13,18,23,28,33,38,43 (2,7,12,17,22,27,32,37,42)
    // N: 4,9,14,19,24,29,34,39 (3,8,13,18,23,28,33,38)
    // O: 5,10,15,20,25,30,35,40,41,44 (4,9,14,19,24,29,34,39,40,43)
    const dims = {
      E: [0,5,10,15,20,25,30,35],
      A: [1,6,11,16,21,26,31,36,41],
      C: [2,7,12,17,22,27,32,37,42],
      N: [3,8,13,18,23,28,33,38],
      O: [4,9,14,19,24,29,34,39,40,43]
    };
    const scores = {};
    Object.entries(dims).forEach(([dim, indices]) => {
      let sum = 0, count = 0;
      indices.forEach(idx => {
        if (answers[idx] !== undefined) {
          const raw = answers[idx]; // 0-4, we need 1-5
          const val = raw + 1;
          const q = qs[idx];
          sum += q?.reversed ? (6 - val) : val;
          count++;
        }
      });
      scores[dim] = count > 0 ? Math.round(sum / count * 100 / 5) : 0;
    });

    const level = v => v >= 67 ? 'Tinggi' : v >= 34 ? 'Sedang' : 'Rendah';
    return {
      E: scores.E, A: scores.A, C: scores.C, N: scores.N, O: scores.O,
      type: `E:${level(scores.E)} A:${level(scores.A)} C:${level(scores.C)} N:${level(scores.N)} O:${level(scores.O)}`,
      interpretation: 'Big Five Profile',
      levels: { E: level(scores.E), A: level(scores.A), C: level(scores.C), N: level(scores.N), O: level(scores.O) }
    };
  },
  renderResult(r) {
    const dims = [
      {code:'E', name:'Extraversion', desc:r.levels?.E==='Tinggi'?'Motivasi tinggi bergaul, dominan dalam lingkungan':r.levels?.E==='Rendah'?'Cenderung tenang dan menarik diri':'Tidak terlalu menonjol dalam pergaulan'},
      {code:'A', name:'Agreeableness', desc:r.levels?.A==='Tinggi'?'Ramah, menghindari konflik, cenderung mengikuti orang lain':r.levels?.A==='Rendah'?'Cenderung agresif dan kurang kooperatif':'Tidak terlalu agresif namun tidak selalu mengalah'},
      {code:'C', name:'Conscientiousness', desc:r.levels?.C==='Tinggi'?'Berpikir sebelum bertindak, terencana, terorganisir':r.levels?.C==='Rendah'?'Ceroboh dan tidak terarah':'Terkadang ceroboh namun dapat mengikuti peraturan'},
      {code:'N', name:'Neuroticism', desc:r.levels?.N==='Tinggi'?'Kesulitan menjalin hubungan, self-esteem rendah':r.levels?.N==='Rendah'?'Cenderung lebih gembira dan puas':'Dapat mengendalikan diri meskipun cemas'},
      {code:'O', name:'Openness', desc:r.levels?.O==='Tinggi'?'Toleran, kapasitas tinggi menyerap informasi, waspada':r.levels?.O==='Rendah'?'Pemikiran sempit, konservatif':'Pemikiran cukup terbuka'},
    ];
    const colors = ['#1d4ed8','#065f46','#9d174d','#92400e','#5b21b6'];
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#312e81,#4f46e5)">
        <div style="font-size:.9rem;opacity:.8">Big Five Inventory — OCEAN</div>
        <div class="result-type" style="font-size:1.5rem">${Object.entries(r.levels||{}).map(([k,v])=>k+'='+v[0]).join(' · ')}</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        ${dims.map((d,i) => `
          <div style="margin-bottom:1rem">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem">
              <span class="font-bold" style="color:${colors[i]}">${d.code} — ${d.name}</span>
              <span class="pill" style="background:${r[d.code]>=67?'#d1fae5':r[d.code]>=34?'#dbeafe':'#fee2e2'};color:${colors[i]}">${r.levels?.[d.code]} (${r[d.code]}%)</span>
            </div>
            <div class="scale-bar"><div class="scale-bar-fill" style="width:${r[d.code]}%;background:${colors[i]}"></div></div>
            <div style="font-size:.8rem;color:var(--text2);margin-top:.3rem">${d.desc}</div>
          </div>
        `).join('')}
      </div></div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 7. MSDT — Management Style Diagnostic Test
// ═══════════════════════════════════════════════════
{
  id: 'msdt', name: 'MSDT (Management Style Diagnostic Test)',
  category: 'leadership', icon: '👔',
  items: 64, timeLimit: null, autoScore: true,
  desc: 'Identifies management/leadership style: 8 subscales, quadrant-based',
  descId: 'Mengidentifikasi gaya manajemen: 8 subscale, berbasis kuadran',
  getQuestions() {
    // 64 paired questions, each answered A or B
    // Sample items extracted from MSDT-FIX
    const items = [];
    const prompts = [
      ['Saya mendelegasikan wewenang kepada bawahan','Saya mempertahankan kontrol yang ketat'],
      ['Saya menekankan pencapaian hasil','Saya menekankan proses yang baik'],
      ['Saya mendorong inovasi dan kreativitas','Saya lebih suka cara-cara yang sudah terbukti'],
      ['Saya fokus pada hubungan antar manusia','Saya fokus pada tugas dan hasil'],
      ['Saya mengambil keputusan secara mandiri','Saya melibatkan tim dalam pengambilan keputusan'],
      ['Saya menetapkan tujuan yang tinggi','Saya menetapkan tujuan yang realistis'],
      ['Saya memberikan kebebasan bekerja kepada tim','Saya memberikan arahan yang jelas kepada tim'],
      ['Saya memprioritaskan efisiensi','Saya memprioritaskan efektivitas'],
    ];
    for (let i = 0; i < 64; i++) {
      const p = prompts[i % prompts.length];
      items.push({ type:'choice', text:`${i+1}. Pilih pernyataan yang paling mencerminkan gaya Anda:`, options:['A: ' + p[0], 'B: ' + p[1]], a: p[0], b: p[1] });
    }
    return items;
  },
  score(answers) {
    // 8 subscales: Ds,Mi,Au,Co,Bu,Dv,Ba,E
    // Items per subscale (8 items each)
    const subscales = ['Ds','Mi','Au','Co','Bu','Dv','Ba','E'];
    const scores = {};
    subscales.forEach((s, si) => {
      let count = 0;
      for (let i = 0; i < 8; i++) {
        const idx = si * 8 + i;
        if (answers[idx] === 0) count++; // A counts for the subscale
      }
      scores[s] = count;
    });
    // Quadrant: TO (Task-Oriented), RO (Relationship-Oriented), E (Entrepreneurial), O (Balanced)
    const taskScore = (scores.Ds||0) + (scores.Au||0) + (scores.Bu||0) + (scores.Co||0);
    const relScore = (scores.Mi||0) + (scores.Dv||0) + (scores.Ba||0) + (scores.E||0);
    let type, typeEn;
    if (taskScore > relScore + 4) { type = 'Autocrat'; typeEn = 'Autocrat'; }
    else if (relScore > taskScore + 4) { type = 'Developer'; typeEn = 'Developer'; }
    else if (taskScore > 20 && relScore > 20) { type = 'Executive'; typeEn = 'Executive'; }
    else if (taskScore < 10 && relScore < 10) { type = 'Deserter'; typeEn = 'Deserter'; }
    else { type = 'Compromiser'; typeEn = 'Compromiser'; }
    return { type, scores, taskScore, relScore, interpretation: `MSDT Type: ${type}` };
  },
  renderResult(r) {
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#4c1d95,#5b21b6)">
        <div style="font-size:.9rem;opacity:.8">Management Style</div>
        <div class="result-type">${r.type}</div>
        <div class="result-score">Task: ${r.taskScore} · Relationship: ${r.relScore}</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        <div class="scale-bar-wrap">
          ${Object.entries(r.scores).map(([s, v]) => `
            <div class="scale-bar-row">
              <div class="scale-bar-label"><span>${s}</span><span>${v}/8</span></div>
              <div class="scale-bar"><div class="scale-bar-fill" style="width:${v/8*100}%"></div></div>
            </div>
          `).join('')}
        </div>
      </div></div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 8. WPT — Wonderlic Personnel Test
// ═══════════════════════════════════════════════════
{
  id: 'wpt', name: 'WPT (Wonderlic Personnel Test)',
  category: 'intelligence', icon: '⏱',
  items: 50, timeLimit: 12, autoScore: true,
  desc: '50-item intelligence test with 12-min time limit. Proctor enters answers.',
  descId: '50 soal tes kecerdasan dengan batas waktu 12 menit. Proktor memasukkan jawaban.',
  getQuestions() {
    // WPT - questions are in physical booklet; proctor enters answers A-E
    const qs = [];
    for (let i = 1; i <= 50; i++) {
      qs.push({ type:'choice', text:`Soal ${i} — (Lihat buku soal WPT)`, options:['A','B','C','D','E'] });
    }
    return qs;
  },
  score(answers) {
    // Answer key (A=0,B=1,C=2,D=3,E=4)
    const key = [0,2,1,3,0,2,4,1,3,2,0,4,1,3,2,0,1,3,4,2,
                 1,0,3,2,4,1,3,0,2,4,1,3,2,0,4,1,2,3,0,4,
                 2,1,3,4,0,2,1,3,2,0];
    let rs = 0;
    Object.entries(answers).forEach(([idx, val]) => {
      if (parseInt(idx) < key.length && val === key[parseInt(idx)]) rs++;
    });
    // RS → IQ conversion
    const iqTable = [59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,
                     99,101,103,105,107,109,111,113,115,117,119,121,123,125,127,129,131,133,135,137,
                     139,141,143,145,146,146,146,146,146,146];
    const iq = iqTable[Math.min(rs, 49)] || 59;
    let cat;
    if (iq <= 65) cat = 'Mentally Defective';
    else if (iq <= 79) cat = 'Borderline';
    else if (iq <= 90) cat = 'Low Average';
    else if (iq <= 110) cat = 'Average';
    else if (iq <= 119) cat = 'High Average';
    else if (iq <= 127) cat = 'Superior';
    else if (iq <= 139) cat = 'Very Superior';
    else cat = 'Genius';
    return { score: rs, iq, type: `IQ ${iq}`, category: cat, interpretation: `RS: ${rs}/50 → IQ: ${iq} (${cat})` };
  },
  renderResult(r) {
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#1e3a5f,#1a56db)">
        <div style="font-size:.9rem;opacity:.8">WPT Score</div>
        <div class="result-type" style="font-size:3rem">${r.iq}</div>
        <div class="result-score">RS: ${r.score}/50 · ${r.category}</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        <div class="alert alert-info"><span>ℹ️</span><div>Waktu pengerjaan: 12 menit. Skor Mentah: ${r.score}/50 → IQ: ${r.iq}</div></div>
      </div></div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 9. DISC
// ═══════════════════════════════════════════════════
{
  id: 'disc', name: 'DISC',
  category: 'personality', icon: '🔵',
  items: 28, timeLimit: null, autoScore: true,
  desc: 'Behavioral assessment: Dominance, Influence, Steadiness, Conscientiousness',
  descId: 'Penilaian perilaku: Dominance, Influence, Steadiness, Conscientiousness',
  getQuestions() {
    const groups = [
      {most:['Dominan','Inspiratif','Teliti','Stabil'], least:['Dominan','Inspiratif','Teliti','Stabil']},
    ];
    const qs = [];
    const words = [
      ['Kuat','Inspiratif','Teliti','Stabil'],['Aman','Ramah','Menonjol','Hati-hati'],
      ['Percaya diri','Penenang','Teladan','Ceria'],['Sopan','Menurut','Setia','Tegas'],
      ['Orisinil','Suka bicara','Sopan','Sabar'],['Kuat','Pemimpin','Senang','Tepat'],
      ['Dermawan','Responsif','Diplomatis','Penyabar'],['Bertekad','Mampu','Baik hati','Sabar'],
      ['Kompetitif','Menyenangkan','Konservatif','Dapat diandalkan'],['Tegas','Ekspresif','Hati-hati','Lembut'],
      ['Produktif','Cekatan','Toleran','Penurut'],['Berani','Menginspirasi','Sistematis','Lunak hati'],
      ['Perintis','Membujuk','Setia','Seksama'],['Menggerakkan','Aktif','Pemalu','Disiplin'],
      ['Keras kepala','Mempengaruhi','Bertahan','Mempertimbangkan'],
      ['Berkemauan','Menyenangkan','Sensitif','Bekerja keras'],
      ['Percaya diri','Bersemangat','Damai','Konvensional'],
      ['Blak-blakan','Mempesona','Setia','Konservatif'],
      ['Tegas','Bicara banyak','Penyabar','Sistematis'],
      ['Pemimpin','Pandai bergaul','Lembut hati','Cermat'],
      ['Direktif','Suka bicara','Mau mendengar','Berpikir dulu'],
      ['Bertekad','Ramah','Dapat diandalkan','Hati-hati'],
      ['Memegang kendali','Menghargai orang','Bertahan','Teliti'],
      ['Tekun','Inspiratif','Setia','Seksama'],
      ['Kompetitif','Ekspresif','Toleran','Hati-hati'],
      ['Berani','Memotivasi','Penyabar','Sistematis'],
      ['Kuat berkemauan','Menawan','Tulus','Teliti'],
      ['Memerintah','Mempengaruhi','Penyabar','Konservatif'],
    ];
    words.forEach((w, i) => {
      qs.push({ type:'choice', text:`${i+1}. Kata mana yang PALING menggambarkan Anda?`, options: w.map((x,j)=>String.fromCharCode(65+j)+': '+x), cats:['D','I','S','C'] });
    });
    return qs;
  },
  score(answers) {
    let D=0,I=0,S=0,C=0;
    const qs = this.getQuestions();
    Object.entries(answers).forEach(([idx, val]) => {
      const q = qs[parseInt(idx)];
      if (q?.cats) { const cat = q.cats[val]; if(cat==='D')D++;else if(cat==='I')I++;else if(cat==='S')S++;else if(cat==='C')C++; }
    });
    const max = Math.max(D,I,S,C);
    let type = '';
    if (D===max) type='D';
    else if (I===max) type='I';
    else if (S===max) type='S';
    else type='C';
    const descs = {
      D:'Dominance — Langsung, tegas, berorientasi hasil. Menyukai tantangan dan pengambilan keputusan cepat.',
      I:'Influence — Antusias, optimis, komunikatif. Mahir membujuk dan memotivasi orang.',
      S:'Steadiness — Sabar, dapat diandalkan, tim player. Menyukai stabilitas dan konsistensi.',
      C:'Conscientiousness — Teliti, analitis, mengikuti aturan. Menjaga standar kualitas tinggi.',
    };
    return { D,I,S,C, type, description: descs[type]||'', interpretation:`DISC Type: ${type}` };
  },
  renderResult(r) {
    const cols = {D:'#991b1b',I:'#c27803',S:'#065f46',C:'#1d4ed8'};
    const total = r.D+r.I+r.S+r.C || 1;
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#1f2937,${cols[r.type]})">
        <div style="font-size:.9rem;opacity:.8">DISC Profile</div>
        <div class="result-type">${r.type}</div>
        <div class="result-score">${r.description.split(' — ')[0]}</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem;margin-top:1rem">
        ${['D','I','S','C'].map(d => `
          <div class="card" style="border:3px solid ${r.type===d?cols[d]:'var(--border)'}">
            <div class="card-body text-center">
              <div style="font-size:2rem;font-weight:800;color:${cols[d]}">${d}</div>
              <div style="font-size:1.5rem;font-weight:800">${r[d]}</div>
              <div class="scale-bar"><div class="scale-bar-fill" style="width:${r[d]/total*100}%;background:${cols[d]}"></div></div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">${r.description}</div></div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 10. Enneagram
// ═══════════════════════════════════════════════════
{
  id: 'enneagram', name: 'Enneagram',
  category: 'personality', icon: '🌟',
  items: 72, timeLimit: null, autoScore: true,
  desc: '9-type personality system measuring core motivations and fears',
  descId: 'Sistem kepribadian 9 tipe yang mengukur motivasi dan ketakutan inti',
  getQuestions() {
    // 72 statements, 8 per type, rate 1-5
    const types = ['Reformer','Helper','Achiever','Individualist','Investigator','Loyalist','Enthusiast','Challenger','Peacemaker'];
    const stmts = [
      // Type 1 - Reformer
      ['Saya selalu berusaha untuk menjadi sempurna dalam segala hal','Saya sangat memperhatikan kesalahan dan berusaha memperbaikinya','Saya memiliki standar moral yang sangat tinggi','Saya sering merasa bertanggung jawab untuk membuat hal-hal menjadi lebih baik','Saya cenderung kritis terhadap diri sendiri maupun orang lain','Saya sulit menerima ketidaksempurnaan','Saya percaya bahwa ada cara yang benar dalam melakukan sesuatu','Saya sangat disiplin dan terorganisir'],
      // Type 2 - Helper
      ['Saya senang membantu orang lain dan merasa dibutuhkan','Saya seringkali mendahulukan kebutuhan orang lain dibanding diri sendiri','Saya mudah memahami apa yang dibutuhkan orang lain','Saya merasa tidak nyaman ketika tidak dibutuhkan','Saya sering memberikan bantuan tanpa diminta','Hubungan dengan orang lain sangat penting bagi saya','Saya merasa bahagia ketika dapat membuat orang lain bahagia','Saya bisa terlalu mudah memberikan diri saya kepada orang lain'],
      // Type 3 - Achiever
      ['Saya sangat termotivasi untuk mencapai kesuksesan','Saya sangat peduli dengan bagaimana orang lain memandang saya','Saya bekerja keras untuk mendapatkan pengakuan','Saya dapat dengan mudah menyesuaikan diri untuk mencapai tujuan saya','Produktivitas dan efisiensi sangat penting bagi saya','Saya sering mendefinisikan diri saya melalui pencapaian saya','Saya dapat menjadi terlalu fokus pada hasil','Saya suka menetapkan dan mencapai tujuan yang menantang'],
      // Type 4 - Individualist
      ['Saya sering merasa berbeda dari orang lain','Saya memiliki perasaan dan emosi yang sangat kuat','Saya mencari pengalaman yang bermakna dan autentik','Saya sering merindukan apa yang saya tidak miliki','Ekspresi diri adalah sangat penting bagi saya','Saya bisa sangat sensitif terhadap kritik','Saya sering berintrospeksi dan merenungkan identitas saya','Saya memiliki selera estetika yang kuat'],
      // Type 5 - Investigator
      ['Saya sangat suka mengumpulkan pengetahuan dan informasi','Saya cenderung untuk mengamati sebelum berpartisipasi','Saya sangat menghargai privasi dan waktu sendiri','Saya sering merasa terkuras oleh interaksi sosial yang berlebihan','Saya lebih nyaman dengan ide-ide daripada emosi','Saya mempersiapkan diri dengan sangat teliti sebelum bertindak','Saya bisa sangat berhemat dalam sumber daya, termasuk energi emosional','Saya sangat mandiri dan tidak suka bergantung pada orang lain'],
      // Type 6 - Loyalist
      ['Saya sangat setia kepada orang-orang dan kelompok yang saya percaya','Saya sering memikirkan skenario terburuk yang bisa terjadi','Saya mencari keamanan dan dukungan dari orang yang saya percaya','Saya sangat memperhatikan potensi bahaya atau ancaman','Saya sering mempertanyakan motif orang lain','Saya sulit mempercayai orang yang belum saya kenal dengan baik','Saya merasa lebih aman ketika ada aturan dan prosedur yang jelas','Saya bisa sangat ragu-ragu dalam mengambil keputusan'],
      // Type 7 - Enthusiast
      ['Saya selalu mencari pengalaman baru dan menyenangkan','Saya sangat optimis dan melihat kemungkinan di mana-mana','Saya sulit untuk tetap fokus pada satu hal dalam jangka waktu lama','Saya cenderung untuk menghindari rasa sakit dan ketidaknyamanan','Saya sangat spontan dan suka petualangan','Saya memiliki banyak minat dan proyek yang berbeda','Saya mudah merasa bosan dengan rutinitas','Saya cenderung untuk merencanakan banyak hal menyenangkan di masa depan'],
      // Type 8 - Challenger
      ['Saya sangat suka memegang kendali dan kekuatan','Saya langsung dan terus terang dalam mengekspresikan pendapat saya','Saya melindungi orang-orang yang saya sayangi dengan sepenuh hati','Saya sangat mandiri dan tidak suka dikendalikan','Saya bisa sangat intens dan mendominasi','Saya tidak takut konfrontasi','Saya memiliki energi yang besar dan semangat yang kuat','Saya sangat menghargai keadilan dan kejujuran'],
      // Type 9 - Peacemaker
      ['Saya sangat ingin menjaga kedamaian dan harmoni','Saya sering menyetujui pendapat orang lain untuk menghindari konflik','Saya mudah melihat berbagai sudut pandang','Saya bisa sangat lambat dalam mengambil tindakan','Saya cenderung untuk menyesuaikan diri dengan apa yang diinginkan orang lain','Ketenangan dan kenyamanan sangat penting bagi saya','Saya bisa terlalu mudah terdistraksi dari prioritas saya','Saya sulit untuk mengatakan tidak kepada orang lain'],
    ];
    const qs = [];
    types.forEach((type, ti) => {
      stmts[ti].forEach((stmt, si) => {
        qs.push({ type:'likert', text:`${ti*8+si+1}. ${stmt}`, typeIdx: ti, options:['Sangat Tidak Setuju (1)','Tidak Setuju (2)','Ragu-ragu (3)','Setuju (4)','Sangat Setuju (5)'] });
      });
    });
    return qs;
  },
  score(answers) {
    const qs = this.getQuestions();
    const scores = Array(9).fill(0);
    const counts = Array(9).fill(0);
    Object.entries(answers).forEach(([idx, val]) => {
      const q = qs[parseInt(idx)];
      if (q) { scores[q.typeIdx] += (val + 1); counts[q.typeIdx]++; }
    });
    const avgs = scores.map((s, i) => counts[i] > 0 ? s / counts[i] : 0);
    const maxVal = Math.max(...avgs);
    const typeIdx = avgs.indexOf(maxVal);
    const names = ['Reformer (The Perfectionist)','Helper (The Giver)','Achiever (The Performer)',
                   'Individualist (The Romantic)','Investigator (The Observer)',
                   'Loyalist (The Skeptic)','Enthusiast (The Epicure)',
                   'Challenger (The Boss)','Peacemaker (The Mediator)'];
    return { typeIdx: typeIdx + 1, type: `Type ${typeIdx + 1}: ${names[typeIdx]}`, scores: avgs, name: names[typeIdx], interpretation: names[typeIdx] };
  },
  renderResult(r) {
    const names = ['Reformer','Helper','Achiever','Individualist','Investigator','Loyalist','Enthusiast','Challenger','Peacemaker'];
    const colors = ['#1d4ed8','#065f46','#92400e','#9d174d','#5b21b6','#1e40af','#b45309','#991b1b','#374151'];
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#1f2937,${colors[r.typeIdx-1]})">
        <div style="font-size:.9rem;opacity:.8">Enneagram Type</div>
        <div class="result-type">Type ${r.typeIdx}</div>
        <div class="result-score">${names[r.typeIdx-1]}</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        ${r.scores.map((s,i) => `
          <div class="scale-bar-row" style="margin-bottom:.5rem">
            <div class="scale-bar-label"><span style="color:${colors[i]};font-weight:${i===r.typeIdx-1?'800':'400'}">Type ${i+1}: ${names[i]}</span><span>${s.toFixed(1)}</span></div>
            <div class="scale-bar"><div class="scale-bar-fill" style="width:${s/5*100}%;background:${i===r.typeIdx-1?colors[i]:'var(--primary)'}"></div></div>
          </div>
        `).join('')}
      </div></div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 11. Holland RIASEC
// ═══════════════════════════════════════════════════
{
  id: 'holland', name: 'Holland RIASEC',
  category: 'interest', icon: '🗺',
  items: 42, timeLimit: null, autoScore: true,
  desc: 'Maps interests to Realistic/Investigative/Artistic/Social/Enterprising/Conventional career types',
  descId: 'Memetakan minat ke tipe karier RIASEC',
  getQuestions() {
    // 42 items, 7 per type
    const items = [
      {text:'Memperbaiki peralatan mekanik',cat:'R'},{text:'Bekerja di luar ruangan',cat:'R'},
      {text:'Membangun sesuatu dengan tangan',cat:'R'},{text:'Mengoperasikan mesin',cat:'R'},
      {text:'Memotong kayu atau logam',cat:'R'},{text:'Merawat hewan',cat:'R'},{text:'Berkebun',cat:'R'},
      {text:'Memecahkan persamaan matematika',cat:'I'},{text:'Melakukan eksperimen ilmiah',cat:'I'},
      {text:'Menganalisis data',cat:'I'},{text:'Mempelajari biologi atau kimia',cat:'I'},
      {text:'Membaca jurnal ilmiah',cat:'I'},{text:'Mengembangkan teori baru',cat:'I'},{text:'Meneliti fenomena alam',cat:'I'},
      {text:'Melukis atau menggambar',cat:'A'},{text:'Bermain musik',cat:'A'},
      {text:'Menulis cerita atau puisi',cat:'A'},{text:'Mendekorasi ruangan',cat:'A'},
      {text:'Fotografi artistik',cat:'A'},{text:'Menyanyi atau berteater',cat:'A'},{text:'Membuat kerajinan',cat:'A'},
      {text:'Mengajar atau melatih',cat:'S'},{text:'Membantu orang yang kesulitan',cat:'S'},
      {text:'Bekerja sebagai konselor',cat:'S'},{text:'Menjadi sukarelawan',cat:'S'},
      {text:'Merawat orang sakit',cat:'S'},{text:'Memimpin diskusi kelompok',cat:'S'},{text:'Membimbing orang lain',cat:'S'},
      {text:'Memimpin tim atau organisasi',cat:'E'},{text:'Menjual produk atau jasa',cat:'E'},
      {text:'Mempengaruhi kebijakan',cat:'E'},{text:'Berbicara di depan umum',cat:'E'},
      {text:'Membuka bisnis sendiri',cat:'E'},{text:'Bernegosiasi',cat:'E'},{text:'Mengelola kampanye',cat:'E'},
      {text:'Mengatur file dan arsip',cat:'C'},{text:'Bekerja dengan spreadsheet',cat:'C'},
      {text:'Mengikuti prosedur yang jelas',cat:'C'},{text:'Mengerjakan pembukuan',cat:'C'},
      {text:'Mengelola jadwal',cat:'C'},{text:'Memeriksa dokumen untuk kesalahan',cat:'C'},{text:'Mengetik dan data entry',cat:'C'},
    ];
    return items.map(item => ({ type:'yn', text: item.text, cat: item.cat }));
  },
  score(answers) {
    const qs = this.getQuestions();
    const scores = {R:0,I:0,A:0,S:0,E:0,C:0};
    Object.entries(answers).forEach(([idx, val]) => {
      if (val === 1) { const cat = qs[parseInt(idx)]?.cat; if (cat) scores[cat]++; }
    });
    const sorted = Object.entries(scores).sort((a,b) => b[1]-a[1]);
    const topCode = sorted.slice(0,3).map(x=>x[0]).join('');
    const jobMap = {
      RIA:'Teknisi Multimedia, Fotografer Teknis',
      RIS:'Paramedis, Teknisi Kesehatan',
      AIE:'Manajer Seni, Produser',
      SAE:'Guru Seni, Instruktur Drama',
      ECS:'Manajer Keuangan, Direktur Administrasi',
      CSE:'Akuntan, Auditor',
    };
    return { scores, topCode, suggestedJobs: jobMap[topCode] || 'Lihat tabel karier Holland', interpretation: `Holland Code: ${topCode}` };
  },
  renderResult(r) {
    const colors = {R:'#92400e',I:'#1d4ed8',A:'#9d174d',S:'#065f46',E:'#b45309',C:'#1e40af'};
    const names = {R:'Realistic',I:'Investigative',A:'Artistic',S:'Social',E:'Enterprising',C:'Conventional'};
    const max = Math.max(...Object.values(r.scores));
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#064e3b,#065f46)">
        <div style="font-size:.9rem;opacity:.8">Holland Code (RIASEC)</div>
        <div class="result-type" style="font-size:3rem;letter-spacing:.1em">${r.topCode}</div>
        <div class="result-score">${r.suggestedJobs}</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:.5rem;margin-top:1rem">
        ${['R','I','A','S','E','C'].map(code => `
          <div class="card text-center" style="border:3px solid ${r.topCode.includes(code)?colors[code]:'var(--border)'}">
            <div class="card-body" style="padding:.75rem">
              <div style="font-size:1.5rem;font-weight:800;color:${colors[code]}">${code}</div>
              <div style="font-size:.7rem;color:var(--text2)">${names[code]}</div>
              <div style="font-size:1.3rem;font-weight:800">${r.scores[code]}</div>
              <div class="scale-bar"><div class="scale-bar-fill" style="width:${max?r.scores[code]/max*100:0}%;background:${colors[code]}"></div></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 12. Papikostik (PAPI Kostick)
// ═══════════════════════════════════════════════════
{
  id: 'papikostik', name: 'PAPI Kostick',
  category: 'work', icon: '🎯',
  items: 90, timeLimit: null, autoScore: true,
  desc: '20-scale work behavior assessment: needs and roles at work',
  descId: 'Penilaian perilaku kerja 20 skala: kebutuhan dan peran di tempat kerja',
  getQuestions() {
    // 90 paired comparison items
    const qs = [];
    for (let i = 0; i < 90; i++) {
      qs.push({ type:'choice', text:`${i+1}. Pilih pernyataan yang lebih mencerminkan Anda di tempat kerja:`, options:['A','B'] });
    }
    return qs;
  },
  score(answers) {
    // 20 scales: N,G,A,L,P,I,T,V,X,S,B,O,R,D,C,E,F,K,Z,W
    // Each scale uses specific 9 item positions
    const scaleItems = {
      N:[1,19,37,55,73,10,28,46,64], G:[2,20,38,56,74,11,29,47,65],
      A:[3,21,39,57,75,12,30,48,66], L:[4,22,40,58,76,13,31,49,67],
      P:[5,23,41,59,77,14,32,50,68], I:[6,24,42,60,78,15,33,51,69],
      T:[7,25,43,61,79,16,34,52,70], V:[8,26,44,62,80,17,35,53,71],
      X:[9,27,45,63,81,18,36,54,72], S:[10,28,46,64,82,1,19,37,55],
      B:[11,29,47,65,83,2,20,38,56], O:[12,30,48,66,84,3,21,39,57],
      R:[13,31,49,67,85,4,22,40,58], D:[14,32,50,68,86,5,23,41,59],
      C:[15,33,51,69,87,6,24,42,60], E:[16,34,52,70,88,7,25,43,61],
      F:[17,35,53,71,89,8,26,44,62], K:[18,36,54,72,90,9,27,45,63],
      Z:[82,83,84,85,86,87,88,89,90], W:[73,74,75,76,77,78,79,80,81]
    };
    const scores = {};
    Object.keys(scaleItems).forEach(scale => {
      scores[scale] = 0;
      scaleItems[scale].slice(0,9).forEach(itemNum => {
        const idx = itemNum - 1;
        if (answers[idx] === 0) scores[scale]++; // A=0 counts for the scale
      });
    });
    const topScales = Object.entries(scores).sort((a,b)=>b[1]-a[1]).slice(0,5).map(x=>x[0]);
    return { scores, topScales, type: topScales.join('+'), interpretation: `PAPI Kostick: ${topScales.join(', ')}` };
  },
  renderResult(r) {
    const scaleDesc = {
      N:'Need to be noticed — Kebutuhan untuk diperhatikan',
      G:'Need for challenge — Kebutuhan akan tantangan',
      A:'Need for achievement — Kebutuhan berprestasi',
      L:'Need to lead — Kebutuhan untuk memimpin',
      P:'Need to control — Kebutuhan mengendalikan',
      I:'Ease in decision making — Kemudahan dalam membuat keputusan',
      T:'Need to be supportive — Kebutuhan untuk mendukung',
      V:'Need for change — Kebutuhan akan perubahan',
      X:'Need to be independent — Kebutuhan mandiri',
      S:'Social extension — Ekspresi sosial',
      B:'Need to belong — Kebutuhan untuk diterima',
      O:'Need for closeness and affection — Kebutuhan akan kedekatan',
      R:'Theoretical type — Tipe teoritis',
      D:'Interest in working with detail — Minat bekerja dengan detail',
      C:'Organized type — Tipe terorganisir',
      E:'Need to be forceful — Kebutuhan untuk bersikap tegas',
      F:'Hard intense worker — Pekerja keras',
      K:'Need to be active — Kebutuhan untuk aktif',
      Z:'Need for rules and supervision — Kebutuhan aturan',
      W:'Need to finish — Kebutuhan menyelesaikan tugas',
    };
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#064e3b,#0e9f6e)">
        <div style="font-size:.9rem;opacity:.8">PAPI Kostick Profile</div>
        <div class="result-type" style="font-size:1.5rem">${r.topScales.join(' · ')}</div>
        <div class="result-score">Top scales</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        <div class="scale-bar-wrap">
          ${Object.entries(r.scores).map(([scale, val]) => `
            <div class="scale-bar-row" style="margin-bottom:.4rem">
              <div class="scale-bar-label" title="${scaleDesc[scale]||''}">
                <span class="font-bold" style="color:${r.topScales.includes(scale)?'var(--primary)':'var(--text2)'}">${scale}</span>
                <span>${val}/9</span>
              </div>
              <div class="scale-bar"><div class="scale-bar-fill" style="width:${val/9*100}%;background:${r.topScales.includes(scale)?'var(--primary)':'var(--border)'}"></div></div>
            </div>
          `).join('')}
        </div>
      </div></div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 13. CBI — Counterproductive Behavior Index
// ═══════════════════════════════════════════════════
{
  id: 'cbi', name: 'CBI (Counterproductive Behavior Index)',
  category: 'integrity', icon: '🔒',
  items: 140, timeLimit: null, autoScore: true,
  desc: '6 subscales measuring counterproductive work behavior tendencies',
  descId: '6 subscale mengukur kecenderungan perilaku kontraproduktif di tempat kerja',
  getQuestions() {
    const qs = [];
    const subscales = ['Dependability','Aggression','Substance Abuse','Honesty','Computer Abuse','Sexual Harassment'];
    for (let i = 0; i < 140; i++) {
      const sub = subscales[Math.floor(i/20) % 6];
      qs.push({ type:'choice', text:`${i+1}. [${sub}] Pernyataan ${i%20+1}: Apakah pernyataan ini BENAR (B) atau SALAH (S) tentang Anda?`, options:['B (Benar)','S (Salah)'], subscale: Math.floor(i/20) % 6 });
    }
    return qs;
  },
  score(answers) {
    const qs = this.getQuestions();
    const subScores = Array(6).fill(0);
    const subCounts = Array(6).fill(0);
    Object.entries(answers).forEach(([idx, val]) => {
      const q = qs[parseInt(idx)];
      if (q) { if (val === 0) subScores[q.subscale]++; subCounts[q.subscale]++; }
    });
    const total = subScores.reduce((a,b)=>a+b, 0);
    let overall;
    if (total <= 38) overall = 'Low / Rendah';
    else if (total <= 59) overall = 'Medium / Sedang';
    else overall = 'High / Tinggi';
    const subNames = ['Dependability (Dp)','Aggression (Ag)','Substance Abuse (SA)','Honesty (Hn)','Computer Abuse (CA)','Sexual Harassment (SH)'];
    const levels = subScores.map(s => s <= 6 ? 'Low' : s <= 13 ? 'Medium' : 'High');
    return { total, overall, subScores, subNames, levels, type: overall, interpretation: `CBI Overall: ${overall}` };
  },
  renderResult(r) {
    const cols = {Low:'var(--secondary)',Medium:'var(--warning)',High:'var(--danger)'};
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#1f2937,${r.overall.includes('Low')?'var(--secondary)':r.overall.includes('Medium')?'var(--warning)':'var(--danger)'})">
        <div style="font-size:.9rem;opacity:.8">CBI Overall Score</div>
        <div class="result-type">${r.overall}</div>
        <div class="result-score">Total: ${r.total}/120</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        ${r.subNames.map((name, i) => `
          <div style="margin-bottom:.75rem">
            <div style="display:flex;justify-content:space-between;margin-bottom:.3rem">
              <span class="font-semibold text-sm">${name}</span>
              <span class="pill" style="background:${cols[r.levels[i]]||'#dbeafe'};color:${cols[r.levels[i]]||'var(--primary)'}">
                ${r.levels[i]} (${r.subScores[i]}/20)
              </span>
            </div>
            <div class="scale-bar"><div class="scale-bar-fill" style="width:${r.subScores[i]/20*100}%;background:${cols[r.levels[i]]||'var(--primary)'}"></div></div>
          </div>
        `).join('')}
      </div></div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 14. WARTEG
// ═══════════════════════════════════════════════════
{
  id: 'warteg', name: 'WARTEG (Wartegg Zeichen Test)',
  category: 'projective', icon: '✏️',
  items: 8, timeLimit: null, autoScore: false,
  desc: 'Projective drawing test — 8 boxes, qualitative interpretation by psychologist',
  descId: 'Tes gambar proyektif — 8 kotak, interpretasi kualitatif oleh psikolog',
  getQuestions() {
    return [
      {type:'choice',text:'1. Urutan gambar (Sequence): Testee menggambar kotak berurutan 1-2-3...8',options:['1-2-3-4-5-6-7-8 (Sistematis)','Acak (Tidak sistematis)','1-2 lalu melompat ke belakang']},
      {type:'choice',text:'2. Tekanan garis (Pressure): Kekuatan tekanan saat menggambar',options:['Ringan','Sedang','Kuat']},
      {type:'choice',text:'3. Ruang penggunaan (Space use): Penggunaan ruang dalam kotak',options:['Kecil (di bawah 1/4 kotak)','Sedang (1/4 - 3/4 kotak)','Besar (lebih dari 3/4 kotak)']},
      {type:'choice',text:'4. Jenis gambar (Content): Gambar yang dibuat',options:['Benda/objek (inanimate)','Makhluk hidup (animate)','Abstrak/pola']},
      {type:'choice',text:'5. Kualitas gambar (Quality)',options:['Sangat sederhana','Sedang','Detail dan kompleks']},
      {type:'choice',text:'6. Integrasi motif (Integration): Bagaimana elemen gambar digabungkan',options:['Tidak terintegrasi','Sebagian terintegrasi','Terintegrasi penuh']},
      {type:'choice',text:'7. Kecepatan menggambar (Speed)',options:['Lambat','Sedang','Cepat']},
      {type:'choice',text:'8. Perilaku saat tes (Behavior)',options:['Ragu-ragu, banyak bertanya','Normal/wajar','Sangat percaya diri, cepat selesai']},
    ];
  },
  score(answers) {
    // Qualitative only - generate narrative
    const labels = {0:['Sistematis, teratur, kaku','Acak, spontan, fleksibel','Ambivalensi, tidak konsisten'],
      1:['Introvert, lemah, perasaan sensitif','Stabil, seimbang','Extrovert, kuat, tegas'],
      2:['Perasaan inferior, menarik diri','Normal, seimbang','Ekspansi, ambisius'],
      3:['Berpikir konkret, faktual','Berpikir hidup, hubungan sosial','Berpikir abstrak, kreatif'],
      4:['Kurang percaya diri','Kemampuan rata-rata','Produktif, berprestasi'],
      5:['Kurang terorganisir','Cukup terorganisir','Sangat terorganisir, sistematis'],
      6:['Lambat berpikir, hati-hati','Normal','Responsif, aktif'],
      7:['Tidak percaya diri','Normal, kooperatif','Percaya diri tinggi']
    };
    const narrative = Object.entries(answers).map(([idx, val]) => labels[parseInt(idx)]?.[val] || '').filter(Boolean).join('. ');
    return { type: 'Proyektif', score: 'Kualitatif', interpretation: narrative || 'Belum diisi.', isProjective: true };
  },
  renderResult(r) {
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#374151,#4b5563)">
        <div style="font-size:.9rem;opacity:.8">WARTEG — Interpretasi Proyektif</div>
        <div class="result-type">Kualitatif</div>
      </div>
      <div class="card" style="margin-top:1rem">
        <div class="card-header"><span class="card-title">📋 Narasi Interpretasi</span></div>
        <div class="card-body">
          <p style="line-height:1.8">${r.interpretation}</p>
          <div class="alert alert-warning" style="margin-top:1rem">
            <span>⚠️</span>
            <div>Interpretasi WARTEG harus dilakukan oleh psikolog terlatih. Hasil di atas hanya observasi awal berdasarkan parameter formal.</div>
          </div>
        </div>
      </div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 15. SPM — Standard Progressive Matrices
// ═══════════════════════════════════════════════════
{
  id: 'spm', name: 'SPM (Standard Progressive Matrices)',
  category: 'intelligence', icon: '🔲',
  items: 60, timeLimit: 20, autoScore: true,
  desc: 'Non-verbal visual intelligence: 5 sets (A,B,C,D,E) of 12 items each',
  descId: 'Kecerdasan visual non-verbal: 5 set (A,B,C,D,E) masing-masing 12 item',
  getQuestions() {
    const sets = ['A','B','C','D','E'];
    const qs = [];
    sets.forEach(s => {
      for (let i = 1; i <= 12; i++) {
        qs.push({ type:'choice', text:`Set ${s} No.${i} — Pilih jawaban yang melengkapi pola (Proktor memasukkan jawaban testee)`, options:['1','2','3','4','5','6'] });
      }
    });
    return qs;
  },
  score(answers) {
    // SPM answer key (standard)
    const key = [
      4,5,1,2,6,3,6,2,1,3,5,4, // Set A
      2,6,1,2,1,3,5,6,4,3,4,5, // Set B
      8,2,3,8,7,4,5,1,7,6,1,2, // Set C (1-8 scale)
      3,4,3,1,2,3,4,6,2,5,1,4, // Set D
      7,6,8,2,1,5,1,3,5,2,8,4, // Set E
    ].map(v => v - 1); // 0-indexed

    let rs = 0;
    Object.entries(answers).forEach(([idx, val]) => {
      if (parseInt(idx) < key.length && val === key[parseInt(idx)]) rs++;
    });
    // Grade classification
    let grade;
    if (rs >= 55) grade = 'Grade I (Intellectually Superior)';
    else if (rs >= 47) grade = 'Grade II+ (Definitely Above Average)';
    else if (rs >= 39) grade = 'Grade II (Above Average)';
    else if (rs >= 32) grade = 'Grade III+ (Intellectually Average)';
    else if (rs >= 24) grade = 'Grade III (Intellectually Average)';
    else if (rs >= 16) grade = 'Grade IV (Definitely Below Average)';
    else grade = 'Grade V (Intellectually Impaired)';
    return { score: rs, type: grade, interpretation: `SPM: RS ${rs}/60 — ${grade}` };
  },
  renderResult(r) {
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#1e3a5f,#1a56db)">
        <div style="font-size:.9rem;opacity:.8">SPM Score</div>
        <div class="result-type" style="font-size:3rem">${r.score}/60</div>
        <div class="result-score">${r.type}</div>
      </div>
    `;
  }
},

// ═══════════════════════════════════════════════════
// 16–29: Additional tests (simplified scoring)
// ═══════════════════════════════════════════════════

// MMPI (simplified)
{
  id: 'mmpi', name: 'MMPI-2 (Minnesota Multiphasic Personality Inventory)',
  category: 'clinical', icon: '🏥',
  items: 566, timeLimit: null, autoScore: true,
  desc: '566-item clinical personality inventory, 10 clinical + 3 validity scales',
  descId: 'Inventori kepribadian klinis 566 item, 10 skala klinis + 3 skala validitas',
  getQuestions() {
    const qs = [];
    for (let i = 1; i <= 566; i++) {
      qs.push({ type:'yn', text:`Item ${i}: (Lihat buku soal MMPI — jawab Benar/Ya atau Salah/Tidak)` });
    }
    return qs;
  },
  score(answers) {
    // Clinical scales (simplified scoring based on item count)
    const scales = {
      L: {name:'Lie Scale (L)', items:[15,30,45,75,105,135,165,195,225,255,285], high:'Defensif, menutupi kelemahan'},
      F: {name:'Infrequency (F)', items:[14,20,32,34,35,40,42,48,49,50], high:'Jawaban tidak biasa, mungkin malingering'},
      K: {name:'Correction (K)', items:[83,96,101,109,116,122,127], high:'Defensif ringan'},
      Hs:{name:'Hypochondriasis (Hs)', items:[23,29,43,62,72,108,114,125,161,189], high:'Keluhan fisik berlebihan'},
      D: {name:'Depression (D)', items:[2,5,7,14,20,26,29,38,46,55,65,76], high:'Depresi klinis'},
      Hy:{name:'Hysteria (Hy)', items:[10,23,32,43,44,47,76,114,135,172,174], high:'Konversi fisik, ingkar masalah'},
      Pd:{name:'Psychopathic Deviate (Pd)', items:[16,22,33,35,42,52,60,80,82,89], high:'Kepribadian antisosial'},
      Mf:{name:'Masculinity-Femininity (Mf)', items:[4,25,62,64,67,74,77,78,87,92], high:'Minat berlawanan gender'},
      Pa:{name:'Paranoia (Pa)', items:[15,16,22,28,35,39,40,48,55,68], high:'Paranoid, curiga berlebihan'},
      Pt:{name:'Psychasthenia (Pt)', items:[10,15,22,32,41,67,76,86,94,102], high:'Obsesif-kompulsif, cemas'},
      Sc:{name:'Schizophrenia (Sc)', items:[15,16,21,22,24,30,32,33,35,38], high:'Disorganisasi pikiran'},
      Ma:{name:'Hypomania (Ma)', items:[13,21,22,59,64,73,97,100,109,127], high:'Hiperaktif, flight of ideas'},
      Si:{name:'Social Introversion (Si)', items:[32,67,82,111,117,124,138,147,171,172], high:'Intoversi sosial'},
    };
    const scaleScores = {};
    Object.entries(scales).forEach(([code, s]) => {
      let count = 0;
      s.items.forEach(itemNum => {
        const idx = itemNum - 1;
        if (answers[idx] === 1) count++;
      });
      scaleScores[code] = { raw: count, name: s.name, high: s.high, elevated: count > s.items.length * 0.6 };
    });
    const elevated = Object.entries(scaleScores).filter(([,v]) => v.elevated).map(([k]) => k);
    return { scaleScores, elevated, type: elevated.length > 3 ? 'Profil Klinis Signifikan' : 'Profil Normal', interpretation: `Skala elevasi: ${elevated.join(', ') || 'tidak ada'}` };
  },
  renderResult(r) {
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#991b1b,#e02424)">
        <div style="font-size:.9rem;opacity:.8">MMPI Clinical Profile</div>
        <div class="result-type" style="font-size:1.3rem">${r.type}</div>
        <div class="result-score">Elevated: ${r.elevated.join(', ') || 'None'}</div>
      </div>
      <div class="card" style="margin-top:1rem">
        <div class="card-header"><span class="card-title">Skala Klinis MMPI</span></div>
        <div class="card-body">
          ${Object.entries(r.scaleScores).map(([code, s]) => `
            <div style="margin-bottom:.5rem">
              <div style="display:flex;justify-content:space-between;font-size:.82rem">
                <span class="${s.elevated?'font-bold':''}${s.elevated?' text-primary':''}">${s.name}</span>
                <span class="pill ${s.elevated?'pill-red':'pill-green'}">${s.elevated?'Elevated':'Normal'}</span>
              </div>
            </div>
          `).join('')}
          <div class="alert alert-danger" style="margin-top:1rem">
            <span>⚠️</span>
            <div>Interpretasi MMPI harus dilakukan oleh psikolog/psikiater berlisensi.</div>
          </div>
        </div>
      </div>
    `;
  }
},

// IST
{
  id: 'ist', name: 'IST (Intelligenz-Struktur-Test)',
  category: 'intelligence', icon: '🧮',
  items: 176, timeLimit: 90, autoScore: true,
  desc: '9 subtests measuring different aspects of intelligence structure',
  descId: '9 subtes mengukur aspek kecerdasan yang berbeda',
  getQuestions() {
    const subtests = [
      {name:'SE (Sentence Completion)', count:20},
      {name:'WA (Word Analogies)', count:20},
      {name:'AN (Analogies)', count:20},
      {name:'GE (Vocabulary)', count:20},
      {name:'ME (Arithmetic)', count:20},
      {name:'RA (Number Series)', count:20},
      {name:'ZR (Figure Series)', count:20},
      {name:'FA (Figure Choice)', count:20},
      {name:'WU (Cube Tasks)', count:16},
    ];
    const qs = [];
    subtests.forEach(st => {
      for (let i = 1; i <= st.count; i++) {
        qs.push({ type:'choice', text:`[${st.name}] No.${i} — Pilih jawaban yang benar`, options:['A','B','C','D','E'] });
      }
    });
    return qs;
  },
  score(answers) {
    // Simplified - count answers for each subtest
    const subtestNames = ['SE','WA','AN','GE','ME','RA','ZR','FA','WU'];
    const subtestSizes = [20,20,20,20,20,20,20,20,16];
    const scores = {};
    let total = 0;
    subtestNames.forEach((name, ti) => {
      let start = subtestSizes.slice(0,ti).reduce((a,b)=>a+b, 0);
      let count = 0;
      for (let i = start; i < start + subtestSizes[ti]; i++) {
        if (answers[i] !== undefined) count++;
      }
      scores[name] = count;
      total += count;
    });
    // IQ conversion (simplified)
    const iq = Math.round(90 + (total / 176) * 60);
    return { scores, total, iq, type: `IQ ${iq}`, interpretation: `IST: Total RS ${total}/176 → IQ ≈ ${iq}` };
  },
  renderResult(r) {
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#1e429f,#1a56db)">
        <div style="font-size:.9rem;opacity:.8">IST Intelligence Score</div>
        <div class="result-type" style="font-size:3rem">${r.iq}</div>
        <div class="result-score">Total RS: ${r.total}/176</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        <div class="scale-bar-wrap">
          ${Object.entries(r.scores).map(([name,v]) => `
            <div class="scale-bar-row" style="margin-bottom:.4rem">
              <div class="scale-bar-label"><span>${name}</span><span>${v}</span></div>
              <div class="scale-bar"><div class="scale-bar-fill" style="width:${v/20*100}%"></div></div>
            </div>
          `).join('')}
        </div>
      </div></div>
    `;
  }
},

// MIT
{
  id: 'mit', name: 'MIT (Multiple Intelligences Test)',
  category: 'intelligence', icon: '🌈',
  items: 80, timeLimit: null, autoScore: true,
  desc: '8 dimensions of Gardner multiple intelligences: Linguistic, Logical, Spatial, Musical, Kinesthetic, Naturalist, Interpersonal, Intrapersonal',
  descId: '8 dimensi kecerdasan majemuk Gardner',
  getQuestions() {
    const dims = ['Linguistik','Logis-Matematis','Spasial','Musikal','Kinestetik','Naturalis','Interpersonal','Intrapersonal'];
    const qs = [];
    dims.forEach((dim, di) => {
      for (let i = 1; i <= 10; i++) {
        qs.push({ type:'likert', text:`[${dim}] Pernyataan ${i}: Saya memiliki kemampuan/minat dalam bidang ${dim.toLowerCase()}.`, dimIdx: di, options:['Sangat Tidak Setuju','Tidak Setuju','Netral','Setuju','Sangat Setuju'] });
      }
    });
    return qs;
  },
  score(answers) {
    const qs = this.getQuestions();
    const dimNames = ['Linguistik','Logis-Matematis','Spasial','Musikal','Kinestetik','Naturalis','Interpersonal','Intrapersonal'];
    const scores = Array(8).fill(0);
    const counts = Array(8).fill(0);
    Object.entries(answers).forEach(([idx, val]) => {
      const q = qs[parseInt(idx)];
      if (q) { scores[q.dimIdx] += (val+1); counts[q.dimIdx]++; }
    });
    const avgs = scores.map((s,i) => counts[i]>0 ? Math.round(s/counts[i]/5*100) : 0);
    const topDim = avgs.indexOf(Math.max(...avgs));
    return { avgs, type: dimNames[topDim], interpretation: `Kecerdasan dominan: ${dimNames[topDim]}` };
  },
  renderResult(r) {
    const dimNames = ['Linguistik','Logis-Matematis','Spasial','Musikal','Kinestetik','Naturalis','Interpersonal','Intrapersonal'];
    const colors = ['#1d4ed8','#065f46','#9d174d','#92400e','#5b21b6','#065f46','#b45309','#374151'];
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#312e81,#4f46e5)">
        <div style="font-size:.9rem;opacity:.8">Kecerdasan Dominan</div>
        <div class="result-type">${r.type}</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        ${r.avgs.map((v,i) => `
          <div class="scale-bar-row" style="margin-bottom:.5rem">
            <div class="scale-bar-label"><span style="color:${colors[i]}">${dimNames[i]}</span><span>${v}%</span></div>
            <div class="scale-bar"><div class="scale-bar-fill" style="width:${v}%;background:${colors[i]}"></div></div>
          </div>
        `).join('')}
      </div></div>
    `;
  }
},

// 16PF
{
  id: '16pf', name: '16PF (Sixteen Personality Factor)',
  category: 'personality', icon: '🌀',
  items: 185, timeLimit: null, autoScore: true,
  desc: "Cattell's 16 primary personality factors",
  descId: "16 faktor kepribadian primer Cattell",
  getQuestions() {
    const factors = ['A (Warmth)','B (Reasoning)','C (Emotional Stability)','E (Dominance)','F (Liveliness)',
                     'G (Rule-Consciousness)','H (Social Boldness)','I (Sensitivity)','L (Vigilance)',
                     'M (Abstractedness)','N (Privateness)','O (Apprehension)','Q1 (Openness)','Q2 (Self-Reliance)','Q3 (Perfectionism)','Q4 (Tension)'];
    const qs = [];
    factors.forEach((f, fi) => {
      for (let i = 1; i <= (fi < 15 ? 12 : 5); i++) {
        qs.push({ type:'choice', text:`[${f}] Item ${i}: Pilih jawaban yang paling sesuai`, options:['A','B (di antara)','C'], factorIdx: fi });
      }
    });
    return qs;
  },
  score(answers) {
    const qs = this.getQuestions();
    const factorNames = ['A','B','C','E','F','G','H','I','L','M','N','O','Q1','Q2','Q3','Q4'];
    const scores = Array(16).fill(0);
    const counts = Array(16).fill(0);
    Object.entries(answers).forEach(([idx, val]) => {
      const q = qs[parseInt(idx)];
      if (q) { scores[q.factorIdx] += val; counts[q.factorIdx]++; }
    });
    const stens = scores.map((s, i) => counts[i] > 0 ? Math.round((s / counts[i] / 2) * 10) : 5);
    return { stens, factorNames, type: 'Profil 16PF', interpretation: '16PF Sten scores computed' };
  },
  renderResult(r) {
    const polarities = [['Warmth','Reserved'],['Reasoning','Concrete'],['Stability','Reactive'],['Dominance','Submissive'],
      ['Liveliness','Serious'],['Rule-Conscious','Expedient'],['Bold','Shy'],['Sensitivity','Tough-minded'],
      ['Vigilant','Trusting'],['Abstract','Grounded'],['Private','Forthright'],['Apprehensive','Confident'],
      ['Open','Traditional'],['Self-reliant','Group-oriented'],['Perfectionist','Tolerant'],['Tense','Relaxed']];
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#312e81,#4f46e5)">
        <div class="result-type">16PF Profile</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        ${r.factorNames.map((name, i) => `
          <div style="display:grid;grid-template-columns:60px 1fr 60px;gap:.5rem;align-items:center;margin-bottom:.4rem;font-size:.8rem">
            <span class="text-muted text-right">${polarities[i]?.[1]||''}</span>
            <div>
              <div class="scale-bar"><div class="scale-bar-fill" style="width:${(r.stens[i]||5)/10*100}%"></div></div>
              <div class="text-center text-xs text-muted">${name} = ${r.stens[i]||5}</div>
            </div>
            <span class="text-muted">${polarities[i]?.[0]||''}</span>
          </div>
        `).join('')}
      </div></div>
    `;
  }
},

// EPPS
{
  id: 'epps', name: 'EPPS (Edwards Personal Preference Schedule)',
  category: 'personality', icon: '📊',
  items: 225, timeLimit: null, autoScore: true,
  desc: '15 personality needs based on Murray\'s theory',
  descId: '15 kebutuhan kepribadian berdasarkan teori Murray',
  getQuestions() {
    const needs = ['Achievement','Deference','Order','Exhibition','Autonomy','Affiliation','Intraception','Succorance','Dominance','Abasement','Nurturance','Change','Endurance','Heterosexuality','Aggression'];
    const qs = [];
    for (let i = 0; i < 225; i++) {
      const n1 = needs[i % 15];
      const n2 = needs[(i+1) % 15];
      qs.push({ type:'choice', text:`${i+1}. Pilih pernyataan yang lebih mencerminkan Anda:`, options:[`A: (${n1}) Saya lebih suka berprestasi`,`B: (${n2}) Saya lebih suka menyesuaikan diri`], n1Idx: i%15, n2Idx: (i+1)%15 });
    }
    return qs;
  },
  score(answers) {
    const needNames = ['ach','def','ord','exh','aut','aff','int','suc','dom','aba','nur','chg','end','het','agg'];
    const scores = Array(15).fill(0);
    const qs = this.getQuestions();
    Object.entries(answers).forEach(([idx, val]) => {
      const q = qs[parseInt(idx)];
      if (q) { if (val === 0) scores[q.n1Idx]++; else scores[q.n2Idx]++; }
    });
    const topNeed = needNames[scores.indexOf(Math.max(...scores))];
    return { scores, needNames, type: topNeed.toUpperCase(), interpretation: `EPPS dominan: ${topNeed}` };
  },
  renderResult(r) {
    const fullNames = ['Achievement','Deference','Order','Exhibition','Autonomy','Affiliation','Intraception','Succorance','Dominance','Abasement','Nurturance','Change','Endurance','Heterosexuality','Aggression'];
    const max = Math.max(...r.scores);
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#1e429f,#1a56db)">
        <div class="result-type">${r.type}</div>
        <div class="result-score">Dominant Need</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        ${r.needNames.map((name, i) => `
          <div class="scale-bar-row" style="margin-bottom:.4rem">
            <div class="scale-bar-label"><span>${fullNames[i]} (${name})</span><span>${r.scores[i]}</span></div>
            <div class="scale-bar"><div class="scale-bar-fill" style="width:${max?r.scores[i]/max*100:0}%"></div></div>
          </div>
        `).join('')}
      </div></div>
    `;
  }
},

// Kraeplin
{
  id: 'kraeplin', name: 'Kraeplin/Pauli Test',
  category: 'psychomotor', icon: '⚡',
  items: 0, timeLimit: 60, autoScore: true,
  desc: 'Psychomotor speed test: continuous digit addition, measures concentration and endurance',
  descId: 'Tes kecepatan psikomotor: penjumlahan angka terus-menerus',
  getQuestions() {
    // Kraeplin is a live test - generate digit addition pairs
    const qs = [];
    for (let row = 0; row < 50; row++) {
      const digits = Array.from({length: 60}, () => Math.floor(Math.random() * 10));
      qs.push({ type:'kraeplin', text:`Baris ${row+1}: Jumlahkan angka yang berdekatan, tuliskan satuan dari jumlahnya`, digits, row });
    }
    return qs;
  },
  score(answers) {
    return { score: Object.keys(answers).length, type: 'Psikomotor', interpretation: 'Kraeplin: Lihat lembar jawaban untuk analisis pola kecepatan dan ketelitian' };
  },
  renderResult(r) {
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#b45309,#c27803)">
        <div class="result-type">Kraeplin/Pauli</div>
        <div class="result-score">Psychomotor Speed Test</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        <div class="alert alert-info"><span>ℹ️</span><div>Hasil Kraeplin dianalisis berdasarkan pola kecepatan, ketelitian, dan konsistensi kerja oleh psikolog.</div></div>
      </div></div>
    `;
  }
},

// MSAI
{
  id: 'msai', name: 'MSAI (Multifactor Self-Assessment Inventory)',
  category: 'leadership', icon: '🏆',
  items: 60, timeLimit: null, autoScore: true,
  desc: 'Multi-dimension leadership and competency self-assessment',
  descId: 'Penilaian diri multi-dimensi kompetensi kepemimpinan',
  getQuestions() {
    const dims = ['Visioning','Coaching','Empowering','Communicating','Problem Solving','Execution'];
    const qs = [];
    dims.forEach((d, di) => {
      for (let i = 1; i <= 10; i++) {
        qs.push({ type:'likert', text:`[${d}] ${i}. Saya mampu ${d.toLowerCase()} dengan efektif`, dimIdx: di, options:['Sangat Tidak Setuju','Tidak Setuju','Netral','Setuju','Sangat Setuju'] });
      }
    });
    return qs;
  },
  score(answers) {
    const qs = this.getQuestions();
    const dims = ['Visioning','Coaching','Empowering','Communicating','Problem Solving','Execution'];
    const scores = Array(6).fill(0);
    const counts = Array(6).fill(0);
    Object.entries(answers).forEach(([idx, val]) => {
      const q = qs[parseInt(idx)];
      if (q) { scores[q.dimIdx] += (val+1); counts[q.dimIdx]++; }
    });
    const avgs = scores.map((s,i) => counts[i]>0 ? Math.round(s/counts[i]/5*100) : 0);
    const overall = Math.round(avgs.reduce((a,b)=>a+b,0)/6);
    const level = overall >= 70 ? 'High' : overall >= 40 ? 'Medium' : 'Low';
    return { avgs, dims, overall, type: `${level} Leadership`, interpretation: `MSAI Overall: ${overall}% — ${level}` };
  },
  renderResult(r) {
    const colors = ['#1d4ed8','#065f46','#9d174d','#92400e','#5b21b6','#b45309'];
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#4c1d95,#5b21b6)">
        <div class="result-type">${r.type}</div>
        <div class="result-score">Overall: ${r.overall}%</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        ${r.dims.map((d,i) => `
          <div class="scale-bar-row" style="margin-bottom:.5rem">
            <div class="scale-bar-label"><span style="color:${colors[i]}">${d}</span><span>${r.avgs[i]}%</span></div>
            <div class="scale-bar"><div class="scale-bar-fill" style="width:${r.avgs[i]}%;background:${colors[i]}"></div></div>
          </div>
        `).join('')}
      </div></div>
    `;
  }
},

// RMIB
{
  id: 'rmib', name: 'RMIB (Rothwell Miller Interest Blank)',
  category: 'interest', icon: '📌',
  items: 72, timeLimit: null, autoScore: true,
  desc: 'Ranking interest inventory: 12 occupational groups ranked 1-9',
  descId: 'Inventori minat rangking: 12 kelompok pekerjaan diurutkan 1-9',
  getQuestions() {
    const groups = ['Outdoor','Mechanical','Computational','Scientific','Personal Contact','Aesthetic','Literary','Musical','Social Service','Clerical','Practical','Medical'];
    const qs = [];
    for (let i = 0; i < 8; i++) {
      groups.forEach((g,gi) => {
        qs.push({ type:'choice', text:`Set ${i+1}: ${g} — Peringkat ke berapa? (1=paling suka, 12=paling tidak suka)`, options:['1','2','3','4','5','6','7','8','9','10','11','12'], groupIdx: gi });
      });
    }
    return qs;
  },
  score(answers) {
    const groups = ['Outdoor','Mechanical','Computational','Scientific','Personal Contact','Aesthetic','Literary','Musical','Social Service','Clerical','Practical','Medical'];
    const totals = Array(12).fill(0);
    const counts = Array(12).fill(0);
    const qs = this.getQuestions();
    Object.entries(answers).forEach(([idx, val]) => {
      const q = qs[parseInt(idx)];
      if (q) { totals[q.groupIdx] += (val+1); counts[q.groupIdx]++; }
    });
    const avgs = totals.map((t,i) => counts[i]>0 ? t/counts[i] : 7);
    const sorted = groups.map((g,i) => ({g, avg: avgs[i], idx: i})).sort((a,b)=>a.avg-b.avg);
    return { groups, avgs, top: sorted.slice(0,3).map(x=>x.g), type: sorted[0].g, interpretation: `Minat tertinggi: ${sorted[0].g}` };
  },
  renderResult(r) {
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#064e3b,#065f46)">
        <div class="result-type">${r.top.join(' · ')}</div>
        <div class="result-score">Top Interests</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        ${r.groups.map((g,i) => `
          <div class="scale-bar-row" style="margin-bottom:.4rem">
            <div class="scale-bar-label"><span>${g}</span><span>${r.avgs[i].toFixed(1)}</span></div>
            <div class="scale-bar"><div class="scale-bar-fill" style="width:${(1-r.avgs[i]/12)*100}%"></div></div>
          </div>
        `).join('')}
        <p class="text-sm text-muted" style="margin-top:.5rem">Skor rendah = minat lebih tinggi (rangking 1 = favorit)</p>
      </div></div>
    `;
  }
},

// Kuder
{
  id: 'kuder', name: 'Kuder Preference Record (KPR-V)',
  category: 'interest', icon: '🎨',
  items: 100, timeLimit: null, autoScore: true,
  desc: '10 vocational interest scales: select most/least preferred activity from triads',
  descId: '10 skala minat vokasional: pilih paling suka/tidak suka dari triads',
  getQuestions() {
    const scales = ['Outdoor','Mechanical','Computational','Scientific','Persuasive','Artistic','Literary','Musical','Social Service','Clerical'];
    const qs = [];
    for (let i = 0; i < 100; i++) {
      const s = scales[i % 10];
      qs.push({ type:'choice', text:`${i+1}. Dari tiga kegiatan ini, mana yang PALING Anda sukai? [${s}]`, options:['A: Kegiatan pertama','B: Kegiatan kedua','C: Kegiatan ketiga'], scaleIdx: i%10 });
    }
    return qs;
  },
  score(answers) {
    const scaleNames = ['Outdoor','Mechanical','Computational','Scientific','Persuasive','Artistic','Literary','Musical','Social Service','Clerical'];
    const scores = Array(10).fill(0);
    const qs = this.getQuestions();
    Object.entries(answers).forEach(([idx, val]) => {
      const q = qs[parseInt(idx)];
      if (q && val === 0) scores[q.scaleIdx]++;
    });
    const topIdx = scores.indexOf(Math.max(...scores));
    return { scores, scaleNames, type: scaleNames[topIdx], interpretation: `Kuder dominan: ${scaleNames[topIdx]}` };
  },
  renderResult(r) {
    const max = Math.max(...r.scores);
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#9d174d,#be185d)">
        <div class="result-type">${r.type}</div>
        <div class="result-score">Dominant Interest</div>
      </div>
      <div class="card" style="margin-top:1rem"><div class="card-body">
        ${r.scaleNames.map((n,i) => `
          <div class="scale-bar-row" style="margin-bottom:.4rem">
            <div class="scale-bar-label"><span>${n}</span><span>${r.scores[i]}</span></div>
            <div class="scale-bar"><div class="scale-bar-fill" style="width:${max?r.scores[i]/max*100:0}%"></div></div>
          </div>
        `).join('')}
      </div></div>
    `;
  }
},

// Personality Test (General)
{
  id: 'personality', name: 'Personality Test (General)',
  category: 'personality', icon: '🌸',
  items: 40, timeLimit: null, autoScore: true,
  desc: 'General personality screening questionnaire',
  descId: 'Kuesioner skrining kepribadian umum',
  getQuestions() {
    return Array.from({length: 40}, (_, i) => ({
      type: 'likert',
      text: `${i+1}. ${['Saya mudah bergaul dengan orang baru','Saya dapat mengendalikan emosi saya dengan baik','Saya suka bekerja dalam tim','Saya biasanya menyelesaikan pekerjaan tepat waktu','Saya bisa memimpin ketika dibutuhkan','Saya dapat menyesuaikan diri dengan perubahan','Saya bertanggung jawab atas pekerjaan saya','Saya komunikatif dan dapat menyampaikan ide dengan baik','Saya gigih dalam menghadapi kesulitan','Saya bekerja keras untuk mencapai tujuan'][i%10]}`,
      options: ['Sangat Tidak Setuju','Tidak Setuju','Netral','Setuju','Sangat Setuju']
    }));
  },
  score(answers) {
    let total = Object.values(answers).reduce((s, v) => s + v + 1, 0);
    const max = Object.keys(answers).length * 5;
    const pct = max > 0 ? Math.round(total / max * 100) : 0;
    const type = pct >= 70 ? 'Kepribadian Positif' : pct >= 40 ? 'Kepribadian Moderat' : 'Perlu Pengembangan';
    return { score: total, pct, type, interpretation: `${pct}% — ${type}` };
  },
  renderResult(r) {
    return `
      <div class="result-header" style="background:linear-gradient(135deg,#9d174d,#be185d)">
        <div class="result-type">${r.type}</div>
        <div class="result-score">${r.pct}%</div>
      </div>
    `;
  }
},

// TIU 5 & 6 (Army Alpha style - proctor entry)
{
  id: 'tiu', name: 'TIU 5-6 (Tes Intelegensi Umum)',
  category: 'intelligence', icon: '📐',
  items: 120, timeLimit: 20, autoScore: true,
  desc: 'Group intelligence test — proctor enters answers from physical booklet',
  descId: 'Tes kecerdasan kelompok — proktor memasukkan jawaban dari buku soal',
  getQuestions() {
    return Array.from({length: 120}, (_, i) => ({
      type: 'choice', text: `Soal ${i+1} — (Lihat buku soal TIU)`, options: ['A','B','C','D','E']
    }));
  },
  score(answers) {
    const rs = Object.keys(answers).length;
    const iq = Math.min(140, 80 + rs);
    return { score: rs, iq, type: `IQ ≈ ${iq}`, interpretation: `TIU: RS ${rs}/120` };
  },
  renderResult(r) {
    return `<div class="result-header" style="background:linear-gradient(135deg,#1e429f,#1a56db)">
      <div class="result-type" style="font-size:3rem">${r.iq}</div>
      <div class="result-score">RS: ${r.score}/120</div></div>`;
  }
},

// Army Alpha
{
  id: 'armyalpha', name: 'Army Alpha',
  category: 'intelligence', icon: '🎖',
  items: 212, timeLimit: 50, autoScore: true,
  desc: 'Classical group intelligence test — proctor enters answers',
  descId: 'Tes kecerdasan kelompok klasik — proktor memasukkan jawaban',
  getQuestions() {
    return Array.from({length: 212}, (_, i) => ({
      type: 'choice', text: `Item ${i+1} — (Lihat buku soal Army Alpha)`, options: ['A','B','C','D']
    }));
  },
  score(answers) {
    const rs = Object.keys(answers).length;
    return { score: rs, type: `RS ${rs}/212`, interpretation: `Army Alpha: RS ${rs}` };
  },
  renderResult(r) {
    return `<div class="result-header" style="background:linear-gradient(135deg,#374151,#4b5563)">
      <div class="result-type" style="font-size:3rem">${r.score}</div>
      <div class="result-score">Army Alpha Raw Score</div></div>`;
  }
},

]; // End TEST_CATALOG
