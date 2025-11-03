# Lunex – The Ultimate Algebra Learning Platform

Made by Chesco – Lunex is a modern, student-focused platform designed to make learning algebra fast, effective, and enjoyable. It combines a complete curriculum, interactive lessons, dynamic practice, and gamified mini-games with progress tracking and accessibility features.

Lunex is suitable for all students, from beginners to advanced learners, and provides a fully engaging learning experience.

---

## Features

### Comprehensive Curriculum
- Covers all algebra topics: basic equations, inequalities, functions, quadratics, exponents, and more.
- Lessons include:
  - Step-by-step explanations
  - Worked examples
  - Key points and formulas
  - Interactive practice problems with progressive hints
- Modular curriculum structure for easy updates and expansion.

### Mini-Games
- Five engaging mini-games designed for fun and effective practice:
  - **Equation Race:** Speed-solving with combos and power-ups
  - **Memory Match:** Match equations with answers
  - **Speed Challenge:** Timed multiple-choice challenges
  - **Balance the Scale:** Visual understanding of equation balance
  - **Algebra Shooter:** Arcade-style problem solving
- Features include animations, particle effects, wave-based difficulty, scoring, XP rewards, and achievements.

### Quick Practice Mode
- Unlimited dynamically generated problems across six problem types
- Three difficulty levels
- Tracks accuracy, streaks, and awards XP based on performance

### Progress Tracking & Settings
- Detailed statistics and badges for completed topics
- Export and import of progress data
- Theme, font size, and accessibility settings
- Full PWA support with offline capabilities

### Modern Design & Accessibility
- Gradient backgrounds and visual guides
- Enhanced typography for readability
- ARIA landmarks, skip-to-content links, high contrast mode, reduced motion support
- Animated watermark: "Made by Francesco Mora" with gradient text and glow effects

---

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn package manager

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/yourusername/lunex.git
cd lunex
npm install
npm run dev
````

### Build for Production

```bash
npm run build
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to use Lunex.

---

## Folder Structure

```
lunex/
├─ public/           # PWA manifest, offline page
├─ src/
│  ├─ components/    # Reusable UI components
│  ├─ pages/         # Homepage, Topics, Lessons, Games, Practice, Settings
│  ├─ context/       # Progress & Settings contexts
│  ├─ lib/           # Utility functions & curriculum data
│  └─ styles/        # CSS and animations
```

---

## Contributing

We welcome contributions to improve Lunex!

To contribute:

1. Fork the repository
2. Create a new feature branch
3. Make your changes
4. Submit a pull request

Please ensure new features align with Lunex’s accessibility, design, and learning standards.

---

## License

MIT License – see [LICENSE](./LICENSE) for details.

---

## Credits

* **Creator:** Chesco
* **Watermark & Branding:** Chesco
* **Inspired by:** Overheard teachers in school talking about a website to teach kids about algebra and wanted to make my own.

---
