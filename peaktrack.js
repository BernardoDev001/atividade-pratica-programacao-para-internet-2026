 /* ─── Data ─────────────────────────────────────── */
  const PRs = [
    { type:'run',  icon:'ti-run',              tag:'CORRIDA',     value:"4'38\"",  label:'Pace 1 km',               date:'12 mai 2025' },
    { type:'run',  icon:'ti-road',             tag:'CORRIDA',     value:'21,3 km', label:'Maior distância',          date:'3 abr 2025'  },
    { type:'run',  icon:'ti-clock',            tag:'CORRIDA',     value:"58'21\"", label:'Melhor 10 km',             date:'20 abr 2025' },
    { type:'run',  icon:'ti-heart-rate-monitor',tag:'FC',         value:'182 bpm', label:'FC máxima registrada',     date:'12 mai 2025' },
    { type:'lift', icon:'ti-barbell',          tag:'SUPINO',      value:'130 kg',  label:'1RM estimado',             date:'8 mai 2025'  },
    { type:'lift', icon:'ti-arrow-down',       tag:'AGACHAMENTO', value:'180 kg',  label:'1RM estimado',             date:'15 mai 2025' },
    { type:'lift', icon:'ti-arrow-up',         tag:'LEVANTAMENTO',value:'210 kg',  label:'Levant. terra — 1RM',      date:'2 mai 2025'  },
    { type:'lift', icon:'ti-trending-up',      tag:'VOLUME',      value:'18.400',  label:'Maior volume sessão (kg)', date:'10 mar 2025' },
    { type:'bike', icon:'ti-bike',             tag:'DISTÂNCIA',   value:'47,2 km', label:'Maior distância',          date:'19 mai 2025' },
    { type:'bike', icon:'ti-bolt',             tag:'VELOCIDADE',  value:'34,1 km/h',label:'Velocidade máx.',          date:'19 mai 2025' },
  ];

  const Activities = [
    { type:'lift', icon:'ai-lift', name:'Upper A — Peito + Ombro', meta:'Hoje · 58 min · 6 exercícios', primary:'8.420', secondary:'kg volume', pr: true  },
    { type:'run',  icon:'ai-run',  name:'Corridinha da manhã',      meta:'Ontem · 42 min',              primary:'8,7 km', secondary:'4\'49"/km', pr: false },
    { type:'lift', icon:'ai-lift', name:'Lower — Agachamento foco', meta:'18 mai · 1h 05 min',          primary:'12.600', secondary:'kg volume', pr: false },
    { type:'bike', icon:'ai-bike', name:'Pedal longo',              meta:'19 mai · 1h 44 min',          primary:'47,2 km', secondary:'27,1 km/h', pr: true },
    { type:'run',  icon:'ai-run',  name:'Fartlek 5km',              meta:'17 mai · 28 min',             primary:'5,0 km', secondary:'5\'38"/km', pr: false },
  ];

  const barData = [
    { day:'Seg', run:0,  lift:62 },
    { day:'Ter', run:42, lift:0  },
    { day:'Qua', run:0,  lift:65 },
    { day:'Qui', run:0,  lift:0  },
    { day:'Sex', run:28, lift:0  },
    { day:'Sáb', run:0,  lift:104},
    { day:'Dom', run:44, lift:58 },
  ];

  /* ─── Render helpers ────────────────────────────── */
  function colorClass(type) {
    return { run:'c-run', lift:'c-lift', bike:'c-bike' }[type] || 'c-run';
  }

  function iconClass(type) {
    return { run:'ti-run', lift:'ti-barbell', bike:'ti-bike' }[type];
  }

  function makePRCard(pr) {
    return `<div class="pr-card ${colorClass(pr.type)}">
      <div class="pr-head">
        <div class="pr-icon"><i class="ti ${pr.icon}"></i></div>
        <span class="pr-tag">${pr.tag}</span>
      </div>
      <div class="pr-value">${pr.value}</div>
      <div class="pr-label">${pr.label}</div>
      <div class="pr-date"><i class="ti ti-calendar"></i> ${pr.date}</div>
    </div>`;
  }

  function makeActivityRow(a) {
    return `<div class="act-row">
      <div class="act-icon ${a.icon}"><i class="ti ${iconClass(a.type)}"></i></div>
      <div class="act-body">
        <div class="act-name">
          ${a.name}
          ${a.pr ? '<span class="new-pr-badge">NOVO PR</span>' : ''}
        </div>
        <div class="act-meta">${a.meta}</div>
      </div>
      <div class="act-right">
        <div class="act-primary">${a.primary}</div>
        <div class="act-secondary">${a.secondary}</div>
      </div>
      <i class="ti ti-chevron-right act-chevron"></i>
    </div>`;
  }

  function renderGrid(id, types) {
    const el = document.getElementById(id);
    if (!el) return;
    const filtered = types === 'all' ? PRs : PRs.filter(p => types.includes(p.type));
    el.innerHTML = filtered.map(makePRCard).join('');
  }

  function renderList(id, types) {
    const el = document.getElementById(id);
    if (!el) return;
    const filtered = types === 'all' ? Activities : Activities.filter(a => types.includes(a.type));
    el.innerHTML = filtered.length
      ? filtered.map(makeActivityRow).join('')
      : `<div class="empty"><i class="ti ti-clipboard-off"></i><p>Nenhuma atividade registrada ainda.</p></div>`;
  }

  /* ─── Bar chart ─────────────────────────────────── */
  function renderBarChart() {
    const max = Math.max(...barData.flatMap(d => [d.run, d.lift]));
    const chart = document.getElementById('barChart');
    if (!chart) return;
    chart.innerHTML = barData.map(d => {
      const rH = Math.round((d.run  / max) * 100);
      const lH = Math.round((d.lift / max) * 100);
      return `<div class="bar-group">
        <div class="bar-wrap">
          <div class="bar bar-run"  style="height:${rH}%" title="Corrida: ${d.run} min"></div>
          <div class="bar bar-lift" style="height:${lH}%" title="Musculação: ${d.lift} min"></div>
        </div>
        <div class="bar-day">${d.day}</div>
      </div>`;
    }).join('');
  }

  /* ─── Initial render ────────────────────────────── */
  renderGrid('pr-grid-all', 'all');
  renderGrid('pr-grid-corrida', ['run']);
  renderGrid('pr-grid-musculacao', ['lift']);
  renderGrid('pr-grid-bike', ['bike']);
  renderList('activity-list-all', 'all');
  renderList('activity-list-corrida', ['run']);
  renderList('activity-list-musculacao', ['lift']);
  renderList('activity-list-bike', ['bike']);
  renderBarChart();

  // Set today's date
  const today = new Date();
  const pad = n => String(n).padStart(2,'0');
  document.getElementById('input-date').value =
    `${pad(today.getDate())}/${pad(today.getMonth()+1)}/${today.getFullYear()}`;

  /* ─── Navigation ────────────────────────────────── */
  const panelNames = {
    geral: 'Painel geral',
    corrida: 'Corrida',
    musculacao: 'Musculação',
    bike: 'Bike',
  };

  function showPanel(name, navBtn) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + name).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (navBtn) navBtn.classList.add('active');
    document.getElementById('page-title').textContent = panelNames[name] || name;

    // sync tabs
    document.querySelectorAll('.tab-btn').forEach((t, i) => {
      const panels = ['geral','corrida','musculacao','bike'];
      t.classList.toggle('active', panels[i] === name);
    });
  }

  function switchTab(name, tabBtn) {
    showPanel(name, null);
    document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
    tabBtn.classList.add('active');

    // sync sidebar
    const sideMap = {geral: 0, corrida: 1, musculacao: 2, bike: 3};
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(n => n.classList.remove('active'));
    if (sideMap[name] !== undefined) navItems[sideMap[name]].classList.add('active');
    document.getElementById('page-title').textContent = panelNames[name] || name;
  }

  /* ─── Modal ─────────────────────────────────────── */
  let curType = null;

  function openModal() {
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
    resetModal();
  }

  function handleOverlay(e) {
    if (e.target === document.getElementById('modal')) closeModal();
  }

  function selType(t) {
    curType = t;
    ['run','lift','bike'].forEach(x => {
      document.getElementById('tb-' + x).className =
        'type-btn' + (x === t ? ' sel-' + x : '');
      document.getElementById('fs-' + x).style.display = x === t ? 'block' : 'none';
    });
    document.getElementById('fs-common').style.display = 'block';
    document.getElementById('btn-save').style.display  = 'block';
  }

  function resetModal() {
    curType = null;
    ['run','lift','bike'].forEach(x => {
      document.getElementById('tb-' + x).className = 'type-btn';
      document.getElementById('fs-' + x).style.display = 'none';
    });
    document.getElementById('fs-common').style.display = 'none';
    document.getElementById('btn-save').style.display  = 'none';
  }

  function saveWorkout() {
    if (!curType) return;
    closeModal();
    const labels = { run:'corrida', lift:'musculação', bike:'bike' };
    showToast(`Treino de ${labels[curType]} salvo! 🎉`);
  }

  /* ─── Toast ─────────────────────────────────────── */
  function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }

  /* ─── Keyboard ──────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });