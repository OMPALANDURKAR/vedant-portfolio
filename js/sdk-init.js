async function onConfigChange(newConfig) {
  document.getElementById("hero-subtitle").textContent =
    newConfig.hero_subtitle || defaultConfig.hero_subtitle;

  document.getElementById("about-text").innerHTML =
    newConfig.about_text || defaultConfig.about_text;

  document.getElementById("github-link").href =
    newConfig.github_url || defaultConfig.github_url;

  document.getElementById("linkedin-link").href =
    newConfig.linkedin_url || defaultConfig.linkedin_url;
}
