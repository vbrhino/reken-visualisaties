# Reken Visualisaties

Interactive math visualization tool built with Angular for subtraction exercises with visual learning aids.

## 🌐 Live Demo

Visit the application at: **[https://vbrhino.github.io/reken-visualisaties/](https://vbrhino.github.io/reken-visualisaties/)**

## 📦 Repository Structure

```
reken-visualisaties/
├── angular-app/           # Angular application
│   ├── src/
│   │   └── app/
│   │       ├── components/
│   │       │   ├── subtraction/    # Main exercise component
│   │       │   └── tip-bar/        # Educational tips component
│   │       ├── services/
│   │       │   └── problem-classifier.service.ts
│   │       └── enums/
│   │           └── problem-type.enum.ts
│   └── ANGULAR_README.md
└── .github/workflows/
    └── deploy.yml         # GitHub Pages deployment
```

## 🚀 Deployment

This project uses **GitHub Actions** to automatically build and deploy to GitHub Pages.

### Automatic Deployment

Every push to the `main` or `master` branch triggers:
1. ✅ Angular app build
2. ✅ Deployment to GitHub Pages at root URL

### Manual Deployment

You can also trigger deployment manually:
1. Go to the **Actions** tab in GitHub
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

### GitHub Pages Configuration

The workflow automatically:
- Builds the Angular app with correct base href
- Deploys to GitHub Pages root
- Sets up proper routing

**No manual configuration needed!** Just enable GitHub Pages in repository settings:
1. Go to **Settings** → **Pages**
2. Source: **GitHub Actions** (automatically set by workflow)

## 🛠️ Local Development

```bash
cd angular-app
npm install
npm start
# Visit http://localhost:4200/
```

## 📚 Documentation

- [Angular Full Documentation](angular-app/ANGULAR_README.md) - Comprehensive guide
- [Migration Summary](MIGRATION_SUMMARY.md) - Architecture overview (historical)

## 🎯 Features

### Component Architecture
- Reusable components for tests/exams
- Problem type classification (AFTREKKEN_BRUG_TIENTAL, etc.)
- TypeScript type safety
- Editable vs read-only modes

### Interactive Learning
- 3-column layout (Original, Removed, Remaining)
- Interactive sun symbols (☀️)
- Answer validation with feedback
- Automatic tip display based on problem type
- Bridge method ("brug over de 10") educational hints

### Problem Classification
The app automatically detects and classifies subtraction problems:
- **AFTREKKEN_BRUG_TIENTAL**: Crosses tens boundary (e.g., 16 - 8, 21 - 5)
- **AFTREKKEN_SIMPEL**: Simple subtraction (e.g., 15 - 3)

## 🔧 GitHub Actions Workflow

The deployment workflow (`.github/workflows/deploy.yml`):
- Runs on push to main/master
- Builds Angular app with production settings
- Deploys to GitHub Pages root
- Supports manual triggering

## 🏗️ Architecture

Built with modern Angular using:
- **Standalone Components**: No NgModule needed
- **TypeScript**: Full type safety
- **Services**: Problem classification logic
- **Enums**: Type-safe problem categorization

Perfect for:
- Practice exercises
- Tests and examinations
- Timed exercises
- Educational tools

## 📝 License

See repository for license information.
