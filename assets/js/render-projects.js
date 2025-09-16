(function () {
  "use strict";

  const projects = [
    {
      title: "NextPersona",
      subtitle: "AI Chat Web App",
      date: "2025-08-01",
      image: "/assets/img/NextPersona_In_Action.png",
      bullets: [
        "Accessible through any browser on any device.",
        "Locally-stored OpenAI API key for GPT access.",
        "Customizable system prompt."
      ],
      tools: ["Python", "Streamlit", "LangChain", "Heroku"],
      links: {
        demo: "https://www.nextpersona.com/",
        repo: "https://github.com/denotable/denotable"
      }
    },
    {
      title: "ALPR System",
      subtitle: "Automatic License Plate Recognition (ALPR)",
      date: "2025-04-15",
      image: "/assets/img/ALPR_Main.png",
      bullets: [
        "Launch via CLI or web interface.",
        "Input images/videos and get accurate recognition."
      ],
      tools: ["Python", "NumPy", "CUDA"],
      links: { repo: "https://github.com/denotable/ALPR-System" }
    },
    {
      title: "ScenicExplorer",
      subtitle: "Navigation-enabled comprehensive map app",
      date: "2024-11-01",
      image: "/assets/img/ScenicExplorer_Main.png",
      bullets: ["A* and Ant Colony Optimization for optimal path finding."],
      tools: ["C++"],
      links: { repo: "https://github.com/denotable/Scenic-Explorer" }
    },
    {
      title: "FPGA Clarinet Simulator",
      subtitle: "FPGA-based functional clarinet simulator",
      date: "2024-03-01",
      image: "/assets/img/FPGA_Clarinet_Simulator_Start.png",
      bullets: ["Sound recording and playback on a DE1-SoC board."],
      tools: ["C"]
    }
  ];

  // Sort newest -> oldest
  projects.sort((a, b) => new Date(b.date) - new Date(a.date));

  const INITIAL_COUNT = 1;  // Show only the latest on first render
  const BATCH_SIZE   = 2;   // How many to add per "Load More"
  let nextIndex = 0;

  function qs(id) { return document.getElementById(id); }

  function makeProjectCard(p) {
    const col = document.createElement("div");
    col.className = "col s12 m6 l4";
    col.innerHTML = `
      <div class="card medium">
        <div class="card-image waves-effect waves-block waves-light">
          <img alt="${p.title}" src="${p.image}" style="height:100%;width:100%" class="activator"/>
        </div>
        <div class="card-content">
          <span class="card-title activator purple-text hoverline">
            ${p.title}
            <i class="mdi-navigation-more-vert right"></i>
          </span>
          <p>${p.subtitle ?? ""}</p>
          <p class="grey-text" style="margin-top:6px;">
            ${new Date(p.date).toLocaleDateString()}
          </p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text">
            <small>Accomplishments</small>
            <i class="mdi-navigation-close right"></i>
          </span>
          <ul>
            ${(p.bullets ?? []).map(li => `<li>${li}</li>`).join("")}
            ${(p.tools && p.tools.length) ? `<li><b>Tools:</b> ${p.tools.join(", ")}</li>` : ""}
          </ul>
          <div class="card-action">
            ${p.links?.demo ? `
              <a aria-label="Visit ${p.title}" href="${p.links.demo}" target="_blank"
                 class="btn-floating btn-large waves-effect waves-light blue-grey">
                 <i class="fa fa-external-link"></i>
              </a>` : ""}
            ${p.links?.repo ? `
              <a aria-label="Visit the GitHub repo for ${p.title}" href="${p.links.repo}" target="_blank"
                 class="btn-floating btn-large waves-effect waves-light blue-grey">
                 <i class="fa fa-github"></i>
              </a>` : ""}
          </div>
        </div>
      </div>`;
    return col;
  }

  function renderNext(n, container, btn) {
    const frag = document.createDocumentFragment();
    const end = Math.min(nextIndex + n, projects.length);
    for (let i = nextIndex; i < end; i++) {
      frag.appendChild(makeProjectCard(projects[i]));
    }
    container.appendChild(frag);
    nextIndex = end;

    const done = nextIndex >= projects.length;
    if (btn) {
      btn.disabled = done;
      if (done) {
        btn.classList.add("disabled");
        btn.textContent = "All caught up";
      }
    }
  }

  function init() {
    const container = qs("recent-projects");
    const btn = qs("load-more-projects");
    if (!container) return; // Quietly exit if section not present

    renderNext(INITIAL_COUNT, container, btn);

    if (btn) {
      btn.addEventListener("click", () => renderNext(BATCH_SIZE, container, btn));
    }
  }

  // Run after DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
