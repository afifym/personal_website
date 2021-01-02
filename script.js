const sections = document.querySelectorAll(".main");
const navLinks = document.querySelectorAll(".nav-link")

function isVisible(elm) {
    let pos = elm.getBoundingClientRect();
    let vHeight = window.innerHeight;
           
    return (pos.top >= 0 && pos.bottom <= vHeight) || (pos.top <= 0 && (pos.bottom >= vHeight));
}

function ease(t, b, c, d) {
    // Attributed to http://gizma.com/easing
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
}

function linkClick(e, duration=1000) {
  e.preventDefault();

  let targetElm = document.querySelector(`#${e.target.dataset.link}`);
  let startPosition = window.pageYOffset;
  let targetPosition = targetElm.getBoundingClientRect().top;    // distance from target to window top
  let startTime = null;

  function scrollAnimation(currentTime) {
    if (startTime === null) startTime = currentTime;

    let timeElapsed = currentTime - startTime;
    let scrollAmount = ease(
      timeElapsed,
      startPosition,
      targetPosition,
      duration
    );
    
    window.scrollTo(0, scrollAmount);

    if (timeElapsed < duration) requestAnimationFrame(scrollAnimation); // used for a smooth scroll animation
  }

  if (Math.abs(targetPosition) > 30) requestAnimationFrame(scrollAnimation); // only scroll after a threshold
}

navLinks.forEach((a) => {
  a.addEventListener("click", function (e) {
    linkClick(e, 1000);
  });
});


// const sr = ScrollReveal({
//     origin: 'top',
//     distance: '80px',
//     duration: 1200,
//     reset: true
// });

// sr.reveal('#navigation',{}); 

// sr.reveal('#profile',{delay: 100}); 
// sr.reveal('#skills',{delay: 100}); 
// sr.reveal('#projects',{delay: 100}); 
// sr.reveal('.contact',{delay: 100}); 
