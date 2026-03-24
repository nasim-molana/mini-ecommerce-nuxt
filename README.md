# 🛒 Mini E-Commerce (Nuxt 4)

A modern **mini e-commerce frontend application** built with **Nuxt 4**, **Vue 3 (Composition API)**, and **Tailwind CSS**.

This project is designed as a **real-world portfolio project** to demonstrate frontend architecture, clean code practices, and a professional development workflow.

---

## 🚀 Tech Stack

* **Nuxt 4**
* **Vue 3 (Composition API)**
* **Tailwind CSS**
* **Fake Store API** (for product data)

---

## 🎯 Project Goals

* Build a scalable and maintainable frontend architecture
* Apply Vue 3 and Nuxt concepts in a real project
* Follow real-world development practices (GitHub workflow)
* Create a strong portfolio project for frontend job applications

---

## 🧱 Features

### ✅ Implemented

* Project structure based on best practices
* Responsive UI with Tailwind CSS
* Header with navigation

  * Dynamic categories
  * Accordion-style submenu
* Product Grid & Product Card components
* Clean component separation:

  * Layout
  * Navigation
  * Product UI

### 🚧 In Progress

* Fetch products from API (useFetch + composables)
* Dynamic data rendering
* Loading & error states

### 🔜 Planned

* Category filtering
* Product details page (dynamic routing)
* Shopping cart (add/remove items)
* State management
* Performance optimizations

---

## 🏗️ Project Structure

```text
app/
  components/
    layout/
      AppHeader.vue
    navigation/
      MainMenu.vue
    product/
      ProductGrid.vue
      ProductCard.vue
  composables/
    useProducts.ts
  pages/
    index.vue
```

---

## 🧠 Architecture

This project follows a **clean separation of concerns**:

* **Composable (useProducts)** → Data fetching layer
* **ProductGrid** → Layout and data mapping
* **ProductCard** → Pure UI component

This approach ensures scalability and maintainability.

---

## 🔁 Development Workflow

This project simulates a **real-world team workflow**:

* GitHub Issues for task management
* Feature-based branching strategy
* Pull Requests for changes
* Conventional Commits

Example:

```bash
feature/fetch-products
feat: fetch products using composable
```

---

## ⚙️ Setup

Install dependencies:

```bash
npm install
```

---

## 💻 Development

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🏁 Production

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## 📌 Notes

This project focuses on **frontend architecture and best practices**, not just UI.

---

## 👤 Author

**Nasim Molana**

Frontend Developer (Vue / Nuxt)

---

## ⭐️

If you find this project useful, feel free to star the repository.
