// ==========================================
// PORTFOLIO WEBSITE JS LOGIC: AYUSH BHARTAL
// ==========================================

let projectsAutoScrollInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  if (typeof RESUME_DATA === "undefined") {
    console.error("Error: RESUME_DATA is not loaded. Make sure data.js is loaded first.");
    return;
  }

  // 1. Build dynamic sections layout and navbar links from config data
  renderDynamicSections();
  renderNavigation();

  // 2. Hydrate content datasets
  renderPersonalInfo();
  renderSkills();
  renderProjects();
  renderExperience();
  
  // 3. Initialize Interactions & Custom Scrolling
  setupNavigation();
  setupHeroParallax();
  setupScrollMorphing();
  setupProjectsCarousel();
  setupExperienceToggle();
  setupContactForm();
  setupMascots();
  setup3DTilt();
  setupMascotMouseProximity();
  setupClickRipple();
  setupMagneticButtons();
  setupPlexusBackground();
  setupTextScramble();
});

// Helper: Safely insert text content
function setElementText(id, text) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = text;
  }
}

// ------------------------------------------
// 1. RENDER PERSONAL INFO
// ------------------------------------------
function renderPersonalInfo() {
  const info = RESUME_DATA.personalInfo;
  
  // Set window title
  document.title = `${info.name} | ${info.title}`;
  
  // Set profile details text
  setElementText("hero-bio-text", info.bio);
  setElementText("hero-edu-degree", info.educationBrief);
  
  if (RESUME_DATA.education && RESUME_DATA.education.length > 0) {
    const edu = RESUME_DATA.education[0];
    setElementText("hero-edu-school", edu.school);
    setElementText("hero-edu-grade", edu.grade);
  }

  // Populate Social Tray
  const tray = document.getElementById("hero-socials-container");
  if (tray) {
    tray.innerHTML = "";
    
    const iconMap = {
      github: "fa-brands fa-github",
      linkedin: "fa-brands fa-linkedin-in",
      email: "fa-solid fa-envelope"
    };

    Object.entries(info.socials).forEach(([platform, url]) => {
      if (url) {
        const btn = document.createElement("a");
        btn.href = url;
        btn.className = "social-icon-btn";
        btn.target = "_blank";
        btn.rel = "noopener noreferrer";
        btn.setAttribute("aria-label", `Link to ${platform}`);
        
        const iconClass = iconMap[platform] || "fa-solid fa-link";
        btn.innerHTML = `<i class="${iconClass}"></i>`;
        tray.appendChild(btn);
      }
    });
  }

  // Footer coordinates
  setElementText("current-year", new Date().getFullYear());
  setElementText("contact-email-val", info.email);
  const emailLink = document.getElementById("contact-email-val");
  if (emailLink) emailLink.href = `mailto:${info.email}`;
  
  setElementText("contact-location-val", info.location);
  setElementText("contact-phone-val", info.phone);
  const phoneLink = document.getElementById("contact-phone-val");
  if (phoneLink) phoneLink.href = `tel:${info.phone.replace(/\s+/g, '')}`;
}

// ------------------------------------------
// 2. RENDER SKILLS TECHNICAL CHIPS (ROUNDED PILLS)
// ------------------------------------------
function renderSkills() {
  const container = document.getElementById("skills-grid-container");
  if (!container) return;
  
  container.innerHTML = "";

  if (!RESUME_DATA.skills || RESUME_DATA.skills.length === 0) {
    container.innerHTML = "<p>No skills data configured.</p>";
    return;
  }

  RESUME_DATA.skills.forEach(cat => {
    const card = document.createElement("div");
    
    let catIcon = "fa-cubes";
    let categoryClass = "card-other";
    const titleLower = cat.category.toLowerCase();
    
    if (titleLower.includes("lang") || titleLower.includes("program")) {
      catIcon = "fa-code";
      categoryClass = "card-lang";
    } else if (titleLower.includes("data") || titleLower.includes("ml")) {
      catIcon = "fa-brain";
      categoryClass = "card-ml";
    } else if (titleLower.includes("db") || titleLower.includes("core")) {
      catIcon = "fa-database";
      categoryClass = "card-db";
    } else if (titleLower.includes("web") || titleLower.includes("ui")) {
      catIcon = "fa-laptop-code";
      categoryClass = "card-tool";
    } else if (titleLower.includes("tool") || titleLower.includes("platform")) {
      catIcon = "fa-screwdriver-wrench";
      categoryClass = "card-tool";
    }

    card.className = `skills-card ${categoryClass}`;

    // Build plain tag chips without arbitrary percentages or progress bars
    const itemsHTML = cat.items.map(skill => `
      <span class="skill-chip">${skill.name}</span>
    `).join("");

    card.innerHTML = `
      <h3 class="skills-category-title">
        <i class="fa-solid ${catIcon}"></i> ${cat.category}
      </h3>
      <div class="skills-list">
        ${itemsHTML}
      </div>
    `;
    
    container.appendChild(card);
  });
}

