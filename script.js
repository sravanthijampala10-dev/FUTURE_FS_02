
// ──────────────────────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────────────────────
const STATUSES = ['new','contacted','qualified','converted','lost'];
const SOURCES  = ['Contact Form','LinkedIn','Referral','Cold Email','Instagram','WhatsApp','Walk-in','Other'];

const STATUS_COLORS = {
  new:       {text:'#60a5fa', bg:'rgba(59,130,246,.12)',  bar:'#3b82f6'},
  contacted: {text:'#fbbf24', bg:'rgba(245,158,11,.1)',   bar:'#f59e0b'},
  qualified: {text:'#22d3ee', bg:'rgba(6,182,212,.1)',    bar:'#06b6d4'},
  converted: {text:'#34d399', bg:'rgba(16,185,129,.1)',   bar:'#10b981'},
  lost:      {text:'#f87171', bg:'rgba(239,68,68,.1)',    bar:'#ef4444'},
};

const AVATAR_COLORS = [
  {bg:'#1e3a5f',t:'#7eb8f5'},{bg:'#1a3d2e',t:'#5dcba0'},
  {bg:'#3d2010',t:'#e8935a'},{bg:'#2e1a38',t:'#c47de8'},
  {bg:'#1f3040',t:'#58b8d8'},{bg:'#3a2010',t:'#e8b45a'},
  {bg:'#1a2e1a',t:'#7ec87e'},{bg:'#3a1a2e',t:'#e87eb8'},
];

let leads = [
  {id:1,name:'Priya Nair',email:'priya@medhaven.com',company:'MedHaven',phone:'+91 98765 43210',source:'Contact Form',status:'new',date:'2026-05-12',notes:[{text:'Interested in Scopus indexing for 3 journals. Budget approval next month.',time:'12 May 2026, 02:30 PM'}]},
  {id:2,name:'Raj Mehta',email:'raj@quantumres.in',company:'Quantum Research',phone:'+91 87654 32109',source:'LinkedIn',status:'contacted',date:'2026-05-10',notes:[{text:'Sent intro email. Awaiting reply.',time:'11 May 2026, 10:00 AM'},{text:'Follow-up call scheduled Monday 2 PM.',time:'12 May 2026, 09:00 AM'}]},
  {id:3,name:'Ananya Singh',email:'ananya@clinicorps.com',company:'Clini Corps',phone:'+91 76543 21098',source:'Referral',status:'converted',date:'2026-05-08',notes:[{text:'Agreement signed. ₹45,000 received. Starting with 2 Scopus journals.',time:'09 May 2026, 03:45 PM'}]},
  {id:4,name:'Suresh Pillai',email:'suresh@biolabs.io',company:'BioLabs India',phone:'+91 65432 10987',source:'Cold Email',status:'new',date:'2026-05-11',notes:[]},
  {id:5,name:'Divya Krishnan',email:'divya@ayurpub.org',company:'AyurPub',phone:'+91 54321 09876',source:'Instagram',status:'contacted',date:'2026-05-09',notes:[{text:'Responded to DM. Wants PubMed indexing info sheet.',time:'09 May 2026, 06:00 PM'}]},
  {id:6,name:'Karthik Reddy',email:'karthik@neurolab.edu',company:'NeuroLab',phone:'+91 43210 98765',source:'Contact Form',status:'lost',date:'2026-05-07',notes:[{text:'Budget constraints. May revisit Q4 2026.',time:'08 May 2026, 11:20 AM'}]},
  {id:7,name:'Meera Joshi',email:'meera@pharmaindia.com',company:'Pharma India',phone:'+91 32109 87654',source:'Referral',status:'converted',date:'2026-05-05',notes:[{text:'Signed 2-year deal — 5 journals. ₹1.2L total.',time:'06 May 2026, 02:00 PM'}]},
  {id:8,name:'Arun Kumar',email:'arun@techmedpub.com',company:'TechMed Pub',phone:'+91 21098 76543',source:'Walk-in',status:'qualified',date:'2026-05-13',notes:[{text:'Met at ICMR conference. Highly interested in SCIE journals. Call next week.',time:'13 May 2026, 11:00 AM'}]},
  {id:9,name:'Lakshmi Varma',email:'lakshmi@dentaljournal.in',company:'Dental Journal India',phone:'+91 11098 76540',source:'WhatsApp',status:'new',date:'2026-05-13',notes:[]},
  {id:10,name:'Vishal Sharma',email:'vishal@cardiocare.org',company:'CardioCare',phone:'+91 99887 76655',source:'LinkedIn',status:'qualified',date:'2026-05-11',notes:[{text:'Demo call done. Proposal sent for 3 journals.',time:'12 May 2026, 04:00 PM'}]},
  {id:11,name:'Nisha Patel',email:'nisha@orthojournal.com',company:'OrthoJournal',phone:'+91 88776 65544',source:'Cold Email',status:'contacted',date:'2026-05-09',notes:[{text:'Opened our email 3 times. Good signal.',time:'10 May 2026, 08:30 AM'}]},
  {id:12,name:'Ravi Teja',email:'ravi@cancerresearch.in',company:'Cancer Research Inst.',phone:'+91 77665 54433',source:'Referral',status:'converted',date:'2026-05-04',notes:[{text:'Referred by Ananya. Fast closure — 1 week. ₹60,000.',time:'05 May 2026, 01:00 PM'}]},
];
let nextId = 13;
let currentPage = 1;
const PER_PAGE = 8;
let currentView = 'dashboard';

