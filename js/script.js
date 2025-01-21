// Navigation handling
const navItems = document.querySelectorAll(".nav-item");
const contentSections = document.querySelectorAll(".content-section");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove 'active' from all nav items and content sections
    navItems.forEach((i) => i.classList.remove("active"));
    contentSections.forEach((section) => section.classList.remove("active"));

    // Add 'active' to the clicked nav item and the target section
    item.classList.add("active");
    const target = item.getAttribute("data-target");
    const sectionToShow = document.getElementById(target);
    sectionToShow.classList.add("active");
  });
});
