/* ================================
   CONFIG STATE
================================ */

let config = { ...defaultConfig };

/* ================================
   HANDLE CONFIG CHANGES
================================ */

async function onConfigChange(newConfig) {
  config = { ...config, ...newConfig };

  /* ---------- HERO NAME ---------- */
  const heroName = document.getElementById("hero-name");
  if (heroName) {
    const names = (config.hero_title || defaultConfig.hero_title).split(" ");
    heroName.innerHTML = `
      ${names[0]}
      <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
                   bg-clip-text text-transparent animate-gradient">
        ${names.slice(1).join(" ")}
      </span>
    `;
  }

  /* ---------- HERO SUBTITLE ---------- */
  const heroSubtitle = document.getElementById("hero-subtitle");
  if (heroSubtitle) {
    heroSubtitle.textContent =
      config.hero_subtitle || defaultConfig.hero_subtitle;
  }

  /* ---------- ABOUT TEXT ---------- */
  const aboutText = document.getElementById("about-text");
  if (aboutText) {
    const text = config.about_text || defaultConfig.about_text;
    aboutText.innerHTML = text
      .replace(
        /full-stack development/gi,
        '<span class="text-indigo-400 font-medium">$&</span>'
      )
      .replace(
        /Computer Science Engineering student/gi,
        '<span class="text-indigo-400 font-medium">$&</span>'
      );
  }

  /* ---------- SOCIAL LINKS ---------- */
  const githubLink = document.getElementById("github-link");
  if (githubLink) {
    githubLink.href = config.github_url || defaultConfig.github_url;
  }

  const linkedinLink = document.getElementById("linkedin-link");
  if (linkedinLink) {
    linkedinLink.href = config.linkedin_url || defaultConfig.linkedin_url;
  }

  /* ---------- BACKGROUND COLOR ---------- */
  const wrapper = document.getElementById("app-wrapper");
  if (wrapper && config.background_color) {
    wrapper.style.background = `
      linear-gradient(
        135deg,
        ${config.background_color} 0%,
        #1e1b4b 50%,
        ${config.background_color} 100%
      )
    `;
  }
}

/* ================================
   ELEMENT SDK MAPPING
================================ */

function mapToCapabilities(config) {
  return {
    recolorables: [
      {
        get: () => config.background_color || defaultConfig.background_color,
        set: (value) => {
          config.background_color = value;
          window.elementSdk.setConfig({ background_color: value });
        }
      },
      {
        get: () => config.surface_color || defaultConfig.surface_color,
        set: (value) => {
          config.surface_color = value;
          window.elementSdk.setConfig({ surface_color: value });
        }
      },
      {
        get: () => config.text_color || defaultConfig.text_color,
        set: (value) => {
          config.text_color = value;
          window.elementSdk.setConfig({ text_color: value });
        }
      },
      {
        get: () =>
          config.primary_action_color ||
          defaultConfig.primary_action_color,
        set: (value) => {
          config.primary_action_color = value;
          window.elementSdk.setConfig({ primary_action_color: value });
        }
      },
      {
        get: () =>
          config.secondary_action_color ||
          defaultConfig.secondary_action_color,
        set: (value) => {
          config.secondary_action_color = value;
          window.elementSdk.setConfig({ secondary_action_color: value });
        }
      }
    ],
    borderables: [],
    fontEditable: undefined,
    fontSizeable: undefined
  };
}

/* ================================
   EDIT PANEL VALUES
================================ */

function mapToEditPanelValues(config) {
  return new Map([
    ["hero_title", config.hero_title || defaultConfig.hero_title],
    ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
    ["about_text", config.about_text || defaultConfig.about_text],
    ["github_url", config.github_url || defaultConfig.github_url],
    ["linkedin_url", config.linkedin_url || defaultConfig.linkedin_url]
  ]);
}

/* ================================
   SDK INITIALIZATION
================================ */

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}
