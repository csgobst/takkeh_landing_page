# Takkeh Landing Page

A modern, animated bilingual (EN/AR) landing page for Takkeh's delivery platform featuring Customer, Vendor, and Driver apps.

## Features

- 🌟 **Modern UI/UX**: Beautiful gradient backgrounds, smooth animations, and 3D components
- 🌍 **Bilingual Support**: Full English/Arabic support with RTL layout
- 📱 **Responsive Design**: Optimized for all devices (phones, tablets, desktops, large screens)
- 🎨 **3D Elements**: Interactive Three.js components in hero section
- ⚡ **Smooth Animations**: Framer Motion powered animations
- 🎯 **Smooth Scrolling**: In-page navigation with smooth scroll
- 🟡 **Brand Colors**: Takkeh yellow theme throughout

## Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Three.js + React Three Fiber** - 3D graphics
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── TakkehLanding.jsx    # Main landing page component
│   └── Hero3D.jsx           # 3D hero section component
├── translations.js          # Bilingual content
├── index.css               # Global styles with Tailwind
├── App.js                  # Main app component
└── index.js                # Entry point
```

## Features Overview

### Header
- Sticky navigation with glass morphism effect
- Logo with brand name in Takkeh yellow
- Navigation links to sections
- Language toggle (EN/عربي)

### Hero Section (Customer)
- Animated 3D background with floating elements
- Large headline with yellow accent
- Feature benefits with icons
- Download buttons for iOS/Android
- Secondary CTAs to other sections

### Vendor Section
- App preview card with 3D hover effects
- Benefits highlighting vendor advantages
- Download buttons for vendor app

### Driver Section
- Similar layout to vendor section
- Driver-specific benefits and features
- Download buttons for driver app

### Footer
- Contact information
- Legal links (dummy)
- Brand consistency

## Responsive Design Notes

The layout was enhanced for mobile & tablet:

- Adaptive typography scales hero headings: `text-3xl -> text-7xl` across breakpoints
- Grids collapse from 2 columns to single column below `md` breakpoint
- Download buttons scale (height: 96px desktop down to 48px mobile) to avoid overflow
- Accordion (customer app screens) is touch-enabled (click / keyboard) and shrinks width/height on small screens
- Stats cards tighten spacing on mobile (`gap-3` vs `gap-4`)
- Footer stacks columns vertically and reduces text size for narrow widths
- Global container capped at `1280px` for better readability on ultra-wide monitors

To tweak breakpoints, adjust Tailwind classes in the section components. Add custom breakpoints via `theme.extend.screens` in `tailwind.config.js` if needed.

## Customization

### Colors
The main brand colors are defined in `tailwind.config.js`:
- `takkeh-yellow`: #FBBF24
- `takkeh-yellow-light`: #FDE68A
- `takkeh-yellow-dark`: #F59E0B

### Content
All text content is in `src/translations.js` for easy bilingual management.

### Download Links
Update the dummy download URLs in the component:
- Customer iOS: `https://example.com/download/takkeh-customer-ios`
- Customer Android: `https://example.com/download/takkeh-customer-android`
- Vendor iOS: `https://example.com/download/takkeh-vendor-ios`
- Vendor Android: `https://example.com/download/takkeh-vendor-android`
- Driver iOS: `https://example.com/download/takkeh-driver-ios`
- Driver Android: `https://example.com/download/takkeh-driver-android`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized animations with `will-change` properties
- Lazy loading for 3D components
- Efficient re-renders with React.memo where needed
- Minimal bundle size with tree-shaking

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios

## License

Private - Takkeh Company

## Support

For support, email support@takkeh.app
