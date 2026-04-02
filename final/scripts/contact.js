const countDisplay = document.querySelector('#message-count');
const form = document.querySelector('#contact-form');

function displayMessageCount() {
  const count = parseInt(localStorage.getItem('messageCount') || '0', 10);
  if (countDisplay) {
    countDisplay.textContent = `You have sent ${count} message(s) previously.`;
  }
}

if (form) {
  form.addEventListener('submit', () => {
    let count = parseInt(localStorage.getItem('messageCount') || '0', 10);
    count += 1;
    localStorage.setItem('messageCount', String(count));
  });
}

displayMessageCount();