// ──────────────────────────────────────────────────────────────
// UTILS
// ──────────────────────────────────────────────────────────────
const ac = n => AVATAR_COLORS[n.charCodeAt(0) % AVATAR_COLORS.length];
const initials = n => n.split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2);
const fmtDate = d => new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'2-digit'});
const nowStr = () => new Date().toLocaleString('en-IN',{day:'2-digit',month:'short',year:'2-digit',hour:'2-digit',minute:'2-digit'});
const todayStr = () => new Date().toISOString().slice(0,10);

function avatarHTML(name, size=32) {
  const {bg,t} = ac(name);
  return `<div class="avatar" style="width:${size}px;height:${size}px;background:${bg};color:${t}">${initials(name)}</div>`;
}

function statusBadgeHTML(status) {
  return `<span class="status-badge status-${status}"><span class="status-dot"></span>${status}</span>`;
}

// ──────────────────────────────────────────────────────────────
// TOAST
// ──────────────────────────────────────────────────────────────
function toast(msg, type='success') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const icons = {success:'✅',error:'❌',info:'ℹ️'};
  el.innerHTML = `<span>${icons[type]||'ℹ️'}</span> ${msg}`;
  document.getElementById('toasts').appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

// ──────────────────────────────────────────────────────────────
// VIEWS
// ──────────────────────────────────────────────────────────────
const PAGE_META = {
  dashboard: {title:'Dashboard', sub:'Welcome back — here\'s what\'s happening today'},
  leads:     {title:'All Leads', sub:'Manage and track every lead in your pipeline'},
  kanban:    {title:'Pipeline Board', sub:'Visualize leads by stage'},
  analytics: {title:'Analytics', sub:'Insights into your sales performance'},
};

function switchView(name) {
  currentView = name;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => {
    if (b.getAttribute('onclick')?.includes(name)) b.classList.add('active');
  });
  const m = PAGE_META[name] || {};
  document.getElementById('page-title').textContent = m.title || name;
  document.getElementById('page-sub').textContent = m.sub || '';
  if (name === 'dashboard') renderDashboard();
  if (name === 'leads') renderLeads();
  if (name === 'kanban') renderKanban();
  if (name === 'analytics') renderAnalytics();
}

// ──────────────────────────────────────────────────────────────
// METRICS
// ──────────────────────────────────────────────────────────────
function getMetrics() {
  const total = leads.length;
  const converted = leads.filter(l=>l.status==='converted').length;
  const newLeads = leads.filter(l=>l.status==='new').length;
  const pipeline = leads.filter(l=>['contacted','qualified'].includes(l.status)).length;
  const rate = total > 0 ? Math.round(converted/total*100) : 0;
  return {total, converted, newLeads, pipeline, rate};
}

