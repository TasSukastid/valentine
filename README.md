# 💝 Valentine's Day Photobooth Web App

A romantic, interactive Valentine's Day web app featuring a scroll-to-reveal love story and a vintage-style photobooth with B&W aesthetic inspired by Sculpture Bangkok.

## ✨ Features

### Part 1: Scrollytelling Intro
- **Smooth scroll animations** with text fade-in/out effects
- Three sequential sections:
  1. "Will you be my Valentine?" with floating heart particles
  2. "Oh..." transition text
  3. "You've always been my valentine" with heart confetti explosion
- Flash effect on final reveal

### Part 2: Vintage Photobooth
- **Live camera feed** with real-time B&W vintage filter (grayscale, high contrast, brightness boost)
- **3-second countdown** before photo session
- **Auto-capture 4 photos** with realistic flash effects between shots
- **Vertical photo strip** generation with white borders
- **"My Valentines" signature** in handwritten font
- **Smooth slide-down animation** mimicking a printing machine
- **Download functionality** to save the photo strip as an image
- Mobile-friendly camera support

## 🎨 Visual Style

- **Theme**: Sculpture Bangkok photobooth aesthetic
- **Colors**: 
  - Off-white background (#f0f0f0)
  - Charcoal black text (#1a1a1a)
  - Deep red accents (#cc0000)
- **Fonts**:
  - Playfair Display (serif) for elegant headlines
  - Reenie Beanie (handwritten) for signature
- **Effects**: High-contrast monochromatic, grainy film texture, flash photography aesthetic, 90s/Y2K retro vibe

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🛠️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth transitions and effects
- **react-webcam** - Camera access and capture
- **html2canvas** - Generate downloadable photo strip images

## 📱 Mobile Support

The app is fully responsive and works on mobile devices. The camera will automatically use the front-facing camera on mobile devices for the best selfie experience.

## 🎯 Usage

1. **Scroll through the story** - Use your mouse wheel or swipe to reveal the romantic message
2. **Start the photobooth** - Click the "Start Photo Booth" button
3. **Get ready** - A 3-second countdown gives you time to pose
4. **Strike poses** - 4 photos will be automatically captured with flash effects
5. **Download your strip** - Save your vintage photo strip or take another set

## 📝 Notes

- **Camera permissions**: The browser will request camera access when you start the photobooth
- **HTTPS required**: Camera access requires HTTPS in production (or localhost for development)
- **Browser compatibility**: Works best in modern browsers (Chrome, Firefox, Safari, Edge)

## 💌 Perfect For

- Valentine's Day celebrations
- Romantic gestures
- Couples' photos
- Valentine's Day parties
- Social media content

---

Made with ❤️ for Valentine's Day 2026
