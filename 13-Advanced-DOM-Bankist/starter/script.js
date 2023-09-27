'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations');
const tabsContents = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btnOpenModal =>
  btnOpenModal.addEventListener('click', openModal),
);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// smooth scroll to 1st section
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  const section1Coords = section1.getBoundingClientRect();
  console.log(section1Coords);
  // window.scrollTo(section1Coords.left+window.scrollX, section1Coords.top + window.scrollY);

  /* window.scrollTo({
                                          left: section1Coords.left + window.scrollX,
                                          top: section1Coords.top + window.scrollY,
                                          behavior: 'smooth'
                                        });*/

  // modern variant
  section1.scrollIntoView({ behavior: 'smooth' });
});

// top-level navigation behavior

/*

const scrollToSectionSmoothly = function (e) {
  e.preventDefault();
  const relatedSection = document.querySelector(this.getAttribute('href'));
  relatedSection.scrollIntoView({ behavior: 'smooth' });
};

document.querySelectorAll('.nav__link').forEach(link => {
  // use the same function instance to optimize performance
  // otherwise separate instances of function will be created for each element.
  // However if there're hundreds of elements - attaching handler is also expensive.
  // So better option would be to use event propagation and attach handler to the innermost container (.nav--links)
  link.addEventListener('click', scrollToSectionSmoothly);
});
*/

// another option is to capture the click event on parent navigation block container.
// This approach also allows to capture events for dynamic content which is not created yet in the DOM.
// For example for the grid rows which are dynamically populated.
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // matching strategy
  // check if the user actually clicked on particular nav link
  if (e.target.classList.contains('nav__link')) {
    const relatedSection = document.querySelector(
      e.target.getAttribute('href'),
    );
    relatedSection.scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////// TABBED COMPONENT /////////////////////

tabsContainer.addEventListener('click', function (e) {
  const clickedTab = e.target.closest(`.operations__tab`);

  // guard the condition to ignore event is there's no tab clicked
  if (!clickedTab) return;

  const tabNumber = +clickedTab.dataset.tab;

  // switch tabs
  const activeTabCssClass = 'operations__tab--active';
  tabs.forEach(tab => tab.classList.remove(activeTabCssClass));
  clickedTab.classList.add(activeTabCssClass);

  // switch content
  const activeContentCssClass = 'operations__content--active';
  tabsContents.forEach(content =>
    content.classList.remove(activeContentCssClass),
  );

  const targetTab = tabsContainer.querySelector(
    `.operations__content--${tabNumber}`,
  );
  targetTab.classList.add(activeContentCssClass);
});

// FADE OUT effect on top nav links
const navLinkFadeOutHandler = function (e) {
  // this = { opacity: float }
  if (e.target.classList.contains('nav__link')) {
    // get all nav links
    const allSiblingLinks = e.target
      .closest('.nav__links')
      .querySelectorAll('.nav__link');

    const logo = e.target.closest('.nav').querySelector('.nav__logo');

    // change opacity
    allSiblingLinks.forEach(link => {
      if (link !== e.target) {
        link.style.opacity = this.opacity;
      }
    });
    logo.style.opacity = this.opacity;
  }
};

// bind creates a copy of the function with `this` value assigned to argument
nav.addEventListener('mouseover', navLinkFadeOutHandler.bind({ opacity: 0.5 }));
nav.addEventListener('mouseout', navLinkFadeOutHandler.bind({ opacity: 1 }));

// STICKY HEADER

/*
// window scroll event is too frequently fired so handling it causes too much pain for the performance.
const initialSection1Coords = section1.getBoundingClientRect();
window.addEventListener('scroll', function () {
  if (window.scrollY > initialSection1Coords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/

// instead - use observer intersection API instead.
/*
const observerCallback = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
};
const observerOptions = {
  root: null, // means that our base area for monitoring intersections is the entire view port area.
  //rootMargin: '0px 0px -20px 0px',
  threshold: [0, 0.2], // percentage (from zero to one) of TARGET OBSERVED element area (section1) which is required to intersect with root element (view port) in order to treat intersection as happened.
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(document.querySelector('#section--2'));
*/
const stickyNav = function ([entry]) {
  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);

// POPPED UP SECTION with transition as the user approaches them
const sectionObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    threshold: 0.1,
  },
);
document.querySelectorAll('.section').forEach(section => {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

// LAZY LOAD of images
const lazyLoadHandler = function (entries, observer) {
  const intersectedEntries = entries.filter(e => e.isIntersecting);
  if (intersectedEntries.length === 0) return;

  intersectedEntries.forEach(entry => {
    const target = entry.target;

    // switch the image to the original resolution
    target.src = target.dataset.src;

    // defer removal of the class until the image is actually loaded
    target.addEventListener('load', e => e.target.classList.remove('lazy-img'));
    observer.unobserve(target);
  });
};

const lazeImageLoadObserver = new IntersectionObserver(lazyLoadHandler, {
  root: null,
  rootMargin: '200px',
  threshold: 0,
});

document
  .querySelectorAll('img[data-src]')
  .forEach(image => lazeImageLoadObserver.observe(image));

//////////////// SLIDER !!!!!
const slides = document.querySelectorAll('.slide');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const sliderBtnRight = document.querySelector('.slider__btn--right');
let currentSlideIndex = 0;
const maxSlideIndex = slides.length - 1;
const dotContainer = document.querySelector('.dots');

const createSliderDots = () => {
  slides.forEach((_, slideIndex) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${slideIndex}"></button>`,
    );
  });
};
createSliderDots();

