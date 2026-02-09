# Reken Visualisaties

Interactive math visualization tools for subtraction exercises with visual learning aids.

## 🌐 Live Demo

Visit the application at: **[https://vbrhino.github.io/reken-visualisaties/](https://vbrhino.github.io/reken-visualisaties/)**

### Available Versions

- **Angular Version**: Modern, component-based architecture → [/angular/](https://vbrhino.github.io/reken-visualisaties/angular/)
- **Classic Version**: Vanilla HTML/CSS/JS → [/aftrekken.html](https://vbrhino.github.io/reken-visualisaties/aftrekken.html)

## 📦 Repository Structure

```
reken-visualisaties/
├── index.html              # Landing page with version selection
├── styles.css              # Shared styles
├── aftrekken.html         # Classic vanilla JS version
├── aftrekken.js
├── angular-app/           # Angular application
│   ├── src/
│   │   └── app/
│   │       ├── components/
│   │       ├── services/
│   │       └── enums/
│   └── ANGULAR_README.md
└── .github/workflows/
    └── deploy.yml         # GitHub Pages deployment
```

## 🚀 Deployment

This project uses **GitHub Actions** to automatically build and deploy to GitHub Pages.

### Automatic Deployment

Every push to the `main` or `master` branch triggers:
1. ✅ Angular app build
2. ✅ Vanilla files copy
3. ✅ Deployment to GitHub Pages

### Manual Deployment

You can also trigger deployment manually:
1. Go to the **Actions** tab in GitHub
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

### GitHub Pages Configuration

The workflow automatically:
- Builds the Angular app with correct base href
- Copies vanilla HTML/CSS/JS files
- Deploys everything to GitHub Pages
- Sets up proper routing for both versions

**No manual configuration needed!** Just enable GitHub Pages in repository settings:
1. Go to **Settings** → **Pages**
2. Source: **GitHub Actions** (automatically set by workflow)

## 🛠️ Local Development

### Vanilla Version
```bash
# No build needed! Just open in browser:
open index.html
# or
python -m http.server 8000
```

### Angular Version
```bash
cd angular-app
npm install
npm start
# Visit http://localhost:4200/
```

## 📚 Documentation

- [Angular Migration Guide](MIGRATION_SUMMARY.md) - Quick reference for Angular architecture
- [Angular Full Documentation](angular-app/ANGULAR_README.md) - Comprehensive guide

## 🎯 Features

### Classic Version
- 3-column layout (Original, Removed, Remaining)
- Interactive sun symbols
- Answer validation
- Bridge method tips for crossing tens

### Angular Version
- Component-based architecture
- Problem type classification (AFTREKKEN_BRUG_TIENTAL, etc.)
- Reusable components for tests/exams
- TypeScript type safety
- Editable vs read-only modes
- Automatic tip display based on problem type

## 🔧 GitHub Actions Workflow

The deployment workflow (`.github/workflows/deploy.yml`):
- Runs on push to main/master
- Builds Angular app with production settings
- Copies all necessary files
- Deploys to GitHub Pages
- Supports manual triggering

## 📝 License

See repository for license information.
