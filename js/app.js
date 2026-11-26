// =====================================================
// HR Psychology Portal - Core Application
// =====================================================

// ── LANGUAGE SYSTEM ─────────────────────────────────
const LANG = {
  id: {
    appName: 'Portal Psikologi HR',
    dashboard: 'Dasbor',
    tests: 'Daftar Tes',
    sessions: 'Sesi Tes',
    results: 'Hasil Tes',
    sop: 'Direktori SOP',
    settings: 'Pengaturan',
    newSession: 'Sesi Baru',
    startTest: 'Mulai Tes',
    submitTest: 'Kirim Jawaban',
    viewResult: 'Lihat Hasil',
    next: 'Lanjut',
    prev: 'Sebelumnya',
    finish: 'Selesai',
    cancel: 'Batal',
    close: 'Tutup',
    save: 'Simpan',
    print: 'Cetak',
    export: 'Ekspor',
    delete: 'Hapus',
    edit: 'Edit',
    name: 'Nama',
    age: 'Usia',
    gender: 'Jenis Kelamin',
    education: 'Pendidikan',
    position: 'Jabatan',
    testDate: 'Tanggal Tes',
    male: 'Laki-laki',
    female: 'Perempuan',
    totalTests: 'Total Tes',
    totalSessions: 'Total Sesi',
    completedTests: 'Tes Selesai',
    activeSession: 'Sesi Aktif',
    intelligence: 'Inteligensi',
    personality: 'Kepribadian',
    interest: 'Minat',
    clinical: 'Klinis',
    leadership: 'Kepemimpinan',
    psychomotor: 'Psikomotor',
    resilience: 'Ketangguhan',
    projective: 'Proyektif',
    learning: 'Gaya Belajar',
    integrity: 'Integritas',
    work: 'Perilaku Kerja',
    autoScore: 'Auto Skor',
    questions: 'Pertanyaan',
    minutes: 'Menit',
    noTimeLimit: 'Tanpa Batas',
    testIntro: 'Petunjuk Tes',
    yourAnswer: 'Jawaban Anda',
    unanswered: 'Belum Dijawab',
    answered: 'Sudah Dijawab',
    confirmSubmit: 'Konfirmasi Pengiriman',
    confirmSubmitMsg: 'Anda yakin ingin mengirim jawaban?',
    score: 'Skor',
    interpretation: 'Interpretasi',
    recommendation: 'Rekomendasi',
    profileData: 'Data Peserta',
    sessionName: 'Nama Sesi',
    addParticipant: 'Tambah Peserta',
    participants: 'Peserta',
    selectTests: 'Pilih Tes',
    timeRemaining: 'Sisa Waktu',
    testComplete: 'Tes Selesai',
    backToTests: 'Kembali ke Daftar Tes',
    backToDash: 'Kembali ke Dasbor',
    noSessions: 'Belum ada sesi',
    createFirst: 'Buat sesi pertama Anda',
    high: 'Tinggi',
    medium: 'Sedang',
    low: 'Rendah',
    testProgress: 'Kemajuan Tes',
    question: 'Soal',
    of: 'dari',
    yes: 'Ya',
    no: 'Tidak',
    langBtn: 'EN',
  },
  en: {
    appName: 'HR Psychology Portal',
    dashboard: 'Dashboard',
    tests: 'Test Catalog',
    sessions: 'Test Sessions',
    results: 'Results',
    sop: 'SOP Directory',
    settings: 'Settings',
    newSession: 'New Session',
    startTest: 'Start Test',
    submitTest: 'Submit Answers',
    viewResult: 'View Result',
    next: 'Next',
    prev: 'Previous',
    finish: 'Finish',
    cancel: 'Cancel',
    close: 'Close',
    save: 'Save',
    print: 'Print',
    export: 'Export',
    delete: 'Delete',
    edit: 'Edit',
    name: 'Name',
    age: 'Age',
    gender: 'Gender',
    education: 'Education',
    position: 'Position',
    testDate: 'Test Date',
    male: 'Male',
    female: 'Female',
    totalTests: 'Total Tests',
    totalSessions: 'Total Sessions',
    completedTests: 'Completed Tests',
    activeSession: 'Active Session',
    intelligence: 'Intelligence',
    personality: 'Personality',
    interest: 'Interest',
    clinical: 'Clinical',
    leadership: 'Leadership',
    psychomotor: 'Psychomotor',
    resilience: 'Resilience',
    projective: 'Projective',
    learning: 'Learning Style',
    integrity: 'Integrity',
    work: 'Work Behavior',
    autoScore: 'Auto Score',
    questions: 'Questions',
    minutes: 'Minutes',
    noTimeLimit: 'No Limit',
    testIntro: 'Test Instructions',
    yourAnswer: 'Your Answer',
    unanswered: 'Unanswered',
    answered: 'Answered',
    confirmSubmit: 'Confirm Submission',
    confirmSubmitMsg: 'Are you sure you want to submit your answers?',
    score: 'Score',
    interpretation: 'Interpretation',
    recommendation: 'Recommendation',
    profileData: 'Participant Data',
    sessionName: 'Session Name',
    addParticipant: 'Add Participant',
    participants: 'Participants',
    selectTests: 'Select Tests',
    timeRemaining: 'Time Remaining',
    testComplete: 'Test Complete',
    backToTests: 'Back to Test Catalog',
    backToDash: 'Back to Dashboard',
    noSessions: 'No sessions yet',
    createFirst: 'Create your first session',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    testProgress: 'Test Progress',
    question: 'Question',
    of: 'of',
    yes: 'Yes',
    no: 'No',
    langBtn: 'ID',
  }
};

