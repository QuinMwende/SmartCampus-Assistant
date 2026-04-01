/* =========================================
   CampusAI — AI Engine
   Natural language processing, intent detection,
   response generation & conversation management
   ========================================= */

class AIEngine {
  constructor() {
    this.conversationHistory = [];
    this.currentRole = 'student';
    this.sessionContext = {};
    this.responseCache = new Map();

    // Intent patterns for fuzzy matching
    this.intentPatterns = {
      greeting:    /^(hi|hello|hey|good morning|good afternoon|good evening|hujambo|habari|sasa)/i,
      thanks:      /(thank you|thanks|asante|cheers|appreciated)/i,
      help:        /(help|assist|support|what can you do|capabilities)/i,
      bye:         /(bye|goodbye|see you|later|done|exit)/i,
      emergency:   /(emergency|urgent|danger|fire|accident|ambulance|police)/i,
      affirmative: /^(yes|yeah|yep|sure|ok|okay|proceed|go ahead)/i,
      negative:    /^(no|nope|nah|not really|don't|cancel)/i,
    };

    // Spell-correction dictionary for common campus terms
    this.spellingFixes = {
      'libary':    'library',
      'libraray':  'library',
      'scedule':   'schedule',
      'timetabl':  'timetable',
      'cafetria':  'cafeteria',
      'cafetaria': 'cafeteria',
      'admition':  'admission',
      'examns':    'exams',
      'frees':     'fees',
    };
  }

  /* ---- Pre-process input ---- */
  preprocess(text) {
    let q = text.toLowerCase().trim();
    // Apply spelling corrections
    for (const [wrong, right] of Object.entries(this.spellingFixes)) {
      q = q.replace(new RegExp(wrong, 'gi'), right);
    }
    return q;
  }

  /* ---- Detect intent from query ---- */
  detectIntent(query) {
    const q = this.preprocess(query);

    // Check small-talk intents first
    if (this.intentPatterns.greeting.test(q))   return { type: 'greeting' };
    if (this.intentPatterns.thanks.test(q))      return { type: 'thanks' };
    if (this.intentPatterns.bye.test(q))         return { type: 'bye' };
    if (this.intentPatterns.help.test(q))        return { type: 'help' };
    if (this.intentPatterns.emergency.test(q))   return { type: 'emergency' };

    // Match against knowledge base
    for (const [key, entry] of Object.entries(CAMPUS_DATA.responses)) {
      if (key === 'default') continue;
      if (entry.keywords && entry.keywords.some(kw => q.includes(kw))) {
        return { type: 'knowledge', key };
      }
    }

    return { type: 'unknown', query };
  }

  /* ---- Generate response based on intent ---- */
  generateResponse(query) {
    const intent = this.detectIntent(query);
    this.conversationHistory.push({ role: 'user', content: query });

    let response;

    switch (intent.type) {
      case 'greeting':
        response = this._greetingResponse();
        break;
      case 'thanks':
        response = this._thanksResponse();
        break;
      case 'bye':
        response = this._byeResponse();
        break;
      case 'help':
        response = this._helpResponse();
        break;
      case 'emergency':
        response = this._emergencyResponse();
        break;
      case 'knowledge':
        const entry = CAMPUS_DATA.responses[intent.key];
        response = typeof entry.handler === 'function'
          ? entry.handler(this.currentRole, query)
          : entry.response;
        break;
      default:
        response = CAMPUS_DATA.responses.default.handler(query, this.currentRole);
    }

    this.conversationHistory.push({ role: 'assistant', content: response });
    this._pruneHistory();
    return response;
  }

  /* ---- Special responses ---- */
  _greetingResponse() {
    const greetings = [
      `Hello! 👋 How can I assist you today?`,
      `Hi there! I'm CampusAI, ready to help. What do you need?`,
      `Good day! What can I help you with on campus today?`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  _thanksResponse() {
    const responses = [
      `You're welcome! Is there anything else I can help you with?`,
      `Happy to help! Feel free to ask if you need anything else.`,
      `Glad I could assist! Let me know if you have more questions.`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  _byeResponse() {
    return `Goodbye! Have a great day on campus. 🎓 Come back anytime you need help!`;
  }

  _helpResponse() {
    const roleData = CAMPUS_DATA.roles[this.currentRole];
    return `I'm <strong>CampusAI</strong>, your smart campus assistant for <strong>
      ${roleData.label}s</strong>.<br><br>
      <strong>What I can do:</strong>
      <ul>
        <li>Answer questions about campus services, schedules & facilities</li>
        <li>Guide you to the right offices and contacts</li>
        <li>Provide information on fees, events, and resources</li>
        <li>Help with administrative processes and requests</li>
      </ul>
      <strong>Tips for best results:</strong>
      <ul>
        <li>Use the quick-action chips below for common queries</li>
        <li>Switch your role (top right) for role-specific information</li>
        <li>Explore the sidebar tabs: Dashboard, Map, Events, Directory</li>
      </ul>
      What would you like to know?`;
  }

  _emergencyResponse() {
    return `🚨 <strong style="color:#ef4444">EMERGENCY CONTACTS</strong><br><br>
      <strong>🚑 Campus Ambulance:</strong> <code style="color:#ef4444">0700 911 911</code><br>
      <strong>🚒 Fire Brigade:</strong> <code style="color:#ef4444">0800 723 456</code><br>
      <strong>👮 Security Control:</strong> <code style="color:#ef4444">0700 000 111</code><br>
      <strong>🏥 Health Centre:</strong> Ext. <code>2600</code> (24hr emergency)<br>
      <strong>🚓 Police (National):</strong> <code>999</code> or <code>112</code><br><br>
      <strong>Assembly Points:</strong><br>
      <ul>
        <li>Main Grounds (Gate 1 area) — for Blocks A, B, Library</li>
        <li>Sports Field — for Blocks C, D, E</li>
        <li>Parking Lot Gate 2 — for Health Centre & Cafeteria</li>
      </ul>
      <span style="color:#ef4444">⚠ If this is an active emergency, please call immediately and evacuate to the nearest assembly point.</span>`;
  }

  /* ---- Manage history size ---- */
  _pruneHistory() {
    if (this.conversationHistory.length > 40) {
      this.conversationHistory = this.conversationHistory.slice(-30);
    }
  }

  /* ---- Set current role ---- */
  setRole(role) {
    this.currentRole = role;
    this.conversationHistory = [];
    this.sessionContext = {};
  }

  /* ---- Get conversation summary ---- */
  getSummary() {
    return {
      role: this.currentRole,
      messageCount: this.conversationHistory.length,
      startTime: this.sessionStart,
    };
  }
}
