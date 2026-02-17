# 🚀 COMPLETE DEPLOYMENT GUIDE - GitHub Pages (100% FREE)

## ✅ WHAT YOU HAVE

This is the **EXACT SAME** portfolio as https://daksh18.tech/

**All Features Included:**
- ✨ Animated particle background
- 🌓 Dark/Light mode toggle
- ⌨️ Typewriter effect
- 🕐 Live IST clock
- 📍 Location badge
- 🎨 Smooth animations
- 📱 Fully responsive
- 🚀 Projects showcase
- 💻 Tech stack with marquee
- 📧 Contact form
- 🧭 Bottom dock navigation
- And everything else!

---

## 📋 STEP-BY-STEP DEPLOYMENT (10 Minutes)

### **STEP 1: Prepare Your Computer**

Install these (if you don't have them):

1. **Node.js** - Download from https://nodejs.org/
   - Choose "LTS" version
   - Install it
   - Check: Open terminal/cmd and type `node --version`

2. **Git** - Download from https://git-scm.com/
   - Install it
   - Check: Type `git --version`

3. **VS Code** (Optional but recommended) - https://code.visualstudio.com/

---

### **STEP 2: Get The Code**

You have two options:

#### **Option A: Extract from ZIP** (You already have it!)
```bash
# Just extract the portfolio folder to your computer
# Open it in VS Code
```

#### **Option B: Clone from GitHub**
```bash
git clone <your-repo-url>
cd portfolio-folder
```

---

### **STEP 3: Install Dependencies**

Open terminal in your portfolio folder:

```bash
# Install all packages
npm install

# Wait 2-3 minutes... it will download everything
```

---

### **STEP 4: Test Locally**

```bash
# Run development server
npm run dev
```

**You should see:**
```
VITE v7.x.x  ready in 300 ms

➜  Local:   http://localhost:5173/
```

Open http://localhost:5173/ in your browser - **Your portfolio is LIVE!** 🎉

Press `Ctrl + C` to stop the server.

---

### **STEP 5: Customize Your Portfolio**

#### **A. Change Personal Info**

**File: `src/Components/Sections/Hero.tsx`**
```typescript
// Line 56 & 104 - Change your name
<div className="text-[26px]...">
  Hi, I'm YOUR_NAME 👋  // <-- Change this
</div>

// Line 66-71 & 115-120 - Change roles
<Typewriter
  words={[
    "Your Role 1.",      // <-- Change these
    "Your Role 2.",
    "Full Stack Developer.",
    "Your Role 3.",
  ]}
/>

// Line 41 - Change location
<span>Your City, Country</span>  // <-- Change this
```

#### **B. Update Projects**

**File: `src/Components/Sections/Projects.tsx`**
```typescript
// Line 22-55 - Replace with your projects
const projects: Project[] = [
  {
    title: "Your Project Name",
    description: "Your project description...",
    technologies: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/yourusername/project",
    live: "https://yourproject.com",
    image: "/your-project-image.png"  // Put image in public/ folder
  },
  // Add more projects...
];
```

#### **C. Update Social Links**

**File: `src/utils/constants.ts`**
```typescript
// Line 4-10 - Update your social media
export const SOCIAL_LINKS = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  twitter: "https://x.com/yourusername",
  discord: "https://discord.gg/yourserver",
  instagram: "https://instagram.com/yourusername",
}
```

#### **D. Add Your Images**

1. **Profile Picture**: Replace `public/PfLogo.png` with your photo
2. **Project Images**: Add to `public/` folder
3. **Resume**: Replace `public/DakshResume.pdf` with yours

#### **E. Configure Contact Form (Optional)**

1. Go to https://www.emailjs.com/
2. Sign up for FREE
3. Create a service and template
4. Create `.env` file (copy from `.env.example`)
5. Add your credentials:
```bash
VITE_EMAILJS_SERVICE_ID=service_xxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
```

---

### **STEP 6: Create GitHub Repository**

1. Go to https://github.com/
2. Click **"New"** (top right)
3. Name it: `my-portfolio` (or any name you want)
4. **Keep it PUBLIC**
5. **DON'T** check "Add README"
6. Click **"Create repository"**

---

### **STEP 7: Upload to GitHub**

In your portfolio folder terminal:

```bash
# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - My portfolio"

# Connect to GitHub (replace with YOUR repo URL)
git remote add origin https://github.com/YOUR-USERNAME/my-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Your code is now on GitHub!** 🎉

---

### **STEP 8: Deploy to GitHub Pages**

Two methods:

#### **Method A: Automatic (Recommended)**

1. **Install gh-pages package** (if not already):
```bash
npm install gh-pages --save-dev
```

2. **Update `vite.config.ts`** - Change base to your repo name:
```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/my-portfolio/',  // <-- Change to YOUR repo name
  build: {
    outDir: 'dist',
  },
})
```

3. **Deploy**:
```bash
npm run deploy
```

#### **Method B: GitHub Actions (Advanced)**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

### **STEP 9: Enable GitHub Pages**

1. Go to your GitHub repo
2. Click **"Settings"**
3. Click **"Pages"** (left sidebar)
4. Under "Source", select **"gh-pages"** branch
5. Click **"Save"**

**Wait 2-3 minutes...**

Your site will be live at:
```
https://YOUR-USERNAME.github.io/my-portfolio/
```

---

## 🎉 YOU'RE DONE!

Your portfolio is now:
- ✅ Live on the internet
- ✅ 100% FREE
- ✅ Exactly like Daksh's portfolio
- ✅ Fully customizable

---

## 🔧 COMMON ISSUES & FIXES

### **Issue 1: Blank page after deployment**

**Fix**: Update `vite.config.ts` base path:
```typescript
base: '/YOUR-REPO-NAME/',  // Must match your GitHub repo name
```

### **Issue 2: Images not showing**

**Fix**: Make sure images are in `public/` folder and paths start with `/`
```typescript
<img src="/PfLogo.png" />  // ✅ Correct
<img src="PfLogo.png" />   // ❌ Wrong
```

### **Issue 3: 404 on page refresh**

**Fix**: Add `404.html` to `public/` folder (copy of `index.html`)

### **Issue 4: Contact form not working**

**Fix**: Set up EmailJS account and add credentials to `.env` file

---

## 📝 UPDATING YOUR PORTFOLIO

Whenever you make changes:

```bash
# 1. Save your changes
# 2. Add and commit
git add .
git commit -m "Updated projects section"

