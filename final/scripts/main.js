export function setupNav() {
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('header nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', String(expanded));
    });
  }
}

export function setupFooter() {
  const yearSpan = document.querySelector('#currentyear');
  const modifiedSpan = document.querySelector('#lastModified');

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (modifiedSpan) {
    modifiedSpan.textContent = document.lastModified;
  }
}

export function setupWayfinding() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('header nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href)) {
      link.classList.add('active');
    }
  });
}

function trackVisit() {
  let visitCount = parseInt(localStorage.getItem('visitCount') || '0', 10);
  visitCount += 1;
  localStorage.setItem('visitCount', String(visitCount));
}

setupNav();
setupFooter();
setupWayfinding();
trackVisit();
