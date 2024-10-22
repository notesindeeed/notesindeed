let currentIndex = 1; // Start with the first actual slide
const slidesWrapper = document.getElementById('slidesWrapper');
const dots = document.getElementsByClassName('dot');
const totalSlides = 3; // Original slides count (without clones)
const totalSlidesWithClones = document.getElementsByClassName('ftfcard').length;

// Set initial transform to show the first original slide
slidesWrapper.style.transform = `translateX(-100%)`;

// Function to move to the next or previous slide
function moveSlide(n) {
    currentIndex += n;

    // Smoothly transition to the next/previous slide
    slidesWrapper.style.transition = 'transform 0.6s ease';
    slidesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

    // If we're at the cloned first/last slide, snap to the original
    if (currentIndex === 0) {
        // Moving from original first to cloned last
        setTimeout(() => {
            slidesWrapper.style.transition = 'none'; // Disable transition
            currentIndex = totalSlides; // Jump to the original last slide
            slidesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }, 600); // After the slide transition ends
    } else if (currentIndex === totalSlidesWithClones - 1) {
        // Moving from original last to cloned first
        setTimeout(() => {
            slidesWrapper.style.transition = 'none'; // Disable transition
            currentIndex = 1; // Jump to the original first slide
            slidesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }, 600); // After the slide transition ends
    }

    // Update dots
    updateDots();
}

// Function to set a specific slide using dots
function setSlide(n) {
    currentIndex = n + 1; // Add 1 because of the clone at the beginning
    slidesWrapper.style.transition = 'transform 0.6s ease';
    slidesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

// Function to update the active dot
function updateDots() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active-dot');
    }
    dots[(currentIndex - 1) % totalSlides].classList.add('active-dot');
}

// Auto slide every 3 seconds
setInterval(() => {
    moveSlide(1);
}, 3000);

//Founder-section-slider
let currentFounderSlideIndex = 0;
let Founderslides = document.getElementsByClassName('founder');
let Founderdots = document.getElementsByClassName('fdot')

showFounderSlide(currentFounderSlideIndex);
function moveFounder(m) {
    currentFounderSlideIndex += m;
    if (currentFounderSlideIndex >= Founderslides.length) {
        currentFounderSlideIndex = 0;
    }
    if (currentFounderSlideIndex < 0) {
        currentFounderSlideIndex = Founderslides.length - 1;
    }
    showFounderSlide(currentFounderSlideIndex);
}
function setFounderSlide(m) {
    currentFounderSlideIndex = m;
    showFounderSlide(currentFounderSlideIndex);
}
function showFounderSlide(m) {
    for (let i = 0; i < Founderslides.length; i++) {
        Founderslides[i].classList.remove('active');
        Founderslides[i].classList.remove('prev-slide');
    }
    Founderslides[m].classList.add('active');
    let prevIndex = (m - 1 + Founderslides.length) % Founderslides.length;
    Founderslides[prevIndex].classList.add('prev-slide');

    for (let i = 0; i < Founderdots.length; i++) {
        Founderdots[i].classList.remove('active-dot');
    }
    Founderdots[m].classList.add('active-dot');
}
setInterval(() => {
    moveFounder(1);
}, 4000);


//material-slider-function
const initmSlider = () => {
    const mslideBtns = document.querySelectorAll(".material-slide-btn");
    const mslideList = document.querySelector(".materials");
    const msliderScrollBar = document.querySelector(".material-scrollbar");
    const mScrollBarThumb = document.querySelector(".material-scrollbar-thumb");
    const maxmScrollLeft = mslideList.scrollWidth - mslideList.clientWidth;

    mScrollBarThumb.addEventListener("mmousedown", (e) => {
        const mstartX = e.clientX;
        const mthumbPos = mScrollBarThumb.offsetLeft;

        const handlemMouseMov = (e) => {
            const mdeltaX = e.clientX - mstartX;
            const newmThumbPos = mthumbPos + mdeltaX;
            const maxmThumbPos = msliderScrollBar.getBoundingClientRect().width - mScrollBarThumb.offsetWidth;

            const mboundedPos = Math.max(0, Math.min(maxmThumbPos, newmThumbPos));
            const mscrollPos = (mboundedPos / maxmThumbPos) * maxmScrollLeft;

            mScrollBarThumb.style.left = `${mboundedPos}px`;
            mslideList.scrollLeft = mscrollPos;
        }

        const handlemMouseUp = () => {
            document.removeEventListener("mmousemove", handlemMouseMov);
            document.removeEventListener("mmouseup", handlemMouseUp);
        }

        document.addEventListener("mmousemove", handlemMouseMov);
        document.addEventListener("mmouseup", handlemMouseUp);
    });

    mslideBtns.forEach(button => {
        button.addEventListener("click", () => {
            const mdirection = button.id === "m-prev" ? -1 : 1;
            const mscrollAmount = mslideList.clientWidth * mdirection;
            mslideList.scrollBy({ left: mscrollAmount, behavior: "smooth" });
        });
    });

    const handlemSlideButtons = () => {
        mslideBtns[0].style.display = mslideList.scrollLeft <= 0 ? "none" : "block";
        mslideBtns[1].style.display = mslideList.scrollLeft >= maxmScrollLeft ? "none" : "block";
    }

    const updatemScrollThumbPos = () => {
        const mscrollPos = mslideList.scrollLeft;
        const mthumbPos = (mscrollPos / maxmScrollLeft) * (msliderScrollBar.clientWidth - mScrollBarThumb.offsetWidth);
        mScrollBarThumb.style.left = `${mthumbPos}px`;
    }

    mslideList.addEventListener("scroll", () => {
        handlemSlideButtons();
        updatemScrollThumbPos();
    });
}

