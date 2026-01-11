// Wobble effect for service popups on mobile when services-section is in view
if (window.matchMedia('(max-width: 768px)').matches) {
  document.addEventListener('DOMContentLoaded', function() {
    const serviceSection = document.querySelector('.services-section');
    if (!serviceSection) return;
    const popups = document.querySelectorAll('.service-popup .popup-body');
    if (!popups.length) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        popups.forEach((popup, i) => {
          const cls = (i % 2 === 0) ? 'wobble-a' : 'wobble-b';
          setTimeout(() => {
            popup.classList.add(cls);
            setTimeout(() => {
              popup.classList.remove('wobble-a', 'wobble-b');
            }, 1000);
          }, i * 200);
        });
      } else {
        // Remove classes if section is out of view so it can re-trigger
        popups.forEach(popup => popup.classList.remove('wobble-a', 'wobble-b'));
      }
    }, { threshold: 0.25 });
    observer.observe(serviceSection);
  });
}
if (window.matchMedia("(max-width: 768px)").matches) {
  document.querySelectorAll(".service-popup .flip-inner")
    .forEach(el => {
      el.addEventListener("click", () => {
        el.classList.toggle("flipped");
      });
    });
}
// Timeline graph SVG animation on mobile
  function animateTimelineGraphMobile() {
    const timelineMobile = document.querySelector('.timeline-mobile img');
    if (!timelineMobile) return;
    // Only run on mobile
    if (window.matchMedia('(max-width: 768px)').matches) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            timelineMobile.classList.add('timeline-mobile-animate');
          } else {
            timelineMobile.classList.remove('timeline-mobile-animate');
          }
        });
      }, { threshold: 0.3 });
      observer.observe(timelineMobile);
    }
  }
  animateTimelineGraphMobile();
