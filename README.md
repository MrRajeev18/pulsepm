# PulsePM — Unified Project Management Platform

A modern, responsive, and full-featured Project Management Web Application designed for fast collaboration, unified multi-channel identity, project milestones, task management, and team communication.

---

## 🌟 Key Features

### 1. Unified Multi-Method Authentication
- **Starting Page**: Clean, branded Login portal.
- **Three Sign-In Channels**:
  - **Gmail / Email**: Direct email + password authentication.
  - **Phone Number**: International phone number with simulated 6-digit SMS OTP verification.
  - **Google Account**: One-click Google Identity OAuth sign-in.
- **Unified Identity System**: All three sign-in routes map into the **same unified account** (`Alex Morgan`). Logging in through any method connects to the exact same projects, pending tasks, and settings—no disjoint duplicate profiles.
- **Linked Accounts Inspector**: In the Profile modal, view verified status of Gmail, Phone, and Google credentials.

### 2. Home Screen & Dashboard
- **Welcome & Stats Bar**: Real-time counter of total Project Groups, My Pending Tasks, Completed Tasks, and Active Collaborators.
- **"My Pending Tasks" Section**:
  - Automatically aggregates all pending deliverables assigned to the user across all active project groups.
  - Interactive checkboxes allow completing tasks directly from the home screen.
  - Displays project group badge, priority indicator (`Urgent`, `High`, `Medium`, `Low`), and deadline tracking.
  - Filters for *All Pending*, *High Priority*, and *Urgent*.
- **"Project Groups" Section**:
  - Project cards categorized by group (`Engineering`, `Product & Design`, `Marketing & Growth`, etc.).
  - Shows start date, deadline countdown, progress bar (% completed tasks), team member avatar stack, and quick navigation.
- **Top-Right Corner Toggle Menu**:
  - Clicking the user profile avatar toggle button opens an interactive menu with:
    - 👤 **Profile & Linked Accounts**
    - ⚙️ **Settings & Appearance** (Dark/Light theme toggle, simulated teammate reply toggle, data reset)
    - 📁 **Projects** (quick scroll & filter)
    - 📋 **Tasks** (shows live pending count badge & quick scroll)
    - ➕ **Create Project** (opens creation modal)
    - 🚪 **Log Out** (returns to Login screen)

### 3. Create Project Modal
- Fields:
  - **Project Name** (e.g., "Mobile Banking App Redesign")
  - **Project Group / Category** (Engineering, Product & Design, Marketing, etc.)
  - **Description** (scope and deliverables)
  - **Start Date** & **Deadline** (calendar pickers with date validation)
- Creates the project, generates a unique Project ID (e.g. `PRJ-4812`) and 6-digit Join Code (e.g. `749-218`), sets the creator as Owner/Lead, and immediately opens the new project panel.

### 4. Project Detail Panel (Tabbed Workspace)
- **Overview Tab**:
  - High-level scope summary, overall completion meter, and milestone metrics.
  - Team Members roster displaying roles (`Owner`, `Lead`, `Contributor`, `Viewer`).
  - Project Activity feed logging task updates, member invites, and completions.
  - Quick Join Codes card.
- **Tasks Tab**:
  - Kanban board with columns: `Pending / To Do`, `In Progress`, and `Completed`.
  - Filter by search query or status pills.
  - "+ New Task" modal: Title, description, priority, due date, and member assignment dropdown.
  - Status change dropdown on every card with real-time recalculation of project progress.
- **Chats Tab**:
  - Project team channel (`# project-general`).
  - Message stream with sender avatars, names, timestamps, and styled message bubbles.
  - Interactive composer with optional simulated responses from project teammates.

### 5. 4-Channel Member Invitation System
- **Channel 1 — Gmail / Email**: Send an invitation to a colleague's email and assign their project role.
- **Channel 2 — Past Collaborators**: Browse teammates you have worked with previously across projects and add them with 1 click.
- **Channel 3 — Sharable Link**: Generates a unique, copyable join link with one-click clipboard copy and toast notification.
- **Channel 4 — Project ID & Join Code**: Displays the project's unique ID and 6-digit Join Code. Companion "Join with Code" button in the header enables any user to enter the code and join immediately.

---

## 🚀 How to Run

### Method 1: Open Directly in Any Web Browser (Zero Setup)
Simply double-click `index.html` or run:
```bash
open index.html
```

### Method 2: Run via Local Ruby Server
A lightweight server script using macOS's built-in Ruby WEBrick is included:
```bash
ruby server.rb
```
Then open `http://localhost:3000` in your web browser.

---

## 📁 Directory Structure
```
project-management-app/
├── index.html       # Semantic HTML5 layout, auth portal, dashboard, project panel, modals
├── styles.css       # Responsive CSS design system, dark/light theme, kanban, chat styles
├── app.js           # Modular state store, unified auth, controllers, 4-way invites, seed data
├── server.rb        # Ruby WEBrick server script
└── README.md        # Documentation and guide
```

---

## 💡 Setting the Active Workspace
To set this folder as your active workspace in Antigravity:
1. Open the File / Workspace menu in Antigravity.
2. Select **Open Folder...**
3. Choose `/Users/rajeev/.gemini/antigravity/scratch/project-management-app`
