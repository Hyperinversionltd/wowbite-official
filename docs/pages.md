GitHub Pages deployment

This branch adds a GitHub Actions workflow that publishes the repository to GitHub Pages on pushes to main.

How it works
- When the workflow runs, it uploads the repository contents as an artifact and the deploy step publishes that artifact to the repository's Pages site.
- After merging this branch into main, GitHub Pages will deploy automatically whenever you push to main.

Notes
- No secrets are required; the workflow uses the built-in GITHUB_TOKEN.
- The Pages site will be available at: https://Hyperinversionltd.github.io/wowbite-official (it may take a minute after first deploy).

To enable immediately
1. Merge this branch into the main branch.
2. Wait for the workflow to run (Actions → Deploy to GitHub Pages).
3. Visit the Pages URL above.

If you want, I can open a pull request for this branch into main or merge it for you if you give me permission to push to main.