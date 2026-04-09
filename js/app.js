/* =========================================
  CampusAI — App Controller
  Main application logic, routing & interactions
   ========================================= */

/* ---- Global helpers ---- */
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const section = document.getElementById('section-' + id);
  if (section) section.classList.add('active');

  const navItem = document.querySelector(`.nav-item[onclick="showSection('${id}')"]`);
  if (navItem) navItem.classList.add('active');

  const titles = { chat: 'Chat Assistant', dashboard: 'Dashboard', map: 'Campus Map', events: 'Events', directory: 'Directory' };
  document.getElementById('pageTitle').textContent = titles[id] || id;

  // Lazy render sections
  if (id === 'dashboard') UIRenderer.renderDashboard(app.currentRole);
  if (id === 'map')       UIRenderer.renderMap();
  if (id === 'events')    UIRenderer.renderEvents();
  if (id === 'directory') UIRenderer.renderDirectory();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

/* ---- Main App Class ---- */
class CampusApp {
  constructor() {
    this.ai = new AIEngine();
    this.currentRole = 'student';
    this.activeUser = null;
    this.isTyping = false;
    this.speechRecognition = null;
    this._setupAuth();
  }

  _setupAuth() {
    const loginForm = document.getElementById('loginForm');
    const roleSelect = document.getElementById('loginRole');
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('usernameInput').value.trim();
        const password = document.getElementById('passwordInput').value;
        const role = roleSelect ? roleSelect.value : 'student';
        this.login(username, password, role);
      });
    }
  }

  login(username, password, role) {
    const credentials = [
      { username: 'student', password: 'campus123', role: 'student', name: 'Quinter' },
      { username: 'lecturer', password: 'lecturer123', role: 'lecturer', name: 'Dr. Kamau' },
      { username: 'staff', password: 'staff123', role: 'staff', name: 'Campus Staff' },
      { username: 'guest', password: 'guest123', role: 'guest', name: 'Visitor' }
    ];

    const user = credentials.find(u => u.username === username && u.password === password && u.role === role);
    if (!user) {
      this.showLoginError('Invalid credentials or role. Please try again.');
      return;
    }

    this.activeUser = user;
    this.currentRole = role;
    this.ai.setRole(role);

    document.getElementById('loginError').textContent = '';
    const authScreen = document.getElementById('authScreen');
    const appRoot = document.getElementById('app');
    if (authScreen) authScreen.classList.add('hidden');
    if (appRoot) {
      appRoot.classList.remove('hidden');
      appRoot.hidden = false;
    }
    document.getElementById('userNameDisplay').textContent = user.name;
    document.getElementById('roleSelect').value = role;
    this._startApp();
  }

  showLoginError(message) {
    const el = document.getElementById('loginError');
    if (el) el.textContent = message;
  }

  _startApp() {
    UIRenderer.renderQuickActions(this.currentRole);
    this._showWelcome();
    this._initSpeech();
    setTimeout(() => {
      const inp = document.getElementById('userInput');
      if (inp) inp.focus();
    }, 300);
    console.log('CampusAI initialized. Role:', this.currentRole);
  }

  /* ---- Role change ---- */
  setRole(role) {
    this.currentRole = role;
    this.ai.setRole(role);
    UIRenderer.clearMessages();
    UIRenderer.renderQuickActions(role);
    this._showWelcome();

    // Update role selector dropdown
    const sel = document.getElementById('roleSelect');
    if (sel) sel.value = role;

    console.log('Role changed to:', role);
  }

  /* ---- Show welcome message ---- */
  _showWelcome() {
    const roleData = CAMPUS_DATA.roles[this.currentRole];
    UIRenderer.appendSystemMsg(`— Session started as ${roleData.label} —`);
    UIRenderer.appendMessage(roleData.welcome, 'ai', roleData.icon);
  }

  /* ---- Send message from input ---- */
  async sendMessage() {
    if (this.isTyping) return;

    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';

    // Make sure chat section is visible
    if (!document.getElementById('section-chat').classList.contains('active')) {
      showSection('chat');
    }

    // Show user message
    const roleData = CAMPUS_DATA.roles[this.currentRole];
    UIRenderer.appendMessage(text, 'user', roleData.initials);

    // Show typing & generate response
    this.isTyping = true;
    UIRenderer.showTyping();

    const delay = 800 + Math.random() * 1000;
    await new Promise(r => setTimeout(r, delay));

    UIRenderer.hideTyping();
    const response = this.ai.generateResponse(text);
    UIRenderer.appendMessage(response, 'ai', roleData.icon);
    this.isTyping = false;

    input.focus();
  }

  /* ---- Send quick action chip ---- */
  sendQuick(text) {
    document.getElementById('userInput').value = text;
    this.sendMessage();
  }

  /* ---- Clear chat ---- */
  clearChat() {
    UIRenderer.clearMessages();
    this.ai.conversationHistory = [];
    this._showWelcome();
  }

  /* ---- Speech recognition ---- */
  _initSpeech() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const micBtn = document.getElementById('micBtn');
      if (micBtn) micBtn.style.display = 'none';
      return;
    }

    this.speechRecognition = new SpeechRecognition();
    this.speechRecognition.continuous = false;
    this.speechRecognition.lang = 'en-KE';
    this.speechRecognition.interimResults = false;

    this.speechRecognition.onstart = () => {
      const btn = document.getElementById('micBtn');
      if (btn) btn.style.opacity = '1';
    };

    this.speechRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById('userInput').value = transcript;
    };

    this.speechRecognition.onend = () => {
      const btn = document.getElementById('micBtn');
      if (btn) btn.style.opacity = '0.5';
    };

    this.speechRecognition.onerror = (e) => {
      console.warn('Speech recognition error:', e.error);
    };

    document.getElementById('micBtn').addEventListener('click', () => {
      if (this.speechRecognition) {
        try { this.speechRecognition.start(); } catch (e) { /* already started */ }
      }
    });
  }
}

/* ---- Initialize app on DOM ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  window.app = new CampusApp();
});

/* ---- Keyboard shortcuts ---- */
document.addEventListener('keydown', (e) => {
  // Ctrl+K: focus input
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    document.getElementById('userInput')?.focus();
  }
  // Ctrl+B: toggle sidebar
  if (e.ctrlKey && e.key === 'b') {
    e.preventDefault();
    toggleSidebar();
  }
});

/* ---- Mobile sidebar overlay ---- */
if (window.innerWidth <= 768) {
  document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebarToggle');
    if (sidebar.classList.contains('mobile-open') &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)) {
      sidebar.classList.remove('mobile-open');
    }
  });
}
