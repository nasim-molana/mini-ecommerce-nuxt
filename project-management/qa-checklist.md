# QA Checklist

> Portfolio practice: This checklist documents a structured manual verification process for the Mini Commerce project. It is used to practice software delivery and project coordination workflows and does not represent a formal QA process from a professional project team.

## Purpose

The purpose of this checklist is to verify the main user flows of the application before a release or major update.

The checks focus on functional behavior, navigation, UI states, and critical user flows.

---

## Homepage

- [ ] Homepage loads successfully
- [ ] Hero section is displayed correctly
- [ ] Main call-to-action navigates to the shop
- [ ] Popular products are loaded from the API
- [ ] Up to four featured products are displayed
- [ ] Product cards display the expected product information
- [ ] Brand story section is visible
- [ ] Header and footer are displayed correctly

---

## Product Catalog

- [ ] `/products` loads successfully
- [ ] Product list is retrieved from the API
- [ ] Product cards are displayed correctly
- [ ] Product name, price, rating and short description are visible
- [ ] Clicking a product opens the correct product detail page
- [ ] Loading state is displayed while products are being fetched
- [ ] Error state is displayed when product loading fails
- [ ] Empty state is handled correctly when no products are available

---

## Search

- [ ] Search can be submitted from the header
- [ ] Search redirects to `/products?q=...`
- [ ] Search results match the entered query
- [ ] Search with no matching products displays an appropriate empty state
- [ ] Product links from search results open the correct product detail page

---

## Categories

- [ ] Categories are loaded from Directus
- [ ] Category navigation is displayed in the header
- [ ] "All" navigates to the complete product catalog
- [ ] Selecting a category opens `/category/[slug]`
- [ ] Products belonging to the selected category are displayed
- [ ] Empty category results are handled correctly

---

## Product Detail

- [ ] `/products/[id]` loads the selected product
- [ ] Product information is displayed correctly
- [ ] Product description is displayed
- [ ] Product can be added to the cart
- [ ] Invalid or unavailable product IDs are handled appropriately
- [ ] Loading state is displayed while product data is being fetched
- [ ] Error state is displayed if the product cannot be loaded

---

## Shopping Cart

- [ ] Product can be added to the cart
- [ ] Cart badge updates after adding a product
- [ ] Cart page displays added products
- [ ] Product quantity can be increased
- [ ] Product quantity can be decreased
- [ ] Product can be removed from the cart
- [ ] Cart totals update when quantity changes
- [ ] Cart data persists after page refresh using localStorage
- [ ] Empty cart state is displayed correctly

---

## Authentication

- [ ] Login page loads successfully
- [ ] Valid credentials allow the user to log in
- [ ] Authentication state is updated after login
- [ ] Authentication information persists as implemented by the application
- [ ] Authenticated user information is available where required
- [ ] Invalid login attempt is handled appropriately

---

## Protected Checkout

- [ ] Unauthenticated user cannot directly access `/checkout`
- [ ] Unauthenticated user is redirected to `/login`
- [ ] Redirect query parameter is preserved
- [ ] Authenticated user can access `/checkout`
- [ ] Checkout displays the order summary
- [ ] Checkout displays the signed-in user where expected
- [ ] Cart totals on checkout match the cart totals

---

## Navigation

- [ ] Logo navigation works correctly
- [ ] Header navigation links work correctly
- [ ] Category navigation works correctly
- [ ] Cart navigation works correctly
- [ ] Authentication navigation works correctly
- [ ] Footer links navigate to the expected destinations
- [ ] Browser back/forward navigation does not break the main user flows

---

## Responsive UI

Verify the main flows at representative viewport sizes.

### Desktop

- [ ] Header layout displays correctly
- [ ] Product grid displays correctly
- [ ] Product detail layout is usable
- [ ] Cart layout is usable
- [ ] Checkout layout is usable

### Mobile

- [ ] Header remains usable
- [ ] Product cards fit the viewport correctly
- [ ] Product grid adapts to the available width
- [ ] Product detail page remains usable
- [ ] Cart controls remain accessible
- [ ] Checkout content remains readable
- [ ] No unintended horizontal scrolling appears

---

## Release Smoke Check

Before considering a version ready for deployment:

- [ ] Homepage loads
- [ ] Products load
- [ ] Search works
- [ ] Category navigation works
- [ ] Product detail opens
- [ ] Add to cart works
- [ ] Cart persists after refresh
- [ ] Login works
- [ ] Protected checkout behavior works
- [ ] No critical console errors are observed during the main user flows
- [ ] Production build completes successfully

---

## Result

**Status:** Not tested / Passed / Passed with issues / Failed

**Test date:** YYYY-MM-DD

**Environment:** Local / Preview / Production

**Notes:**

- Add observations or discovered issues here.
- Bugs discovered during verification can be documented as GitHub Issues.
