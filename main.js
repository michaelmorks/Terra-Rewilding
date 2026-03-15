  document.addEventListener('DOMContentLoaded', () => {

    function initSlider(sliderSelector, interval = 4000) {
      const slider = document.querySelector(sliderSelector);
      if (!slider) return;

      const slides = slider.querySelectorAll('.slide');
      let current = 0;

      setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
      }, interval);
    }

    initSlider('.hero-slider', 4000);

  });



  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => observer.observe(section));

  const navbar = document.querySelector('.navbar');

  function createShootingStar() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');
    star.style.top = Math.random() * 40 + 'px';
    const fromLeft = Math.random() < 0.5;
    star.style.left = fromLeft ? '-300px' : '0';
    star.classList.add(fromLeft ? 'shoot-right' : 'shoot-left');
    navbar.appendChild(star);
    setTimeout(() => star.remove(), 1800);
  }

  setInterval(() => { if (Math.random() > 0.6) createShootingStar(); }, 2000);


let currentProcess = 0;

const track = document.querySelector('.process-track');
const boxes = document.querySelectorAll('.process-box');

function changeProcess(direction) {
currentProcess += direction;

if (currentProcess < 0) currentProcess = boxes.length - 1;
if (currentProcess >= boxes.length) currentProcess = 0;

track.style.transform = `translateX(-${currentProcess * 100}%)`;

boxes.forEach(box => box.classList.remove('active'));
boxes[currentProcess].classList.add('active');
}


function openPDF() {
  const modal = document.getElementById("pdfModal");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closePDF(e) {
  if (!e || e.target.id === "pdfModal") {
    document.getElementById("pdfModal").style.display = "none";
    document.body.style.overflow = "";
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.getElementById("pdfModal").style.display = "none";
    document.body.style.overflow = "";
  }
});


function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("active");
}

function closeMenu() {
  document.getElementById("mobileMenu").classList.remove("active");
}


window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // Show loader
  loader.style.display = "flex";
  document.body.classList.add("loading");

  // Fade out loader after animation (~1.7s)
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1700); // adjust to match your animation length

  // Remove loader completely after fade
  loader.addEventListener("transitionend", (e) => {
    if (e.propertyName === "opacity") {
      loader.style.display = "none";
      document.body.classList.remove("loading");
    }
  }, { once: true });
});








  document.addEventListener("DOMContentLoaded", () => {
  
    const cards = document.querySelectorAll(".inspiration-slider .card");
    const envTitle = document.getElementById("env-title");
    const envDesc = document.getElementById("env-desc");
    const photoGrid = document.getElementById("photo-grid");
  
    // Data for each environment
    const environments = {
      terrariums: {
        title: "Terrariums",
        desc: "Create lush, self-contained ecosystems with mosses, ferns, and miniature plants.",
        photos: [
          "terrarium_img/1.png",
          "terrarium_img/2.png",
          "terrarium_img/3.png",
          "terrarium_img/4.png"
        ]
      },
      aquariums: {
        title: "Aquariums",
        desc: "Bring aquatic life into your home with beautiful fish and water plants.",
        photos: [
          "aquarium_img/1.jpg",
          "aquarium_img/2.jpg",
          "aquarium_img/3.jpg",
          "aquarium_img/4.jpg"
        ]
      },
      paludariums: {
        title: "Paludariums",
        desc: "Combine terrestrial and aquatic elements for a unique ecosystem experience.",
        photos: [
          "paludarium_img/1.png",
          "paludarium_img/2.png",
          "paludarium_img/3.png",
          "paludarium_img/4.png"
        ]
      },
      gardens: {
        title: "Native Gardens",
        desc: "Use native plants to create sustainable and low-maintenance landscapes.",
        photos: [
          "images/garden1.jpg",
          "images/garden2.jpg",
          "images/garden3.jpg",
          "images/garden4.jpg"
        ]
      },
      biotopes: {
        title: "Biotopes",
        desc: "Replicate specific natural environments for a realistic habitat.",
        photos: [
          "images/biotope1.jpg",
          "images/biotope2.jpg",
          "images/biotope3.jpg",
          "images/biotope4.jpg"
        ]
      }
    };
  
    // Update environment content
    function updateEnvironment(envKey) {
      const env = environments[envKey];
  
      envTitle.textContent = env.title;
      envDesc.textContent = env.desc;
  
      const imgs = photoGrid.querySelectorAll("img");
  
      imgs.forEach((img, index) => {
        img.src = env.photos[index];
        img.alt = `${env.title} ${index + 1}`;
      });
    }
  
    // Preload other environments (except terrariums)
    function preloadImages() {
      Object.entries(environments).forEach(([key, env]) => {
  
        if (key === "terrariums") return;
  
        env.photos.forEach(src => {
          const img = new Image();
          img.src = src;
        });
  
      });
    }
  
    // Load first environment instantly
    updateEnvironment("terrariums");
  
    // Background preload after page loads
    window.addEventListener("load", () => {
      setTimeout(preloadImages, 1500);
    });
  
    // Card click events
    cards.forEach(card => {
      card.addEventListener("click", () => {
  
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
  
        const envKey = card.getAttribute("data-env");
        updateEnvironment(envKey);
  
      });
    });
  
    // Reset slider position
    const slider = document.querySelector(".inspiration-slider");
    if (slider) {
      slider.scrollLeft = 0;
    }
  
  });


document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     COUNTER FUNCTION
  ========================== */
  const counters = document.querySelectorAll(".counter");

  const startCounter = (counter) => {
    const target = +counter.dataset.target;
    let count = 0;

    const update = () => {
      count += target / 120;

      if (count < target) {
        counter.textContent = Math.ceil(count);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  };


  /* =========================
     SCROLL REVEAL (RENAMED)
  ========================== */
  const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        // stop it from triggering again
        obs.unobserve(entry.target);

        entry.target.classList.add("visible");

        const counter = entry.target.querySelector(".counter");
        if (counter) startCounter(counter);
      }
    });
  }, { threshold: 0.4 });


  document.querySelectorAll(".stat-card").forEach(card => {
    statsObserver.observe(card);
  });



  /* =========================
     REVIEW FADE
  ========================== */
  const reviews = document.querySelectorAll(".review");

  if (reviews.length > 0) {
    let index = 0;

    setInterval(() => {
      reviews[index].classList.remove("active");
      index = (index + 1) % reviews.length;
      reviews[index].classList.add("active");
    }, 5000);
  }

});

