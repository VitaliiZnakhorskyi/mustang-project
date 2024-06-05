"use strict"

// touch or mouse
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};
//
if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menyArrows = document.querySelectorAll('.menu__arrow');
    if(menyArrows.length > 0) {
        for (let index = 0; index < menyArrows.length; index++) {
            const menuArrow = menyArrows[index];
            menuArrow.addEventListener("click", function(e) {
                menuArrow.parentElement.classList.toggle('_active'); 
            });
        }
    }
} else{
    document.body.classList.add('_pc');
};


// burger menu
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active'); 
        menuBody.classList.toggle('_active');
    });
};


// smooth behavior
const menuLinks = document.querySelectorAll('.sidebar__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
       const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

          
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();

            if (document.body.classList.contains('_touch')) {
                const gotoBlockValueTouch = gotoBlock.getBoundingClientRect().top + pageYOffset - (document.querySelector('header').offsetHeight + document.querySelector('.sidebar__list').offsetHeight);

                window.scrollTo({
                    top: gotoBlockValueTouch,
                    behavior: "smooth"
                });
            }
        }
    }
};

// position main
const getElementMain = document.querySelector('.main');
const getElementHeader = document.querySelector('.header');
const bottomPositionHeader = getElementHeader.getBoundingClientRect().bottom;
getElementMain.style.marginTop = `${bottomPositionHeader}px`;

// button to__top
const goTopBtn = document.querySelector('.go__top');
goTopBtn.addEventListener("click", goTop);
window.addEventListener("scroll", trackScroll);
function trackScroll() {
    const offset = window.pageYOffset;
    const userHeight = document.documentElement.clientHeight;
    if (offset > userHeight) {
        goTopBtn.classList.add("go__top-show");
    } else {
        goTopBtn.classList.remove("go__top-show");
    }
};
function goTop() {
    if (window.pageYOffset > 0) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
};


// slider
const slides = document.querySelectorAll('.slide');
let counter = 0;
slides.forEach(
    (slide, index) => {
        slide.style.left = `${index * 100}%`
    }
);

const goNext = () => {
    if (counter < slides.length - 1) {
        counter++;
        slideImage();
        }
    };

const goPrev = () => {
    if (counter != 0) {
        counter--;
        slideImage();
        }
    };

const slideImage = () => {
    slides.forEach (
        (slide) => {
            slide.style.transform = `translateX(-${counter * 100}%)`
        }
    )
};

// position button generation page on smal display
const mainNav = document.querySelector('.main__nav');
const navPrev = document.querySelector('.nav__prev');
const navNext = document.querySelector('.nav__next');

if(mainNav) {
        if(document.body.classList.contains('_touch')) {
        mainNav.append(navPrev);
        mainNav.append(navNext);
    };
};


// photo page slider
let box = document.querySelector('.main__box');

if(box) {
        for (let i=1; i<=11; i++) {
        let div = document.createElement('div');
        div.className = 'item';
        // div.textContent = i;
        box.appendChild(div);
    }
    function moveNext() {
        let items = document.querySelectorAll('.item');
        box.appendChild(items[0]);
    }
    function movePrev() {
        let items = document.querySelectorAll('.item');
        box.prepend(items[items.length - 1]);
    }
    window.addEventListener('wheel', function(event) {
        if(event.deltaY > 0){
            moveNext();
        } else {
            movePrev();
        }
    });
    
    // photo page slider on touch
   

    box.addEventListener('touchstart', handleTouchStart, false);
    box.addEventListener('touchmove', handleTouchMove, false);

    let x1 = null;
    let y1 = null;

    function handleTouchStart(event) {
        const firstTouch = event.touches[0];
        x1 = firstTouch.clientX;
        y1 = firstTouch.clientY;
    }

    function handleTouchMove(event) {
        if(!x1 || !y1) {
            return false;
        }
        let x2 = event.touches[0].clientX;
        let y2 = event.touches[0].clientY;
        let xDiff = x2 - x1;
        let yDiff = y2 - y1;

        if(Math.abs(xDiff) > Math.abs(yDiff)) {
            // r-l
            if(xDiff > 0) movePrev();
            else moveNext();
        } else {
            // t-b
            if(yDiff > 0) movePrev();
            else moveNext();
        }
        x1 = null;
        y1 = null;
    }
   
    


    const firstItem = box.firstElementChild;
    firstItem.classList.add('first-photo');

    const twoItem = firstItem.nextElementSibling;
    twoItem.classList.add('two-photo');

    const threeItem = twoItem.nextElementSibling;
    threeItem.classList.add('three-photo');

    const forthItem = threeItem.nextElementSibling;
    forthItem.classList.add('forth-photo');

    const fifthItem = forthItem.nextElementSibling;
    fifthItem.classList.add('fifth-photo');

    const sixthItem = fifthItem.nextElementSibling;
    sixthItem.classList.add('sixth-photo');

    const seventhItem = sixthItem.nextElementSibling;
    seventhItem.classList.add('seventh-photo');

    const eighthItem = seventhItem.nextElementSibling;
    eighthItem.classList.add('eighth-photo');

    const ninthItem = eighthItem.nextElementSibling;
    ninthItem.classList.add('ninth-photo');

    const tenthItem = ninthItem.nextElementSibling;
    tenthItem.classList.add('tenth-photo');

    const eleventh = tenthItem.nextElementSibling;
    eleventh.classList.add('eleventh-photo');
};


