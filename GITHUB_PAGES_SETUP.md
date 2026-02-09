# GitHub Pages Deployment Guide

## Overview

This repository is configured to automatically deploy the Angular application to GitHub Pages using GitHub Actions.

## How It Works

### Automatic Deployment

1. **Trigger**: Every push to `main` or `master` branch
2. **Build**: GitHub Actions builds the Angular app
3. **Deploy**: Angular app is deployed to GitHub Pages at root URL
4. **URL**: `https://vbrhino.github.io/reken-visualisaties/`

### Workflow File

Location: `.github/workflows/deploy.yml`

The workflow:
1. Checks out the code
2. Sets up Node.js 20
3. Installs Angular dependencies
4. Builds Angular app with correct base href
5. Deploys to GitHub Pages

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

### Test Angular Application
```bash
cd angular-app
npm install
npm start
# Visit http://localhost:4200/
```

### Test Production Build
```bash
cd angular-app
npm run build -- --base-href /reken-visualisaties/
# Build output in angular-app/dist/angular-app/browser/
```

### Test Deployment Structure
```bash
# Build Angular app
cd angular-app
npm run build -- --base-href /reken-visualisaties/
cd ..

# Create deployment structure
mkdir -p _site
cp -r angular-app/dist/angular-app/browser/* _site/

# Serve locally
cd _site
python -m http.server 8080
# Visit http://localhost:8080/
```

## Deployment Structure

```
GitHub Pages (deployed via Actions):
└── / (root)
    ├── index.html         # Angular app entry point
    ├── main-*.js          # Angular bundle
    ├── styles-*.css       # Styles
    └── favicon.ico
```

## Troubleshooting

### Deployment Not Working?

1. **Check Actions tab**: Look for errors in workflow runs
2. **Verify Pages settings**: Ensure "GitHub Actions" is selected as source
3. **Check branch**: Workflow runs on `main` or `master` only
4. **Check permissions**: Repository needs Pages enabled

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
    npm run build -- --base-href /NEW-REPO-NAME/
```

### Custom Domain

To use a custom domain:

1. Add `CNAME` file to `angular-app/public/` with your domain
2. Configure DNS according to GitHub's instructions
3. The CNAME file will be included in the build automatically

## Status Badge

Add to README to show deployment status:

```markdown
![Deploy Status](https://github.com/vbrhino/reken-visualisaties/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
```

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Angular Deployment Guide](https://angular.io/guide/deployment)