let currentLang = localStorage.getItem('lang') || 'id';

function t(key) {
  return LANG[currentLang][key] || LANG.id[key] || key;
}

function toggleLang() {
  currentLang = currentLang === 'id' ? 'en' : 'id';
  localStorage.setItem('lang', currentLang);
  App.render();
}

// ── ROUTER ───────────────────────────────────────────
const ROUTES = {
  dashboard: renderDashboard,
  tests: renderTestCatalog,
  sessions: renderSessions,
  results: renderResults,
  sop: renderSOP,
};

let currentRoute = 'dashboard';
let currentTestId = null;
let currentTestData = null;

function navigate(route, params = {}) {
  currentRoute = route;
  if (params.testId) currentTestId = params.testId;
  App.render();
  window.scrollTo(0, 0);
}

// ── STORAGE ──────────────────────────────────────────
const DB = {
  get(key) {
    try { return JSON.parse(localStorage.getItem('hrp_' + key)) || null; }
    catch { return null; }
  },
  set(key, val) {
    localStorage.setItem('hrp_' + key, JSON.stringify(val));
  },
  getSessions() { return this.get('sessions') || []; },
  saveSessions(s) { this.set('sessions', s); },
  getResults() { return this.get('results') || []; },
  saveResults(r) { this.set('results', r); },
  addResult(result) {
    const results = this.getResults();
    result.id = Date.now().toString();
    result.date = new Date().toISOString();
    results.unshift(result);
    this.saveResults(results);
    return result;
  }
};

// ── ACTIVE TEST SESSION ──────────────────────────────
let activeTest = null; // { testId, participant, answers, startTime, timerInterval }

// ── APP SHELL ────────────────────────────────────────
const App = {
  init() {
    this.renderShell();
    this.render();
  },

  renderShell() {
    document.getElementById('app').innerHTML = `
      <header class="app-header">
        <a class="app-logo" href="#" onclick="navigate('dashboard');return false;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="1"/>
            <path d="M9 12h6M9 16h4"/>
          </svg>
          <span data-t="appName"></span>
        </a>
        <nav class="app-nav">
          <button class="nav-btn" onclick="navigate('dashboard')" data-route="dashboard">
            🏠 <span data-t="dashboard"></span>
          </button>
          <button class="nav-btn" onclick="navigate('tests')" data-route="tests">
            📋 <span data-t="tests"></span>
          </button>
          <button class="nav-btn" onclick="navigate('sessions')" data-route="sessions">
            👥 <span data-t="sessions"></span>
          </button>
          <button class="nav-btn" onclick="navigate('results')" data-route="results">
            📊 <span data-t="results"></span>
          </button>
          <button class="nav-btn" onclick="navigate('sop')" data-route="sop">
            📂 <span data-t="sop"></span>
          </button>
        </nav>
        <button class="lang-toggle" onclick="toggleLang()" data-t="langBtn"></button>
      </header>
      <div class="app-layout">
        <aside class="sidebar" id="sidebar"></aside>
        <main class="main-content" id="main-content"></main>
      </div>
    `;
  },

  render() {
    // Update nav active state
    document.querySelectorAll('[data-route]').forEach(el => {
      el.classList.toggle('active', el.dataset.route === currentRoute);
    });

    // Update translations in shell
    document.querySelectorAll('[data-t]').forEach(el => {
      el.textContent = t(el.dataset.t);
    });

    // Render sidebar
    this.renderSidebar();

    // Render main content
    const main = document.getElementById('main-content');
    if (currentRoute === 'test-active') {
      renderActiveTest(main);
    } else if (currentRoute === 'test-result') {
      renderTestResult(main);
    } else {
      const fn = ROUTES[currentRoute];
      if (fn) fn(main);
    }
  },

  renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    const tests = TEST_CATALOG;
    const categories = [...new Set(tests.map(t => t.category))];

    sidebar.innerHTML = `
      <div class="sidebar-section">
        <div class="sidebar-label">Menu</div>
        ${[
          {route:'dashboard', icon:'🏠', label: t('dashboard')},
          {route:'tests', icon:'📋', label: t('tests')},
          {route:'sessions', icon:'👥', label: t('sessions')},
          {route:'results', icon:'📊', label: t('results')},
          {route:'sop', icon:'📂', label: t('sop')},
        ].map(item => `
          <button class="sidebar-link ${currentRoute === item.route ? 'active' : ''}"
            onclick="navigate('${item.route}')">
            <span>${item.icon}</span><span>${item.label}</span>
          </button>
        `).join('')}
      </div>
      <div class="sidebar-section">
        <div class="sidebar-label">Kategori Tes</div>
        ${categories.map(cat => `
          <button class="sidebar-link" onclick="navigate('tests'); setTimeout(()=>filterCategory('${cat}'), 50)">
            <span style="font-size:.7rem">●</span>
            <span style="font-size:.8rem">${getCatLabel(cat)}</span>
            <span class="sidebar-badge">${tests.filter(t=>t.category===cat).length}</span>
          </button>
        `).join('')}
      </div>
    `;
  }
};

