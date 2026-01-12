$(function () {

    "use strict";

    /***************************

 SUCCESS POPUP HELPER
***************************/
function showSuccessPopup() {
    const popup = document.getElementById("successPopup");
    const closeBtn = document.getElementById("closePopup");

    if (!popup) return;

    // Show popup
    popup.classList.add("active");

    // Close button
    closeBtn.onclick = () => popup.classList.remove("active");

    // Close on background click
    popup.onclick = (e) => {
        if (e.target === popup) {
            popup.classList.remove("active");
        }
    };
}

/***************************
 CONTACT FORM HANDLER
***************************/
function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return; // Not on contact page

    // avoid double-binding when Swup reloads page fragments
    if (form.dataset.bound === "true") return;
    form.dataset.bound = "true";

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const payload = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim()
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success) {
                showSuccessPopup();
                form.reset();
            } else {
                alert("❌ Failed to send: " + (data.error || ""));
            }

        } catch (err) {
            alert("⚠️ Network error, please try again.");
            console.error(err);
        }
    });
}
    /***************************

    swup

    ***************************/
    const options = {
        containers: ['#swupMain', '#swupPerson', '#swupBg', '#swupSkills', '#swupMenu'],
        animateHistoryBrowsing: true,
        linkSelector: 'a:not([data-no-swup])',
        plugins: [new SwupBodyClassPlugin()]
    };
    const swup = new Swup(options);

    const bodyClassPlugin = new SwupBodyClassPlugin({
        prefix: '.mil-fw-page'
    });

    /***************************

    register gsap plugins

    ***************************/
    gsap.registerPlugin(ScrollTrigger);
    
    window.addEventListener('load', () => {
    if (window.ScrollTrigger) {
        ScrollTrigger.refresh(true);
        setTimeout(() => ScrollTrigger.refresh(true), 150);
    }
});

    /***************************

    preloader

    ***************************/
    var timeline = gsap.timeline();

    timeline.to(".mil-preloader-content", {
        ease: "sine",
        y: 0,
        duration: 0.4,
        scale: 1,
        opacity: 1,
        delay: '.2',
    });

    timeline.to(".mil-preloader-content", {
        ease: "sine",
        y: '-200',
        duration: 0.4,
        scale: .6,
        opacity: 0,
        delay: '1.2',
    });

