# Portfolio.Centric - Futuristic Glassmorphism Portfolio

A stunning, modern portfolio website featuring glassmorphism design, cyberpunk aesthetics, and extensive animations. Built with vanilla HTML, CSS, and JavaScript for maximum performance and customization.

## ✨ Features

### 🎨 Design

- **Glassmorphism Effects** - Frosted glass cards with backdrop blur
- **Dual Theme System** - Seamless dark/light mode toggle with smooth transitions
- **Grid Overlay Background** - Cyberpunk-inspired animated grid
- **Particle System** - Dynamic floating particles with connection lines
- **Cursor Glow Effect** - Interactive glow that follows your cursor

### 🎯 Interactive Widgets

- **Live Clock** - Real-time local time display
- **Music Player** - Spotify-inspired music widget with equalizer animation
- **Quote Rotator** - Automatically cycling inspirational quotes
- **GitHub Contributions** - Dynamic contribution graph generator
- **Activity Status** - Online status with pulsing indicator

### 🚀 Animations & Effects

- **Smooth Scroll** - Buttery-smooth navigation between sections
- **Parallax Cards** - 3D tilt effect on hover
- **Fade-in Animations** - Intersection Observer-based scroll animations
- **Typing Effect** - Animated tagline typing
- **Hover Transitions** - Engaging micro-interactions throughout
- **Button Glows** - Pulsing glow effects on primary CTAs

### 📱 Responsive Design

- Fully responsive layout for all screen sizes
- Mobile-optimized navigation
- Touch-friendly interactions
- Adaptive typography

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Modular OOP architecture
- **Font Awesome** - Icon library
- **Google Fonts** - Inter & JetBrains Mono

## 🎯 Quick Start

1. **Clone or Download** this repository
2. **Open `index.html`** in your browser
3. **Customize** your content in the HTML file

That's it! No build process or dependencies required.

## 🎨 Customization Guide

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
  --accent-primary: #00d9ff; /* Primary accent color */
  --accent-secondary: #7c3aed; /* Secondary accent color */
  --glow-color: rgba(0, 217, 255, 0.4); /* Glow effects */
}
```

### Updating Content

#### Personal Information

Edit the HTML in `index.html`:

- Hero section: Line 35-50
- About section: Line 140-160
- Projects: Line 220-300

#### Projects

Replace project cards starting at line 220:

```html
<div class="project-card glass-card">
  <div class="project-content">
    <h3 class="project-title">Your Project</h3>
    <p class="project-description">Description</p>
    <div class="project-tags">
      <span class="tag">Tech1</span>
      <span class="tag">Tech2</span>
    </div>
  </div>
</div>
```

#### Social Links

Update the social cards at line 310:

```html
<a href="https://github.com/yourusername" class="social-card glass-card">
  <i class="fab fa-github"></i>
  <span>GitHub</span>
</a>
```

### Adding Quotes

Edit the quotes array in `script.js`:

```javascript
this.quotes = [
  { text: "Your quote here", author: "Author Name" },
  // Add more quotes
];
```

### Tech Stack Icons

Modify the tech stack section in `index.html` at line 195:

```html
<div class="tech-item">
  <i class="fab fa-react"></i>
  <span>React</span>
</div>
```

## 🎭 Components Overview

### JavaScript Modules

1. **ThemeManager** - Handles theme switching and persistence
2. **NavigationManager** - Smooth scrolling and active section highlighting
3. **ClockWidget** - Real-time clock updates
4. **MusicPlayer** - Music player controls
5. **QuoteRotator** - Automatic quote cycling
6. **GitHubContributions** - Dynamic contribution graph
7. **CursorGlow** - Custom cursor effect
8. **ContactForm** - Form validation and submission
9. **ScrollAnimations** - Intersection Observer animations
10. **ParallaxEffect** - Card tilt effects
11. **ParticleBackground** - Canvas-based particle system
12. **ProjectCardTilt** - 3D project card effects

## 📊 Performance

- **Optimized Animations** - GPU-accelerated transforms
- **Lazy Loading** - Intersection Observer for scroll animations
- **Debounced Events** - Optimized scroll and resize handlers
- **Minimal Dependencies** - Pure vanilla JavaScript
- **Fast Load Times** - Optimized CSS and JS

## 🎨 Color Schemes

### Dark Theme (Default)

- Background: `#0a0a0f`
- Primary Text: `#e8e8f0`
- Accent: `#00d9ff` → `#7c3aed` gradient

### Light Theme

- Background: `#f5f5fa`
- Primary Text: `#1a1a24`
- Accent: `#0ea5e9` → `#8b5cf6` gradient

## 🔧 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Desktop**: > 1200px
- **Tablet**: 768px - 1200px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🎯 Best Practices Used

- Semantic HTML5 markup
- BEM-inspired CSS naming
- Modular JavaScript classes
- CSS custom properties for theming
- Accessibility considerations (ARIA labels, focus states)
- SEO-friendly structure
- Performance-optimized animations

## 🚀 Deployment

### GitHub Pages

1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select main branch as source
4. Your site will be live at `username.github.io/repo-name`

### Vercel

1. Import GitHub repository
2. Deploy with one click
3. Automatic deployments on push

### Netlify

1. Drag and drop the folder
2. Or connect to Git repository
3. Instant deployment

## 🎨 Adding Images

Replace placeholder images by:

1. Add your images to an `images` folder
2. Update the `src` attributes in HTML
3. For photo gallery: Replace `.photo-placeholder` with `<img>` tags

Example:

```html
<div class="photo-item">
  <img src="images/photo1.jpg" alt="Description" />
</div>
```

## 💡 Tips & Tricks

1. **Optimize Images**: Use WebP format for better performance
2. **Custom Fonts**: Add more Google Fonts by updating the link in HTML
3. **More Widgets**: Duplicate existing widget HTML and customize
4. **Animation Speed**: Adjust `--transition-speed` variable in CSS
5. **Particle Count**: Modify `particleCount` in ParticleBackground class

## 📄 License

Free to use for personal and commercial projects. Attribution appreciated but not required.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📧 Contact

Update the contact form to connect to your backend or use services like:

- Formspree
- EmailJS
- Netlify Forms
- Google Forms

## 🎉 Enjoy!

Customize this portfolio to make it uniquely yours. Happy coding!! 🚀

---

**Made with 💜 and code**