document.addEventListener("DOMContentLoaded", () => {
    // Contact form submission logic with new successPopup
    const form = document.getElementById("contactForm");
    const successPopup = document.getElementById("successPopup");

    if (form && successPopup) {

      const submitBtn = form.querySelector(".contact-submit");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = new FormData(form);

        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: data
        });

        const json = await res.json();

        if (json.success && submitBtn) {
          // Animate button only on valid info
          submitBtn.classList.add("sent");
          submitBtn.textContent = "Sent";
          submitBtn.disabled = true;
          setTimeout(() => {
            submitBtn.classList.remove("sent");
            submitBtn.textContent = "Submit";
            submitBtn.disabled = false;
          }, 2000);
          form.reset();
        } else {
          // Show error message
          const resultDiv = document.getElementById("form-result");
          if (resultDiv) {
            resultDiv.textContent = json.message || "Submission failed. Please check your info and try again.";
            resultDiv.style.color = "#d32f2f";
            setTimeout(() => {
              resultDiv.textContent = "";
            }, 4000);
          }
        }
      });

      // close on click anywhere
      if (successPopup) {
        successPopup.addEventListener("click", () => {
          successPopup.classList.remove("show");
        });
      }
    }
  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const navList = document.getElementById("navList");

  if (hamburger && navList) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navList.classList.toggle("active");
    });

    // Close menu when clicking nav item
    const navItems = navList.querySelectorAll("li");
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navList.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navList.contains(e.target)) {
        hamburger.classList.remove("active");
        navList.classList.remove("active");
      }
    });
  }

  // Navbar hide/show on scroll (hide on scroll down, show on scroll up)
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;

  const handleNavScroll = () => {
    if (!navbar) return;

    const current = window.scrollY;

    // Always show when near the top
    if (current <= 80) {
      navbar.classList.remove("nav-hidden");
      lastScrollY = current;
      return;
    }

    // Hide when scrolling down, show when scrolling up
    if (current > lastScrollY + 5) {
      navbar.classList.add("nav-hidden");
    } else if (current < lastScrollY - 5) {
      navbar.classList.remove("nav-hidden");
    }

    lastScrollY = current;
  };

  window.addEventListener("scroll", handleNavScroll, { passive: true });

  // Navbar item click behavior
  const navItems = document.querySelectorAll(".nav-list li span");
  const navTargets = {
    about: "#philosophy-section",
    work: "#projects-section",
    services: "#services-section",
    "linked in": "https://www.linkedin.com/in/yuvraj-tyagi-957a6a2a2/",
    linkedin: "https://www.linkedin.com/in/yuvraj-tyagi-957a6a2a2/",
    "get in touch": "#contact-section"
  };

  navItems.forEach((item) => {
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");

    const handleActivate = (e) => {
      e.preventDefault();
      const key = item.textContent.trim().toLowerCase();
      const target = navTargets[key];

      if (!target) return;

      // External link (LinkedIn)
      if (target.startsWith("http")) {
        window.open(target, "_blank", "noopener,noreferrer");
        return;
      }

      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    item.addEventListener("click", handleActivate);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        handleActivate(e);
      }
    });
  });

  // Popup close logic (hero)
  const heroPopupGroup = document.querySelector(".hero .popup-group");
  const closeBtnHero = heroPopupGroup?.querySelector(".window-control.close");

  if (heroPopupGroup && closeBtnHero) {
    closeBtnHero.addEventListener("click", () => {
      heroPopupGroup.classList.add("is-hidden");
    });
  }

  // Restore hero popup when clicking anywhere on the hero section (except the close button)
  const heroSection = document.querySelector(".hero");
  if (heroSection && heroPopupGroup) {
    heroSection.addEventListener("click", (e) => {
      if (e.target.closest(".window-control.close")) return;
      heroPopupGroup.classList.remove("is-hidden");
    });
  }

  // ========================= SERVICES SECTION LOGIC START =========================
  // Services popups animation logic
  const servicePopups = document.querySelectorAll(".service-popup");
  const servicesGrid = document.querySelector(".services-grid");
  const servicesPopupGroup = servicesGrid?.querySelector(".popup-group");

  let isExpanded = false;
  let rotationInterval = null;
  let swapInterval = null;
  let currentAngleOffset = 0;
  let currentPositions = [];

  function checkCollision(rect1, rect2, minGap) {
    // Two rectangles collide if they overlap when each is expanded by minGap/2
    // This ensures they maintain at least minGap distance between edges
    const r1 = {
      left: rect1.left - minGap / 2,
      right: rect1.right + minGap / 2,
      top: rect1.top - minGap / 2,
      bottom: rect1.bottom + minGap / 2
    };
    const r2 = {
      left: rect2.left - minGap / 2,
      right: rect2.right + minGap / 2,
      top: rect2.top - minGap / 2,
      bottom: rect2.bottom + minGap / 2
    };
    
    // Check for overlap: rectangles DON'T overlap if one is completely to the side of the other
    const noOverlap = (r1.right < r2.left) || (r2.right < r1.left) || 
                      (r1.bottom < r2.top) || (r2.bottom < r1.top);
    
    return !noOverlap; // Return true if they collide
  }

  function calculateFixedPositions() {
    if (!servicesGrid || servicePopups.length === 0) return [];

    const gridRect = servicesGrid.getBoundingClientRect();
    const containerWidth = gridRect.width;
    const containerHeight = gridRect.height;

    const popupW = 325;
    const popupH = 198;
    const padding = 40;
    const gap = 80;

    // Calculate positions ensuring they stay within grid boundaries
    // 2 popups on left, 2 on right, 2 in center area
    const positions = [
      // Left side - 2 popups
      { left: padding, top: padding },                                           // Top-left
      { left: padding, top: containerHeight - popupH - padding },                // Bottom-left
      
      // Right side - 2 popups  
      { left: containerWidth - popupW - padding, top: padding },                 // Top-right
      { left: containerWidth - popupW - padding, top: containerHeight - popupH - padding }, // Bottom-right
      
      // Center area - 2 popups
      { left: containerWidth / 2 - popupW / 2, top: padding + 80 },             // Top-center
      { left: containerWidth / 2 - popupW / 2, top: containerHeight - popupH - padding - 80 } // Bottom-center
    ];

    return positions;
  }

  function applyPositions(positions) {
    currentPositions = [...positions];
    servicePopups.forEach((popup, index) => {
      if (!popup.classList.contains("is-hidden") && positions[index]) {
        popup.style.left = `${positions[index].left}px`;
        popup.style.top = `${positions[index].top}px`;
      }
    });
  }

  function swapPositions() {
    if (currentPositions.length < 2) return;
    
    // Randomly pick two different indices to swap
    const index1 = Math.floor(Math.random() * currentPositions.length);
    let index2 = Math.floor(Math.random() * currentPositions.length);
    while (index2 === index1) {
      index2 = Math.floor(Math.random() * currentPositions.length);
    }
    
    // Swap the positions
    const temp = currentPositions[index1];
    currentPositions[index1] = currentPositions[index2];
    currentPositions[index2] = temp;
    
    // Apply the swapped positions
    applyPositions(currentPositions);
  }

  if (servicesGrid && servicesPopupGroup) {
    // Set initial centered position for all popups
    servicePopups.forEach((popup) => {
      popup.style.left = '50%';
      popup.style.top = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
    });

    servicesGrid.addEventListener("mouseenter", () => {
      isExpanded = true;
      const positions = calculateFixedPositions();
      applyPositions(positions);
      // Remove transforms when spreading
      servicePopups.forEach((popup) => {
        popup.style.transform = '';
      });

      // Start swapping positions every 3 seconds
      swapInterval = setInterval(() => {
        if (isExpanded) {
          swapPositions();
        }
      }, 3000);
    });

    servicesGrid.addEventListener("mouseleave", () => {
      isExpanded = false;
      currentAngleOffset = 0;
      if (rotationInterval) clearInterval(rotationInterval);
      if (swapInterval) clearInterval(swapInterval);
      currentPositions = [];

      servicePopups.forEach((popup) => {
        popup.style.left = '50%';
        popup.style.top = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
      });
    });

    servicesGrid.addEventListener("click", () => {
      servicePopups.forEach((popup) => popup.classList.remove("is-hidden"));
    });
  }

  if (servicePopups.length) {
    servicePopups.forEach((popup) => {
      const close = popup.querySelector(".window-control.close");
      if (close) {
        close.addEventListener("click", (e) => {
          e.stopPropagation();
          popup.classList.add("is-hidden");
        });
      }

      // Drag functionality
      let isDragging = false;
      let dragOffsetX = 0;
      let dragOffsetY = 0;

      popup.addEventListener("mousedown", (e) => {
        // Don't drag if clicking close button
        if (e.target.closest(".window-control")) return;
        
        isDragging = true;
        const rect = popup.getBoundingClientRect();
        const containerRect = servicesGrid.getBoundingClientRect();
        
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;

        // Pause swap while dragging
        if (swapInterval) {
          clearInterval(swapInterval);
          swapInterval = null;
        }

        popup.style.zIndex = 1000;
        popup.style.transition = 'left 0.05s linear, top 0.05s linear'; // Smooth but responsive
        e.preventDefault();
      });

      const handleMouseMove = (e) => {
        if (!isDragging || popup.classList.contains("is-hidden")) return;

        const containerRect = servicesGrid.getBoundingClientRect();
        const popupW = 325;
        const popupH = 198;

        // Calculate position relative to grid
        let newX = e.clientX - containerRect.left - dragOffsetX;
        let newY = e.clientY - containerRect.top - dragOffsetY;

        // Clamp within grid bounds
        newX = Math.max(0, Math.min(newX, containerRect.width - popupW));
        newY = Math.max(0, Math.min(newY, containerRect.height - popupH));

        popup.style.left = `${newX}px`;
        popup.style.top = `${newY}px`;
        popup.style.transform = '';

        // Update currentPositions
        const popupIndex = Array.from(servicePopups).indexOf(popup);
        if (popupIndex !== -1 && currentPositions[popupIndex]) {
          currentPositions[popupIndex] = { left: newX, top: newY };
        }
      };

      const handleMouseUp = () => {
        if (isDragging) {
          isDragging = false;
          popup.style.zIndex = '';
          popup.style.transition = 'left 1.5s cubic-bezier(0.4, 0, 0.2, 1), top 1.5s cubic-bezier(0.4, 0, 0.2, 1), transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), margin 1.5s cubic-bezier(0.4, 0, 0.2, 1)'; // Restore original animation

          // Resume swap if still expanded
          if (isExpanded && !swapInterval) {
            swapInterval = setInterval(() => {
              if (isExpanded) {
                swapPositions();
              }
            }, 3000);
          }
        }
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      // Pause swap when hovering on popup
      popup.addEventListener("mouseenter", () => {
        if (swapInterval && !isDragging) {
          clearInterval(swapInterval);
          swapInterval = null;
        }
      });

      // Resume swap when leaving popup
      popup.addEventListener("mouseleave", () => {
        if (isExpanded && !swapInterval && !isDragging) {
          swapInterval = setInterval(() => {
            if (isExpanded) {
              swapPositions();
            }
          }, 3000);
        }
      });
    });

    // Click anywhere to restore hidden popups
    document.addEventListener("click", (e) => {
      if (e.target.closest(".window-control.close")) return;
      servicePopups.forEach((popup) => {
        popup.classList.remove("is-hidden");
      });
    });
  }
  // ========================= SERVICES SECTION LOGIC END =========================

  // Certificate modal logic
  const modal = document.getElementById("certificateModal");
  const modalImg = document.getElementById("modalImage");
  const modalClose = document.getElementById("modalClose");
  const certificates = document.querySelectorAll(".certificate-card img");

  if (modal && modalImg && modalClose && certificates.length) {
    certificates.forEach((img) => {
      img.addEventListener("click", () => {
        modalImg.src = img.src;
        modal.classList.add("active");
      });
    });

    const closeModal = () => {
      modal.classList.remove("active");
      modalImg.src = "";
    };

    modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Certificate cursor logic
  const cursor = document.getElementById("certificateCursor");
  const cards = document.querySelectorAll(".certificate-card");

  if (cursor && cards.length) {
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
      });

      card.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(0)";
      });

      card.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });
    });
  }

  // Timeline scroll animation
  const observerOptions = {
    root: null,
    threshold: 0.3,
    rootMargin: "0px"
  };

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const labelContainers = document.querySelectorAll(".label-container");
      const timelineLine = document.querySelector(".timeline-line-svg");
      
      if (entry.isIntersecting) {
        // Animate line first
        if (timelineLine) {
          timelineLine.classList.add("animate-in");
        }
        
        // Then animate labels with delay
        labelContainers.forEach((container, i) => {
          setTimeout(() => {
            container.classList.add("animate-in");
          }, 800 + (i * 150));
        });
      } else {
        if (timelineLine) {
          timelineLine.classList.remove("animate-in");
        }
        labelContainers.forEach((container) => {
          container.classList.remove("animate-in");
        });
      }
    });
  }, observerOptions);

  const timelineSection = document.querySelector(".timeline-wrapper");
  if (timelineSection) {
    timelineObserver.observe(timelineSection);
  }

  // Fixed contact social links order: [Figma, Instagram, LinkedIn]
  const contactIcons = document.querySelectorAll(".contact-socials .contact-icon");
  if (contactIcons && contactIcons.length >= 3) {
    const figma = "https://www.figma.com/@yash9o1";
    const instagram = "https://www.instagram.com/yash9o1/";
    const linkedin = navTargets.linkedin || navTargets["linked in"] || "https://www.linkedin.com/in/yuvraj-tyagi-957a6a2a2/";

    contactIcons[0].setAttribute("href", figma);
    contactIcons[1].setAttribute("href", instagram);
    contactIcons[2].setAttribute("href", linkedin);

    contactIcons.forEach((anchor) => {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    });
  }

  // Ensure max-width: 360px for service popups on mobile
  if (window.matchMedia('(max-width: 768px)').matches) {
    document.querySelectorAll('.services-grid .service-popup').forEach(function(popup) {
      popup.style.maxWidth = '360px';
    });
  }

  // DISABLE DESKTOP SERVICES LOGIC ON MOBILE
  if (window.matchMedia("(max-width: 768px)").matches) {
      const servicesGrid = document.querySelector(".services-grid");

      if (servicesGrid) {
          servicesGrid.onmouseenter = null;
          servicesGrid.onmouseleave = null;
          servicesGrid.onclick = null;
      }

      document.querySelectorAll(".service-popup").forEach(p => {
          p.onmousedown = null;
      });
  }
});
// ===== MOBILE ONLY: SERVICE POPUP CLOSE / REAPPEAR =====
if (window.matchMedia("(max-width: 768px)").matches) {

    const popups = document.querySelectorAll(".service-popup");

    popups.forEach(popup => {
        const closeBtn = popup.querySelector(".window-control.close");

        // Hide popup on close tap
        if (closeBtn) {
            closeBtn.addEventListener("click", e => {
                e.stopPropagation();
                popup.classList.add("is-hidden-mobile");
            });
        }
    });

    // Tap anywhere else on the page → restore popups
    document.addEventListener("click", e => {

        // ignore clicks inside a popup or on the close button
        if (e.target.closest(".service-popup") || e.target.closest(".window-control.close")) {
            return;
        }

        document.querySelectorAll(".service-popup.is-hidden-mobile")
            .forEach(p => p.classList.remove("is-hidden-mobile"));
    });
}
// ===== MOBILE ONLY: TAP + SWIPE TO FLIP =====
if (window.matchMedia("(max-width: 768px)").matches) {

    document.querySelectorAll(".service-popup .flip-inner").forEach(el => {

        // ---- TAP FLIP ----
        el.addEventListener("click", e => {
            // prevent accidental double flips when clicking buttons
            if (e.target.closest(".window-control")) return;
            el.classList.toggle("flipped");
        });

        // ---- SWIPE FLIP ----
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        el.addEventListener("touchstart", e => {
            const t = e.touches[0];
            startX = t.clientX;
            startY = t.clientY;
        }, { passive: true });

        el.addEventListener("touchmove", e => {
            const t = e.touches[0];
            endX = t.clientX;
            endY = t.clientY;
        }, { passive: true });

        el.addEventListener("touchend", () => {
            const dx = endX - startX;
            const dy = endY - startY;

            // horizontal swipe threshold
            const swipeHorizontal = Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy);

            if (swipeHorizontal) {
                el.classList.toggle("flipped");
            }
        });
    });
}
if (window.matchMedia("(max-width: 768px)").matches) {
    document.querySelectorAll(".service-popup .popup-card.main")
        .forEach(card => {
            // apply hint animation once when page loads
            setTimeout(() => {
                card.classList.add("swipe-hint");
            }, 400);

            // remove class after animation completes
            card.addEventListener("animationend", () => {
                card.classList.remove("swipe-hint");
            });
        });
}
if (window.matchMedia("(max-width: 768px)").matches) {

    const cards = document.querySelectorAll(".service-popup .popup-card.main");
    const section = document.querySelector(".services-section");

    if (section && cards.length) {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    cards.forEach(card => {
                        card.classList.add("wobble-on-scroll");

                        card.addEventListener("animationend", () => {
                            card.classList.remove("wobble-on-scroll");
                        }, { once: true });
                    });
                }
            });
        }, { threshold: 0.25 });

        observer.observe(section);
    }
}
if (window.matchMedia("(max-width: 768px)").matches) {

    const cards = document.querySelectorAll(".service-popup .popup-card.main");

    setInterval(() => {
        cards.forEach(card => {
            card.classList.add("wobble");
            card.addEventListener("animationend", () => {
                card.classList.remove("wobble");
            }, { once: true });
        });
    }, 3000); // three-second cycle
}
if (window.matchMedia("(max-width: 768px)").matches) {

    const cards = document.querySelectorAll(".service-popup .popup-card.main");

    setInterval(() => {
        cards.forEach(card => {
            card.classList.add("wobble");
            card.addEventListener("animationend", () => {
                card.classList.remove("wobble");
            }, { once: true });
        });
    }, 3000);
}
if (window.matchMedia("(max-width: 768px)").matches) {
  const cards = document.querySelectorAll(".service-popup .popup-card.main");

  setInterval(() => {
    cards.forEach(card => {
      card.classList.add("wobble");
      card.addEventListener("animationend", () => {
        card.classList.remove("wobble");
      }, { once: true });
    });
  }, 3500);
}
if (window.matchMedia("(max-width: 768px)").matches) {
  const cards = document.querySelectorAll(".service-popup .popup-card.main");

  setInterval(() => {
    cards.forEach(card => {
      card.classList.add("wobble");
      card.addEventListener("animationend", () => {
        card.classList.remove("wobble");
      }, { once: true });
    });
  }, 3000);
}
if (window.matchMedia("(max-width: 768px)").matches) {
  const cards = document.querySelectorAll(".service-popup .popup-card.main");

  setInterval(() => {
    cards.forEach(card => {
      card.classList.add("wobble");
      card.addEventListener("animationend", () => {
        card.classList.remove("wobble");
      }, { once: true });
    });
  }, 3000);
}

