let currentSlide = 0;
const totalSlides = 3;
const sliderTrack = document.getElementById("sliderTrack");
const dots = document.querySelectorAll(".dot");

function updateSlider() {
  const translateX = -currentSlide * (100 / totalSlides);
  sliderTrack.style.transform = `translateX(${translateX}%)`;

  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateSlider();
}

// Auto-advance carousel every 5 seconds
setInterval(nextSlide, 5000);

// Touch/swipe support for mobile
let startX = 0;
let isDragging = false;

sliderTrack.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

sliderTrack.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
});

sliderTrack.addEventListener("touchend", (e) => {
  if (!isDragging) return;
  isDragging = false;

  const endX = e.changedTouches[0].clientX;
  const diffX = startX - endX;

  if (Math.abs(diffX) > 50) {
    if (diffX > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});
