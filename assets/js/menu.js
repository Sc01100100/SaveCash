const menuBtn = document.getElementById('menu-btn');
const dropdownMenu = document.getElementById('dropdown-menu');
const links = dropdownMenu.querySelectorAll('a'); 

links.forEach(link => {
  link.addEventListener('click', () => {
    dropdownMenu.classList.add('hidden'); 
  });
})

menuBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('hidden'); 
});

document.addEventListener('click', (event) => {
  if (!menuBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.classList.add('hidden');
  }
});