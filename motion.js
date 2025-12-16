(() => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.all_anchor_tags');
  const navLinks = document.querySelectorAll('.anchor_tags a');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) return;
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const baseConfig = { opacity: 0, y: 28, duration: 0.6, ease: 'power2.out' };

  const animateGroup = (targets, trigger) => {
    if (!targets || !targets.length) return;
    gsap.from(targets, {
      ...baseConfig,
      stagger: targets.length > 1 ? 0.08 : 0,
      scrollTrigger: {
        trigger: trigger || targets[0],
        start: 'top 80%',
        once: true
      }
    });
  };

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2;
    let obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.floor(obj.val).toLocaleString();
      }
    });
  };

  const statNumbers = document.querySelectorAll('.stat_number');
  if (statNumbers.length) {
    ScrollTrigger.create({
      trigger: '.stats_grid',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        statNumbers.forEach(el => animateCounter(el));
      }
    });
  }

  gsap.from('.hero_badge', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.out', delay: 0.2 });
  animateGroup(document.querySelectorAll('.web_content h1, .web_content h3, .hero_cta_group'), document.querySelector('.Bg_img'));

  gsap.utils.toArray('.all_services').forEach(section => {
    animateGroup(section.querySelectorAll('.card'), section);
  });

  animateGroup(document.querySelectorAll('.About .about_content, .About .about_image'), document.querySelector('.About'));
  animateGroup(document.querySelectorAll('.others .about_content, .others .about_image'), document.querySelector('.others'));
  animateGroup(document.querySelectorAll('.trust_grid .benefit_card'), document.querySelector('.trust_section'));
  animateGroup(document.querySelectorAll('.stat_card'), document.querySelector('.stats_grid'));
  animateGroup(document.querySelectorAll('.testimonial_card'), document.querySelector('.testimonials_section'));
  animateGroup(document.querySelectorAll('.contact_info, .contact_form_wrapper'), document.querySelector('.contact_section'));
  animateGroup(document.querySelectorAll('.footer_cta_block, .footer_brand, .footer_links, .footer_contact'), document.querySelector('.footer'));
  animateGroup(document.querySelectorAll('.post_contact_inner > *'), document.querySelector('.post_contact'));
})();