// ------------------------------------------
// 3. RENDER PROJECTS (SLIDER & GRID)
// ------------------------------------------
function renderProjects() {
  const track = document.getElementById("projects-scroll-track");
  const grid = document.getElementById("projects-grid-view");
  if (!track || !grid) return;

  track.innerHTML = "";
  grid.innerHTML = "";

  if (!RESUME_DATA.projects || RESUME_DATA.projects.length === 0) {
    track.innerHTML = "<p class='project-desc'>No projects listed.</p>";
    grid.innerHTML = "<p class='project-desc'>No projects listed.</p>";
    return;
  }

  // Grid Populate
  RESUME_DATA.projects.forEach(proj => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = getProjectCardMarkup(proj);
    grid.appendChild(card);
  });

  // Track Populate
  const carouselArray = [...RESUME_DATA.projects, ...RESUME_DATA.projects];
  carouselArray.forEach(proj => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = getProjectCardMarkup(proj);
    track.appendChild(card);
  });
}

function getProjectCardMarkup(proj) {
  const tagsHTML = proj.tags.map(t => `<span class="tag">${t}</span>`).join("");
  
  let overlayLinks = "";
  if (proj.githubUrl && proj.githubUrl !== "#") {
    overlayLinks += `<a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>`;
  }
  if (proj.liveUrl && proj.liveUrl !== "#") {
    overlayLinks += `<a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Live Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
  }

  const overlayHTML = overlayLinks 
    ? `<div class="project-overlay"><div class="project-links">${overlayLinks}</div></div>` 
    : "";

  return `
    <div class="project-image-wrapper">
      <img src="${proj.image}" alt="${proj.title}" class="project-image" loading="lazy">
      ${overlayHTML}
    </div>
    <div class="project-content">
      <h3 class="project-title">${proj.title}</h3>
      <p class="project-desc">${proj.description}</p>
      <div class="project-footer">
        <div class="tag-list">${tagsHTML}</div>
      </div>
    </div>
  `;
}

// ------------------------------------------
// 4. RENDER TIMELINE (EXPERIENCE ONLY)
// ------------------------------------------
function getExperienceCardMarkup(item) {
  const bulletsHTML = item.bullets && item.bullets.length > 0 
    ? `<ul class="timeline-bullets">${item.bullets.map(b => `<li>${b}</li>`).join("")}</ul>`
    : "";
  const tagsHTML = item.tags ? `<div class="tag-list">${item.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>` : "";

  return `
    <div class="timeline-card">
      <div class="timeline-header">
        <h4 class="timeline-role">${item.role}</h4>
        <span class="timeline-company">${item.company}</span>
        <span class="timeline-period">${item.period} | ${item.location}</span>
      </div>
      <p class="timeline-desc">${item.description}</p>
      ${bulletsHTML}
      ${tagsHTML}
    </div>
  `;
}

function renderExperience() {
  const expContainer = document.getElementById("experience-timeline");
  const gridContainer = document.getElementById("experience-grid-view");
  
  if (expContainer) {
    expContainer.innerHTML = "";
    RESUME_DATA.experience.forEach(item => {
      const el = document.createElement("div");
      el.className = "timeline-item";
      el.innerHTML = getExperienceCardMarkup(item);
      expContainer.appendChild(el);
    });
  }

  if (gridContainer) {
    gridContainer.innerHTML = "";
    RESUME_DATA.experience.forEach(item => {
      const el = document.createElement("div");
      el.className = "timeline-item";
      el.innerHTML = getExperienceCardMarkup(item);
      gridContainer.appendChild(el);
    });
  }
}

// ------------------------------------------
// 4.5 SETUP EXPERIENCE TOGGLE
// ------------------------------------------
function setupExperienceToggle() {
  const container = document.getElementById("experience-carousel-container");
  const grid = document.getElementById("experience-grid-view");
  const toggleBtn = document.getElementById("toggle-experience-view");

  if (!container || !grid || !toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const isGridActive = grid.classList.contains("active");

    if (isGridActive) {
      grid.classList.remove("active");
      container.style.display = "block";
      toggleBtn.textContent = "View All Experiences";
    } else {
      container.style.display = "none";
      grid.classList.add("active");
      toggleBtn.textContent = "View Sliding Reel";
    }
  });
}

// ------------------------------------------
// 5. INTERACTIVE HERO LAYERED SHAPES PARALLAX
// ------------------------------------------
function setupHeroParallax() {
  const hero = document.getElementById("home");
  const layers = document.querySelectorAll("#hero-shapes .layer");
  if (!hero || layers.length === 0) return;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1025;
  if (isMobile) return;

  const panel = hero.querySelector(".hero-graphic-panel");
  if (!panel) return;

  // Base coordinates mapping keyframe final states to allow relative mouse drift (Canva Mockup angles)
  const bases = {
    "card-bg-7": { x: -190, y: -24, r: -12 },
    "card-bg-6": { x: -175, y: 160, r: -14 },
    "card-bg-5": { x: 145, y: 175, r: 8 },
    "card-bg-4": { x: -145, y: -175, r: -18 },
    "card-bg-3": { x: 175, y: 16, r: 16 },
    "card-bg-2": { x: 120, y: -190, r: 12 },
    "card-bg-1": { x: -32, y: 210, r: -6 },
    "card-fg": { x: 0, y: 0, r: -4 }
  };

  panel.addEventListener("mousemove", (e) => {
    const rect = panel.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    layers.forEach(layer => {
      let base = { x: 0, y: 0, r: 0 };
      if (layer.classList.contains("card-bg-7")) base = bases["card-bg-7"];
      else if (layer.classList.contains("card-bg-6")) base = bases["card-bg-6"];
      else if (layer.classList.contains("card-bg-5")) base = bases["card-bg-5"];
      else if (layer.classList.contains("card-bg-4")) base = bases["card-bg-4"];
      else if (layer.classList.contains("card-bg-3")) base = bases["card-bg-3"];
      else if (layer.classList.contains("card-bg-2")) base = bases["card-bg-2"];
      else if (layer.classList.contains("card-bg-1")) base = bases["card-bg-1"];
      else if (layer.classList.contains("card-fg")) base = bases["card-fg"];

      const depth = parseFloat(layer.getAttribute("data-depth")) || 0.05;
      const moveX = base.x + (mouseX * depth);
      const moveY = base.y + (mouseY * depth);
      
      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${base.r}deg)`;
    });
  });

  // Center smoothly back to keys
  panel.addEventListener("mouseleave", () => {
    layers.forEach(layer => {
      let base = { x: 0, y: 0, r: 0 };
      if (layer.classList.contains("card-bg-7")) base = bases["card-bg-7"];
      else if (layer.classList.contains("card-bg-6")) base = bases["card-bg-6"];
      else if (layer.classList.contains("card-bg-5")) base = bases["card-bg-5"];
      else if (layer.classList.contains("card-bg-4")) base = bases["card-bg-4"];
      else if (layer.classList.contains("card-bg-3")) base = bases["card-bg-3"];
      else if (layer.classList.contains("card-bg-2")) base = bases["card-bg-2"];
      else if (layer.classList.contains("card-bg-1")) base = bases["card-bg-1"];
      else if (layer.classList.contains("card-fg")) base = bases["card-fg"];

      layer.style.transform = `translate3d(${base.x}px, ${base.y}px, 0) rotate(${base.r}deg)`;
    });
  });
}