if (window.matchMedia("(max-width: 768px)").matches) {

    const section = document.querySelector(".services-section");
    const flips = document.querySelectorAll(".service-popup .flip-inner");

    const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;

        flips.forEach((card, i) => {
            setTimeout(() => {

                card.classList.add("auto-flip");

                setTimeout(() => {
                    card.classList.remove("auto-flip");
                }, 800); // duration of flip after delay

            }, i * 300); // staggered delay
        });

    }, { threshold: 0.3 });

    observer.observe(section);
}
if (window.matchMedia("(max-width: 768px)").matches) {

    const section = document.querySelector(".services-section");
    const cards = document.querySelectorAll(".service-popup .flip-inner");

    const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;

        cards.forEach((card, i) => {
            const flipDelay = i * 450;      // slow stagger
            const unflipDelay = flipDelay + 1200; // give time to flip fully

            const even = i % 2 === 0;

            setTimeout(() => {
                card.classList.add("auto-flip");
                card.classList.remove("auto-flip-back");
            }, flipDelay);

            setTimeout(() => {
                card.classList.remove("auto-flip");
                card.classList.add("auto-flip-back");
            }, unflipDelay);

        });

    }, { threshold: 0.3 });

    observer.observe(section);
}
if (window.matchMedia("(max-width: 768px)").matches) {

    const section = document.querySelector(".services-section");
    const cards = document.querySelectorAll(".service-popup");

    const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;

        cards.forEach((card, i) => {

            const t1 = i * 450;
            const t2 = t1 + 1200;

            setTimeout(() => {
                card.classList.add("auto-wobble");
                card.classList.remove("auto-wobble-back");
            }, t1);

            setTimeout(() => {
                card.classList.remove("auto-wobble");
                card.classList.add("auto-wobble-back");
            }, t2);

        });

    }, { threshold: 0.3 });

    observer.observe(section);
}
if (window.matchMedia("(max-width: 768px)").matches) {

    const section = document.querySelector(".services-section");
    const popups = document.querySelectorAll(".service-popup");

    const obs = new IntersectionObserver((entries) => {

        if (!entries[0].isIntersecting) return;

        popups.forEach((popup, i) => {

            const delay1 = i * 400;
            const delay2 = delay1 + 1200;

            // auto flip forward
            setTimeout(() => {
                popup.classList.add("auto-flip");
                popup.classList.remove("auto-flip-back");
            }, delay1);

            // auto flip back
            setTimeout(() => {
                popup.classList.remove("auto-flip");
                popup.classList.add("auto-flip-back");
            }, delay2);

        });

    }, { threshold: 0.3 });

    obs.observe(section);
}
if (window.matchMedia("(max-width: 768px)").matches) {

    const section = document.querySelector(".services-section");
    const popups = document.querySelectorAll(".service-popup");

    const obs = new IntersectionObserver((entries) => {

        if (!entries[0].isIntersecting) return;

        popups.forEach((card, i) => {

            const delay = i * 350;    // stagger for alternate effect
            const useAlt = i % 2 === 0;

            setTimeout(() => {
                card.classList.add(useAlt ? "wobble-in" : "wobble-in-2");

                // remove animation class so click flip remains independent
                setTimeout(() => {
                    card.classList.remove("wobble-in", "wobble-in-2");
                }, 1100);

            }, delay);
        });

    }, { threshold: 0.2 });

    obs.observe(section);
}
if (window.matchMedia("(max-width: 768px)").matches) {

    const section = document.querySelector(".services-section");
    const cards   = document.querySelectorAll(".service-popup");

    const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;

        cards.forEach((card, i) => {
            setTimeout(() => {

                const alt = (i % 2 === 0) ? "wobble-1" : "wobble-2";
                card.classList.add(alt);

                setTimeout(() => {
                    card.classList.remove("wobble-1", "wobble-2");
                }, 1400);

            }, i * 350);
        });

    }, { threshold: 0.3 });

    observer.observe(section);
}
if (window.matchMedia("(max-width: 768px)").matches) {

    const section = document.querySelector(".services-section");
    const wrappers = document.querySelectorAll(".wobble-wrapper");

    const obs = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;

        wrappers.forEach((wrap, i) => {
            const delay = i * 350;
            const cls   = (i % 2 === 0) ? "w1" : "w2";

            setTimeout(() => {
                wrap.classList.add(cls);

                setTimeout(() => {
                    wrap.classList.remove("w1", "w2");
                }, 1200);

            }, delay);
        });

    }, { threshold: 0.3 });

    obs.observe(section);
}
if (window.matchMedia("(max-width: 768px)").matches) {

    const section = document.querySelector(".services-section");
    const wraps   = document.querySelectorAll(".wobble-wrapper");

    const obs = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;

        wraps.forEach((wrap, i) => {
            const delay = i * 350;
            const cls = (i % 2 === 0) ? "wobble-a" : "wobble-b";

            setTimeout(() => {
                wrap.classList.add(cls);

                setTimeout(() => {
                    wrap.classList.remove("wobble-a", "wobble-b");
                }, 1200);

            }, delay);
        });

    }, { threshold: 0.25 });

    obs.observe(section);
}
if (window.matchMedia("(max-width: 768px)").matches) {

  const section = document.querySelector(".services-section");
  const wraps = document.querySelectorAll(".wobble-wrapper");

  const obs = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;

    wraps.forEach((wrap, i) => {

      const cls = (i % 2 === 0) ? "w1" : "w2";
      const delay = i * 350;

      setTimeout(() => {
        wrap.classList.add(cls);

        setTimeout(() => {
          wrap.classList.remove("w1", "w2");
        }, 1000);

      }, delay);
    });

  }, { threshold: 0.3 });

  obs.observe(section);
}
if (window.matchMedia("(max-width: 768px)").matches) {

  const section = document.querySelector(".services-section");
  const hint = document.getElementById("swipeHint");

  let shown = false;

  const obs = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting || shown) return;

    shown = true;
    hint.classList.add("show");

    setTimeout(() => {
      hint.classList.remove("show");
    }, 3500); // visible for 3.5 seconds

  }, { threshold: 0.4 });

  obs.observe(section);
}
const form = document.getElementById("contactForm");
const successPopup = document.getElementById("successPopup");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  if (data.success) {
    successPopup.classList.add("show");
    form.reset();
  }
});

successPopup.addEventListener("click", () => {
  successPopup.classList.remove("show");
});