function renderMetrics() {
  const m = getMetrics();
  const cards = [
    {label:'Total Leads', value:m.total, sub:'All time', accent:'#3b82f6', icon:'👥'},
    {label:'New Leads', value:m.newLeads, sub:'Awaiting contact', accent:'#60a5fa', icon:'🆕'},
    {label:'In Pipeline', value:m.pipeline, sub:'Contacted + Qualified', accent:'#f59e0b', icon:'🔄'},
    {label:'Conversion Rate', value:m.rate+'%', sub:`${m.converted} converted`, accent:'#10b981', icon:'🏆'},
  ];
  document.getElementById('metrics-grid').innerHTML = cards.map(c=>`
    <div class="metric-card" style="--card-accent:${c.accent}">
      <div class="metric-label">${c.label}</div>
      <div class="metric-value">${c.value}</div>
      <div class="metric-change" style="color:${c.accent}">${c.sub}</div>
      <div class="metric-icon">${c.icon}</div>
    </div>
  `).join('');
  document.getElementById('nav-leads-count').textContent = leads.length;
}

// ──────────────────────────────────────────────────────────────
// DASHBOARD
// ──────────────────────────────────────────────────────────────
function renderDashboard() {
  renderMetrics();
  // Hot leads
  const hotLeads = leads.filter(l=>l.status==='new').slice(0,4);
  const hEl = document.getElementById('hot-leads-list');
  document.getElementById('hot-count').textContent = hotLeads.length + ' leads';
  hEl.innerHTML = hotLeads.length === 0
    ? '<div class="empty"><div class="empty-icon">🎉</div><div class="empty-sub">No new leads right now</div></div>'
    : hotLeads.map(l=>`
      <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04)">
        ${avatarHTML(l.name, 28)}
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:#e8edf5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${l.name}</div>
          <div style="font-size:11px;color:#68788f">${l.company||l.email}</div>
        </div>
        <span style="font-size:11px;color:#68788f">${fmtDate(l.date)}</span>
      </div>`).join('');

  // Conversions
  const convLeads = leads.filter(l=>l.status==='converted').slice(0,4);
  const cEl = document.getElementById('conv-leads-list');
  document.getElementById('conv-count').textContent = convLeads.length + ' converted';
  cEl.innerHTML = convLeads.length === 0
    ? '<div class="empty"><div class="empty-sub">No conversions yet</div></div>'
    : convLeads.map(l=>`
      <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.04)">
        ${avatarHTML(l.name, 28)}
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:#e8edf5">${l.name}</div>
          <div style="font-size:11px;color:#68788f">${l.company||l.email}</div>
        </div>
        <span style="color:#34d399;font-size:13px">✓</span>
      </div>`).join('');

  // Source chart
  const srcMap = {};
  leads.forEach(l=>{srcMap[l.source]=(srcMap[l.source]||0)+1});
  const maxSrc = Math.max(...Object.values(srcMap),1);
  const srcColors = ['#3b82f6','#10b981','#f59e0b','#8b5cf6','#ef4444','#06b6d4','#ec4899','#14b8a6'];
  document.getElementById('source-chart').innerHTML = Object.entries(srcMap).sort((a,b)=>b[1]-a[1]).map(([src,cnt],i)=>`
    <div class="bar-row">
      <div class="bar-label">${src}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.round(cnt/maxSrc*100)}%;background:${srcColors[i%srcColors.length]}"></div></div>
      <div class="bar-val">${cnt}</div>
    </div>`).join('');
}

// ──────────────────────────────────────────────────────────────
// LEADS TABLE
// ──────────────────────────────────────────────────────────────
function getFiltered() {
  const q  = (document.getElementById('search-input')?.value||'').toLowerCase();
  const st = document.getElementById('filter-status')?.value||'';
  const src= document.getElementById('filter-source')?.value||'';
  const sort=document.getElementById('sort-by')?.value||'date_desc';
  let r = leads.filter(l=>{
    const matchQ = !q||(l.name.toLowerCase().includes(q)||l.email.toLowerCase().includes(q)||(l.company||'').toLowerCase().includes(q)||(l.phone||'').includes(q));
    return matchQ && (!st||l.status===st) && (!src||l.source===src);
  });
  const ORDER={new:0,contacted:1,qualified:2,converted:3,lost:4};
  if(sort==='date_desc') r.sort((a,b)=>b.date.localeCompare(a.date));
  else if(sort==='date_asc') r.sort((a,b)=>a.date.localeCompare(b.date));
  else if(sort==='name') r.sort((a,b)=>a.name.localeCompare(b.name));
  else if(sort==='status') r.sort((a,b)=>ORDER[a.status]-ORDER[b.status]);
  return r;
}