// ------------------------------------------
// 6. FLOATING NAVBAR CONTROLS & GUIDED SCROLL
// ------------------------------------------
function setupNavigation() {
  const header = document.getElementById("navbar");
  const navLinks = document.getElementById("nav-links");
  const hamburger = document.getElementById("hamburger-menu");
  const links = document.querySelectorAll(".nav-links a");

  // Single scroll handler for header sticky state, light section contrast, and active links
  window.addEventListener("scroll", () => {
    // 1. Sticky background toggle
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // 2. Light/dark section color contrast check
    const scrollPos = window.scrollY + 80;
    let isLight = false;

    document.querySelectorAll(".section-light").forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        isLight = true;
      }
    });

    const heroDetails = document.querySelector(".hero-details-panel");
    if (heroDetails && window.scrollY < window.innerHeight) {
      if (window.innerWidth > 1024) {
        isLight = true; 
      }
    }

    if (isLight) {
      header.classList.add("in-light-section");
    } else {
      header.classList.remove("in-light-section");
    }

    // 3. Active Link indicator dot update
    let currentSectionId = "";
    if (window.scrollY < 180) {
      currentSectionId = "home";
    } else {
      const triggerPos = window.scrollY + window.innerHeight / 3;
      document.querySelectorAll("section").forEach(sec => {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (triggerPos >= top && triggerPos < bottom) {
          currentSectionId = sec.getAttribute("id");
        }
      });
    }

    if (currentSectionId) {
      links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });

  // Mobile drawer menu toggler
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = hamburger.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.className = "fa-solid fa-xmark";
      } else {
        icon.className = "fa-solid fa-bars";
      }
    });
  }

  // Intercept clicks and invoke camera glide
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.querySelector("i").className = "fa-solid fa-bars";
      }

      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      const targetId = link.getAttribute("href");
      const targetSec = document.querySelector(targetId);
      if (!targetSec) return;

      const offset = 50; 
      const targetY = targetSec.getBoundingClientRect().top + window.pageYOffset - offset;
      
      smoothScrollTo(targetY, 1100);
    });
  });
}

