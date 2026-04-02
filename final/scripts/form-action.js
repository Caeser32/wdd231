const params = new URLSearchParams(window.location.search);

const nameEl = document.querySelector('#result-name');
const emailEl = document.querySelector('#result-email');
const subjectEl = document.querySelector('#result-subject');
const messageEl = document.querySelector('#result-message');

if (nameEl) {
  nameEl.textContent = params.get('name') || 'Unknown';
}

if (emailEl) {
  emailEl.textContent = params.get('email') || 'Not provided';
}

if (subjectEl) {
  subjectEl.textContent = params.get('subject') || 'Not specified';
}

if (messageEl) {
  messageEl.textContent = params.get('message') || 'No message';
}

const heading = document.querySelector('#thank-you-heading');
if (heading) {
  heading.textContent = `Thank you, ${params.get('name') || 'Visitor'}!`;
}
