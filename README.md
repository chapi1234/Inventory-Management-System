# Inventory Management System (IMS)
## Component-Based Software Development (CBSD) Project

This project implements a robust Inventory Management System using a **Component-Based Software Development** approach. The architecture is designed for scalability, reusability, and maintainability.

### 🏗️ Architecture: Turborepo Monorepo
We utilize a monorepo structure managed by **Turborepo** to enforce strict separation of concerns and maximize code reuse across the application.

#### Core Components & Packages
The system is divided into granular, independent packages located in `/packages`:
- **`@repo/api-client`**: A standardized communication layer for all backend interactions.
- **`@repo/auth`**: A centralized authentication provider and security context.
- **`@repo/ui`**: A design-system-driven component library (Buttons, Tables, Modals, Inputs, Badges).
- **`@repo/types`**: Unified TypeScript interfaces acting as the data contract across the entire system.
- **`@repo/stock`**: Domain-specific logic for inventory tracking, low-stock alerts, and movement history.
- **`@repo/suppliers`**: Vendor management logic and performance analytics.
- **`@repo/purchases`**: Automated procurement and purchase order (PO) workflows.

### 👥 Team Implementation (Role 3: Operations Lead)
This specific implementation focuses on the **Operations Lead** responsibilities, delivering advanced inventory and procurement features:

1. **Inventory Control & Audit Trail**:
   - Real-time stock level monitoring with visual status indicators.
   - **Component-Based Logic**: Encapsulated stock updates in `@repo/stock`.
   - **Audit Trail**: Full ledger system tracking "who, when, and why" for every stock adjustment.

2. **Supplier Relationship Management (SRM)**:
   - Full CRUD operations for vendor records.
   - **Performance Analytics**: Automated calculation of vendor reliability (On-time delivery, Lead time, Order accuracy).

3. **Automated Procurement Workflow**:
   - Integration between the low-stock alert system and the procurement module.
   - **One-Click PO**: Generate Purchase Orders directly from the inventory view when thresholds are breached.

### 🚀 Getting Started

#### Prerequisites
- Node.js (v18+)
- npm or pnpm

#### Development
```sh
# Install dependencies
npm install

# Start the development server (Apps + Packages)
npm run dev
```

#### Build & Verify
```sh
# Build all packages and the web application
npm run build
```

### 🔐 Core Infrastructure & Architecture (Feature Details)

This system is built using a RESTful Node.js/Express API architecture combined with a robust frontend client ecosystem. Below are the individual features documenting their functionality and architecture.

#### 1. JWT Authentication & Role-Based Access Control (RBAC)
*   **Functionality**: Securely authenticates users utilizing JSON Web Tokens (JWT) for session management and enforces role-specific access (e.g., `admin`, `manager`, `staff`).
*   **Architecture**:
    *   **Generation**: Handled in `apps/api/src/utils/jwt.js`.
    *   **Verification (`authenticate`)**: Express middleware (`apps/api/src/middleware/authenticate.js`) extracts the token from the `Authorization` header, verifies it, fetches the user from the database, and injects `req.user`.
    *   **Authorization (`authorize`)**: Express middleware (`apps/api/src/middleware/authorize.js`) that checks `req.user.role` against permitted roles for standard route restrictions. Permission-based checks (`requirePermission`) can map to specific resource actions if needed.
    *   **Client Context**: `@repo/auth` (`packages/auth/src/index.tsx`) provides an `AuthProvider` containing the JWT token, current user, and authentication state (`login`/`logout` flows), facilitating frontend UI protection.

#### 2. User Profiles and Permissions System
*   **Functionality**: Manages user profiles (registration, profile updates) and their system permissions/statuses (role assignments, active/inactive toggles).
*   **Architecture**:
    *   **Data Layer**: Mongoose schema in `apps/api/src/modules/users/model.js` tracks names, credentials (bcrypt hashes), roles, and status.
    *   **Service Layer**: `apps/api/src/modules/users/service.js` handles direct DB interactions.
    *   **API Routes**: Divided into user profile actions (`/profile` for standard users) and administrative actions (`/:id/role`, `/:id/status` requiring admin execution in `apps/api/src/modules/users/routes.js`). 
    *   **Shared SDK**: The frontend safely manages requests using `@repo/users` (`packages/users/src/index.ts`), providing typesafe SDK wrappers over user API actions and logic utilities like `hasPermission`.

#### 3. Global Error Handling
*   **Functionality**: Standardizes API error responses into a consistent JSON format across the application, reducing unhandled exceptions and logging critical faults safely.
*   **Architecture**:
    *   Implemented via `apps/api/src/middleware/errorHandler.js`.
    *   Registered at the end of the Express lifecycle to capture passed `next(err)` events.
    *   Automatically parses database (Mongoose duplicates/validation limits) and JWT faults into normalized HTTP statuses (400, 401, 409) rather than cascading generic 500 errors.

#### 4. Request Validation
*   **Functionality**: Rejects malformed or invalid incoming request payloads before they hit the controller logic or database layer.
*   **Architecture**:
    *   Utilizes `express-validator`.
    *   Routes attach array-based validation schemas (e.g., `loginValidation` in `apps/api/src/modules/auth/validation.js`).
    *   Processed by the central `validate` middleware (`apps/api/src/middleware/validate.js`), extracting faults and automatically terminating with `400 Bad Request` holding grouped field errors.

### 🎯 Instructor Notes
This implementation adheres to CBSD principles by:
1. **Encapsulation**: Domain logic is strictly isolated in private packages.
2. **Reusability**: UI components in `@repo/ui` are used across multiple pages and apps without duplication.
3. **Interoperability**: The `@repo/types` package ensures all components speak the same "data language".
4. **Composability**: The dashboard pages are composed of smaller, focused components (e.g., `UpdateStockModal`, `PerformanceCard`).
