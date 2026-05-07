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


/* === CAROUSEL === */
let cur = 0;
const total = 3;

function go(n) {
  document.getElementById('r' + cur).classList.remove('active');
  document.getElementById('d' + cur).classList.remove('active');
  cur = n;
  document.getElementById('r' + cur).classList.add('active');
  document.getElementById('d' + cur).classList.add('active');
}
function next() { go((cur + 1) % total); }
function prev() { go((cur - 1 + total) % total); }

function toggle(btn) {
  const card = btn.closest('.review-card');
  card.classList.toggle('expanded');
  btn.textContent = card.classList.contains('expanded') ? 'Show less' : 'Read more';
}

/* === COUNTERS === */
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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      startCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach((counter) => observer.observe(counter));


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


// SEE MORE
document.querySelectorAll('.see-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const review = btn.closest('.review');
    review.classList.toggle('expanded');

    btn.textContent = review.classList.contains('expanded')
      ? 'See Less'
      : 'See More';
  });
});

document.querySelectorAll('#services .see-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const box = btn.closest('.service-box');
    box.classList.toggle('expanded');

    btn.textContent = box.classList.contains('expanded')
      ? 'See Less'
      : 'See More';
  });
});


let cur = 0;
const total = 3;

function go(n) {
  document.getElementById('r' + cur).classList.remove('active');
  document.getElementById('d' + cur).classList.remove('active');
  cur = n;
  document.getElementById('r' + cur).classList.add('active');
  document.getElementById('d' + cur).classList.add('active');
}

function next() { go((cur + 1) % total); }
function prev() { go((cur - 1 + total) % total); }

function toggle(btn) {
  const card = btn.closest('.review-card');
  card.classList.toggle('expanded');
  btn.textContent = card.classList.contains('expanded') ? 'Show less' : 'Read more';
}