function renderLeads() {
  const filtered = getFiltered();
  const totalPages = Math.max(1, Math.ceil(filtered.length/PER_PAGE));
  if(currentPage > totalPages) currentPage = 1;
  const page = filtered.slice((currentPage-1)*PER_PAGE, currentPage*PER_PAGE);
  const tbody = document.getElementById('leads-body');
  if(!tbody) return;

  tbody.innerHTML = page.length === 0
    ? `<tr><td colspan="8"><div class="empty"><div class="empty-icon">🔍</div><div class="empty-text">No leads found</div><div class="empty-sub">Try adjusting your filters</div></div></td></tr>`
    : page.map(l=>`
    <tr>
      <td><div class="lead-name-cell">${avatarHTML(l.name)}<div><div class="lead-name">${l.name}</div><div class="lead-phone">${l.phone||'—'}</div></div></div></td>
      <td style="color:#a0aec0;font-size:12px">${l.email}</td>
      <td>${l.company||'<span style="color:#68788f">—</span>'}</td>
      <td><span class="source-chip">${l.source}</span></td>
      <td>${statusBadgeHTML(l.status)}</td>
      <td style="color:#68788f;font-size:12px;white-space:nowrap">${fmtDate(l.date)}</td>
      <td>
        <button class="icon-btn notes-btn" onclick="openNotes(${l.id})" title="${l.notes.length} notes">
          💬 ${l.notes.length>0?`<span class="notes-count">${l.notes.length}</span>`:''}
        </button>
      </td>
      <td><div class="actions">
        <button class="icon-btn" onclick="openEdit(${l.id})" title="Edit">✎</button>
        <button class="icon-btn danger" onclick="confirmDelete(${l.id})" title="Delete">🗑</button>
      </div></td>
    </tr>`).join('');

  const s=(currentPage-1)*PER_PAGE+1, e=Math.min(currentPage*PER_PAGE,filtered.length);
  document.getElementById('lead-count-label').textContent = `${filtered.length} leads`;
  document.getElementById('page-info').textContent = filtered.length===0?'0 leads':`${s}–${e} of ${filtered.length}`;
  document.getElementById('page-num').textContent = `${currentPage} / ${totalPages}`;
  document.getElementById('prev-btn').disabled = currentPage===1;
  document.getElementById('next-btn').disabled = currentPage===totalPages;
}

function changePage(d){currentPage+=d;renderLeads()}
function clearFilters(){
  document.getElementById('search-input').value='';
  document.getElementById('filter-status').value='';
  document.getElementById('filter-source').value='';
  document.getElementById('sort-by').value='date_desc';
  currentPage=1;renderLeads();
}

// ──────────────────────────────────────────────────────────────
// KANBAN
// ──────────────────────────────────────────────────────────────
function renderKanban() {
  const board = document.getElementById('kanban-board');
  board.innerHTML = STATUSES.map(st=>{
    const sc = STATUS_COLORS[st];
    const colLeads = leads.filter(l=>l.status===st);
    return `
    <div class="kanban-col">
      <div class="kanban-header">
        <span class="kanban-col-title" style="color:${sc.text}">${st}</span>
        <span class="kanban-col-count" style="background:${sc.bg};color:${sc.text}">${colLeads.length}</span>
      </div>
      <div class="kanban-cards">
        ${colLeads.length===0?'<div style="color:#68788f;font-size:12px;text-align:center;padding:12px">No leads</div>':''}
        ${colLeads.map(l=>`
          <div class="kanban-card" onclick="openNotes(${l.id})">
            <div class="kanban-name">${l.name}</div>
            <div class="kanban-co">${l.company||l.email}</div>
            <div class="kanban-source"><span class="source-chip">${l.source}</span></div>
          </div>`).join('')}
      </div>
    </div>`;
  }).join('');
}

