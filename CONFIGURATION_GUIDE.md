# Configuration & Modularity Guide: Ayush Bhartal Portfolio

This website is completely dynamic and modular. The layout, navigation links, section ordering, themes, floating mascots, and content are generated at runtime by a layout engine configured entirely inside [data.js](file:///E:/Ayush_Website/data.js).

To update the website, you only need to edit [data.js](file:///E:/Ayush_Website/data.js). This guide explains how to add, modify, or delete elements.

---

## 1. Modular Sections Configuration (`sections` array)

The `sections` list in `data.js` controls what sections are displayed, their order on the page, their navigation items, and their styles.

```javascript
sections: [
  {
    id: "skills",               // Unique DOM ID (lowercase)
    navTitle: "Skills",         // Text shown in floating navbar
    title: "Technical Skills",  // Header displayed in the section
    subtitle: "TECHNICAL INDEX",// Cyber-tag subtitle (displays with //)
    type: "skills",             // Section renderer template ("skills", "projects", "experience", "generic")
    theme: "light",             // "light" (peach background) or "dark" (transparent glass background)
    mascots: [                  // Array of floating triangle mascots in this section
      { class: "mascot-skills-1", color: "yellow" },
      { class: "mascot-skills-2", color: "red" }
    ]
  },
  ...
]
```

### Supported Layout Types (`type`)
1. **`"skills"`**: Dynamically loads the `skills` dataset grid. Fits auto-resizing chip panels.
2. **`"projects"`**: Loads the `projects` sliding track reel and grid catalog. Includes dynamic view toggles.
3. **`"experience"`**: Loads the `experience` horizontal chronology timeline and grid timeline.
4. **`"generic"`**: Creates a generic grid card layout. Useful for adding custom sections (e.g. *Certifications*, *Awards*, *Education*) directly inside the section configuration itself using the `items` array.

---

## 2. How to Add a New Custom Section

To add a completely new section (e.g. a **Certifications** section) to the page and navbar, simply append a new object to the `sections` array in [data.js](file:///E:/Ayush_Website/data.js) using the `type: "generic"` template:

```javascript
    {
      id: "certifications",
      navTitle: "Certs",
      title: "Licenses & Credentials",
      subtitle: "VERIFIED CREDENTIALS",
      type: "generic",
      theme: "dark",
      mascots: [
        { class: "mascot-skills-1", color: "green" }
      ],
      items: [
        {
          title: "AWS Certified Cloud Practitioner",
          subtitle: "Amazon Web Services",
          period: "2024",
          description: "Validation of overall cloud fundamentals, core service architecture, and security protocols."
        },
        {
          title: "Machine Learning Specialist",
          subtitle: "Google DeepMind Academy",
          period: "2025",
          description: "Credential in neural networks, gradient boosting, and transformer-based audio models."
        }
      ]
    }
```
*The website will automatically generate the section markup, link it to the navbar, trigger hover scramble transitions, apply 3D card tilt animations, and scale the cards fluidly.*

---

## 3. How to Update Existing Datasets

For standard sections (Skills, Projects, Experience), content is hydrated from dedicated data arrays inside [data.js](file:///E:/Ayush_Website/data.js).

### A. Technical Skills (`skills` array)
To add or modify skills, add objects to the `skills` array.
*   **Categories**: Group categories like "Programming Languages" or "Tools & Platforms".
*   **Auto-Scaling**: If you exceed 5-6 categories, the CSS Grid will automatically reflow and scale cards to fit screen boundaries without overflowing.

```javascript
  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "C / C++", level: 85 },
        { name: "Java", level: 80 },
        { name: "Python", level: 90 } // Add/delete items here
      ]
    }
  ]
```

### B. Projects (`projects` array)
To add projects to both the horizontal sliding reel and the grid view catalog, insert objects into the `projects` array:

```javascript
    {
      title: "New Project Title",
      description: "Short details describing what this project does.",
      category: "ai",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop", // Cover image URL
      liveUrl: "#", // Add link or keep "#"
      githubUrl: "https://github.com/bhartalayush",
      tags: ["Python", "Machine Learning"]
    }
```
*   **Duplication/Infinite Scroll**: The layout engine automatically duplicates the projects track to form a seamless infinite loop.
*   **Safeguard**: If you only have 1-2 projects, autoscrolling is automatically disabled to keep the display clean.

### C. Experience & Timeline (`experience` array)
To add entries to the horizontal chronologic timeline, append objects to the `experience` array:

```javascript
    {
      role: "Music Head",
      company: "Firodia Karandak",
      location: "Pune, India",
      period: "2025",
      description: "Coordinated the music team for the Firodia Karandak competition.",
      bullets: [
        "Orchestrated live musical arrangements for a 15-member ensemble."
      ],
      tags: ["Leadership", "Creative Direction"]
    }
```

---

## 4. Troubleshooting and Schema Tips

1.  **Duplicate IDs**: Ensure that every section object inside the `sections` array has a unique `id` (e.g., `id: "skills"`). The navigation and scroll tracker rely on these IDs to bind glides and active highlights.
2.  **Mascot Positions**: Mascot floats have built-in styling for their coordinate positions (e.g., `.mascot-skills-1`, `.mascot-projects-2`). If you create a new section, you can reuse these mascot position classes.
3.  **JSON Validation**: Ensure all arrays and objects are syntactically valid Javascript objects (proper commas, matching brackets).

---

## 5. How to Adjust Card Stack & Hover Border Colors

To customize the colors of the card stack collage in the Hero section and their corresponding hover borders/glows on projects, experience, and custom cards, edit the CSS variables defined at the top of [style.css](file:///E:/Ayush_Website/style.css) inside the `:root` block:

```css
  /* Hero Card Stack & Dynamic Hover Colors */
  --sheet-color-1: #ca8578;    /* Color 1 (Hex code used for borders and solid layers) */
  --sheet-rgb-1: 202, 133, 120; /* Color 1 (RGB numbers used for glowing box-shadows) */
  
  --sheet-color-2: #98aa8a;    /* Color 2 (Sage Green) */
  --sheet-rgb-2: 152, 170, 138;
  ...
```

*   **Cohesive Updates**: Modifying these variables once in the `:root` block will immediately update both the respective visual layer in the Hero card graphic and the alternating hover borders/shadow-glows on all cards throughout the Projects, Experience, and custom Generic sections!

