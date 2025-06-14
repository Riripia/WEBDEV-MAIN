document.addEventListener('DOMContentLoaded', () => {
  const modal     = document.getElementById('authModal');
  const trigger   = document.getElementById('authTrigger');
  const closeBtn  = document.getElementById('closeAuth');
  const tabSignIn = document.getElementById('tabSignIn');
  const tabSignUp = document.getElementById('tabSignUp');
  const formSI    = document.getElementById('formSignIn');
  const formSU    = document.getElementById('formSignUp');

  function openModal(isSignUp = false) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    isSignUp ? switchToSignUp() : switchToSignIn();
  }
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  function switchToSignIn() {
    tabSignIn.classList.add('active');
    tabSignUp.classList.remove('active');
    formSI.classList.add('active');
    formSU.classList.remove('active');
  }
  function switchToSignUp() {
    tabSignUp.classList.add('active');
    tabSignIn.classList.remove('active');
    formSU.classList.add('active');
    formSI.classList.remove('active');
  }

  trigger.addEventListener('click', e => {
    e.preventDefault(); // avoid page jump
    openModal(false);
  });

  tabSignIn.addEventListener('click', switchToSignIn);
  tabSignUp.addEventListener('click', switchToSignUp);
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal(); // click outside
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Add back button event listener
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'services.html'; // fallback page
      }
    });
  }
});

const track = document.querySelector('.carousel-track');
if (track) {
  let slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button.right');
  const prevButton = document.querySelector('.carousel-button.left');

  if (slides.length > 0 && nextButton && prevButton) {
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    slides = Array.from(track.children);

    let currentIndex = 1; // Start at the real first slide

    function updateSlidePosition(animate = true) {
      const slideWidth = slides[0].getBoundingClientRect().width;
      if (!animate) {
        track.style.transition = 'none';
      } else {
        track.style.transition = 'transform 0.5s ease-in-out';
      }
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }

    nextButton.addEventListener('click', () => {
      if (currentIndex >= slides.length - 1) return;
      currentIndex++;
      updateSlidePosition();
    });

    prevButton.addEventListener('click', () => {
      if (currentIndex <= 0) return;
      currentIndex--;
      updateSlidePosition();
    });

    track.addEventListener('transitionend', () => {
      if (slides[currentIndex] === firstClone) {
        currentIndex = 1;
        updateSlidePosition(false);
      }
      if (slides[currentIndex] === lastClone) {
        currentIndex = slides.length - 2;
        updateSlidePosition(false);
      }
    });

    window.addEventListener('resize', () => updateSlidePosition(false));

    let autoSlideInterval = setInterval(() => {
      nextButton.click();
    }, 3000); // Change every 3 seconds

    // Initial setup
    updateSlidePosition(false);
  }
}

document.getElementById('bookNowBtn').onclick = function() {
  window.location.href = 'booking.html';
};
