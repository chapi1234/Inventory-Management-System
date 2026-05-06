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

### 🎯 Instructor Notes
This implementation adheres to CBSD principles by:
1. **Encapsulation**: Domain logic is strictly isolated in private packages.
2. **Reusability**: UI components in `@repo/ui` are used across multiple pages and apps without duplication.
3. **Interoperability**: The `@repo/types` package ensures all components speak the same "data language".
4. **Composability**: The dashboard pages are composed of smaller, focused components (e.g., `UpdateStockModal`, `PerformanceCard`).
