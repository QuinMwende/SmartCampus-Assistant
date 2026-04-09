/* =========================================
  CampusAI — UI Renderer
  Renders all dynamic sections of the app
   ========================================= */

class UIRenderer {

  /* ---- CHAT MESSAGES ---- */
  static appendMessage(content, type = 'ai', avatarLabel = '🎓') {
    const container = document.getElementById('chatMessages');
    const row = document.createElement('div');
    row.className = `msg-row ${type === 'user' ? 'user-row' : ''}`;

    const avatarClass = type === 'ai' ? 'ai-avatar' : 'user-avatar';
    row.innerHTML = `
      <div class="avatar ${avatarClass}">${avatarLabel}</div>
      <div class="bubble ${type === 'ai' ? 'ai-bubble' : 'user-bubble'}">${content}</div>
    `;
    container.appendChild(row);
    UIRenderer.scrollToBottom();
    return row;
  }

  static showTyping() {
    const container = document.getElementById('chatMessages');
    const row = document.createElement('div');
    row.className = 'msg-row typing-row';
    row.id = 'typingIndicator';
    row.innerHTML = `
      <div class="avatar ai-avatar">🎓</div>
      <div class="bubble ai-bubble typing-bubble">
        <div class="typing-dots">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    container.appendChild(row);
    UIRenderer.scrollToBottom();
  }

  static hideTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
  }

  static appendSystemMsg(text) {
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'system-msg';
    div.textContent = text;
    container.appendChild(div);
    UIRenderer.scrollToBottom();
  }

  static scrollToBottom() {
    const c = document.getElementById('chatMessages');
    if (c) c.scrollTop = c.scrollHeight;
  }

  static clearMessages() {
    const c = document.getElementById('chatMessages');
    if (c) { c.innerHTML = ''; }
  }

  /* ---- QUICK ACTIONS ---- */
  static renderQuickActions(role) {
    const wrap = document.getElementById('quickActions');
    const actions = CAMPUS_DATA.roles[role].quickActions || [];
    wrap.innerHTML = actions.map(a =>
      `<button class="quick-chip" onclick="app.sendQuick('${a}')">${a}</button>`
    ).join('');
  }

  /* ---- DASHBOARD ---- */
  static renderDashboard(role) {
    const container = document.getElementById('dashboardContent');
    container.innerHTML = '';

    if (role === 'student') {
      container.innerHTML = `
        <div class="dash-card dash-card-accent-blue">
          <div class="dash-card-header">
            <span class="dash-card-title">Classes Today</span>
            <span class="dash-card-icon">📅</span>
          </div>
          <div class="dash-card-value">3</div>
          <div class="dash-card-sub">Next: CS301 at 8:00am · Room B204</div>
        </div>
        <div class="dash-card dash-card-accent-amber">
          <div class="dash-card-header">
            <span class="dash-card-title">Fee Balance Due</span>
            <span class="dash-card-icon">💳</span>
          </div>
          <div class="dash-card-value" style="color:#f59e0b">KES 38,500</div>
          <div class="dash-card-sub">Due in 14 days — Apr 15, 2026</div>
        </div>
        <div class="dash-card dash-card-accent-green">
          <div class="dash-card-header">
            <span class="dash-card-title">Study Rooms Available</span>
            <span class="dash-card-icon">📚</span>
          </div>
          <div class="dash-card-value" style="color:#10b981">2</div>
          <div class="dash-card-sub">Library open until 10:00pm</div>
        </div>
        <div class="dash-card dash-card-accent-red">
          <div class="dash-card-header">
            <span class="dash-card-title">Upcoming Deadlines</span>
            <span class="dash-card-icon">⏰</span>
          </div>
          <div class="dash-card-value" style="color:#ef4444">3</div>
          <div class="dash-card-sub">Next: CAT II on Apr 10</div>
        </div>
        <div class="dash-card dash-card-wide">
          <div class="dash-card-header">
            <span class="dash-card-title">Today's Schedule</span>
            <span class="dash-card-icon">🗓️</span>
          </div>
          <ul class="dash-list">
            <li><span class="dl-label">08:00 – 10:00</span><span class="dl-val">CS301: Data Structures · Room B204</span></li>
            <li><span class="dl-label">11:00 – 13:00</span><span class="dl-val">MATH201: Linear Algebra · Room A101</span></li>
            <li><span class="dl-label">14:00 – 16:00</span><span class="dl-val">ENG401: Technical Writing · Room C305</span></li>
          </ul>
        </div>
        <div class="dash-card dash-card-wide">
          <div class="dash-card-header">
            <span class="dash-card-title">Current Semester Progress</span>
            <span class="dash-card-icon">📊</span>
          </div>
          <ul class="dash-list">
            <li><span class="dl-label">CS301 — Data Structures</span><span class="dl-val" style="color:#10b981">CAT I: 68/80</span></li>
            <li><span class="dl-label">MATH201 — Linear Algebra</span><span class="dl-val" style="color:#f59e0b">CAT I: 54/80</span></li>
            <li><span class="dl-label">ENG401 — Technical Writing</span><span class="dl-val" style="color:#10b981">CAT I: 72/80</span></li>
          </ul>
        </div>`;

    } else if (role === 'lecturer') {
      container.innerHTML = `
        <div class="dash-card dash-card-accent-green">
          <div class="dash-card-header"><span class="dash-card-title">Classes Today</span><span class="dash-card-icon">📚</span></div>
          <div class="dash-card-value">2</div>
          <div class="dash-card-sub">First: CS401 at 9:00am</div>
        </div>
        <div class="dash-card dash-card-accent-blue">
          <div class="dash-card-header"><span class="dash-card-title">Total Students</span><span class="dash-card-icon">👥</span></div>
          <div class="dash-card-value">83</div>
          <div class="dash-card-sub">Across 2 active courses</div>
        </div>
        <div class="dash-card dash-card-accent-amber">
          <div class="dash-card-header"><span class="dash-card-title">Grade Submissions</span><span class="dash-card-icon">📊</span></div>
          <div class="dash-card-value" style="color:#f59e0b">Due Apr 20</div>
          <div class="dash-card-sub">CAT II results pending</div>
        </div>
        <div class="dash-card dash-card-accent-blue">
          <div class="dash-card-header"><span class="dash-card-title">Room Bookings</span><span class="dash-card-icon">🏫</span></div>
          <div class="dash-card-value">1</div>
          <div class="dash-card-sub">Conference room A301 · Friday</div>
        </div>
        <div class="dash-card dash-card-wide">
          <div class="dash-card-header"><span class="dash-card-title">Today's Teaching Schedule</span><span class="dash-card-icon">🗓️</span></div>
          <ul class="dash-list">
            <li><span class="dl-label">09:00 – 11:00</span><span class="dl-val">CS401: Algorithms — Hall 3 (45 students)</span></li>
            <li><span class="dl-label">14:00 – 16:00</span><span class="dl-val">CS201: Intro to Programming — Lab D102 (38 students)</span></li>
          </ul>
        </div>`;

    } else if (role === 'staff') {
      container.innerHTML = `
        <div class="dash-card dash-card-accent-amber">
          <div class="dash-card-header"><span class="dash-card-title">Leave Balance</span><span class="dash-card-icon">🏖️</span></div>
          <div class="dash-card-value" style="color:#10b981">12 days</div>
          <div class="dash-card-sub">Annual leave remaining in 2026</div>
        </div>
        <div class="dash-card dash-card-accent-red">
          <div class="dash-card-header"><span class="dash-card-title">Open IT Tickets</span><span class="dash-card-icon">🔧</span></div>
          <div class="dash-card-value" style="color:#ef4444">2</div>
          <div class="dash-card-sub">Ticket #1042, #1043 pending</div>
        </div>
        <div class="dash-card dash-card-accent-blue">
          <div class="dash-card-header"><span class="dash-card-title">Announcements</span><span class="dash-card-icon">📢</span></div>
          <div class="dash-card-value">3</div>
          <div class="dash-card-sub">2 unread staff notices</div>
        </div>
        <div class="dash-card dash-card-accent-green">
          <div class="dash-card-header"><span class="dash-card-title">Payroll</span><span class="dash-card-icon">💰</span></div>
          <div class="dash-card-value" style="color:#10b981">Paid</div>
          <div class="dash-card-sub">March 2026 salary processed</div>
        </div>
        <div class="dash-card dash-card-wide">
          <div class="dash-card-header"><span class="dash-card-title">Recent Announcements</span><span class="dash-card-icon">📋</span></div>
          <ul class="dash-list">
            <li><span class="dl-label">Apr 5</span><span class="dl-val">Staff meeting — Thursday 10am, Board Room A</span></li>
            <li><span class="dl-label">Apr 3</span><span class="dl-val">ISO Audit documents due by April 12</span></li>
            <li><span class="dl-label">Apr 1</span><span class="dl-val">New HR policy handbook distributed via email</span></li>
          </ul>
        </div>`;

    } else {
      // Guest dashboard
      container.innerHTML = `
        <div class="dash-card dash-card-accent-blue">
          <div class="dash-card-header"><span class="dash-card-title">Next Open Day</span><span class="dash-card-icon">🎓</span></div>
          <div class="dash-card-value">May 10</div>
          <div class="dash-card-sub">9:00am – 4:00pm · All welcome</div>
        </div>
        <div class="dash-card dash-card-accent-green">
          <div class="dash-card-header"><span class="dash-card-title">Courses Offered</span><span class="dash-card-icon">📚</span></div>
          <div class="dash-card-value">47</div>
          <div class="dash-card-sub">Undergraduate & postgraduate</div>
        </div>
        <div class="dash-card dash-card-accent-amber">
          <div class="dash-card-header"><span class="dash-card-title">Application Deadline</span><span class="dash-card-icon">📅</span></div>
          <div class="dash-card-value" style="color:#f59e0b">Jun 30</div>
          <div class="dash-card-sub">2026/27 applications close</div>
        </div>
        <div class="dash-card dash-card-accent-blue">
          <div class="dash-card-header"><span class="dash-card-title">Campus Size</span><span class="dash-card-icon">🏛️</span></div>
          <div class="dash-card-value">42 acres</div>
          <div class="dash-card-sub">Modern facilities & green spaces</div>
        </div>
        <div class="dash-card dash-card-wide">
          <div class="dash-card-header"><span class="dash-card-title">Quick Contacts</span><span class="dash-card-icon">📞</span></div>
          <ul class="dash-list">
            <li><span class="dl-label">Admissions Office</span><span class="dl-val">0800 123 456 (toll-free)</span></li>
            <li><span class="dl-label">Main Reception</span><span class="dl-val">Ext. 2000 · info@university.ac.ke</span></li>
            <li><span class="dl-label">Security Gate</span><span class="dl-val">0700 000 111</span></li>
          </ul>
        </div>`;
    }
  }

  /* ---- MAP ---- */
  static renderMap() {
    const container = document.getElementById('mapBuildings');
    container.innerHTML = '';
    CAMPUS_DATA.buildings.forEach(b => {
      const div = document.createElement('div');
      div.className = 'map-building';
      div.style.cssText = `left:${b.x}%;top:${b.y}%;width:${b.w}px;height:${b.h}px;`;
      div.innerHTML = `<span class="b-icon">${b.icon}</span><span class="b-name">${b.name}</span>`;
      div.onclick = () => {
        document.getElementById('userInput').value = `Where is ${b.name.replace('\n', ' ')}?`;
        showSection('chat');
        app.sendMessage();
      };
      container.appendChild(div);
    });

    const legend = document.getElementById('mapLegend');
    legend.innerHTML = `
      <div style="font-size:11px;font-family:var(--font-mono);color:var(--text-muted);margin-bottom:8px">LEGEND</div>
      <div class="map-legend-item"><div class="map-legend-dot" style="background:#3b82f6"></div>Academic Blocks</div>
      <div class="map-legend-item"><div class="map-legend-dot" style="background:#10b981"></div>Services</div>
      <div class="map-legend-item"><div class="map-legend-dot" style="background:#f59e0b"></div>Facilities</div>
      <div style="margin-top:8px;font-size:10px;color:var(--text-dim);font-family:var(--font-mono)">Click a building to ask AI</div>
    `;
  }

  /* ---- EVENTS ---- */
  static renderEvents() {
    const container = document.getElementById('eventsContent');
    container.innerHTML = '';
    CAMPUS_DATA.events.forEach(ev => {
      const tagColors = {
        info: 'rgba(59,130,246,0.12)', green: 'rgba(16,185,129,0.12)',
        amber: 'rgba(245,158,11,0.12)', red: 'rgba(239,68,68,0.12)',
        purple: 'rgba(167,139,250,0.12)'
      };
      const textColors = {
        info: '#3b82f6', green: '#10b981', amber: '#f59e0b',
        red: '#ef4444', purple: '#a78bfa'
      };
      const card = document.createElement('div');
      card.className = 'event-card';
      card.innerHTML = `
        <div class="event-date">
          <div class="ed-day">${ev.day}</div>
          <div class="ed-month">${ev.month}</div>
        </div>
        <div class="event-info">
          <div class="ei-title">${ev.title}</div>
          <div class="ei-meta">
            <span>📍 ${ev.location}</span>
            <span>🕐 ${ev.time}</span>
          </div>
          <div class="ei-desc">${ev.desc}</div>
        </div>
        <div class="event-tag" style="background:${tagColors[ev.typeColor]||'rgba(99,179,237,0.12)'};color:${textColors[ev.typeColor]||'#94a3b8'}">${ev.type}</div>
      `;
      container.appendChild(card);
    });
  }

  /* ---- DIRECTORY ---- */
  static renderDirectory(filter = '') {
    const container = document.getElementById('directoryContent');
    container.innerHTML = `
      <div class="dir-search">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Search by name, role, or department..."
          id="dirSearchInput"
          oninput="UIRenderer.renderDirectory(this.value)"
          value="${filter}" />
      </div>
      <div class="dir-grid" id="dirGrid"></div>
    `;

    const grid = document.getElementById('dirGrid');
    const people = filter
      ? CAMPUS_DATA.directory.filter(p =>
          p.name.toLowerCase().includes(filter.toLowerCase()) ||
          p.role.toLowerCase().includes(filter.toLowerCase())
        )
      : CAMPUS_DATA.directory;

    if (people.length === 0) {
      grid.innerHTML = `<div style="color:var(--text-muted);font-size:14px;grid-column:1/-1;padding:20px 0">No results found for "${filter}"</div>`;
      return;
    }

    people.forEach(p => {
      const card = document.createElement('div');
      card.className = 'dir-card';
      card.innerHTML = `
        <div class="dir-avatar" style="background:${p.color}22;color:${p.color}">${p.initials}</div>
        <div class="dir-name">${p.name}</div>
        <div class="dir-role">${p.role}</div>
        <div class="dir-contact">
          📧 <a href="mailto:${p.email}">${p.email}</a><br>
          📞 ${p.phone}
        </div>
      `;
      grid.appendChild(card);
    });
  }
}