// Guided Scroll camera glide function (easeInOutCubic)
function smoothScrollTo(targetY, duration) {
  const startY = window.pageYOffset;
  const difference = targetY - startY;
  let startTime = null;

  // Cubic deceleration easing curve
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const ease = easeInOutCubic(progress);
    
    window.scrollTo(0, startY + difference * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// ------------------------------------------
// 7. SCROLL INTERSECTION OBSERVERS
// ------------------------------------------
function setupScrollMorphing() {
  const morphSections = document.querySelectorAll(".section-morph");
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

  morphSections.forEach(sec => {
    sectionObserver.observe(sec);
  });
}

// ------------------------------------------
// 8. PROJECTS CAROUSEL CONTROLS
// ------------------------------------------
function setupProjectsCarousel() {
  const container = document.getElementById("projects-carousel-container");
  const track = document.getElementById("projects-scroll-track");
  const grid = document.getElementById("projects-grid-view");
  const toggleBtn = document.getElementById("toggle-projects-view");
  
  if (!container || !track || !grid || !toggleBtn) return;

  const scrollSpeed = 0.65;
  const tickTime = 30; 
  let isPaused = false;

  function startScrolling() {
    if (projectsAutoScrollInterval) clearInterval(projectsAutoScrollInterval);
    
    // Safeguard: do not autoscroll if items fit on screen completely
    if (container.scrollWidth / 2 <= container.clientWidth) {
      return;
    }
    
    projectsAutoScrollInterval = setInterval(() => {
      if (!isPaused) {
        container.scrollLeft += scrollSpeed;
        
        const limit = container.scrollWidth / 2;
        if (container.scrollLeft >= limit - 10) {
          container.scrollLeft = 0;
        }
      }
    }, tickTime);
  }

  function stopScrolling() {
    if (projectsAutoScrollInterval) {
      clearInterval(projectsAutoScrollInterval);
      projectsAutoScrollInterval = null;
    }
  }

  startScrolling();

  container.addEventListener("mouseenter", () => isPaused = true);
  container.addEventListener("mouseleave", () => isPaused = false);
  
  container.addEventListener("touchstart", () => isPaused = true);
  container.addEventListener("touchend", () => {
    setTimeout(() => { isPaused = false; }, 1200);
  });

  container.addEventListener("wheel", (e) => {
    e.preventDefault();
    container.scrollLeft += e.deltaY;
  });

  toggleBtn.addEventListener("click", () => {
    const isGridActive = grid.classList.contains("active");

    if (isGridActive) {
      grid.classList.remove("active");
      container.style.display = "block";
      toggleBtn.textContent = "View Grid Catalog";
      isPaused = false;
      startScrolling();
    } else {
      stopScrolling();
      container.style.display = "none";
      grid.classList.add("active");
      toggleBtn.textContent = "View Sliding Reel";
    }
  });
}

// ------------------------------------------
// 9. CONTACT FORM LOGIC
// ------------------------------------------
function setupContactForm() {
  const form = document.getElementById("contact-form-element");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("form-name").value;
    const email = document.getElementById("form-email").value;
    const subject = document.getElementById("form-subject").value;
    const message = document.getElementById("form-message").value;
    
    // Construct mailto link
    const mailtoUrl = `mailto:bhartalayush@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
    
    // Open default mail client
    window.location.href = mailtoUrl;
    
    const submitBtn = form.querySelector("button[type='submit']");
    const originalContent = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Opening Mail Client... <i class="fa-solid fa-envelope-open-text"></i>`;
    
    setTimeout(() => {
      submitBtn.innerHTML = `Message Sent <i class="fa-solid fa-circle-check"></i>`;
      submitBtn.style.background = "var(--color-accent)";
      submitBtn.style.borderColor = "var(--color-accent)";
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
        submitBtn.style.background = "";
        submitBtn.style.borderColor = "";
        form.reset();
      }, 2000);
    }, 1200);
  });
}

