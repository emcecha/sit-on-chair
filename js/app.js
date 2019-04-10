$(function () {

    // --------------- HAMBURGER MENU -------------------

    var hamburgerButton = $(".header__button");
    var navList = $(".nav__list");
    var sublists = $(".nav__sublist");

    function showHideNavOnMobile() {

        if (navList.css("display") === "none") {

            hamburgerButton.find("i")
            .removeClass("fa-bars")
            .addClass("fa-times");

            navList.slideDown("fast");

        } else {

            sublists.each(function () {

                if ($(this).css("display") === "block") {
                    $(this).slideUp("fast");
                }
            });

            hamburgerButton.find("i")
            .removeClass("fa-times")
            .addClass("fa-bars");

            navList.slideUp("fast");

        }
    }

    // ---------- POKAZANIE / UKRYCIE PODLISTY W MENU -------------

    var navLinks = $(".nav__link");

    function showHideSublist() {

        var sublist = $(this).next(".nav__sublist");

        if (sublist.length === 0) {
            return;
        }

        if (sublist.css("display") === "none") {
            sublist.slideDown("fast");
        } else {
            sublist.slideUp("fast");
        }
    }

    // --------------- OBSŁUGA SLIDERA -------------------

    var currentSlide = 0;

    var slider = $(".slider");
    var track = slider.find(".slider__track");
    var slides = slider.find(".slider__slide");
    var navButtons = slider.find(".slider__nav");

    function setSlidesPosition(index) {

        $(this).css({
            left: 100 * index + "%"
        });
    }

    function moveToSlide() {

        if ($(this).hasClass("slider__nav--next")) {

            console.log(1);

            var targetSlide = currentSlide + 1;

            if (targetSlide === slides.length) {
                targetSlide = 0;
            }
        }

        if ($(this).hasClass("slider__nav--prev")) {

            console.log(2);

            var targetSlide = currentSlide - 1;

            if (targetSlide < 0) {
                targetSlide = slides.length - 1;
            }
        }

        var amountToMove = slides.eq(targetSlide).css("left");
        track.css({
            transform: "translateX(-" + amountToMove + ")"
        });
        currentSlide = targetSlide;
    }

    navLinks.on("click", showHideSublist);
    hamburgerButton.on("click", showHideNavOnMobile);
    slides.each(setSlidesPosition);
    navButtons.on("click", moveToSlide);
});
