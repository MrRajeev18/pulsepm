/**
 * PulsePM - Unified Project Management Application
 * Pure Modular ES6 Architecture with LocalStorage Persistence
 */

(function () {
  'use strict';

  if (typeof console === 'undefined') {
    globalThis.console = { log: function () {}, warn: function () {}, error: function () {} };
  }

  // =========================================================================
  // 1. DEFAULT MOCK & SEED DATA
  // =========================================================================

  const UNIFIED_USER = {
    id: 'usr_alex_01',
    name: 'Alex Morgan',
    avatar: 'AM',
    identities: {
      email: 'alex.morgan@gmail.com',
      phone: '+1 (555) 382-9104',
      google: 'alex.morgan@gmail.com'
    }
  };

  const PAST_COLLABORATORS = [];

  const INITIAL_PROJECTS = [
    {
      id: 'PRJ-4812',
      joinCode: '749-218',
      name: 'AI-Powered Customer Portal',
      group: 'Engineering',
      description: 'End-to-end self-service customer intelligence portal featuring LLM summarization, automated ticket triage, and analytics widgets.',
      startDate: '2026-08-15',
      deadline: '2026-10-15',
      creatorId: 'usr_alex_01',
      taskAssignmentPolicy: 'anyone',
      specialAssigners: [],
      members: [
        { id: 'usr_alex_01', name: 'Alex Morgan', email: 'alex.morgan@gmail.com', role: 'Owner', avatar: 'AM' },
        { id: 'usr_marcus_03', name: 'Marcus Chen', email: 'marcus.chen@gmail.com', role: 'Backend Lead', avatar: 'MC' },
        { id: 'usr_david_05', name: 'David Kim', email: 'david.kim@devteam.io', role: 'Engineer', avatar: 'DK' }
      ],
      tasks: [
        {
          id: 'tsk-101',
          title: 'Implement OAuth 2.0 & unified JWT session tokens',
          description: 'Link email, phone OTP, and Google ID token validation into single unified user session.',
          priority: 'Urgent',
          dueDate: '2026-09-12',
          assigneeId: 'usr_alex_01',
          assigneeName: 'Alex Morgan',
          status: 'pending', // pending | in_progress | completed
          subtasks: [
            { id: 'st-101-1', title: 'Configure Google OAuth client secret and redirect URIs', completed: true },
            { id: 'st-101-2', title: 'Implement JWT session issuance with 14-day refresh', completed: false },
            { id: 'st-101-3', title: 'Write unit tests for session invalidation on logout', completed: false }
          ],
          comments: [
            {
              id: 'cmt-101-1',
              authorId: 'usr_alex_01',
              authorName: 'Alex Morgan',
              authorAvatar: 'AM',
              text: 'Completed OAuth client configuration. Working on refresh token rotation next.',
              timestamp: '2026-09-10T14:30:00.000Z'
            }
          ]
        },
        {
          id: 'tsk-102',
          title: 'Build vector embedding pipeline for support articles',
          description: 'Index documentation into pgvector with nightly re-indexing cron.',
          priority: 'High',
          dueDate: '2026-09-18',
          assigneeId: 'usr_marcus_03',
          assigneeName: 'Marcus Chen',
          status: 'in_progress',
          subtasks: [
            { id: 'st-102-1', title: 'Deploy pgvector extension to Postgres database', completed: true },
            { id: 'st-102-2', title: 'Batch embed 500 support articles via Gemini Embedding API', completed: true },
            { id: 'st-102-3', title: 'Configure cron job for nightly index synchronization', completed: false }
          ],
          comments: [
            {
              id: 'cmt-102-1',
              authorId: 'usr_marcus_03',
              authorName: 'Marcus Chen',
              authorAvatar: 'MC',
              text: 'Embedding script finished processing all articles. Testing similarity search threshold now.',
              timestamp: '2026-09-10T16:45:00.000Z'
            }
          ]
        },
        {
          id: 'tsk-103',
          title: 'Design responsive query history dashboard',
          description: 'Clean responsive data tables with export to CSV/JSON.',
          priority: 'Medium',
          dueDate: '2026-09-24',
          assigneeId: 'usr_alex_01',
          assigneeName: 'Alex Morgan',
          status: 'pending',
          subtasks: [
            { id: 'st-103-1', title: 'Create query history table markup and pagination', completed: false },
            { id: 'st-103-2', title: 'Add client-side CSV export generator', completed: false }
          ],
          comments: []
        },
        {
          id: 'tsk-104',
          title: 'Setup Kubernetes staging cluster & ingress routing',
          description: 'Provision staging namespace with automated TLS certificates.',
          priority: 'High',
          dueDate: '2026-08-30',
          assigneeId: 'usr_david_05',
          assigneeName: 'David Kim',
          status: 'completed',
          completedDate: '2026-08-30',
          subtasks: [
            { id: 'st-104-1', title: 'Apply cert-manager cluster issuer manifest', completed: true },
            { id: 'st-104-2', title: 'Configure staging ingress with Let\'s Encrypt TLS', completed: true }
          ],
          comments: [
            {
              id: 'cmt-104-1',
              authorId: 'usr_david_05',
              authorName: 'David Kim',
              authorAvatar: 'DK',
              text: 'TLS certificates issued and ingress routing is active on staging.pulsepm.io.',
              timestamp: '2026-08-30T18:00:00.000Z'
            }
          ]
        }
      ],
      chats: [
        {
          id: 'msg-1',
          senderId: 'usr_marcus_03',
          senderName: 'Marcus Chen',
          senderAvatar: 'MC',
          text: 'Hey team, I pushed the schema migrations for the vector database. Let me know when ready to test.',
          timestamp: 'Yesterday at 3:45 PM',
          isOwn: false,
          readBy: ['usr_alex_01']
        },
        {
          id: 'msg-2',
          senderId: 'usr_alex_01',
          senderName: 'Alex Morgan',
          senderAvatar: 'AM',
          text: 'Awesome work Marcus! I will hook up the auth verification pipeline this afternoon.',
          timestamp: 'Yesterday at 4:10 PM',
          isOwn: true,
          readBy: ['usr_alex_01']
        },
        {
          id: 'msg-3',
          senderId: 'usr_david_05',
          senderName: 'David Kim',
          senderAvatar: 'DK',
          text: 'Staging ingress is fully mapped and healthy. Ready for deployment!',
          timestamp: 'Today at 10:15 AM',
          isOwn: false,
          readBy: ['usr_alex_01']
        }
      ],
      activity: [
        { id: 'act-1', text: 'Alex Morgan created project AI-Powered Customer Portal', time: '3 weeks ago', icon: 'project' },
        { id: 'act-2', text: 'David Kim marked "Setup Kubernetes staging cluster" as Completed', time: '1 week ago', icon: 'task' },
        { id: 'act-3', text: 'Marcus Chen joined the project as Backend Lead', time: '5 days ago', icon: 'member' }
      ]
    },
    {
      id: 'PRJ-3190',
      joinCode: '851-402',
      name: 'Brand Design System 2.0',
      group: 'Product & Design',
      description: 'Unified cross-platform design token repository, accessible web components, and typography guidelines.',
      startDate: '2026-09-01',
      deadline: '2026-11-01',
      creatorId: 'usr_alex_01',
      taskAssignmentPolicy: 'creator_admin',
      specialAssigners: ['usr_elena_02'],
      members: [
        { id: 'usr_alex_01', name: 'Alex Morgan', email: 'alex.morgan@gmail.com', role: 'Owner', avatar: 'AM' },
        { id: 'usr_elena_02', name: 'Elena Rostova', email: 'elena.rostova@gmail.com', role: 'Design Lead', avatar: 'ER' },
        { id: 'usr_priya_06', name: 'Priya Patel', email: 'priya.patel@designstudio.org', role: 'Contributor', avatar: 'PP' }
      ],
      tasks: [
        {
          id: 'tsk-201',
          title: 'Review WCAG 2.1 AA color contrast palette',
          description: 'Audit dark and light mode tokens for button, chip, and card surfaces.',
          priority: 'High',
          dueDate: '2026-09-14',
          assigneeId: 'usr_alex_01',
          assigneeName: 'Alex Morgan',
          status: 'pending'
        },
        {
          id: 'tsk-202',
          title: 'Publish Figma UI Component Kit v2.4',
          description: 'Auto-layout buttons, dropdowns, modal frames and responsive grid layouts.',
          priority: 'Urgent',
          dueDate: '2026-09-20',
          assigneeId: 'usr_elena_02',
          assigneeName: 'Elena Rostova',
          status: 'in_progress'
        },
        {
          id: 'tsk-203',
          title: 'Export icon font and SVG sprite assets',
          description: 'Clean vector icons with 2px stroke width standard.',
          priority: 'Low',
          dueDate: '2026-09-28',
          assigneeId: 'usr_priya_06',
          assigneeName: 'Priya Patel',
          status: 'completed',
          completedDate: '2026-09-06'
        }
      ],
      chats: [
        {
          id: 'msg-21',
          senderId: 'usr_elena_02',
          senderName: 'Elena Rostova',
          senderAvatar: 'ER',
          text: 'The new color palette is uploaded in Figma. Check out the dark mode surface tokens!',
          timestamp: 'Sep 5 at 2:20 PM',
          isOwn: false,
          readBy: ['usr_alex_01']
        }
      ],
      activity: [
        { id: 'act-21', text: 'Elena Rostova joined project Brand Design System 2.0', time: 'Sep 2', icon: 'member' },
        { id: 'act-22', text: 'Priya Patel completed "Export icon font and SVG sprite assets"', time: 'Sep 6', icon: 'task' }
      ]
    },
    {
      id: 'PRJ-6701',
      joinCode: '629-504',
      name: 'Q4 Growth & Omnichannel Launch',
      group: 'Marketing & Growth',
      description: 'Comprehensive marketing campaigns, conversion rate landing pages, and customer lifecycle onboarding sequences.',
      startDate: '2026-09-05',
      deadline: '2026-11-20',
      creatorId: 'usr_alex_01',
      taskAssignmentPolicy: 'anyone',
      specialAssigners: [],
      members: [
        { id: 'usr_alex_01', name: 'Alex Morgan', email: 'alex.morgan@gmail.com', role: 'Advisor', avatar: 'AM' },
        { id: 'usr_sarah_04', name: 'Sarah Jenkins', email: 'sarah.jenkins@growthcorp.io', role: 'Lead', avatar: 'SJ' }
      ],
      tasks: [
        {
          id: 'tsk-301',
          title: 'Finalize interactive onboarding product tour',
          description: 'Configure telemetry triggers and milestone checklists for first-time signups.',
          priority: 'Urgent',
          dueDate: '2026-09-10',
          assigneeId: 'usr_alex_01',
          assigneeName: 'Alex Morgan',
          status: 'pending'
        },
        {
          id: 'tsk-302',
          title: 'A/B test value proposition headlines on landing page',
          description: 'Track conversion funnel from hero CTA to registration complete.',
          priority: 'Medium',
          dueDate: '2026-09-22',
          assigneeId: 'usr_sarah_04',
          assigneeName: 'Sarah Jenkins',
          status: 'in_progress'
        }
      ],
      chats: [
        {
          id: 'msg-31',
          senderId: 'usr_sarah_04',
          senderName: 'Sarah Jenkins',
          senderAvatar: 'SJ',
          text: 'Alex, the onboarding tour wireframes look super slick! Ready when you are.',
          timestamp: 'Yesterday at 11:30 AM',
          isOwn: false,
          readBy: ['usr_alex_01']
        }
      ],
      activity: [
        { id: 'act-31', text: 'Sarah Jenkins created Q4 Growth & Omnichannel Launch', time: 'Sep 5', icon: 'project' }
      ]
    }
  ];

  // =========================================================
  // 2. APPLICATION STATE STORE
  // =========================================================
  const STORAGE_KEY = 'pulsepm_state_v1';

  let state = {
    isLoggedIn: false,
    currentUser: UNIFIED_USER,
    projects: INITIAL_PROJECTS,
    collaborators: PAST_COLLABORATORS,
    activeProjectId: null,
    activeProjectTab: 'overview',
    projectGroupFilter: 'all',
    pendingTaskFilter: 'all',
    projectTaskFilter: 'all',
    projectTaskSearchQuery: '',
    myProjectTaskFilter: 'all',
    myProjectTaskSearchQuery: '',
    globalSearchQuery: '',
    notifications: [],
    theme: 'light',
    enableChatBot: false,
    userSeenChats: {},
    activeLeaderboardFilter: 'overall'
  };

  // =========================================================
  // 3. PERSISTENCE & INITIALIZATION
  // =========================================================
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = Object.assign(state, parsed);
        if (!state.userSeenChats) {
          state.userSeenChats = parsed.userSeenChats || {};
        }
        if (state.currentUser) {
          if (!state.currentUser.email && state.currentUser.identities && state.currentUser.identities.email) {
            state.currentUser.email = state.currentUser.identities.email;
          }
        }
        // Simulated Teammate Responses default to OFF unless explicitly enabled by user
        const chatBotExplicitlyConfigured = localStorage.getItem('pulsepm_chatbot_explicit_config');
        if (chatBotExplicitlyConfigured === 'true') {
          state.enableChatBot = Boolean(parsed.enableChatBot);
        } else {
          state.enableChatBot = false;
        }
      } else {
        state.enableChatBot = false;
      }
    } catch (e) {
      console.warn('Could not read localStorage:', e);
    }
    // Check saved theme
    const savedTheme = localStorage.getItem('pulsepm_theme') || state.theme || 'light';
    applyTheme(savedTheme);
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        isLoggedIn: state.isLoggedIn,
        currentUser: state.currentUser,
        projects: state.projects,
        collaborators: state.collaborators,
        notifications: state.notifications,
        theme: state.theme,
        enableChatBot: state.enableChatBot,
        userSeenChats: state.userSeenChats || {},
        activeLeaderboardFilter: state.activeLeaderboardFilter || 'overall'
      }));
    } catch (e) {
      console.warn('Could not save state to localStorage:', e);
    }
  }

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pulsepm_theme', theme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' ? '<span>☀️ Light Mode</span>' : '<span>🌙 Dark Mode</span>';
    }
  }

  // =========================================================
  // 4. AUTHENTICATION CONTROLLER (Unified Account & Firebase)
  // =========================================================
  let firebaseAuth = null;
  let firebaseDb = null;
  let isFirebaseLive = false;

  function initFirebaseBackend() {
    try {
      if (
        window.PulseFirebaseConfig &&
        window.PulseFirebaseConfig.isConfigured() &&
        typeof firebase !== 'undefined'
      ) {
        if (!firebase.apps.length) {
          firebase.initializeApp(window.PulseFirebaseConfig.config);
        }
        firebaseAuth = firebase.auth();
        firebaseDb = firebase.firestore();
        isFirebaseLive = true;
        updateBackendStatusUI(true);

        // Listen for real Firebase auth state changes
        firebaseAuth.onAuthStateChanged(user => {
          if (user) {
            try { localStorage.removeItem('pulsepm_custom_phone_demo'); } catch(e){}
            if (!state.isLoggedIn) {
              syncFirebaseUser(user, 'Saved Firebase Session');
            } else {
              setupProjectsFirestoreSync(user);
              migrateLocalProjectsToFirestore(user);
              // Ensure custom name and avatar from Firestore are synchronized if present
              if (firebaseDb && user.uid) {
                firebaseDb.collection('users').doc(user.uid).get().then(docSnap => {
                  if (docSnap && docSnap.exists) {
                    const data = docSnap.data();
                    if (data && (data.name || data.displayName)) {
                      const dbName = data.name || data.displayName;
                      const dbAvatar = data.avatar || computeAvatarInitials(dbName);
                      if (dbName && state.currentUser && (state.currentUser.name !== dbName || state.currentUser.avatar !== dbAvatar)) {
                        applyUserNameUpdate(dbName, dbAvatar);
                      }
                    }
                  }
                }).catch(err => console.warn('User sync check error:', err));
              }
            }
          } else {
            if (firestoreProjectsUnsubscribe) {
              try { firestoreProjectsUnsubscribe(); } catch(e){}
              firestoreProjectsUnsubscribe = null;
            }
          }
        });
        return;
      }
    } catch (e) {
      console.warn('Firebase initialization notice (running demo mode):', e);
    }
    isFirebaseLive = false;
    updateBackendStatusUI(false);
  }

  function updateBackendStatusUI(isLive) {
    const bannerTitle = document.getElementById('firebase-status-title');
    const bannerSub = document.getElementById('firebase-status-sub');
    const bannerDot = document.getElementById('firebase-status-indicator');
    const navBadge = document.getElementById('nav-backend-badge');
    const navDot = document.getElementById('nav-backend-dot');
    const navText = document.getElementById('nav-backend-text');

    const isFileProtocol = window.location.protocol === 'file:';

    if (isFileProtocol) {
      if (bannerTitle) bannerTitle.innerText = 'Action Needed: Switch to http://localhost:3000';
      if (bannerSub) bannerSub.innerHTML = 'Google OAuth & Phone SMS cannot run on <code>file://</code>. Please open <a href="http://localhost:3000" style="color:var(--primary-color);font-weight:700;text-decoration:underline;">http://localhost:3000</a> (server is running!).';
      if (bannerDot) { bannerDot.className = 'status-dot demo'; }
      if (navBadge) { navBadge.className = 'badge-backend-status demo'; }
      if (navDot) { navDot.className = 'status-dot demo'; }
      if (navText) { navText.innerText = '⚠️ Open localhost:3000'; }
    } else if (isLive) {
      if (bannerTitle) bannerTitle.innerText = 'Firebase: Live Cloud Backend';
      if (bannerSub) bannerSub.innerText = 'Real Google OAuth, SMS OTP, and Cloud Firestore sync are active.';
      if (bannerDot) { bannerDot.className = 'status-dot live'; }
      if (navBadge) { navBadge.className = 'badge-backend-status live'; }
      if (navDot) { navDot.className = 'status-dot live'; }
      if (navText) { navText.innerText = '🔥 Firebase: Live'; }
    } else {
      if (bannerTitle) bannerTitle.innerText = 'Firebase Status: Demo Mode';
      if (bannerSub) bannerSub.innerHTML = 'Paste keys in <code>firebase-config.js</code> to enable live Google OAuth & SMS.';
      if (bannerDot) { bannerDot.className = 'status-dot demo'; }
      if (navBadge) { navBadge.className = 'badge-backend-status demo'; }
      if (navDot) { navDot.className = 'status-dot demo'; }
      if (navText) { navText.innerText = '🔥 Firebase: Demo'; }
    }
  }

  function openFirebaseHelpModal() {
    closeProfileMenu();
    openModal('modal-firebase-help');
  }

  function getCurrentUserEmail(user = state.currentUser) {
    if (!user) return '';
    return (
      (user.identities && user.identities.email) ||
      user.email ||
      (firebaseAuth && firebaseAuth.currentUser && firebaseAuth.currentUser.email) ||
      ''
    ).trim().toLowerCase();
  }

  // =========================================================
  // 4.5 CLOUD FIRESTORE PROJECT & TASK SYNC ENGINE
  // =========================================================
  let firestoreProjectsUnsubscribe = null;

  function sanitizeProjectForFirestore(project) {
    if (!project) return null;

    const memberEmails = (project.members || [])
      .map(m => (m.email || '').trim().toLowerCase())
      .filter(Boolean);

    const memberUids = (project.members || [])
      .map(m => (m.id || m.uid || '').toString())
      .filter(Boolean);

    if (project.creatorId && !memberUids.includes(project.creatorId.toString())) {
      memberUids.push(project.creatorId.toString());
    }
    if (project.creatorEmail) {
      const normCreatorEmail = project.creatorEmail.trim().toLowerCase();
      if (!memberEmails.includes(normCreatorEmail)) {
        memberEmails.push(normCreatorEmail);
      }
    }

    // Deep clone to remove non-serializable properties
    const clean = JSON.parse(JSON.stringify(project));
    clean.memberEmails = memberEmails;
    clean.memberUids = memberUids;
    clean.updatedAt = new Date().toISOString();

    if (Array.isArray(clean.tasks)) {
      clean.tasks.forEach(t => {
        if (!Array.isArray(t.subtasks)) t.subtasks = [];
        if (!Array.isArray(t.comments)) t.comments = [];
      });
    }

    return clean;
  }

  function syncProjectToFirestore(project) {
    if (!isFirebaseLive || !firebaseDb || !project || !project.id) return;
    try {
      const cleanData = sanitizeProjectForFirestore(project);
      if (!cleanData) return;
      firebaseDb.collection('projects').doc(project.id).set(cleanData, { merge: true })
        .then(() => {
          console.log(`Cloud Firestore: Project "${project.name}" (${project.id}) synced.`);
        })
        .catch(err => {
          console.warn(`Cloud Firestore: Failed to sync project ${project.id}:`, err);
        });
    } catch (e) {
      console.warn('Could not prepare project for Firestore sync:', e);
    }
  }

  function deleteProjectFromFirestore(projectId) {
    if (!isFirebaseLive || !firebaseDb || !projectId) return;
    try {
      firebaseDb.collection('projects').doc(projectId).delete()
        .then(() => {
          console.log(`Cloud Firestore: Project ${projectId} deleted.`);
        })
        .catch(err => {
          console.warn(`Cloud Firestore: Failed to delete project ${projectId}:`, err);
        });
    } catch (e) {
      console.warn('Could not delete project from Firestore:', e);
    }
  }

  function migrateLocalProjectsToFirestore(user) {
    if (!isFirebaseLive || !firebaseDb || !Array.isArray(state.projects) || state.projects.length === 0) return;
    state.projects.forEach(project => {
      if (isUserMemberOfProject(project, user)) {
        firebaseDb.collection('projects').doc(project.id).get().then(docSnap => {
          if (!docSnap || !docSnap.exists) {
            syncProjectToFirestore(project);
          }
        }).catch(() => {});
      }
    });
  }

  function setupProjectsFirestoreSync(user) {
    if (firestoreProjectsUnsubscribe) {
      try { firestoreProjectsUnsubscribe(); } catch(e){}
      firestoreProjectsUnsubscribe = null;
    }

    if (!isFirebaseLive || !firebaseDb || !user) return;
    const userEmail = getCurrentUserEmail(user).toLowerCase();
    const userId = (user.id || user.uid || '').toString();

    if (!userEmail && !userId) return;

    try {
      let query = firebaseDb.collection('projects');
      if (typeof query.where === 'function') {
        if (userEmail) {
          query = query.where('memberEmails', 'array-contains', userEmail);
        } else {
          query = query.where('memberUids', 'array-contains', userId);
        }
      }

      if (!query || typeof query.onSnapshot !== 'function') return;

      let isInitialSnapshot = true;
      firestoreProjectsUnsubscribe = query.onSnapshot(snapshot => {
        let hasChanges = false;
        snapshot.docChanges().forEach(change => {
          // Skip if local write is still pending to avoid UI jitter
          if (change.doc.metadata && change.doc.metadata.hasPendingWrites) {
            return;
          }

          const docData = change.doc.data();
          if (!docData || !docData.id) return;

          // Detect incoming chat messages from other members in real-time
          if (!isInitialSnapshot && (change.type === 'added' || change.type === 'modified')) {
            const existingProj = state.projects.find(p => p.id === docData.id);
            const prevChats = (existingProj && existingProj.chats) || [];
            const prevChatIds = new Set(prevChats.map(c => c && c.id).filter(Boolean));
            const newChats = (docData.chats || []).filter(c => c && c.id && !prevChatIds.has(c.id));

            newChats.forEach(chat => {
              const currentUid = (state.currentUser && (state.currentUser.id || state.currentUser.uid)) || userId;
              const currentEmail = (state.currentUser && state.currentUser.email ? state.currentUser.email.toLowerCase() : userEmail);
              const isSender = (chat.senderId && currentUid && chat.senderId === currentUid) ||
                               (chat.senderEmail && currentEmail && chat.senderEmail.toLowerCase() === currentEmail);

              if (!isSender) {
                createNotification({
                  type: 'chat_message',
                  recipientId: currentUid,
                  projectId: docData.id,
                  message: `💬 ${chat.senderName || 'Team member'} in ${docData.name}: "${(chat.text || '').slice(0, 60)}${(chat.text || '').length > 60 ? '…' : ''}"`
                });

                sendDesktopNotification({
                  title: `${chat.senderName || 'Team member'} (${docData.name})`,
                  body: chat.text || 'Sent a new message',
                  projectId: docData.id
                });
              }
            });
          }

          if (change.type === 'added' || change.type === 'modified') {
            const existingIdx = state.projects.findIndex(p => p.id === docData.id);
            if (existingIdx !== -1) {
              const currentStr = JSON.stringify(state.projects[existingIdx]);
              const incomingStr = JSON.stringify(docData);
              if (currentStr !== incomingStr) {
                state.projects[existingIdx] = docData;
                hasChanges = true;
              }
            } else {
              state.projects.push(docData);
              hasChanges = true;
            }
          } else if (change.type === 'removed') {
            const beforeLen = state.projects.length;
            state.projects = state.projects.filter(p => p.id !== docData.id);
            if (state.projects.length !== beforeLen) {
              hasChanges = true;
            }
          }
        });

        isInitialSnapshot = false;

        if (hasChanges) {
          saveState();
          if (state.activeProjectId) {
            const currentProj = state.projects.find(p => p.id === state.activeProjectId);
            if (currentProj) {
              syncProjectMemberAvatarsFromFirestore(currentProj);
              renderProjectDetail(currentProj);
            } else {
              navigateToHome();
            }
          } else {
            renderHome();
          }
          checkDeadlineNotifications();
          updateNotificationBell();
        }
      }, err => {
        console.warn('Real-time projects listener note:', err);
      });
    } catch (e) {
      console.warn('Could not setup Firestore projects sync:', e);
    }
  }

  const memberProfileCache = new Map();

  function syncProjectMemberAvatarsFromFirestore(project) {
    if (!project || !Array.isArray(project.members)) return;

    const currentUserId = (state.currentUser && (state.currentUser.id || state.currentUser.uid)) || '';
    const currentUserEmail = getCurrentUserEmail(state.currentUser).toLowerCase();

    let projectModified = false;

    project.members.forEach(m => {
      const isSelf = (m.id && currentUserId && m.id === currentUserId) ||
                     (m.email && currentUserEmail && m.email.toLowerCase() === currentUserEmail);

      const memberId = m.id;
      const memberEmail = (m.email || '').trim().toLowerCase();

      // 1. Sync self with current state
      if (isSelf) {
        if (state.currentUser && state.currentUser.avatar && m.avatar !== state.currentUser.avatar) {
          m.avatar = state.currentUser.avatar;
          projectModified = true;
        }
        if (state.currentUser && state.currentUser.name && m.name !== state.currentUser.name) {
          m.name = state.currentUser.name;
          projectModified = true;
        }
        return;
      }

      // 2. Check localStorage cache
      const localCachedAvatar = (memberId && localStorage.getItem('pulsepm_custom_avatar_' + memberId)) ||
                                (memberEmail && localStorage.getItem('pulsepm_custom_avatar_' + memberEmail)) ||
                                null;
      const localCachedName = (memberId && localStorage.getItem('pulsepm_custom_name_' + memberId)) ||
                              (memberEmail && localStorage.getItem('pulsepm_custom_name_' + memberEmail)) ||
                              null;

      if (localCachedAvatar && m.avatar !== localCachedAvatar) {
        m.avatar = localCachedAvatar;
        projectModified = true;
      }
      if (localCachedName && m.name !== localCachedName) {
        m.name = localCachedName;
        projectModified = true;
      }

      // 3. Check memory cache for fast return
      const cacheKey = memberId || memberEmail;
      if (cacheKey && memberProfileCache.has(cacheKey)) {
        const cached = memberProfileCache.get(cacheKey);
        if (cached && cached.avatar && m.avatar !== cached.avatar) {
          m.avatar = cached.avatar;
          projectModified = true;
        }
        if (cached && cached.name && m.name !== cached.name) {
          m.name = cached.name;
          projectModified = true;
        }
        return;
      }

      // 4. Query Cloud Firestore if live
      if (isFirebaseLive && firebaseDb) {
        let userQueryPromise = null;
        if (memberId && !memberId.startsWith('collab-') && !memberId.startsWith('usr-') && !memberId.startsWith('test_')) {
          userQueryPromise = firebaseDb.collection('users').doc(memberId).get();
        } else if (memberEmail) {
          try {
            let q = firebaseDb.collection('users').where('email', '==', memberEmail);
            if (typeof q.limit === 'function') q = q.limit(1);
            if (typeof q.get === 'function') {
              userQueryPromise = q.get().then(snap => {
                if (snap && !snap.empty && snap.docs && snap.docs[0]) return snap.docs[0];
                return null;
              }).catch(() => null);
            }
          } catch (e) {}
        }

        if (userQueryPromise) {
          userQueryPromise.then(docSnap => {
            if (!docSnap) return;
            const data = typeof docSnap.data === 'function' ? docSnap.data() : null;
            if (!data) return;

            const latestAvatar = data.avatar;
            const latestName = data.name || data.displayName;

            if (latestAvatar || latestName) {
              if (cacheKey) {
                memberProfileCache.set(cacheKey, { avatar: latestAvatar, name: latestName });
              }
              if (memberId) {
                try {
                  if (latestAvatar) localStorage.setItem('pulsepm_custom_avatar_' + memberId, latestAvatar);
                  if (latestName) localStorage.setItem('pulsepm_custom_name_' + memberId, latestName);
                } catch(e){}
              }
              if (memberEmail) {
                try {
                  if (latestAvatar) localStorage.setItem('pulsepm_custom_avatar_' + memberEmail, latestAvatar);
                  if (latestName) localStorage.setItem('pulsepm_custom_name_' + memberEmail, latestName);
                } catch(e){}
              }

              let changed = false;
              if (latestAvatar && m.avatar !== latestAvatar) {
                m.avatar = latestAvatar;
                changed = true;
              }
              if (latestName && m.name !== latestName) {
                m.name = latestName;
                changed = true;
              }

              // Update any tasks assigned to this member
              (project.tasks || []).forEach(t => {
                if ((m.id && t.assigneeId === m.id) || (m.email && t.assigneeEmail && t.assigneeEmail.toLowerCase() === m.email.toLowerCase())) {
                  if (latestAvatar && t.assigneeAvatar !== latestAvatar) {
                    t.assigneeAvatar = latestAvatar;
                    changed = true;
                  }
                  if (latestName && t.assigneeName !== latestName) {
                    t.assigneeName = latestName;
                    changed = true;
                  }
                }
              });

              if (changed) {
                saveState();
                if (state.activeProjectId === project.id) {
                  renderProjectTeam(project);
                  renderProjectOverview(project);
                  renderProjectTasks(project);
                  renderMyProjectTasks(project);
                }
              }
            }
          }).catch(err => {
            console.warn('Error fetching member profile from Firestore:', err);
          });
        }
      }
    });

    if (projectModified) {
      saveState();
    }
  }

  function computeAvatarInitials(name) {
    if (!name || typeof name !== 'string') return 'PU';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else if (parts.length === 1 && parts[0].length >= 2) {
      return parts[0].substring(0, 2).toUpperCase();
    } else if (parts.length === 1) {
      return parts[0].toUpperCase();
    }
    return 'PU';
  }

  const PRESET_AVATARS = ['🦊', '🚀', '⚡', '🦁', '🎨', '💻', '🎯', '🌟', '🐼', '💡', '🦉', '☕'];

  function renderAvatarInnerHtml(avatarVal, name = 'User') {
    const val = (avatarVal || '').toString().trim();
    if (!val) {
      return escapeHtml((name || 'U').substring(0, 2).toUpperCase());
    }
    if (val.startsWith('data:image/') || val.startsWith('http://') || val.startsWith('https://') || val.startsWith('blob:')) {
      return `<img src="${val}" alt="${escapeHtml(name)}" />`;
    }
    return escapeHtml(val);
  }

  function setAvatarElementContent(el, avatarVal, defaultNameOrInitials = 'U') {
    if (!el) return;
    const val = (avatarVal || '').toString().trim();
    if (val.startsWith('data:image/') || val.startsWith('http://') || val.startsWith('https://') || val.startsWith('blob:')) {
      el.innerHTML = `<img src="${val}" alt="User Avatar" />`;
    } else if (val) {
      el.innerText = val;
    } else {
      el.innerText = (defaultNameOrInitials || 'U').substring(0, 2).toUpperCase();
    }
  }

  function renderPresetAvatars() {
    const grid = document.getElementById('preset-avatar-grid');
    if (!grid) return;
    const currentAvatar = (state.currentUser && state.currentUser.avatar) || '';
    grid.innerHTML = PRESET_AVATARS.map(preset => {
      const isActive = currentAvatar === preset;
      return `
        <button type="button" class="preset-avatar-btn ${isActive ? 'active' : ''}"
                onclick="window.App.selectPresetAvatar('${preset}')"
                title="Select ${preset} avatar">
          ${preset}
        </button>
      `;
    }).join('');
  }

  function selectPresetAvatar(presetSymbol) {
    if (!presetSymbol) return;
    applyUserAvatarUpdate(presetSymbol);
    showToast(`Avatar updated to ${presetSymbol}!`, 'success');
  }

  function resetAvatarToInitials() {
    const userName = (state.currentUser && state.currentUser.name) || 'User';
    const initials = computeAvatarInitials(userName);
    applyUserAvatarUpdate(initials);
    showToast(`Avatar reset to name initials (${initials})`, 'info');
  }

  function compressAndCropImage(file, targetSize = 128, quality = 0.8) {
    return new Promise((resolve, reject) => {
      if (!file) {
        return reject(new Error('No file provided'));
      }
      if (typeof FileReader === 'undefined') {
        return reject(new Error('FileReader not supported in this environment'));
      }
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => reject(new Error('Failed to load image data'));
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = targetSize;
            canvas.height = targetSize;
            const ctx = canvas.getContext('2d');

            // Center square-crop calculations
            const minSide = Math.min(img.width, img.height);
            const sx = (img.width - minSide) / 2;
            const sy = (img.height - minSide) / 2;

            ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, targetSize, targetSize);
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(dataUrl);
          } catch (err) {
            reject(err);
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  async function handleProfilePhotoSelected(files) {
    if (!files || !files[0]) return;
    const file = files[0];
    if (!file.type || !file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WebP).', 'error');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      showToast('Image is too large. Please select an image under 25MB.', 'error');
      return;
    }

    try {
      showToast('Optimizing and cropping photo...', 'info');
      const compressedDataUrl = await compressAndCropImage(file, 128, 0.8);
      applyUserAvatarUpdate(compressedDataUrl);
      closeModal('modal-set-photo');
      showToast('Profile photo updated successfully!', 'success');
    } catch (err) {
      console.error('Image compression error:', err);
      showToast('Failed to process image. Please try another one.', 'error');
    } finally {
      const input = document.getElementById('profile-photo-input');
      if (input) input.value = '';
    }
  }

  function applyUserAvatarUpdate(newAvatar) {
    if (!newAvatar) return;
    if (!state.currentUser) {
      state.currentUser = {};
    }
    state.currentUser.avatar = newAvatar;

    const authUid = (firebaseAuth && firebaseAuth.currentUser && firebaseAuth.currentUser.uid) || null;
    const userId = authUid || state.currentUser.id || state.currentUser.uid;
    if (authUid && state.currentUser) {
      state.currentUser.id = authUid;
    }
    const userEmail = getCurrentUserEmail(state.currentUser);

    // Cache custom avatar in localStorage for instant access
    if (userId) {
      try { localStorage.setItem('pulsepm_custom_avatar_' + userId, newAvatar); } catch (e) {}
    }
    if (authUid && authUid !== userId) {
      try { localStorage.setItem('pulsepm_custom_avatar_' + authUid, newAvatar); } catch (e) {}
    }
    if (userEmail) {
      try { localStorage.setItem('pulsepm_custom_avatar_' + userEmail, newAvatar); } catch (e) {}
    }

    // Propagate updated avatar across all project memberships & tasks
    if (Array.isArray(state.projects)) {
      state.projects.forEach(p => {
        let hasChanges = false;
        (p.members || []).forEach(m => {
          if ((m.id && userId && m.id === userId) || (m.email && userEmail && m.email.trim().toLowerCase() === userEmail)) {
            if (m.avatar !== newAvatar) {
              m.avatar = newAvatar;
              hasChanges = true;
            }
          }
        });
        (p.tasks || []).forEach(t => {
          if ((t.assigneeId && userId && t.assigneeId === userId) || (t.assigneeEmail && userEmail && t.assigneeEmail.trim().toLowerCase() === userEmail)) {
            if (t.assigneeAvatar !== newAvatar) {
              t.assigneeAvatar = newAvatar;
              hasChanges = true;
            }
          }
        });
        if (hasChanges) {
          syncProjectToFirestore(p);
        }
      });
    }

    if (typeof memberProfileCache !== 'undefined' && (userId || userEmail)) {
      const curName = (state.currentUser && state.currentUser.name) || '';
      if (userId) memberProfileCache.set(userId, { avatar: newAvatar, name: curName });
      if (userEmail) memberProfileCache.set(userEmail, { avatar: newAvatar, name: curName });
    }

    saveState();
    updateNavigationUser();

    // Re-render current view
    if (state.activeProjectId) {
      const activeProject = state.projects.find(p => p.id === state.activeProjectId);
      if (activeProject) renderProjectDetail(activeProject);
    } else if (document.getElementById('home-view') && document.getElementById('home-view').style.display !== 'none') {
      renderHome();
    }

    // Persist to Cloud Firestore under users/{userId}
    if (isFirebaseLive && firebaseDb && userId) {
      try {
        firebaseDb.collection('users').doc(userId).set({
          avatar: newAvatar,
          updatedAt: new Date().toISOString()
        }, { merge: true }).catch(err => {
          console.warn('Firestore user avatar update warning:', err);
        });
      } catch (e) {
        console.warn('Firestore user avatar update error:', e);
      }
    }
  }

  function applyUserNameUpdate(newName, newAvatar) {
    if (!newName) return;
    const avatar = newAvatar !== undefined ? newAvatar : (state.currentUser?.avatar || computeAvatarInitials(newName));

    if (!state.currentUser) {
      state.currentUser = {};
    }
    state.currentUser.name = newName;
    state.currentUser.avatar = avatar;

    const authUid = (firebaseAuth && firebaseAuth.currentUser && firebaseAuth.currentUser.uid) || null;
    const userId = authUid || state.currentUser.id || state.currentUser.uid;
    if (authUid && state.currentUser) {
      state.currentUser.id = authUid;
    }
    const userEmail = getCurrentUserEmail(state.currentUser);
    if (state.currentUser && !state.currentUser.email && userEmail) {
      state.currentUser.email = userEmail;
    }

    // Cache custom name & avatar in localStorage for instant access
    if (userId) {
      try {
        localStorage.setItem('pulsepm_custom_name_' + userId, newName);
        localStorage.setItem('pulsepm_custom_avatar_' + userId, avatar);
      } catch (e) {}
    }
    if (authUid && authUid !== userId) {
      try {
        localStorage.setItem('pulsepm_custom_name_' + authUid, newName);
        localStorage.setItem('pulsepm_custom_avatar_' + authUid, avatar);
      } catch (e) {}
    }
    if (userEmail) {
      try {
        localStorage.setItem('pulsepm_custom_name_' + userEmail, newName);
        localStorage.setItem('pulsepm_custom_avatar_' + userEmail, avatar);
      } catch (e) {}
    }

    // Propagate updated name & avatar across all project memberships & assigned tasks
    if (Array.isArray(state.projects)) {
      state.projects.forEach(p => {
        let hasChanges = false;
        (p.members || []).forEach(m => {
          if ((m.id && userId && m.id === userId) || (m.email && userEmail && m.email.trim().toLowerCase() === userEmail)) {
            if (m.name !== newName || m.avatar !== avatar) {
              m.name = newName;
              m.avatar = avatar;
              hasChanges = true;
            }
          }
        });
        (p.tasks || []).forEach(t => {
          if ((t.assigneeId && userId && t.assigneeId === userId) || (t.assigneeEmail && userEmail && t.assigneeEmail.trim().toLowerCase() === userEmail)) {
            if (t.assigneeName !== newName || t.assigneeAvatar !== avatar) {
              t.assigneeName = newName;
              t.assigneeAvatar = avatar;
              hasChanges = true;
            }
          }
        });
        if (hasChanges) {
          syncProjectToFirestore(p);
        }
      });
    }

    if (typeof memberProfileCache !== 'undefined' && (userId || userEmail)) {
      if (userId) memberProfileCache.set(userId, { avatar: avatar, name: newName });
      if (userEmail) memberProfileCache.set(userEmail, { avatar: avatar, name: newName });
    }

    saveState();
    updateNavigationUser();

    // Re-render current view
    if (state.activeProjectId) {
      const activeProject = state.projects.find(p => p.id === state.activeProjectId);
      if (activeProject) renderProjectDetail(activeProject);
    } else if (document.getElementById('home-view') && document.getElementById('home-view').style.display !== 'none') {
      renderHome();
    }

    // Sync to Cloud Firestore if connected
    if (isFirebaseLive && firebaseDb && userId) {
      try {
        firebaseDb.collection('users').doc(userId).set({
          name: newName,
          displayName: newName,
          avatar: avatar,
          updatedAt: new Date().toISOString()
        }, { merge: true }).catch(err => {
          console.warn('Firestore user update warning:', err);
        });
      } catch (e) {
        console.warn('Firestore user update error:', e);
      }
    }
  }

  function syncFirebaseUser(user, methodLabel = 'Firebase') {
    // 1. Check local cache first (keyed by user.uid or user.email)
    const cachedName = (user.uid && localStorage.getItem('pulsepm_custom_name_' + user.uid)) ||
      (user.email && localStorage.getItem('pulsepm_custom_name_' + user.email.toLowerCase())) ||
      (state.currentUser && state.currentUser.id === user.uid && state.currentUser.name) ||
      null;
    const cachedAvatar = (user.uid && localStorage.getItem('pulsepm_custom_avatar_' + user.uid)) ||
      (user.email && localStorage.getItem('pulsepm_custom_avatar_' + user.email.toLowerCase())) ||
      null;

    const initialName = cachedName || user.displayName || (user.email ? user.email.split('@')[0] : 'Pulse User');
    const initials = cachedAvatar || computeAvatarInitials(initialName);

    const userEmail = (user.email || '').trim();

    const cachedPhone = (user.uid && localStorage.getItem('pulsepm_custom_phone_' + user.uid)) ||
      (user.email && localStorage.getItem('pulsepm_custom_phone_' + user.email.toLowerCase())) ||
      user.phoneNumber || '';

    const unifiedUser = {
      id: user.uid,
      name: initialName,
      email: userEmail,
      role: 'Project Member',
      avatar: initials,
      phone: cachedPhone,
      identities: {
        email: userEmail,
        phone: cachedPhone,
        google: userEmail
      }
    };

    state.currentUser = unifiedUser;
    state.isLoggedIn = true;

    // Auto-link user's real UID & avatar to any project memberships and assigned tasks added by email
    const normalizedUserEmail = userEmail.toLowerCase();
    if (normalizedUserEmail && Array.isArray(state.projects)) {
      state.projects.forEach(p => {
        let hasChanges = false;
        (p.members || []).forEach(m => {
          if (m.email && m.email.trim().toLowerCase() === normalizedUserEmail) {
            m.id = user.uid;
            if (unifiedUser.avatar && m.avatar !== unifiedUser.avatar) {
              m.avatar = unifiedUser.avatar;
              hasChanges = true;
            }
            if (unifiedUser.name && m.name !== unifiedUser.name) {
              m.name = unifiedUser.name;
              hasChanges = true;
            }
          }
        });
        (p.tasks || []).forEach(t => {
          if (t.assigneeEmail && t.assigneeEmail.trim().toLowerCase() === normalizedUserEmail) {
            t.assigneeId = user.uid;
            if (unifiedUser.avatar && t.assigneeAvatar !== unifiedUser.avatar) {
              t.assigneeAvatar = unifiedUser.avatar;
              hasChanges = true;
            }
            if (unifiedUser.name && t.assigneeName !== unifiedUser.name) {
              t.assigneeName = unifiedUser.name;
              hasChanges = true;
            }
          }
        });
        if (hasChanges) {
          syncProjectToFirestore(p);
        }
      });
    }

    saveState();

    document.getElementById('auth-view').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';

    updateNavigationUser();
    navigateToHome();
    setupProjectsFirestoreSync(user);
    migrateLocalProjectsToFirestore(user);
    checkDeadlineNotifications();
    updateNotificationBell();
    showToast(`✨ Connected as ${unifiedUser.name} via ${methodLabel}!`, 'success');

    // Prompt first-time Google users to set a password
    const isGoogle = methodLabel.toLowerCase().includes('google');
    const hasPasswordSet = localStorage.getItem('pulsepm_pwd_set_' + user.uid);
    const hasPasswordProvider = user.providerData && user.providerData.some(p => p.providerId === 'password');

    if (isGoogle && !hasPasswordSet && !hasPasswordProvider) {
      setTimeout(() => {
        openFirstTimePasswordModal(user.email);
      }, 600);
    }

    // 2. Fetch authoritative profile from Cloud Firestore /users/{uid}
    if (firebaseDb && user.uid) {
      firebaseDb.collection('users').doc(user.uid).get().then(docSnap => {
        let authoritativeName = initialName;
        let authoritativeAvatar = initials;
        let authoritativePhone = cachedPhone;

        if (docSnap && docSnap.exists) {
          const data = docSnap.data();
          if (data && (data.name || data.displayName)) {
            authoritativeName = data.name || data.displayName;
            authoritativeAvatar = data.avatar || computeAvatarInitials(authoritativeName);
            if (authoritativeName !== state.currentUser.name || authoritativeAvatar !== state.currentUser.avatar) {
              applyUserNameUpdate(authoritativeName, authoritativeAvatar);
            }
          }
          if (data && data.phone) {
            authoritativePhone = data.phone;
            localStorage.setItem('pulsepm_custom_phone_' + user.uid, authoritativePhone);
          }
          if (data && data.hasPasswordSet) {
            localStorage.setItem('pulsepm_pwd_set_' + user.uid, 'true');
            state.currentUser.hasPasswordSet = true;
          }
        }

        if (authoritativePhone && state.currentUser) {
          state.currentUser.phone = authoritativePhone;
          if (!state.currentUser.identities) state.currentUser.identities = {};
          state.currentUser.identities.phone = authoritativePhone;
          updateNavigationUser();
        }

        // Keep Firestore user record updated with lastLogin, preserving the custom name & phone
        const updatePayload = {
          uid: user.uid,
          name: authoritativeName,
          displayName: authoritativeName,
          email: user.email || '',
          avatar: authoritativeAvatar,
          lastLogin: new Date().toISOString()
        };
        if (authoritativePhone) {
          updatePayload.phone = authoritativePhone;
        }

        firebaseDb.collection('users').doc(user.uid).set(updatePayload, { merge: true }).catch(err => console.warn('Could not sync user to Firestore:', err));

        // Also ensure Firebase Auth currentUser has the custom displayName
        if (firebaseAuth && firebaseAuth.currentUser && typeof firebaseAuth.currentUser.updateProfile === 'function') {
          if (firebaseAuth.currentUser.displayName !== authoritativeName) {
            firebaseAuth.currentUser.updateProfile({ displayName: authoritativeName }).catch(() => {});
          }
        }
      }).catch(err => {
        console.warn('Could not fetch user from Firestore:', err);
        // Fallback sync to Firestore
        const fallbackPayload = {
          uid: user.uid,
          name: initialName,
          displayName: initialName,
          email: user.email || '',
          avatar: initials,
          lastLogin: new Date().toISOString()
        };
        if (cachedPhone) {
          fallbackPayload.phone = cachedPhone;
        }
        firebaseDb.collection('users').doc(user.uid).set(fallbackPayload, { merge: true }).catch(e => console.warn('Fallback sync failed:', e));
      });
    }
  }

  function handleGmailLogin() {
    const emailInput = document.getElementById('gmail-input');
    const passwordInput = document.getElementById('gmail-password');
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';

    if (!email || !password) {
      showToast('Please enter both email and password.', 'error');
      return;
    }

    if (isFirebaseLive && firebaseAuth) {
      firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(cred => {
          syncFirebaseUser(cred.user, 'Email / Password');
        })
        .catch(err => {
          if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
            // Automatically register new email account
            firebaseAuth.createUserWithEmailAndPassword(email, password)
              .then(cred => syncFirebaseUser(cred.user, 'Email Registration'))
              .catch(err2 => showToast(err2.message, 'error'));
          } else {
            showToast(err.message, 'error');
          }
        });
      return;
    }

    // Demo Mode fallback with actual entered email
    const cachedName = localStorage.getItem('pulsepm_custom_name_' + email.toLowerCase());
    const name = cachedName || email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const avatar = computeAvatarInitials(name);
    const demoUser = {
      id: 'usr_' + Date.now(),
      name: name || 'Pulse User',
      role: 'Project Member',
      avatar: avatar,
      identities: {
        email: email,
        phone: '',
        google: email
      }
    };
    state.currentUser = demoUser;
    loginSuccess('Email (' + email + ')');
  }

  function handlePhoneSendOtp() {
    showToast('Phone number sign-in is currently disabled. Please sign in using Google or Email & Password.', 'info');
  }

  function backToPhoneInput() {
    const p1 = document.getElementById('phone-step-1');
    const p2 = document.getElementById('phone-step-2');
    if (p1) p1.style.display = 'block';
    if (p2) p2.style.display = 'none';
  }

  function handlePhoneVerifyOtp() {
    showToast('Phone number sign-in is currently disabled. Please sign in using Google or Email & Password.', 'info');
  }

  function handleGoogleLogin() {
    if (isFirebaseLive && firebaseAuth) {
      if (window.location.protocol === 'file:') {
        showToast('⚠️ Google login requires http://localhost:3000 (not file://). Please open via http://localhost:3000', 'error');
        return;
      }
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      firebaseAuth.signInWithPopup(provider)
        .then(result => {
          syncFirebaseUser(result.user, 'Google Account');
        })
        .catch(err => {
          console.error('Google login error:', err);
          if (err.code === 'auth/operation-not-supported-in-this-environment') {
            showToast('Google login cannot run from file://. Please open http://localhost:3000 in your browser.', 'error');
          } else if (err.code === 'auth/unauthorized-domain') {
            showToast('Unauthorized domain. Please add this domain in Firebase Console > Auth > Settings > Authorized domains.', 'error');
          } else if (err.code === 'auth/account-exists-with-different-credential') {
            showToast('Account already exists with this email. Linking Google identity...', 'info');
          } else {
            showToast(err.message, 'error');
          }
        });
      return;
    }

    // Demo mode fallback
    loginSuccess('Google Account');
    const hasPasswordSet = localStorage.getItem('pulsepm_pwd_set_demo');
    if (!hasPasswordSet) {
      setTimeout(() => {
        openFirstTimePasswordModal('alex.morgan@gmail.com');
      }, 600);
    }
  }

  function openFirstTimePasswordModal(email) {
    const userEmail = email || (state.currentUser && ((state.currentUser.identities && state.currentUser.identities.email) || state.currentUser.email)) || 'your email';
    const emailEl = document.getElementById('setup-password-email');
    if (emailEl) emailEl.innerText = userEmail;
    const pwdInput = document.getElementById('setup-password-input');
    const confirmInput = document.getElementById('setup-password-confirm');
    if (pwdInput) pwdInput.value = '';
    if (confirmInput) confirmInput.value = '';
    openModal('modal-setup-password');
  }

  function handleSaveFirstTimePassword() {
    const pwdInput = document.getElementById('setup-password-input');
    const confirmInput = document.getElementById('setup-password-confirm');
    const password = pwdInput ? pwdInput.value : '';
    const confirm = confirmInput ? confirmInput.value : '';

    if (!password || password.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }
    if (password !== confirm) {
      showToast('Passwords do not match. Please re-enter.', 'error');
      return;
    }

    const email = (state.currentUser && ((state.currentUser.identities && state.currentUser.identities.email) || state.currentUser.email)) ||
                  (firebaseAuth && firebaseAuth.currentUser && firebaseAuth.currentUser.email);

    if (isFirebaseLive && firebaseAuth && firebaseAuth.currentUser) {
      const user = firebaseAuth.currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(email, password);
      const hadPassword = localStorage.getItem('pulsepm_pwd_set_' + user.uid);

      user.linkWithCredential(credential)
        .then(() => {
          localStorage.setItem('pulsepm_pwd_set_' + user.uid, 'true');
          if (state.currentUser) state.currentUser.hasPasswordSet = true;
          if (firebaseDb) {
            firebaseDb.collection('users').doc(user.uid).set({ hasPasswordSet: true }, { merge: true });
          }
          closeModal('modal-setup-password');
          updateNavigationUser();
          showToast(hadPassword ? '🔐 Password updated successfully!' : '🔐 Password created! You can now sign in using Google or email & password.', 'success');
        })
        .catch(err => {
          // If already linked or other state, update password directly
          user.updatePassword(password)
            .then(() => {
              localStorage.setItem('pulsepm_pwd_set_' + user.uid, 'true');
              if (state.currentUser) state.currentUser.hasPasswordSet = true;
              closeModal('modal-setup-password');
              updateNavigationUser();
              showToast('🔐 Password updated successfully!', 'success');
            })
            .catch(err2 => {
              console.warn('Password linking note:', err2);
              localStorage.setItem('pulsepm_pwd_set_' + user.uid, 'true');
              if (state.currentUser) state.currentUser.hasPasswordSet = true;
              closeModal('modal-setup-password');
              updateNavigationUser();
              showToast('🔐 Password saved for future email logins!', 'success');
            });
        });
      return;
    }

    // Demo Mode
    const hadPasswordDemo = localStorage.getItem('pulsepm_pwd_set_demo');
    localStorage.setItem('pulsepm_pwd_set_demo', 'true');
    if (state.currentUser) state.currentUser.hasPasswordSet = true;
    closeModal('modal-setup-password');
    updateNavigationUser();
    showToast(hadPasswordDemo ? '🔐 Password updated successfully!' : '🔐 Password created! You can now sign in using Google or email & password.', 'success');
  }

  function loginSuccess(methodName) {
    state.isLoggedIn = true;
    if (!state.currentUser) {
      state.currentUser = UNIFIED_USER;
    }

    const userId = state.currentUser.id || state.currentUser.uid;
    const userEmail = (
      (state.currentUser.identities && state.currentUser.identities.email) ||
      state.currentUser.email ||
      ''
    ).trim().toLowerCase();

    const cachedName = (userId && localStorage.getItem('pulsepm_custom_name_' + userId)) ||
                       (userEmail && localStorage.getItem('pulsepm_custom_name_' + userEmail)) ||
                       null;
    const cachedAvatar = (userId && localStorage.getItem('pulsepm_custom_avatar_' + userId)) ||
                         (userEmail && localStorage.getItem('pulsepm_custom_avatar_' + userEmail)) ||
                         null;

    if (cachedName) {
      applyUserNameUpdate(cachedName, cachedAvatar);
    } else {
      saveState();
      updateNavigationUser();
      navigateToHome();
      checkDeadlineNotifications();
      updateNotificationBell();
    }

    document.getElementById('auth-view').style.display = 'none';
    document.getElementById('main-app').style.display = 'flex';

    showToast('✨ Welcome back! Logged in via ' + methodName + '.', 'success');
  }

  function handleLogout() {
    if (firestoreProjectsUnsubscribe) {
      try { firestoreProjectsUnsubscribe(); } catch(e){}
      firestoreProjectsUnsubscribe = null;
    }
    if (isFirebaseLive && firebaseAuth) {
      firebaseAuth.signOut().catch(err => console.warn('Sign out error:', err));
    }
    state.isLoggedIn = false;
    state.activeProjectId = null;
    closeAllModals();
    closeProfileMenu();
    try { localStorage.removeItem('pulsepm_custom_phone_demo'); } catch(e){}
    saveState();

    document.getElementById('main-app').style.display = 'none';
    document.getElementById('auth-view').style.display = 'flex';

    // Reset input fields on login form
    const gmailInput = document.getElementById('gmail-input');
    const pwdInput = document.getElementById('gmail-password');
    if (gmailInput) gmailInput.value = '';
    if (pwdInput) pwdInput.value = '';

    showToast('You have been logged out.', 'info');
  }

  // =========================================================
  // 5. NAVIGATION & VIEW CONTROLLER
  // =========================================================
  function updateNavigationUser() {
    const user = state.currentUser;
    const navAvatar = document.getElementById('nav-user-avatar');
    const navName = document.getElementById('nav-user-name');
    const welcomeName = document.getElementById('welcome-user-name');
    const dropdownAvatar = document.getElementById('dropdown-user-avatar');
    const dropdownName = document.getElementById('dropdown-user-name');
    const dropdownEmail = document.getElementById('dropdown-user-email');

    if (navAvatar) setAvatarElementContent(navAvatar, user.avatar, user.name);
    if (navName) navName.innerText = user.name;
    if (welcomeName) welcomeName.innerText = user.name.split(' ')[0];
    if (dropdownAvatar) setAvatarElementContent(dropdownAvatar, user.avatar, user.name);
    if (dropdownName) dropdownName.innerText = user.name || 'User';
    const userEmail = (user.identities && user.identities.email) || user.email || '';
    const userGoogle = (user.identities && user.identities.google) || user.email || '';

    if (dropdownEmail) dropdownEmail.innerText = userEmail;

    // Profile modal items
    const profHeroAvatar = document.getElementById('profile-hero-avatar');
    const profHeroName = document.getElementById('profile-hero-name');
    const profEmail = document.getElementById('profile-email-val');
    const profGoogle = document.getElementById('profile-google-val');

    if (profHeroAvatar) setAvatarElementContent(profHeroAvatar, user.avatar, user.name);
    if (profHeroName) profHeroName.innerText = user.name || 'User';
    if (profEmail) profEmail.innerText = userEmail;
    if (profGoogle) profGoogle.innerText = userGoogle;

    const setPhotoPreview = document.getElementById('set-photo-current-avatar');
    const setPhotoName = document.getElementById('set-photo-user-name');
    if (setPhotoPreview) setAvatarElementContent(setPhotoPreview, user.avatar, user.name);
    if (setPhotoName) setPhotoName.innerText = user.name || 'User';

    renderPresetAvatars();

    const uid = (user && (user.id || user.uid)) || (firebaseAuth && firebaseAuth.currentUser && firebaseAuth.currentUser.uid);

    // Profile Phone
    const userEmailKey = user && user.email ? user.email.toLowerCase() : '';
    const isDemoUser = (!isFirebaseLive && (!user || user.id === 'demo' || !user.email));
    const userPhone = (uid && localStorage.getItem('pulsepm_custom_phone_' + uid)) ||
                      (userEmailKey && localStorage.getItem('pulsepm_custom_phone_' + userEmailKey)) ||
                      (isDemoUser && localStorage.getItem('pulsepm_custom_phone_demo')) ||
                      (user && user.phone) ||
                      (user && user.identities && user.identities.phone) ||
                      '';
    const profPhone = document.getElementById('profile-phone-val');
    const btnEditPhone = document.getElementById('btn-edit-phone');
    if (profPhone) {
      profPhone.innerText = userPhone || 'Not added yet';
      profPhone.style.color = userPhone ? 'var(--text-primary)' : 'var(--text-muted)';
    }
    if (btnEditPhone) {
      btnEditPhone.innerText = userPhone ? '✏️ Edit' : '➕ Add Phone';
    }

    // Profile Password
    const hasPasswordSet = (uid && localStorage.getItem('pulsepm_pwd_set_' + uid)) ||
                           (userEmailKey && localStorage.getItem('pulsepm_pwd_set_' + userEmailKey)) ||
                           (isDemoUser && localStorage.getItem('pulsepm_pwd_set_demo')) ||
                           (user && user.hasPasswordSet);
    const profPassword = document.getElementById('profile-password-val');
    const btnProfilePassword = document.getElementById('btn-profile-password');
    if (profPassword) {
      profPassword.innerText = hasPasswordSet ? '•••••••• (Configured)' : 'Not set up yet';
      profPassword.style.color = hasPasswordSet ? 'var(--text-primary)' : 'var(--text-muted)';
    }
    if (btnProfilePassword) {
      btnProfilePassword.innerText = hasPasswordSet ? '🔑 Change Password' : '🔑 Add Password';
    }
  }

  function navigateToHome() {
    state.activeProjectId = null;
    document.getElementById('project-detail-view').style.display = 'none';
    document.getElementById('home-view').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderHome();
  }

  function openProject(projectId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;

    if (!isUserMemberOfProject(project, state.currentUser)) {
      showToast('You are not a member of this project group.', 'error');
      navigateToHome();
      return;
    }

    state.activeProjectId = projectId;
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('project-detail-view').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    renderProjectDetail(project);
    if (state.activeProjectTab === 'chats') {
      markProjectChatsAsSeen(projectId);
      clearChatNotificationsForProject(projectId);
    }
  }

  function switchProjectTab(tabName) {
    state.activeProjectTab = tabName;
    document.querySelectorAll('.project-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.projectTab === tabName);
    });
    document.querySelectorAll('.project-tab-content').forEach(content => {
      content.classList.toggle('active', content.id === 'project-tab-content-' + tabName);
    });

    if (tabName === 'chats') {
      scrollChatToBottom();
      markProjectChatsAsSeen(state.activeProjectId);
      clearChatNotificationsForProject(state.activeProjectId);
    } else {
      updateChatTabBadge();
    }
  }

  // =========================================================
  // 6. TOP-RIGHT PROFILE TOGGLE MENU
  // =========================================================
  function toggleProfileMenu() {
    updateNavigationUser();
    const menu = document.getElementById('profile-dropdown');
    const btn = document.getElementById('profile-toggle-btn');
    if (!menu) return;

    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      closeProfileMenu();
    } else {
      menu.classList.add('open');
      if (btn) btn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeProfileMenu() {
    const menu = document.getElementById('profile-dropdown');
    const btn = document.getElementById('profile-toggle-btn');
    if (menu) menu.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function scrollToSection(sectionId) {
    closeProfileMenu();
    if (state.activeProjectId) {
      navigateToHome();
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }

  // =========================================================
  // 6.5 USER MEMBERSHIP & ACCESS CONTROLS
  // =========================================================
  function isUserMemberOfProject(project, user) {
    if (!project || !user) return false;
    const userId = user.id || user.uid;
    const userEmail = getCurrentUserEmail(user);

    // 1. Check if user is in project.members list by ID or email
    if (project.members && Array.isArray(project.members)) {
      const isMember = project.members.some(m => {
        if (m.id && userId && m.id === userId) return true;
        if (m.email && userEmail && m.email.trim().toLowerCase() === userEmail) return true;
        return false;
      });
      if (isMember) return true;
    }

    // 2. Check if user is the project creator
    if (project.creatorId && userId && project.creatorId === userId) {
      return true;
    }

    return false;
  }

  function isProjectOwner(project, user) {
    if (!project || !user) return false;
    const userId = user.id || user.uid;
    const userEmail = getCurrentUserEmail(user);

    // 1. Check if user is the project creator (by ID or Email)
    if (project.creatorId && userId && String(project.creatorId) === String(userId)) {
      return true;
    }
    if (project.creatorEmail && userEmail && project.creatorEmail.trim().toLowerCase() === userEmail) {
      return true;
    }

    // 2. Check if user has explicit 'Owner' role in project.members
    if (project.members && Array.isArray(project.members)) {
      const member = project.members.find(m => {
        if (m.id && userId && String(m.id) === String(userId)) return true;
        if (m.email && userEmail && m.email.trim().toLowerCase() === userEmail) return true;
        return false;
      });
      if (member && (member.role === 'Owner' || member.role === 'owner')) {
        return true;
      }

      // 3. If project has no creatorId specified, fallback to first member
      if (!project.creatorId && project.members.length > 0) {
        const first = project.members[0];
        if (first.id && userId && String(first.id) === String(userId)) return true;
        if (first.email && userEmail && first.email.trim().toLowerCase() === userEmail) return true;
      }
    }

    return false;
  }

  function isProjectCreator(project, user) {
    if (!project || !user) return false;
    const userId = user.id || user.uid;
    const userEmail = getCurrentUserEmail(user);
    if (project.creatorId && userId && String(project.creatorId) === String(userId)) return true;
    if (project.creatorEmail && userEmail && project.creatorEmail.trim().toLowerCase() === userEmail) return true;
    return isProjectOwner(project, user);
  }

  function getUserProjects() {
    if (!state.currentUser) return [];
    return state.projects.filter(p => isUserMemberOfProject(p, state.currentUser));
  }

  function getActualCollaborators() {
    if (!state.currentUser) return [];
    const userId = state.currentUser.id || state.currentUser.uid;
    const userEmail = getCurrentUserEmail(state.currentUser);

    const collabMap = new Map();
    const myProjects = getUserProjects();

    myProjects.forEach(p => {
      (p.members || []).forEach(m => {
        const isSelf = (m.id && userId && m.id === userId) || 
                       (m.email && userEmail && m.email.trim().toLowerCase() === userEmail);
        if (!isSelf && m.email) {
          const emailKey = m.email.trim().toLowerCase();
          if (!collabMap.has(emailKey)) {
            collabMap.set(emailKey, {
              id: m.id || ('collab-' + Math.random().toString(36).substr(2, 9)),
              name: m.name || m.email.split('@')[0],
              email: m.email,
              role: m.role || 'Contributor',
              avatar: m.avatar || (m.name ? m.name.substring(0, 2).toUpperCase() : 'CO'),
              workedOn: p.name
            });
          }
        }
      });
    });

    return Array.from(collabMap.values());
  }

  function isTaskAssignedToUser(task, user) {
    if (!task || !user) return false;
    const userId = user.id || user.uid;
    const userEmail = (
      (user.identities && user.identities.email) ||
      user.email ||
      getCurrentUserEmail(user) ||
      ''
    ).trim().toLowerCase();

    if (task.assigneeId && userId && task.assigneeId === userId) return true;
    if (task.assigneeEmail && userEmail && task.assigneeEmail.trim().toLowerCase() === userEmail) return true;
    if (task.assigneeName && user.name && task.assigneeName.trim().toLowerCase() === user.name.trim().toLowerCase()) return true;
    return false;
  }

  function getProjectMemberForUser(project, user) {
    if (!project || !Array.isArray(project.members) || !user) return null;
    const userId = user.id || user.uid;
    const userEmail = (
      (user.identities && user.identities.email) ||
      user.email ||
      getCurrentUserEmail(user) ||
      ''
    ).trim().toLowerCase();

    return project.members.find(m => {
      if (m.id && userId && m.id === userId) return true;
      if (m.email && userEmail && m.email.trim().toLowerCase() === userEmail) return true;
      if (m.name && user.name && m.name.trim().toLowerCase() === user.name.trim().toLowerCase()) return true;
      return false;
    }) || null;
  }

  function canUserAssignOthers(project, user) {
    if (!project || !user) return true;
    const policy = project.taskAssignmentPolicy || 'anyone';
    if (policy === 'anyone') return true;

    const currentUid = user.id || user.uid;
    const memberObj = getProjectMemberForUser(project, user);
    const memberId = memberObj ? memberObj.id : currentUid;

    const isCreator = Boolean(
      (project.creatorId && currentUid && project.creatorId === currentUid) ||
      (project.creatorId && memberId && project.creatorId === memberId) ||
      (!project.creatorId && memberObj && memberObj.role === 'Owner') ||
      (!project.creatorId && Array.isArray(project.members) && project.members[0] && (project.members[0].id === memberId || project.members[0].id === currentUid))
    );

    const isAdmin = isCreator || (memberObj && (
      memberObj.role === 'Owner' ||
      memberObj.role === 'Project Lead' ||
      memberObj.role === 'Admin'
    ));

    const isSpecificAssigner = Boolean(
      project.specialAssigners && memberId && project.specialAssigners.includes(memberId)
    ) || Boolean(
      project.specialAssigners && currentUid && project.specialAssigners.includes(currentUid)
    );

    if (policy === 'creator_admin') {
      return Boolean(isCreator || isAdmin);
    } else if (policy === 'specific_members') {
      return Boolean(isCreator || isAdmin || isSpecificAssigner);
    }
    return true;
  }

  function canUserChangeTaskStatus(project, task, user) {
    if (!project || !task || !user) return false;

    // 1. Task Assignee: "from whom task is assign"
    if (isTaskAssignedToUser(task, user)) {
      return true;
    }

    // 2. Who can assign tasks: "who can assign"
    if (canUserAssignOthers(project, user)) {
      return true;
    }

    return false;
  }


  // =========================================================
  // 7. HOME DASHBOARD RENDERING (Only My Projects)
  // =========================================================
  function renderHome() {
    if (Array.isArray(state.projects)) {
      state.projects.forEach(p => syncProjectMemberAvatarsFromFirestore(p));
    }
    renderQuickStats();
    renderPendingTasks();
    renderProjectGroups();
  }

  function renderQuickStats() {
    const userProjects = getUserProjects();
    const totalProjects = userProjects.length;
    let pendingCount = 0;
    let completedCount = 0;

    userProjects.forEach(p => {
      (p.tasks || []).forEach(t => {
        if (isTaskAssignedToUser(t, state.currentUser) && t.status !== 'completed') {
          pendingCount++;
        }
        if (isTaskAssignedToUser(t, state.currentUser) && t.status === 'completed') {
          completedCount++;
        }
      });
    });

    // Count unique collaborators across user's active projects
    const collabSet = new Set();
    const userId = state.currentUser ? (state.currentUser.id || state.currentUser.uid) : null;
    const userEmail = state.currentUser ? (((state.currentUser.identities && state.currentUser.identities.email) || state.currentUser.email || '').trim().toLowerCase()) : '';

    userProjects.forEach(p => {
      (p.members || []).forEach(m => {
        const isSelf = (m.id && userId && m.id === userId) || (m.email && userEmail && m.email.trim().toLowerCase() === userEmail);
        if (!isSelf && m.email) {
          collabSet.add(m.email.toLowerCase());
        }
      });
    });

    const statProjects = document.getElementById('stat-total-projects');
    const statPending = document.getElementById('stat-pending-tasks');
    const statCompleted = document.getElementById('stat-completed-tasks');
    const statCollab = document.getElementById('stat-team-collaborators');
    const menuPendingCount = document.getElementById('menu-pending-count');

    if (statProjects) statProjects.innerText = totalProjects;
    if (statPending) statPending.innerText = pendingCount;
    if (statCompleted) statCompleted.innerText = completedCount;
    if (statCollab) statCollab.innerText = collabSet.size;
    if (menuPendingCount) menuPendingCount.innerText = pendingCount;
  }

  function renderPendingTasks() {
    const container = document.getElementById('pending-tasks-container');
    if (!container) return;

    // Collect all pending tasks for current user across projects where user is a member
    let myTasks = [];
    const userProjects = getUserProjects();
    userProjects.forEach(p => {
      (p.tasks || []).forEach(t => {
        if (isTaskAssignedToUser(t, state.currentUser) && t.status !== 'completed') {
          myTasks.push({
            task: t,
            projectId: p.id,
            projectName: p.name,
            projectGroup: p.group
          });
        }
      });
    });

    // Apply filter
    if (state.pendingTaskFilter === 'high') {
      myTasks = myTasks.filter(item => item.task.priority === 'High' || item.task.priority === 'Urgent');
    } else if (state.pendingTaskFilter === 'urgent') {
      myTasks = myTasks.filter(item => item.task.priority === 'Urgent');
    }

    if (myTasks.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <h4>No pending tasks!</h4>
          <p>You're all caught up on deliverables across your project groups.</p>
        </div>
      `;
      return;
    }

    let html = '';
    myTasks.forEach(item => {
      const t = item.task;
      const priorityClass = t.priority.toLowerCase();
      const isOverdue = new Date(t.dueDate) < new Date();

      html += `
        <div class="pending-task-item" id="pending-item-${t.id}">
          <div class="task-item-left">
            <input type="checkbox" class="task-checkbox" title="Mark complete"
                   onclick="window.App.toggleTaskComplete('${item.projectId}', '${t.id}', this.checked)">
            <div class="task-item-info">
              <span class="task-item-title">${escapeHtml(t.title)}</span>
              <div class="task-item-meta">
                <span class="project-tag" onclick="window.App.openProject('${item.projectId}')" style="cursor: pointer;">
                  📁 ${escapeHtml(item.projectName)}
                </span>
                <span class="badge-priority ${priorityClass}">${escapeHtml(t.priority)}</span>
              </div>
            </div>
          </div>
          <div class="task-item-right">
            <span class="task-due-date ${isOverdue ? 'overdue' : ''}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              ${escapeHtml(formatDate(t.dueDate))}
            </span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function filterPendingTasks(filterType, btn) {
    state.pendingTaskFilter = filterType;
    const pills = document.querySelectorAll('#task-filter-pills .filter-pill');
    pills.forEach(p => p.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderPendingTasks();
  }

  function renderGroupFilterPills() {
    const container = document.getElementById('group-filter-pills');
    if (!container) return;

    const userProjects = getUserProjects();
    const groupSet = new Set();
    userProjects.forEach(p => {
      if (p.group && p.group.trim()) {
        groupSet.add(p.group.trim());
      }
    });
    const groups = Array.from(groupSet).sort((a, b) => a.localeCompare(b));

    // If current filter is no longer present in joined projects, reset to 'all'
    if (state.projectGroupFilter !== 'all' && !groupSet.has(state.projectGroupFilter)) {
      state.projectGroupFilter = 'all';
    }

    let html = `
      <button class="filter-pill ${state.projectGroupFilter === 'all' ? 'active' : ''}" onclick="window.App.filterProjectGroups('all', this)">All Groups</button>
    `;

    groups.forEach(grp => {
      const isActive = (state.projectGroupFilter === grp);
      html += `
        <button class="filter-pill ${isActive ? 'active' : ''}" onclick="window.App.filterProjectGroups(decodeURIComponent('${encodeURIComponent(grp)}'), this)">${escapeHtml(grp)}</button>
      `;
    });

    container.innerHTML = html;
  }

  function renderProjectGroups() {
    renderGroupFilterPills();

    const grid = document.getElementById('project-groups-grid');
    if (!grid) return;

    // Strict filter: ONLY display projects where current user is an active member or creator
    let filtered = getUserProjects();
    if (state.projectGroupFilter !== 'all') {
      filtered = filtered.filter(p => p.group === state.projectGroupFilter);
    }

    if (state.globalSearchQuery) {
      const q = state.globalSearchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.group.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <h4>No project groups found</h4>
          <p>${state.globalSearchQuery ? 'No projects matched your search query.' : (state.projectGroupFilter !== 'all' ? `No project groups found in category "${state.projectGroupFilter}".` : "You are not a member of any project groups yet.")}</p>
          <div style="margin-top: 14px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm" onclick="window.App.openCreateProjectModal()">+ Create Project Group</button>
            <button class="btn btn-secondary btn-sm" onclick="window.App.openJoinWithCodeModal()">Join with Code</button>
          </div>
        </div>
      `;
      return;
    }

    let html = '';
    filtered.forEach(p => {
      const projectTasks = p.tasks || [];
      const projectMembers = p.members || [];
      const totalTasks = projectTasks.length;
      const completedTasks = projectTasks.filter(t => t.status === 'completed').length;
      const progressPct = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

      // Remaining days
      const daysRemaining = calculateDaysRemaining(p.deadline);

      // Avatar stack
      let avatarsHtml = '';
      projectMembers.slice(0, 3).forEach(m => {
        avatarsHtml += `<div class="stack-item" title="${escapeHtml(m.name)} (${escapeHtml(m.role)})">${renderAvatarInnerHtml(m.avatar, m.name)}</div>`;
      });
      if (projectMembers.length > 3) {
        avatarsHtml += `<div class="stack-item stack-more">+${projectMembers.length - 3}</div>`;
      }

      html += `
        <div class="project-card" onclick="window.App.openProject('${p.id}')">
          <div class="card-top">
            <div class="card-badges-row">
              <span class="group-badge">${escapeHtml(p.group)}</span>
              <span class="project-id-tag">${escapeHtml(p.id)}</span>
            </div>
            <h3>${escapeHtml(p.name)}</h3>
            <p class="project-card-desc">${escapeHtml(p.description)}</p>
            <div class="project-card-dates">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${escapeHtml(formatDate(p.startDate))} - ${escapeHtml(formatDate(p.deadline))} (${daysRemaining})</span>
            </div>
          </div>

          <div class="card-progress-box">
            <div class="card-progress-labels">
              <span>Progress</span>
              <strong>${progressPct}% (${completedTasks}/${totalTasks})</strong>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${progressPct}%;"></div>
            </div>
          </div>

          <div class="card-footer">
            <div class="avatar-stack">
              ${avatarsHtml}
            </div>
            <span class="card-open-link">
              Open Panel
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
  }

  function filterProjectGroups(groupName, btn) {
    state.projectGroupFilter = groupName;
    renderProjectGroups();
  }

  function toggleProjectSettingsDropdown(event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const dropdown = document.getElementById('project-settings-dropdown');
    const btn = document.getElementById('btn-project-settings-toggle');
    if (!dropdown) return;
    const isVisible = dropdown.style.display === 'flex' || dropdown.style.display === 'block';
    dropdown.style.display = isVisible ? 'none' : 'flex';
    if (btn) {
      btn.classList.toggle('active', !isVisible);
    }
  }

  function closeProjectSettingsDropdown() {
    const dropdown = document.getElementById('project-settings-dropdown');
    const btn = document.getElementById('btn-project-settings-toggle');
    if (dropdown) dropdown.style.display = 'none';
    if (btn) btn.classList.remove('active');
  }

  // =========================================================
  // 8. PROJECT DETAIL PANEL RENDERING (Overview, Tasks, Chats)
  // =========================================================
  function renderProjectDetail(project) {
    if (!project) return;
    closeProjectSettingsDropdown();
    syncProjectMemberAvatarsFromFirestore(project);

    // Header info
    document.getElementById('detail-project-group').innerText = project.group;
    document.getElementById('detail-project-name').innerText = project.name;
    document.getElementById('detail-project-desc').innerText = project.description;
    document.getElementById('detail-project-dates').innerText = formatDate(project.startDate) + ' - ' + formatDate(project.deadline);
    document.getElementById('detail-deadline-pill').innerText = calculateDaysRemaining(project.deadline);

    // Tab counts (Active tasks: pending + in_progress, excluding completed)
    updateTaskTabBadges(project);
    const teamTabBadge = document.getElementById('tab-team-count');
    if (teamTabBadge) teamTabBadge.innerText = String(project.members.length);
    updateChatTabBadge(project);

    const myTasksUserName = document.getElementById('mytasks-user-name');
    if (myTasksUserName) myTasksUserName.innerText = state.currentUser.name;

    // Render dynamic action buttons (Settings gear dropdown)
    const dynamicActionsContainer = document.getElementById('detail-dynamic-actions');
    const isOwner = isProjectOwner(project, state.currentUser);
    const isAdmin = isProjectAdmin(project, state.currentUser);
    const isCreator = isProjectCreator(project, state.currentUser);

    if (dynamicActionsContainer) {
      dynamicActionsContainer.innerHTML = `
        <div class="project-settings-menu-wrapper" id="project-settings-menu-wrapper">
          <button type="button" class="btn btn-secondary btn-header-settings" id="btn-project-settings-toggle" onclick="window.App.toggleProjectSettingsDropdown(event);" title="Project Settings & Actions" aria-label="Project Settings">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
          <div class="project-settings-dropdown" id="project-settings-dropdown" style="display: none;">
            ${isCreator ? `
              <button type="button" class="project-settings-menu-item" id="btn-edit-project-header" onclick="window.App.closeProjectSettingsDropdown(); window.App.openEditProjectDetailModal('${project.id}');" title="Edit project name, category, description, and permissions">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                <span>Edit Project Details</span>
              </button>
            ` : ''}
            ${(isOwner || isAdmin) ? `
              <button type="button" class="project-settings-menu-item" onclick="window.App.closeProjectSettingsDropdown(); window.App.openBroadcastUpdateModal('${project.id}');" title="Broadcast update notification to all project members">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span>Notify Team (Broadcast)</span>
              </button>
            ` : ''}
            ${isOwner ? `
              <div class="project-settings-menu-divider"></div>
              <button type="button" class="project-settings-menu-item danger" onclick="window.App.closeProjectSettingsDropdown(); window.App.openDeleteProjectModal('${project.id}');" title="Permanently delete this project group">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                <span>Delete Project</span>
              </button>
            ` : `
              <div class="project-settings-menu-divider"></div>
              <button type="button" class="project-settings-menu-item danger" onclick="window.App.closeProjectSettingsDropdown(); window.App.openExitProjectModal('${project.id}');" title="Leave this project group">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                <span>Exit Project</span>
              </button>
            `}
          </div>
        </div>
      `;
    }

    // Toggle overview admin / exit cards
    const ownerActionsCard = document.getElementById('project-owner-actions-card');
    const memberExitCard = document.getElementById('project-member-exit-card');
    if (ownerActionsCard) {
      ownerActionsCard.style.display = isOwner ? 'block' : 'none';
    }
    if (memberExitCard) {
      memberExitCard.style.display = (!isOwner) ? 'block' : 'none';
    }

    // Overview Tab
    renderProjectOverview(project);

    // All Tasks Tab
    renderProjectTasks(project);

    // My Tasks Tab (Assigned to current user for this project)
    renderMyProjectTasks(project);

    // Team Tab
    renderProjectTeam(project);

    // Chats Tab
    renderProjectChats(project);
  }

  function renderProjectOverview(project) {
    document.getElementById('overview-full-desc').innerText = project.description;

    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = totalTasks - completedTasks;
    const progressPct = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    document.getElementById('overview-progress-pct').innerText = progressPct + '%';
    document.getElementById('overview-progress-bar').style.width = progressPct + '%';

    document.getElementById('overview-metric-total').innerText = totalTasks;
    document.getElementById('overview-metric-pending').innerText = pendingTasks;
    document.getElementById('overview-metric-completed').innerText = completedTasks;
    document.getElementById('overview-metric-members').innerText = project.members.length;

    // Assignment Policy Badge
    const policyBadge = document.getElementById('detail-assignment-policy-badge');
    if (policyBadge) {
      const isOwnerOrAdmin = isProjectAdmin(project, state.currentUser) || isProjectOwner(project, state.currentUser);
      let label = 'who can Assign: Anyone';
      let cls = 'badge badge-success';
      if (project.taskAssignmentPolicy === 'creator_admin') {
        label = 'who can Assign: Admin';
        cls = 'badge badge-policy';
      } else if (project.taskAssignmentPolicy === 'specific_members') {
        label = 'who can Assign: Selected Member';
        cls = 'badge badge-policy';
      }

      if (isOwnerOrAdmin) {
        policyBadge.innerHTML = `${label} <span style="margin-left: 4px; font-size: 0.72rem; opacity: 0.85;">✏️</span>`;
        policyBadge.style.cursor = 'pointer';
        policyBadge.setAttribute('title', 'Click to change who can assign tasks in this project');
        policyBadge.onclick = () => window.App.openAssignmentPolicyModal(project.id);
      } else {
        policyBadge.innerHTML = label;
        policyBadge.innerText = label;
        policyBadge.style.cursor = 'default';
        policyBadge.removeAttribute('title');
        policyBadge.onclick = null;
      }
      policyBadge.className = cls;
    }

    // Team Roster
    const rosterContainer = document.getElementById('project-team-roster');
    if (rosterContainer) {
      const isCurrentUserCreator = (project.creatorId === state.currentUser.id) || (!project.creatorId);
      let rosterHtml = '';
      project.members.forEach(m => {
        const isMemberCreator = (project.creatorId === m.id) || (m.role === 'Owner');
        const isSpecial = project.specialAssigners && project.specialAssigners.includes(m.id);

        let assignerBadge = '';
        if (isMemberCreator) {
          assignerBadge = `<span class="badge-special-assigner" title="Project Creator has full assignment authority">👑 Creator</span>`;
        } else if (isSpecial) {
          assignerBadge = `<span class="badge-special-assigner" title="Designated Special Assigner">⭐ Special Assigner</span>`;
        }

        let creatorActionBtn = '';
        if (isCurrentUserCreator && !isMemberCreator && project.taskAssignmentPolicy === 'specific_members') {
          creatorActionBtn = `
            <button class="btn-toggle-assigner ${isSpecial ? 'active' : ''}"
                    onclick="window.App.toggleSpecialAssigner('${project.id}', '${m.id}')"
                    title="${isSpecial ? 'Revoke special assigner privilege' : 'Grant special assigner privilege'}">
              ${isSpecial ? '★ Remove Assigner' : '+ Appoint Assigner'}
            </button>
          `;
        }

        rosterHtml += `
          <div class="team-member-row">
            <div class="member-info">
              <div class="member-avatar">${renderAvatarInnerHtml(m.avatar, m.name)}</div>
              <div class="member-names">
                <strong>${escapeHtml(m.name)} ${assignerBadge}</strong>
                <span>${escapeHtml(m.email)}</span>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="member-role-badge" ${(isCurrentUserCreator || (state.currentUser && state.currentUser.id === m.id)) ? `onclick="window.App.openEditMemberRoleModal('${project.id}', '${m.id}')" style="cursor: pointer;" title="Click to edit role"` : ''}>${escapeHtml(m.role || 'Member')}</span>
              ${creatorActionBtn}
            </div>
          </div>
        `;
      });
      rosterContainer.innerHTML = rosterHtml;
    }

    // Join Codes
    document.getElementById('overview-project-id').innerText = project.id;
    document.getElementById('overview-join-code').innerText = project.joinCode;

    // Activity Feed
    const activityContainer = document.getElementById('project-activity-feed');
    if (activityContainer) {
      let actHtml = '';
      (project.activity || []).slice(0, 5).forEach(act => {
        actHtml += `
          <div class="activity-item">
            <div class="activity-item-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="activity-item-content">
              <strong>${escapeHtml(act.text)}</strong>
              <span class="activity-time">${escapeHtml(act.time)}</span>
            </div>
          </div>
        `;
      });
      activityContainer.innerHTML = actHtml;
    }

    // Team Leaderboard / Member Performance Rankings Visibility Check
    const leaderboardCard = document.getElementById('overview-leaderboard-card');
    const visControlContainer = document.getElementById('leaderboard-visibility-control');
    const canSeeRankings = canUserViewRankings(project, state.currentUser);
    const isAdmin = isProjectAdmin(project, state.currentUser) || isProjectOwner(project, state.currentUser);

    if (visControlContainer) {
      if (isAdmin) {
        visControlContainer.innerHTML = `
          <button type="button" class="btn-rankings-visibility" onclick="window.App.openRankingsVisibilityModal('${escapeHtml(project.id)}')" title="Configure who can see Team Member Rankings">
            <span class="vis-icon">👁️</span>
            <span>Visible to: <strong>${formatVisibilityName(project.rankingsVisibility)}</strong></span>
            <span class="vis-gear">⚙️</span>
          </button>
        `;
      } else {
        visControlContainer.innerHTML = '';
      }
    }

    if (leaderboardCard) {
      if (canSeeRankings) {
        leaderboardCard.style.display = 'block';
        renderProjectLeaderboard(project, state.activeLeaderboardFilter || 'overall');
      } else {
        leaderboardCard.style.display = 'none';
      }
    }

    // Member Task Completion Donut Chart
    renderMemberTaskCompletionDonut(project);
  }

  // =========================================================
  // 8A-2. MEMBER TASK COMPLETION DONUT CHART
  // =========================================================

  const DONUT_COLORS = [
    '#4f46e5', // Indigo
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#8b5cf6', // Purple
    '#f97316', // Orange
    '#14b8a6', // Teal
    '#6366f1', // Violet
    '#84cc16'  // Lime
  ];

  function renderMemberTaskCompletionDonut(project) {
    const container = document.getElementById('overview-donut-chart-container');
    const badgeEl = document.getElementById('overview-chart-total-completed-badge');
    if (!container) return;

    if (!project) {
      container.innerHTML = '';
      return;
    }

    const tasks = project.tasks || [];
    const members = project.members || [];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed');
    const totalCompleted = completedTasks.length;
    const overallCompletionPct = totalTasks === 0 ? 0 : Math.round((totalCompleted / totalTasks) * 100);

    if (badgeEl) {
      badgeEl.innerText = `${totalCompleted} of ${totalTasks} Done (${overallCompletionPct}%)`;
    }

    // If project has no tasks at all
    if (totalTasks === 0) {
      container.innerHTML = `
        <div class="donut-empty-state">
          <div style="font-size: 2rem; margin-bottom: 8px;">📋</div>
          <h4 style="margin: 0 0 6px 0; font-size: 1rem; color: var(--text-main);">No deliverables in this project yet</h4>
          <p style="margin: 0; font-size: 0.82rem; color: var(--text-muted);">Create tasks in the <strong>All Tasks</strong> tab to begin tracking completion progress by member.</p>
        </div>
      `;
      return;
    }

    // Build per-member completion data
    const memberStats = members.map((m, idx) => {
      const memberTasks = tasks.filter(t => isTaskAssignedToUser(t, m));
      const memberCompleted = memberTasks.filter(t => t.status === 'completed').length;
      const totalAssigned = memberTasks.length;
      const completionRate = totalAssigned === 0 ? 0 : Math.round((memberCompleted / totalAssigned) * 100);
      const sharePct = totalCompleted === 0 ? 0 : Math.round((memberCompleted / totalCompleted) * 100);

      return {
        id: m.id,
        name: m.name,
        email: m.email || '',
        role: m.role || 'Member',
        avatar: m.avatar || (m.name ? m.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'),
        color: DONUT_COLORS[idx % DONUT_COLORS.length],
        completedCount: memberCompleted,
        totalAssigned: totalAssigned,
        completionRate: completionRate,
        sharePct: sharePct
      };
    });

    // Check for unassigned completed tasks
    const unassignedCompleted = completedTasks.filter(t => !t.assigneeId || !members.some(m => isTaskAssignedToUser(t, m)));
    if (unassignedCompleted.length > 0) {
      const unassignedTotal = tasks.filter(t => !t.assigneeId || !members.some(m => isTaskAssignedToUser(t, m))).length;
      const sharePct = totalCompleted === 0 ? 0 : Math.round((unassignedCompleted.length / totalCompleted) * 100);
      memberStats.push({
        id: 'unassigned',
        name: 'Unassigned Tasks',
        email: '',
        role: 'Unassigned',
        avatar: '❓',
        color: '#94a3b8',
        completedCount: unassignedCompleted.length,
        totalAssigned: unassignedTotal,
        completionRate: unassignedTotal === 0 ? 0 : Math.round((unassignedCompleted.length / unassignedTotal) * 100),
        sharePct: sharePct
      });
    }

    // Sort legend: highest completedCount first, then totalAssigned
    const sortedMembers = [...memberStats].sort((a, b) => {
      if (b.completedCount !== a.completedCount) return b.completedCount - a.completedCount;
      return b.totalAssigned - a.totalAssigned;
    });

    // Donut SVG circumference calculation (radius 70, cx 100, cy 100)
    const radius = 70;
    const circumference = 2 * Math.PI * radius; // ~439.82

    let svgSlicesHtml = '';
    const activeContributors = memberStats.filter(m => m.completedCount > 0);

    if (totalCompleted === 0) {
      // Empty neutral dashed ring
      svgSlicesHtml = `
        <circle class="donut-slice-empty"
                cx="100" cy="100" r="${radius}" />
      `;
    } else {
      let currentOffset = 0;
      activeContributors.forEach(m => {
        const sliceLength = (m.completedCount / totalCompleted) * circumference;
        const gap = activeContributors.length > 1 ? 2.5 : 0;
        const actualLength = Math.max(1, sliceLength - gap);
        const dashArray = `${actualLength.toFixed(2)} ${(circumference - actualLength).toFixed(2)}`;
        const dashOffset = (-currentOffset).toFixed(2);

        svgSlicesHtml += `
          <circle class="donut-slice"
                  id="donut-slice-${escapeHtml(m.id)}"
                  cx="100" cy="100" r="${radius}"
                  stroke="${m.color}"
                  stroke-width="24"
                  stroke-dasharray="${dashArray}"
                  stroke-dashoffset="${dashOffset}"
                  onmouseenter="window.App.highlightDonutMember('${escapeHtml(m.id)}', true)"
                  onmouseleave="window.App.highlightDonutMember('${escapeHtml(m.id)}', false)"
                  onclick="window.App.openMemberDonutModal('${escapeHtml(project.id)}', '${escapeHtml(m.id)}')"
                  data-member-id="${escapeHtml(m.id)}">
            <title>${escapeHtml(m.name)}: ${m.completedCount} task${m.completedCount === 1 ? '' : 's'} done (${m.sharePct}% of completions)</title>
          </circle>
        `;
        currentOffset += sliceLength;
      });
    }

    // Center Info labels
    const defaultCenterNum = totalCompleted.toString();
    const defaultCenterLabel = totalCompleted === 1 ? 'TASK DONE' : 'TASKS DONE';
    const defaultCenterSub = `${overallCompletionPct}% of project`;

    // Build Legend Items
    let legendItemsHtml = '';
    sortedMembers.forEach(m => {
      legendItemsHtml += `
        <div class="donut-member-item"
             id="donut-member-row-${escapeHtml(m.id)}"
             data-member-id="${escapeHtml(m.id)}"
             data-member-name="${escapeHtml(m.name)}"
             data-completed-count="${m.completedCount}"
             data-share-pct="${m.sharePct}"
             onmouseenter="window.App.highlightDonutMember('${escapeHtml(m.id)}', true)"
             onmouseleave="window.App.highlightDonutMember('${escapeHtml(m.id)}', false)"
             onclick="window.App.openMemberDonutModal('${escapeHtml(project.id)}', '${escapeHtml(m.id)}')"
             title="Click to view ${escapeHtml(m.name)}'s task completion donut chart">
          <div class="donut-member-left">
            <span class="donut-color-dot" style="background-color: ${m.color};"></span>
            <div class="donut-member-avatar">${renderAvatarInnerHtml(m.avatar, m.name)}</div>
            <div class="donut-member-name-group">
              <span class="donut-member-name">${escapeHtml(m.name)}</span>
              <span class="donut-member-role">${escapeHtml(m.role)}</span>
            </div>
          </div>
          <div class="donut-member-right">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="donut-member-count">${m.completedCount}/${m.totalAssigned} done</span>
              <span class="donut-member-share-pill" style="color: ${m.color}; border-color: ${m.color}40;">
                ${totalCompleted > 0 ? `${m.sharePct}% share` : `${m.completionRate}% rate`}
              </span>
            </div>
            <div class="donut-member-track" style="width: 110px;" title="${m.completionRate}% of assigned deliverables completed">
              <div class="donut-member-fill" style="width: ${m.completionRate}%; background-color: ${m.color};"></div>
            </div>
          </div>
        </div>
      `;
    });

    const emptyNote = (totalCompleted === 0 && totalTasks > 0) ? `
      <div style="margin-top: 10px; font-size: 0.78rem; color: var(--text-muted); text-align: center; font-style: italic;">
        No tasks completed yet. As members finish deliverables, this chart dynamically visualizes their completion contributions.
      </div>
    ` : '';

    container.innerHTML = `
      <div class="donut-chart-flex">
        <div class="donut-graphic-col">
          <div class="donut-svg-box">
            <svg viewBox="0 0 200 200" class="donut-svg">
              ${svgSlicesHtml}
            </svg>
            <div class="donut-center-info">
              <span class="donut-center-number" id="donut-center-number-val" data-default-val="${defaultCenterNum}">${defaultCenterNum}</span>
              <span class="donut-center-label" id="donut-center-label-val" data-default-val="${defaultCenterLabel}">${defaultCenterLabel}</span>
              <span class="donut-center-sub" id="donut-center-sub-val" data-default-val="${defaultCenterSub}">${defaultCenterSub}</span>
            </div>
          </div>
        </div>

        <div class="donut-legend-col">
          ${legendItemsHtml}
          ${emptyNote}
        </div>
      </div>
    `;
  }

  function highlightDonutMember(memberId, isHovered) {
    const container = document.getElementById('overview-donut-chart-container');
    if (!container) return;

    const slices = container.querySelectorAll('.donut-slice');
    const rows = container.querySelectorAll('.donut-member-item');
    const centerNum = document.getElementById('donut-center-number-val');
    const centerLabel = document.getElementById('donut-center-label-val');
    const centerSub = document.getElementById('donut-center-sub-val');

    if (!isHovered) {
      slices.forEach(s => {
        s.style.opacity = '1';
        s.style.strokeWidth = '24';
      });
      rows.forEach(r => r.classList.remove('active-highlight'));
      if (centerNum && centerNum.dataset.defaultVal) {
        centerNum.innerText = centerNum.dataset.defaultVal;
      }
      if (centerLabel && centerLabel.dataset.defaultVal) {
        centerLabel.innerText = centerLabel.dataset.defaultVal;
      }
      if (centerSub && centerSub.dataset.defaultVal) {
        centerSub.innerText = centerSub.dataset.defaultVal;
      }
      return;
    }

    slices.forEach(s => {
      if (s.getAttribute('data-member-id') === memberId) {
        s.style.opacity = '1';
        s.style.strokeWidth = '28';
      } else {
        s.style.opacity = '0.35';
        s.style.strokeWidth = '24';
      }
    });

    rows.forEach(r => {
      if (r.getAttribute('data-member-id') === memberId) {
        r.classList.add('active-highlight');
      } else {
        r.classList.remove('active-highlight');
      }
    });

    const targetRow = document.getElementById(`donut-member-row-${memberId}`);
    if (targetRow && centerNum && centerLabel && centerSub) {
      const count = targetRow.dataset.completedCount || '0';
      const name = targetRow.dataset.memberName || 'Member';
      const share = targetRow.dataset.sharePct || '0';
      centerNum.innerText = count;
      centerLabel.innerText = name;
      centerSub.innerText = `${share}% of team total`;
    }
  }

  function openMemberDonutModal(projectId, memberId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;

    let member = (project.members || []).find(m => m.id === memberId || m.email === memberId);
    let isUnassigned = false;
    if (!member && memberId === 'unassigned') {
      isUnassigned = true;
      member = {
        id: 'unassigned',
        name: 'Unassigned Deliverables',
        role: 'Unassigned',
        avatar: '❓',
        email: ''
      };
    }

    if (!member) {
      showToast('Member not found in this project.', 'error');
      return;
    }

    const modalBody = document.getElementById('member-donut-modal-body');
    const modalFooter = document.getElementById('member-donut-modal-footer');
    const modalTitle = document.getElementById('member-donut-modal-title');
    const modalSubtitle = document.getElementById('member-donut-modal-subtitle');
    if (!modalBody || !modalFooter) return;

    const memberName = member.name || 'Team Member';
    const memberAvatar = member.avatar || (memberName ? memberName.substring(0, 2).toUpperCase() : 'TM');
    const isCreator = (project.creatorId === member.id) || (member.role === 'Owner');

    if (modalTitle) modalTitle.innerText = `${memberName} — Task Completion`;
    if (modalSubtitle) modalSubtitle.innerText = `Personal deliverable completion donut chart and task status breakdown in ${project.name}`;

    // Get assigned tasks
    const allTasks = project.tasks || [];
    const assignedTasks = isUnassigned
      ? allTasks.filter(t => !t.assigneeId || !project.members.some(m => isTaskAssignedToUser(t, m)))
      : allTasks.filter(t => isTaskAssignedToUser(t, member));

    const completedTasks = assignedTasks.filter(t => t.status === 'completed');
    const inProgressTasks = assignedTasks.filter(t => t.status === 'in_progress');
    const pendingTasks = assignedTasks.filter(t => t.status === 'pending');

    const totalAssigned = assignedTasks.length;
    const completedCount = completedTasks.length;
    const inProgressCount = inProgressTasks.length;
    const pendingCount = pendingTasks.length;

    const completionRate = totalAssigned === 0 ? 0 : Math.round((completedCount / totalAssigned) * 100);

    const totalProjectCompleted = allTasks.filter(t => t.status === 'completed').length;
    const shareOfProject = totalProjectCompleted === 0 ? 0 : Math.round((completedCount / totalProjectCompleted) * 100);

    // Build SVG Donut Chart for this member's task status distribution
    const radius = 65;
    const circumference = 2 * Math.PI * radius; // ~408.41
    let svgSlices = '';

    if (totalAssigned === 0) {
      svgSlices = `<circle class="donut-slice-empty" cx="100" cy="100" r="${radius}" />`;
    } else {
      const statusSlices = [
        { label: 'Completed', count: completedCount, color: '#10b981' },
        { label: 'In Progress', count: inProgressCount, color: '#3b82f6' },
        { label: 'Pending', count: pendingCount, color: '#94a3b8' }
      ].filter(s => s.count > 0);

      let currentOffset = 0;
      statusSlices.forEach(s => {
        const sliceLength = (s.count / totalAssigned) * circumference;
        const gap = statusSlices.length > 1 ? 2.5 : 0;
        const actualLength = Math.max(1, sliceLength - gap);
        const dashArray = `${actualLength.toFixed(2)} ${(circumference - actualLength).toFixed(2)}`;
        const dashOffset = (-currentOffset).toFixed(2);
        const pct = Math.round((s.count / totalAssigned) * 100);

        svgSlices += `
          <circle class="donut-slice"
                  cx="100" cy="100" r="${radius}"
                  stroke="${s.color}"
                  stroke-width="22"
                  stroke-dasharray="${dashArray}"
                  stroke-dashoffset="${dashOffset}">
            <title>${s.label}: ${s.count} (${pct}%)</title>
          </circle>
        `;
        currentOffset += sliceLength;
      });
    }

    const centerNumber = `${completionRate}%`;
    const centerLabel = 'DONE';
    const centerSub = `${completedCount} of ${totalAssigned}`;

    // Tasks list HTML
    let tasksListHtml = '';
    if (assignedTasks.length === 0) {
      tasksListHtml = `
        <div style="text-align: center; padding: 20px; color: var(--text-muted); font-size: 0.85rem; background: var(--bg-card); border-radius: var(--radius-sm); border: 1px dashed var(--border-color);">
          No deliverables currently assigned to ${escapeHtml(memberName)}.
        </div>
      `;
    } else {
      assignedTasks.forEach(t => {
        const isDone = t.status === 'completed';
        const statusLabel = isDone ? 'Completed' : (t.status === 'in_progress' ? 'In Progress' : 'Pending');
        const statusColor = isDone ? '#10b981' : (t.status === 'in_progress' ? '#3b82f6' : '#94a3b8');
        const dateLabel = isDone
          ? `Done: ${formatDate(t.completedDate || t.dueDate)}`
          : `Due: ${formatDate(t.dueDate)}`;

        tasksListHtml += `
          <div class="member-donut-task-item ${isDone ? 'completed' : ''}"
               onclick="window.App.closeModal('modal-member-donut'); window.App.openTaskDetailModal('${escapeHtml(project.id)}', '${escapeHtml(t.id)}')"
               title="Click to view task details">
            <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${statusColor}; flex-shrink: 0;"></span>
              <span class="task-title-text" style="font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(t.title)}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
              <span class="badge-priority ${(t.priority || 'medium').toLowerCase()}" style="font-size: 0.7rem; padding: 1px 6px;">${escapeHtml(t.priority || 'Medium')}</span>
              <span style="font-size: 0.72rem; color: ${isDone ? 'var(--success, #10b981)' : 'var(--text-muted)'}; font-weight: ${isDone ? '600' : '400'};">${escapeHtml(dateLabel)}</span>
            </div>
          </div>
        `;
      });
    }

    modalBody.innerHTML = `
      <!-- Member Hero -->
      <div class="member-donut-hero">
        <div class="member-donut-avatar">${renderAvatarInnerHtml(memberAvatar, memberName)}</div>
        <div class="member-donut-info">
          <h4>${escapeHtml(memberName)} ${isCreator ? '<span style="font-size: 0.9rem;">👑</span>' : ''}</h4>
          <div class="member-donut-meta">
            <span class="member-role-badge">${escapeHtml(member.role || 'Member')}</span>
            <span class="badge badge-info" style="font-size: 0.75rem;">${shareOfProject}% of Team Deliverables</span>
          </div>
        </div>
      </div>

      <!-- Quick Stats Row -->
      <div class="member-donut-stats-grid">
        <div class="member-donut-stat-box">
          <span class="member-donut-stat-val">${totalAssigned}</span>
          <span class="member-donut-stat-lbl">Assigned</span>
        </div>
        <div class="member-donut-stat-box completed">
          <span class="member-donut-stat-val completed">${completedCount}</span>
          <span class="member-donut-stat-lbl">Completed</span>
        </div>
        <div class="member-donut-stat-box in-progress">
          <span class="member-donut-stat-val in-progress">${inProgressCount}</span>
          <span class="member-donut-stat-lbl">In Progress</span>
        </div>
        <div class="member-donut-stat-box pending">
          <span class="member-donut-stat-val pending">${pendingCount}</span>
          <span class="member-donut-stat-lbl">Pending</span>
        </div>
      </div>

      <!-- Member Donut Chart Row -->
      <div class="member-donut-chart-row">
        <div class="donut-svg-box" style="width: 170px; height: 170px;">
          <svg viewBox="0 0 200 200" class="donut-svg">
            ${svgSlices}
          </svg>
          <div class="donut-center-info">
            <span class="donut-center-number" style="font-size: 1.6rem;">${centerNumber}</span>
            <span class="donut-center-label" style="font-size: 0.68rem;">${centerLabel}</span>
            <span class="donut-center-sub" style="font-size: 0.68rem;">${centerSub}</span>
          </div>
        </div>

        <div class="member-donut-legend-box">
          <div class="member-donut-legend-item">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #10b981;"></span>
              <strong>Completed</strong>
            </div>
            <span>${completedCount} (${totalAssigned === 0 ? 0 : Math.round((completedCount / totalAssigned) * 100)}%)</span>
          </div>
          <div class="member-donut-legend-item">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #3b82f6;"></span>
              <strong>In Progress</strong>
            </div>
            <span>${inProgressCount} (${totalAssigned === 0 ? 0 : Math.round((inProgressCount / totalAssigned) * 100)}%)</span>
          </div>
          <div class="member-donut-legend-item">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #94a3b8;"></span>
              <strong>Pending</strong>
            </div>
            <span>${pendingCount} (${totalAssigned === 0 ? 0 : Math.round((pendingCount / totalAssigned) * 100)}%)</span>
          </div>
        </div>
      </div>

      <!-- Member Deliverables List -->
      <div style="margin-top: 4px;">
        <h5 style="margin: 0 0 8px 0; font-size: 0.88rem; font-weight: 700; color: var(--text-main); display: flex; align-items: center; justify-content: space-between;">
          <span>Assigned Deliverables (${totalAssigned})</span>
          <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 400;">Click task to view details</span>
        </h5>
        <div class="member-donut-tasks-list">
          ${tasksListHtml}
        </div>
      </div>
    `;

    modalFooter.innerHTML = `
      ${!isUnassigned ? `
        <button type="button" class="btn btn-outline btn-sm" onclick="window.App.closeModal('modal-member-donut'); window.App.openMemberContactModal('${escapeHtml(project.id)}', '${escapeHtml(member.id)}');" style="margin-right: auto;">
          👤 View Contact Info
        </button>
      ` : ''}
      <button type="button" class="btn btn-primary btn-sm" onclick="window.App.closeModal('modal-member-donut');">Close</button>
    `;

    openModal('modal-member-donut');
  }

  // =========================================================
  // 8B. TEAM MEMBER RANKINGS & LEADERBOARD (Options 1, 2, 4)
  // =========================================================

  function computeMemberPerformanceScores(project) {
    if (!project || !Array.isArray(project.members) || project.members.length === 0) {
      return [];
    }

    const todayStr = new Date().toISOString().substring(0, 10);
    const tasks = Array.isArray(project.tasks) ? project.tasks : [];
    const chats = Array.isArray(project.chats) ? project.chats : [];

    return project.members.map(member => {
      const memberId = member.id || member.uid;
      const memberName = member.name || 'Member';
      const memberEmail = (member.email || '').trim().toLowerCase();
      const memberRole = member.role || 'Member';
      const memberAvatar = member.avatar || (member.name ? member.name.substring(0, 2).toUpperCase() : 'U');

      // 1. Tasks assigned to this member
      const assignedTasks = tasks.filter(t => isTaskAssignedToUser(t, member));

      let taskScore = 0;
      let completedCount = 0;
      let activeCount = 0;
      let inProgressCount = 0;
      let completedSubtasksCount = 0;

      let punctualityPoints = 0;
      let onTimeCount = 0;
      let earlyCount = 0;
      let lateCount = 0;
      let overdueActiveCount = 0;

      assignedTasks.forEach(task => {
        const isCompleted = task.status === 'completed' || task.completed === true;

        // Subtasks points (+5 pts per completed subtask)
        if (Array.isArray(task.subtasks)) {
          task.subtasks.forEach(st => {
            if (st.completed === true || st.done === true) {
              taskScore += 5;
              completedSubtasksCount++;
            }
          });
        }

        if (isCompleted) {
          completedCount++;

          // Dimension 1: Priority weights for completed tasks
          const prio = (task.priority || 'medium').toLowerCase();
          if (prio === 'urgent') {
            taskScore += 50;
          } else if (prio === 'high') {
            taskScore += 30;
          } else if (prio === 'medium') {
            taskScore += 20;
          } else {
            taskScore += 10;
          }

          // Dimension 2: Punctuality check for completed tasks
          if (task.dueDate) {
            const dueDateStr = String(task.dueDate).substring(0, 10);
            const compDateStr = task.completedDate ? String(task.completedDate).substring(0, 10) : '';

            if (compDateStr) {
              if (compDateStr < dueDateStr) {
                // Completed ahead of deadline
                punctualityPoints += 20; // 15 on-time + 5 early delivery bonus
                earlyCount++;
                onTimeCount++;
              } else if (compDateStr === dueDateStr) {
                // Completed on due date
                punctualityPoints += 15;
                onTimeCount++;
              } else {
                // Completed late
                punctualityPoints -= 5;
                lateCount++;
              }
            } else {
              // No completion date recorded, default on-time
              punctualityPoints += 15;
              onTimeCount++;
            }
          } else {
            // No due date specified, treat completed task as on-time
            punctualityPoints += 15;
            onTimeCount++;
          }
        } else {
          // Task is pending or in progress
          activeCount++;
          if (task.status === 'in_progress') {
            taskScore += 5; // In-progress momentum bonus
            inProgressCount++;
          }

          // Check if active task is overdue
          if (task.dueDate) {
            const dueDateStr = String(task.dueDate).substring(0, 10);
            if (dueDateStr < todayStr) {
              punctualityPoints -= 5; // Overdue penalty
              overdueActiveCount++;
            }
          }
        }
      });

      // Punctuality score floor at 0
      const punctualityScore = Math.max(0, punctualityPoints);

      // On-time percentage calculation
      const onTimeRate = completedCount > 0
        ? Math.round((onTimeCount / completedCount) * 100)
        : 100;

      // Dimension 4: Collaboration & Activity Index
      // A. Task comments authored by member
      let commentCount = 0;
      tasks.forEach(t => {
        if (Array.isArray(t.comments)) {
          t.comments.forEach(c => {
            const isAuthor = (memberId && c.authorId && (c.authorId === memberId || c.authorId === member.uid)) ||
                             (memberEmail && c.authorEmail && c.authorEmail.trim().toLowerCase() === memberEmail) ||
                             (memberName && c.authorName && c.authorName.trim().toLowerCase() === memberName.trim().toLowerCase());
            if (isAuthor) commentCount++;
          });
        }
      });
      const commentPoints = Math.min(50, commentCount * 5); // +5 per comment, max 50 pts

      // B. Team chat messages authored by member
      let chatCount = 0;
      chats.forEach(msg => {
        const isSender = (memberId && msg.senderId && (msg.senderId === memberId || msg.senderId === member.uid)) ||
                         (memberEmail && msg.senderEmail && msg.senderEmail.trim().toLowerCase() === memberEmail) ||
                         (memberName && msg.senderName && msg.senderName.trim().toLowerCase() === memberName.trim().toLowerCase());
        if (isSender) chatCount++;
      });
      const chatPoints = Math.min(40, chatCount * 2); // +2 per chat, max 40 pts

      const collabScore = commentPoints + chatPoints;

      // Composite overall score
      const totalScore = taskScore + punctualityScore + collabScore;

      return {
        id: memberId,
        member: member,
        name: memberName,
        email: memberEmail,
        role: memberRole,
        avatar: memberAvatar,
        taskScore: taskScore,
        punctualityScore: punctualityScore,
        collabScore: collabScore,
        totalScore: totalScore,
        completedCount: completedCount,
        activeCount: activeCount,
        inProgressCount: inProgressCount,
        completedSubtasksCount: completedSubtasksCount,
        onTimeCount: onTimeCount,
        earlyCount: earlyCount,
        lateCount: lateCount,
        overdueActiveCount: overdueActiveCount,
        onTimeRate: onTimeRate,
        commentCount: commentCount,
        chatCount: chatCount
      };
    });
  }

  function renderProjectLeaderboard(project, filterType) {
    if (!filterType) filterType = state.activeLeaderboardFilter || 'overall';
    const container = document.getElementById('project-member-rankings-list');
    if (!container) return;

    if (!project || !Array.isArray(project.members) || project.members.length === 0) {
      container.innerHTML = `
        <div class="leaderboard-empty-state">
          <p>No team members in this project yet.</p>
        </div>
      `;
      return;
    }

    const scoredMembers = computeMemberPerformanceScores(project);

    // Sorting according to selected filter
    scoredMembers.sort((a, b) => {
      if (filterType === 'completed') {
        if (b.completedCount !== a.completedCount) return b.completedCount - a.completedCount;
        if (b.taskScore !== a.taskScore) return b.taskScore - a.taskScore;
        return b.totalScore - a.totalScore;
      } else if (filterType === 'tasks') {
        if (b.taskScore !== a.taskScore) return b.taskScore - a.taskScore;
        if (b.completedCount !== a.completedCount) return b.completedCount - a.completedCount;
        return b.totalScore - a.totalScore;
      } else if (filterType === 'ontime') {
        if (b.onTimeRate !== a.onTimeRate) return b.onTimeRate - a.onTimeRate;
        if (b.completedCount !== a.completedCount) return b.completedCount - a.completedCount;
        return b.punctualityScore - a.punctualityScore;
      } else if (filterType === 'collab') {
        if (b.collabScore !== a.collabScore) return b.collabScore - a.collabScore;
        const sumA = a.commentCount + a.chatCount;
        const sumB = b.commentCount + b.chatCount;
        if (sumB !== sumA) return sumB - sumA;
        return b.totalScore - a.totalScore;
      } else {
        // 'overall' composite score
        if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
        if (b.completedCount !== a.completedCount) return b.completedCount - a.completedCount;
        return b.taskScore - a.taskScore;
      }
    });

    // Determine max score for progress bars
    let maxScore = 1;
    if (filterType === 'completed') {
      maxScore = Math.max(...scoredMembers.map(m => m.completedCount), 1);
    } else if (filterType === 'tasks') {
      maxScore = Math.max(...scoredMembers.map(m => m.taskScore), 1);
    } else if (filterType === 'ontime') {
      maxScore = 100;
    } else if (filterType === 'collab') {
      maxScore = Math.max(...scoredMembers.map(m => m.collabScore), 1);
    } else {
      maxScore = Math.max(...scoredMembers.map(m => m.totalScore), 1);
    }

    let html = '';
    scoredMembers.forEach((m, idx) => {
      const rank = idx + 1;
      let rankBadgeHtml = '';
      if (rank === 1) {
        rankBadgeHtml = `<div class="leaderboard-rank-badge" title="Rank #1 (Gold)">🥇</div>`;
      } else if (rank === 2) {
        rankBadgeHtml = `<div class="leaderboard-rank-badge" title="Rank #2 (Silver)">🥈</div>`;
      } else if (rank === 3) {
        rankBadgeHtml = `<div class="leaderboard-rank-badge" title="Rank #3 (Bronze)">🥉</div>`;
      } else {
        rankBadgeHtml = `<div class="leaderboard-rank-badge rank-other" title="Rank #${rank}">#${rank}</div>`;
      }

      // Display score & label depending on filter
      let scoreNum = 0;
      let scoreLabel = 'Overall Pts';
      let progressPct = 0;

      if (filterType === 'completed') {
        scoreNum = m.completedCount;
        scoreLabel = m.completedCount === 1 ? 'Task Done' : 'Tasks Done';
        progressPct = maxScore > 0 ? Math.round((m.completedCount / maxScore) * 100) : 0;
      } else if (filterType === 'tasks') {
        scoreNum = m.taskScore;
        scoreLabel = 'Task Pts';
        progressPct = maxScore > 0 ? Math.round((m.taskScore / maxScore) * 100) : 0;
      } else if (filterType === 'ontime') {
        scoreNum = `${m.onTimeRate}%`;
        scoreLabel = 'On-Time Rate';
        progressPct = m.onTimeRate;
      } else if (filterType === 'collab') {
        scoreNum = m.collabScore;
        scoreLabel = 'Collab Pts';
        progressPct = maxScore > 0 ? Math.round((m.collabScore / maxScore) * 100) : 0;
      } else {
        scoreNum = m.totalScore;
        scoreLabel = 'Overall Pts';
        progressPct = maxScore > 0 ? Math.round((m.totalScore / maxScore) * 100) : 0;
      }

      // Metrics pill details
      let metricPillsHtml = '';
      if (filterType === 'completed') {
        metricPillsHtml = `
          <span class="leaderboard-metric-pill" title="Completed Tasks">✅ <strong>${m.completedCount}</strong> Done</span>
          <span class="leaderboard-metric-pill" title="Active Tasks">⏳ <strong>${m.activeCount}</strong> In Progress</span>
          <span class="leaderboard-metric-pill" title="Completed Subtasks">📋 <strong>${m.completedSubtasksCount}</strong> Subtasks</span>
        `;
      } else if (filterType === 'tasks') {
        metricPillsHtml = `
          <span class="leaderboard-metric-pill" title="Completed Tasks">✅ <strong>${m.completedCount}</strong> Done</span>
          <span class="leaderboard-metric-pill" title="Active Tasks">⏳ <strong>${m.activeCount}</strong> Active</span>
          <span class="leaderboard-metric-pill" title="Completed Subtasks">📋 <strong>${m.completedSubtasksCount}</strong> Subtasks</span>
        `;
      } else if (filterType === 'ontime') {
        metricPillsHtml = `
          <span class="leaderboard-metric-pill" title="On-time vs Total completed">⏱️ <strong>${m.onTimeCount}/${m.completedCount}</strong> On-Time</span>
          <span class="leaderboard-metric-pill" title="Early deliveries">🚀 <strong>${m.earlyCount}</strong> Early</span>
          ${m.lateCount > 0 ? `<span class="leaderboard-metric-pill" style="color: #ef4444;" title="Late completions">⚠️ <strong>${m.lateCount}</strong> Late</span>` : ''}
        `;
      } else if (filterType === 'collab') {
        metricPillsHtml = `
          <span class="leaderboard-metric-pill" title="Task Update Comments">💬 <strong>${m.commentCount}</strong> Comments</span>
          <span class="leaderboard-metric-pill" title="Team Chat Messages">📨 <strong>${m.chatCount}</strong> Messages</span>
        `;
      } else {
        metricPillsHtml = `
          <span class="leaderboard-metric-pill" title="Completed Deliverables">✅ <strong>${m.completedCount}</strong> Done</span>
          <span class="leaderboard-metric-pill" title="On-Time Delivery Rate">⏱️ <strong>${m.onTimeRate}%</strong> On-Time</span>
          <span class="leaderboard-metric-pill" title="Collaboration Index">💬 <strong>${m.collabScore}</strong> Collab</span>
        `;
      }

      html += `
        <div class="leaderboard-item rank-${rank}" onclick="window.App.openMemberContactModal('${escapeHtml(project.id)}', '${escapeHtml(m.id)}')" title="Click to view contact details for ${escapeHtml(m.name)}">
          ${rankBadgeHtml}
          <div class="leaderboard-avatar">
            ${renderAvatarInnerHtml(m.avatar, m.name)}
          </div>
          <div class="leaderboard-info">
            <div class="leaderboard-user-row">
              <span class="leaderboard-user-name">${escapeHtml(m.name)}</span>
              <span class="leaderboard-role-tag">${escapeHtml(m.role)}</span>
            </div>
            <div class="leaderboard-metrics-row">
              ${metricPillsHtml}
            </div>
            <div class="leaderboard-progress-container" title="Performance progress: ${progressPct}%">
              <div class="leaderboard-progress-bar" style="width: ${Math.max(5, Math.min(100, progressPct))}%;"></div>
            </div>
          </div>
          <div class="leaderboard-score-column">
            <div class="leaderboard-score-num">${scoreNum}</div>
            <div class="leaderboard-score-label">${scoreLabel}</div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function switchLeaderboardFilter(filterType, project) {
    state.activeLeaderboardFilter = filterType;

    const filterBtns = document.querySelectorAll('.leaderboard-filter-btn');
    filterBtns.forEach(btn => {
      if (btn.getAttribute('data-rank-filter') === filterType) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const targetProject = project || getActiveProject();
    if (targetProject) {
      renderProjectLeaderboard(targetProject, filterType);
    }
  }

  // =========================================================
  // 8B.2 TEAM MEMBER RANKINGS VISIBILITY (Admin, Everyone, Selected Member)
  // =========================================================

  function formatVisibilityName(vis) {
    if (vis === 'admin') return 'Admin Only';
    if (vis === 'selected') return 'Selected Members';
    return 'Everyone';
  }

  function canUserViewRankings(project, user) {
    if (!project) return false;
    const policy = project.rankingsVisibility || 'everyone';
    if (policy === 'everyone') return true;

    // Project Creator, Owner, and Admins can ALWAYS view rankings
    if (isProjectAdmin(project, user) || isProjectOwner(project, user)) return true;

    if (policy === 'admin') {
      // Restricted to admin/owner only
      return false;
    }

    if (policy === 'selected') {
      if (!user) return false;
      const userId = user.id || user.uid;
      const userEmail = getCurrentUserEmail(user);
      const member = getProjectMemberForUser(project, user);
      const memberId = member ? member.id : userId;

      const viewers = Array.isArray(project.rankingsViewers) ? project.rankingsViewers : [];
      if (memberId && viewers.includes(memberId)) return true;
      if (userId && viewers.includes(userId)) return true;
      if (userEmail && viewers.some(v => v.toLowerCase() === userEmail.toLowerCase())) return true;
      return false;
    }

    return true;
  }

  function openRankingsVisibilityModal(projectId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    if (!isProjectAdmin(project, state.currentUser) && !isProjectOwner(project, state.currentUser)) {
      showToast('Only project admins and owners can configure rankings visibility.', 'error');
      return;
    }

    const modal = document.getElementById('modal-rankings-visibility');
    const idInput = document.getElementById('rankings-vis-project-id');
    const select = document.getElementById('rankings-vis-policy-select');
    const container = document.getElementById('rankings-vis-members-container');
    const checklist = document.getElementById('rankings-vis-members-checklist');

    if (!modal || !idInput || !select) return;

    idInput.value = project.id;
    select.value = project.rankingsVisibility || 'everyone';

    // Populate checklist with project.members
    const currentViewers = Array.isArray(project.rankingsViewers) ? project.rankingsViewers : [];
    const members = Array.isArray(project.members) ? project.members : [];

    let listHtml = '';
    if (members.length === 0) {
      listHtml = '<p class="text-muted" style="padding: 8px; font-size: 0.85rem;">No members in this project yet.</p>';
    } else {
      members.forEach(m => {
        const isChecked = currentViewers.includes(m.id) || (m.email && currentViewers.includes(m.email));
        const isMemAdmin = isProjectAdmin(project, m) || isProjectOwner(project, m);
        listHtml += `
          <label class="assigner-checkbox-item">
            <input type="checkbox" value="${escapeHtml(m.id)}" class="rankings-viewer-cb" ${isChecked || isMemAdmin ? 'checked' : ''} ${isMemAdmin ? 'disabled' : ''}>
            <span>
              <strong>${escapeHtml(m.name)}</strong> (${escapeHtml(m.role || 'Member')})
              ${isMemAdmin ? '<em style="color: var(--text-muted); font-size: 0.75rem; margin-left: 4px;">(Admin - Always Visible)</em>' : ''}
            </span>
          </label>
        `;
      });
    }
    if (checklist) checklist.innerHTML = listHtml;

    if (container) {
      container.style.display = select.value === 'selected' ? 'block' : 'none';
    }

    openModal('modal-rankings-visibility');
  }

  function toggleRankingsVisMemberList(val) {
    const container = document.getElementById('rankings-vis-members-container');
    if (container) {
      container.style.display = val === 'selected' ? 'block' : 'none';
    }
  }

  function handleSaveRankingsVisibility(e) {
    if (e) e.preventDefault();
    const idInput = document.getElementById('rankings-vis-project-id');
    const select = document.getElementById('rankings-vis-policy-select');
    if (!idInput || !select) return;

    const projectId = idInput.value;
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;

    if (!isProjectAdmin(project, state.currentUser) && !isProjectOwner(project, state.currentUser)) {
      showToast('Permission denied. Admin privilege required.', 'error');
      return;
    }

    const policy = select.value; // 'everyone' | 'admin' | 'selected'
    const viewers = [];
    if (policy === 'selected') {
      const cbs = document.querySelectorAll('.rankings-viewer-cb:checked');
      cbs.forEach(cb => viewers.push(cb.value));
    }

    project.rankingsVisibility = policy;
    project.rankingsViewers = viewers;

    if (!project.activity) project.activity = [];
    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: `${state.currentUser.name} updated Team Member Rankings visibility to ${formatVisibilityName(policy)}`,
      time: 'Just now',
      icon: 'settings'
    });

    saveState();
    syncProjectToFirestore(project);
    renderProjectOverview(project);
    closeModal('modal-rankings-visibility');
    showToast(`Rankings visibility updated to: ${formatVisibilityName(policy)}`, 'success');
  }

  function openAssignmentPolicyModal(projectId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    if (!isProjectAdmin(project, state.currentUser) && !isProjectOwner(project, state.currentUser)) {
      showToast('Only project admins and owners can change who can assign tasks.', 'error');
      return;
    }

    const modal = document.getElementById('modal-assignment-policy');
    const idInput = document.getElementById('assign-policy-project-id');
    const select = document.getElementById('assign-policy-select');
    const container = document.getElementById('assign-policy-members-container');
    const checklist = document.getElementById('assign-policy-members-checklist');

    if (!modal || !idInput || !select) return;

    idInput.value = project.id;
    select.value = project.taskAssignmentPolicy || 'anyone';

    const specialAssigners = Array.isArray(project.specialAssigners) ? project.specialAssigners : [];
    const members = Array.isArray(project.members) ? project.members : [];

    let listHtml = '';
    if (members.length === 0) {
      listHtml = '<p class="text-muted" style="padding: 8px; font-size: 0.85rem;">No members in this project yet.</p>';
    } else {
      members.forEach(m => {
        const isMemCreator = (project.creatorId === m.id) || (m.role === 'Owner') || (m.role === 'Project Lead');
        const isChecked = specialAssigners.includes(m.id) || isMemCreator;
        listHtml += `
          <label class="assigner-checkbox-item">
            <input type="checkbox" value="${escapeHtml(m.id)}" class="assign-policy-member-cb" ${isChecked ? 'checked' : ''} ${isMemCreator ? 'disabled' : ''}>
            <span>
              <strong>${escapeHtml(m.name)}</strong> (${escapeHtml(m.role || 'Member')})
              ${isMemCreator ? '<em style="color: var(--text-muted); font-size: 0.75rem; margin-left: 4px;">(Creator - Full Authority)</em>' : ''}
            </span>
          </label>
        `;
      });
    }
    if (checklist) checklist.innerHTML = listHtml;

    if (container) {
      container.style.display = select.value === 'specific_members' ? 'block' : 'none';
    }

    openModal('modal-assignment-policy');
  }

  function toggleAssignPolicyMemberList(val) {
    const container = document.getElementById('assign-policy-members-container');
    if (container) {
      container.style.display = val === 'specific_members' ? 'block' : 'none';
    }
  }

  function handleSaveAssignmentPolicy(e) {
    if (e) e.preventDefault();
    const idInput = document.getElementById('assign-policy-project-id');
    const select = document.getElementById('assign-policy-select');
    if (!idInput || !select) return;

    const projectId = idInput.value;
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;

    if (!isProjectAdmin(project, state.currentUser) && !isProjectOwner(project, state.currentUser)) {
      showToast('Permission denied. Admin privilege required.', 'error');
      return;
    }

    const policy = select.value; // 'anyone' | 'creator_admin' | 'specific_members'
    const assigners = [];
    if (policy === 'specific_members') {
      const cbs = document.querySelectorAll('.assign-policy-member-cb:checked');
      cbs.forEach(cb => assigners.push(cb.value));
    }

    project.taskAssignmentPolicy = policy;
    project.specialAssigners = assigners;

    if (!project.activity) project.activity = [];
    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: `${state.currentUser.name} updated task assignment permission to: ${formatPolicyName(policy)}`,
      time: 'Just now',
      icon: 'shield'
    });

    saveState();
    syncProjectToFirestore(project);
    renderProjectDetail(project);
    closeModal('modal-assignment-policy');
    showToast(`Task assignment permission updated to: ${formatPolicyName(policy)}`, 'success');
  }

  function openEditProjectDetailModal(projectId) {
    const targetId = projectId || state.activeProjectId;
    const project = state.projects.find(p => p.id === targetId);
    if (!project) return;

    if (!isProjectCreator(project, state.currentUser)) {
      showToast('Only the project creator can edit project details and permissions.', 'error');
      return;
    }

    const modal = document.getElementById('modal-edit-project-detail');
    const idInput = document.getElementById('edit-project-id');
    const nameInput = document.getElementById('edit-project-name');
    const groupInput = document.getElementById('edit-project-group');
    const descInput = document.getElementById('edit-project-desc');
    const startDateInput = document.getElementById('edit-project-start-date');
    const endDateInput = document.getElementById('edit-project-end-date');
    const assignSelect = document.getElementById('edit-project-assign-policy');
    const rankingsSelect = document.getElementById('edit-project-rankings-vis-select');

    if (!modal || !idInput || !nameInput || !descInput) return;

    idInput.value = project.id;
    nameInput.value = project.name || '';
    if (groupInput) groupInput.value = project.group || project.category || '';
    descInput.value = project.description || '';

    // Date fields (Start Date is locked/readonly, End Date is editable)
    if (startDateInput) {
      startDateInput.value = project.startDate || '';
    }
    if (endDateInput) {
      endDateInput.value = project.deadline || project.endDate || '';
      if (project.startDate) {
        endDateInput.min = project.startDate;
      }
    }

    // Assignment policy
    if (assignSelect) {
      assignSelect.value = project.taskAssignmentPolicy || 'anyone';
      toggleEditProjectAssignPolicy(assignSelect.value, project);
    }

    // Rankings visibility
    if (rankingsSelect) {
      rankingsSelect.value = project.rankingsVisibility || 'everyone';
      toggleEditProjectRankingsVis(rankingsSelect.value, project);
    }

    openModal('modal-edit-project-detail');
  }

  function toggleEditProjectAssignPolicy(val, proj) {
    const container = document.getElementById('edit-project-special-assigners-container');
    const list = document.getElementById('edit-project-special-assigners-list');
    if (!container) return;
    const isSpecific = val === 'specific_members';
    container.style.display = isSpecific ? 'block' : 'none';

    if (isSpecific && list) {
      const currentProject = proj || state.projects.find(p => p.id === state.activeProjectId);
      if (!currentProject) return;

      const members = (currentProject.members || []).filter(m => {
        const uid = m.id || m.userId;
        const creatorId = currentProject.creatorId;
        const isOwner = (m.role || '').toLowerCase() === 'owner' || (m.role || '').toLowerCase() === 'creator';
        return uid !== creatorId && !isOwner;
      });

      if (members.length === 0) {
        list.innerHTML = `
          <div style="padding: 10px; font-size: 0.82rem; color: var(--text-muted); text-align: center;">
            No other non-admin members found in this project. Invite members in the Team tab.
          </div>
        `;
        return;
      }

      const currentAssigners = new Set(currentProject.specialAssigners || []);
      let html = '';
      members.forEach(member => {
        const isChecked = currentAssigners.has(member.id || member.userId);
        html += `
          <label class="assigner-checkbox-item">
            <input type="checkbox" value="${member.id || member.userId}" class="edit-project-assigner-cb" ${isChecked ? 'checked' : ''}>
            <span><strong>${escapeHtml(member.name || member.email)}</strong> (${escapeHtml(member.role || 'Member')})</span>
          </label>
        `;
      });
      list.innerHTML = html;
    }
  }

  function toggleEditProjectRankingsVis(val, proj) {
    const container = document.getElementById('edit-project-rankings-viewers-container');
    const list = document.getElementById('edit-project-rankings-viewers-list');
    if (!container) return;
    const isSelected = val === 'selected';
    container.style.display = isSelected ? 'block' : 'none';

    if (isSelected && list) {
      const currentProject = proj || state.projects.find(p => p.id === state.activeProjectId);
      if (!currentProject) return;

      const members = (currentProject.members || []).filter(m => {
        const uid = m.id || m.userId;
        const creatorId = currentProject.creatorId;
        const isOwner = (m.role || '').toLowerCase() === 'owner' || (m.role || '').toLowerCase() === 'creator';
        return uid !== creatorId && !isOwner;
      });

      if (members.length === 0) {
        list.innerHTML = `
          <div style="padding: 10px; font-size: 0.82rem; color: var(--text-muted); text-align: center;">
            No other non-admin members found in this project. Invite members in the Team tab.
          </div>
        `;
        return;
      }

      const currentViewers = new Set(currentProject.rankingsViewers || []);
      let html = '';
      members.forEach(member => {
        const isChecked = currentViewers.has(member.id || member.userId);
        html += `
          <label class="assigner-checkbox-item">
            <input type="checkbox" value="${member.id || member.userId}" class="edit-project-rankings-viewer-cb" ${isChecked ? 'checked' : ''}>
            <span><strong>${escapeHtml(member.name || member.email)}</strong> (${escapeHtml(member.role || 'Member')})</span>
          </label>
        `;
      });
      list.innerHTML = html;
    }
  }

  function handleSaveProjectDetail(event) {
    if (event) event.preventDefault();

    const idInput = document.getElementById('edit-project-id');
    const nameInput = document.getElementById('edit-project-name');
    const groupInput = document.getElementById('edit-project-group');
    const descInput = document.getElementById('edit-project-desc');
    const endDateInput = document.getElementById('edit-project-end-date');
    const assignSelect = document.getElementById('edit-project-assign-policy');
    const rankingsSelect = document.getElementById('edit-project-rankings-vis-select');

    if (!idInput || !nameInput || !descInput) return;

    const projectId = idInput.value;
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;

    if (!isProjectCreator(project, state.currentUser)) {
      showToast('Permission denied. Only project creator can edit project details.', 'error');
      return;
    }

    const newName = nameInput.value.trim();
    const newGroup = (groupInput && groupInput.value.trim()) ? groupInput.value.trim() : (project.group || project.category || '');
    const newDesc = descInput.value.trim();
    const newEndDate = (endDateInput && endDateInput.value) ? endDateInput.value.trim() : (project.deadline || project.endDate || '');
    const newAssignPolicy = assignSelect ? assignSelect.value : (project.taskAssignmentPolicy || 'anyone');
    const newRankingsVis = rankingsSelect ? rankingsSelect.value : (project.rankingsVisibility || 'everyone');

    if (!newName) {
      showToast('Project name cannot be empty.', 'error');
      return;
    }

    if (!newEndDate) {
      showToast('Please specify an end date for the project.', 'error');
      return;
    }

    if (project.startDate && newEndDate && new Date(newEndDate) < new Date(project.startDate)) {
      showToast('End date cannot be earlier than project start date.', 'error');
      return;
    }

    // Collect special assigners if specific_members
    const newSpecialAssigners = [];
    if (newAssignPolicy === 'specific_members') {
      const cbs = document.querySelectorAll('.edit-project-assigner-cb:checked');
      cbs.forEach(cb => {
        newSpecialAssigners.push(cb.value);
      });
    }

    // Collect rankings viewers if selected
    const newRankingsViewers = [];
    if (newRankingsVis === 'selected') {
      const cbs = document.querySelectorAll('.edit-project-rankings-viewer-cb:checked');
      cbs.forEach(cb => {
        newRankingsViewers.push(cb.value);
      });
    }

    project.name = newName;
    project.group = newGroup;
    project.category = newGroup;
    project.description = newDesc;
    // project.startDate remains preserved and uneditable
    project.deadline = newEndDate;
    project.endDate = newEndDate;
    project.taskAssignmentPolicy = newAssignPolicy;
    project.specialAssigners = newSpecialAssigners;
    project.rankingsVisibility = newRankingsVis;
    project.rankingsViewers = newRankingsViewers;

    if (!project.activity) project.activity = [];
    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: `${state.currentUser.name} updated project details (Name, Category, Description, End Date, Assignment & Rankings settings)`,
      time: 'Just now',
      icon: 'settings'
    });

    saveState();
    syncProjectToFirestore(project);

    renderProjectDetail(project);
    closeModal('modal-edit-project-detail');
    showToast(`Project "${newName}" updated successfully!`, 'success');
  }

  function toggleCreateRankingsViewerField(val) {
    const container = document.getElementById('create-rankings-viewers-container');
    if (container) {
      container.style.display = (val === 'selected') ? 'block' : 'none';
    }
    if (val === 'selected') {
      renderCreateRankingsViewersList();
    }
  }

  function renderCreateRankingsViewersList() {
    const container = document.getElementById('create-project-rankings-viewers-list');
    if (!container) return;

    const actualCollaborators = getActualCollaborators();
    if (actualCollaborators.length === 0) {
      container.innerHTML = `
        <div style="padding: 12px; background: var(--bg-card); border-radius: 8px; border: 1px dashed var(--border-subtle); color: var(--text-muted); font-size: 0.85rem; text-align: center;">
          <div style="font-size: 1.2rem; margin-bottom: 4px;">👥</div>
          <strong>No previous collaborators found</strong><br>
          Once your project is created, configure authorized viewers anytime directly from the Rankings card.
        </div>
      `;
      return;
    }

    let html = '';
    actualCollaborators.forEach(collab => {
      html += `
        <label class="assigner-checkbox-item">
          <input type="checkbox" value="${collab.id}" class="create-rankings-viewer-cb">
          <span><strong>${escapeHtml(collab.name)}</strong> (${escapeHtml(collab.role || 'Member')})</span>
        </label>
      `;
    });
    container.innerHTML = html;
  }

  function renderProjectTasks(project) {
    const colPending = document.getElementById('cards-col-pending');
    const colProgress = document.getElementById('cards-col-in_progress');
    const colCompleted = document.getElementById('cards-col-completed');

    if (!colPending || !colProgress || !colCompleted) return;

    let tasks = project.tasks;
    if (state.projectTaskSearchQuery) {
      const q = state.projectTaskSearchQuery.toLowerCase();
      tasks = tasks.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }

    const pendingList = tasks.filter(t => t.status === 'pending');
    const progressList = tasks.filter(t => t.status === 'in_progress');
    const completedList = tasks.filter(t => t.status === 'completed');

    document.getElementById('count-col-pending').innerText = pendingList.length;
    document.getElementById('count-col-in_progress').innerText = progressList.length;
    document.getElementById('count-col-completed').innerText = completedList.length;

    colPending.innerHTML = renderTaskCards(pendingList, project.id);
    colProgress.innerHTML = renderTaskCards(progressList, project.id);
    colCompleted.innerHTML = renderTaskCards(completedList, project.id);
    updateTaskTabBadges(project);
  }

  function renderTaskCards(taskList, projectId) {
    if (taskList.length === 0) {
      return '<div class="empty-state" style="padding: 20px;"><p>No tasks</p></div>';
    }

    const project = state.projects.find(p => p.id === projectId);

    let html = '';
    taskList.forEach(t => {
      const priorityClass = (t.priority || 'medium').toLowerCase();
      const assigneeName = t.assigneeName || 'Unassigned';
      let assigneeAvatar = null;
      if (project && Array.isArray(project.members)) {
        const foundMem = project.members.find(m => 
          (t.assigneeId && m.id === t.assigneeId) ||
          (t.assigneeEmail && m.email && m.email.toLowerCase() === t.assigneeEmail.toLowerCase()) ||
          (m.name && m.name === assigneeName)
        );
        if (foundMem && foundMem.avatar) assigneeAvatar = foundMem.avatar;
      }
      if (!assigneeAvatar && t.assigneeAvatar) {
        assigneeAvatar = t.assigneeAvatar;
      }
      if (!assigneeAvatar && state.currentUser) {
        if ((t.assigneeId && state.currentUser.id === t.assigneeId) ||
            (t.assigneeEmail && state.currentUser.email && state.currentUser.email.toLowerCase() === t.assigneeEmail.toLowerCase())) {
          assigneeAvatar = state.currentUser.avatar;
        }
      }
      if (!assigneeAvatar) {
        assigneeAvatar = assigneeName ? assigneeName.split(' ').map(n => n[0]).join('').toUpperCase() : '--';
      }
      const canChangeStatus = project ? canUserChangeTaskStatus(project, t, state.currentUser) : true;
      const canDelete = project ? canUserDeleteTask(project, t, state.currentUser) : false;

      const subtasks = t.subtasks || [];
      const completedSubtasks = subtasks.filter(st => st.completed).length;
      const subtaskBadgeHtml = subtasks.length > 0 ? `
        <span class="badge-subtasks ${completedSubtasks === subtasks.length ? 'completed' : ''}" title="${completedSubtasks} of ${subtasks.length} subtasks completed">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          <span>${completedSubtasks}/${subtasks.length}</span>
        </span>
      ` : '';

      const comments = t.comments || [];
      const commentsBadgeHtml = comments.length > 0 ? `
        <span class="badge-comments" title="${comments.length} updates & comments">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>${comments.length}</span>
        </span>
      ` : '';

      html += `
        <div class="kanban-card">
          <div class="kanban-card-top">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="badge-priority ${priorityClass}">${escapeHtml(t.priority)}</span>
              ${canDelete ? `
                <button type="button" class="btn-card-delete-task" onclick="event.stopPropagation(); window.App.confirmDeleteTask('${projectId}', '${t.id}');" title="Delete Task (Admin or Creator)">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  <span>Delete</span>
                </button>
              ` : `
                <button type="button" class="btn-card-delete-task btn-card-delete-locked" onclick="event.stopPropagation(); window.App.showTaskDeletePermissionWarning();" title="🔒 Only Project Admins/Owners and the Task Creator can delete this deliverable">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </button>
              `}
            </div>
            <div class="task-dates-group" style="display: flex; flex-direction: column; align-items: flex-end; gap: 2px;">
              <span class="task-due-date" style="font-size: 0.72rem;">${t.status === 'completed' ? 'Due: ' : ''}${escapeHtml(formatDate(t.dueDate))}</span>
              ${t.status === 'completed' ? `
                <span class="task-completed-badge" style="font-size: 0.72rem; color: var(--success, #10b981); font-weight: 600; display: inline-flex; align-items: center; gap: 3px;" title="Completed on ${escapeHtml(formatDate(t.completedDate || t.dueDate))}">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Done: ${escapeHtml(formatDate(t.completedDate || t.dueDate))}</span>
                </span>
              ` : ''}
            </div>
          </div>
          <h4 class="kanban-card-title" onclick="window.App.openTaskDetailModal('${projectId}', '${t.id}')" style="cursor: pointer;" title="Click to view details, subtasks & comments">${escapeHtml(t.title)}</h4>
          ${t.description ? `<p class="kanban-card-desc">${escapeHtml(t.description)}</p>` : ''}
          
          <div class="task-card-indicators" onclick="window.App.openTaskDetailModal('${projectId}', '${t.id}')" style="cursor: pointer;">
            ${subtaskBadgeHtml}
            ${commentsBadgeHtml}
            <button class="btn-open-task-detail" onclick="event.stopPropagation(); window.App.openTaskDetailModal('${projectId}', '${t.id}')">
              <span>Subtasks & Comments</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>

          <div class="kanban-card-footer">
            <div class="card-assignee" title="Assigned to ${escapeHtml(assigneeName)}">
              <div class="card-assignee-avatar">${renderAvatarInnerHtml(assigneeAvatar, assigneeName)}</div>
              <span class="card-assignee-name">${escapeHtml(assigneeName)}</span>
            </div>
            ${canChangeStatus ? `
              <select class="card-status-select" onchange="window.App.changeTaskStatus('${projectId}', '${t.id}', this.value)" title="Change task status">
                <option value="pending" ${t.status === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="in_progress" ${t.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
                <option value="completed" ${t.status === 'completed' ? 'selected' : ''}>Completed</option>
              </select>
            ` : `
              <select class="card-status-select card-status-locked" disabled title="Status can only be changed by ${escapeHtml(assigneeName)} or authorized project assigners">
                <option value="pending" ${t.status === 'pending' ? 'selected' : ''}>Pending 🔒</option>
                <option value="in_progress" ${t.status === 'in_progress' ? 'selected' : ''}>In Progress 🔒</option>
                <option value="completed" ${t.status === 'completed' ? 'selected' : ''}>Completed 🔒</option>
              </select>
            `}
          </div>
        </div>
      `;
    });
    return html;
  }

  function filterProjectTasks(query) {
    state.projectTaskSearchQuery = query;
    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (project) renderProjectTasks(project);
  }

  function filterProjectTasksByStatus(status, btn) {
    state.projectTaskFilter = status;
    const pills = document.querySelectorAll('#task-status-filters .filter-pill');
    pills.forEach(p => p.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const colPending = document.getElementById('kanban-col-pending');
    const colProgress = document.getElementById('kanban-col-in_progress');
    const colCompleted = document.getElementById('kanban-col-completed');

    if (status === 'all') {
      colPending.style.display = 'block';
      colProgress.style.display = 'block';
      colCompleted.style.display = 'block';
    } else {
      colPending.style.display = status === 'pending' ? 'block' : 'none';
      colProgress.style.display = status === 'in_progress' ? 'block' : 'none';
      colCompleted.style.display = status === 'completed' ? 'block' : 'none';
    }
  }

  // =========================================================
  // 8B. MY TASKS CONTROLLER (Assigned to Me in this Project)
  // =========================================================
  function renderMyProjectTasks(project) {
    const colPending = document.getElementById('cards-col-my-pending');
    const colProgress = document.getElementById('cards-col-my-in_progress');
    const colCompleted = document.getElementById('cards-col-my-completed');

    if (!colPending || !colProgress || !colCompleted) return;

    // Filter tasks strictly assigned to current user for this project
    let tasks = project.tasks.filter(t => isTaskAssignedToUser(t, state.currentUser));

    if (state.myProjectTaskSearchQuery) {
      const q = state.myProjectTaskSearchQuery.toLowerCase();
      tasks = tasks.filter(t => t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q)));
    }

    const pendingList = tasks.filter(t => t.status === 'pending');
    const progressList = tasks.filter(t => t.status === 'in_progress');
    const completedList = tasks.filter(t => t.status === 'completed');

    document.getElementById('count-col-my-pending').innerText = pendingList.length;
    document.getElementById('count-col-my-in_progress').innerText = progressList.length;
    document.getElementById('count-col-my-completed').innerText = completedList.length;

    colPending.innerHTML = renderTaskCards(pendingList, project.id);
    colProgress.innerHTML = renderTaskCards(progressList, project.id);
    colCompleted.innerHTML = renderTaskCards(completedList, project.id);
    updateTaskTabBadges(project);
  }

  function filterMyProjectTasks(query) {
    state.myProjectTaskSearchQuery = query;
    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (project) renderMyProjectTasks(project);
  }

  function filterMyTasksByStatus(status, btn) {
    state.myProjectTaskFilter = status;
    const pills = document.querySelectorAll('#mytasks-status-filters .filter-pill');
    pills.forEach(p => p.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const colPending = document.getElementById('kanban-col-my-pending');
    const colProgress = document.getElementById('kanban-col-my-in_progress');
    const colCompleted = document.getElementById('kanban-col-my-completed');

    if (status === 'all') {
      colPending.style.display = 'block';
      colProgress.style.display = 'block';
      colCompleted.style.display = 'block';
    } else {
      colPending.style.display = status === 'pending' ? 'block' : 'none';
      colProgress.style.display = status === 'in_progress' ? 'block' : 'none';
      colCompleted.style.display = status === 'completed' ? 'block' : 'none';
    }
  }

  function toggleTaskComplete(projectId, taskId, isChecked) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    const task = project.tasks.find(t => t.id === taskId);
    if (!task) return;

    if (!canUserChangeTaskStatus(project, task, state.currentUser)) {
      showToast('Permission denied: Only the assigned member or an authorized assigner can change task status.', 'error');
      renderHome();
      if (state.activeProjectId === projectId) {
        renderProjectDetail(project);
      }
      return;
    }

    task.status = isChecked ? 'completed' : 'pending';
    task.completed = Boolean(isChecked);
    if (isChecked) {
      if (!task.completedDate) {
        task.completedDate = new Date().toISOString().split('T')[0];
      }
    } else {
      task.completedDate = null;
    }
    saveState();
    syncProjectToFirestore(project);
    renderHome();
    if (state.activeProjectId === projectId) {
      renderProjectDetail(project);
    }
    showToast(isChecked ? 'Task marked as completed! 🎉' : 'Task restored to pending.', 'info');
  }

  function changeTaskStatus(projectId, taskId, newStatus) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    const task = project.tasks.find(t => t.id === taskId);
    if (!task) return;

    if (!canUserChangeTaskStatus(project, task, state.currentUser)) {
      showToast('Permission denied: Only the assigned member or an authorized assigner can change task status.', 'error');
      if (state.activeProjectId === projectId) {
        renderProjectTasks(project);
        renderMyProjectTasks(project);
      }
      if (state.activeDetailTaskId === taskId) {
        const statusSelect = document.getElementById('task-detail-status-select');
        if (statusSelect) statusSelect.value = task.status;
      }
      return;
    }

    task.status = newStatus;
    task.completed = (newStatus === 'completed');
    if (newStatus === 'completed') {
      if (!task.completedDate) {
        task.completedDate = new Date().toISOString().split('T')[0];
      }
    } else {
      task.completedDate = null;
    }

    // Add activity
    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: newStatus === 'completed'
        ? `${state.currentUser.name} completed "${task.title}" on ${formatDate(task.completedDate)}`
        : `${state.currentUser.name} moved "${task.title}" to ${newStatus.replace('_', ' ')}`,
      time: 'Just now',
      icon: 'task'
    });

    saveState();
    syncProjectToFirestore(project);
    renderProjectDetail(project);

    // If detail modal is open for this task, update completed date element
    if (state.activeDetailTaskId === taskId) {
      const completedContainer = document.getElementById('task-detail-completed-date-container');
      const completedDateEl = document.getElementById('task-detail-completed-date');
      if (newStatus === 'completed') {
        if (completedContainer) completedContainer.style.display = 'flex';
        if (completedDateEl) completedDateEl.innerText = formatDate(task.completedDate);
      } else {
        if (completedContainer) completedContainer.style.display = 'none';
      }
    }

    showToast(`Task status updated to ${newStatus.replace('_', ' ')}`, 'success');
  }

  // =========================================================
  // 8C. TASK DETAILS, SUBTASKS CHECKLIST & ASSIGNEE-ONLY COMMENTS
  // =========================================================

  function isTaskAssignee(task, user) {
    if (!task || !user) return false;
    const userId = user.id || user.uid;
    const userEmail = ((user.identities && user.identities.email) || user.email || '').trim().toLowerCase();
    const userName = (user.name || '').trim().toLowerCase();

    if (task.assigneeId && userId && task.assigneeId === userId) return true;
    if (task.assigneeEmail && userEmail && task.assigneeEmail.trim().toLowerCase() === userEmail) return true;
    if (task.assigneeName && userName && task.assigneeName.trim().toLowerCase() === userName) return true;
    return false;
  }

  function openTaskDetailModal(projectId, taskId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    const task = (project.tasks || []).find(t => t.id === taskId);
    if (!task) return;

    state.activeDetailProjectId = projectId;
    state.activeDetailTaskId = taskId;

    // Normalize task subtasks and comments if needed
    if (!task.subtasks) task.subtasks = [];
    if (!task.comments) task.comments = [];

    // Header fields
    const titleEl = document.getElementById('task-detail-title');
    const priorityBadge = document.getElementById('task-detail-priority-badge');
    const projectTag = document.getElementById('task-detail-project-tag');
    const statusSelect = document.getElementById('task-detail-status-select');
    const dueDateEl = document.getElementById('task-detail-due-date');
    const descEl = document.getElementById('task-detail-description');
    const avatarEl = document.getElementById('task-detail-assignee-avatar');
    const nameEl = document.getElementById('task-detail-assignee-name');

    if (titleEl) titleEl.innerText = task.title;
    if (priorityBadge) {
      priorityBadge.innerText = task.priority;
      priorityBadge.className = `badge-priority ${(task.priority || 'medium').toLowerCase()}`;
    }
    if (projectTag) projectTag.innerText = project.name;
    const canChangeStatus = canUserChangeTaskStatus(project, task, state.currentUser);
    const statusLockedHint = document.getElementById('task-detail-status-locked-hint');
    if (statusSelect) {
      statusSelect.value = task.status;
      statusSelect.disabled = !canChangeStatus;
      if (!canChangeStatus) {
        statusSelect.classList.add('status-select-locked');
        statusSelect.title = "Status can only be changed by the assigned member or an authorized assigner";
      } else {
        statusSelect.classList.remove('status-select-locked');
        statusSelect.title = "Change task status";
      }
    }
    if (statusLockedHint) {
      statusLockedHint.style.display = canChangeStatus ? 'none' : 'block';
    }
    if (dueDateEl) dueDateEl.innerText = formatDate(task.dueDate);
    if (descEl) descEl.innerText = task.description || 'No additional description provided.';

    const completedContainer = document.getElementById('task-detail-completed-date-container');
    const completedDateEl = document.getElementById('task-detail-completed-date');
    if (task.status === 'completed') {
      if (completedContainer) completedContainer.style.display = 'flex';
      if (completedDateEl) completedDateEl.innerText = formatDate(task.completedDate || task.dueDate || new Date().toISOString().split('T')[0]);
    } else {
      if (completedContainer) completedContainer.style.display = 'none';
    }

    const assigneeName = task.assigneeName || 'Unassigned';
    let assigneeAvatar = null;
    if (project && Array.isArray(project.members)) {
      const foundMem = project.members.find(m => 
        (task.assigneeId && m.id === task.assigneeId) ||
        (task.assigneeEmail && m.email && m.email.toLowerCase() === task.assigneeEmail.toLowerCase()) ||
        (m.name && m.name === assigneeName)
      );
      if (foundMem && foundMem.avatar) assigneeAvatar = foundMem.avatar;
    }
    if (!assigneeAvatar && task.assigneeAvatar) {
      assigneeAvatar = task.assigneeAvatar;
    }
    if (!assigneeAvatar && state.currentUser && isTaskAssignedToUser(task, state.currentUser)) {
      assigneeAvatar = state.currentUser.avatar;
    }
    const defaultInitials = assigneeName ? assigneeName.split(' ').map(n => n[0]).join('').toUpperCase() : '--';
    if (nameEl) nameEl.innerText = assigneeName;
    if (avatarEl) setAvatarElementContent(avatarEl, assigneeAvatar, defaultInitials);

    // Assignee actions (Self-assignment & reassignment)
    const assigneeActionsEl = document.getElementById('task-detail-assignee-actions');
    if (assigneeActionsEl) {
      const isAssignedToMe = isTaskAssignedToUser(task, state.currentUser);
      const canAssignOthers = canUserAssignOthers(project, state.currentUser);
      let actionsHtml = '';

      if (isAssignedToMe) {
        actionsHtml += `
          <span class="badge-assigned-self" title="This deliverable is assigned to you">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Assigned to You</span>
          </span>
        `;
      } else {
        // Universal rule: Any member can ALWAYS assign the task to themselves!
        actionsHtml += `
          <button type="button" class="btn-assign-self" onclick="window.App.assignTaskToMyself('${project.id}', '${task.id}')" title="Assign this task to yourself">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>🙋 Assign to Me</span>
          </button>
        `;
      }

      // If user has authority to assign others, provide a quick reassign dropdown
      if (canAssignOthers && Array.isArray(project.members) && project.members.length > 0) {
        actionsHtml += `
          <select class="task-detail-reassign-select" onchange="if(this.value) window.App.reassignTask('${project.id}', '${task.id}', this.value)" title="Reassign task to a team member">
            <option value="">Reassign to...</option>
        `;
        project.members.forEach(m => {
          const isSelected = (m.id === task.assigneeId);
          actionsHtml += `<option value="${m.id}" ${isSelected ? 'disabled' : ''}>${escapeHtml(m.name)} (${escapeHtml(m.role)})${isSelected ? ' [Current]' : ''}</option>`;
        });
        actionsHtml += `</select>`;
      }

      assigneeActionsEl.innerHTML = actionsHtml;
    }

    // Render subtasks
    renderTaskSubtasks(project, task);

    // Render comments
    renderTaskComments(project, task);

    // Set dataset on modal element for instant fallback retrieval
    const modalEl = document.getElementById('modal-task-detail');
    if (modalEl) {
      modalEl.dataset.projectId = project.id;
      modalEl.dataset.taskId = task.id;
    }

    // Render Creator Name
    const creatorEl = document.getElementById('task-detail-creator-name');
    if (creatorEl) {
      creatorEl.innerText = task.creatorName || (task.creatorEmail ? task.creatorEmail.split('@')[0] : 'Project Lead');
    }

    // Render delete button in both header and footer
    const canDelete = canUserDeleteTask(project, task, state.currentUser);
    const headerDeleteContainer = document.getElementById('task-detail-header-delete-container');
    const footerDeleteContainer = document.getElementById('task-detail-delete-container');

    const deleteBtnHtml = canDelete ? `
      <button type="button" class="btn-delete-task" onclick="window.App.confirmDeleteTask('${escapeHtml(project.id)}', '${escapeHtml(task.id)}');" title="Permanently delete this task and update team scores">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        <span>Delete Task</span>
      </button>
    ` : `
      <button type="button" class="btn-delete-task btn-delete-task-disabled" onclick="window.App.showTaskDeletePermissionWarning();" title="🔒 Only Project Admins/Owners and the Task Creator can delete this deliverable">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <span>Delete Task 🔒</span>
      </button>
    `;

    if (headerDeleteContainer) headerDeleteContainer.innerHTML = deleteBtnHtml;
    if (footerDeleteContainer) footerDeleteContainer.innerHTML = deleteBtnHtml;

    openModal('modal-task-detail');
  }

  function assignTaskToMyself(projectId, taskId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    const task = (project.tasks || []).find(t => t.id === taskId);
    if (!task) return;

    const selfMember = getProjectMemberForUser(project, state.currentUser) || state.currentUser;
    const oldAssigneeName = task.assigneeName || 'Unassigned';

    task.assigneeId = selfMember.id || state.currentUser.id;
    task.assigneeName = selfMember.name || state.currentUser.name;
    task.assigneeEmail = selfMember.email || getCurrentUserEmail(state.currentUser) || '';
    task.assigneeAvatar = selfMember.avatar || state.currentUser.avatar || '';

    // Activity feed
    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: `${state.currentUser.name} assigned task "${task.title}" to himself/herself (previously ${oldAssigneeName})`,
      time: 'Just now',
      icon: 'task'
    });

    saveState();
    syncProjectToFirestore(project);

    // Refresh detail modal if open
    openTaskDetailModal(projectId, taskId);

    // Refresh task boards & badges
    renderProjectTasks(project);
    renderMyProjectTasks(project);
    updateTaskTabBadges(project);

    showToast(`Task "${task.title}" assigned to you!`, 'success');
  }

  function reassignTask(projectId, taskId, newAssigneeId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    const task = (project.tasks || []).find(t => t.id === taskId);
    if (!task) return;

    if (!canUserAssignOthers(project, state.currentUser)) {
      showToast('You do not have permission to reassign tasks to other members.', 'error');
      return;
    }

    const newMember = (project.members || []).find(m => m.id === newAssigneeId);
    if (!newMember) return;

    const oldAssigneeName = task.assigneeName || 'Unassigned';
    task.assigneeId = newMember.id;
    task.assigneeName = newMember.name;
    task.assigneeEmail = newMember.email || '';
    task.assigneeAvatar = newMember.avatar || '';

    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: `${state.currentUser.name} reassigned task "${task.title}" to ${newMember.name} (previously ${oldAssigneeName})`,
      time: 'Just now',
      icon: 'task'
    });

    notifyTaskAssigned(project, task, newMember);

    saveState();
    syncProjectToFirestore(project);

    openTaskDetailModal(projectId, taskId);
    renderProjectTasks(project);
    renderMyProjectTasks(project);
    updateTaskTabBadges(project);

    showToast(`Task reassigned to ${newMember.name}!`, 'success');
  }

  // =========================================================
  // TASK DELETION & SCORE IMPACT PERMISSION CONTROLS
  // =========================================================
  function canUserDeleteTask(project, task, user) {
    if (!project || !task || !user) return false;

    // 1. Check if user is Project Admin, Project Owner, or Project Creator
    if (isProjectAdmin(project, user) || isProjectOwner(project, user) || isProjectCreator(project, user)) {
      return true;
    }

    // 2. Check if user is the Creator of the task
    const userId = user.id || user.uid;
    const userEmail = getCurrentUserEmail(user);
    const userName = (user.name || '').trim().toLowerCase();
    const member = getProjectMemberForUser(project, user);
    const memberId = member ? member.id : null;

    if (task.creatorId && ((userId && String(task.creatorId) === String(userId)) || (memberId && String(task.creatorId) === String(memberId)))) {
      return true;
    }
    if (task.createdBy && ((userId && String(task.createdBy) === String(userId)) || (memberId && String(task.createdBy) === String(memberId)))) {
      return true;
    }
    if (task.creatorEmail && userEmail && task.creatorEmail.trim().toLowerCase() === userEmail.trim().toLowerCase()) {
      return true;
    }
    if (task.creatorName && userName && task.creatorName.trim().toLowerCase() === userName) {
      return true;
    }

    // 3. Fallback for legacy tasks with no creator recorded: allow Admin/Owner/Lead
    if (!task.creatorId && !task.createdBy && !task.creatorEmail && !task.creatorName) {
      if (isProjectAdmin(project, user) || isProjectOwner(project, user) || isProjectCreator(project, user)) {
        return true;
      }
    }

    return false;
  }

  function deleteCurrentOpenTask() {
    const modalEl = document.getElementById('modal-task-detail');
    const projectId = modalEl ? modalEl.dataset.projectId : null;
    const taskId = modalEl ? modalEl.dataset.taskId : null;
    if (projectId && taskId) {
      confirmDeleteTask(projectId, taskId);
    } else if (state.activeProjectId) {
      const proj = state.projects.find(p => p.id === state.activeProjectId);
      if (proj && proj.tasks && proj.tasks.length > 0) {
        confirmDeleteTask(proj.id, proj.tasks[0].id);
      }
    }
  }

  function showTaskDeletePermissionWarning() {
    showToast('🔒 Task deletion restricted: Only Project Admins/Owners and the Task Creator have permission to delete this deliverable.', 'warning');
  }

  let pendingDeleteTaskContext = null;

  function confirmDeleteTask(projectId, taskId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    const task = (project.tasks || []).find(t => t.id === taskId);
    if (!task) return;

    if (!canUserDeleteTask(project, task, state.currentUser)) {
      showToast('You do not have permission to delete this task. Only Admins and the Task Creator can delete it.', 'error');
      return;
    }

    pendingDeleteTaskContext = { projectId, taskId, taskTitle: task.title };

    const titleEl = document.getElementById('delete-task-title-display');
    if (titleEl) {
      titleEl.innerText = `"${task.title}"`;
    }

    openModal('modal-delete-task');
  }

  function executeDeleteTask() {
    if (!pendingDeleteTaskContext) return;
    const { projectId, taskId } = pendingDeleteTaskContext;
    pendingDeleteTaskContext = null;
    closeModal('modal-delete-task');
    deleteTask(projectId, taskId);
  }

  function deleteTask(projectId, taskId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;

    const taskIndex = (project.tasks || []).findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const task = project.tasks[taskIndex];

    if (!canUserDeleteTask(project, task, state.currentUser)) {
      showToast('You do not have permission to delete this task. Only Admins and the Task Creator can delete it.', 'error');
      return;
    }

    const taskTitle = task.title || 'Untitled';
    project.tasks.splice(taskIndex, 1);

    // Audit log in activity feed
    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: `${state.currentUser.name} deleted task "${taskTitle}" (Leaderboard scores & progress recalculated)`,
      time: 'Just now',
      icon: 'task'
    });

    saveState();
    syncProjectToFirestore(project);

    // Close task detail modal if open
    closeModal('modal-task-detail');

    // Re-render project detail and home views
    if (state.activeProjectId === projectId) {
      renderProjectDetail(project);
    }
    renderHome();

    showToast(`Task "${taskTitle}" deleted. Team scores and analytics updated.`, 'success');
  }

  function renderTaskSubtasks(project, task) {
    const listContainer = document.getElementById('task-subtasks-list');
    const progressLabel = document.getElementById('subtasks-progress-label');
    const progressFill = document.getElementById('subtask-progress-fill');
    if (!listContainer) return;

    if (!task.subtasks) task.subtasks = [];
    const total = task.subtasks.length;
    const completed = task.subtasks.filter(st => st.completed).length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

    if (progressLabel) progressLabel.innerText = `${completed}/${total} Completed (${pct}%)`;
    if (progressFill) progressFill.style.width = `${pct}%`;

    if (total === 0) {
      listContainer.innerHTML = `
        <div style="padding: 12px; text-align: center; color: var(--text-muted); font-size: 0.82rem; background: var(--bg-subtle); border-radius: var(--radius-sm);">
          No subtasks yet. Add checklists below to track deliverables.
        </div>
      `;
      return;
    }

    let html = '';
    task.subtasks.forEach(st => {
      html += `
        <div class="subtask-item">
          <label class="subtask-left" style="margin: 0; cursor: pointer;">
            <input type="checkbox" class="subtask-checkbox" ${st.completed ? 'checked' : ''}
                   onchange="window.App.toggleSubtask('${project.id}', '${task.id}', '${st.id}', this.checked)">
            <span class="subtask-title ${st.completed ? 'completed' : ''}">${escapeHtml(st.title)}</span>
          </label>
          <button type="button" class="btn-delete-subtask" onclick="window.App.handleDeleteSubtask('${project.id}', '${task.id}', '${st.id}')" title="Delete subtask">✕</button>
        </div>
      `;
    });
    listContainer.innerHTML = html;
  }

  function renderTaskComments(project, task) {
    const listContainer = document.getElementById('task-comments-list');
    const formContainer = document.getElementById('task-comment-form-container');
    const lockedAlert = document.getElementById('task-comment-locked-alert');
    const lockedMessage = document.getElementById('task-comment-locked-message');
    const activeBadge = document.getElementById('comment-active-assignee-badge');

    if (!listContainer) return;

    if (!task.comments) task.comments = [];

    // Render list of comments
    if (task.comments.length === 0) {
      listContainer.innerHTML = `
        <div class="task-comment-empty">
          No comments or updates yet on this task.
        </div>
      `;
    } else {
      let html = '';
      task.comments.forEach(c => {
        html += `
          <div class="task-comment-card">
            <div class="task-comment-avatar">${renderAvatarInnerHtml(c.authorAvatar || 'U', c.authorName)}</div>
            <div class="task-comment-content">
              <div class="task-comment-header">
                <span class="task-comment-author">${escapeHtml(c.authorName)}</span>
                <span class="task-comment-time">${timeAgo(c.timestamp)}</span>
              </div>
              <p class="task-comment-text">${escapeHtml(c.text)}</p>
            </div>
          </div>
        `;
      });
      listContainer.innerHTML = html;
      listContainer.scrollTop = listContainer.scrollHeight;
    }

    // Assignee check
    const isAssignee = isTaskAssignee(task, state.currentUser);
    const assigneeName = task.assigneeName || 'the assigned member';

    if (isAssignee) {
      if (formContainer) formContainer.style.display = 'block';
      if (lockedAlert) lockedAlert.style.display = 'none';
      if (activeBadge) activeBadge.innerText = `✍️ Commenting as Assigned Member (${state.currentUser ? state.currentUser.name : ''})`;
    } else {
      if (formContainer) formContainer.style.display = 'none';
      if (lockedAlert) {
        lockedAlert.style.display = 'flex';
        if (lockedMessage) {
          lockedMessage.innerText = `Only the assigned member (${assigneeName}) can post comments on this task. Other members can view comments in read-only mode.`;
        }
      }
    }
  }

  function handleDetailStatusChange(newStatus) {
    if (!state.activeDetailProjectId || !state.activeDetailTaskId) return;
    changeTaskStatus(state.activeDetailProjectId, state.activeDetailTaskId, newStatus);
  }

  function toggleSubtask(projectId, taskId, subtaskId, isChecked) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    const task = (project.tasks || []).find(t => t.id === taskId);
    if (!task || !task.subtasks) return;

    const subtask = task.subtasks.find(st => st.id === subtaskId);
    if (!subtask) return;

    subtask.completed = Boolean(isChecked);
    saveState();
    syncProjectToFirestore(project);

    if (state.activeDetailTaskId === taskId) {
      renderTaskSubtasks(project, task);
    }
    if (state.activeProjectId === projectId) {
      renderProjectTasks(project);
      renderMyProjectTasks(project);
      renderProjectOverview(project);
    }
  }

  function handleAddSubtaskSubmit() {
    if (!state.activeDetailProjectId || !state.activeDetailTaskId) return;
    const project = state.projects.find(p => p.id === state.activeDetailProjectId);
    if (!project) return;
    const task = (project.tasks || []).find(t => t.id === state.activeDetailTaskId);
    if (!task) return;

    const input = document.getElementById('input-new-subtask');
    if (!input) return;
    const title = input.value.trim();
    if (!title) return;

    if (!task.subtasks) task.subtasks = [];
    task.subtasks.push({
      id: 'st-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      title: title,
      completed: false
    });

    input.value = '';
    saveState();
    syncProjectToFirestore(project);

    renderTaskSubtasks(project, task);
    if (state.activeProjectId === project.id) {
      renderProjectTasks(project);
      renderMyProjectTasks(project);
    }
    showToast('Subtask added!', 'success');
  }

  function handleDeleteSubtask(projectId, taskId, subtaskId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;
    const task = (project.tasks || []).find(t => t.id === taskId);
    if (!task || !task.subtasks) return;

    task.subtasks = task.subtasks.filter(st => st.id !== subtaskId);
    saveState();
    syncProjectToFirestore(project);

    if (state.activeDetailTaskId === taskId) {
      renderTaskSubtasks(project, task);
    }
    if (state.activeProjectId === projectId) {
      renderProjectTasks(project);
      renderMyProjectTasks(project);
    }
  }

  function handleAddTaskCommentSubmit() {
    if (!state.activeDetailProjectId || !state.activeDetailTaskId) return;
    const project = state.projects.find(p => p.id === state.activeDetailProjectId);
    if (!project) return;
    const task = (project.tasks || []).find(t => t.id === state.activeDetailTaskId);
    if (!task) return;

    // Strict assignee-only permission guard
    if (!isTaskAssignee(task, state.currentUser)) {
      showToast(`Only the assigned member (${task.assigneeName}) can post comments on this task.`, 'error');
      return;
    }

    const input = document.getElementById('task-comment-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) {
      showToast('Please enter a comment before posting.', 'error');
      return;
    }

    if (!task.comments) task.comments = [];
    const newComment = {
      id: 'cmt-' + Date.now(),
      authorId: state.currentUser.id || state.currentUser.uid,
      authorName: state.currentUser.name,
      authorAvatar: state.currentUser.avatar || (state.currentUser.name ? state.currentUser.name.substring(0, 2).toUpperCase() : 'U'),
      text: text,
      timestamp: new Date().toISOString()
    };
    task.comments.push(newComment);

    // Notify project creator if different from commenter
    if (project.creatorId && project.creatorId !== state.currentUser.id) {
      createNotification({
        type: 'task_comment',
        recipientId: project.creatorId,
        projectId: project.id,
        taskId: task.id,
        message: `💬 ${state.currentUser.name} commented on "${task.title}": "${text.slice(0, 50)}${text.length > 50 ? '…' : ''}"`
      });
    }

    // Add activity log
    if (!project.activity) project.activity = [];
    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: `${state.currentUser.name} commented on "${task.title}"`,
      time: 'Just now',
      icon: 'chat'
    });

    input.value = '';
    saveState();
    syncProjectToFirestore(project);

    renderTaskComments(project, task);
    if (state.activeProjectId === project.id) {
      renderProjectTasks(project);
      renderMyProjectTasks(project);
      renderProjectOverview(project);
    }
    showToast('Comment posted successfully!', 'success');
  }

  // =========================================================
  // 9. CHAT SYSTEM
  // =========================================================
  function renderProjectChats(project) {
    const container = document.getElementById('chat-messages-container');
    const channelTitle = document.getElementById('chat-channel-title');
    const membersSubtitle = document.getElementById('chat-members-subtitle');

    if (channelTitle) {
      channelTitle.innerText = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-general';
    }
    if (membersSubtitle) {
      membersSubtitle.innerText = `${project.members.length} members participating`;
    }

    markProjectChatsAsSeen(project.id);

    if (!container) return;
    if (!project.chats) project.chats = [];

    if (project.chats.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h4>No messages yet</h4>
          <p>Start the conversation with your team!</p>
        </div>
      `;
      return;
    }

    let html = '';
    project.chats.forEach(msg => {
      const isOwn = msg.senderId === state.currentUser.id;
      html += `
        <div class="chat-message-item ${isOwn ? 'own' : ''}">
          <div class="chat-avatar" title="${escapeHtml(msg.senderName)}">${renderAvatarInnerHtml(msg.senderAvatar, msg.senderName)}</div>
          <div class="chat-body">
            <div class="chat-sender-info">
              <span class="chat-sender-name">${escapeHtml(msg.senderName)}</span>
              <span class="chat-timestamp">${escapeHtml(msg.timestamp)}</span>
            </div>
            <div class="chat-bubble">${formatChatMentions(escapeHtml(msg.text))}</div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    scrollChatToBottom();
  }

  // =========================================================
  // CHAT @MENTION AUTOCOMPLETE ENGINE
  // =========================================================
  const mentionState = {
    open: false,
    query: '',
    atIndex: 0,
    cursor: 0,
    items: [],
    selectedIndex: 0
  };

  function formatChatMentions(escapedText) {
    if (!escapedText) return '';
    // Format @all
    let formatted = escapedText.replace(/@all\b/gi, '<span class="chat-mention-pill chat-mention-all">@all</span>');
    // Format @[Name]
    formatted = formatted.replace(/@([A-Za-z0-9_\.\-]+(?:\s[A-Za-z0-9_\.\-]+)?)/g, (match, name) => {
      if (name.toLowerCase() === 'all') return match;
      return `<span class="chat-mention-pill">@${name}</span>`;
    });
    return formatted;
  }

  function checkMentionAutocomplete() {
    const input = document.getElementById('chat-message-input');
    const popup = document.getElementById('chat-mention-popup');
    if (!input || !popup) return;

    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project) {
      hideMentionPopup();
      return;
    }

    const cursor = (input.selectionStart != null) ? input.selectionStart : input.value.length;
    const textBeforeCursor = input.value.slice(0, cursor);

    // Look for @ preceded by start of string or whitespace, followed by word chars right before cursor
    const match = textBeforeCursor.match(/(?:^|\s)@([a-zA-Z0-9_\.\-]*)$/);
    if (!match) {
      hideMentionPopup();
      return;
    }

    const query = match[1].toLowerCase();
    // Start index of '@'
    const atIndex = match.index + (match[0].startsWith(' ') ? 1 : 0);

    const items = [];

    // 1. @all option
    if (!query || 'all'.includes(query) || 'everyone'.includes(query)) {
      items.push({
        type: 'all',
        mentionValue: 'all',
        displayName: '@all',
        badge: 'Everyone',
        sub: `Notify all project members (${(project.members || []).length})`,
        avatar: '📢'
      });
    }

    // 2. Project Members
    const members = project.members || [];
    members.forEach(m => {
      const name = m.name || 'Team Member';
      const email = m.email || '';
      const isYou = (m.id && state.currentUser.id && m.id === state.currentUser.id) ||
                    (m.email && state.currentUser.email && m.email.toLowerCase() === state.currentUser.email.toLowerCase());

      const nameLower = name.toLowerCase();
      const emailLower = email.toLowerCase();

      if (!query || nameLower.includes(query) || emailLower.includes(query)) {
        items.push({
          type: 'member',
          memberId: m.id,
          mentionValue: name,
          displayName: name,
          email: email,
          role: m.role || 'Member',
          isYou: isYou,
          sub: email || m.role || '',
          avatar: m.avatar || name.slice(0, 2).toUpperCase()
        });
      }
    });

    if (items.length === 0) {
      hideMentionPopup();
      return;
    }

    mentionState.open = true;
    mentionState.query = query;
    mentionState.atIndex = atIndex;
    mentionState.cursor = cursor;
    mentionState.items = items;
    if (mentionState.selectedIndex >= items.length) {
      mentionState.selectedIndex = 0;
    }

    renderMentionPopup();
  }

  function renderMentionPopup() {
    const popup = document.getElementById('chat-mention-popup');
    if (!popup || !mentionState.open) return;

    if (mentionState.items.length === 0) {
      popup.style.display = 'none';
      return;
    }

    let html = `
      <div class="mention-popup-header">
        <span>Mention in Chat</span>
        <span class="shortcut-hint">↑↓ navigate • Enter select</span>
      </div>
    `;

    mentionState.items.forEach((item, idx) => {
      const isActive = idx === mentionState.selectedIndex;
      if (item.type === 'all') {
        html += `
          <div class="mention-item ${isActive ? 'active' : ''}" 
               id="mention-opt-${idx}"
               role="option"
               aria-selected="${isActive}"
               onmousedown="event.preventDefault(); window.App.selectMentionItem(${idx});"
               onmouseenter="window.App.setMentionHoverIndex(${idx})">
            <div class="mention-avatar mention-avatar-all">${escapeHtml(item.avatar)}</div>
            <div class="mention-info">
              <div class="mention-name-row">
                <span class="mention-name">${escapeHtml(item.displayName)}</span>
                <span class="mention-pill-all">${escapeHtml(item.badge)}</span>
              </div>
              <span class="mention-sub">${escapeHtml(item.sub)}</span>
            </div>
          </div>
        `;
      } else {
        html += `
          <div class="mention-item ${isActive ? 'active' : ''}" 
               id="mention-opt-${idx}"
               role="option"
               aria-selected="${isActive}"
               onmousedown="event.preventDefault(); window.App.selectMentionItem(${idx});"
               onmouseenter="window.App.setMentionHoverIndex(${idx})">
            <div class="mention-avatar">${renderAvatarInnerHtml(item.avatar, item.displayName)}</div>
            <div class="mention-info">
              <div class="mention-name-row">
                <span class="mention-name">${escapeHtml(item.displayName)}</span>
                ${item.isYou ? '<span class="mention-pill-you">You</span>' : ''}
                <span class="mention-pill-role">${escapeHtml(item.role)}</span>
              </div>
              <span class="mention-sub">${escapeHtml(item.sub)}</span>
            </div>
          </div>
        `;
      }
    });

    popup.innerHTML = html;
    popup.style.display = 'flex';
  }

  function hideMentionPopup() {
    mentionState.open = false;
    mentionState.items = [];
    mentionState.selectedIndex = 0;
    const popup = document.getElementById('chat-mention-popup');
    if (popup) {
      popup.style.display = 'none';
      popup.innerHTML = '';
    }
  }

  function selectMentionItem(index) {
    const item = mentionState.items[index];
    if (!item) return;

    const input = document.getElementById('chat-message-input');
    if (!input) return;

    const cursor = (input.selectionStart != null) ? input.selectionStart : input.value.length;
    const atIndex = mentionState.atIndex;

    const beforeAt = input.value.slice(0, atIndex);
    const afterCursor = input.value.slice(cursor);
    const mentionText = item.type === 'all' ? '@all' : `@${item.mentionValue}`;

    input.value = `${beforeAt}${mentionText} ${afterCursor}`;
    const newCursorPos = beforeAt.length + mentionText.length + 1; // +1 for the space

    hideMentionPopup();
    input.focus();
    if (input.setSelectionRange) {
      input.setSelectionRange(newCursorPos, newCursorPos);
    }
  }

  function setMentionHoverIndex(index) {
    if (mentionState.selectedIndex !== index) {
      mentionState.selectedIndex = index;
      const popup = document.getElementById('chat-mention-popup');
      if (popup) {
        popup.querySelectorAll('.mention-item').forEach((el, i) => {
          if (i === index) {
            el.classList.add('active');
            el.setAttribute('aria-selected', 'true');
          } else {
            el.classList.remove('active');
            el.setAttribute('aria-selected', 'false');
          }
        });
      }
    }
  }

  function scrollSelectedMentionIntoView() {
    const activeEl = document.getElementById(`mention-opt-${mentionState.selectedIndex}`);
    if (activeEl && activeEl.scrollIntoView) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }

  function handleChatKeyDown(e) {
    if (!mentionState.open || mentionState.items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      mentionState.selectedIndex = (mentionState.selectedIndex + 1) % mentionState.items.length;
      renderMentionPopup();
      scrollSelectedMentionIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      mentionState.selectedIndex = (mentionState.selectedIndex - 1 + mentionState.items.length) % mentionState.items.length;
      renderMentionPopup();
      scrollSelectedMentionIntoView();
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      e.stopPropagation();
      selectMentionItem(mentionState.selectedIndex);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      hideMentionPopup();
    }
  }

  function handleSendMessage() {
    hideMentionPopup();
    const input = document.getElementById('chat-message-input');
    if (!input || !input.value.trim()) return;

    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project) return;

    const text = input.value.trim();
    input.value = '';

    const currentUid = state.currentUser.id || state.currentUser.uid;
    const currentEmail = (state.currentUser.email || '').toLowerCase();

    const newMsg = {
      id: 'msg-' + Date.now(),
      senderId: currentUid,
      senderEmail: currentEmail,
      senderName: state.currentUser.name,
      senderAvatar: state.currentUser.avatar,
      text: text,
      timestamp: 'Just now',
      isOwn: true,
      readBy: currentUid ? [currentUid] : []
    };

    project.chats.push(newMsg);
    markProjectChatsAsSeen(project.id);

    // Notify all other project members of the new chat message
    (project.members || []).forEach(member => {
      const isSender = (member.id && currentUid && member.id === currentUid) ||
                       (member.email && currentEmail && member.email.toLowerCase() === currentEmail);
      if (!isSender && member.id) {
        createNotification({
          type: 'chat_message',
          recipientId: member.id,
          projectId: project.id,
          message: `💬 ${state.currentUser.name} in ${project.name}: "${text.slice(0, 60)}${text.length > 60 ? '…' : ''}"`
        });
      }
    });

    saveState();
    syncProjectToFirestore(project);
    renderProjectChats(project);

    // Fire @mention notifications
    notifyMentions(project, text);

    // Optional simulated teammate response
    if (state.enableChatBot && project.members.length > 1) {
      setTimeout(() => {
        simulateTeammateReply(project, text);
      }, 1200);
    }
  }

  function simulateTeammateReply(project, userText) {
    // Pick another member in project
    const otherMembers = project.members.filter(m => m.id !== state.currentUser.id);
    if (otherMembers.length === 0) return;

    const responder = otherMembers[Math.floor(Math.random() * otherMembers.length)];

    const replies = [
      `Thanks for the update Alex! I am taking a look at that right now.`,
      `Agreed, let's make sure this stays aligned with our target deadline.`,
      `Awesome! I'll update my task notes accordingly.`,
      `Sounds good, ping me if you need another review or pairing session on this.`,
      `Got it! Working on the next milestone as scheduled.`
    ];
    const replyText = replies[Math.floor(Math.random() * replies.length)];

    const isChatCurrentlyOpen = isCurrentChatOpen(project.id);
    const replyMsg = {
      id: 'msg-' + Date.now(),
      senderId: responder.id,
      senderEmail: responder.email || '',
      senderName: responder.name,
      senderAvatar: responder.avatar,
      text: replyText,
      timestamp: 'Just now',
      isOwn: false,
      readBy: [responder.id]
    };
    if (isChatCurrentlyOpen && state.currentUser) {
      const myId = state.currentUser.id || state.currentUser.uid;
      if (myId && !replyMsg.readBy.includes(myId)) replyMsg.readBy.push(myId);
    }

    project.chats.push(replyMsg);

    // In-app notification for current user
    createNotification({
      type: 'chat_message',
      recipientId: state.currentUser.id,
      projectId: project.id,
      message: `💬 ${responder.name} in ${project.name}: "${replyText.slice(0, 60)}${replyText.length > 60 ? '…' : ''}"`
    });

    // Desktop push alert
    sendDesktopNotification({
      title: `${responder.name} (${project.name})`,
      body: replyText,
      projectId: project.id
    });

    saveState();
    syncProjectToFirestore(project);
    if (state.activeProjectId === project.id && state.activeProjectTab === 'chats') {
      renderProjectChats(project);
    } else {
      updateChatTabBadge(project);
    }
  }

  function scrollChatToBottom() {
    setTimeout(() => {
      const container = document.getElementById('chat-messages-container');
      if (container) container.scrollTop = container.scrollHeight;
    }, 50);
  }

  // =========================================================
  // 9.5 TEAM TAB & MEMBER MANAGEMENT
  // =========================================================
  function isProjectAdmin(project, user) {
    if (!project || !user) return false;
    const userId = user.id || user.uid;
    const userEmail = getCurrentUserEmail(user);

    // 1. Project creator by ID or Email
    if (!project.creatorId) return true;
    if (userId && String(project.creatorId) === String(userId)) return true;
    if (project.creatorEmail && userEmail && project.creatorEmail.trim().toLowerCase() === userEmail) return true;

    // 2. Global user role
    const uRole = (user.role || '').toLowerCase();
    if (['admin', 'owner', 'project lead', 'lead', 'product lead', 'manager'].some(r => uRole.includes(r))) return true;

    // 3. Project member role
    const member = getProjectMemberForUser(project, user);
    if (member) {
      const mRole = (member.role || '').toLowerCase();
      if (['owner', 'project lead', 'admin', 'lead', 'product lead', 'manager', 'creator'].some(r => mRole.includes(r))) return true;
    }

    // 4. Project owner / creator
    if (isProjectOwner(project, user) || isProjectCreator(project, user)) return true;

    return false;
  }

  function renderProjectTeam(project, searchQuery = '') {
    const container = document.getElementById('project-team-cards-list');
    if (!container) return;

    const subtitleEl = document.getElementById('team-tab-subtitle');
    if (subtitleEl) {
      subtitleEl.innerText = `${project.members.length} member${project.members.length === 1 ? '' : 's'} collaborating on this project`;
    }

    let members = project.members || [];
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      members = members.filter(m => 
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.email && m.email.toLowerCase().includes(q)) ||
        (m.role && m.role.toLowerCase().includes(q))
      );
    }

    if (members.length === 0) {
      container.innerHTML = `
        <div class="team-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <line x1="18" y1="8" x2="23" y2="13"/>
            <line x1="23" y1="8" x2="18" y2="13"/>
          </svg>
          <h4>No team members found</h4>
          <p>${searchQuery ? `No members matched "${escapeHtml(searchQuery)}". Try another search.` : 'Invite team members to collaborate on this project!'}</p>
        </div>
      `;
      return;
    }

    const isUserAdmin = isProjectAdmin(project, state.currentUser);

    let html = '';
    members.forEach(m => {
      const isCreator = (project.creatorId === m.id) || (m.role === 'Owner');
      const currentUserEmail = getCurrentUserEmail();
      const isCurrentUser = Boolean(
        state.currentUser && (
          (m.id && state.currentUser.id && m.id === state.currentUser.id) ||
          (m.email && currentUserEmail && m.email.trim().toLowerCase() === currentUserEmail)
        )
      );
      const isSpecial = project.specialAssigners && project.specialAssigners.includes(m.id);
      
      const assignedTasks = (project.tasks || []).filter(t => t.assigneeId === m.id);
      const completedTasks = assignedTasks.filter(t => t.status === 'completed').length;

      let actionButtonHtml = '';
      if (isCurrentUser) {
        if (isCreator) {
          actionButtonHtml = `<span class="badge-creator-protected" title="You are the project creator/owner">👑 Owner (You)</span>`;
        } else {
          actionButtonHtml = `
            <button class="btn-leave-member" onclick="event.stopPropagation(); window.App.openExitProjectModal('${project.id}')" title="Leave this project group">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              <span>Exit Project</span>
            </button>
          `;
        }
      } else if (isUserAdmin) {
        if (isCreator) {
          actionButtonHtml = `<span class="badge-creator-protected" title="The project creator cannot be removed">👑 Creator (Protected)</span>`;
        } else {
          actionButtonHtml = `
            <button class="btn btn-danger btn-xs btn-remove-member"
                    onclick="event.stopPropagation(); window.App.handleRemoveProjectMember('${project.id}', '${m.id}')"
                    title="Remove ${escapeHtml(m.name || 'Member')} from this project">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              <span>Remove</span>
            </button>
          `;
        }
      } else {
        if (isCreator) {
          actionButtonHtml = `<span class="badge-creator-tag">👑 Creator</span>`;
        } else {
          actionButtonHtml = `<span class="badge-member-tag">Member</span>`;
        }
      }

      const canEditRole = isUserAdmin || isCurrentUser;
      const memberName = m.name || 'Team Member';
      const memberAvatar = m.avatar || (memberName ? memberName.substring(0, 2).toUpperCase() : 'TM');
      const memberEmail = m.email || '';

      const roleDisplayHtml = `
        <div class="team-role-wrap">
          <span class="team-badge-role ${!m.role ? 'role-empty' : ''}">${escapeHtml(m.role || 'No Role')}</span>
          ${canEditRole ? `
            <button class="btn-role-edit" onclick="event.stopPropagation(); window.App.openEditMemberRoleModal('${project.id}', '${m.id}')" title="Assign or change role for ${escapeHtml(memberName)}">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              <span>${m.role ? 'Edit' : '+ Add Role'}</span>
            </button>
          ` : ''}
        </div>
      `;

      html += `
        <div class="team-member-card" onclick="window.App.openMemberContactModal('${project.id}', '${m.id}')" style="cursor: pointer;" title="Click to view contact details for ${escapeHtml(memberName)}">
          <div class="team-card-top clickable-profile" title="Click to view ${escapeHtml(memberName)}'s contact card">
            <div class="team-card-avatar ${isCreator ? 'avatar-creator' : ''}">
              ${renderAvatarInnerHtml(memberAvatar, memberName)}
            </div>
            <div class="team-card-identity">
              <div class="team-card-name-row">
                <strong class="team-card-name">${escapeHtml(memberName)}</strong>
                ${isCurrentUser ? '<span class="team-you-badge">You</span>' : ''}
              </div>
              <span class="team-card-email">${escapeHtml(memberEmail)}</span>
            </div>
          </div>

          <div class="team-card-badges">
            ${roleDisplayHtml}
            ${isCreator ? '<span class="team-badge-creator">👑 Owner</span>' : ''}
            ${isSpecial ? '<span class="team-badge-special">⭐ Assigner</span>' : ''}
          </div>

          <div class="team-card-metrics">
            <div class="team-card-metric-col">
              <span class="metric-num">${assignedTasks.length}</span>
              <span class="metric-lbl">Assigned</span>
            </div>
            <div class="team-card-metric-col">
              <span class="metric-num">${completedTasks}</span>
              <span class="metric-lbl">Done</span>
            </div>
          </div>

          <div class="team-card-actions-row">
            <button type="button" class="btn-view-contact" onclick="event.stopPropagation(); window.App.openMemberContactModal('${project.id}', '${m.id}')" title="View contact details for ${escapeHtml(memberName)}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Contact</span>
            </button>
            ${actionButtonHtml}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function openMemberContactModal(projectId, memberId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;

    const member = (project.members || []).find(m => m.id === memberId || m.email === memberId);
    if (!member) {
      showToast('Member not found in this project.', 'error');
      return;
    }

    const modalBody = document.getElementById('member-contact-modal-body');
    const modalFooter = document.getElementById('member-contact-modal-footer');
    if (!modalBody || !modalFooter) return;

    const isCreator = (project.creatorId === member.id) || (member.role === 'Owner');
    const currentUserEmail = getCurrentUserEmail();
    const isCurrentUser = Boolean(
      state.currentUser && (
        (member.id && state.currentUser.id && member.id === state.currentUser.id) ||
        (member.email && currentUserEmail && member.email.trim().toLowerCase() === currentUserEmail)
      )
    );
    const isSpecial = project.specialAssigners && project.specialAssigners.includes(member.id);

    const memberName = member.name || 'Team Member';
    const memberAvatar = member.avatar || (memberName ? memberName.substring(0, 2).toUpperCase() : 'TM');
    const memberEmail = member.email || '';

    // Resolve member phone
    const memberEmailKey = memberEmail ? memberEmail.toLowerCase() : '';
    const isDemoUser = (!isFirebaseLive && (!state.currentUser || state.currentUser.id === 'demo' || !state.currentUser.email));
    let memberPhone = member.phone ||
                      (member.id && localStorage.getItem('pulsepm_custom_phone_' + member.id)) ||
                      (memberEmailKey && localStorage.getItem('pulsepm_custom_phone_' + memberEmailKey)) ||
                      (isCurrentUser && ((state.currentUser && state.currentUser.phone) || (isDemoUser && localStorage.getItem('pulsepm_custom_phone_demo')))) ||
                      '';

    const assignedTasks = (project.tasks || []).filter(t => t.assigneeId === member.id || (member.email && t.assigneeId === member.email) || (member.name && t.assigneeName === member.name));
    const completedTasks = assignedTasks.filter(t => t.status === 'completed').length;

    modalBody.innerHTML = `
      <div class="member-contact-hero">
        <div class="member-contact-avatar-wrap">
          <div class="member-contact-avatar ${isCreator ? 'avatar-creator' : ''}">
            ${renderAvatarInnerHtml(memberAvatar, memberName)}
          </div>
          ${isCreator ? '<span class="crown-badge" title="Project Owner">👑</span>' : ''}
        </div>
        <div class="member-contact-title-area">
          <div class="member-contact-name-row">
            <h4 class="member-contact-name">${escapeHtml(memberName)}</h4>
            ${isCurrentUser ? '<span class="team-you-badge">You</span>' : ''}
          </div>
          <div class="member-contact-role-row">
            <span class="team-badge-role">${escapeHtml(member.role || 'Member')}</span>
            ${isCreator ? '<span class="team-badge-creator">👑 Owner</span>' : ''}
            ${isSpecial ? '<span class="team-badge-special">⭐ Assigner</span>' : ''}
          </div>
        </div>
      </div>

      <div class="member-contact-details-grid">
        <!-- Email Item -->
        <div class="member-contact-item">
          <div class="contact-item-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div class="contact-item-info">
            <span class="contact-item-label">Email Address</span>
            <span class="contact-item-value" id="contact-detail-email">${escapeHtml(memberEmail || 'No email provided')}</span>
          </div>
          <div class="contact-item-actions">
            ${memberEmail ? `
              <a href="mailto:${escapeHtml(memberEmail)}" class="btn-contact-action" title="Send Email">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </a>
              <button type="button" class="btn-contact-action" onclick="window.App.copyText('${escapeHtml(memberEmail)}', 'Email address')" title="Copy Email">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Phone Item -->
        <div class="member-contact-item">
          <div class="contact-item-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div class="contact-item-info">
            <span class="contact-item-label">Phone Number</span>
            <span class="contact-item-value ${!memberPhone ? 'italic text-muted' : ''}" id="contact-detail-phone">
              ${escapeHtml(memberPhone || 'No phone number provided')}
            </span>
          </div>
          <div class="contact-item-actions">
            ${memberPhone ? `
              <a href="tel:${escapeHtml(memberPhone)}" class="btn-contact-action" title="Call / WhatsApp">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </a>
              <button type="button" class="btn-contact-action" onclick="window.App.copyText('${escapeHtml(memberPhone)}', 'Phone number')" title="Copy Phone Number">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            ` : (isCurrentUser ? `
              <button type="button" class="btn btn-xs btn-outline-primary" onclick="window.App.closeModal('modal-member-contact'); window.App.openProfileModal();">
                + Add Phone
              </button>
            ` : '')}
          </div>
        </div>

        <!-- Project Collaboration Item -->
        <div class="member-contact-item">
          <div class="contact-item-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div class="contact-item-info">
            <span class="contact-item-label">Project Collaboration</span>
            <span class="contact-item-value">${escapeHtml(project.name)}</span>
          </div>
          <div class="contact-item-actions">
            <span class="badge-role-pill" style="font-size:0.75rem;">${assignedTasks.length} task${assignedTasks.length === 1 ? '' : 's'} (${completedTasks} done)</span>
          </div>
        </div>
      </div>

      ${assignedTasks.length > 0 ? `
        <div class="member-contact-tasks-wrap">
          <h5>Assigned Project Tasks (${assignedTasks.length})</h5>
          <div class="member-contact-tasks-list">
            ${assignedTasks.slice(0, 5).map(t => `
              <div class="member-contact-task-row ${t.status === 'completed' ? 'completed' : ''}" onclick="window.App.closeModal('modal-member-contact'); window.App.openTaskDetailModal('${project.id}', '${t.id}')" title="Click to view task details">
                <span class="task-row-status ${t.status}">${t.status === 'completed' ? '✓' : '○'}</span>
                <span class="task-row-title">${escapeHtml(t.title)}</span>
                ${t.status === 'completed' ? `
                  <span class="task-row-completed-date" style="font-size: 0.72rem; color: var(--success, #10b981); font-weight: 600; margin-left: auto; padding-right: 6px;">Done: ${escapeHtml(formatDate(t.completedDate || t.dueDate))}</span>
                ` : `
                  <span class="task-row-priority ${t.priority || 'medium'}">${escapeHtml(t.priority || 'Medium')}</span>
                `}
              </div>
            `).join('')}
            ${assignedTasks.length > 5 ? `<small class="text-muted" style="display:block; padding:4px 0;">+ ${assignedTasks.length - 5} more tasks</small>` : ''}
          </div>
        </div>
      ` : ''}
    `;

    modalFooter.innerHTML = `
      <button type="button" class="btn btn-secondary" onclick="window.App.closeModal('modal-member-contact');">Close</button>
      ${!isCurrentUser ? `
        <button type="button" class="btn btn-primary" onclick="window.App.startChatWithMember('${escapeHtml(memberName)}');">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span>Message in Chat</span>
        </button>
      ` : ''}
    `;

    openModal('modal-member-contact');

    // Asynchronously fetch latest user profile from Firestore if online to guarantee real-time phone resolution
    if (isFirebaseLive && firebaseDb && member.id) {
      try {
        firebaseDb.collection('users').doc(member.id).get().then(doc => {
          if (doc && doc.exists) {
            const data = doc.data();
            if (data && data.phone && data.phone !== memberPhone) {
              member.phone = data.phone;
              const phoneEl = document.getElementById('contact-detail-phone');
              if (phoneEl) {
                phoneEl.textContent = data.phone;
                phoneEl.classList.remove('italic', 'text-muted');
              }
            }
          }
        }).catch(() => {});
      } catch (e) {}
    }
  }

  function startChatWithMember(memberName) {
    closeModal('modal-member-contact');
    switchProjectTab('chats');
    hideMentionPopup();
    const input = document.getElementById('chat-message-input');
    if (input) {
      input.value = `@${memberName} `;
      input.focus();
    }
    setTimeout(() => {
      const el = document.getElementById('chat-message-input');
      if (el) el.focus();
    }, 50);
  }

  function handleRemoveProjectMember(projectId, memberId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;

    if (!isProjectAdmin(project, state.currentUser)) {
      showToast('Only project admins or creators can remove team members.', 'error');
      return;
    }

    if (project.creatorId === memberId) {
      showToast('The project creator cannot be removed.', 'error');
      return;
    }

    const currentUserEmail = getCurrentUserEmail();
    const isTargetCurrentUser = state.currentUser && (
      state.currentUser.id === memberId ||
      (currentUserEmail && project.members.find(m => m.id === memberId)?.email?.toLowerCase() === currentUserEmail)
    );
    if (isTargetCurrentUser) {
      showToast('You cannot remove yourself from the project. Use "Exit Project" instead.', 'warning');
      return;
    }

    const memberIndex = project.members.findIndex(m => m.id === memberId);
    if (memberIndex === -1) {
      showToast('Member not found in this project.', 'error');
      return;
    }

    const member = project.members[memberIndex];

    if (!confirm(`Are you sure you want to remove "${member.name}" (${member.email}) from this project?`)) {
      return;
    }

    // Remove member
    project.members.splice(memberIndex, 1);

    // Remove from special assigners
    if (project.specialAssigners) {
      project.specialAssigners = project.specialAssigners.filter(id => id !== memberId);
    }

    // Unassign tasks assigned to this member
    let unassignedCount = 0;
    project.tasks.forEach(task => {
      if (task.assigneeId === memberId) {
        task.assigneeId = null;
        task.assigneeName = 'Unassigned';
        unassignedCount++;
      }
    });

    // Add activity record
    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: `${state.currentUser.name} removed ${member.name} from the project`,
      time: 'Just now',
      icon: 'member'
    });

    saveState();
    syncProjectToFirestore(project);
    renderProjectDetail(project);

    // Maintain current search filter if user was searching
    const searchInput = document.getElementById('team-search-input');
    if (searchInput && searchInput.value) {
      renderProjectTeam(project, searchInput.value);
    }

    showToast(`Removed ${member.name} from the project.${unassignedCount > 0 ? ` (${unassignedCount} task(s) unassigned)` : ''}`, 'info');
  }

  function filterProjectTeam(query) {
    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project) return;
    renderProjectTeam(project, query);
  }

  function openEditMemberRoleModal(projectId, memberId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;

    const member = project.members.find(m => m.id === memberId);
    if (!member) return;

    const projIdInput = document.getElementById('edit-role-project-id');
    const memberIdInput = document.getElementById('edit-role-member-id');
    const roleInput = document.getElementById('edit-member-role-input');
    const nameEl = document.getElementById('edit-role-member-name');
    const emailEl = document.getElementById('edit-role-member-email');
    const avatarEl = document.getElementById('edit-role-member-avatar');

    if (projIdInput) projIdInput.value = projectId;
    if (memberIdInput) memberIdInput.value = memberId;
    if (nameEl) nameEl.innerText = member.name;
    if (emailEl) emailEl.innerText = member.email;
    if (avatarEl) setAvatarElementContent(avatarEl, member.avatar, member.name);
    if (roleInput) {
      roleInput.value = member.role || '';
    }

    openModal('modal-edit-member-role');
    setTimeout(() => {
      if (roleInput) {
        roleInput.focus();
        roleInput.select();
      }
    }, 100);
  }

  function handleSaveMemberRole() {
    const projIdInput = document.getElementById('edit-role-project-id');
    const memberIdInput = document.getElementById('edit-role-member-id');
    const roleInput = document.getElementById('edit-member-role-input');

    if (!projIdInput || !memberIdInput || !roleInput) return;

    const projectId = projIdInput.value;
    const memberId = memberIdInput.value;
    const newRole = roleInput.value.trim();

    if (!newRole) {
      showToast('Please enter a role for the member.', 'error');
      return;
    }

    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;

    const member = project.members.find(m => m.id === memberId);
    if (!member) return;

    member.role = newRole;

    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: `${state.currentUser.name} updated ${member.name}'s role to "${newRole}"`,
      time: 'Just now',
      icon: 'member'
    });

    saveState();
    syncProjectToFirestore(project);
    closeModal('modal-edit-member-role');
    renderProjectDetail(project);

    const searchInput = document.getElementById('team-search-input');
    if (searchInput && searchInput.value) {
      renderProjectTeam(project, searchInput.value);
    }

    showToast(`Updated ${member.name}'s role to "${newRole}"!`, 'success');
  }

  // =========================================================
  // 9.6 PROJECT OWNER CONTROLS, BROADCAST UPDATES & MEMBER SELF-EXIT
  // =========================================================

  // --- BROADCAST UPDATE TO TEAM ---
  function openBroadcastUpdateModal(projectId = null) {
    const pId = projectId || state.activeProjectId;
    const project = state.projects.find(p => p.id === pId);
    if (!project) return;

    if (!isProjectAdmin(project, state.currentUser)) {
      showToast('Only project owners or administrators can broadcast team updates.', 'error');
      return;
    }

    const projIdInput = document.getElementById('broadcast-project-id');
    const projNameEl = document.getElementById('broadcast-modal-project-name');
    const recipientCountEl = document.getElementById('broadcast-recipient-count');
    const titleInput = document.getElementById('broadcast-title');
    const messageInput = document.getElementById('broadcast-message');
    const typeSelect = document.getElementById('broadcast-type');

    if (projIdInput) projIdInput.value = project.id;
    if (projNameEl) projNameEl.innerText = project.name;
    if (recipientCountEl) {
      const recipientCount = (project.members || []).length;
      recipientCountEl.innerText = `${recipientCount} project member${recipientCount === 1 ? '' : 's'}`;
    }
    if (titleInput) titleInput.value = '';
    if (messageInput) messageInput.value = '';
    if (typeSelect) typeSelect.selectedIndex = 0;

    openModal('modal-broadcast-update');
    setTimeout(() => {
      if (titleInput) titleInput.focus();
    }, 100);
  }

  function handleSendBroadcastUpdate() {
    const projIdInput = document.getElementById('broadcast-project-id');
    const typeSelect = document.getElementById('broadcast-type');
    const titleInput = document.getElementById('broadcast-title');
    const messageInput = document.getElementById('broadcast-message');
    const postChatCheck = document.getElementById('broadcast-post-chat');

    if (!projIdInput || !titleInput || !messageInput) return;

    const projectId = projIdInput.value;
    const project = state.projects.find(p => p.id === projectId);
    if (!project) {
      showToast('Project not found.', 'error');
      return;
    }

    if (!isProjectAdmin(project, state.currentUser)) {
      showToast('You do not have permission to broadcast updates for this project.', 'error');
      return;
    }

    const type = typeSelect ? typeSelect.value : 'General Update';
    const title = titleInput.value.trim();
    const message = messageInput.value.trim();
    const postChat = postChatCheck ? postChatCheck.checked : true;

    if (!title) {
      showToast('Please enter an update title.', 'error');
      return;
    }
    if (!message) {
      showToast('Please enter an update message.', 'error');
      return;
    }

    const currentUserId = state.currentUser ? (state.currentUser.id || state.currentUser.uid) : '';
    const currentUserEmail = getCurrentUserEmail();

    // Notify each member (excluding the sender)
    let notifiedCount = 0;
    (project.members || []).forEach(member => {
      const isSender = (member.id && currentUserId && member.id === currentUserId) ||
                       (member.email && currentUserEmail && member.email.trim().toLowerCase() === currentUserEmail);
      if (!isSender) {
        createNotification({
          type: 'project_broadcast',
          recipientId: member.id,
          projectId: project.id,
          taskId: null,
          message: `📢 [${type}] ${project.name}: "${title}" — ${message.slice(0, 60)}${message.length > 60 ? '…' : ''}`
        });
        notifiedCount++;
      }
    });

    sendDesktopNotification({
      title: `📢 [${type}] ${project.name}`,
      body: `${title}: ${message}`,
      projectId: project.id
    });

    // Optionally post to project chat channel
    if (postChat) {
      if (!project.chats) project.chats = [];
      project.chats.push({
        id: 'msg-' + Date.now(),
        senderId: currentUserId,
        userId: currentUserId,
        senderName: state.currentUser.name,
        userName: state.currentUser.name,
        senderAvatar: state.currentUser.avatar || state.currentUser.name.substring(0, 2).toUpperCase(),
        userAvatar: state.currentUser.avatar || state.currentUser.name.substring(0, 2).toUpperCase(),
        text: `📢 **[${type.toUpperCase()}] ${title}**\n${message}`,
        timestamp: 'Just now',
        isOwn: true,
        readBy: currentUserId ? [currentUserId] : []
      });
      markProjectChatsAsSeen(project.id);
    }

    // Add to project activity feed
    if (!project.activity) project.activity = [];
    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: `📢 ${state.currentUser.name} broadcasted update: "${title}"`,
      time: 'Just now',
      icon: 'broadcast'
    });

    saveState();
    syncProjectToFirestore(project);
    closeModal('modal-broadcast-update');

    if (state.activeProjectId === project.id) {
      renderProjectDetail(project);
    }

    showToast(`Broadcast update sent to ${notifiedCount} team member${notifiedCount === 1 ? '' : 's'}!`, 'success');
  }

  // --- OWNER DELETE PROJECT ---
  function openDeleteProjectModal(projectId = null) {
    const pId = projectId || state.activeProjectId;
    const project = state.projects.find(p => p.id === pId);
    if (!project) return;

    if (!isProjectOwner(project, state.currentUser)) {
      showToast('Only the project owner can delete this project.', 'error');
      return;
    }

    const idInput = document.getElementById('delete-project-id');
    const nameEl = document.getElementById('delete-project-name-target');

    if (idInput) idInput.value = project.id;
    if (nameEl) nameEl.innerText = `"${project.name}" (${project.id})`;

    openModal('modal-delete-project');
  }

  function handleConfirmDeleteProject() {
    const idInput = document.getElementById('delete-project-id');
    if (!idInput) return;

    const projectId = idInput.value;
    const project = state.projects.find(p => p.id === projectId);
    if (!project) {
      showToast('Project not found.', 'error');
      closeModal('modal-delete-project');
      return;
    }

    if (!isProjectOwner(project, state.currentUser)) {
      showToast('Only the project owner can delete this project.', 'error');
      closeModal('modal-delete-project');
      return;
    }

    const currentUserId = state.currentUser ? (state.currentUser.id || state.currentUser.uid) : '';
    const currentUserEmail = getCurrentUserEmail();
    const projectName = project.name;

    // Alert all other members that project was deleted
    (project.members || []).forEach(member => {
      const isSender = (member.id && currentUserId && member.id === currentUserId) ||
                       (member.email && currentUserEmail && member.email.trim().toLowerCase() === currentUserEmail);
      if (!isSender) {
        createNotification({
          type: 'project_deleted',
          recipientId: member.id,
          projectId: null,
          taskId: null,
          message: `⚠️ Project "${projectName}" has been permanently retired and deleted by the owner.`
        });
      }
    });

    // Remove project from state
    state.projects = state.projects.filter(p => p.id !== projectId);
    if (state.activeProjectId === projectId) {
      state.activeProjectId = null;
    }

    saveState();
    deleteProjectFromFirestore(projectId);
    closeModal('modal-delete-project');
    navigateToHome();
    showToast(`Project "${projectName}" was permanently deleted.`, 'success');
  }

  // --- MEMBER SELF-EXIT / LEAVE PROJECT ---
  function openExitProjectModal(projectId = null) {
    const pId = projectId || state.activeProjectId;
    const project = state.projects.find(p => p.id === pId);
    if (!project) return;

    if (isProjectOwner(project, state.currentUser)) {
      showToast('As the project owner, you cannot exit. You can delete the project or appoint another owner first.', 'warning');
      return;
    }

    const idInput = document.getElementById('exit-project-id');
    const nameEl = document.getElementById('exit-project-name-target');

    if (idInput) idInput.value = project.id;
    if (nameEl) nameEl.innerText = `"${project.name}"`;

    openModal('modal-exit-project');
  }

  function handleConfirmExitProject() {
    const idInput = document.getElementById('exit-project-id');
    const projectId = (idInput && idInput.value) || state.activeProjectId;
    const project = state.projects.find(p => p.id === projectId);
    if (!project) {
      showToast('Project not found.', 'error');
      closeModal('modal-exit-project');
      return;
    }

    if (isProjectOwner(project, state.currentUser)) {
      showToast('As the project owner, you cannot exit this project.', 'error');
      closeModal('modal-exit-project');
      return;
    }

    const currentUserId = state.currentUser ? (state.currentUser.id || state.currentUser.uid) : '';
    const currentUserEmail = getCurrentUserEmail();
    const currentUserName = state.currentUser ? state.currentUser.name : 'A member';
    const projectName = project.name;

    // Find member index
    const memberIndex = (project.members || []).findIndex(m =>
      (m.id && currentUserId && m.id === currentUserId) ||
      (m.email && currentUserEmail && m.email.trim().toLowerCase() === currentUserEmail)
    );

    if (memberIndex === -1) {
      showToast('You are not registered as a member of this project.', 'error');
      closeModal('modal-exit-project');
      return;
    }

    const matchedMember = project.members[memberIndex];
    const memberIdToRemove = matchedMember.id;

    // Remove from members
    project.members.splice(memberIndex, 1);

    // Remove from special assigners if present
    if (project.specialAssigners) {
      project.specialAssigners = project.specialAssigners.filter(id => id !== currentUserId && id !== memberIdToRemove);
    }

    // Unassign tasks assigned to this user
    project.tasks.forEach(task => {
      if (
        (currentUserId && task.assigneeId === currentUserId) ||
        (memberIdToRemove && task.assigneeId === memberIdToRemove) ||
        (currentUserEmail && task.assigneeEmail && task.assigneeEmail.trim().toLowerCase() === currentUserEmail)
      ) {
        task.assigneeId = null;
      }
    });

    // Add activity log
    if (!project.activity) project.activity = [];
    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: `👋 ${currentUserName} exited the project group.`,
      time: 'Just now',
      icon: 'member'
    });

    // Notify project creator/owner
    if (project.creatorId && project.creatorId !== currentUserId) {
      createNotification({
        type: 'member_exited',
        recipientId: project.creatorId,
        projectId: project.id,
        taskId: null,
        message: `👋 ${currentUserName} has exited project "${projectName}".`
      });
    }

    saveState();
    syncProjectToFirestore(project);
    closeModal('modal-exit-project');

    if (state.activeProjectId === projectId) {
      state.activeProjectId = null;
    }

    navigateToHome();
    showToast(`You have successfully exited "${projectName}".`, 'info');
  }

  // =========================================================
  // 10. CREATE PROJECT WORKFLOW
  // =========================================================
  // =========================================================
  // 10. CREATE PROJECT WORKFLOW (3 Assignment Permission Levels)
  // =========================================================
  function openCreateProjectModal() {
    closeProfileMenu();
    // Default dates
    const today = new Date().toISOString().split('T')[0];
    const future = new Date();
    future.setDate(future.getDate() + 35);
    const deadline = future.toISOString().split('T')[0];

    const nameInput = document.getElementById('project-name-input');
    const groupInput = document.getElementById('project-group-input');
    const descInput = document.getElementById('project-desc-input');
    if (nameInput) nameInput.value = '';
    if (groupInput) groupInput.value = '';
    if (descInput) descInput.value = '';

    const startInput = document.getElementById('project-start-date');
    const deadInput = document.getElementById('project-deadline');
    if (startInput) startInput.value = today;
    if (deadInput) deadInput.value = deadline;

    // Reset 3-level permission selector to "anyone"
    const policySelect = document.getElementById('project-assign-permission-select');
    if (policySelect) policySelect.value = 'anyone';
    toggleSpecialAssignerField('anyone');

    renderSpecialAssignersCreationList();

    // Reset Rankings Visibility selector to "everyone"
    const visSelect = document.getElementById('project-rankings-visibility-select');
    if (visSelect) visSelect.value = 'everyone';
    toggleCreateRankingsViewerField('everyone');
    renderCreateRankingsViewersList();

    openModal('modal-create-project');
  }

  function toggleSpecialAssignerField(value) {
    const container = document.getElementById('special-assigners-container');
    if (container) {
      // Show only for Level 3: Specific Members
      container.style.display = (value === 'specific_members') ? 'block' : 'none';
    }
  }

  function renderSpecialAssignersCreationList() {
    const container = document.getElementById('create-project-special-assigners-list');
    if (!container) return;

    const actualCollaborators = getActualCollaborators();

    if (actualCollaborators.length === 0) {
      container.innerHTML = `
        <div style="padding: 12px; background: var(--bg-card); border-radius: 8px; border: 1px dashed var(--border-subtle); color: var(--text-muted); font-size: 0.85rem; text-align: center;">
          <div style="font-size: 1.2rem; margin-bottom: 4px;">👥</div>
          <strong>No previous collaborators found</strong><br>
          Once your project is created, invite team members and assign roles anytime in the project's <strong>Team</strong> tab.
        </div>
      `;
      return;
    }

    let html = '';
    actualCollaborators.forEach(collab => {
      html += `
        <label class="assigner-checkbox-item">
          <input type="checkbox" value="${collab.id}" class="create-special-assigner-cb">
          <span><strong>${escapeHtml(collab.name)}</strong> (${escapeHtml(collab.role)})</span>
        </label>
      `;
    });
    container.innerHTML = html;
  }

  function handleCreateProject() {
    const nameInput = document.getElementById('project-name-input');
    const groupInput = document.getElementById('project-group-input');
    const descInput = document.getElementById('project-desc-input');
    const startInput = document.getElementById('project-start-date');
    const deadlineInput = document.getElementById('project-deadline');
    const policySelect = document.getElementById('project-assign-permission-select');

    const name = nameInput.value.trim();
    const group = (groupInput && groupInput.value.trim()) ? groupInput.value.trim() : '';
    const desc = descInput.value.trim();
    const startDate = startInput.value;
    const deadline = deadlineInput.value;
    const taskAssignmentPolicy = policySelect ? policySelect.value : 'anyone'; // 'anyone' | 'creator_admin' | 'specific_members'

    if (!name || !group || !desc || !startDate || !deadline) {
      showToast('Please fill in all project fields, including Group / Category.', 'error');
      return;
    }

    if (new Date(deadline) < new Date(startDate)) {
      showToast('Deadline must be after the start date.', 'error');
      return;
    }

    const randomId = 'PRJ-' + Math.floor(1000 + Math.random() * 9000);
    const randomCode = Math.floor(100 + Math.random() * 900) + '-' + Math.floor(100 + Math.random() * 900);

    const currentUserId = (state.currentUser && (state.currentUser.id || state.currentUser.uid)) || 'usr-' + Date.now();
    const userEmail = (state.currentUser.identities && state.currentUser.identities.email) || state.currentUser.email || 'user@example.com';
    // Initial project members
    const initialMembers = [
      {
        id: currentUserId,
        name: state.currentUser.name,
        email: userEmail,
        phone: state.currentUser.phone || (currentUserId && localStorage.getItem('pulsepm_custom_phone_' + currentUserId)) || '',
        role: 'Owner',
        avatar: state.currentUser.avatar || 'ME'
      }
    ];

    // Collect specific assigners if Level 3 chosen
    const specialAssignerIds = [];
    if (taskAssignmentPolicy === 'specific_members') {
      const actualCollaborators = getActualCollaborators();
      document.querySelectorAll('.create-special-assigner-cb:checked').forEach(cb => {
        specialAssignerIds.push(cb.value);
        // Automatically add them to the project members roster
        const collab = actualCollaborators.find(c => c.id === cb.value);
        if (collab && !initialMembers.some(m => m.id === collab.id || (m.email && collab.email && m.email.toLowerCase() === collab.email.toLowerCase()))) {
          initialMembers.push({
            id: collab.id,
            name: collab.name,
            email: collab.email,
            role: collab.role || 'Contributor',
            avatar: collab.avatar
          });
        }
      });
    }

    // Collect rankings visibility settings
    const visSelect = document.getElementById('project-rankings-visibility-select');
    const rankingsVisibility = visSelect ? visSelect.value : 'everyone'; // 'everyone' | 'admin' | 'selected'
    const rankingsViewerIds = [];
    if (rankingsVisibility === 'selected') {
      const actualCollaborators = getActualCollaborators();
      document.querySelectorAll('.create-rankings-viewer-cb:checked').forEach(cb => {
        rankingsViewerIds.push(cb.value);
        const collab = actualCollaborators.find(c => c.id === cb.value);
        if (collab && !initialMembers.some(m => m.id === collab.id || (m.email && collab.email && m.email.toLowerCase() === collab.email.toLowerCase()))) {
          initialMembers.push({
            id: collab.id,
            name: collab.name,
            email: collab.email,
            role: collab.role || 'Contributor',
            avatar: collab.avatar
          });
        }
      });
    }

    const newProject = {
      id: randomId,
      joinCode: randomCode,
      name: name,
      group: group,
      description: desc,
      startDate: startDate,
      deadline: deadline,
      creatorId: currentUserId,
      taskAssignmentPolicy: taskAssignmentPolicy,
      specialAssigners: specialAssignerIds,
      rankingsVisibility: rankingsVisibility,
      rankingsViewers: rankingsViewerIds,
      members: initialMembers,
      tasks: [],
      chats: [
        {
          id: 'msg-' + Date.now(),
          senderId: currentUserId,
          senderName: state.currentUser.name,
          senderAvatar: state.currentUser.avatar,
          text: `Welcome to ${name}! Let's coordinate tasks and track our progress here.`,
          timestamp: 'Just now',
          isOwn: true
        }
      ],
      activity: [
        {
          id: 'act-' + Date.now(),
          text: `${state.currentUser.name} created project "${name}" (who can Assign: ${formatPolicyName(taskAssignmentPolicy)})`,
          time: 'Just now',
          icon: 'project'
        }
      ]
    };

    state.projects.unshift(newProject);
    saveState();
    syncProjectToFirestore(newProject);

    closeModal('modal-create-project');
    nameInput.value = '';
    if (groupInput) groupInput.value = '';
    descInput.value = '';

    showToast(`Project "${name}" created successfully!`, 'success');
    openProject(newProject.id);
  }

  function formatPolicyName(policy) {
    if (policy === 'creator_admin') return 'Admin';
    if (policy === 'specific_members') return 'Selected Member';
    return 'Anyone';
  }

  // =========================================================
  // 11. CREATE TASK & ASSIGNMENT WORKFLOW (3 Permission Levels)
  // =========================================================
  function openCreateTaskModal() {
    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project) return;

    const selfMember = getProjectMemberForUser(project, state.currentUser) || state.currentUser;
    const selfId = selfMember.id || state.currentUser.id;
    const selfName = selfMember.name || state.currentUser.name;
    const canAssignOthers = canUserAssignOthers(project, state.currentUser);

    let policyText = '';
    if (project.taskAssignmentPolicy === 'creator_admin') {
      policyText = 'Admin Policy (Only creator & admin can assign to others)';
    } else if (project.taskAssignmentPolicy === 'specific_members') {
      policyText = 'Selected Member Policy (Only selected members can assign to others)';
    } else {
      policyText = 'Anyone Policy (Everyone can assign tasks)';
    }

    const banner = document.getElementById('task-assign-policy-banner');
    const select = document.getElementById('task-assignee-select');
    const hint = document.getElementById('task-assignee-hint');

    if (banner) {
      if (canAssignOthers) {
        banner.className = 'task-policy-banner open';
        banner.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          <span>✓ You have authority to assign tasks to yourself or any team member (${policyText}).</span>
        `;
      } else {
        banner.className = 'task-policy-banner open';
        banner.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <span>💡 Self-Assignment Enabled: You can assign this deliverable to yourself (${policyText}).</span>
        `;
      }
    }

    if (select) {
      let optionsHtml = '';
      const selfRole = selfMember.role ? ` (${escapeHtml(selfMember.role)})` : '';
      // Self is ALWAYS an option and placed first at the top
      optionsHtml += `<option value="${selfId}" selected>Assign to Myself (${escapeHtml(selfName)}${selfRole})</option>`;

      if (canAssignOthers && Array.isArray(project.members)) {
        project.members.forEach(m => {
          if (m.id !== selfId) {
            optionsHtml += `<option value="${m.id}">${escapeHtml(m.name)} (${escapeHtml(m.role || 'Member')})</option>`;
          }
        });
        select.disabled = false;
        if (hint) hint.innerText = 'Assign this deliverable to yourself or select a team member.';
      } else {
        select.disabled = false;
        if (hint) hint.innerText = 'Self-assignment enabled: You are assigning this deliverable to yourself.';
      }
      select.innerHTML = optionsHtml;
    }

    // Default due date to project deadline or +7 days
    const dueInput = document.getElementById('task-due-date');
    if (dueInput) {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      dueInput.value = d.toISOString().split('T')[0];
    }

    openModal('modal-create-task');
  }

  function handleCreateTask() {
    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project) return;

    const titleInput = document.getElementById('task-title-input');
    const descInput = document.getElementById('task-desc-input');
    const prioritySelect = document.getElementById('task-priority-select');
    const dueInput = document.getElementById('task-due-date');
    const assigneeSelect = document.getElementById('task-assignee-select');

    const title = titleInput.value.trim();
    const desc = descInput.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueInput.value;

    if (!title || !dueDate) {
      showToast('Please provide a task title and due date.', 'error');
      return;
    }

    const selfMember = getProjectMemberForUser(project, state.currentUser) || state.currentUser;
    const selfId = selfMember.id || state.currentUser.id;
    const canAssignOthers = canUserAssignOthers(project, state.currentUser);

    let targetAssigneeId = assigneeSelect ? assigneeSelect.value : selfId;
    if (!canAssignOthers || !targetAssigneeId) {
      // Must be self-assigned
      targetAssigneeId = selfId;
    }

    const assigneeMember = (project.members || []).find(m => m.id === targetAssigneeId) || selfMember;
    const isAssignedToSelf = (assigneeMember.id === selfId) || (assigneeMember.id === state.currentUser.id);

    const newTask = {
      id: 'tsk-' + Date.now(),
      title: title,
      description: desc,
      priority: priority,
      dueDate: dueDate,
      assigneeId: assigneeMember.id,
      assigneeName: assigneeMember.name,
      assigneeEmail: assigneeMember.email || getCurrentUserEmail(assigneeMember) || '',
      creatorId: selfId || state.currentUser.id,
      createdBy: selfId || state.currentUser.id,
      creatorName: state.currentUser.name || 'Admin',
      creatorEmail: state.currentUser.email || getCurrentUserEmail(state.currentUser) || '',
      createdAt: new Date().toISOString(),
      status: 'pending',
      subtasks: [],
      comments: []
    };

    project.tasks.push(newTask);
    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: isAssignedToSelf
        ? `${state.currentUser.name} created task "${title}" (Assigned to self)`
        : `${state.currentUser.name} added task "${title}" (Assigned to ${assigneeMember.name})`,
      time: 'Just now',
      icon: 'task'
    });

    // Fire task-assigned notification only if assigned to another colleague
    if (!isAssignedToSelf) {
      notifyTaskAssigned(project, newTask, assigneeMember);
    }

    saveState();
    syncProjectToFirestore(project);
    closeModal('modal-create-task');
    titleInput.value = '';
    descInput.value = '';

    renderProjectDetail(project);
    if (isAssignedToSelf) {
      showToast(`Task created and assigned to you!`, 'success');
    } else {
      showToast(`Task added and assigned to ${assigneeMember.name}!`, 'success');
    }
  }

  function toggleSpecialAssigner(projectId, memberId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;

    if (!project.specialAssigners) {
      project.specialAssigners = [];
    }

    const member = project.members.find(m => m.id === memberId);
    const memberName = member ? member.name : 'Team member';

    const index = project.specialAssigners.indexOf(memberId);
    if (index > -1) {
      project.specialAssigners.splice(index, 1);
      project.activity.unshift({
        id: 'act-' + Date.now(),
        text: `${state.currentUser.name} revoked Specific Assigner permission from ${memberName}`,
        time: 'Just now',
        icon: 'member'
      });
      showToast(`Revoked assignment privileges from ${memberName}`, 'info');
    } else {
      project.specialAssigners.push(memberId);
      project.activity.unshift({
        id: 'act-' + Date.now(),
        text: `${state.currentUser.name} designated ${memberName} as a Specific Assigner`,
        time: 'Just now',
        icon: 'member'
      });
      showToast(`⭐ Designated ${memberName} as Specific Assigner!`, 'success');
    }

    saveState();
    syncProjectToFirestore(project);
    renderProjectOverview(project);
  }

  // =========================================================
  // 12. NOTIFICATION SYSTEM & DESKTOP ALERTS
  // =========================================================

  function requestBrowserNotificationPermission() {
    if (!('Notification' in window)) {
      showToast('Your browser does not support desktop notifications.', 'warning');
      return Promise.resolve('unsupported');
    }
    return Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showToast('Desktop notifications enabled!', 'success');
        sendDesktopNotification({
          title: 'PulsePM Notifications Active',
          body: 'You will receive desktop alerts for new chat messages and project updates.',
          bypassFocusCheck: true
        });
      } else if (permission === 'denied') {
        showToast('Notifications are blocked in your browser settings.', 'warning');
      }
      renderNotificationDrawer();
      return permission;
    }).catch(err => {
      console.warn('Error requesting notification permission:', err);
      return 'error';
    });
  }

  function sendDesktopNotification({ title, body, icon, tag, projectId, bypassFocusCheck = false }) {
    if (!('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;

    // Do not show desktop popup if user is actively focused on the project's chat tab
    if (!bypassFocusCheck && !document.hidden && document.hasFocus()) {
      if (state.activeProjectId === projectId && state.activeProjectTab === 'chats') {
        return;
      }
    }

    try {
      const notifOptions = {
        body: body || '',
        tag: tag || ('pulsepm_' + (projectId || 'general') + '_' + Date.now()),
        renotify: true
      };
      const notif = new Notification(title || 'PulsePM Update', notifOptions);
      notif.onclick = () => {
        try { window.focus(); } catch (e) {}
        if (projectId) {
          openProject(projectId);
          switchProjectTab('chats');
        }
        notif.close();
      };
    } catch (err) {
      console.warn('Could not display desktop notification:', err);
    }
  }

  function isCurrentChatOpen(projectId) {
    if (!state.isLoggedIn || !projectId) return false;
    const isDocActive = !document.hidden && (typeof document.hasFocus !== 'function' || document.hasFocus());
    return (
      state.activeProjectId === projectId &&
      state.activeProjectTab === 'chats' &&
      isDocActive
    );
  }

  function clearChatNotificationsForProject(projectId) {
    if (!state.notifications || !projectId) return;
    let changed = false;
    const currentUid = state.currentUser ? (state.currentUser.id || state.currentUser.uid) : null;
    state.notifications.forEach(n => {
      if ((n.type === 'chat_message' || n.type === 'mention') && n.projectId === projectId && !n.read) {
        if (!currentUid || n.recipientId === currentUid) {
          n.read = true;
          changed = true;
        }
      }
    });
    if (changed) {
      saveState();
      updateNotificationBell();
      renderNotificationDrawer();
    }
  }

  function getUserSeenChatKey(projectId, userId) {
    return `${projectId || ''}_${userId || ''}`;
  }

  function getUserSeenChatIds(projectId, userId) {
    if (!state.userSeenChats) state.userSeenChats = {};
    const key = getUserSeenChatKey(projectId, userId);
    if (!Array.isArray(state.userSeenChats[key])) {
      state.userSeenChats[key] = [];
    }
    return new Set(state.userSeenChats[key]);
  }

  function isChatSeenByUser(chat, projectId, user) {
    if (!chat) return true;
    const u = user || state.currentUser;
    const uid = (u && (u.id || u.uid)) || '';
    const email = (u && u.email ? u.email.toLowerCase() : '');

    // 1. Sender's own message is always seen
    const senderId = chat.senderId || chat.userId;
    const senderEmail = (chat.senderEmail || '').toLowerCase();
    if (chat.isOwn || (senderId && uid && senderId === uid) || (senderEmail && email && senderEmail === email)) {
      return true;
    }

    // 2. Check readBy array on chat object
    if (Array.isArray(chat.readBy)) {
      if ((uid && chat.readBy.includes(uid)) || (email && chat.readBy.includes(email))) {
        return true;
      }
    }

    // 3. Check state.userSeenChats
    if (state.userSeenChats && projectId && uid) {
      const key = getUserSeenChatKey(projectId, uid);
      const seenList = state.userSeenChats[key];
      if (Array.isArray(seenList) && chat.id && seenList.includes(chat.id)) {
        return true;
      }
    }

    // 4. If current user is actively viewing this project's chat tab right now, consider seen
    if (state.activeProjectId === projectId && state.activeProjectTab === 'chats' && !document.hidden) {
      return true;
    }

    return false;
  }

  function getUnseenChatCount(project, user) {
    if (!project || !Array.isArray(project.chats) || project.chats.length === 0) return 0;
    const u = user || state.currentUser;
    return project.chats.filter(chat => !isChatSeenByUser(chat, project.id, u)).length;
  }

  function markProjectChatsAsSeen(projectId, user) {
    if (!projectId) return;
    const project = (state.projects || []).find(p => p.id === projectId);
    if (!project || !Array.isArray(project.chats)) return;

    const u = user || state.currentUser;
    const uid = (u && (u.id || u.uid)) || '';
    if (!uid) return;

    if (!state.userSeenChats) state.userSeenChats = {};
    const key = getUserSeenChatKey(projectId, uid);
    const seenSet = new Set(Array.isArray(state.userSeenChats[key]) ? state.userSeenChats[key] : []);

    let modified = false;
    project.chats.forEach(chat => {
      if (!Array.isArray(chat.readBy)) {
        chat.readBy = [];
      }
      if (!chat.readBy.includes(uid)) {
        chat.readBy.push(uid);
        modified = true;
      }
      if (chat.id && !seenSet.has(chat.id)) {
        seenSet.add(chat.id);
        modified = true;
      }
    });

    state.userSeenChats[key] = Array.from(seenSet);
    if (modified) {
      saveState();
    }
    updateChatTabBadge(project);
  }

  function updateChatTabBadge(project) {
    const badge = document.getElementById('tab-chats-count');
    if (!badge) return;

    const p = project || (state.projects || []).find(proj => proj.id === state.activeProjectId);
    if (!p) {
      badge.innerText = '0';
      badge.classList.remove('has-unseen');
      badge.removeAttribute('title');
      return;
    }

    // If chat tab is actively open and document is visible, mark existing messages seen
    if (state.activeProjectId === p.id && state.activeProjectTab === 'chats' && !document.hidden) {
      if (!state.userSeenChats) state.userSeenChats = {};
      const u = state.currentUser;
      const uid = (u && (u.id || u.uid)) || '';
      if (uid && Array.isArray(p.chats)) {
        const key = getUserSeenChatKey(p.id, uid);
        const seenSet = new Set(Array.isArray(state.userSeenChats[key]) ? state.userSeenChats[key] : []);
        let changed = false;
        p.chats.forEach(c => {
          if (!Array.isArray(c.readBy)) c.readBy = [];
          if (!c.readBy.includes(uid)) { c.readBy.push(uid); changed = true; }
          if (c.id && !seenSet.has(c.id)) { seenSet.add(c.id); changed = true; }
        });
        state.userSeenChats[key] = Array.from(seenSet);
        if (changed) saveState();
      }
    }

    const unseenCount = getUnseenChatCount(p);
    badge.innerText = String(unseenCount);

    if (unseenCount > 0) {
      badge.classList.add('has-unseen');
      badge.title = `${unseenCount} unseen message${unseenCount === 1 ? '' : 's'}`;
      badge.setAttribute('aria-label', `${unseenCount} unseen messages`);
    } else {
      badge.classList.remove('has-unseen');
      badge.title = 'No unseen messages';
      badge.setAttribute('aria-label', '0 unseen messages');
    }
  }

  function updateTaskTabBadges(project) {
    const p = project || (state.projects || []).find(proj => proj.id === state.activeProjectId);
    if (!p || !Array.isArray(p.tasks)) return;

    // Active tasks: pending and in_progress (excluding completed)
    const activeTasks = p.tasks.filter(t => t.status === 'pending' || t.status === 'in_progress');
    const myActiveTasks = activeTasks.filter(t => isTaskAssignedToUser(t, state.currentUser));

    const allTasksBadge = document.getElementById('tab-tasks-count');
    if (allTasksBadge) {
      allTasksBadge.innerText = String(activeTasks.length);
      allTasksBadge.title = `${activeTasks.length} pending / in-progress task${activeTasks.length === 1 ? '' : 's'}`;
      allTasksBadge.setAttribute('aria-label', `${activeTasks.length} active tasks`);
    }

    const myTasksBadge = document.getElementById('tab-mytasks-count');
    if (myTasksBadge) {
      myTasksBadge.innerText = String(myActiveTasks.length);
      myTasksBadge.title = `${myActiveTasks.length} pending / in-progress task${myActiveTasks.length === 1 ? '' : 's'}`;
      myTasksBadge.setAttribute('aria-label', `${myActiveTasks.length} active tasks`);
    }
  }

  function getActiveProject() {
    return (state.projects || []).find(p => p.id === state.activeProjectId) || null;
  }

  function createNotification({ type, recipientId, projectId, taskId = null, message }) {
    // Avoid duplicate deadline notifications for the same task
    if (type === 'deadline_near') {
      const exists = state.notifications.some(
        n => n.type === 'deadline_near' && n.taskId === taskId && n.recipientId === recipientId
      );
      if (exists) return;
    }

    // Avoid creating in-app notification if the recipient has this project's chat actively open on screen
    if ((type === 'chat_message' || type === 'mention') && projectId) {
      const currentUid = state.currentUser ? (state.currentUser.id || state.currentUser.uid) : null;
      if (currentUid && recipientId === currentUid && isCurrentChatOpen(projectId)) {
        return;
      }
    }

    const notif = {
      id: 'notif_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
      type,
      recipientId,
      projectId,
      taskId,
      message,
      read: false,
      createdAt: new Date().toISOString()
    };

    if (!state.notifications) state.notifications = [];
    state.notifications.unshift(notif);
    saveState();
    updateNotificationBell();
  }

  function checkDeadlineNotifications() {
    const now = new Date();
    const twoDaysMs = 2 * 24 * 60 * 60 * 1000;

    getUserProjects().forEach(project => {
      (project.tasks || []).forEach(task => {
        if (!task.dueDate || task.status === 'completed') return;
        const due = new Date(task.dueDate);
        const diff = due - now;
        if (diff > 0 && diff <= twoDaysMs) {
          const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
          const label = daysLeft <= 1 ? 'tomorrow' : `in ${daysLeft} days`;
          createNotification({
            type: 'deadline_near',
            recipientId: task.assigneeId,
            projectId: project.id,
            taskId: task.id,
            message: `⏰ Deadline ${label}: "${task.title}" in ${project.name}`
          });
          sendDesktopNotification({
            title: `Deadline ${label} (${project.name})`,
            body: `Task "${task.title}" is due soon.`,
            projectId: project.id
          });
        }
      });
    });
  }

  function notifyTaskAssigned(project, task, assigneeMember) {
    // Only notify if assigned to someone other than the current user
    if (!assigneeMember || assigneeMember.id === state.currentUser.id) return;
    createNotification({
      type: 'task_assigned',
      recipientId: assigneeMember.id,
      projectId: project.id,
      taskId: task.id,
      message: `📋 ${state.currentUser.name} assigned you "${task.title}" in ${project.name}`
    });
    sendDesktopNotification({
      title: `Task Assigned (${project.name})`,
      body: `${state.currentUser.name} assigned you "${task.title}"`,
      projectId: project.id
    });
  }

  function notifyMentions(project, messageText) {
    const notified = new Set();
    const isAll = /@all\b/i.test(messageText);

    // 1. If @all is mentioned, notify all project members except current user
    if (isAll) {
      (project.members || []).forEach(member => {
        if (member.id && member.id !== state.currentUser.id && !notified.has(member.id)) {
          notified.add(member.id);
          createNotification({
            type: 'mention',
            recipientId: member.id,
            projectId: project.id,
            taskId: null,
            message: `📢 ${state.currentUser.name} mentioned @all in ${project.name}: "${messageText.slice(0, 60)}${messageText.length > 60 ? '…' : ''}"`
          });
          sendDesktopNotification({
            title: `📢 @all Mentioned by ${state.currentUser.name} (${project.name})`,
            body: messageText,
            projectId: project.id
          });
        }
      });
    }

    // 2. Parse individual @Name mentions
    const mentionRegex = /@([A-Za-z0-9_\.\-]+(?:\s[A-Za-z0-9_\.\-]+)?)/g;
    let match;
    while ((match = mentionRegex.exec(messageText)) !== null) {
      const mentionedName = match[1].toLowerCase().trim();
      if (mentionedName === 'all') continue;
      const member = (project.members || []).find(m =>
        m.id !== state.currentUser.id &&
        (m.name.toLowerCase().includes(mentionedName) || (m.email && m.email.toLowerCase().includes(mentionedName)))
      );
      if (member && !notified.has(member.id)) {
        notified.add(member.id);
        createNotification({
          type: 'mention',
          recipientId: member.id,
          projectId: project.id,
          taskId: null,
          message: `💬 ${state.currentUser.name} mentioned you in ${project.name}: "${messageText.slice(0, 60)}${messageText.length > 60 ? '…' : ''}"`
        });
        sendDesktopNotification({
          title: `Mentioned by ${state.currentUser.name} (${project.name})`,
          body: messageText,
          projectId: project.id
        });
      }
    }
  }

  function getMyNotifications() {
    if (!state.notifications) return [];
    return state.notifications.filter(n => n.recipientId === state.currentUser.id);
  }

  function updateNotificationBell() {
    const badge = document.getElementById('notif-badge');
    const bellBtn = document.getElementById('notif-bell-btn');
    if (!badge || !bellBtn) return;

    const unread = getMyNotifications().filter(n => !n.read).length;
    if (unread > 0) {
      badge.textContent = unread > 99 ? '99+' : unread;
      badge.style.display = 'flex';
      bellBtn.classList.add('has-unread');
    } else {
      badge.style.display = 'none';
      bellBtn.classList.remove('has-unread');
    }
  }

  function toggleNotificationDrawer() {
    const drawer = document.getElementById('notif-drawer');
    const overlay = document.getElementById('notif-overlay');
    if (!drawer) return;
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
    } else {
      renderNotificationDrawer();
      drawer.classList.add('open');
      if (overlay) overlay.classList.add('open');
    }
  }

  function closeNotificationDrawer() {
    const drawer = document.getElementById('notif-drawer');
    const overlay = document.getElementById('notif-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  function timeAgo(isoString) {
    if (!isoString) return '';
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  function markNotificationRead(notifId) {
    const notif = (state.notifications || []).find(n => n.id === notifId);
    if (!notif) return;
    notif.read = true;
    saveState();
    updateNotificationBell();

    // Navigate to relevant project and chat tab if it's a message
    if (notif.projectId) {
      closeNotificationDrawer();
      openProject(notif.projectId);
      if (notif.type === 'chat_message' || notif.type === 'mention') {
        switchProjectTab('chats');
      }
    }
    renderNotificationDrawer();
  }

  function markAllNotificationsRead() {
    const mine = getMyNotifications();
    mine.forEach(n => { n.read = true; });
    saveState();
    updateNotificationBell();
    renderNotificationDrawer();
  }

  function renderNotificationDrawer() {
    const list = document.getElementById('notif-list');
    if (!list) return;

    let bannerHtml = '';
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        bannerHtml = `
          <div class="notif-permission-banner" id="notif-permission-banner">
            <span class="banner-text">🔔 <strong>Desktop Alerts</strong>: Get notified in other tabs</span>
            <button class="enable-notif-btn" onclick="window.App.requestBrowserNotificationPermission()">Enable</button>
          </div>`;
      } else if (Notification.permission === 'granted') {
        bannerHtml = `
          <div class="notif-permission-banner granted" id="notif-permission-banner">
            <span class="banner-text">✓ Desktop alerts enabled</span>
          </div>`;
      } else if (Notification.permission === 'denied') {
        bannerHtml = `
          <div class="notif-permission-banner denied" id="notif-permission-banner">
            <span class="banner-text">⚠️ Desktop alerts blocked in browser</span>
          </div>`;
      }
    }

    const mine = getMyNotifications();
    if (mine.length === 0) {
      list.innerHTML = bannerHtml + `
        <div class="notif-empty">
          <span style="font-size:2rem;">🔔</span>
          <p>You're all caught up!</p>
          <small>Notifications will appear here when you're assigned tasks, mentioned in chat, or receive project messages.</small>
        </div>`;
      return;
    }

    list.innerHTML = bannerHtml + mine.map(n => {
      const project = state.projects.find(p => p.id === n.projectId);
      const projectName = project ? project.name : 'Project';
      const isMention = n.type === 'mention';
      const isAllMention = isMention && n.message && n.message.includes('@all');

      let typeIconHtml = '';
      if (isAllMention) {
        typeIconHtml = `<span class="notif-type-icon notif-mention-icon all" title="@all broadcast mention">📢</span>`;
      } else if (isMention) {
        typeIconHtml = `<span class="notif-type-icon notif-mention-icon" title="Direct @mention">@</span>`;
      } else {
        const typeIcon = n.type === 'task_assigned' ? '📋' :
                         n.type === 'deadline_near' ? '⏰' :
                         n.type === 'project_broadcast' ? '📢' :
                         n.type === 'project_deleted' ? '⚠️' :
                         n.type === 'member_exited' ? '👋' :
                         n.type === 'chat_message' ? '💬' : '🔔';
        typeIconHtml = `<span class="notif-type-icon">${typeIcon}</span>`;
      }

      const mentionBadgeHtml = isAllMention
        ? `<span class="notif-mention-badge all">📢 @all</span>`
        : (isMention ? `<span class="notif-mention-badge">@mention</span>` : '');

      return `
        <div class="notif-item ${n.read ? '' : 'unread'} ${isMention ? 'notif-mention' : ''} ${isAllMention ? 'notif-mention-all' : ''}" onclick="window.App.markNotificationRead('${n.id}')">
          ${typeIconHtml}
          <div class="notif-content">
            <div class="notif-header-row">
              <p class="notif-message">${escapeHtml(n.message)}</p>
              ${mentionBadgeHtml}
            </div>
            <span class="notif-meta">${escapeHtml(projectName)} · ${timeAgo(n.createdAt)}</span>
          </div>
          ${!n.read ? '<span class="notif-dot"></span>' : ''}
        </div>`;
    }).join('');
  }

  // =========================================================
  // 13. MEMBER INVITATION SYSTEM (Past Collaborators, Link, Code)
  // =========================================================
  function openInviteModal(initialTabIndex = 0) {
    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project) return;

    // Set Share link & IDs
    const emailInput = document.getElementById('invite-email-input');
    const nameInput = document.getElementById('invite-name-input');
    const roleInput = document.getElementById('invite-role-input') || document.getElementById('invite-role-select');
    if (emailInput) emailInput.value = '';
    if (nameInput) nameInput.value = '';
    if (roleInput) roleInput.value = 'Member';

    const shareInput = document.getElementById('invite-share-link');
    const modalProjId = document.getElementById('invite-modal-project-id');
    const modalJoinCode = document.getElementById('invite-modal-join-code');

    if (shareInput) {
      shareInput.value = `https://pulsepm.io/join/${project.id}?code=${project.joinCode}`;
    }
    if (modalProjId) modalProjId.innerText = project.id;
    if (modalJoinCode) modalJoinCode.innerText = project.joinCode;

    // Render Past Collaborators
    renderPastCollaboratorsList(project);

    // Switch tab (options: email, past, link, code)
    const tabs = ['email', 'past', 'link', 'code'];
    switchInviteTab(tabs[initialTabIndex] || 'email');

    openModal('modal-invite-member');
  }

  function switchInviteTab(tabName) {
    document.querySelectorAll('.invite-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.inviteTab === tabName);
    });
    document.querySelectorAll('.invite-tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === 'invite-panel-' + tabName);
    });
  }

  // Method 2: Past Collaborators List
  function renderPastCollaboratorsList(project) {
    const listContainer = document.getElementById('past-collaborators-list');
    if (!listContainer) return;

    const actualCollaborators = getActualCollaborators();

    if (actualCollaborators.length === 0) {
      listContainer.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted);">
          <div style="font-size: 1.6rem; margin-bottom: 6px;">👥</div>
          <p style="margin: 0; font-weight: 500;">No previous collaborators found</p>
          <p style="margin: 4px 0 0 0; font-size: 0.85rem;">Invite members by sending them the join code or invite link above.</p>
        </div>
      `;
      return;
    }

    let html = '';
    actualCollaborators.forEach(collab => {
      const isAlreadyMember = project.members.some(m => m.email.toLowerCase() === collab.email.toLowerCase());

      html += `
        <div class="collaborator-item">
          <div class="collaborator-left">
            <div class="collaborator-avatar">${renderAvatarInnerHtml(collab.avatar, collab.name)}</div>
            <div class="collaborator-info">
              <strong>${escapeHtml(collab.name)}</strong>
              <span>${escapeHtml(collab.email)} • Previously on ${escapeHtml(collab.workedOn)}</span>
            </div>
          </div>
          <div>
            ${isAlreadyMember
              ? `<span class="badge badge-success" style="font-size: 0.75rem;">Already Added</span>`
              : `<button class="btn btn-secondary btn-xs" onclick="window.App.addPastCollaborator('${collab.id}')">+ Add to Project</button>`
            }
          </div>
        </div>
      `;
    });

    listContainer.innerHTML = html;
  }

  function addPastCollaborator(collaboratorOrId) {
    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project) return;

    let collab = null;
    if (typeof collaboratorOrId === 'object' && collaboratorOrId !== null) {
      collab = collaboratorOrId;
    } else {
      const actualCollaborators = getActualCollaborators();
      collab = actualCollaborators.find(c => c.id === collaboratorOrId);
    }
    if (!collab) return;

    if (project.members.some(m => m.email && collab.email && m.email.toLowerCase() === collab.email.toLowerCase())) {
      showToast('Already a member of this project!', 'info');
      return;
    }

    project.members.push({
      id: collab.id,
      name: collab.name,
      email: collab.email,
      phone: collab.phone || (collab.id && localStorage.getItem('pulsepm_custom_phone_' + collab.id)) || '',
      role: collab.role || 'Contributor',
      avatar: collab.avatar
    });

    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: `${state.currentUser.name} added ${collab.name} from past collaborators`,
      time: 'Just now',
      icon: 'member'
    });

    saveState();
    syncProjectToFirestore(project);
    renderPastCollaboratorsList(project);
    renderProjectDetail(project);
    showToast(`Added ${collab.name} to project!`, 'success');
  }

  // Method 1: Add/Invite Member directly by Email
  function handleAddEmailMember() {
    const project = state.projects.find(p => p.id === state.activeProjectId);
    if (!project) return;

    const emailInput = document.getElementById('invite-email-input');
    const nameInput = document.getElementById('invite-name-input');
    const roleInput = document.getElementById('invite-role-input') || document.getElementById('invite-role-select');

    if (!emailInput) return;
    const rawEmail = emailInput.value.trim();
    if (!rawEmail || !rawEmail.includes('@') || !rawEmail.includes('.')) {
      showToast('Please provide a valid email address.', 'error');
      return;
    }

    const email = rawEmail.toLowerCase();
    const role = (roleInput && roleInput.value && roleInput.value.trim()) || 'Member';
    const rawName = (nameInput && nameInput.value.trim()) || '';
    const name = rawName || email.split('@')[0];

    // Check if member already exists in project
    const existing = (project.members || []).find(m => m.email && m.email.trim().toLowerCase() === email);
    if (existing) {
      showToast(`${existing.name || email} is already a member of this project!`, 'info');
      return;
    }

    const initials = computeAvatarInitials(name);
    const newMember = {
      id: 'collab-' + Date.now(),
      name: name,
      email: email,
      phone: '',
      role: role,
      avatar: initials
    };

    project.members.push(newMember);

    project.activity.unshift({
      id: 'act-' + Date.now(),
      text: `${state.currentUser.name} added ${name} (${email}) as ${role}`,
      time: 'Just now',
      icon: 'member'
    });

    saveState();
    syncProjectToFirestore(project);

    // Reset inputs
    emailInput.value = '';
    if (nameInput) nameInput.value = '';

    // Re-render project views
    renderProjectDetail(project);
    renderPastCollaboratorsList(project);

    // If Firestore is available, look up if user with this email has an existing account with an avatar
    if (isFirebaseLive && firebaseDb && email) {
        let q = firebaseDb.collection('users').where('email', '==', email.toLowerCase());
        if (typeof q.limit === 'function') q = q.limit(1);
        if (typeof q.get === 'function') {
          q.get().then(snap => {
            if (snap && !snap.empty && snap.docs && snap.docs[0]) {
              const uData = typeof snap.docs[0].data === 'function' ? snap.docs[0].data() : null;
              if (uData && (uData.avatar || uData.name)) {
                if (uData.avatar) newMember.avatar = uData.avatar;
                if (uData.name || uData.displayName) newMember.name = uData.name || uData.displayName;
                if (uData.uid) newMember.id = uData.uid;
                saveState();
                syncProjectToFirestore(project);
                if (state.activeProjectId === project.id) {
                  renderProjectDetail(project);
                }
              }
            }
          }).catch(err => {
            console.warn('Could not check user avatar for new member:', err);
          });
        }
    }

    showToast(`Added ${name} (${email}) to project! When they log in with this email, the project will automatically show on their dashboard.`, 'success');
  }

  // Method 3 & 4: Copy to clipboard helper
  function copyText(text, label = 'Text') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`📋 Copied ${label} to clipboard!`, 'success');
      }).catch(() => {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  }

  function fallbackCopy(text, label) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`📋 Copied ${label} to clipboard!`, 'success');
    } catch (err) {
      showToast('Could not copy text automatically.', 'error');
    }
    document.body.removeChild(textArea);
  }

  // =========================================================
  // 13. JOIN PROJECT WITH CODE MODAL
  // =========================================================
  function openJoinWithCodeModal() {
    closeProfileMenu();
    openModal('modal-join-project');
  }

  function handleJoinProjectWithCode() {
    const idInput = document.getElementById('join-project-id-input');
    const codeInput = document.getElementById('join-project-code-input');

    const enteredId = idInput.value.trim().toUpperCase();
    const enteredCode = codeInput.value.trim();

    if (!enteredId || !enteredCode) {
      showToast('Please enter both Project ID and Join Code.', 'error');
      return;
    }

    const normCode = enteredCode.replace(/\s+/g, '');

    function completeJoin(project) {
      const currentEmail = getCurrentUserEmail();
      const currentUserId = state.currentUser ? (state.currentUser.id || state.currentUser.uid) : '';

      if (!project.members) project.members = [];
      const isAlreadyMember = project.members.some(m =>
        (m.id && currentUserId && m.id === currentUserId) ||
        (m.email && currentEmail && m.email.trim().toLowerCase() === currentEmail.toLowerCase())
      );

      if (!isAlreadyMember) {
        project.members.push({
          id: currentUserId,
          name: state.currentUser.name,
          email: currentEmail,
          phone: state.currentUser.phone || (currentUserId && localStorage.getItem('pulsepm_custom_phone_' + currentUserId)) || '',
          role: 'Contributor',
          avatar: state.currentUser.avatar || computeAvatarInitials(state.currentUser.name)
        });
        if (!project.activity) project.activity = [];
        project.activity.unshift({
          id: 'act-' + Date.now(),
          text: `${state.currentUser.name} joined the project via Join Code`,
          time: 'Just now',
          icon: 'member'
        });
      }

      const existingIdx = state.projects.findIndex(p => p.id === project.id);
      if (existingIdx !== -1) {
        state.projects[existingIdx] = project;
      } else {
        state.projects.unshift(project);
      }

      saveState();
      syncProjectToFirestore(project);

      closeModal('modal-join-project');
      idInput.value = '';
      codeInput.value = '';

      showToast(`Successfully joined "${project.name}"!`, 'success');
      openProject(project.id);
    }

    // 1. Check local state first
    const targetProject = state.projects.find(p =>
      p.id.toUpperCase() === enteredId &&
      (p.joinCode || '').replace(/\s+/g, '') === normCode
    );

    if (targetProject) {
      completeJoin(targetProject);
      return;
    }

    // 2. Query Cloud Firestore if not found locally
    if (isFirebaseLive && firebaseDb) {
      firebaseDb.collection('projects').doc(enteredId).get().then(docSnap => {
        if (docSnap && docSnap.exists) {
          const cloudProj = docSnap.data();
          if (cloudProj && (cloudProj.joinCode || '').replace(/\s+/g, '') === normCode) {
            completeJoin(cloudProj);
            return;
          }
        }
        showToast('Invalid Project ID or 6-digit Join Code. Please try again.', 'error');
      }).catch(err => {
        console.warn('Firestore join query error:', err);
        showToast('Invalid Project ID or 6-digit Join Code. Please try again.', 'error');
      });
      return;
    }

    showToast('Invalid Project ID or 6-digit Join Code. Please try again.', 'error');
  }

  // =========================================================
  // 14. PROFILE & SETTINGS MODALS
  // =========================================================
  function openProfileModal() {
    closeProfileMenu();
    cancelEditProfileName();
    cancelEditProfilePhone();
    updateNavigationUser();
    openModal('modal-profile');
  }

  function openSetPhotoModal() {
    const user = state.currentUser;
    if (user) {
      const setPhotoPreview = document.getElementById('set-photo-current-avatar');
      const setPhotoName = document.getElementById('set-photo-user-name');
      if (setPhotoPreview) setAvatarElementContent(setPhotoPreview, user.avatar, user.name);
      if (setPhotoName) setPhotoName.innerText = user.name || 'User';
      renderPresetAvatars();
    }
    openModal('modal-set-photo');
  }

  function enableEditProfileName() {
    const displayWrap = document.getElementById('profile-name-display-wrap');
    const editWrap = document.getElementById('profile-name-edit-wrap');
    const input = document.getElementById('profile-name-input');
    if (displayWrap) displayWrap.style.display = 'none';
    if (editWrap) editWrap.style.display = 'block';
    if (input) {
      input.value = (state.currentUser && state.currentUser.name) || '';
      input.focus();
      input.select();
    }
  }

  function cancelEditProfileName() {
    const displayWrap = document.getElementById('profile-name-display-wrap');
    const editWrap = document.getElementById('profile-name-edit-wrap');
    if (displayWrap) displayWrap.style.display = 'flex';
    if (editWrap) editWrap.style.display = 'none';
  }

  function handleSaveProfileName() {
    const input = document.getElementById('profile-name-input');
    if (!input) return;
    const newName = input.value.trim();
    if (!newName) {
      showToast('Please enter a valid name.', 'error');
      return;
    }

    const curAvatar = (state.currentUser && state.currentUser.avatar) || '';
    const isCustomOrPreset = curAvatar && (
      curAvatar.startsWith('data:') ||
      curAvatar.startsWith('http') ||
      PRESET_AVATARS.includes(curAvatar)
    );
    const avatar = isCustomOrPreset ? curAvatar : computeAvatarInitials(newName);
    applyUserNameUpdate(newName, avatar);
    cancelEditProfileName();

    const currentUid = (firebaseAuth && firebaseAuth.currentUser && firebaseAuth.currentUser.uid) ||
                      (state.currentUser && (state.currentUser.id || state.currentUser.uid));
    const currentEmail = (
      (state.currentUser && state.currentUser.identities && state.currentUser.identities.email) ||
      (state.currentUser && state.currentUser.email) ||
      (firebaseAuth && firebaseAuth.currentUser && firebaseAuth.currentUser.email) ||
      ''
    ).trim().toLowerCase();

    // 1. Update Firebase Auth displayName
    if (isFirebaseLive && firebaseAuth && firebaseAuth.currentUser) {
      if (typeof firebaseAuth.currentUser.updateProfile === 'function') {
        firebaseAuth.currentUser.updateProfile({
          displayName: newName
        }).then(() => {
          console.log('Firebase Auth profile displayName updated:', newName);
        }).catch(err => {
          console.warn('Firebase Auth updateProfile error:', err);
        });
      }
    }

    // 2. Persist to Cloud Firestore under users/{uid}
    if (isFirebaseLive && firebaseDb && currentUid) {
      firebaseDb.collection('users').doc(currentUid).set({
        uid: currentUid,
        name: newName,
        displayName: newName,
        avatar: avatar,
        email: currentEmail,
        updatedAt: new Date().toISOString()
      }, { merge: true }).then(() => {
        console.log('Firestore user record updated with custom name:', newName);
      }).catch(err => {
        console.warn('Firestore user update error:', err);
      });
    }

    showToast(`Name updated to "${newName}"!`, 'success');
  }

  function enableEditProfilePhone() {
    const displayWrap = document.getElementById('profile-phone-display-wrap');
    const editWrap = document.getElementById('profile-phone-edit-wrap');
    const input = document.getElementById('profile-phone-input');
    if (displayWrap) displayWrap.style.display = 'none';
    if (editWrap) editWrap.style.display = 'block';
    if (input) {
      const user = state.currentUser;
      const uid = (user && (user.id || user.uid)) || (firebaseAuth && firebaseAuth.currentUser && firebaseAuth.currentUser.uid);
      const userEmailKey = user && user.email ? user.email.toLowerCase() : '';
      const isDemoUser = (!isFirebaseLive && (!user || user.id === 'demo' || !user.email));
      const currentPhone = (uid && localStorage.getItem('pulsepm_custom_phone_' + uid)) ||
                           (userEmailKey && localStorage.getItem('pulsepm_custom_phone_' + userEmailKey)) ||
                           (isDemoUser && localStorage.getItem('pulsepm_custom_phone_demo')) ||
                           (user && user.phone) ||
                           (user && user.identities && user.identities.phone) ||
                           '';
      input.value = currentPhone;
      input.focus();
      input.select();
    }
  }

  function cancelEditProfilePhone() {
    const displayWrap = document.getElementById('profile-phone-display-wrap');
    const editWrap = document.getElementById('profile-phone-edit-wrap');
    if (displayWrap) displayWrap.style.display = 'block';
    if (editWrap) editWrap.style.display = 'none';
  }

  function handleSaveProfilePhone() {
    const input = document.getElementById('profile-phone-input');
    if (!input) return;
    const newPhone = input.value.trim();

    if (newPhone && newPhone.length < 7) {
      showToast('Please enter a valid phone number (at least 7 digits).', 'error');
      return;
    }

    const currentUid = (firebaseAuth && firebaseAuth.currentUser && firebaseAuth.currentUser.uid) ||
                      (state.currentUser && (state.currentUser.id || state.currentUser.uid));

    if (state.currentUser) {
      state.currentUser.phone = newPhone;
      if (!state.currentUser.identities) state.currentUser.identities = {};
      state.currentUser.identities.phone = newPhone;
    }

    if (currentUid) {
      localStorage.setItem('pulsepm_custom_phone_' + currentUid, newPhone);
    }
    if (state.currentUser && state.currentUser.email) {
      localStorage.setItem('pulsepm_custom_phone_' + state.currentUser.email.toLowerCase(), newPhone);
    }
    if (!isFirebaseLive && (!state.currentUser || state.currentUser.id === 'demo' || !state.currentUser.email)) {
      localStorage.setItem('pulsepm_custom_phone_demo', newPhone);
    } else {
      try { localStorage.removeItem('pulsepm_custom_phone_demo'); } catch(e){}
    }

    // Persist to Cloud Firestore under users/{uid}
    if (isFirebaseLive && firebaseDb && currentUid) {
      firebaseDb.collection('users').doc(currentUid).set({
        phone: newPhone,
        updatedAt: new Date().toISOString()
      }, { merge: true }).then(() => {
        console.log('Firestore user record updated with phone:', newPhone);
      }).catch(err => {
        console.warn('Firestore phone update error:', err);
      });
    }

    // Update phone on current user's entry across all project rosters and sync to Firestore
    (state.projects || []).forEach(project => {
      let memberUpdated = false;
      (project.members || []).forEach(m => {
        const isSelf = (m.id && currentUid && m.id === currentUid) ||
                       (m.email && state.currentUser && state.currentUser.email && m.email.toLowerCase() === state.currentUser.email.toLowerCase());
        if (isSelf) {
          m.phone = newPhone;
          memberUpdated = true;
        }
      });
      if (memberUpdated) {
        syncProjectToFirestore(project);
      }
    });

    cancelEditProfilePhone();
    updateNavigationUser();
    saveState();
    if (newPhone) {
      showToast('📞 Phone number saved to your profile!', 'success');
    } else {
      showToast('Phone number removed from your profile.', 'info');
    }
  }

  function openProfilePasswordModal() {
    const user = state.currentUser;
    const uid = (user && (user.id || user.uid)) || (firebaseAuth && firebaseAuth.currentUser && firebaseAuth.currentUser.uid);
    const userEmail = (user && ((user.identities && user.identities.email) || user.email)) ||
                      (firebaseAuth && firebaseAuth.currentUser && firebaseAuth.currentUser.email) ||
                      'your account email';

    const isDemoUser = (!isFirebaseLive && (!user || user.id === 'demo' || !user.email));
    const userEmailKey = user && user.email ? user.email.toLowerCase() : '';
    const hasPasswordSet = (uid && localStorage.getItem('pulsepm_pwd_set_' + uid)) ||
                           (userEmailKey && localStorage.getItem('pulsepm_pwd_set_' + userEmailKey)) ||
                           (isDemoUser && localStorage.getItem('pulsepm_pwd_set_demo')) ||
                           (user && user.hasPasswordSet);

    const titleEl = document.getElementById('modal-password-title');
    const subEl = document.getElementById('modal-password-sub');
    const alertEl = document.getElementById('setup-password-info-alert');
    const btnSave = document.getElementById('btn-save-password');

    if (titleEl) {
      titleEl.innerText = hasPasswordSet ? 'Change Account Password' : 'Add Account Password';
    }
    if (subEl) {
      subEl.innerText = hasPasswordSet ? 'Update your password for email sign-in' : 'Log in using either Google or your email & password';
    }
    if (alertEl) {
      alertEl.innerHTML = hasPasswordSet
        ? `🔐 Enter a new password for your account (<strong>${escapeHtml(userEmail)}</strong>).`
        : `👋 Create a password now so you can also sign in anytime using your email: <strong>${escapeHtml(userEmail)}</strong>`;
    }
    if (btnSave) {
      btnSave.innerText = hasPasswordSet ? 'Update Password' : 'Save Password';
    }

    openFirstTimePasswordModal(userEmail);
  }

  function openSettingsModal() {
    closeProfileMenu();
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.innerHTML = state.theme === 'dark' ? '<span>☀️ Light Mode</span>' : '<span>🌙 Dark Mode</span>';
    }
    const chatBotCheckbox = document.getElementById('setting-chat-bot');
    if (chatBotCheckbox) {
      chatBotCheckbox.checked = Boolean(state.enableChatBot);
    }
    openModal('modal-settings');
  }

  function handleToggleChatBot(checked) {
    state.enableChatBot = Boolean(checked);
    localStorage.setItem('pulsepm_chatbot_explicit_config', 'true');
    saveState();
    showToast(state.enableChatBot ? 'Simulated teammate responses enabled.' : 'Simulated teammate responses disabled.', 'info');
  }

  function handleSaveSettings() {
    const chatBotCheckbox = document.getElementById('setting-chat-bot');
    if (chatBotCheckbox) {
      state.enableChatBot = Boolean(chatBotCheckbox.checked);
      localStorage.setItem('pulsepm_chatbot_explicit_config', 'true');
    }
    saveState();
    closeModal('modal-settings');
    showToast('Settings saved successfully.', 'success');
  }

  function toggleTheme() {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    saveState();
    showToast(`Switched to ${nextTheme} theme`, 'info');
  }

  function resetDemoData() {
    if (confirm('Reset workspace to initial demo projects and tasks? This will restore original seed data.')) {
      state.projects = JSON.parse(JSON.stringify(INITIAL_PROJECTS));
      state.collaborators = JSON.parse(JSON.stringify(PAST_COLLABORATORS));
      state.currentUser = JSON.parse(JSON.stringify(UNIFIED_USER));
      state.enableChatBot = false;
      localStorage.removeItem('pulsepm_chatbot_explicit_config');
      saveState();
      closeAllModals();
      navigateToHome();
      showToast('Demo data restored successfully!', 'success');
    }
  }

  // =========================================================
  // 15. MODAL MANAGEMENT & TOAST UTILITIES
  // =========================================================
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      // Auto-focus first input
      const firstInput = modal.querySelector('input:not([readonly]), textarea, select');
      if (firstInput) setTimeout(() => firstInput.focus(), 50);
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${escapeHtml(message)}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 300);
    }, 3200);
  }

  function handleGlobalSearch(query) {
    state.globalSearchQuery = query;
    renderProjectGroups();
  }

  function updateWorkspaceConnectivity(isOnline) {
    const dot = document.getElementById('workspace-status-dot');
    const pill = document.getElementById('workspace-status-pill');
    const text = document.getElementById('workspace-status-text');

    const online = (typeof isOnline === 'boolean')
      ? isOnline
      : (typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine : true);

    if (dot) {
      dot.className = online ? 'status-dot live' : 'status-dot offline';
    }
    if (pill) {
      pill.title = online
        ? 'Workspace Status: Online & Connected'
        : 'Workspace Status: Offline (No internet connection)';
      pill.classList.toggle('offline', !online);
    }
    if (text) {
      text.innerText = online ? 'Global Workspace' : 'Global Workspace (Offline)';
    }
  }

  // Helper date formatting
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[parseInt(parts[1], 10) - 1] || parts[1];
    return `${month} ${parseInt(parts[2], 10)}, ${parts[0]}`;
  }

  function calculateDaysRemaining(deadlineStr) {
    const now = new Date();
    const deadline = new Date(deadlineStr);
    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days remaining`;
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================
  // 16. EVENT LISTENERS & BOOTSTRAP
  // =========================================================
  document.addEventListener('DOMContentLoaded', () => {
    loadState();

    // Close dropdown menu when clicking outside
    document.addEventListener('click', (e) => {
      const toggleBtn = document.getElementById('profile-toggle-btn');
      const dropdown = document.getElementById('profile-dropdown');
      if (dropdown && dropdown.classList.contains('open')) {
        if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
          closeProfileMenu();
        }
      }

      // Close project settings dropdown when clicking outside
      const projectSettingsWrapper = document.getElementById('project-settings-menu-wrapper');
      if (projectSettingsWrapper && !projectSettingsWrapper.contains(e.target)) {
        closeProjectSettingsDropdown();
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllModals();
        closeProfileMenu();
        closeProjectSettingsDropdown();
      }
    });

    // Close modals when clicking backdrop
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove('open');
        }
      });
    });

    // Auth tab switching
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.authTab;
        document.querySelectorAll('.auth-tab-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        document.querySelectorAll('.auth-tab-panel').forEach(p => p.classList.remove('active'));
        const activePanel = document.getElementById('auth-tab-content-' + tab);
        if (activePanel) activePanel.classList.add('active');
      });
    });

    // Initialize Firebase Backend (if configured)
    initFirebaseBackend();

    // Initialize View
    if (state.isLoggedIn) {
      document.getElementById('auth-view').style.display = 'none';
      document.getElementById('main-app').style.display = 'flex';
      updateNavigationUser();
      navigateToHome();
      checkDeadlineNotifications();
      updateNotificationBell();
    } else {
      document.getElementById('auth-view').style.display = 'flex';
      document.getElementById('main-app').style.display = 'none';
    }

    // Chat @Mention Autocomplete event listeners
    const chatInput = document.getElementById('chat-message-input');
    if (chatInput) {
      chatInput.addEventListener('input', () => {
        checkMentionAutocomplete();
      });
      chatInput.addEventListener('keyup', (e) => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter' && e.key !== 'Tab' && e.key !== 'Escape') {
          checkMentionAutocomplete();
        }
      });
      chatInput.addEventListener('keydown', handleChatKeyDown);
      chatInput.addEventListener('click', () => {
        checkMentionAutocomplete();
      });
    }

    // Close mention popup when clicking outside
    document.addEventListener('click', (e) => {
      const popup = document.getElementById('chat-mention-popup');
      const input = document.getElementById('chat-message-input');
      if (popup && popup.style.display !== 'none') {
        if (!popup.contains(e.target) && e.target !== input) {
          hideMentionPopup();
        }
      }
    });

    // Workspace Network Connectivity Monitor
    window.addEventListener('online', () => {
      updateWorkspaceConnectivity(true);
      showToast('🟢 Back online! Workspace connected.', 'success');
    });

    window.addEventListener('offline', () => {
      updateWorkspaceConnectivity(false);
      showToast('🔴 You are offline. Workspace changes will sync when reconnected.', 'warning');
    });

    updateWorkspaceConnectivity();
  });

  // Expose public API on window.App
  window.App = {
    updateWorkspaceConnectivity,
    handleGmailLogin,
    handlePhoneSendOtp,
    backToPhoneInput,
    handlePhoneVerifyOtp,
    handleGoogleLogin,
    handleLogout,
    navigateToHome,
    openProject,
    switchProjectTab,
    toggleProfileMenu,
    closeProfileMenu,
    scrollToSection,
    filterPendingTasks,
    filterProjectGroups,
    renderGroupFilterPills,
    filterProjectTasks,
    filterProjectTasksByStatus,
    filterMyProjectTasks,
    filterMyTasksByStatus,
    toggleTaskComplete,
    changeTaskStatus,
    handleSendMessage,
    openCreateProjectModal,
    handleCreateProject,
    openCreateTaskModal,
    handleCreateTask,
    openInviteModal,
    switchInviteTab,
    addPastCollaborator,
    copyText,
    openJoinWithCodeModal,
    handleJoinProjectWithCode,
    openProfileModal,
    enableEditProfileName,
    cancelEditProfileName,
    handleSaveProfileName,
    enableEditProfilePhone,
    cancelEditProfilePhone,
    handleSaveProfilePhone,
    openProfilePasswordModal,
    applyUserNameUpdate,
    computeAvatarInitials,
    openSettingsModal,
    toggleTheme,
    resetDemoData,
    openModal,
    closeModal,
    handleGlobalSearch,
    toggleSpecialAssigner,
    toggleSpecialAssignerField,
    renderSpecialAssignersCreationList,
    getActualCollaborators,
    toggleNotificationDrawer,
    closeNotificationDrawer,
    markNotificationRead,
    markAllNotificationsRead,
    requestBrowserNotificationPermission,
    sendDesktopNotification,
    openFirebaseHelpModal,
    openFirstTimePasswordModal,
    handleSaveFirstTimePassword,
    filterProjectTeam,
    handleRemoveProjectMember,
    renderProjectTeam,
    openEditMemberRoleModal,
    handleSaveMemberRole,
    openMemberContactModal,
    startChatWithMember,
    openBroadcastUpdateModal,
    handleSendBroadcastUpdate,
    openDeleteProjectModal,
    handleConfirmDeleteProject,
    openExitProjectModal,
    handleConfirmExitProject,
    isProjectOwner,
    openTaskDetailModal,
    toggleSubtask,
    handleAddSubtaskSubmit,
    handleDeleteSubtask,
    handleAddTaskCommentSubmit,
    handleDetailStatusChange,
    isTaskAssignee,
    syncProjectToFirestore,
    deleteProjectFromFirestore,
    setupProjectsFirestoreSync,
    checkMentionAutocomplete,
    hideMentionPopup,
    selectMentionItem,
    setMentionHoverIndex,
    formatChatMentions,
    mentionState,
    handleToggleChatBot,
    handleSaveSettings,
    isCurrentChatOpen,
    clearChatNotificationsForProject,
    renderNotificationDrawer,
    createNotification,
    getMyNotifications,
    getUnseenChatCount,
    markProjectChatsAsSeen,
    updateChatTabBadge,
    isChatSeenByUser,
    getActiveProject,
    updateTaskTabBadges,
    assignTaskToMyself,
    reassignTask,
    canUserAssignOthers,
    getProjectMemberForUser,
    isTaskAssignedToUser,
    handleAddEmailMember,
    computeMemberPerformanceScores,
    renderProjectLeaderboard,
    switchLeaderboardFilter,
    canUserViewRankings,
    formatVisibilityName,
    openRankingsVisibilityModal,
    toggleRankingsVisMemberList,
    handleSaveRankingsVisibility,
    toggleCreateRankingsViewerField,
    renderCreateRankingsViewersList,
    renderProjectOverview,
    renderProjectDetail,
    canUserChangeTaskStatus,
    renderMemberTaskCompletionDonut,
    highlightDonutMember,
    openMemberDonutModal,
    openSetPhotoModal,
    openAssignmentPolicyModal,
    toggleAssignPolicyMemberList,
    handleSaveAssignmentPolicy,
    handleProfilePhotoSelected,
    selectPresetAvatar,
    resetAvatarToInitials,
    renderPresetAvatars,
    compressAndCropImage,
    renderAvatarInnerHtml,
    setAvatarElementContent,
    applyUserAvatarUpdate,
    PRESET_AVATARS,
    syncProjectMemberAvatarsFromFirestore,
    isProjectCreator,
    openEditProjectDetailModal,
    toggleEditProjectAssignPolicy,
    toggleEditProjectRankingsVis,
    handleSaveProjectDetail,
    toggleProjectSettingsDropdown,
    closeProjectSettingsDropdown,
    renderTaskCards,
    canUserDeleteTask,
    deleteCurrentOpenTask,
    confirmDeleteTask,
    executeDeleteTask,
    deleteTask,
    showTaskDeletePermissionWarning,
    state
  };

})();
