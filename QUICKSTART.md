# Quick Start: GitHub Pages Deployment

## 🚀 Enable GitHub Pages (One-Time Setup)

1. Go to your repository on GitHub
2. Click **Settings** (top navigation)
3. Click **Pages** (left sidebar)
4. Under **Source**, select: **GitHub Actions**
5. Click **Save**

**That's it!** The workflow will automatically deploy on the next push.

## 📍 Your URLs (After Deployment)

- **Landing Page**: https://vbrhino.github.io/reken-visualisaties/
- **Classic App**: https://vbrhino.github.io/reken-visualisaties/aftrekken.html  
- **Angular App**: https://vbrhino.github.io/reken-visualisaties/angular/

## 🔄 How It Works

Every time you push to `main` or `master`:
1. GitHub Actions automatically starts
2. Builds the Angular app
3. Deploys everything to GitHub Pages
4. Site is live in ~2-3 minutes

## 📝 Manual Deployment

Go to **Actions** → **Deploy to GitHub Pages** → **Run workflow**

## 🧪 First Deployment Test

After enabling Pages, test it:
1. Make any small change (e.g., edit README.md)
2. Commit and push to main branch
3. Go to **Actions** tab to watch deployment
4. Visit your site URL when complete!

## 📚 Full Documentation

- Deployment details: See `GITHUB_PAGES_SETUP.md`
- Angular architecture: See `MIGRATION_SUMMARY.md`
- Component docs: See `angular-app/ANGULAR_README.md`

## ⚠️ Important Note

The Angular app is built with base href `/reken-visualisaties/angular/` which is correct for GitHub Pages. If you rename your repository, update the base href in `.github/workflows/deploy.yml`.

## 🎉 That's All!

No complex configuration needed. Just enable Pages and push your code!
