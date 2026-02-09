# Legacy Cleanup Summary

## What Was Removed

### Legacy Files Deleted ✅
- `aftrekken.html` - Vanilla HTML subtraction page (~3,024 bytes)
- `aftrekken.js` - Vanilla JavaScript logic (~8,853 bytes)
- `styles.css` - Legacy CSS styles (~10,334 bytes)
- `index.html` - Old landing page with version selection (~2,188 bytes)

**Total removed**: ~24 KB of legacy code

## What Changed

### Simplified Deployment
**Before**: 
- Two versions (vanilla + Angular)
- Complex landing page with version selection
- Angular deployed to `/angular/` subfolder
- Multiple URLs to maintain

**After**:
- Single Angular application
- Deployed directly to root URL
- One simple URL structure
- Cleaner, faster deployments

### URL Structure

| Type | Before | After |
|------|--------|-------|
| Landing | `/` | N/A (removed) |
| Classic | `/aftrekken.html` | N/A (removed) |
| Angular | `/angular/` | `/` (root) ✅ |

### Updated Files

1. **`.github/workflows/deploy.yml`**
   - Removed vanilla file copying
   - Changed base href to `/reken-visualisaties/`
   - Simplified from 8 build steps to 5

2. **`README.md`**
   - Removed "Classic Version" sections
   - Updated to Angular-only structure
   - Simplified deployment docs

3. **`QUICKSTART.md`**
   - Single URL instead of three
   - Removed vanilla references
   - Cleaner setup instructions

4. **`GITHUB_PAGES_SETUP.md`**
   - Angular-only deployment guide
   - Removed vanilla testing sections
   - Updated base href examples

## Benefits

✅ **Simpler**: One codebase instead of two
✅ **Faster**: Fewer files to copy during deployment
✅ **Cleaner**: No legacy code to maintain
✅ **Modern**: TypeScript and Angular only
✅ **Scalable**: Component-based architecture for future growth

## Migration Path

The legacy vanilla version has been completely removed. All future development will be in the Angular application only.

### For Users

If you have bookmarks or links to the old URLs:
- ❌ `https://vbrhino.github.io/reken-visualisaties/angular/`
- ✅ `https://vbrhino.github.io/reken-visualisaties/`

Update your bookmarks to the new root URL.

## Next Deploy

After this change is merged, GitHub Actions will:
1. Build the Angular app with base href `/reken-visualisaties/`
2. Deploy to GitHub Pages root
3. Make the app available at `https://vbrhino.github.io/reken-visualisaties/`

No manual intervention needed!