// ------------------------------------------
// 10. INTERACTIVE BACKGROUND MASCOT SPIN LOGIC
// ------------------------------------------
function setupMascots() {
  const mascots = document.querySelectorAll(".mascot-triangle");
  mascots.forEach(mascot => {
    // Click behavior: spin rapidly, scale up, then ease back
    mascot.addEventListener("click", () => {
      // Toggle a temporary transform style
      mascot.style.transform = "scale(2) rotate(720deg)";
      mascot.style.opacity = "0.95";
      
      setTimeout(() => {
        mascot.style.transform = "";
        mascot.style.opacity = "";
      }, 1000);
    });
  });
}

// ------------------------------------------
// 11. CLICK RIPPLE EFFECT
// ------------------------------------------
function setupClickRipple() {
  window.addEventListener("click", (e) => {
    const ripple = document.createElement("div");
    ripple.className = "click-ripple";
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

// ------------------------------------------
// 12. MAGNETIC HOVER BUTTONS
// ------------------------------------------
function setupMagneticButtons() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1025;
  if (isMobile) return;

  const targets = document.querySelectorAll(".social-icon-btn, .btn-primary, .section-btn-link, .hamburger");

  targets.forEach(target => {
    target.style.transition = "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)";

    window.addEventListener("mousemove", (e) => {
      const rect = target.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;

      const dx = e.clientX - targetX;
      const dy = e.clientY - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Pull the button towards the cursor if it gets within 60px
      if (dist < 60) {
        const pullX = dx * 0.35;
        const pullY = dy * 0.35;
        target.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(1.05)`;
      } else {
        target.style.transform = "";
      }
    });

    target.addEventListener("mouseleave", () => {
      target.style.transform = "";
    });
  });
}

// ------------------------------------------
// 12. 3D CARD HOVER TILT EFFECT
// ------------------------------------------
function setup3DTilt() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1025;
  if (isMobile) return;

  const cards = document.querySelectorAll(".project-card, .skills-card, .timeline-card, .generic-card");
  
  cards.forEach(card => {
    card.style.transition = "transform 0.1s ease, box-shadow 0.25s ease, border-color 0.25s ease";

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Rotate up to 8 degrees based on coordinate offset from card center
      const rotateX = ((centerY - y) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

// ------------------------------------------
// 13. MOUSE PROXIMITY MASCOT DRIFT
// ------------------------------------------
function setupMascotMouseProximity() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1025;
  if (isMobile) return;

  const mascots = document.querySelectorAll(".mascot-triangle");

  window.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    mascots.forEach(mascot => {
      const rect = mascot.getBoundingClientRect();
      const mascotX = rect.left + rect.width / 2;
      const mascotY = rect.top + rect.height / 2;

      const dx = mouseX - mascotX;
      const dy = mouseY - mascotY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Push mascot away slightly if mouse gets within 220px
      if (dist < 220) {
        const force = (220 - dist) / 220; // 0 to 1 scaling proximity force
        const driftX = -dx * force * 0.15; // move away from cursor
        const driftY = -dy * force * 0.15;

        mascot.style.setProperty("--drift-x", `${driftX}px`);
        mascot.style.setProperty("--drift-y", `${driftY}px`);
      } else {
        mascot.style.setProperty("--drift-x", "0px");
        mascot.style.setProperty("--drift-y", "0px");
      }
    });
  });
}

// ==========================================
// PLEXUS CANVAS BACKGROUND ANIMATION
// ==========================================
function setupPlexusBackground() {
  const canvas = document.getElementById("plexus-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const maxParticles = Math.min(80, Math.floor((width * height) / 18000));
  const connectionDist = 130;
  
  const mouse = { x: null, y: null, radius: 200 };

  // Sparse glowing neon traces (simulate cyber/circuit lines)
  let neonLines = [];
  function generateNeonLines() {
    neonLines = [
      // Top-left circuit trace
      { points: [{x: 0, y: height * 0.15}, {x: width * 0.25, y: height * 0.15}, {x: width * 0.35, y: height * 0.3}], color: "rgba(0, 243, 255, 0.8)", width: 1.5 },
      // Long diagonal trace (yellow - reduced opacity)
      { points: [{x: width * 0.1, y: height}, {x: width * 0.4, y: height * 0.5}, {x: width * 0.5, y: height * 0.5}], color: "rgba(255, 210, 50, 0.35)", width: 1.2 },
      // Right-side circuit trace
      { points: [{x: width, y: height * 0.3}, {x: width * 0.75, y: height * 0.3}, {x: width * 0.65, y: height * 0.15}], color: "rgba(0, 243, 255, 0.8)", width: 1.5 },
      // Bottom circuit trace (yellow - reduced opacity)
      { points: [{x: 0, y: height * 0.8}, {x: width * 0.5, y: height * 0.8}, {x: width * 0.65, y: height * 0.95}], color: "rgba(255, 210, 50, 0.35)", width: 1.2 },
      // Sparse vertical trace
      { points: [{x: width * 0.85, y: 0}, {x: width * 0.85, y: height * 0.5}, {x: width * 0.75, y: height * 0.7}], color: "rgba(0, 243, 255, 0.8)", width: 1.2 }
    ];
  }
  generateNeonLines();

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    generateNeonLines();
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 2.8 + 1.8;
      // Soften yellow particle core opacity to 0.4
      this.color = Math.random() > 0.4 ? "rgba(0, 243, 255, 1.0)" : "rgba(255, 210, 50, 0.4)";
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse attraction pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 0.3;
          this.y += (dy / dist) * force * 0.3;
        }
      }
    }

    draw() {
      const isYellow = this.color.includes("255");
      const outerAlpha = isYellow ? "0.04)" : "0.15)";
      const innerAlpha = isYellow ? "0.12)" : "0.45)";

      // Large soft outer halo
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 4.5, 0, Math.PI * 2);
      ctx.fillStyle = this.color.replace(/[\d.]+\)$/, outerAlpha);
      ctx.fill();

      // Medium intense inner halo
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = this.color.replace(/[\d.]+\)$/, innerAlpha);
      ctx.fill();

      // Bright core node
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  let pulseTimer = 0;

  function animate() {
    ctx.clearRect(0, 0, width, height);
    pulseTimer += 0.015;
    const pulseFactor = 0.7 + Math.sin(pulseTimer) * 0.3;

    // 1. Draw glowing neon traces
    neonLines.forEach(line => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(line.points[0].x, line.points[0].y);
      for (let i = 1; i < line.points.length; i++) {
        ctx.lineTo(line.points[i].x, line.points[i].y);
      }
      const isYellow = line.color.includes("255");
      ctx.shadowColor = isYellow ? "rgba(255, 210, 50, 0.25)" : "rgba(0, 243, 255, 0.95)";
      ctx.shadowBlur = isYellow ? 6 : 18;
      const alphaMultiplier = isYellow ? 0.35 : 0.85;
      ctx.strokeStyle = line.color.replace(/[\d.]+\)$/, `${pulseFactor * alphaMultiplier})`);
      ctx.lineWidth = isYellow ? line.width * 0.9 : line.width * 1.8;
      ctx.stroke();
      ctx.restore();
    });

    // 2. Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // 3. Draw connection lines
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      
      // Connection to mouse (glowing neon lines)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p1.x;
        const dy = mouse.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const alpha = (1 - (dist / mouse.radius)) * 0.95;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          
          ctx.save();
          ctx.shadowColor = "rgba(0, 243, 255, 0.95)";
          ctx.shadowBlur = 15;
          ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
          ctx.lineWidth = 2.0;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Connections between nodes
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          const alpha = (1 - (dist / connectionDist)) * 0.55;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          // Dual pass for high-performance neon glow simulation without shadowBlur
          ctx.strokeStyle = `rgba(0, 243, 255, ${alpha * 0.35})`;
          ctx.lineWidth = 3.0;
          ctx.stroke();

          ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }
    }

    // 4. Interactive HUD target crosshair on cursor
    if (mouse.x !== null && mouse.y !== null) {
      ctx.save();
      ctx.shadowColor = "rgba(0, 243, 255, 0.95)";
      ctx.shadowBlur = 15;
      ctx.strokeStyle = "rgba(0, 243, 255, 0.9)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 15, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(mouse.x - 22, mouse.y);
      ctx.lineTo(mouse.x - 10, mouse.y);
      ctx.moveTo(mouse.x + 10, mouse.y);
      ctx.lineTo(mouse.x + 22, mouse.y);
      ctx.moveTo(mouse.x, mouse.y - 22);
      ctx.lineTo(mouse.x, mouse.y - 10);
      ctx.moveTo(mouse.x, mouse.y + 10);
      ctx.lineTo(mouse.x, mouse.y + 22);
      ctx.stroke();
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================
// SNAPPY HACKER TEXT SCRAMBLE
// ==========================================
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________01";
    this.update = this.update.bind(this);
  }
  
  setText(newText) {
    const oldText = this.el.textContent;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 15);
      const end = start + Math.floor(Math.random() * 15) + 8;
      this.queue.push({ from, to, start, end, char: '' });
    }
    
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  
  update() {
    let output = '';
    let complete = 0;
    
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (to === '\n') {
        output += '<br>';
        complete++;
        continue;
      }
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="hud-glow-text">${char}</span>`;
      } else {
        output += (from === '\n' ? '<br>' : from);
      }
    }
    
    this.el.innerHTML = output;
    
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

function setupTextScramble() {
  const elements = document.querySelectorAll(".tech-scramble");
  
  elements.forEach(el => {
    const originalText = el.innerText.trim();
    const scrambler = new TextScramble(el);
    let isScrambling = false;

    el.addEventListener("mouseenter", () => {
      if (isScrambling) return;
      isScrambling = true;
      scrambler.setText(originalText).then(() => {
        isScrambling = false;
      });
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isScrambling = true;
          scrambler.setText(originalText).then(() => {
            isScrambling = false;
          });
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(el);
  });
}

// ------------------------------------------
// DYNAMIC MODULAR SECTION ENGINE
// ------------------------------------------
function renderDynamicSections() {
  const container = document.getElementById("dynamic-sections-container");
  if (!container) return;
  
  container.innerHTML = "";

  if (!RESUME_DATA.sections) return;

  RESUME_DATA.sections.forEach(sec => {
    const sectionEl = document.createElement("section");
    sectionEl.className = `section section-${sec.theme || "dark"} section-morph`;
    sectionEl.id = sec.id;

    // Mascots
    let mascotsHTML = "";
    if (sec.mascots) {
      sec.mascots.forEach(m => {
        mascotsHTML += `<div class="mascot-triangle ${m.class} color-${m.color}" aria-hidden="true"></div>`;
      });
    }

    // Header
    let headerHTML = `
      <div class="section-header">
        <div>
          <span class="section-subtitle">// ${sec.subtitle || sec.navTitle || sec.id.toUpperCase()}</span>
          <h2 class="section-title tech-scramble">${sec.title}</h2>
        </div>
    `;

    if (sec.type === "projects") {
      headerHTML += `<button class="section-btn-link" id="toggle-projects-view">View Grid Catalog</button>`;
    } else if (sec.type === "experience") {
      headerHTML += `<button class="section-btn-link" id="toggle-experience-view">View All Experiences</button>`;
    }
    headerHTML += `</div>`; // Close section-header

    // Inner containers based on type
    let innerHTML = "";
    if (sec.type === "skills") {
      innerHTML = `<div class="skills-container" id="skills-grid-container"></div>`;
    } else if (sec.type === "projects") {
      innerHTML = `
        <div class="projects-carousel-container" id="projects-carousel-container">
          <div class="projects-scroll-track" id="projects-scroll-track"></div>
        </div>
        <div class="projects-grid-view" id="projects-grid-view"></div>
      `;
    } else if (sec.type === "experience") {
      innerHTML = `
        <div class="timeline-section" id="experience-carousel-container">
          <div class="timeline" id="experience-timeline"></div>
        </div>
        <div class="experience-grid-view" id="experience-grid-view"></div>
      `;
    } else if (sec.type === "generic") {
      let cardsHTML = "";
      if (sec.items) {
        sec.items.forEach(item => {
          cardsHTML += getGenericCardMarkup(item);
        });
      }
      innerHTML = `<div class="generic-grid-container">${cardsHTML}</div>`;
    }

    sectionEl.innerHTML = mascotsHTML + headerHTML + innerHTML;
    container.appendChild(sectionEl);
  });
}

function renderNavigation() {
  const navLinks = document.getElementById("nav-links");
  if (!navLinks) return;

  navLinks.innerHTML = "";

  // Add Home
  const homeLi = document.createElement("li");
  homeLi.innerHTML = `<a href="#home" class="active">Home</a>`;
  navLinks.appendChild(homeLi);

  // Add dynamic sections
  if (RESUME_DATA.sections) {
    RESUME_DATA.sections.forEach(sec => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#${sec.id}">${sec.navTitle || sec.title}</a>`;
      navLinks.appendChild(li);
    });
  }

  // Add Contact
  const contactLi = document.createElement("li");
  contactLi.innerHTML = `<a href="#contact">Contact</a>`;
  navLinks.appendChild(contactLi);
}

function getGenericCardMarkup(item) {
  const subtitleHTML = item.subtitle ? `<span class="generic-card-subtitle">${item.subtitle}</span>` : "";
  const periodHTML = item.period ? `<span class="generic-card-period">${item.period}</span>` : "";
  
  return `
    <div class="generic-card">
      <div class="generic-card-header" style="display: flex; flex-direction: column; gap: 4px;">
        <h3 class="generic-card-title">${item.title}</h3>
        ${subtitleHTML}
        ${periodHTML}
      </div>
      <p class="generic-card-desc" style="margin-top: 8px;">${item.description}</p>
    </div>
  `;
}