function getCatLabel(cat) {
  const map = {
    intelligence: t('intelligence'), personality: t('personality'),
    interest: t('interest'), clinical: t('clinical'), leadership: t('leadership'),
    psychomotor: t('psychomotor'), resilience: t('resilience'), projective: t('projective'),
    learning: t('learning'), integrity: t('integrity'), work: t('work')
  };
  return map[cat] || cat;
}

// ── DASHBOARD ────────────────────────────────────────
function renderDashboard(el) {
  const sessions = DB.getSessions();
  const results = DB.getResults();
  const activeSessions = sessions.filter(s => s.status === 'active');

  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-icon">🧠</div>
      <div>
        <h1>${t('appName')}</h1>
        <p>${currentLang === 'id' ? 'Sistem Manajemen Tes Psikologi HR' : 'HR Psychology Test Management System'}</p>
      </div>
      <button class="btn btn-primary" style="margin-left:auto" onclick="navigate('sessions')">
        + ${t('newSession')}
      </button>
    </div>

    <div class="stats-grid">
      ${statCard('📋', TEST_CATALOG.length, t('totalTests'), '#dbeafe', '#1d4ed8')}
      ${statCard('👥', sessions.length, t('totalSessions'), '#d1fae5', '#065f46')}
      ${statCard('✅', results.length, t('completedTests'), '#fce7f3', '#9d174d')}
      ${statCard('🔴', activeSessions.length, t('activeSession'), '#fee2e2', '#991b1b')}
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-header">
          <span class="card-title">📋 ${currentLang === 'id' ? 'Tes Terbaru' : 'Recent Tests'}</span>
          <button class="btn btn-sm btn-secondary" onclick="navigate('results')">${currentLang === 'id' ? 'Lihat Semua' : 'View All'}</button>
        </div>
        <div class="card-body">
          ${results.length === 0 ? `<p class="text-muted text-sm">${currentLang === 'id' ? 'Belum ada hasil tes' : 'No test results yet'}</p>` :
            results.slice(0, 5).map(r => `
              <div class="flex items-center justify-between" style="padding:.5rem 0;border-bottom:1px solid var(--border)">
                <div>
                  <div class="font-semibold text-sm">${r.participant?.name || '-'}</div>
                  <div class="text-xs text-muted">${getTestName(r.testId)} · ${new Date(r.date).toLocaleDateString('id-ID')}</div>
                </div>
                <button class="btn btn-sm btn-primary" onclick="showResult('${r.id}')">${t('viewResult')}</button>
              </div>
            `).join('')
          }
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">📊 ${currentLang === 'id' ? 'Distribusi Tes' : 'Test Distribution'}</span>
        </div>
        <div class="card-body">
          ${['intelligence','personality','interest','clinical','leadership','psychomotor','resilience','learning','integrity','work','projective'].map(cat => {
            const count = TEST_CATALOG.filter(t => t.category === cat).length;
            const pct = Math.round(count / TEST_CATALOG.length * 100);
            return `
              <div class="scale-bar-row" style="margin-bottom:.5rem">
                <div class="scale-bar-label"><span>${getCatLabel(cat)}</span><span>${count}</span></div>
                <div class="scale-bar"><div class="scale-bar-fill" style="width:${pct*2}%"></div></div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span class="card-title">🚀 ${currentLang === 'id' ? 'Mulai Tes Cepat' : 'Quick Start Test'}</span>
      </div>
      <div class="card-body">
        <div class="test-grid">
          ${TEST_CATALOG.slice(0,8).map(test => testCardHtml(test)).join('')}
        </div>
      </div>
    </div>
  `;
}

function statCard(icon, value, label, bg, color) {
  return `
    <div class="stat-card">
      <div class="stat-card-icon" style="background:${bg};color:${color}">${icon}</div>
      <div class="stat-card-value" style="color:${color}">${value}</div>
      <div class="stat-card-label">${label}</div>
    </div>
  `;
}

// ── TEST CATALOG ─────────────────────────────────────
let currentFilter = 'all';

function filterCategory(cat) {
  currentFilter = cat;
  App.render();
}

function renderTestCatalog(el) {
  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-icon">📋</div>
      <div><h1>${t('tests')}</h1>
      <p>${currentLang === 'id' ? `${TEST_CATALOG.length} tes tersedia` : `${TEST_CATALOG.length} tests available`}</p></div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="flex gap-2" style="flex-wrap:wrap">
          <button class="btn btn-sm ${currentFilter==='all'?'btn-primary':'btn-secondary'}" onclick="currentFilter='all';App.render()">
            ${currentLang === 'id' ? 'Semua' : 'All'}
          </button>
          ${['intelligence','personality','interest','clinical','leadership','psychomotor','resilience','learning','integrity','work','projective'].map(cat => `
            <button class="btn btn-sm ${currentFilter===cat?'btn-primary':'btn-secondary'}" onclick="currentFilter='${cat}';App.render()">
              ${getCatLabel(cat)}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="card-body">
        <div class="test-grid">
          ${TEST_CATALOG.filter(t => currentFilter === 'all' || t.category === currentFilter)
            .map(test => testCardHtml(test)).join('')}
        </div>
      </div>
    </div>
  `;
}

function testCardHtml(test) {
  return `
    <div class="test-card" onclick="startTestFlow('${test.id}')">
      <span class="test-card-badge badge-${test.category}">${getCatLabel(test.category)}</span>
      <div class="test-card-name">${test.name}</div>
      <div class="test-card-desc">${currentLang === 'id' ? (test.descId || test.desc) : (test.desc || test.descId)}</div>
      <div class="test-card-meta">
        <span>📝 ${test.items} ${t('questions')}</span>
        <span>⏱ ${test.timeLimit ? test.timeLimit + ' ' + t('minutes') : t('noTimeLimit')}</span>
        ${test.autoScore ? `<span class="test-card-auto">✓ ${t('autoScore')}</span>` : ''}
      </div>
    </div>
  `;
}

function getTestName(testId) {
  const t = TEST_CATALOG.find(t => t.id === testId);
  return t ? t.name : testId;
}

// ── START TEST FLOW ───────────────────────────────────
function startTestFlow(testId) {
  const test = TEST_CATALOG.find(t => t.id === testId);
  if (!test) return;
  currentTestId = testId;
  currentTestData = test;
  showParticipantModal(testId);
}

function showParticipantModal(testId) {
  const test = TEST_CATALOG.find(t => t.id === testId);
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'participant-modal';
  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <span class="font-bold">📝 ${test.name} — ${t('profileData')}</span>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="modal-body">
        <div class="alert alert-info mb-3">
          <span>ℹ️</span>
          <div>${currentLang === 'id' ? `${test.items} pertanyaan${test.timeLimit ? ', batas waktu ' + test.timeLimit + ' menit' : ', tanpa batas waktu'}` : `${test.items} items${test.timeLimit ? ', time limit ' + test.timeLimit + ' min' : ', no time limit'}`}</div>
        </div>
        <div style="display:grid;gap:.75rem">
          <div class="form-group">
            <label class="form-label">👤 ${t('name')} *</label>
            <input class="form-control" id="p-name" placeholder="${currentLang === 'id' ? 'Nama lengkap' : 'Full name'}" required>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
            <div class="form-group">
              <label class="form-label">🎂 ${t('age')}</label>
              <input class="form-control" id="p-age" type="number" min="15" max="80" placeholder="tahun">
            </div>
            <div class="form-group">
              <label class="form-label">⚧ ${t('gender')}</label>
              <select class="form-control" id="p-gender">
                <option value="">--</option>
                <option value="L">${t('male')}</option>
                <option value="P">${t('female')}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">🎓 ${t('education')}</label>
            <select class="form-control" id="p-edu">
              <option value="">--</option>
              <option>SD/SMP</option><option>SMA/SMK</option><option>D3</option>
              <option>S1</option><option>S2</option><option>S3</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">💼 ${t('position')}</label>
            <input class="form-control" id="p-pos" placeholder="${currentLang === 'id' ? 'Jabatan / Posisi yang dilamar' : 'Position / Applied position'}">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">${t('cancel')}</button>
        <button class="btn btn-primary" onclick="beginTest('${testId}')">🚀 ${t('startTest')}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeModal() {
  const m = document.getElementById('participant-modal');
  if (m) m.remove();
}

function beginTest(testId) {
  const name = document.getElementById('p-name').value.trim();
  if (!name) { alert(currentLang === 'id' ? 'Nama harus diisi!' : 'Name is required!'); return; }

  const participant = {
    name,
    age: document.getElementById('p-age').value,
    gender: document.getElementById('p-gender').value,
    education: document.getElementById('p-edu').value,
    position: document.getElementById('p-pos').value,
  };

  const test = TEST_CATALOG.find(t => t.id === testId);
  activeTest = {
    testId,
    test,
    participant,
    answers: {},
    currentQ: 0,
    startTime: Date.now(),
    timerInterval: null,
  };

  closeModal();
  currentRoute = 'test-active';
  App.render();
}

// ── ACTIVE TEST RENDERER ─────────────────────────────
function renderActiveTest(el) {
  if (!activeTest) { navigate('tests'); return; }
  const { test, participant, answers, currentQ } = activeTest;
  const questions = test.getQuestions();
  const q = questions[currentQ];
  const total = questions.length;
  const answered = Object.keys(answers).length;
  const pct = Math.round(answered / total * 100);

  // Setup timer
  if (test.timeLimit && !activeTest.timerInterval) {
    activeTest.endTime = activeTest.startTime + test.timeLimit * 60 * 1000;
    activeTest.timerInterval = setInterval(updateTimer, 500);
  }

  el.innerHTML = `
    ${test.timeLimit ? `
      <div class="timer-bar" id="timer-bar">
        <div class="timer-display" id="timer-display">--:--</div>
        <div class="timer-track"><div class="timer-fill" id="timer-fill" style="width:100%"></div></div>
        <span class="text-sm text-muted">${t('timeRemaining')}</span>
      </div>
    ` : ''}

    <div class="page-header">
      <div class="page-header-icon">${test.icon || '📝'}</div>
      <div>
        <h1>${test.name}</h1>
        <p>${participant.name} · ${new Date().toLocaleDateString('id-ID')}</p>
      </div>
      <button class="btn btn-secondary no-print" style="margin-left:auto" onclick="confirmAbort()">✕ ${t('cancel')}</button>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="progress-wrap" style="flex:1">
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
          <div class="progress-label">${answered}/${total}</div>
        </div>
      </div>
    </div>

    <div id="question-area">
      ${renderQuestion(q, currentQ, answers)}
    </div>

    <div class="flex justify-between items-center no-print" style="margin-top:1rem">
      <button class="btn btn-secondary" onclick="prevQuestion()" ${currentQ === 0 ? 'disabled' : ''}>
        ← ${t('prev')}
      </button>
      <span class="text-sm text-muted">${t('question')} ${currentQ + 1} ${t('of')} ${total}</span>
      ${currentQ < total - 1
        ? `<button class="btn btn-primary" onclick="nextQuestion()"> ${t('next')} →</button>`
        : `<button class="btn btn-success" onclick="submitTest()">✓ ${t('submitTest')}</button>`
      }
    </div>

    <div class="card" style="margin-top:1rem">
      <div class="card-header"><span class="card-title">🗺 ${currentLang==='id'?'Navigasi Soal':'Question Navigator'}</span></div>
      <div class="card-body" style="display:flex;flex-wrap:wrap;gap:.35rem">
        ${questions.map((_, i) => `
          <button onclick="jumpTo(${i})" style="
            width:36px;height:36px;border-radius:6px;border:2px solid;font-size:.8rem;font-weight:700;cursor:pointer;
            border-color:${i===currentQ?'var(--primary)':answers[i]!==undefined?'var(--secondary)':'var(--border)'};
            background:${i===currentQ?'var(--primary)':answers[i]!==undefined?'var(--primary-light)':'transparent'};
            color:${i===currentQ?'#fff':answers[i]!==undefined?'var(--primary)':'var(--text3)'};
          ">${i+1}</button>
        `).join('')}
      </div>
    </div>
  `;

  if (test.timeLimit) updateTimer();
}

function renderQuestion(q, idx, answers) {
  if (!q) return '<p>No question</p>';
  const current = answers[idx];

  if (q.type === 'choice') {
    return `
      <div class="question-block">
        <div class="question-number">${t('question')} ${idx + 1}</div>
        <div class="question-text">${q.text}</div>
        <div class="options-list">
          ${q.options.map((opt, oi) => `
            <div class="option-item ${current === oi ? 'selected' : ''}" onclick="selectAnswer(${idx},${oi})">
              <input type="radio" name="q${idx}" ${current === oi ? 'checked' : ''} readonly>
              <label>${opt}</label>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (q.type === 'yn') {
    return `
      <div class="question-block">
        <div class="question-number">${t('question')} ${idx + 1}</div>
        <div class="question-text">${q.text}</div>
        <div class="options-list">
          <div class="option-item ${current === 1 ? 'selected' : ''}" onclick="selectAnswer(${idx},1)">
            <input type="radio" name="q${idx}" ${current === 1 ? 'checked' : ''} readonly>
            <label>✓ ${t('yes')}</label>
          </div>
          <div class="option-item ${current === 0 ? 'selected' : ''}" onclick="selectAnswer(${idx},0)">
            <input type="radio" name="q${idx}" ${current === 0 ? 'checked' : ''} readonly>
            <label>✗ ${t('no')}</label>
          </div>
        </div>
      </div>
    `;
  }

  if (q.type === 'likert') {
    return `
      <div class="question-block">
        <div class="question-number">${t('question')} ${idx + 1}</div>
        <div class="question-text">${q.text}</div>
        <div class="options-list">
          ${(q.options || ['Sangat Tidak Setuju','Tidak Setuju','Netral','Setuju','Sangat Setuju']).map((opt, oi) => `
            <div class="option-item ${current === oi + 1 ? 'selected' : ''}" onclick="selectAnswer(${idx},${oi+1})">
              <input type="radio" name="q${idx}" ${current === oi + 1 ? 'checked' : ''} readonly>
              <label>${opt}</label>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (q.type === 'paired') {
    return `
      <div class="question-block">
        <div class="question-number">${t('question')} ${idx + 1}</div>
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:1rem;align-items:center">
          <div class="option-item ${current === 'a' ? 'selected' : ''}" onclick="selectAnswer(${idx},'a')" style="flex-direction:column">
            <input type="radio" name="q${idx}" ${current === 'a' ? 'checked' : ''} readonly>
            <label style="text-align:center">A: ${q.a}</label>
          </div>
          <div style="font-weight:800;color:var(--text3)">VS</div>
          <div class="option-item ${current === 'b' ? 'selected' : ''}" onclick="selectAnswer(${idx},'b')" style="flex-direction:column">
            <input type="radio" name="q${idx}" ${current === 'b' ? 'checked' : ''} readonly>
            <label style="text-align:center">B: ${q.b}</label>
          </div>
        </div>
      </div>
    `;
  }

  return `<div class="question-block"><div class="question-text">${q.text}</div></div>`;
}

function selectAnswer(idx, val) {
  activeTest.answers[idx] = val;
  renderActiveTest(document.getElementById('main-content'));
}

function nextQuestion() {
  const total = activeTest.test.getQuestions().length;
  if (activeTest.currentQ < total - 1) {
    activeTest.currentQ++;
    renderActiveTest(document.getElementById('main-content'));
    window.scrollTo(0, 0);
  }
}
function prevQuestion() {
  if (activeTest.currentQ > 0) {
    activeTest.currentQ--;
    renderActiveTest(document.getElementById('main-content'));
    window.scrollTo(0, 0);
  }
}
function jumpTo(idx) {
  activeTest.currentQ = idx;
  renderActiveTest(document.getElementById('main-content'));
  window.scrollTo(0, 0);
}

function updateTimer() {
  if (!activeTest || !activeTest.endTime) return;
  const remaining = Math.max(0, activeTest.endTime - Date.now());
  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);
  const disp = document.getElementById('timer-display');
  const fill = document.getElementById('timer-fill');
  if (!disp) { clearInterval(activeTest.timerInterval); return; }

  const totalMs = activeTest.test.timeLimit * 60000;
  const pct = remaining / totalMs * 100;

  disp.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  if (fill) fill.style.width = pct + '%';

  disp.className = 'timer-display';
  if (remaining < 60000) disp.classList.add('danger');
  else if (remaining < 180000) disp.classList.add('warning');

  if (remaining <= 0) {
    clearInterval(activeTest.timerInterval);
    submitTest(true);
  }
}

function confirmAbort() {
  if (confirm(currentLang === 'id' ? 'Batalkan tes? Semua jawaban akan hilang.' : 'Cancel test? All answers will be lost.')) {
    if (activeTest?.timerInterval) clearInterval(activeTest.timerInterval);
    activeTest = null;
    navigate('tests');
  }
}

function submitTest(autoSubmit = false) {
  if (!autoSubmit) {
    const total = activeTest.test.getQuestions().length;
    const answered = Object.keys(activeTest.answers).length;
    const unanswered = total - answered;
    if (unanswered > 0) {
      if (!confirm(`${unanswered} ${currentLang==='id'?'soal belum dijawab. Lanjutkan?':'items unanswered. Continue anyway?'}`)) return;
    }
  }
  if (activeTest.timerInterval) clearInterval(activeTest.timerInterval);

  // Score the test
  const result = activeTest.test.score(activeTest.answers, activeTest.participant);
  result.testId = activeTest.testId;
  result.participant = activeTest.participant;
  result.duration = Math.round((Date.now() - activeTest.startTime) / 1000);

  const saved = DB.addResult(result);
  activeTest = null;
  currentTestData = saved;
  currentRoute = 'test-result';
  App.render();
}

// ── TEST RESULT ───────────────────────────────────────
function renderTestResult(el) {
  const result = currentTestData;
  if (!result) { navigate('results'); return; }
  const test = TEST_CATALOG.find(t => t.id === result.testId);

  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-icon">🏆</div>
      <div>
        <h1>${t('testComplete')} — ${test?.name || result.testId}</h1>
        <p>${result.participant?.name} · ${new Date(result.date).toLocaleDateString('id-ID')}</p>
      </div>
      <div style="margin-left:auto;display:flex;gap:.5rem">
        <button class="btn btn-secondary no-print" onclick="window.print()">🖨 ${t('print')}</button>
        <button class="btn btn-primary no-print" onclick="navigate('tests')">← ${t('backToTests')}</button>
      </div>
    </div>

    ${test?.renderResult ? test.renderResult(result) : defaultResultRender(result)}

    <div class="card no-print" style="margin-top:1rem">
      <div class="card-body flex gap-2">
        <button class="btn btn-primary" onclick="navigate('tests')">📋 ${t('backToTests')}</button>
        <button class="btn btn-secondary" onclick="navigate('results')">📊 ${t('results')}</button>
        <button class="btn btn-secondary" onclick="window.print()">🖨 ${t('print')}</button>
      </div>
    </div>
  `;
}

function defaultResultRender(result) {
  return `
    <div class="result-header">
      <div class="result-type">${result.type || result.category || '—'}</div>
      <div class="result-score">${t('score')}: ${result.score ?? '—'}</div>
    </div>
    <div class="card" style="margin-top:1rem">
      <div class="card-header"><span class="card-title">📋 ${t('interpretation')}</span></div>
      <div class="card-body">${result.interpretation || '—'}</div>
    </div>
  `;
}

function showResult(id) {
  const results = DB.getResults();
  currentTestData = results.find(r => r.id === id);
  currentRoute = 'test-result';
  App.render();
}

// ── SESSIONS PAGE ─────────────────────────────────────
function renderSessions(el) {
  const sessions = DB.getSessions();

  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-icon">👥</div>
      <div><h1>${t('sessions')}</h1>
      <p>${sessions.length} ${currentLang==='id'?'sesi tersimpan':'sessions saved'}</p></div>
      <button class="btn btn-primary" style="margin-left:auto" onclick="showNewSessionModal()">+ ${t('newSession')}</button>
    </div>

    ${sessions.length === 0 ? `
      <div class="card"><div class="card-body text-center" style="padding:3rem">
        <div style="font-size:3rem">📋</div>
        <p class="font-bold" style="margin:.5rem 0">${t('noSessions')}</p>
        <p class="text-muted text-sm">${t('createFirst')}</p>
        <button class="btn btn-primary" style="margin-top:1rem" onclick="showNewSessionModal()">+ ${t('newSession')}</button>
      </div></div>
    ` : `
      <div class="card">
        <table class="data-table">
          <thead><tr>
            <th>${t('sessionName')}</th>
            <th>${t('participants')}</th>
            <th>Status</th>
            <th>${t('testDate')}</th>
            <th></th>
          </tr></thead>
          <tbody>
            ${sessions.map(s => `
              <tr>
                <td class="font-semibold">${s.name}</td>
                <td>${s.participants?.length || 0}</td>
                <td><span class="pill ${s.status==='active'?'pill-green':'pill-gray'}">${s.status==='active'?'Aktif':'Selesai'}</span></td>
                <td class="text-sm text-muted">${new Date(s.createdAt).toLocaleDateString('id-ID')}</td>
                <td>
                  <button class="btn btn-sm btn-primary" onclick="openSession('${s.id}')">Buka</button>
                  <button class="btn btn-sm btn-danger" onclick="deleteSession('${s.id}')">✕</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `}
  `;
}

function showNewSessionModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'participant-modal';
  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <span class="font-bold">👥 ${t('newSession')}</span>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="modal-body" style="display:flex;flex-direction:column;gap:.75rem">
        <div class="form-group">
          <label class="form-label">${t('sessionName')} *</label>
          <input class="form-control" id="sess-name" placeholder="${currentLang==='id'?'misal: Rekrutmen Batch 2026':'e.g. Recruitment Batch 2026'}">
        </div>
        <div class="form-group">
          <label class="form-label">${t('participants')} (${currentLang==='id'?'nama, satu per baris':'names, one per line'})</label>
          <textarea class="form-control" id="sess-pax" rows="4" placeholder="Ahmad Fauzi&#10;Siti Rahayu&#10;Budi Santoso"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">${t('cancel')}</button>
        <button class="btn btn-primary" onclick="createSession()">✓ ${t('save')}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function createSession() {
  const name = document.getElementById('sess-name').value.trim();
  if (!name) { alert('Nama sesi harus diisi!'); return; }
  const paxText = document.getElementById('sess-pax').value.trim();
  const participants = paxText ? paxText.split('\n').map(n => n.trim()).filter(Boolean).map(n => ({name: n})) : [];

  const sessions = DB.getSessions();
  sessions.unshift({
    id: Date.now().toString(),
    name,
    participants,
    status: 'active',
    createdAt: new Date().toISOString(),
  });
  DB.saveSessions(sessions);
  closeModal();
  App.render();
}

function deleteSession(id) {
  if (!confirm(currentLang==='id'?'Hapus sesi ini?':'Delete this session?')) return;
  const sessions = DB.getSessions().filter(s => s.id !== id);
  DB.saveSessions(sessions);
  App.render();
}

function openSession(id) {
  navigate('tests');
}

// ── RESULTS PAGE ──────────────────────────────────────
function renderResults(el) {
  const results = DB.getResults();

  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-icon">📊</div>
      <div><h1>${t('results')}</h1>
      <p>${results.length} ${currentLang==='id'?'hasil tersimpan':'results saved'}</p></div>
      <button class="btn btn-secondary no-print" style="margin-left:auto" onclick="window.print()">🖨 ${t('print')}</button>
    </div>

    ${results.length === 0 ? `
      <div class="card"><div class="card-body text-center" style="padding:3rem">
        <div style="font-size:3rem">📊</div>
        <p class="font-bold">Belum ada hasil tes</p>
        <button class="btn btn-primary" style="margin-top:1rem" onclick="navigate('tests')">Mulai Tes</button>
      </div></div>
    ` : `
      <div class="card">
        <table class="data-table">
          <thead><tr>
            <th>${t('name')}</th>
            <th>Tes</th>
            <th>Hasil</th>
            <th>Skor</th>
            <th>${t('testDate')}</th>
            <th></th>
          </tr></thead>
          <tbody>
            ${results.map(r => `
              <tr>
                <td class="font-semibold">${r.participant?.name || '-'}</td>
                <td>${getTestName(r.testId)}</td>
                <td><span class="pill pill-blue">${r.type || r.category || '-'}</span></td>
                <td>${r.score ?? '-'}</td>
                <td class="text-sm text-muted">${new Date(r.date).toLocaleDateString('id-ID')}</td>
                <td>
                  <button class="btn btn-sm btn-primary" onclick="showResult('${r.id}')">${t('viewResult')}</button>
                  <button class="btn btn-sm btn-danger" onclick="deleteResult('${r.id}')">✕</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `}
  `;
}

function deleteResult(id) {
  if (!confirm(currentLang==='id'?'Hapus hasil ini?':'Delete this result?')) return;
  const results = DB.getResults().filter(r => r.id !== id);
  DB.saveResults(results);
  App.render();
}

// ── SOP PAGE ──────────────────────────────────────────
function renderSOP(el) {
  el.innerHTML = `
    <div class="page-header">
      <div class="page-header-icon">📂</div>
      <div><h1>${t('sop')}</h1>
      <p>${currentLang==='id'?'Standar Operasional Prosedur SDM':'Human Resources Standard Operating Procedures'}</p>
      </div>
    </div>

    <div class="card">
      <div class="card-header"><span class="card-title">📋 Daftar SOP SDM / HR SOP List</span></div>
      <div class="card-body">
        ${SOP_DATA.map(sop => `
          <div style="border:1px solid var(--border);border-radius:8px;padding:1rem;margin-bottom:.75rem;cursor:pointer;transition:all .2s"
            onclick="toggleSOP(this)" onmouseenter="this.style.borderColor='var(--primary)'" onmouseleave="this.style.borderColor='var(--border)'">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-bold">${sop.code} — ${sop.title}</div>
                <div class="text-xs text-muted" style="margin-top:.2rem">${sop.subtitle}</div>
              </div>
              <span style="font-size:1.2rem">▼</span>
            </div>
            <div class="sop-content hidden" style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border);font-size:.88rem;line-height:1.6">
              ${sop.content}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function toggleSOP(el) {
  const content = el.querySelector('.sop-content');
  const arrow = el.querySelector('span:last-child');
  content.classList.toggle('hidden');
  arrow.textContent = content.classList.contains('hidden') ? '▼' : '▲';
}

// ── BOOT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => App.init());
