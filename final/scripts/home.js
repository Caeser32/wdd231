async function loadFeaturedProjects() {
  const container = document.querySelector('#featured-projects');
  if (!container) return;

  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const projects = await response.json();

    const featured = projects
      .filter(p => [2, 4, 7].includes(p.id));

    const html = featured.map(project => `
      <article class="card">
        <img src="${project.image}" alt="${project.title}" width="800" height="500" loading="lazy">
        <div class="card-body">
          <span class="category-badge">${project.category.replace('-', ' ')}</span>
          <h3>${project.title}</h3>
          <p class="card-year">${project.year}</p>
        </div>
      </article>
    `).join('');

    container.innerHTML = html;
  } catch (error) {
    container.innerHTML = '<p>Unable to load featured projects.</p>';
    console.error('Error loading projects:', error);
  }
}

loadFeaturedProjects();
