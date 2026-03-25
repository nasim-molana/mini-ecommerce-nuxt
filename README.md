# 🛒 Mini E-Commerce (Nuxt 3)

A **production-ready frontend e-commerce application** built with **Nuxt**, **Vue 3 (Composition API)**, and **TypeScript**, focusing on **scalable architecture**, **clean code**, and **real-world development practices**.

---

## 🚀 Tech Stack

* **Nuxt 3**
* **Vue 3 (Composition API)**
* **TypeScript**
* **Tailwind CSS**
* **Pinia (State Management)**
* **REST API (Fake Store API or custom backend)**

---

## 🎯 Project Purpose

This project is designed as a **real-world portfolio application** to demonstrate:

* Scalable frontend architecture
* Component-driven development
* Clean and maintainable code
* State management with Pinia
* API integration and data handling
* Professional Git workflow

---

## 🧩 Core Features

### 🛍 Product Flow

* Product listing (grid view)
* Product detail page (dynamic routing)
* Category-based filtering
* Search functionality

### 🛒 Shopping Cart

* Add / remove products
* Update quantities
* Total price calculation
* Persistent cart state

### 🔐 Authentication (Mock)

* Login / Logout (local storage based)
* Protected routes (e.g. checkout)

### ⚙️ Data Handling

* Centralized API layer (`useApi`)
* Composables for business logic:

  * `useProducts`
  * `useCart`
  * `useCategories`
* Loading, error, and empty states

### 🧠 Architecture

* Separation of concerns:

  * UI components
  * Business logic (composables)
  * Global state (Pinia)
* Reusable UI components (design system approach)

---

## 🏗 Project Structure

components/
ui/
layout/
navigation/
product/
cart/

composables/
useApi.ts
useProducts.ts
useCategories.ts
useCart.ts

stores/
cart.ts

pages/
index.vue
category/[slug].vue
products/[id].vue
cart.vue
login.vue

types/
product.ts
cart.ts
category.ts

middleware/
auth.ts

constants/
api.ts

---

## 🧠 Key Concepts

* **Composable Architecture** → Encapsulating logic into reusable functions
* **State Management with Pinia** → Centralized and predictable state
* **Typed Data Models** → Strong TypeScript usage for reliability
* **Clean Separation of Layers** → UI vs Logic vs State
* **Reusable Components** → Scalable and maintainable UI

---

## 🔁 Development Workflow

This project follows a **professional Git workflow**:

* Feature-based branches
* Pull Requests for every change
* Conventional commits

Example:

feature/cart-system
feat: implement cart state with Pinia

---

## ⚙️ Setup

npm install

---

## 💻 Development

npm run dev

Open:
http://localhost:3000

---

## 🏁 Production

npm run build
npm run preview

---

## 📌 Highlights

* Designed with **real-world scalability in mind**
* Focus on **maintainability and clean architecture**
* Demonstrates **frontend engineering best practices**, not just UI

---

## 👤 Author

**Nasim Molana**
Frontend Developer (Vue / Nuxt)

GitHub: https://github.com/nasim-molana
LinkedIn: (your link)

---

## ⭐️

If you find this project useful, feel free to star the repository.