# 3. Push to GitHub
git push

# 4. Deploy
npm run deploy
```

Changes will be live in 2-3 minutes!

---

## 🌐 CUSTOM DOMAIN (Optional - $10-15/year)

Want `yourname.com` instead of `username.github.io`?

1. Buy domain from **Namecheap** or **Porkbun** ($10-15/year)
2. In repo settings → Pages → Custom domain
3. Add your domain
4. Update DNS settings at your domain provider
5. Wait 24 hours

---

## 💡 PRO TIPS

1. **Update regularly** - Keep adding new projects
2. **Optimize images** - Use compressed images for faster loading
3. **SEO**: Update `public/manifest.json` and `public/sitemap.xml`
4. **Analytics**: Add Google Analytics (free) to track visitors
5. **Backup**: Always keep your code on GitHub

---

## 📞 NEED HELP?

**Common Commands:**
```bash
npm run dev       # Run locally
npm run build     # Build for production
npm run preview   # Preview production build
npm run deploy    # Deploy to GitHub Pages
```

**Helpful Links:**
- GitHub Pages Docs: https://pages.github.com/
- Vite Docs: https://vitejs.dev/
- EmailJS Setup: https://www.emailjs.com/docs/

---

## 🎯 CHECKLIST

Before deploying, make sure you:

- [ ] Changed name in Hero section
- [ ] Updated social media links
- [ ] Added your projects
- [ ] Replaced profile picture
- [ ] Added your resume PDF
- [ ] Set up EmailJS (optional)
- [ ] Updated `vite.config.ts` base path
- [ ] Tested locally with `npm run dev`
- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Deployed with `npm run deploy`
- [ ] Enabled GitHub Pages in settings

---

## 🚀 YOU'RE ALL SET!

Your professional portfolio is now **LIVE** and **FREE FOREVER**!

**Share it with:**
- Employers
- Clients
- Friends
- On your resume
- On LinkedIn

**Good luck!** 🎉
