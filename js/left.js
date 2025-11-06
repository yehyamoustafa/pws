// left.js

// Function to update the sidebar title
function updatePageName() {
  const path = window.location.pathname;
  let pageName = path.substring(path.lastIndexOf('/') + 1).replace('.html', '');
  if (pageName === '' || pageName === 'index') pageName = 'Home';

  const pageNameDiv = document.querySelector('.mil-page-name');
  if (pageNameDiv) {
    pageNameDiv.textContent =
      pageName.charAt(0).toUpperCase() + pageName.slice(1) + ' Page';
  }
}

// Run once on initial load
updatePageName();

// Detect Swup page changes
document.addEventListener('swup:contentReplaced', () => {
  updatePageName();
});