const activateSliderDot = sliderIndex => {
  document.querySelectorAll('.dots__dot').forEach((dotElement, dotIndex) => {
    if (dotIndex == sliderIndex) {
      dotElement.classList.add('dots__dot--active');
    } else {
      dotElement.classList.remove('dots__dot--active');
    }
  });
};

const goToSlide = slideIndex => {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - slideIndex)}%)`),
  );
  activateSliderDot(slideIndex);
};

function goToNextSlide() {
  if (currentSlideIndex === maxSlideIndex) {
    currentSlideIndex = 0;
  } else {
    currentSlideIndex++;
  }

  goToSlide(currentSlideIndex);
}

function goToPrevSlide() {
  if (currentSlideIndex === 0) {
    currentSlideIndex = maxSlideIndex;
  } else {
    currentSlideIndex--;
  }

  goToSlide(currentSlideIndex);
}

// arrange the slides
goToSlide(currentSlideIndex);

sliderBtnRight.addEventListener('click', goToNextSlide);
sliderBtnLeft.addEventListener('click', goToPrevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    goToNextSlide();
  } else if (e.key === 'ArrowLeft') {
    goToPrevSlide();
  }
});

dotContainer.addEventListener('click', function (e) {
  // guard clause
  if (!e.target.classList.contains('dots__dot')) return;

  const slideIndex = Number(e.target.dataset.slide);
  goToSlide(slideIndex);
});

/*

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////


const h1 = document.querySelector('h1');
h1.onmouseenter = function () {
  console.log('entered the heading!');
}; // this is legacy
// use addEventListener always to allow greater flexibility (multiple independent handlers)

h1.onmouseenter = null;

const mouseEnterHandler = function () {
  console.log('from addeventlistener handler!');
  h1.removeEventListener('mouseenter', mouseEnterHandler);
};

h1.addEventListener('mouseenter', mouseEnterHandler);

// 3rd way is to write handler in HTML directly in attribute; this is even worse oldschool

*/

// EVENTS phases
// Capturing (doc -> target element traverse) -> Target phase (exec event handlers of the target)
// -> Bubbling (exec event handlers of parents from bottom to top)
// However some events use only Target phase (no capture and bubble).
/*

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

const setRandomBackgroundColor = function (e) {
  // event instance is the same for all handlers (target and bubbled)

  this.style.backgroundColor = getRandomColor();
  console.log('Original bottom target:', e.target); // target is always the same and points to element from target phase even when bubbling occurs

  console.log('Current element we attached to:', e.currentTarget);
  console.log('Is current element matches this: ', this === e.currentTarget);

  // propagation can be stopped. But this is not a good idea
  // because one component starts influencing parents. This tightens the components coupling too much.
  //e.stopPropagation();
};

document
  .querySelector('.nav__link')
  .addEventListener('click', setRandomBackgroundColor);

document
  .querySelector('.nav__links')
  .addEventListener('click', setRandomBackgroundColor);

document
  .querySelector('.nav')
  .addEventListener(
    'click',
    setRandomBackgroundColor,
    true /!*triggers during capture phase*!/,
  );
*/

/*

// SELECTING ELEMENTS
// document NODE is not the global document variable
// it is documentElement
console.log(document);
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const allSections = document.querySelectorAll('.section');
console.log(allSections);

console.log(document.getElementById('section--1'));

// get all elements by tag name (element type)
// returns HTMLConnection which is updated live while the dom changes
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// NodeList is a snapshot
// HTMLCollection is live and listens to DOM changes.

console.log(document.getElementsByClassName('btn'));

// querySelectorXXXX are snapshot
// getElementXXXXX are live

////////////////// CREATING ELEMENTS

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies! <button class="btn btn-close-cookie">Accept</button>';

const header = document.querySelector('.header');
// header.prepend(messageElement);
header.append(message); // moves element
// header.append(messageElement.cloneNode(true)); // creates deep copy

// before/after will insert as siblings, not as children
// header.before(messageElement);
// header.after(messageElement);

document.querySelector('.btn-close-cookie').addEventListener('click', function() {
  message.remove();
  // earlier version - parent.removeChild(messageElement)
});

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// reading styles works only for inline styles.
// Computed styles from CSS are not visible here.
console.log(message.style.height);
console.log(message.style.backgroundColor);

// special method to get computed style object
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// modifying root CSS variables using document
// this is needed for custom CSS properties
document.documentElement.style.setProperty('--color-primary','orangered')

//////////// ATTRIBUTES
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.alt);
logo.alt = 'beautiful!!';

// custom attributes
console.log(logo.getAttribute('designer'));
logo.setAttribute('designer','Ganin');

// src and href return absolute URIs
// however getAttribute returns relative values
console.log(logo.getAttribute('src'));

// data attributes
console.log(logo.dataset.versionNumber);

// CLASSES
logo.classList.add('a','b');
logo.classList.remove('a','b');
logo.classList.toggle('a');
logo.classList.contains('a');

// do not use className setter because it will remove all classes.
*/
/*

// DOM traversing
const h1 = document.querySelector('h1');

// going down

// recursive search
console.log(h1.querySelectorAll('.highlight'));

// immediate children - all types of Nodes - including comments, text and so on
console.log(h1.childNodes);

// immediate children - HTML elements only. Returns LIVE collection
console.log(h1.children);

// first child HTML element
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'red';

// going up!

// immediate parent NODE
console.log(h1.parentNode);

// immediate parent HTML element
console.log(h1.parentElement);

// descendant (closest one) by selector
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// closest includes the element itself
h1.closest('h1').style.background = 'var(--gradient-primary)';

// going SIDEWAYS

// immediate sibling HTML ELEMENT
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// immediate sibling NODE
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// all siblings can be obtained from parent only

// all HTML element siblings
console.log(h1.parentElement.children);
*/

// DOMContentLoaded waits ONLY for HTML and Javascript to be parsed and executed
document.addEventListener('DOMContentLoaded', function (e) {
  console.log(e);
  console.log(this);
});

// load event happens when all other referenced resources like images, CSS and others are downloaded and parsed
// this event happens on window
window.addEventListener('load', function (e) {
  console.log('LOAD event happened', e);
});

// beforeunload to confirm exit
/*window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  // to show confirm alert - set empty string
  e.returnValue = '';
  console.log(e);
});*/

// defer script guarantees the order, executed after HTML is parsed, downloaded asynchronously
// async does not guarantee the order, executed right away
