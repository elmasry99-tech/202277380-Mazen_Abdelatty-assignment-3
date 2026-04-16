# Technical Documentation — Mazen Abdelatty Portfolio

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File Structure](#file-structure)
3. [Design System](#design-system)
4. [Step-by-Step User Guide](#step-by-step-user-guide)
5. [JavaScript Features & Code Snippets](#javascript-features--code-snippets)
6. [API Integrations](#api-integrations)
7. [Accessibility](#accessibility)
8. [Performance](#performance)
9. [Testing](#testing)

---

## Architecture Overview

This portfolio is a single-page application (SPA) built with vanilla HTML5, CSS3, and JavaScript (ES6+). No frameworks or build tools are required — it runs directly in any modern browser.

**Design philosophy:**
- All sections are on a single scrollable page to minimize load time and navigational friction.
- JavaScript is progressively enhanced — core content is accessible even without JS.
- Theme preferences are persisted across sessions using `localStorage`.

---

## File Structure

```
202277380-Mazen_Abdelatty-assignment-3/
├── index.html               # Semantic HTML structure with all portfolio sections
├── css/
│   └── styles.css           # Complete styling: responsive design, theming, animations
├── js/
│   └── script.js            # All interactive features and DOM manipulation
├── images/
│   ├── mazen.jpeg           # Profile photo (dark mode)
│   ├── Mazen_White.jpeg     # Profile photo (light mode)
│   ├── EEBlack.png          # EE Club project image (dark mode)
│   ├── EEWhite.png          # EE Club project image (light mode)
│   └── project-taskmanager.png
├── docs/
│   ├── technical-documentation.md
│   └── ai-usage-report.md
└── README.md
```

---

## Design System

### Color Palette

| Token | Dark Mode | Light Mode |
|-------|-----------|------------|
| `--bg-primary` | `#0a0a0a` | `#fafafa` |
| `--bg-secondary` | `#111111` | `#f0f0f0` |
| `--gold` | `#d4af37` | `#d4af37` |
| `--gold-light` | `#f5c842` | `#f5c842` |
| `--text-primary` | `#f0f0f0` | `#1a1a1a` |
| `--text-secondary` | `#a0a0a0` | `#555555` |

### Typography

- **Headings**: Outfit (Google Fonts) — weights 300–800
- **Body**: Inter (Google Fonts) — weights 300–600

### Layout

- **CSS Grid**: Used for Skills (3-column), Projects (2-column), About (2-column), and Contact (2-column)
- **Flexbox**: Used for Navbar, Hero, Footer, and form layouts
- **Breakpoints**: 1024px (tablet), 768px (mobile), 480px (small mobile)

---

## Step-by-Step User Guide

### 1. Opening the Portfolio

Open `index.html` directly in a browser, or serve it via a local server:

```bash
# macOS
open index.html

# Or using VS Code Live Server (recommended for development)
# Right-click index.html → "Open with Live Server"
```

You will land on the **Hero section** which displays:
- A time-of-day greeting (e.g. "☀️ Good Morning")
- A name heading with a typing animation showing different roles
- Two call-to-action buttons: **View My Work** and **Get In Touch**

---

### 2. Navigating the Website

The **sticky navbar** at the top contains four links:

| Link | Destination | Scroll Behavior |
|------|-------------|-----------------|
| About | `#about` | Smooth scroll |
| Skills | `#skills` | Smooth scroll |
| Projects | `#projects` | Smooth scroll |
| Contact | `#contact` | Smooth scroll |

> On **mobile**, the navbar collapses into a hamburger menu (☰). Tap it to expand/collapse the links.

Clicking any nav link triggers a smooth scroll:
```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
```

---

### 3. Toggling Dark / Light Mode

Click the **sun/moon icon** (☀️ / 🌙) in the top-right of the navbar to switch themes.

- The theme is applied via a `data-theme` attribute on the `<html>` element.
- Your preference is saved in `localStorage` so it persists on refresh.
- Profile photo and project images automatically swap to match the theme.

```javascript
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(newTheme);
    updateThemeImages(newTheme, true);
});
```

---

### 4. Exploring the Skills Section

Scroll down to **Skills**. Each skill card animates into view as it enters the viewport (using `IntersectionObserver`), and the skill progress bar fills to its assigned percentage.

```javascript
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width'); // e.g. "90%"
            });
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
```

Each skill bar width is defined in HTML via a `data-width` attribute:
```html
<div class="skill-progress" data-width="90%"></div>
```

---

### 5. Viewing Projects

Scroll to the **Projects** section. Each project card displays:
- A project image (swaps with theme)
- A hover overlay with an external link icon
- Project name, description, and technology tags

**To visit a live project**, hover over the card and click the 🔗 link icon. For example:
- **EE Club Website** → [https://www.eec-kfupm.com](https://www.eec-kfupm.com)
- **Computer Club Hub** → High-performance portal with Redis caching and PostgreSQL.

---

### 6. Using the Contact Form

Scroll to the **Contact** section to send a message directly.

**Steps:**
1. Fill in your **Name** (minimum 2 characters)
2. Fill in your **Email** (must be a valid email format)
3. Write your **Message** (minimum 10 characters)
4. Click **Send Message**

The form validates all fields client-side before submission:

```javascript
// Name validation
if (name.value.trim().length < 2) {
    showError(name, 'nameError', 'Name must be at least 2 characters');
    isValid = false;
}

// Email validation using regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email.value.trim())) {
    showError(email, 'emailError', 'Please enter a valid email');
    isValid = false;
}

// Message validation
if (message.value.trim().length < 10) {
    showError(message, 'messageError', 'Message must be at least 10 characters');
    isValid = false;
}
```

On success, a **toast notification** appears at the bottom-right confirming the message was sent. The form is then cleared automatically.

> Messages are delivered via [FormSubmit.co](https://formsubmit.co) without any backend — see [API Integrations](#api-integrations).

---

## JavaScript Features & Code Snippets

### Time-of-Day Greeting

```javascript
function setGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    if (hour >= 5 && hour < 12)       greeting = '☀️ Good Morning';
    else if (hour >= 12 && hour < 17) greeting = '🌤️ Good Afternoon';
    else if (hour >= 17 && hour < 21) greeting = '🌅 Good Evening';
    else                               greeting = '🌙 Good Night';
    greetingEl.textContent = greeting;
}
```

### Typing Animation

Characters are added and removed one-by-one using a recursive `setTimeout`:

```javascript
function typeEffect() {
    const currentWord = typingWords[wordIndex];
    if (isDeleting) {
        typingEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        typingSpeed = 400;
    }
    setTimeout(typeEffect, typingSpeed);
}
```

### Theme-Aware Image Swapping

```javascript
const darkImage  = 'images/mazen.jpeg';
const lightImage = 'images/Mazen_White.jpeg';

function updateThemeImages(theme, animate = false) {
    const profileSrc = theme === 'dark' ? darkImage : lightImage;
    if (animate) {
        profileImg.style.opacity = '0';
        setTimeout(() => {
            profileImg.src = profileSrc;
            profileImg.style.opacity = '1';
        }, 800);
    } else {
        profileImg.src = profileSrc;
    }
}
```

### Gold Particles (Hero Background)

```javascript
function createParticles() {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left              = Math.random() * 100 + '%';
        particle.style.width             = Math.random() * 4 + 2 + 'px';
        particle.style.height            = particle.style.width;
        particle.style.animationDuration = Math.random() * 6 + 4 + 's';
        particle.style.animationDelay    = Math.random() * 6 + 's';
        particle.style.opacity           = Math.random() * 0.5 + 0.1;
        particlesContainer.appendChild(particle);
    }
}
```

### Visit Timer

```javascript
function updateTimer() {
    secondsSpent++;
    const minutes = Math.floor(secondsSpent / 60);
    const seconds = secondsSpent % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
setInterval(updateTimer, 1000);
```

### Skill Categorization & Filtering

The skill filtering system utilizes a professional staggered animation. When a category is selected:
1. All cards fade out and scale down simultaneously.
2. The layout reflows after a short delay.
3. The matching cards fade in one-by-one with a 70ms stagger for a dynamic, high-end feel.

```javascript
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        skillCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});
```

---

## API Integrations

### FormSubmit.co (Contact Form)

The contact form uses [FormSubmit.co](https://formsubmit.co) — a free third-party AJAX endpoint — to send emails without a custom backend.

**How it works:**
```javascript
fetch("https://formsubmit.co/ajax/mazen_osama334@hotmail.com", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim()
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        showToast();
        contactForm.reset();
    }
});
```

**No CAPTCHA, no backend required** — the static SPA can send real emails directly.

---

## Accessibility

- Semantic HTML5 elements (`<nav>`, `<section>`, `<footer>`)
- `aria-label` attributes on icon-only buttons (theme toggle, hamburger)
- `alt` text on all images
- Keyboard-navigable form inputs and links
- Sufficient color contrast in both dark and light themes

---

## Performance

| Optimization | Technique |
|---|---|
| Lazy image loading | `loading="lazy"` on all `<img>` tags |
| No JS libraries | Zero external dependencies — pure vanilla JS |
| Efficient scroll handling | `IntersectionObserver` instead of `scroll` event listeners |
| Fast font loading | Google Fonts loaded with `<link rel="preconnect">` |
| CSS blur effects | `backdrop-filter` with `-webkit-` prefix for Safari compatibility |

---

## Testing

All features were manually tested across multiple browsers and screen sizes.

### Browser Compatibility

| Browser | Dark Mode | Light Mode | Animations | Form | Mobile Menu |
|---------|-----------|------------|------------|------|-------------|
| Chrome 123 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Firefox 124 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Safari 17 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edge 122 | ✅ | ✅ | ✅ | ✅ | ✅ |

### Responsive Design Testing

| Breakpoint | Device Simulated | Layout Check |
|---|---|---|
| 1440px | Desktop | 3-col skills, 2-col projects ✅ |
| 1024px | Tablet | 2-col skills, 1-col projects ✅ |
| 768px | Mobile landscape | 1-col, hamburger menu ✅ |
| 480px | Mobile portrait | Single column, stacked ✅ |

### Form Validation Testing

| Test Case | Input | Expected Result | Result |
|---|---|---|---|
| Empty name | `""` | "Please enter your name" error | ✅ |
| Short name | `"A"` | "Name must be at least 2 characters" | ✅ |
| Invalid email | `"notanemail"` | "Please enter a valid email" | ✅ |
| Short message | `"Hi"` | "Message must be at least 10 characters" | ✅ |
| Valid submission | All fields valid | Toast notification shown, form cleared | ✅ |

### Theme Toggle Testing

| Scenario | Steps | Expected | Result |
|---|---|---|---|
| Persists on reload | Toggle to light → refresh | Light mode loads | ✅ |
| Images swap | Toggle theme | Profile and project images change | ✅ |
| Icon updates | Toggle theme | Sun ↔ Moon icon switches | ✅ |

### Skill Bar Animation Testing

Tested by scrolling into the Skills section from different positions to verify `IntersectionObserver` correctly triggers width animation on first visibility only (not re-triggered on re-scroll).
