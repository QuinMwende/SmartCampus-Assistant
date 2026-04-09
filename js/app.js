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
    this.users = [];
    this._loadUsers();
    this._setupAuth();
  }

  async _loadUsers() {
    try {
      // First try to load from localStorage (for newly registered users)
      const savedUsers = localStorage.getItem('campusUsers');
      if (savedUsers) {
        this.users = JSON.parse(savedUsers);
        console.log('Loaded users from localStorage:', this.users.length);
        return;
      }

      // Otherwise load from JSON file
      const response = await fetch('users.json');
      this.users = await response.json();
      console.log('Loaded users from JSON file:', this.users.length);
    } catch (error) {
      console.error('Failed to load users:', error);
      // Fallback to hardcoded users if JSON fails to load
      this.users = [
        { username: 'STU001', password: 'student123', role: 'student', name: 'John Doe', regNo: 'STU001' },
        { username: 'LEC001', password: 'lecturer123', role: 'lecturer', name: 'Dr. Jane Smith', regNo: 'LEC001' },
        { username: 'STF001', password: 'staff123', role: 'staff', name: 'Mike Johnson', regNo: 'STF001' }
      ];
    }
  }

  _setupAuth() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('usernameInput').value.trim();
        const password = document.getElementById('passwordInput').value;
        await this.login(username, password);
      });
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('signupName').value.trim();
        const username = document.getElementById('signupUsername').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const role = document.getElementById('signupRole').value;
        await this.signup(name, username, password, confirmPassword, role);
      });
    }

    // Toggle between login and signup
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    
    if (showSignup) {
      showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        this.showSignupForm();
      });
    }
    
    if (showLogin) {
      showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        this.showLoginForm();
      });
    }
  }

  async login(username, password) {
    // Ensure users are loaded
    if (this.users.length === 0) {
      await this._loadUsers();
    }

    const user = this.users.find(u => u.username === username && u.password === password);
    if (!user) {
      this.showLoginError('Invalid credentials. Please try again.');
      return;
    }

    this.activeUser = user;
    this.currentRole = user.role;
    this.ai.setRole(user.role);

    document.getElementById('loginError').textContent = '';
    const authScreen = document.getElementById('authScreen');
    const appRoot = document.getElementById('app');
    if (authScreen) authScreen.classList.add('hidden');
    if (appRoot) {
      appRoot.classList.remove('hidden');
      appRoot.hidden = false;
    }
    document.getElementById('userNameDisplay').textContent = user.name;
    document.getElementById('roleSelect').value = user.role;
    document.getElementById('roleSelect').disabled = true;
    this._startApp();
  }

  showLoginError(message) {
    const el = document.getElementById('loginError');
    if (el) el.textContent = message;
  }

  async signup(name, username, password, confirmPassword, role) {
    // Clear previous errors
    document.getElementById('signupError').textContent = '';

    // Validation
    if (!name || !username || !password || !confirmPassword || !role) {
      this.showSignupError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      this.showSignupError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      this.showSignupError('Password must be at least 6 characters long.');
      return;
    }

    // Ensure users are loaded
    if (this.users.length === 0) {
      await this._loadUsers();
    }

    // Check if username already exists
    const existingUser = this.users.find(u => u.username === username);
    if (existingUser) {
      this.showSignupError('Username already exists. Please choose a different one.');
      return;
    }

    // Create new user
    const newUser = {
      username: username,
      password: password,
      role: role,
      name: name,
      regNo: username
    };

    // Add to users array
    this.users.push(newUser);

    // In a real application, this would be saved to a server
    // For now, we'll just store in localStorage as a demo
    try {
      localStorage.setItem('campusUsers', JSON.stringify(this.users));
      console.log('New user registered:', newUser);
    } catch (error) {
      console.error('Failed to save user to localStorage:', error);
    }

    // Auto-login the new user
    this.activeUser = newUser;
    this.currentRole = newUser.role;
    this.ai.setRole(newUser.role);

    const authScreen = document.getElementById('authScreen');
    const appRoot = document.getElementById('app');
    if (authScreen) authScreen.classList.add('hidden');
    if (appRoot) {
      appRoot.classList.remove('hidden');
      appRoot.hidden = false;
    }
    document.getElementById('userNameDisplay').textContent = newUser.name;
    document.getElementById('roleSelect').value = newUser.role;
    document.getElementById('roleSelect').disabled = true;
    this._startApp();
  }

  showSignupError(message) {
    const el = document.getElementById('signupError');
    if (el) el.textContent = message;
  }

  showSignupForm() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('signupSection').style.display = 'block';
  }

  showLoginForm() {
    document.getElementById('signupSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
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

  /* ---- Logout ---- */
  logout() {
    // Clear user session
    this.activeUser = null;
    this.currentRole = 'student';
    this.ai.setRole('student');

    // Clear chat
    UIRenderer.clearMessages();
    this.ai.conversationHistory = [];

    // Reset UI
    document.getElementById('userNameDisplay').textContent = 'Student';
    document.getElementById('roleSelect').value = 'student';
    document.getElementById('roleSelect').disabled = false;
    document.getElementById('pageTitle').textContent = 'Chat Assistant';

    // Hide app and show auth screen
    const authScreen = document.getElementById('authScreen');
    const appRoot = document.getElementById('app');
    if (appRoot) {
      appRoot.classList.add('hidden');
      appRoot.hidden = true;
    }
    if (authScreen) authScreen.classList.remove('hidden');

    // Reset to login form
    this.showLoginForm();

    console.log('User logged out');
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
