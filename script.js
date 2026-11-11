// Global variable to hold loaded project data from script.json
let allProjectsData = [];

// Once the document is fully loaded, initialize interactions
document.addEventListener("DOMContentLoaded", () => {
  loadProjectsDatabase();
  setupNavbarNavigation();
  setupCategoryFilters();
});

/**
 * DYNAMIC JSON PROJECTS PARSER
 * Uses modern fetch requests to load script.json, parse content, and render cards.
 */
function loadProjectsDatabase() {
  const projectsGrid = document.getElementById("projects-grid");
  
  // Fetch from the local script.json file
  fetch("script.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not OK when fetching script.json");
      }
      return response.json();
    })
    .then(data => {
      allProjectsData = data;
      renderProjects(allProjectsData);
    })
    .catch(error => {
      console.error("Error loading project records:", error);
      // Fallback display in case browser CORS blocks local file dynamic fetching
      projectsGrid.innerHTML = `
        <div class="noscript-warning" style="grid-column: 1 / -1; text-align: center; background-color: var(--bg-dark-block); color: var(--text-on-dark); border: 1px solid var(--border-dark); padding: 20px; border-radius: var(--border-radius-lg);">
          <strong>Dynamic JSON Load Notice:</strong> Could not fetch dynamic script.json automatically via HTTP request. 
          This is normal when opening raw HTML files directly in browsers without a local web server (CORS restriction).
          <br><br>
          <button onclick="loadStaticFallback()" class="filter-btn active" style="margin-top: 10px; border: 1px solid var(--border-dark); background-color: var(--bg-main); color: var(--text-on-light); padding: 8px 18px; cursor: pointer; border-radius: var(--border-radius-md);">Load Fallback Data from Script Memory</button>
        </div>
      `;
    });
}

/**
 * Fallback data in case the browser blocks direct local JSON fetching (CORS)
 */
function loadStaticFallback() {
  allProjectsData = [
    {
      "id": "project-dns",
      "title": "Self-Hosted Private DNS Resolver (AdGuard Home)",
      "category": "systems",
      "icon": "🛡️",
      "url": "https://dns.salaxar.com",
      "description": "Configured and maintained a secure, private DNS resolver using AdGuard Home on a Linux VPS and home server environment. Implemented network-wide ad-blocking, family safety filtering, and custom local DNS records to safely route private queries. Managed and mapped securely to the domain: dns.salaxar.com.",
      "tech": ["Linux (Ubuntu)", "AdGuard Home", "DNS Security", "Home Server Config", "dns.salaxar.com"]
    },
    {
      "id": "project-vaultwarden",
      "title": "Self-Hosted Secure Password Manager (Vaultwarden)",
      "category": "systems",
      "icon": "🔑",
      "url": "https://vault.salaxar.com",
      "description": "Deployed and self-hosted a private, robust Vaultwarden instance (lightweight Bitwarden server) to secure personal credentials and secure logins. Managed configuration through a secure Linux service utilizing encryption keys and VPS resources mapped privately to the domain: vault.salaxar.com.",
      "tech": ["Linux (Ubuntu)", "Vaultwarden", "Credential Encryption", "VPS Cloud Hosting", "vault.salaxar.com"]
    },
    {
      "id": "project-cisco",
      "title": "Cisco Enterprise Network Design & Configuration",
      "category": "networking",
      "icon": "🌐",
      "url": "",
      "description": "Designed and simulated corporate network infrastructures in Cisco Packet Tracer. Performed practical configuration of switches, routers, VLAN segmentations, interface trunking protocols, custom IP subnetting, dynamic OSPF routing, and secure static routing paths.",
      "tech": ["Cisco Packet Tracer", "Switch & Router Config", "VLANs & Trunking", "IP Subnetting", "OSPF & Static Routing"]
    }
  ];
  renderProjects(allProjectsData);
}

/**
 * Creates dynamic project cards in DOM
 */
function renderProjects(projectsArray) {
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = ""; // Clear existing grid space

  if (projectsArray.length === 0) {
    projectsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted-light);">No projects found.</p>`;
    return;
  }

  projectsArray.forEach(proj => {
    // Create outer card div
    const card = document.createElement("div");
    card.className = "project-card";
    card.id = proj.id;

    // Build card header
    const header = document.createElement("div");
    header.className = "project-card-header";

    const iconBox = document.createElement("div");
    iconBox.className = "project-icon-box";
    iconBox.textContent = proj.icon;

    const badge = document.createElement("span");
    badge.className = "project-category-badge";
    badge.textContent = proj.category;

    header.appendChild(iconBox);
    header.appendChild(badge);

    // Build text items
    const title = document.createElement("h3");
    title.textContent = proj.title;

    const desc = document.createElement("p");
    desc.textContent = proj.description;

    // Build tech tags
    const tagsWrapper = document.createElement("div");
    tagsWrapper.className = "project-tech-tags";

    proj.tech.forEach(t => {
      const tag = document.createElement("span");
      tag.className = "tech-tag";
      tag.textContent = t;
      tagsWrapper.appendChild(tag);
    });

    // Assemble components
    card.appendChild(header);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(tagsWrapper);

    // Build and append Visit Website Button if URL exists
    if (proj.url) {
      const linkBtn = document.createElement("a");
      linkBtn.href = proj.url;
      linkBtn.target = "_blank";
      linkBtn.rel = "noopener";
      linkBtn.className = "project-link-btn";
      linkBtn.textContent = "Visit Website ↗";
      card.appendChild(linkBtn);
    }

    projectsGrid.appendChild(card);
  });
}

/**
 * Highlight navigation active state on scroll
 */
function setupNavbarNavigation() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach(section => {
      const top = section.offsetTop;
      if (window.scrollY >= (top - 150)) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });
}

/**
 * Setup event listeners for the project filters
 */
function setupCategoryFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active class from all filter buttons
      filterBtns.forEach(b => b.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      // Filter project list based on category
      if (category === "all") {
        renderProjects(allProjectsData);
      } else {
        const filtered = allProjectsData.filter(proj => proj.category === category);
        renderProjects(filtered);
      }
    });
  });
}