window.addEventListener("load", initmSlider);




//account-toggle-&-mode-change-----functions
var settingsmenu = document.querySelector(".settings-menu");
var darkBtn = document.getElementById("dark-btn")

function settingsMenuToggle() {
    settingsmenu.classList.toggle("settings-menu-height");
}

darkBtn.onclick = function () {
    darkBtn.classList.toggle("dark-btn-on");
    document.body.classList.toggle("dark-theme")

    if (localStorage.getItem("theme") == "light") {
        localStorage.setItem("theme", "dark");
    }
    else {
        localStorage.setItem("theme", "dark");
    }

}

if (localStorage.getItem("theme") == "light") {
    darkBtn.classList.remove("dark-btn-on");
    document.body.classList.remove("dark-theme");
}
else if (localStorage.getItem("theme") == "dark") {
    document.body.classList.add("dark-theme")
}
else {
    localStorage.setItem("theme", "light");
}

localStorage.setItem("theme", "light");
localStorage.getItem("theme");


// PDFs sliderscroll-bar
const initSlider = () => {
    const m = document.querySelectorAll(".pdf-slide-btn");
    const slideList = document.querySelector(".pdfs");
    const sliderScrollBar = document.querySelector(".slider-scrollbar");
    const ScrollBarThumb = document.querySelector(".scrollbar-thumb");
    const maxScrollLeft = slideList.scrollWidth - slideList.clientWidth;

    ScrollBarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPos = ScrollBarThumb.offsetLeft;

        const handleMouseMov = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPos = thumbPos + deltaX;
            const maxThumbPos = sliderScrollBar.getBoundingClientRect().width - ScrollBarThumb.offsetWidth;

            const boundedPos = Math.max(0, Math.min(maxThumbPos, newThumbPos));
            const scrollPos = (boundedPos / maxThumbPos) * maxScrollLeft;

            ScrollBarThumb.style.left = `${boundedPos}px`;
            slideList.scrollLeft = scrollPos;
        }

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMov);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMov);
        document.addEventListener("mouseup", handleMouseUp);
    });

    m.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = slideList.clientWidth * direction;
            slideList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        m[0].style.display = slideList.scrollLeft <= 0 ? "none" : "block";
        m[1].style.display = slideList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    const updateScrollThumbPos = () => {
        const scrollPos = slideList.scrollLeft;
        const thumbPos = (scrollPos / maxScrollLeft) * (sliderScrollBar.clientWidth - ScrollBarThumb.offsetWidth);
        ScrollBarThumb.style.left = `${thumbPos}px`;
    }

    slideList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPos();
    });
}

window.addEventListener("load", initSlider);


//stats-counter-section
let counts = document.querySelectorAll(".count");
let counterSec = document.querySelector(".stats-details");
const speed = 900; // Set speed to 900 for a fast count

let test = false;

window.onscroll = () => {
    // Get the position of the section relative to the viewport
    const sectionPosition = counterSec.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    // Check if the section is in the viewport
    if (sectionPosition < screenPosition) {
        if (!test) {
            counts.forEach((e) => {
                let start = 0;
                let end = parseInt(e.dataset.target); // Get the target value from data attribute
                let increment = Math.ceil(end / speed); // Faster increment based on the speed value (900)

                let counter = setInterval(() => {
                    start += (increment * 5); // Increment the start value by the calculated increment
                    if (start > end) start = end; // Ensure we don't go over the target

                    e.textContent = start;

                    if (start === end) {
                        clearInterval(counter); // Stop the counter when reaching the target
                    }
                }, 20); // You can adjust the interval time, but 20ms works well for a smooth fast count
            });

            test = true; // Ensure the counter only runs once
        }
    }
};

var togglemenu = document.querySelector(".head-title");

function toggleMoreMenu() {
    togglemenu.classList.toggle("show-menu")
}