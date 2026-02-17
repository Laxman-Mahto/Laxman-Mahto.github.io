# ⚡ QUICK CUSTOMIZATION GUIDE

## 🎯 5-MINUTE CUSTOMIZATION

### 1️⃣ **Change Your Name** (2 places)

**File: `src/Components/Sections/Hero.tsx`**

**Line 56** (Mobile):
```typescript
Hi, I'm YOUR_NAME 👋
```

**Line 104** (Desktop):
```typescript
Hi, I'm YOUR_NAME 👋
```

---

### 2️⃣ **Change Your Roles** (2 places)

**File: `src/Components/Sections/Hero.tsx`**

**Lines 66-71** (Mobile) AND **Lines 115-120** (Desktop):
```typescript
<Typewriter
  words={[
    "Software Engineer.",
    "Web Developer.",
    "UI/UX Designer.",
    "Problem Solver.",
  ]}
  loop={0}
  cursor
  cursorStyle="|"
  typeSpeed={80}
  deleteSpeed={50}
  delaySpeed={1500}
/>
```

---

### 3️⃣ **Change Location**

**File: `src/Components/Sections/Hero.tsx`**

**Line 41**:
```typescript
<span>Your City, Your Country</span>
```

---

### 4️⃣ **Update Social Links**

**File: `src/utils/constants.ts`**

**Lines 4-10**:
```typescript
export const SOCIAL_LINKS = {
  github: "https://github.com/YOUR_USERNAME",
  linkedin: "https://linkedin.com/in/YOUR_PROFILE",
  twitter: "https://x.com/YOUR_USERNAME",
  discord: "https://discord.gg/YOUR_SERVER",
  instagram: "https://instagram.com/YOUR_USERNAME",
} as const;
```

---

### 5️⃣ **Add Your Projects**

**File: `src/Components/Sections/Projects.tsx`**

**Lines 22-55** - Replace ALL projects:
```typescript
const projects: Project[] = [
  {
    title: "Project 1 Name",
    description: "Short description of what this project does and the problem it solves.",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
    github: "https://github.com/YOUR_USERNAME/project1",
    live: "https://project1-demo.com",
    image: "/project1-screenshot.png"  // Add image to public/ folder
  },
  {
    title: "Project 2 Name",
    description: "Another project description...",
    technologies: ["Next.js", "Tailwind", "PostgreSQL"],
    github: "https://github.com/YOUR_USERNAME/project2",
    live: "https://project2-demo.com",
    image: "/project2-screenshot.png"
  },
  {
    title: "Project 3 Name",
    description: "Your third project...",
    technologies: ["Python", "Django", "React"],
    github: "https://github.com/YOUR_USERNAME/project3",
    // No live demo? Just skip the 'live' field
    image: "/project3-screenshot.png"
  },
  {
    title: "Project 4 Name",
    description: "Fourth project description...",
    technologies: ["Vue.js", "Express", "MySQL"],
    github: "https://github.com/YOUR_USERNAME/project4",
    live: "https://project4-demo.com",
    image: "/project4-screenshot.png"
  },
];
```

**💡 Tips for Projects:**
- Keep descriptions under 200 characters
- Use 3-7 technologies per project
- Always include GitHub link
- Live demo is optional
- Image should be 1200x630px for best results

---

### 6️⃣ **Update Tech Stack**

**File: `src/Components/Sections/TechStack.tsx`**

**Lines 35-108** - Update icons and names:

```typescript
// Frontend
<SiReact className="text-[#61DAFB]" size={iconSize} />
<SiTypescript className="text-[#3178C6]" size={iconSize} />
<SiJavascript className="text-[#F7DF1E]" size={iconSize} />
// ... add more

// Backend  
<SiNodedotjs className="text-[#339933]" size={iconSize} />
<SiPython className="text-[#3776AB]" size={iconSize} />
// ... add more

// Databases
<SiMongodb className="text-[#47A248]" size={iconSize} />
<SiPostgresql className="text-[#4169E1]" size={iconSize} />
// ... add more
```

**Available Icons** (from `react-icons/si`):
- Frontend: `SiReact`, `SiVuedotjs`, `SiAngular`, `SiNextdotjs`
- Languages: `SiJavascript`, `SiTypescript`, `SiPython`, `SiJava`, `SiGo`
- Backend: `SiNodedotjs`, `SiExpress`, `SiDjango`, `SiFastapi`
- Databases: `SiMongodb`, `SiPostgresql`, `SiMysql`, `SiRedis`
- Tools: `SiGit`, `SiDocker`, `SiKubernetes`, `SiJenkins`

---

