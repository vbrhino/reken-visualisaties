# GitHub Pages Deployment Guide

## Overview

This repository is configured to automatically deploy to GitHub Pages using GitHub Actions. Both the vanilla HTML/CSS/JS version and the Angular application are deployed together.

## How It Works

### Automatic Deployment

1. **Trigger**: Every push to `main` or `master` branch
2. **Build**: GitHub Actions builds the Angular app
3. **Deploy**: Both vanilla and Angular versions are deployed to GitHub Pages
4. **URL Structure**:
   - Landing page: `https://vbrhino.github.io/reken-visualisaties/`
   - Classic version: `https://vbrhino.github.io/reken-visualisaties/aftrekken.html`
   - Angular version: `https://vbrhino.github.io/reken-visualisaties/angular/`

### Workflow File

Location: `.github/workflows/deploy.yml`

The workflow:
1. Checks out the code
2. Sets up Node.js 20
3. Installs Angular dependencies
4. Builds Angular app with correct base href
5. Copies all files to deployment directory
6. Deploys to GitHub Pages

## Initial Setup (One-Time)

### Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select: **GitHub Actions**
3. The workflow will handle the rest automatically

That's it! GitHub Actions will automatically deploy on every push.

## Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab in GitHub
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select branch and click **Run workflow**

## Testing Locally

### Test Vanilla Version
```bash
# Open directly in browser
open index.html

# Or with a simple server
python -m http.server 8000
# Visit http://localhost:8000/
```

### Test Angular Version
```bash
cd angular-app
npm install
npm start
# Visit http://localhost:4200/
```

### Test Full Deployment Structure
```bash
# Build everything
cd angular-app
npm run build -- --base-href /reken-visualisaties/angular/
cd ..

# Create deployment structure
mkdir -p _site/angular
cp index.html styles.css aftrekken.html aftrekken.js _site/
cp -r angular-app/dist/angular-app/browser/* _site/angular/

# Serve
cd _site
python -m http.server 8080
# Visit http://localhost:8080/
```

**Note**: When testing locally, the Angular app's links won't work perfectly because it's built with the GitHub Pages base href. This is normal and will work correctly once deployed.

## Deployment Structure

```
GitHub Pages (gh-pages branch or Actions deployment):
├── index.html              # Landing page with version selection
├── styles.css              # Shared styles
├── aftrekken.html         # Classic vanilla version
├── aftrekken.js
├── README.md
├── MIGRATION_SUMMARY.md
└── angular/               # Angular app
    ├── index.html
    ├── main-*.js
    ├── styles-*.css
    └── favicon.ico
```

## Troubleshooting

### Deployment Not Working?

1. **Check Actions tab**: Look for errors in workflow runs
2. **Verify Pages settings**: Ensure "GitHub Actions" is selected as source
3. **Check branch**: Workflow runs on `main` or `master` only
4. **Check permissions**: Repository needs Pages enabled

### Angular Routes 404?

The Angular app uses base href `/reken-visualisaties/angular/` for GitHub Pages. This is correct and will work once deployed.

### Build Failures?

Check the Actions logs:
1. Go to **Actions** tab
2. Click on the failed workflow run
3. Expand the failed step to see error details

Common issues:
- Missing dependencies: Check `angular-app/package.json`
- Build errors: Test locally with `npm run build`
- Path issues: Verify base href configuration

## Updating the Site

Simply push changes to the main branch:

```bash
git add .
git commit -m "Update site"
git push origin main
```

GitHub Actions will automatically rebuild and deploy within 2-3 minutes.

## Advanced Configuration

### Change Base URL

If you rename the repository, update the base href in `.github/workflows/deploy.yml`:

```yaml
- name: Build Angular app
  run: |
    cd angular-app
    npm run build -- --base-href /NEW-REPO-NAME/angular/
```

### Add More Files

To deploy additional files, update the workflow:

```yaml
- name: Copy additional files
  run: |
    cp your-file.html _site/
```

### Custom Domain

To use a custom domain:

1. Add `CNAME` file to repository root with your domain
2. Update workflow to copy it:
   ```yaml
   cp CNAME _site/
   ```
3. Configure DNS according to GitHub's instructions

## Status Badge

Add to README to show deployment status:

```markdown
![Deploy Status](https://github.com/vbrhino/reken-visualisaties/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
```

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Angular Deployment Guide](https://angular.io/guide/deployment)
