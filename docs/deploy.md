Deploying Wowbite

This document explains how to connect the repository to Vercel (static site) and Render (live feed server).

1) Vercel — static site (recommended)
- Go to https://vercel.com and import the repository "Hyperinversionltd/wowbite-official".
- During setup, configure the Project settings. Vercel will detect the static site and deploy index.html from the repository root.
- To enable automated deploys from GitHub via GitHub Actions, create the following repository secrets in GitHub:
  - VERCEL_TOKEN (Your personal access token from Vercel)
  - VERCEL_ORG_ID (Organization ID for the project)
  - VERCEL_PROJECT_ID (Project ID for the created project)
- After adding the secrets, the workflow .github/workflows/deploy-static-to-vercel.yml will deploy the site on each push to main.

2) Render — persistent Node server for aggregator (recommended for SSE/WebSockets)
- Create a new Web Service on Render and connect the repository. You can import the render.yaml or create the service using the UI.
- Add environment variables in Render Service settings:
  - YOUTUBE_API_KEY (if using YouTube)
  - TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET (if using Twitch)
  - POLL_INTERVAL_SECONDS
- Note the Service ID (found in the service URL or Render dashboard). Add it to your GitHub repository secrets as RENDER_SERVICE_ID.
- Create a Render API key (service account) and add it as the GitHub secret RENDER_API_KEY.
- The workflow .github/workflows/deploy-server-to-render.yml will trigger a deploy on push to main.

3) Local testing
- To run the static site locally:
  - python -m http.server 8000
  - open http://localhost:8000
- To run the server locally:
  - cd server && npm install && npm start
  - The aggregator runs on PORT (default 4000)

If you want, I can also open PRs that add these files (workflows and render.yaml) into the repository and include a small checklist. You will still need to create Vercel and Render projects and add the required secrets to GitHub for automated deployments to work.