### 7️⃣ **Add Your Images**

**Profile Picture:**
1. Find a good photo (square, 500x500px+)
2. Save as `PfLogo.png`
3. Replace `public/PfLogo.png`

**Project Images:**
1. Take screenshots of your projects
2. Resize to 1200x630px
3. Save as `project-name.png`
4. Put in `public/` folder
5. Reference in Projects section: `image: "/project-name.png"`

**Resume:**
1. Export your resume as PDF
2. Name it `YourName-Resume.pdf`
3. Replace `public/DakshResume.pdf`
4. Update filename in code if needed

---

### 8️⃣ **Update About Section**

**File: `src/Components/Sections/About.tsx`**

Replace the entire about text with your bio:
```typescript
<p className="text-gray-600 dark:text-gray-300...">
  Write your bio here. Talk about who you are, what you do,
  your interests, your journey into tech, what drives you, etc.
  Keep it personal and authentic. 2-3 paragraphs is perfect.
</p>
```

---

### 9️⃣ **Configure Contact Form**

**Option A: Use EmailJS (Free)**

1. Go to https://www.emailjs.com/
2. Sign up (FREE)
3. Create:
   - Email Service (Gmail/Outlook)
   - Email Template
4. Get your credentials
5. Create `.env` file:

```bash
VITE_EMAILJS_SERVICE_ID=service_xxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
```

**Option B: Remove Contact Form**

Just delete or hide the Contact component.

---

### 🔟 **Update SEO & Meta Tags**

**File: `public/index.html`**

```html
<title>Your Name - Portfolio</title>
<meta name="description" content="Your description here">
<meta name="author" content="Your Name">
```

**File: `public/manifest.json`**

```json
{
  "name": "Your Name Portfolio",
  "short_name": "YourName",
  "description": "Personal portfolio website"
}
```

---

## 🎨 COLOR CUSTOMIZATION

Want different colors?

**File: `src/index.css`**

```css
:root {
  --background: 0 0% 100%;        /* White background */
  --foreground: 0 0% 3.9%;        /* Almost black text */
  --accent: 220 100% 50%;         /* Blue accent */
}

.dark {
  --background: 0 0% 3.9%;        /* Dark background */
  --foreground: 0 0% 98%;         /* White text */
  --accent: 220 100% 60%;         /* Lighter blue */
}
```

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying:

```bash
# 1. Test locally
npm run dev

# 2. Check everything works:
- [ ] Name is correct
- [ ] Social links work
- [ ] Projects show up
- [ ] Images load
- [ ] Contact form works (if using)
- [ ] Dark mode toggles
- [ ] Mobile responsive

# 3. Build
npm run build

# 4. Preview production build
npm run preview

# 5. Deploy
npm run deploy
```

---

## 📱 RESPONSIVE DESIGN

The portfolio is already fully responsive! It works on:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

No changes needed unless you add custom sections.

---

## 💡 PRO TIPS

1. **Use high-quality images** - But compress them!
2. **Keep it simple** - Less is more
3. **Update regularly** - Add new projects as you build them
4. **Test on mobile** - Most visitors will be on phones
5. **Check dark mode** - Make sure everything looks good in both themes
6. **Proofread** - Check for typos!
7. **Get feedback** - Ask friends to review before sharing

---

## 🎯 MOST COMMON FILES TO EDIT

You'll mainly work in these 5 files:

1. **`src/Components/Sections/Hero.tsx`** - Name, roles, location
2. **`src/Components/Sections/Projects.tsx`** - Your projects
3. **`src/Components/Sections/About.tsx`** - Your bio
4. **`src/Components/Sections/TechStack.tsx`** - Your skills
5. **`src/utils/constants.ts`** - Social links

That's 95% of customization!

---

## ⏱️ TIME ESTIMATES

- **Basic customization**: 30 minutes
- **Add all projects**: 1 hour
- **Perfect everything**: 2-3 hours
- **Total to deploy**: ~3 hours

---

## 🆘 QUICK FIXES

**Particles not showing?**
→ Check browser console for errors

**Dark mode not working?**
→ Clear browser localStorage

**Images broken?**
→ Make sure they're in `public/` and paths start with `/`

**Contact form not working?**
→ Check EmailJS credentials in `.env`

**Deployment issues?**
→ Check `vite.config.ts` base path matches repo name

---

## ✅ YOU'RE READY!

With these changes, your portfolio will be:
- 🎨 Unique to you
- 💼 Professional
- 🚀 Fast
- 📱 Responsive
- 🌓 Dark mode ready
- ✨ Beautiful

**Happy customizing!** 🎉
