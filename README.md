# MST Umme Sabiha | Personal Portfolio

Live Site: [portfolio.ummesabiha.com](https://portfolio.ummesabiha.com)

This repository contains the source code for my personal portfolio website, engineered to showcase skills in Network Engineering, Linux System Administration, and Cloud Infrastructure.

## Student Credentials

- **Name:** MST Umme Sabiha
- **Department:** Computer Science and Engineering (CSE)
- **Course:** Ecommerce and Web Programming

---

## Project Architecture

The application is structured cleanly into lightweight, modular files designed for high performance and edge delivery:
- `index.html`: Semantic HTML5 structure (Hero, About Me, Skills Matrix, Dynamic Projects Grid, Contact footer) with complete SEO metadata, Open Graph preview tags, and canonical links for `portfolio.ummesabiha.com`.
- `styles.css`: Modern responsive stylesheet with dark slate styling, CSS variables, CSS Grid / Flexbox layouts, and smooth transition states.
- `script.json`: Structured JSON database of featured projects loaded asynchronously at runtime.
- `script.js`: Dynamic JavaScript handling asynchronous fetching of `script.json`, DOM card rendering, category filtering, and sticky navbar interaction.
- `_headers`: Cloudflare Pages HTTP header rules enforcing security policies (CSP, X-Frame-Options, nosniff) and caching rules for static assets.
- `_redirects`: Cloudflare Pages redirect rules ensuring clean URL handling (canonical `/index.html` -> `/`).
- `wrangler.jsonc`: Cloudflare configuration defining project naming (`portfolio-ummesabiha`), static assets directory, and custom domain route.

---

## Hosting on Cloudflare Pages (`portfolio.ummesabiha.com`)

### Method 1: Cloudflare Pages via GitHub (Recommended)

1. **Commit and Push Changes to GitHub**:
   ```bash
   git add .
   git commit -m "Configure portfolio for portfolio.ummesabiha.com via Cloudflare Pages"
   git push origin main
   ```

2. **Connect Repository in Cloudflare**:
   - Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
   - In the left sidebar, navigate to **Compute (Workers) > Workers & Pages**.
   - Click **Create application** > **Pages** tab > **Connect to Git**.
   - Select your GitHub account and choose the repository `sabiha-dev1/ewpl-assignment-1`.

3. **Configure Build Settings**:
   - **Project name:** `portfolio-ummesabiha` (or `portfolio`)
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `.` (or root `/`)
   - Click **Save and Deploy**. Cloudflare Pages will build and deploy your site to a `*.pages.dev` URL.

4. **Attach Custom Domain (`portfolio.ummesabiha.com`)**:
   - Once the deployment completes, click on your project in Cloudflare Pages.
   - Go to the **Custom domains** tab.
   - Click **Set up a custom domain**.
   - Enter `portfolio.ummesabiha.com` and click **Continue**.
   - **If your domain `ummesabiha.com` is already managed on Cloudflare DNS**:
     - Cloudflare will automatically create the necessary `CNAME` record and issue an SSL certificate.
   - **If your domain `ummesabiha.com` is hosted on an external registrar/DNS provider (e.g. Namecheap, GoDaddy)**:
     - Log in to your DNS provider's control panel.
     - Add a new DNS record:
       - **Type:** `CNAME`
       - **Host / Name:** `portfolio`
       - **Target / Value:** `<your-project-name>.pages.dev`
       - **TTL:** Automatic or 300 seconds
   - Within a few minutes, the SSL certificate will activate, and your portfolio will be live at `https://portfolio.ummesabiha.com`.

---

### Method 2: Deploying via Wrangler CLI

If you prefer deploying directly from your local terminal:

1. Install/run Wrangler:
   ```bash
   npx wrangler pages deploy . --project-name=portfolio-ummesabiha
   ```
2. In the Cloudflare Dashboard under your Pages project, add the custom domain `portfolio.ummesabiha.com` under **Custom domains**.
