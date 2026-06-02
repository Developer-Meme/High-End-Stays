# High End Stays BnB — Website

Premium BnB website for **High End Stays**, a luxury short-stay rental brand operating in **Eldoret** and **Meru, Kenya**.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** — lightning-fast dev server & build tool
- **Tailwind CSS v4** — utility-first styling
- **React Router** — client-side routing
- **Lucide React** — icon library

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx            # Sticky nav with theme switcher
│   ├── HeroSection.tsx       # Hero slideshow + search bar
│   ├── ExploreSection.tsx    # Filterable property grid (Eldoret / Meru)
│   ├── AmenitiesSection.tsx  # Premium amenities showcase
│   ├── ListingsSection.tsx   # Detailed property listings
│   ├── VirtualTourSection.tsx
│   ├── TeamSection.tsx       # Victor & William team cards
│   ├── FAQSection.tsx        # Accordion FAQ
│   ├── ReviewsSection.tsx    # Guest reviews
│   ├── ContactSection.tsx    # Book Your Stay form + contact info
│   ├── Footer.tsx
│   └── MouseFollower.tsx
├── pages/
│   └── index.tsx             # Main page — assembles all sections
├── types/
│   └── listings.ts
├── assets/
│   └── uploads/
│       ├── logo.png
│       └── logo-clean.png
├── theme.css                 # Three themes (Dark / Light / Royal)
├── App.css
├── index.css
├── providers.tsx             # Theme + Booking context
└── main.tsx
```

---

## 🎨 Three Themes

The site ships with **three switchable themes**, toggled via the button in the navbar (Moon → Sun → Crown → repeat).

### 🌑 Dark Theme (Default)
*Seen on the Amenities section.*

Deep blacks (`#0a0a0a`) with warm amber/orange accents (`#d97706`). The signature luxury-dark look. White text on dark backgrounds, gold accent lines and buttons.

**CSS class:** `:root` (no extra class needed)

---

### ☀️ Light Theme
*Seen on the FAQ / Common Questions section.*

Warm off-white backgrounds (`#fafafa`, `#f0f0ef`) with dark charcoal text and deep amber accents (`#b45309`). Clean, airy, editorial feel.

**CSS class:** `.theme-light` on `<html>`

---

### 👑 Royal Theme
*Seen on the Leadership / Team section.*

Near-black with royal purple undertones (`#06030f`, `#0d0820`), gold accents (`#D4AF37`), and purple glow effects. Ultra-premium, regal aesthetic.

**CSS class:** `.theme-royal` on `<html>`

---

## 🗺️ Sections (Page Order)

| Section | ID | Description |
|---|---|---|
| Hero | `#home` | Full-screen slideshow + search bar |
| Explore | `#explore` | Filterable property cards by location |
| Amenities | `#amenities` | 6 key amenity highlights |
| Properties | `#listings-display` | Detailed listing cards with virtual tour |
| Virtual Tour | `#virtual-tour` | Interactive 360° preview |
| Team | `#team` | Victor & William contact cards |
| FAQs | `#faqs` | Accordion FAQ |
| Reviews | `#reviews` | Guest testimonials |
| Contact | `#contact` | Book Your Stay form + contact info |

---

## 📍 Locations

| City | Properties | Status |
|---|---|---|
| **Eldoret** | Pioneer Heights, MTRH Executive, Family Haven | ✅ Live |
| **Eldoret** | City View Penthouse | 🔜 Coming Soon |
| **Meru** | Makutano Premium, Mt. Kenya Royal Suite | ✅ Live |
| **Meru** | Garden Retreat, Forest Edge Lodge | 🔜 Coming Soon |

---

## 📞 Contact

| Person | Role | Phone | WhatsApp |
|---|---|---|---|
| **Victor Meme** | Guest Experience Lead | +254 705 688 344 | [wa.me/254705688344](https://wa.me/254705688344) |
| **William Kinyeru** | Operations & Growth Lead | +254 792 003 602 | [wa.me/254792003602](https://wa.me/254792003602) |

📧 **Email:** highendstays@gmail.com  
📍 **Locations:** Eldoret & Meru, Kenya

---

## 🏗️ Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy to any static hosting (Netlify, Vercel, Cloudflare Pages, etc.).

---

© 2026 High-End Stays BnB. All Rights Reserved.  
Designed & Developed by **Victor Meme**.
