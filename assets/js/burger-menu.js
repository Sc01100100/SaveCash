document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.getElementById("burgerMenu");
  const sidebar = document.getElementById("sidebar");

  const closeSidebar = () => {
    if (!sidebar.classList.contains("-translate-x-full")) {
      sidebar.classList.add("-translate-x-full");
    }
  };

  const openSidebar = () => {
    if (sidebar.classList.contains("-translate-x-full")) {
      sidebar.classList.remove("-translate-x-full");
    }
  };

  const initializeSidebarState = () => {
    if (window.innerWidth >= 1029) {
      openSidebar(); 
    } else {
      closeSidebar(); 
    }
  };

  burgerMenu.addEventListener("click", (e) => {
    if (window.innerWidth < 1024) {
      sidebar.classList.toggle("-translate-x-full");
    }
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (window.innerWidth < 1024 && !sidebar.contains(e.target) && !burgerMenu.contains(e.target)) {
      closeSidebar();
    }
  });

  window.addEventListener("resize", () => {
    initializeSidebarState(); 
  });

  initializeSidebarState();
});