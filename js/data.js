/* =========================================
   CampusAI — Data Layer
   Campus knowledge base & role configurations
   ========================================= */

const CAMPUS_DATA = {

  /* ---- ROLE CONFIGURATIONS ---- */
  roles: {
    student: {
      id: 'student',
      label: 'Student',
      icon: '🎓',
      color: '#3b82f6',
      initials: 'ST',
      welcome: `Hello! I'm <strong>CampusAI</strong>, your smart campus assistant.<br>
        You're logged in as <span class="badge info">STUDENT</span><br><br>
        Here's how I can help you today:
        <ul>
          <li>📅 View your class schedule & timetable</li>
          <li>📚 Find library resources & book study rooms</li>
          <li>💳 Check fee balance & payment options</li>
          <li>🗺️ Navigate the campus & find buildings</li>
          <li>📝 Track assignment deadlines & grades</li>
          <li>🍽️ Check cafeteria menus & opening hours</li>
          <li>📢 Get campus news & events</li>
        </ul>
        What can I help you with today?`,
      quickActions: [
        'My timetable today',
        'Library hours & rooms',
        'Check fee balance',
        'Campus map',
        'Upcoming exams',
        'Cafeteria menu',
      ],
      dashboardCards: ['schedule', 'fees', 'library', 'grades'],
    },
    lecturer: {
      id: 'lecturer',
      label: 'Lecturer',
      icon: '👨‍🏫',
      color: '#10b981',
      initials: 'LC',
      welcome: `Welcome back! I'm <strong>CampusAI</strong>, your faculty assistant.<br>
        You're signed in as <span class="badge green">LECTURER</span><br><br>
        I can assist you with:
        <ul>
          <li>🗓️ View and manage your teaching schedule</li>
          <li>🏫 Book lecture halls and seminar rooms</li>
          <li>👥 Access student rosters & attendance</li>
          <li>📊 Submit and manage grades</li>
          <li>🔬 Reserve research labs & equipment</li>
          <li>📋 Faculty meeting schedules & notices</li>
          <li>🖨️ Request AV equipment & printing</li>
        </ul>
        How can I support you today?`,
      quickActions: [
        'My classes today',
        'Book a room',
        'Student attendance',
        'Submit grades',
        'Faculty notices',
        'Research lab booking',
      ],
      dashboardCards: ['classes', 'roomBookings', 'studentCount', 'gradeDeadlines'],
    },
    staff: {
      id: 'staff',
      label: 'Staff',
      icon: '🏢',
      color: '#f59e0b',
      initials: 'SF',
      welcome: `Hello! I'm <strong>CampusAI</strong>, your administrative assistant.<br>
        You're logged in as <span class="badge amber">STAFF</span><br><br>
        I can help you with:
        <ul>
          <li>📁 Access and submit administrative forms</li>
          <li>🏢 Manage office and facility requests</li>
          <li>👤 HR services, leave requests & payroll</li>
          <li>🔧 Submit IT support & maintenance tickets</li>
          <li>📦 Procurement and supply requisitions</li>
          <li>📢 Post and view internal announcements</li>
          <li>📊 Access institutional reports & data</li>
        </ul>
        What do you need today?`,
      quickActions: [
        'Submit leave request',
        'IT support ticket',
        'Procurement form',
        'Staff directory',
        'Internal notices',
        'My pay slip',
      ],
      dashboardCards: ['leaveBalance', 'pendingTickets', 'announcements', 'procurement'],
    },
    guest: {
      id: 'guest',
      label: 'Guest',
      icon: '👤',
      color: '#a78bfa',
      initials: 'GU',
      welcome: `Welcome to our campus! I'm <strong>CampusAI</strong>, your visitor guide.<br>
        You're accessing as a <span class="badge" style="background:rgba(167,139,250,0.12);color:#a78bfa">GUEST</span><br><br>
        I can help you find:
        <ul>
          <li>🗺️ Campus directions & parking information</li>
          <li>📞 Contact directory for departments & offices</li>
          <li>📅 Upcoming events & open days</li>
          <li>🎓 Admissions & course information</li>
          <li>🍽️ Cafeteria & visitor facilities</li>
          <li>🔒 Visitor registration & security</li>
          <li>🚌 Transport routes & shuttle services</li>
        </ul>
        How can I guide you today?`,
      quickActions: [
        'How to get here',
        'Admissions info',
        'Campus tour',
        'Upcoming events',
        'Contact directory',
        'Visitor parking',
      ],
      dashboardCards: ['events', 'admissions', 'contacts', 'transport'],
    },
  },

  /* ---- AI RESPONSE KNOWLEDGE BASE ---- */
  responses: {

    // SCHEDULE / TIMETABLE
    timetable: {
      keywords: ['timetable', 'schedule', 'class today', 'classes today', 'my classes', 'lecture today'],
      handler: (role) => {
        if (role === 'student') {
          return `Here's your schedule for <strong>today</strong>:<br>
            <div class="info-grid">
              <div class="info-card">
                <div class="ic-label">08:00 – 10:00</div>
                <div class="ic-val">CS301: Data Structures</div>
                <div class="ic-label">📍 Room B204 · Dr. Kamau</div>
              </div>
              <div class="info-card">
                <div class="ic-label">11:00 – 13:00</div>
                <div class="ic-val">MATH201: Linear Algebra</div>
                <div class="ic-label">📍 Room A101 · Prof. Wanjiku</div>
              </div>
              <div class="info-card">
                <div class="ic-label">14:00 – 16:00</div>
                <div class="ic-val">ENG401: Technical Writing</div>
                <div class="ic-label">📍 Room C305 · Dr. Omondi</div>
              </div>
              <div class="info-card">
                <div class="ic-label">Tomorrow</div>
                <div class="ic-val">Lab session at 2:00pm</div>
                <div class="ic-label">📍 ICT Lab D102</div>
              </div>
            </div>
            <br>Would you like to set reminders for any of these classes?`;
        }
        if (role === 'lecturer') {
          return `Your <strong>teaching schedule today</strong>:<br>
            <div class="info-grid">
              <div class="info-card">
                <div class="ic-label">09:00 – 11:00</div>
                <div class="ic-val">CS401: Algorithms</div>
                <div class="ic-label">📍 Hall 3 · 45 students enrolled</div>
              </div>
              <div class="info-card">
                <div class="ic-label">14:00 – 16:00</div>
                <div class="ic-val">CS201: Intro to Programming</div>
                <div class="ic-label">📍 Lab D102 · 38 students</div>
              </div>
            </div>
            <br>Attendance marking will be available 15 minutes before each class.`;
        }
        return `I can help check the schedule. Please log in with a <span class="badge info">STUDENT</span> or <span class="badge green">LECTURER</span> account to view personalized timetables.`;
      }
    },

    // LIBRARY
    library: {
      keywords: ['library', 'study room', 'book a room', 'resources', 'reading'],
      handler: () => `<strong>University Library</strong> — Current Hours<br><br>
        <span class="badge info">MON – FRI</span> 07:00 – 22:00<br>
        <span class="badge green">SATURDAY</span> 08:00 – 18:00<br>
        <span class="badge amber">SUNDAY</span> 10:00 – 16:00<br><br>
        🟢 <span class="success-text">Library is currently open.</span><br><br>
        <strong>Study Room Availability:</strong>
        <ul>
          <li>Room SR-01 (6 seats) — <span class="success-text">Available</span></li>
          <li>Room SR-02 (4 seats) — <span class="success-text">Available</span></li>
          <li>Room SR-03 (8 seats) — <span style="color:#ef4444">Occupied until 15:00</span></li>
          <li>Computer Lab (20 PCs) — <span class="success-text">Available</span></li>
        </ul>
        📧 Reserve online: <code>library.university.ac.ke</code> or call ext. <strong>2200</strong>`
    },

    // FEES
    fees: {
      keywords: ['fee', 'balance', 'payment', 'tuition', 'finance', 'pay', 'mpesa', 'invoice'],
      handler: () => `<strong>Fee Statement — Current Semester</strong><br>
        <div class="info-grid">
          <div class="info-card">
            <div class="ic-label">Total Fees</div>
            <div class="ic-val">KES 98,500</div>
          </div>
          <div class="info-card">
            <div class="ic-label">Amount Paid</div>
            <div class="ic-val success-text">KES 60,000</div>
          </div>
          <div class="info-card">
            <div class="ic-label">Balance Due</div>
            <div class="ic-val warn-text">KES 38,500</div>
          </div>
          <div class="info-card">
            <div class="ic-label">Payment Deadline</div>
            <div class="ic-val">15 Apr 2026</div>
          </div>
        </div>
        <br><span class="warn-text">⚠ Payment deadline in 14 days.</span><br><br>
        <strong>Payment Options:</strong>
        <ul>
          <li>💚 M-Pesa Paybill: <code>123456</code> · Account: Your Admission No.</li>
          <li>🏦 Bank: KCB A/C 1234567890 (University Finance)</li>
          <li>🏢 Finance Office: Block A, Room 105 (Mon–Fri, 8am–5pm)</li>
        </ul>`
    },

    // CAMPUS MAP / NAVIGATION
    map: {
      keywords: ['map', 'where is', 'how to find', 'location', 'building', 'navigate', 'directions', 'block'],
      handler: () => `📍 <strong>Campus Buildings & Locations</strong><br><br>
        <ul>
          <li>🏛️ <strong>Block A</strong> — Administration, Finance, Registrar, VC's Office</li>
          <li>📚 <strong>Block B</strong> — Main Lecture Halls (B101–B305, cap. 50–300)</li>
          <li>🔬 <strong>Block C</strong> — Science Labs, Engineering & Technology</li>
          <li>💻 <strong>Block D</strong> — ICT Centre, Computer Labs, Media Studio</li>
          <li>🏃 <strong>Block E</strong> — Sports Complex, Gym, Swimming Pool</li>
          <li>📖 <strong>Library</strong> — Central Campus, 3-storey, 500-seat capacity</li>
          <li>🍽️ <strong>Main Cafeteria</strong> — Near Gate 1, open 7am–8pm</li>
          <li>🏥 <strong>Health Centre</strong> — Near Gate 2, 24hr emergency</li>
          <li>🕌 <strong>Chapel / Mosque</strong> — East wing, near Block E</li>
        </ul>
        Open the <strong>Campus Map</strong> tab for an interactive visual map. Or ask me: <em>"Where is the Registrar's office?"</em>`
    },

    // EXAMS
    exams: {
      keywords: ['exam', 'test', 'assessment', 'cat', 'assignment', 'deadline', 'coursework'],
      handler: () => `📋 <strong>Upcoming Assessments</strong><br><br>
        <div class="info-grid">
          <div class="info-card">
            <div class="ic-label">10 Apr 2026</div>
            <div class="ic-val">CS301 CAT II</div>
            <div class="ic-label">📍 Hall B101 · 2pm</div>
          </div>
          <div class="info-card">
            <div class="ic-label">15 Apr 2026</div>
            <div class="ic-val">MATH201 Assignment</div>
            <div class="ic-label">Online submission · 11:59pm</div>
          </div>
          <div class="info-card">
            <div class="ic-label">22 Apr 2026</div>
            <div class="ic-val">ENG401 Term Paper</div>
            <div class="ic-label">Submit to Dept. office</div>
          </div>
          <div class="info-card">
            <div class="ic-label">May 2026</div>
            <div class="ic-val">Final Exams</div>
            <div class="ic-label">Timetable: portal.university.ac.ke</div>
          </div>
        </div>
        <br>Set exam reminders on the student portal under <em>My Academics → Exam Timetable.</em>`
    },

    // CAFETERIA
    cafeteria: {
      keywords: ['cafeteria', 'food', 'menu', 'lunch', 'dinner', 'breakfast', 'eat', 'canteen'],
      handler: () => `🍽️ <strong>Main Cafeteria — Today's Menu</strong><br><br>
        <span class="badge info">BREAKFAST</span> 7:00am – 9:30am<br>
        Mandazi, Chai, Uji, Bread & Butter — <em>KES 80</em><br><br>
        <span class="badge green">LUNCH</span> 12:00pm – 2:30pm<br>
        Rice & Beef Stew / Ugali & Sukuma wiki / Chapati & Chicken — <em>KES 150–200</em><br><br>
        <span class="badge amber">DINNER</span> 5:30pm – 7:30pm<br>
        Pilau / Pasta Bolognese / Matoke & Beef — <em>KES 180–220</em><br><br>
        🟢 <span class="success-text">Currently open</span> · Cashless payments accepted (campus card / M-Pesa).`
    },

    // ADMISSIONS
    admissions: {
      keywords: ['admission', 'apply', 'application', 'enroll', 'enrolment', 'courses', 'undergraduate', 'postgraduate', 'degree'],
      handler: () => `🎓 <strong>Admissions — Academic Year 2026/27</strong><br><br>
        <span class="badge info">UNDERGRADUATE</span><br>
        <ul>
          <li>📅 Applications: March 1 – June 30, 2026</li>
          <li>📋 Minimum: KCSE Mean Grade <strong>C+</strong></li>
          <li>💰 Application Fee: KES 2,000 (non-refundable)</li>
          <li>📄 Required docs: KCSE Certificate, National ID, 2 photos</li>
        </ul>
        <span class="badge green">POSTGRADUATE</span><br>
        <ul>
          <li>Degree or equivalent required</li>
          <li>Applications open year-round</li>
          <li>Research proposals for PhD applicants</li>
        </ul>
        🌐 Apply at: <code>admissions.university.ac.ke</code><br>
        📞 Admissions Office: <strong>0800 123 456</strong> (toll-free)<br>
        📅 Open Day: <strong>Saturday, May 10, 2026</strong> — All welcome!`
    },

    // GETTING HERE (GUEST)
    directions: {
      keywords: ['get here', 'directions', 'how to come', 'matatu', 'bus', 'parking', 'transport', 'route'],
      handler: () => `📍 <strong>Getting to Campus</strong><br><br>
        <strong>🚌 By Matatu (Public Transport)</strong><br>
        <ul>
          <li>Route <strong>44</strong> & <strong>58</strong> — stops at Main Gate (Gate 1)</li>
          <li>Route <strong>107</strong> — stops at East Gate (Gate 2)</li>
          <li>From CBD: 25–40 min depending on traffic</li>
        </ul>
        <strong>🚗 By Car</strong><br>
        <ul>
          <li>GPS: University Road, off Thika Highway</li>
          <li>Visitor parking at Gate 2 (free, ID required)</li>
          <li>Overflow parking at Gate 3 on busy days</li>
        </ul>
        <strong>🔒 Visitor Registration</strong><br>
        All visitors must register at Gate 1 security desk. You'll receive a visitor pass valid for the day.<br><br>
        📞 Security Control: <strong>0700 000 111</strong><br>
        🕐 Gates open: <strong>6:00am – 10:00pm</strong>`
    },

    // HR / LEAVE (STAFF)
    leave: {
      keywords: ['leave', 'annual leave', 'sick leave', 'leave request', 'days off', 'holiday'],
      handler: () => `📋 <strong>HR Leave Request</strong><br><br>
        <strong>How to apply:</strong>
        <ol style="margin:8px 0 10px 18px">
          <li>Log in to HR Portal: <code>hr.university.ac.ke</code></li>
          <li>Go to <em>My Profile → Leave Management</em></li>
          <li>Select leave type and enter dates</li>
          <li>Attach supporting documents (for sick/compassionate leave)</li>
          <li>Submit — your line manager will be notified</li>
        </ol>
        <strong>Leave Types Available:</strong><br>
        <span class="badge green">Annual Leave</span>
        <span class="badge info">Sick Leave</span>
        <span class="badge amber">Maternity / Paternity</span>
        <span class="badge">Study Leave</span>
        <span class="badge">Compassionate Leave</span><br><br>
        <strong>Your Leave Balance (2026):</strong><br>
        Annual Leave: <span class="success-text">12 days remaining</span> of 21<br>
        Sick Leave: <span class="success-text">10 days</span> available<br><br>
        📞 HR Office: Block A, Room 203 · Ext. <strong>2050</strong>`
    },

    // IT SUPPORT
    itSupport: {
      keywords: ['it support', 'it ticket', 'computer problem', 'network', 'wifi', 'internet', 'technical support', 'laptop', 'printer'],
      handler: () => `🔧 <strong>IT Support</strong><br><br>
        <strong>Raise a Ticket:</strong>
        <ul>
          <li>🌐 Online: <code>helpdesk.university.ac.ke</code></li>
          <li>📧 Email: <code>itsupport@university.ac.ke</code></li>
          <li>📞 Call: Ext. <strong>2400</strong> (Mon–Fri, 8am–6pm)</li>
          <li>🏢 Walk-in: Block D, Room 001 (ICT Centre)</li>
        </ul>
        <strong>Common Issues:</strong><br>
        <span class="badge info">WiFi Login</span>
        <span class="badge info">Email Setup</span>
        <span class="badge amber">Printer Access</span>
        <span class="badge amber">Portal Login</span>
        <span class="badge">Software Requests</span><br><br>
        <em>WiFi SSID: <code>UniCampus</code> · Login with your staff/student credentials</em><br><br>
        ⏱ Average ticket response time: <strong>2–4 hours</strong>`
    },

    // ROOM BOOKING (LECTURER/STAFF)
    roomBooking: {
      keywords: ['book a room', 'room booking', 'reserve hall', 'lecture hall', 'seminar room', 'conference room'],
      handler: () => `🏫 <strong>Room Booking System</strong><br><br>
        <strong>Available Rooms Today:</strong>
        <div class="info-grid">
          <div class="info-card">
            <div class="ic-label">Hall B101</div>
            <div class="ic-val">Capacity: 120</div>
            <div class="ic-label">🟢 Free after 2pm</div>
          </div>
          <div class="info-card">
            <div class="ic-label">Seminar Room C204</div>
            <div class="ic-val">Capacity: 30</div>
            <div class="ic-label">🟢 Available all day</div>
          </div>
          <div class="info-card">
            <div class="ic-label">Conference Room A301</div>
            <div class="ic-val">Capacity: 15</div>
            <div class="ic-label">🟢 Free after 11am</div>
          </div>
          <div class="info-card">
            <div class="ic-label">Computer Lab D102</div>
            <div class="ic-val">20 PCs · Capacity: 20</div>
            <div class="ic-label">🟡 Booked until 12pm</div>
          </div>
        </div>
        <br>📅 Book at: <code>rooms.university.ac.ke</code> or call Estates Ext. <strong>2300</strong>`
    },

    // DEFAULT FALLBACK
    default: {
      handler: (query, role) => `I received your question about: <em>"${query}"</em><br><br>
        Let me help you find the right information. As your campus assistant I can connect you to:<br>
        <ul>
          <li>📚 Academic Services — schedules, grades, library</li>
          <li>🏢 Administrative Offices — finance, admissions, HR</li>
          <li>🏗️ Campus Facilities — maps, rooms, transport</li>
          <li>📢 News & Events — announcements, activities</li>
        </ul>
        For more specific queries, you can also:
        <ul>
          <li>Visit the <strong>Student/Staff Portal</strong> at <code>portal.university.ac.ke</code></li>
          <li>Contact the <strong>Help Desk</strong>: Ext. <strong>2000</strong> or <code>help@university.ac.ke</code></li>
          <li>Visit the <strong>Information Centre</strong>: Block A, Ground Floor (8am–5pm)</li>
        </ul>
        Shall I connect you with a specific department?`
    }
  },

  /* ---- EVENTS DATA ---- */
  events: [
    {
      day: '10', month: 'APR',
      title: 'CS Department Research Symposium',
      location: 'Hall B201',
      time: '9:00am – 5:00pm',
      desc: 'Annual research presentations from final-year students and postgraduate researchers.',
      type: 'Academic', typeColor: 'info',
    },
    {
      day: '10', month: 'APR',
      title: 'Engineering CAT II — CS301',
      location: 'Hall B101',
      time: '2:00pm – 4:00pm',
      desc: 'Continuous Assessment Test for CS301 Data Structures. Bring student ID.',
      type: 'Exam', typeColor: 'red',
    },
    {
      day: '15', month: 'APR',
      title: 'Career Fair 2026',
      location: 'Main Grounds & Sports Hall',
      time: '10:00am – 4:00pm',
      desc: 'Over 50 companies recruiting for internships and full-time positions. Bring your CV.',
      type: 'Career', typeColor: 'green',
    },
    {
      day: '18', month: 'APR',
      title: 'Inter-University Football Tournament',
      location: 'Sports Complex',
      time: 'All day',
      desc: 'Cheer on our team as they compete against 8 universities in the regional championship.',
      type: 'Sports', typeColor: 'amber',
    },
    {
      day: '22', month: 'APR',
      title: 'Mental Health Awareness Week Kickoff',
      location: 'Student Centre',
      time: '2:00pm – 6:00pm',
      desc: 'Free counselling sessions, wellness workshops, and relaxation activities for all students.',
      type: 'Wellness', typeColor: 'purple',
    },
    {
      day: '10', month: 'MAY',
      title: 'Open Day 2026',
      location: 'Main Campus',
      time: '9:00am – 4:00pm',
      desc: 'Prospective students welcome! Campus tours, admissions info, and departmental showcases.',
      type: 'Admissions', typeColor: 'info',
    },
  ],

  /* ---- DIRECTORY DATA ---- */
  directory: [
    { name: 'Dr. Amina Kamau', role: 'Head of Computer Science', email: 'a.kamau@university.ac.ke', phone: 'Ext. 3100', initials: 'AK', color: '#3b82f6' },
    { name: 'Prof. James Wanjiku', role: 'Dean, Faculty of Science', email: 'j.wanjiku@university.ac.ke', phone: 'Ext. 3001', initials: 'JW', color: '#10b981' },
    { name: 'Ms. Grace Achieng', role: 'Registrar', email: 'registrar@university.ac.ke', phone: 'Ext. 2010', initials: 'GA', color: '#f59e0b' },
    { name: 'Mr. Peter Otieno', role: 'Director of Finance', email: 'finance@university.ac.ke', phone: 'Ext. 2100', initials: 'PO', color: '#a78bfa' },
    { name: 'Dr. Fatuma Hassan', role: 'University Librarian', email: 'library@university.ac.ke', phone: 'Ext. 2200', initials: 'FH', color: '#06b6d4' },
    { name: 'Mr. David Mwangi', role: 'Head of IT Services', email: 'itsupport@university.ac.ke', phone: 'Ext. 2400', initials: 'DM', color: '#ef4444' },
    { name: 'Ms. Lydia Njoroge', role: 'Student Affairs Officer', email: 'studentaffairs@university.ac.ke', phone: 'Ext. 2500', initials: 'LN', color: '#10b981' },
    { name: 'Mr. Samuel Kipchoge', role: 'Head of Security', email: 'security@university.ac.ke', phone: '0700 000 111', initials: 'SK', color: '#64748b' },
    { name: 'Dr. Ruth Wekesa', role: 'Health Centre Director', email: 'health@university.ac.ke', phone: 'Ext. 2600', initials: 'RW', color: '#ef4444' },
    { name: 'Ms. Caroline Nduta', role: 'HR Manager', email: 'hr@university.ac.ke', phone: 'Ext. 2050', initials: 'CN', color: '#f59e0b' },
    { name: 'Admissions Office', role: 'Student Admissions', email: 'admissions@university.ac.ke', phone: '0800 123 456', initials: '📋', color: '#3b82f6' },
    { name: 'Main Reception', role: 'Information & Visitors', email: 'info@university.ac.ke', phone: 'Ext. 2000', initials: '📞', color: '#6b7280' },
  ],

  /* ---- CAMPUS BUILDINGS (for map) ---- */
  buildings: [
    { id: 'admin', name: 'Block A\nAdmin', icon: '🏛️', x: 15, y: 20, w: 120, h: 70 },
    { id: 'lectures', name: 'Block B\nLectures', icon: '📚', x: 45, y: 15, w: 130, h: 90 },
    { id: 'science', name: 'Block C\nScience', icon: '🔬', x: 60, y: 55, w: 110, h: 70 },
    { id: 'ict', name: 'Block D\nICT', icon: '💻', x: 30, y: 60, w: 100, h: 65 },
    { id: 'sports', name: 'Block E\nSports', icon: '🏃', x: 72, y: 25, w: 120, h: 80 },
    { id: 'library', name: 'Library', icon: '📖', x: 48, y: 38, w: 100, h: 60 },
    { id: 'caf', name: 'Cafeteria', icon: '🍽️', x: 15, y: 50, w: 90, h: 55 },
    { id: 'health', name: 'Health\nCentre', icon: '🏥', x: 78, y: 60, w: 90, h: 55 },
  ],
};
