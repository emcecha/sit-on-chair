$(function () {

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

    navLinks.on("click", showHideSublist);
    hamburgerButton.on("click", showHideNavOnMobile);
});
