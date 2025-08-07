### **Prompt for a Mobile-First React Admin Dashboard**
Project Goal:
Create a professional, mobile-first, and fully responsive admin dashboard application using React, TypeScript, and Vite. This frontend will serve as the administrative interface for a Spring Boot backend that features a dynamic, database-driven system for managing users, roles, and permissions via a secure REST API with JWT authentication.

Core Technologies:

Framework/Tooling: Vite, React 18+, TypeScript.
Styling: Tailwind CSS for a utility-first, mobile-first approach. This allows for highly customizable and responsive designs without being locked into a specific component style.
Component Library: A headless UI library like Radix UI or a Tailwind-native library like Flowbite React to build accessible and customizable components (modals, dropdowns, forms, etc.).
Routing: React Router DOM v6 for declarative, client-side routing.
Data Fetching & State Management: TanStack Query (formerly React Query) to manage server state, including caching, refetching, and mutations for all CRUD operations. This simplifies data synchronization and handling of loading/error states.
API Client: Axios, configured with interceptors to automatically manage JWTs from sessionStorage for all authenticated API requests.
Forms: React Hook Form for performant and flexible form creation and validation.
Notifications: React Toastify or a similar library for providing non-intrusive user feedback for actions like successful updates or errors.
Design Principles:

Mobile-First: The layout must be designed for small screens first and then scaled up for tablets and desktops. On mobile, content should be stacked vertically, and navigation should be easily accessible.
Responsive: The application must adapt gracefully to all screen sizes. This includes responsive tables that transform into card lists on mobile, and navigation that changes form (e.g., from a full sidebar to a hamburger menu).
Clean & Modern UI: The design should be clean, intuitive, and professional, with a focus on usability and clarity.
Navigation Structure:

Desktop View (Tablet and larger): A persistent, collapsible sidebar on the left containing links to "Dashboard," "User Management," and "Role Management."
Mobile View: The sidebar should be hidden by default and accessible via a "hamburger" menu icon in the header. The header should be fixed at the top and also display the current page title and a user profile icon.
Key Features & Pages:

Authentication Flow:

A centered, clean Login Page (/login) that is publicly accessible.
Upon successful login, the JWT received from the backend is stored in sessionStorage.
The user is redirected to the main dashboard (/dashboard).
Implement a Protected Route wrapper that checks for a valid token in sessionStorage. If no token exists, the user is redirected back to /login.
Main Layout:

A shared Layout component that includes the responsive header and sidebar. All protected pages should be rendered within this layout.
The header should display the logged-in user's name and a "Logout" button.
Dashboard Page (/dashboard):

The default page after login.
Should display a welcome message and summary cards (e.g., "Total Users," "Total Roles"). These cards are placeholders for future data.
User Management (CRUD):

User List Page (/users):
Displays a list of all users fetched from the backend.
On desktop, this should be a table with columns for Username, Email, Roles, and Status (Enabled/Disabled).
On mobile, the table should transform into a list of cards, with each card displaying the user's information in a readable format.
Include a prominent "Add New User" button that links to the user creation page.
Each user row/card should have "Edit" and "Delete" action buttons.
User Create/Edit Page (/users/new, /users/edit/:id):
A single, reusable form component for both creating and editing users.
The form should include fields for Username, Email, and Password (password is only required for creation).
Include a multi-select dropdown to assign roles to the user. This data should be fetched from the roles endpoint.
Implement client-side validation using React Hook Form.
Role Management (CRUD):

Role List Page (/roles):
Displays a list of all roles in a responsive table or card layout.
Include an "Add New Role" button.
Each role should have "Edit" and "Delete" actions.
Role Create/Edit Page (/roles/new, /roles/edit/:id):
A form for creating or editing a role's name and description.
Include a multi-select component (e.g., a checklist or dual listbox) to assign granular permissions to the role. The list of available permissions should be fetched from the backend.
API Integration Details:

Create a centralized Axios instance.
Implement a request interceptor that reads the JWT from sessionStorage and attaches it to the Authorization header of every outgoing request.
(Optional but recommended) Implement a response interceptor to handle 401 Unauthorized errors, which could be used in the future to trigger a token refresh mechanism.
Use TanStack Query's useQuery for all GET requests and useMutation for all POST, PUT, and DELETE requests to handle server state, loading indicators, and error messages automatically.


I'll create a comprehensive mobile-first React admin dashboard with all the features you've specified. This will be a production-ready application with proper authentication, responsive design, and comprehensive CRUD functionality.

Core Features:

JWT authentication with sessionStorage
Mobile-first responsive design with collapsible sidebar
User management with role assignment
Role management with permission handling
Protected routing system
Professional UI with smooth animations
Comprehensive error handling and loading states
Design Elements:

Modern dark theme with blue accent colors (#3B82F6)
Mobile-first responsive layouts that adapt from mobile cards to desktop tables
Smooth animations and hover states throughout
Clean typography with proper spacing using 8px system
Professional sidebar navigation that collapses on mobile
Consistent component design with proper accessibility
Mobile-First React Admin Dashboard

npm install
npm add @tanstack/react-query@latest axios@latest react-router-dom@latest react-hook-form@latest react-toastify@latest @radix-ui/react-dialog@latest @radix-ui/react-dropdown-menu@latest @radix-ui/react-select@latest @radix-ui/react-checkbox@latest
src/types/index.ts
src/utils/api.ts
src/utils/auth.ts
src/hooks/useAuth.ts
src/hooks/useUsers.ts
src/hooks/useRoles.ts
src/components/ui/Button.tsx
src/components/ui/Input.tsx
src/components/ui/Select.tsx
src/components/ui/Card.tsx
src/components/ui/LoadingSpinner.tsx
src/components/layout/Header.tsx
src/components/layout/Sidebar.tsx
src/components/layout/Layout.tsx
src/components/ProtectedRoute.tsx
src/pages/Login.tsx
src/pages/Dashboard.tsx
src/pages/users/UserList.tsx
src/pages/users/UserForm.tsx
src/pages/roles/RoleList.tsx
src/pages/roles/RoleForm.tsx
src/App.tsx
src/index.css
.env.example
npm run dev