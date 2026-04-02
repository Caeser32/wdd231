let allProjects = [];
const galleryGrid = document.querySelector('#gallery-grid');
const projectCount = document.querySelector('#project-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.querySelector('#project-modal');
const modalContent = document.querySelector('#modal-body');
const modalClose = document.querySelector('#modal-close');

function formatCategory(cat) {
  return cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function renderProjects(projects) {
  const html = projects.map(project => `
    <article class="card" data-id="${project.id}">
      <img src="${project.image}" alt="${project.title}" width="800" height="500" loading="lazy">
      <div class="card-body">
        <span class="category-badge">${formatCategory(project.category)}</span>
        <h3>${project.title}</h3>
        <p class="card-year">${project.year}</p>
      </div>
    </article>
  `).join('');

  galleryGrid.innerHTML = html;
  projectCount.textContent = `Showing ${projects.length} of ${allProjects.length} projects`;

  galleryGrid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id, 10);
      const project = allProjects.find(p => p.id === id);
      if (project) openModal(project);
    });
  });
}

function openModal(project) {
  let videoHtml = '';
  if (project.youtubeId) {
    videoHtml = `
      <div class="modal-video">
        <iframe src="https://www.youtube-nocookie.com/embed/${project.youtubeId}"
                title="${project.title} video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
      </div>
    `;
  }

  modalContent.innerHTML = `
    <div class="modal-header">
      <h2>${project.title}</h2>
      <button class="modal-close" id="modal-close-inner" aria-label="Close modal">&times;</button>
    </div>
    <img src="${project.image}" alt="${project.title}" width="800" height="500" loading="lazy">
    <p>${project.description}</p>
    <div class="modal-meta">
      <span><strong>Category:</strong> ${formatCategory(project.category)}</span>
      <span><strong>Year:</strong> ${project.year}</span>
      <span><strong>Tools:</strong> ${project.tools}</span>
      <span><strong>Duration:</strong> ${project.duration}</span>
    </div>
    ${videoHtml}
  `;

  modal.showModal();

  document.querySelector('#modal-close-inner').addEventListener('click', () => {
    modal.close();
  });
}

function filterProjects(category) {
  if (category === 'all') {
    renderProjects(allProjects);
  } else {
    const filtered = allProjects.filter(p => p.category === category);
    renderProjects(filtered);
  }

  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });

  localStorage.setItem('portfolioFilter', category);
}

async function loadProjects() {
  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    allProjects = await response.json();

    const savedFilter = localStorage.getItem('portfolioFilter') || 'all';
    filterProjects(savedFilter);
  } catch (error) {
    galleryGrid.innerHTML = '<p>Unable to load projects. Please try again later.</p>';
    console.error('Error loading projects:', error);
  }
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterProjects(btn.dataset.category);
  });
});

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.close();
  });
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.close();
  }
});

loadProjects();