// ──────────────────────────────────────────────────────────────
// ANALYTICS
// ──────────────────────────────────────────────────────────────
function renderAnalytics() {
  // Status chart
  const maxSt = Math.max(...STATUSES.map(s=>leads.filter(l=>l.status===s).length),1);
  document.getElementById('status-chart').innerHTML = STATUSES.map(s=>{
    const cnt = leads.filter(l=>l.status===s).length;
    const sc = STATUS_COLORS[s];
    return `<div class="bar-row">
      <div class="bar-label" style="color:${sc.text}">${s}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.round(cnt/maxSt*100)}%;background:${sc.bar}"></div></div>
      <div class="bar-val">${cnt}</div>
    </div>`;
  }).join('');

  // Source chart
  const srcMap={};leads.forEach(l=>{srcMap[l.source]=(srcMap[l.source]||0)+1});
  const maxSrc=Math.max(...Object.values(srcMap),1);
  const srcColors=['#3b82f6','#10b981','#f59e0b','#8b5cf6','#ef4444','#06b6d4','#ec4899','#14b8a6'];
  document.getElementById('source-chart-2').innerHTML = Object.entries(srcMap).sort((a,b)=>b[1]-a[1]).map(([src,cnt],i)=>`
    <div class="bar-row">
      <div class="bar-label">${src.length>12?src.slice(0,10)+'…':src}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.round(cnt/maxSrc*100)}%;background:${srcColors[i%srcColors.length]}"></div></div>
      <div class="bar-val">${cnt}</div>
    </div>`).join('');

  // Funnel
  const ORDER=[['new','New'],['contacted','Contacted'],['qualified','Qualified'],['converted','Converted']];
  const max=leads.length||1;
  document.getElementById('funnel-chart').innerHTML = ORDER.map(([s,label],i)=>{
    const cnt=leads.filter(l=>l.status===s).length;
    const h=Math.max(Math.round(cnt/max*100),8);
    const sc=STATUS_COLORS[s];
    return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px">
      <div style="font-size:13px;font-weight:700;color:${sc.text}">${cnt}</div>
      <div style="width:100%;height:${h}px;background:${sc.bar};border-radius:6px;min-height:8px"></div>
      <div style="font-size:11px;color:#a0aec0;text-transform:capitalize">${label}</div>
    </div>`;
  }).join('');
}

// ──────────────────────────────────────────────────────────────
// MODALS
// ──────────────────────────────────────────────────────────────
function closeModal(){document.getElementById('modal-root').innerHTML=''}

function openAddLead() {
  document.getElementById('modal-root').innerHTML = `
  <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <div class="modal-header">
      <span class="modal-title">＋ Add New Lead</span>
      <button class="icon-btn" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Full Name *</label><input class="form-input" id="f-name" placeholder="Priya Nair"></div>
        <div class="form-group"><label class="form-label">Email *</label><input class="form-input" id="f-email" type="email" placeholder="priya@example.com"></div>
        <div class="form-group"><label class="form-label">Company</label><input class="form-input" id="f-company" placeholder="Acme Corp"></div>
        <div class="form-group"><label class="form-label">Phone</label><input class="form-input" id="f-phone" placeholder="+91 98765 43210"></div>
        <div class="form-group"><label class="form-label">Source</label>
          <select class="form-input" id="f-source">${SOURCES.map(s=>`<option>${s}</option>`).join('')}</select>
        </div>
        <div class="form-group"><label class="form-label">Status</label>
          <select class="form-input" id="f-status">${STATUSES.map(s=>`<option value="${s}">${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}</select>
        </div>
        <div class="form-group full"><label class="form-label">Initial Note</label>
          <textarea class="form-input" id="f-note" placeholder="Any initial context about this lead..."></textarea>
        </div>
      </div>
      <div class="form-error" id="f-err" style="display:none"></div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveLead()">✓ Save Lead</button>
    </div>
  </div></div>`;
}

function saveLead() {
  const name=document.getElementById('f-name').value.trim();
  const email=document.getElementById('f-email').value.trim();
  const errEl=document.getElementById('f-err');
  if(!name||!email){errEl.textContent='Name and email are required.';errEl.style.display='block';return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){errEl.textContent='Enter a valid email address.';errEl.style.display='block';return;}
  const note=document.getElementById('f-note').value.trim();
  leads.unshift({
    id:nextId++,name,email,
    company:document.getElementById('f-company').value.trim(),
    phone:document.getElementById('f-phone').value.trim(),
    source:document.getElementById('f-source').value,
    status:document.getElementById('f-status').value,
    date:todayStr(),
    notes:note?[{text:note,time:nowStr()}]:[]
  });
  closeModal();currentPage=1;refreshAll();toast('Lead added successfully');
}

function openEdit(id) {
  const l=leads.find(x=>x.id===id);if(!l)return;
  document.getElementById('modal-root').innerHTML=`
  <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <div class="modal-header">
      <div style="display:flex;align-items:center;gap:10px">${avatarHTML(l.name,36)}<div><span class="modal-title">${l.name}</span><div style="font-size:12px;color:#68788f">${l.email}</div></div></div>
      <button class="icon-btn" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Full Name</label><input class="form-input" id="ef-name" value="${l.name}"></div>
        <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="ef-email" value="${l.email}"></div>
        <div class="form-group"><label class="form-label">Company</label><input class="form-input" id="ef-company" value="${l.company||''}"></div>
        <div class="form-group"><label class="form-label">Phone</label><input class="form-input" id="ef-phone" value="${l.phone||''}"></div>
        <div class="form-group"><label class="form-label">Source</label>
          <select class="form-input" id="ef-source">${SOURCES.map(s=>`<option ${l.source===s?'selected':''}>${s}</option>`).join('')}</select>
        </div>
        <div class="form-group"><label class="form-label">Status</label>
          <select class="form-input" id="ef-status">${STATUSES.map(s=>`<option value="${s}" ${l.status===s?'selected':''}>${s.charAt(0).toUpperCase()+s.slice(1)}</option>`).join('')}</select>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="updateLead(${id})">✓ Update Lead</button>
    </div>
  </div></div>`;
}

function updateLead(id) {
  const l=leads.find(x=>x.id===id);if(!l)return;
  l.name=document.getElementById('ef-name').value.trim()||l.name;
  l.email=document.getElementById('ef-email').value.trim()||l.email;
  l.company=document.getElementById('ef-company').value.trim();
  l.phone=document.getElementById('ef-phone').value.trim();
  l.source=document.getElementById('ef-source').value;
  l.status=document.getElementById('ef-status').value;
  closeModal();refreshAll();toast('Lead updated');
}

function openNotes(id) {
  const l=leads.find(x=>x.id===id);if(!l)return;
  const render=()=>{
    document.getElementById('modal-root').innerHTML=`
    <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
    <div class="modal">
      <div class="modal-header">
        <div style="display:flex;align-items:center;gap:10px">${avatarHTML(l.name,38)}<div><div class="modal-title">${l.name}</div><div style="font-size:12px;color:#68788f">${l.email} · ${l.company||'No company'}</div></div></div>
        <button class="icon-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="modal-body">
        <div style="margin-bottom:16px">
          <div class="form-label">Pipeline Stage</div>
          <div class="status-pills">
            ${STATUSES.map(s=>`<button onclick="quickStatus(${id},'${s}')" class="status-pill ${l.status===s?'active-'+s:''}">${s}</button>`).join('')}
          </div>
        </div>
        <div style="margin-bottom:14px">
          <div class="form-label">Follow-up Notes (${l.notes.length})</div>
          ${l.notes.length===0?'<div style="color:#68788f;font-size:13px;padding:10px 0">No notes yet.</div>':''}
          ${l.notes.map((n,i)=>`
            <div class="note-item">
              <div class="note-text">${n.text}</div>
              <div class="note-meta">
                <span>🕐 ${n.time}</span>
                <button class="note-del" onclick="deleteNote(${id},${i})">remove</button>
              </div>
            </div>`).join('')}
        </div>
        <div class="form-group">
          <div class="form-label">Add Note</div>
          <textarea class="form-input" id="new-note" placeholder="Follow-up summary, next step, call notes..." style="min-height:80px"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger btn-sm" onclick="confirmDelete(${id})">🗑 Delete Lead</button>
        <button class="btn" onclick="closeModal()">Close</button>
        <button class="btn btn-primary" onclick="addNote(${id})">＋ Add Note</button>
      </div>
    </div></div>`;
  };
  render();
  window._noteRender=()=>render();
}

function addNote(id) {
  const l=leads.find(x=>x.id===id);
  const txt=document.getElementById('new-note')?.value.trim();
  if(!txt||!l)return;
  l.notes.push({text:txt,time:nowStr()});
  refreshAll();openNotes(id);toast('Note added');
}

function deleteNote(id,idx) {
  const l=leads.find(x=>x.id===id);if(!l)return;
  l.notes.splice(idx,1);refreshAll();openNotes(id);
}

function quickStatus(id,status) {
  const l=leads.find(x=>x.id===id);if(!l)return;
  l.status=status;refreshAll();openNotes(id);toast('Status updated to '+status);
}

function confirmDelete(id) {
  const l=leads.find(x=>x.id===id);if(!l)return;
  document.getElementById('modal-root').innerHTML=`
  <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
  <div class="modal" style="max-width:420px">
    <div class="modal-header"><span class="modal-title">⚠ Delete Lead</span><button class="icon-btn" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);border-radius:10px;padding:14px 16px;font-size:13px;color:#f87171;margin-bottom:4px">
        This will permanently delete <strong>${l.name}</strong> and all ${l.notes.length} note${l.notes.length!==1?'s':''}.
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-danger" onclick="doDelete(${id})">Delete Permanently</button>
    </div>
  </div></div>`;
}

function doDelete(id) {
  leads=leads.filter(x=>x.id!==id);closeModal();refreshAll();toast('Lead deleted','info');
}

// ──────────────────────────────────────────────────────────────
// CSV
// ──────────────────────────────────────────────────────────────
function showImport() {
  document.getElementById('modal-root').innerHTML=`
  <div class="modal-overlay" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <div class="modal-header"><span class="modal-title">⬆ Import Leads from CSV</span><button class="icon-btn" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div style="background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:13px 15px;margin-bottom:14px;font-size:12px;color:#a0aec0;font-family:monospace">
        Format: Name, Email, Company, Phone, Source<br>
        Example: Priya Nair,priya@example.com,MedHaven,+91 98765,LinkedIn
      </div>
      <div class="form-group">
        <div class="form-label">Paste CSV Rows (one lead per line)</div>
        <textarea class="form-input" id="csv-data" placeholder="Priya Nair,priya@example.com,MedHaven,+91 98765 43210,Contact Form&#10;Raj Mehta,raj@example.com,Quantum,,LinkedIn" style="min-height:140px;font-family:monospace;font-size:12px"></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="doImport()">⬆ Import Leads</button>
    </div>
  </div></div>`;
}

function doImport() {
  const data=document.getElementById('csv-data').value.trim();
  if(!data){closeModal();return;}
  let count=0;
  data.split('\n').filter(r=>r.trim()).forEach(row=>{
    const cols=row.split(',').map(c=>c.trim());
    if(cols.length>=2&&cols[0]&&cols[1]){
      leads.unshift({id:nextId++,name:cols[0],email:cols[1],company:cols[2]||'',phone:cols[3]||'',source:cols[4]||'Contact Form',status:'new',date:todayStr(),notes:[]});
      count++;
    }
  });
  closeModal();refreshAll();if(count>0)toast(`${count} lead${count>1?'s':''} imported`);
}

function exportCSV() {
  const rows=leads.map(l=>`"${l.name}","${l.email}","${l.company||''}","${l.phone||''}","${l.source}","${l.status}","${l.date}","${l.notes.length}"`);
  const csv=['Name,Email,Company,Phone,Source,Status,Date,Notes',...rows].join('\n');
  const a=Object.assign(document.createElement('a'),{href:URL.createObjectURL(new Blob([csv],{type:'text/csv'})),download:'leads_export.csv'});
  a.click();URL.revokeObjectURL(a.href);toast('CSV exported');
}

// ──────────────────────────────────────────────────────────────
// REFRESH ALL
// ──────────────────────────────────────────────────────────────
function refreshAll() {
  renderMetrics();
  if(currentView==='dashboard') renderDashboard();
  if(currentView==='leads') renderLeads();
  if(currentView==='kanban') renderKanban();
  if(currentView==='analytics') renderAnalytics();
}

// ──────────────────────────────────────────────────────────────
// AI ASSISTANT
// ──────────────────────────────────────────────────────────────
let aiHistory = [];
let aiTyping = false;

function buildCRMContext() {
  const m = getMetrics();
  const srcMap={};leads.forEach(l=>{srcMap[l.source]=(srcMap[l.source]||0)+1});
  const topSrc=Object.entries(srcMap).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([s,c])=>`${s}(${c})`).join(', ');
  return `You are Nova, an expert CRM AI assistant embedded inside LeadFlow CRM. You help the user analyze leads, draft emails, suggest strategies, and optimize their sales pipeline.

CURRENT CRM DATA (live):
- Total leads: ${m.total}
- New leads: ${m.newLeads}
- Contacted: ${leads.filter(l=>l.status==='contacted').length}
- Qualified: ${leads.filter(l=>l.status==='qualified').length}
- Converted: ${m.converted}
- Lost: ${leads.filter(l=>l.status==='lost').length}
- Conversion rate: ${m.rate}%
- Top sources: ${topSrc}
- Total notes logged: ${leads.reduce((a,l)=>a+l.notes.length,0)}

RECENT LEADS (last 5):
${leads.slice(0,5).map(l=>`• ${l.name} (${l.company||'no company'}) — ${l.status} via ${l.source}, ${l.notes.length} notes`).join('\n')}

You are professional, concise, and data-driven. Format responses clearly using bullet points or short paragraphs. When drafting emails, use a professional but warm tone. Always base your insights on the actual data above.`;
}

function appendMsg(role, html) {
  const wrap = document.getElementById('ai-messages');
  const isBot = role === 'bot';
  const div = document.createElement('div');
  div.className = `ai-msg ${role}`;
  div.innerHTML = `
    <div class="msg-avatar ${isBot?'bot-avatar':'user-msg-avatar'}">${isBot?'🤖':'👤'}</div>
    <div class="msg-bubble">${html}</div>`;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
  return div;
}

function showTyping() {
  const wrap = document.getElementById('ai-messages');
  const div = document.createElement('div');
  div.className = 'ai-msg bot';
  div.id = 'typing-indicator';
  div.innerHTML = `<div class="msg-avatar bot-avatar">🤖</div><div class="msg-bubble"><div class="typing"><span></span><span></span><span></span></div></div>`;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

async function sendAI(customMsg) {
  if (aiTyping) return;
  const input = document.getElementById('ai-input');
  const msg = customMsg || input.value.trim();
  if (!msg) return;
  const apiKey = document.getElementById('api-key-input').value.trim();
  if (!apiKey) {
    appendMsg('bot', '⚠️ Please enter your Anthropic API key above to use Nova AI.');
    return;
  }
  if (!customMsg) input.value = '';
  appendMsg('user', msg.replace(/</g,'&lt;').replace(/>/g,'&gt;'));
  aiHistory.push({ role: 'user', content: msg });
  aiTyping = true;
  document.getElementById('ai-send-btn').disabled = true;
  showTyping();

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: buildCRMContext(),
        messages: aiHistory,
      }),
    });
    const data = await resp.json();
    removeTyping();
    if (data.error) throw new Error(data.error.message);
    const reply = data.content?.[0]?.text || 'Sorry, I could not generate a response.';
    aiHistory.push({ role: 'assistant', content: reply });
    // Format reply
    const formatted = reply
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^•\s/gm, '• ')
      .replace(/\n/g, '<br>');
    appendMsg('bot', formatted);
  } catch (err) {
    removeTyping();
    appendMsg('bot', `❌ <strong>Error:</strong> ${err.message}<br><small>Check your API key and try again.</small>`);
  }
  aiTyping = false;
  document.getElementById('ai-send-btn').disabled = false;
}

function quickAsk(q) { sendAI(q); }

// ──────────────────────────────────────────────────────────────
// KEYBOARD
// ──────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ──────────────────────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────────────────────
switchView('dashboard');
