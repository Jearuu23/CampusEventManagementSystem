# ACTIVO: A Gamified Campus Event Management System

ACTIVO is a comprehensive, gamified platform designed to revolutionize campus event management. It bridges the gap between event organizers, academic departments, and students by providing a centralized hub for discovering, registering, and managing campus events. To drive maximum student engagement, ACTIVO incorporates a powerful gamification system where students earn points by participating in events, which can then be redeemed for exclusive campus rewards.

## 🎯 Core Features & Functions

- **Event Discovery & Registration:** Students can easily browse upcoming campus events, view details, and register with a single click.
- **Event Management:** Organizers can seamlessly create, update, and manage events, including setting capacities, locations, and schedules.
- **Gamification & Reward System:** Organizers can assign point values to events and create custom rewards. Participants earn points upon successful attendance and can redeem them for rewards (e.g., University Merch, Food Vouchers, Priority Seating).
- **Code Verification:** Organizers have a built-in verification system to validate participant attendance and process reward redemptions.
- **Participant Tracking:** Real-time dashboards allow organizers to manage attendee lists, track statuses (pending, approved, attended), and measure event success.
- **Role-Based Access Control:** Secure, segregated interfaces and permissions for Students/Participants, Organizers, and Administrators.

## 🧩 System Modules

The system is divided into three primary modules tailored to specific user roles:

### 1. Public / Student Module

- **Event Catalog:** Browse all active and upcoming campus events.
- **Student Dashboard:** Track registered events, point balances, and past participation.
- **Rewards Store:** View available rewards for various events and spend earned points.
- **Profile Management:** Manage account details and academic organization affiliations.

### 2. Organizer Module

- **Event Dashboard:** Create new events, define start/end times, and set maximum participants.
- **Participant Management:** View, approve, or reject student registrations.
- **Reward Issuance:** Add custom rewards for specific events and assign point values to them.
- **Verification Terminal:** Verify student redemption codes securely during or after the event.

### 3. Administrator Module (Admin)

- **Global Oversight:** View all system activities, events, and user accounts.
- **Event Moderation:** Approve or reject events submitted by organizers to ensure campus guidelines are met.
- **System Analytics:** Track platform engagement, most popular events, and reward redemption rates.

## 📂 Project Structure

The project follows a decoupled Full-Stack architecture, separating the React frontend from the PHP backend.

```text
CEMS/
├── backend/                      # PHP Backend & API
│   ├── api/                      # RESTful API Endpoints (events, users, auth, rewards)
│   ├── core/                     # Core system configurations (Headers, CORS, Auth checks)
│   ├── database/                 # Database connection config
│   │   ├── migrations/           # SQL files to create tables (e.g., users, events, rewards)
│   │   └── seeds/                # SQL files to populate initial/dummy data
│   ├── helpers/                  # Utility functions (e.g., validation, JWT)
│   └── logging/                  # System logging mechanisms
│
└── frontend/                     # React / React Router Frontend
    ├── app/
    │   ├── api/                  # API integration functions (Fetch wrappers for backend)
    │   ├── components/           # Reusable UI components (Notifications, Buttons, Cards)
    │   ├── contexts/             # Global React Contexts (AuthContext)
    │   ├── pages/                # Page layouts broken down by module
    │   │   ├── admin/            # Administrator views
    │   │   ├── organizer/        # Organizer views (Manage events, Verification)
    │   │   └── public/           # Student/Public views (About, Catalog)
    │   ├── schemas/              # Zod validation schemas
    │   ├── types/                # TypeScript interfaces and type definitions
    │   └── utils/                # Helper utilities (Image formatting, date formatting)
    ├── public/                   # Static assets (Images, Icons)
    └── package.json              # Frontend dependencies and scripts
```

## 🚀 How to Use / Getting Started

### Prerequisites

- **XAMPP / WAMP:** (or any local server environment supporting PHP and MySQL)
- **Node.js & npm:** (v18 or higher recommended)

### 1. Backend Setup (Database & API)

1. Start **Apache** and **MySQL** from your XAMPP Control Panel.
2. Open phpMyAdmin (`http://localhost/phpmyadmin`) and create a new database named `cems_db` (or as configured in `backend/database/db.php`).
3. Import the SQL migration files located in `backend/database/migrations/` in numerical order (001 to 005) to generate the tables.
4. _(Optional)_ Import the seed files in `backend/database/seeds/` to populate the application with testing data.
5. Ensure your backend is accessible via `http://localhost/CEMS/backend/`.

### 2. Frontend Setup

1. Open a terminal and navigate to the frontend directory:
    ```bash
    cd CEMS/frontend
    ```
2. Install all required dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```
4. Your application should now be running. Open `http://localhost:5173` in your browser.

---

_ACTIVO is actively developed to enhance student life and streamline organizational workflows within the university environment._
