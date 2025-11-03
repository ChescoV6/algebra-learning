# Lunex

Made by Chesco – Lunex is a modern, student-friendly platform that makes learning algebra fast, fun, and actually enjoyable. It has a full curriculum, interactive lessons, practice problems, and mini-games to help you learn while having fun.  

Whether you’re just starting or want to brush up before a test, Lunex makes algebra simple and engaging.

---

## What’s Inside

### Curriculum
- Covers all algebra topics: basic equations, inequalities, functions, quadratics, exponents, and more.
- Lessons include:
  - Step-by-step explanations
  - Worked examples
  - Key points and formulas
  - Practice problems with hints
- Easy to expand with new topics and lessons.

### Mini-Games
- Five fun ways to practice algebra:
  - **Equation Race:** Solve problems fast with combos and power-ups
  - **Memory Match:** Match equations with answers
  - **Speed Challenge:** Multiple-choice problems under time pressure
  - **Balance the Scale:** See how equations stay balanced
  - **Algebra Shooter:** Solve problems in an arcade-style game
- Games now have animations, particle effects, XP rewards, and achievements.

### Quick Practice
- Unlimited problems across 6 types
- 3 difficulty levels
- Tracks your accuracy, streaks, and XP

### Progress & Settings
- See stats and badges for each topic
- Export/import your progress
- Customize theme, font size, and accessibility settings
- Works offline with PWA support

### Design & Accessibility
- Nice, easy-to-read visuals with gradient backgrounds
- Clear typography and step-by-step visual guides
- ARIA landmarks, skip-to-content links, high contrast mode, reduced motion support
- Animated watermark: "Made by Francesco Mora" with glow and gradient text

---

## Getting Started

### What You Need
- Node.js v18+
- npm or yarn

### Quick Setup
```bash
git clone https://github.com/ChescoV6/lunex.git
cd lunex
npm install
npm run dev
````

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## Project Structure

```
lunex/
├─ public/           # PWA manifest, offline page
├─ src/
│  ├─ components/    # Reusable UI pieces
│  ├─ pages/         # Homepage, Topics, Lessons, Games, Practice, Settings
│  ├─ context/       # Progress & Settings data
│  ├─ lib/           # Curriculum and utilities
│  └─ styles/        # CSS and animations
```

---

## How to Contribute

Want to help make Lunex better? Awesome!

1. Fork the repo
2. Create a new branch
3. Add your changes
4. Submit a pull request

Make sure any new features fit the Lunex style and keep things accessible and fun.

---

## License

MIT – see [LICENSE](./LICENSE)

---

## Credits

* **Created by:** Chesco
* **Branding & Watermark:** Chesco
* **Inspired by:** Ideas from overheard teachers and the goal to make a fun algebra site for students
