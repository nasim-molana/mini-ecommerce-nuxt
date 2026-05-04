# Why `useCategories` Uses `/api/products` Instead of Directus URL

You noticed this Directus endpoint:

- `https://directus-stage.fiachehr.ir/items/products`

and asked why `app/composables/useCategories.ts` does not call it directly.

## Short answer

In this project, frontend composables are intentionally calling **internal Nuxt API routes** (like `/api/products`) instead of calling Directus directly, so the app has a single backend gateway.

## Why this pattern is used

`/api/products` is handled by your server route:

- `server/api/products.get.ts`

That route:

1. reads `apiBase` from runtime config,
2. calls Directus on the server side,
3. transforms the response shape (for example `main_image` -> `image`),
4. returns a clean, stable format for frontend components.

So in `useCategories`, fetching from `/api/products` means categories are derived from the **same source and same transformed data** as the product list shown in UI.  
This prevents mismatch between category links and displayed products.

## Why direct call can cause mismatch

From your Directus data, `category` values are numeric IDs (`1`, `2`, `3`) in `/items/products`.  
If another part of frontend expects slugs/names, direct calls can easily break filtering consistency unless all mapping is handled everywhere.

## Recommended approach

Keep composables on frontend using internal endpoints (`/api/...`) and keep Directus calls in `server/api/*`.

If you want readable category URLs (like `/category/perfume` instead of `/category/1`), then update server layer to return category `slug`/`name` by querying relation fields from Directus, and keep frontend unchanged.

## Reference

- Directus products endpoint: [https://directus-stage.fiachehr.ir/items/products](https://directus-stage.fiachehr.ir/items/products)

---

## پاسخ به سوال شما (فارسی)

خیر، فایل `server/api/products.get.ts` را من در این گفتگو ایجاد نکردم.  
این فایل از قبل در پروژه وجود داشت (در وضعیت اولیه گیت هم به‌صورت `?? server/api/products.get.ts` دیده می‌شد) و من فقط محتوایش را خواندم.

---

## چرا در Main Menu اعداد `1`، `2`، `3` می‌بینید؟ (فارسی)

دلیلش این است که مقدار `category` که از بک‌اند برمی‌گردد، **شناسه عددی دسته‌بندی** است، نه نام دسته.

### مسیر دقیق مشکل

1. در `server/api/products.get.ts` این خط وجود دارد:
   - `category: String(product.category)`
2. در داده Directus، فیلد `category` برای محصول‌ها عدد است (مثل `1`، `2`، `3`).
3. در `app/composables/useCategories.ts` شما categoryها را از خود محصول‌ها استخراج می‌کنید.
4. در هدر (`AppHeader`) همان مقادیر category نمایش داده می‌شوند.

پس خروجی نهایی طبیعی است که به‌جای نام دسته، عدد نشان بدهد.

### برای نمایش نام دسته چه باید کرد؟

باید در لایه سرور (`server/api/products.get.ts`) به‌جای ID، اطلاعات رابطه دسته (مثل `name` یا `slug`) از Directus خوانده شود و همان به frontend برگردد.  
یعنی ریشه اصلاح، همین فایل سرور است نه کامپوننت هدر.
