# Personal Resume & Portfolio Website

A premium, glassmorphic personal website that acts as a dynamic resume. This website is built using a **data-driven design**, meaning all of your content is stored in a single, simple configuration file (`data.js`). 

You do **not** need to write HTML or modify complex code structures to update your website. Just update the text or items in the configuration list, and the website updates itself automatically!

---

## 📁 Project Structure

- `index.html` — The structural markup of the page. Sets up layouts, sections, and loads assets.
- `style.css` — Custom stylesheet using HSL variables, responsive grids, glassmorphism, and scroll-driven entry animations.
- `data.js` — **Your Resume Data**. Edit this file to add or change details (certifications, jobs, projects).
- `app.js` — The logic engine that loads `data.js` and renders it onto the page.

---

## 🚀 How to View Locally

Simply double-click the [index.html](file:///E:/Ayush_Website/index.html) file to open it in any modern browser. 
*No local web server is required!*

---

## ✍️ How to Add or Edit Resume Data

Open [data.js](file:///E:/Ayush_Website/data.js) in a text editor (e.g. VS Code, Notepad). You will see a `RESUME_DATA` object divided into clearly commented sections:

### 1. Adding a Certification
Find the `certifications` array (near the bottom) and add a new item block inside the square brackets `[...]`. Separate items with commas.
```javascript
certifications: [
  // Existing certifications...
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Coursera",
    date: "Issued Mar 2026",
    credentialUrl: "https://coursera.org/verify/example",
    icon: "fa-certificate" // FontAwesome icon class (e.g., fa-certificate, fa-aws, fa-code)
  }
]
```

### 2. Adding a Project
Find the `projects` array and add a new block. Use category values: `"web"`, `"ml"`, or `"design"` to make the filter bar work automatically.
```javascript
projects: [
  // Existing projects...
  {
    title: "EcoSphere Mobile App",
    description: "An environmental tracking mobile app designed in Figma and built with React Native to help track carbon footprints.",
    category: "web", // Options: "web", "ml", "design"
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop", // Image link
    liveUrl: "https://example.com/demo", // Leave as "#" if not applicable
    githubUrl: "https://github.com/yourusername/project", // Leave as "#" if private
    tags: ["React Native", "Expo", "Figma", "Firebase"]
  }
]
```

### 3. Adding Work Experience or Education
Find the `experience` or `education` arrays and add a new block:
```javascript
experience: [
  {
    role: "Technical Consultant",
    company: "FutureLabs Corp",
    location: "Mumbai, India",
    period: "2026 - Present",
    description: "Providing solutions for cloud scaling and enterprise architecture integrations.",
    bullets: [
      "Optimized load times across 15+ micro-frontend systems.",
      "Implemented OAuth2.0 single sign-on security protocols."
    ],
    tags: ["OAuth2", "Microfrontends", "Kubernetes"]
  }
]
```

---

## 🎨 Styling Customization (Change Theme Colors)

You can easily change the color scheme of the website by modifying the CSS variables in [style.css](file:///E:/Ayush_Website/style.css) inside the `:root` block:

```css
:root {
  /* ... */
  --bg-main: #06060c; /* Background of the page */
  --primary-color: #8b5cf6; /* Main Indigo color */
  --secondary-color: #06b6d4; /* Secondary Cyan accent */
  --accent-color: #ec4899; /* Highlights/Pink links */
  
  /* Gradients */
  --primary-gradient: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  --secondary-gradient: linear-gradient(135deg, var(--accent-color) 0%, var(--primary-color) 100%);
  /* ... */
}
```
*Tip: Try out different gradients to match your personal brand!*

---

## 📄 Linking Your PDF Resume
1. Place your resume PDF in the website folder (e.g. name it `ayush_resume.pdf`).
2. Open [data.js](file:///E:/Ayush_Website/data.js) and search for `resumeUrl`.
3. Change the value from `"#"` to `"./ayush_resume.pdf"`.
4. When users click the **Download CV** button, your PDF will download automatically.
5. If you leave `resumeUrl` as `"#"` or empty, clicking the button will open a printable view of your website!
