# 🚀 Setting Up Fresh SecondView Repository on GitHub

## Method 1: Quick Setup (Recommended for Beginners)

### Step 1: Create New Repo on GitHub
1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `secondview`
   - **Description**: `AI-powered blood test analysis - Educational tool for understanding biomarkers`
   - **Visibility**: Choose Public or Private
   - ✅ Check "Add a README file"
   - ✅ Add .gitignore template: Select "Node"
   - License: Optional (MIT is common for open source)
3. Click **"Create repository"**

### Step 2: Clone Your New Repo
```bash
# Open terminal and navigate to where you want the project
cd ~/Projects  # or wherever you keep your code

# Clone your new empty repo
git clone https://github.com/YOUR_USERNAME/secondview.git
cd secondview
```

### Step 3: Copy All MVP Files
Download all files from the outputs folder above, then:

```bash
# Copy the project structure
# From your downloads folder, copy:
- All folders (components, pages, lib, data, types, supabase)
- All files (App.tsx, package.json, README.md, etc.)

# Into your cloned secondview/ directory
```

Your directory should look like:
```
secondview/
├── .git/                          (already there from clone)
├── .gitignore                     (already there from clone)
├── src/
│   ├── components/               (copy this)
│   ├── pages/                    (copy this)
│   ├── lib/                      (copy this)
│   ├── data/                     (copy this)
│   ├── types/                    (copy this)
│   ├── App.tsx                   (copy this)
│   ├── main.tsx                  (create this)
│   └── index.css                 (create this)
├── public/                       (create empty folder)
├── supabase/                     (copy this)
├── docs/                         (optional: copy docs)
├── index.html                    (copy this)
├── package.json                  (copy this)
├── vite.config.ts               (copy this)
├── tsconfig.json                (copy this)
├── tailwind.config.ts           (copy this)
├── postcss.config.js            (copy this)
├── .env.example                 (copy this)
└── README.md                    (merge or replace)
```

### Step 4: Create Missing Setup Files

Create `src/main.tsx`:
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

Create `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Step 5: Install Dependencies
```bash
npm install
```

### Step 6: Set Up Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env and add your Anthropic API key (optional for now)
# The app works without it using fallback analysis
```

### Step 7: Test Locally
```bash
npm run dev
```
Visit http://localhost:5173 - you should see your landing page!

### Step 8: Commit and Push
```bash
# Add all files
git add .

# Commit
git commit -m "Add SecondView MVP implementation

- Complete React + TypeScript application
- AI-powered blood test analysis
- Manual entry and sample data flows
- Interactive results dashboard
- Q&A chat interface
- Full documentation"

# Push to GitHub
git push origin main
```

Done! Your repo is now live on GitHub. 🎉

---

## Method 2: Command Line Setup (For Experienced Developers)

### Quick Command Sequence

```bash
# 1. Create and navigate to new directory
mkdir secondview && cd secondview

# 2. Initialize git
git init

# 3. Create basic structure
mkdir -p src/{components/{landing,upload,analysis},pages,lib,data,types}
mkdir -p public supabase/migrations docs

# 4. Copy all your MVP files here
# (Download from outputs and copy into appropriate folders)

# 5. Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
EOF

# 6. Add files
git add .

# 7. Initial commit
git commit -m "Initial commit: SecondView MVP"

# 8. Create repo on GitHub (via web interface)
# Then connect:
git remote add origin https://github.com/YOUR_USERNAME/secondview.git
git branch -M main
git push -u origin main

# 9. Install and run
npm install
npm run dev
```

---

## Method 3: Using GitHub CLI (Fastest)

If you have GitHub CLI installed:

```bash
# 1. Create directory and initialize
mkdir secondview && cd secondview
git init

# 2. Copy all your MVP files here

# 3. Create repo directly from terminal
gh repo create secondview --public --source=. --remote=origin

# 4. Add and commit
git add .
git commit -m "Initial commit: SecondView MVP"

# 5. Push
git push -u origin main

# 6. Install and run
npm install
npm run dev

# 7. Open in browser
gh browse
```

---

## 🔍 Verify Your Setup

After pushing, visit your GitHub repo and check:

✅ **Files visible**: components/, lib/, data/, types/, etc.  
✅ **README renders**: Should show project description  
✅ **No node_modules/**: Should be in .gitignore  
✅ **No .env file**: Should be in .gitignore  
✅ **.env.example present**: For others to know what vars are needed  

---

## 📝 After Setup Checklist

- [ ] Repo created on GitHub
- [ ] All files pushed
- [ ] `npm install` successful
- [ ] `npm run dev` works
- [ ] Landing page loads at localhost:5173
- [ ] Sample demo works
- [ ] Manual entry works
- [ ] No errors in console

---

## 🐛 Common Issues

### Issue: "fatal: not a git repository"
**Solution**: Run `git init` in your project folder first

### Issue: "remote origin already exists"
**Solution**: 
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/secondview.git
```

### Issue: "permission denied (publickey)"
**Solution**: Set up SSH key or use HTTPS URL instead
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/secondview.git
```

### Issue: "npm ERR! code ENOENT"
**Solution**: Make sure package.json exists in your directory

### Issue: "Port 5173 is already in use"
**Solution**: 
```bash
# Kill the existing process or change port in vite.config.ts
lsof -ti:5173 | xargs kill
```

---

## 🎯 Next Steps After Setup

1. **Enable GitHub Pages** (optional):
   - Settings → Pages → Source: GitHub Actions
   - Deploy with Vite static deployment

2. **Add Collaborators** (optional):
   - Settings → Collaborators → Add people

3. **Set up Branch Protection** (optional):
   - Settings → Branches → Add rule for `main`

4. **Add GitHub Actions** (optional):
   - CI/CD for automated testing
   - Auto-deploy to Vercel/Netlify

5. **Create Project Board**:
   - Track features and bugs
   - Organize your roadmap

---

## 💡 Pro Tips

- **Commit often**: Small, focused commits are better
- **Write good commit messages**: "Add feature X" not "changes"
- **Use branches**: `git checkout -b feature/pdf-upload`
- **Pull before push**: `git pull origin main` before pushing
- **Keep .env secret**: Never commit API keys!

---

## 🔗 Useful Git Commands

```bash
# Check status
git status

# See what changed
git diff

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset HEAD~1

# Discard all local changes
git reset --hard HEAD

# Create and switch to new branch
git checkout -b feature-name

# Push new branch to GitHub
git push -u origin feature-name

# Update from remote
git pull origin main
```

---

## 📧 Need Help?

If you get stuck:
1. Check the error message carefully
2. Google the exact error
3. Check GitHub documentation
4. Ask in relevant forums (Reddit, Stack Overflow)

---

**Ready to start?** Follow Method 1 for the smoothest experience! 🚀