timeline.to(".mil-preloader-frame", {
    ease: "sine",
    duration: 0.4,
    height: 0,
    onComplete: function () {
        $('html').removeClass('is-animating');

        // ✅ Fix: recalc ScrollTrigger after preloader finishes
        if (window.ScrollTrigger) {
            ScrollTrigger.refresh(true);
            setTimeout(() => ScrollTrigger.refresh(true), 100);
            setTimeout(() => ScrollTrigger.refresh(true), 300);
        }
    }
});
;
    /***************************

    scroll progress

    ***************************/
    gsap.to('.mil-progress', {
        height: '100%',
        ease: 'linear',
        scrollTrigger: {
            scrub: 1
        }
    });
    /***************************

    parallax

    ***************************/
    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene, {
        limitY: 15,
    });
    /***************************

    anchor scroll

    ***************************/
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        var target = $($.attr(this, 'href'));
        var offset = 90;

        $('html, body').animate({
            scrollTop: target.offset().top - offset
        }, 400);
    });
    /***************************

    back to top

    ***************************/
    const btt = document.querySelector(".mil-back-to-top .mil-link");

    gsap.set(btt, {
        opacity: .5,
    });

    gsap.to(btt, {
        opacity: 1,
        ease: 'sine',
        scrollTrigger: {
            trigger: "body",
            start: "top -20%",
            end: "top -20%",
            toggleActions: "play none reverse none"
        }
    });
    /***************************

    scroll animations

    ***************************/

    const appearance = document.querySelectorAll(".mil-up");

    appearance.forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 50,
            ease: 'sine',
        }, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const rotate = document.querySelectorAll(".mil-rotate");

    rotate.forEach((section) => {
        var value = $(section).data("value");
        gsap.fromTo(section, {
            ease: 'sine',
            rotate: 0,

        }, {
            rotate: value,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });
    /***************************

    progressbar type 1

    ***************************/

    const progGo = document.querySelectorAll(".mil-circular-progress");

    progGo.forEach((section) => {
        var value = $(section).data("value");
        gsap.fromTo(section, {
            "--p": '0',
            ease: 'sine',
        }, {
            "--p": value,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    /***************************

    counter

    ***************************/
    const number = $(".mil-counter");
    number.each(function (index, element) {
        var count = $(this),
            zero = {
                val: 0
            },
            num = count.data("number"),
            split = (num + "").split("."), // to cover for instances of decimals
            decimals = split.length > 1 ? split[1].length : 0;

        gsap.to(zero, {
            val: num,
            duration: 2,
            scrollTrigger: {
                trigger: element,
                toggleActions: 'play none none reverse',
            },
            onUpdate: function () {
                count.text(zero.val.toFixed(decimals));
            }
        });
    });

    /***************************

    progressbars type 2 

    ***************************/
    const width = document.querySelectorAll(".mil-bar");

    width.forEach((section) => {
        var value = $(section).data("value");
        gsap.fromTo(section, {
            width: 0,
            duration: 5000,
            ease: 'sine',
        }, {
            width: value,
            scrollTrigger: {
                trigger: section,
                toggleClass: 'mil-active',
                toggleActions: 'play none none reverse',
            }
        });
    });

    /***************************

    navigation

    ***************************/
    $(".mil-menu-btn").on("click", function () {
        $(this).toggleClass('mil-active');
        $('.mil-navigation').toggleClass('mil-active');
    });

    /***************************

    reviews slider

    ***************************/
    var swiper = new Swiper('.mil-reviews-slider', {
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.mil-reviews-next',
            prevEl: '.mil-reviews-prev',
        },
        pagination: {
            el: '.swiper-reviews-pagination',
            clickable: true,
        },
    });

    /***************************

    portfolio carousel

    ***************************/
    var swiper = new Swiper('.mil-portfolio-carousel', {
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        mousewheel: {
            enable: true
        },
        navigation: {
            nextEl: '.mil-portfolio-next',
            prevEl: '.mil-portfolio-prev',
        },
        pagination: {
            el: '.mil-portfolio-pagination',
            type: 'fraction',
        },
        breakpoints: {
            1200: {
                spaceBetween: 90,
            },
        },
    });

    /***************************

    accordion

    ***************************/

    let groups = gsap.utils.toArray(".mil-accordion-group");
    let menus = gsap.utils.toArray(".mil-accordion-menu");
    let menuToggles = groups.map(createAnimation);

    menus.forEach((menu) => {
        menu.addEventListener("click", () => toggleMenu(menu));
    });

    function toggleMenu(clickedMenu) {
        menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
    }

    function createAnimation(element) {
        let menu = element.querySelector(".mil-accordion-menu");
        let title = element.querySelector(".mil-accordion-menu h6");
        let box = element.querySelector(".mil-accordion-content");
        let minusElement = element.querySelector(".mil-minus");
        let plusElement = element.querySelector(".mil-plus");

        gsap.set(box, {
            height: "auto",
        });

        let animation = gsap
            .timeline()
            .from(box, {
                height: 0,
                duration: 0.5,
                ease: "sine"
            })
            .from(minusElement, {
                duration: 0.2,
                autoAlpha: 0,
                color: '#BCFF00',
                ease: "none",
            }, 0)
            .to(plusElement, {
                duration: 0.2,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .from(title, {
                color: '#fff',
                duration: 0.2,
                ease: "sine",
            }, 0)
            .to(title, {
                duration: 0.2,
                color: '#BCFF00',
                ease: "sine",
            }, 0)
            .reverse();

        return function (clickedMenu) {
            if (clickedMenu === menu) {
                animation.reversed(!animation.reversed());
            } else {
                animation.reverse();
            }
        };
    }

    // init contact form on first page load
    initContactForm();

    /*----------------------------------------------------------
    ------------------------------------------------------------

    REINIT

    ------------------------------------------------------------
    ----------------------------------------------------------*/
    document.addEventListener("swup:contentReplaced", function () {

        $(".mil-navigation , .mil-menu-btn").removeClass('mil-active');

        window.scrollTo({
            top: 0,
        });

        ScrollTrigger.refresh();

        /***************************

        back to top

        ***************************/
        const btt = document.querySelector(".mil-back-to-top .mil-link");

        gsap.set(btt, {
            opacity: .5,
        });

        gsap.to(btt, {
            opacity: 1,
            ease: 'sine',
            scrollTrigger: {
                trigger: "body",
                start: "top -20%",
                end: "top -20%",
                toggleActions: "play none reverse none"
            }
        });
        /***************************

        scroll animations

        ***************************/

        const appearance = document.querySelectorAll(".mil-up");

        appearance.forEach((section) => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 50,
                ease: 'sine',
            }, {
                y: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: section,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const rotate = document.querySelectorAll(".mil-rotate");

        rotate.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                ease: 'sine',
                rotate: 0,

            }, {
                rotate: value,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
        /***************************

        progressbar type 1

        ***************************/

        const progGo = document.querySelectorAll(".mil-circular-progress");

        progGo.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                "--p": '0',
                ease: 'sine',
            }, {
                "--p": value,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        /***************************

        counter

        ***************************/
        const number = $(".mil-counter");
        number.each(function (index, element) {
            var count = $(this),
                zero = {
                    val: 0
                },
                num = count.data("number"),
                split = (num + "").split("."), // to cover for instances of decimals
                decimals = split.length > 1 ? split[1].length : 0;

            gsap.to(zero, {
                val: num,
                duration: 2,
                scrollTrigger: {
                    trigger: element,
                    toggleActions: 'play none none reverse',
                },
                onUpdate: function () {
                    count.text(zero.val.toFixed(decimals));
                }
            });
        });

        /***************************

        progressbars type 2 

        ***************************/
        const width = document.querySelectorAll(".mil-bar");

        width.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                width: 0,
                duration: 5000,
                ease: 'sine',
            }, {
                width: value,
                scrollTrigger: {
                    trigger: section,
                    toggleClass: 'mil-active',
                    toggleActions: 'play none none reverse',
                }
            });
        });

        /***************************

        reviews slider

        ***************************/
        var swiper = new Swiper('.mil-reviews-slider', {
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.mil-reviews-next',
                prevEl: '.mil-reviews-prev',
            },
            pagination: {
                el: '.swiper-reviews-pagination',
                clickable: true,
            },
        });

        /***************************

        portfolio carousel

        ***************************/
        var swiper = new Swiper('.mil-portfolio-carousel', {
            spaceBetween: 90,
            speed: 800,
            parallax: true,
            mousewheel: {
                enable: true
            },
            navigation: {
                nextEl: '.mil-portfolio-next',
                prevEl: '.mil-portfolio-prev',
            },
            pagination: {
                el: '.mil-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

    accordion

    ***************************/

        let groups = gsap.utils.toArray(".mil-accordion-group");
        let menus = gsap.utils.toArray(".mil-accordion-menu");
        let menuToggles = groups.map(createAnimation);

        menus.forEach((menu) => {
            menu.addEventListener("click", () => toggleMenu(menu));
        });

        function toggleMenu(clickedMenu) {
            menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
        }

        function createAnimation(element) {
            let menu = element.querySelector(".mil-accordion-menu");
            let title = element.querySelector(".mil-accordion-menu h6");
            let box = element.querySelector(".mil-accordion-content");
            let minusElement = element.querySelector(".mil-minus");
            let plusElement = element.querySelector(".mil-plus");

            gsap.set(box, {
                height: "auto",
            });

            let animation = gsap
                .timeline()
                .from(box, {
                    height: 0,
                    duration: 0.5,
                    ease: "sine"
                })
                .from(minusElement, {
                    duration: 0.2,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(plusElement, {
                    duration: 0.2,
                    autoAlpha: 0,        
                    ease: "none",
                }, 0)
                .from(title, {
                    duration: 0.2,
                    ease: "sine",
                }, 0)
                .to(title, {
                    duration: 0.2,
                    ease: "sine",
                }, 0)
                .reverse();

            return function (clickedMenu) {
                if (clickedMenu === menu) {
                    animation.reversed(!animation.reversed());
                } else {
                    animation.reverse();
                }
            };
        }

        // re-init contact form after swup replaces content
        initContactForm();

    });

});
