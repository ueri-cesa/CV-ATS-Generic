document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const tocLinks = document.querySelectorAll(".toc-link");

  /*
   * ========================================
   * SCROLLSPY
   * ========================================
   */

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const currentId = entry.target.id;

        tocLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${currentId}`;

          link.classList.toggle("active", isActive);

          /*
           * Pada mobile, otomatis geser
           * navigation menuju menu aktif.
           */

          if (isActive && window.innerWidth <= 700) {
            link.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            });
          }
        });
      });
    },
    {
      /*
       * Bagian tengah viewport menjadi
       * area penentu section aktif.
       */

      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  /*
   * ========================================
   * SMOOTH SCROLL
   * ========================================
   */

  tocLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      /*
       * Update URL tanpa membuat
       * browser melompat secara default.
       */

      history.pushState(null, "", targetId);
    });
  });
});
