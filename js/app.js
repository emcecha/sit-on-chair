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

            var targetSlide = currentSlide + 1;

            if (targetSlide === slides.length) {
                targetSlide = 0;
            }
        }

        if ($(this).hasClass("slider__nav--prev")) {

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

    // --------------- OFFERS - CHOWANIE TEKSTU ----------------

    var offersLinks = $(".offers__link");

    function hideOffersDetails() {

        $(this).find(".offers__details")
        .fadeTo(200, 0);
    }

    function showOffersDetails() {

        $(this).find(".offers__details")
        .fadeTo(200, 1);
    }

    // --------------- KALKULATOR ZAMÓWIENIA ----------------

    var dropdownArrow = $(".calculator__arrow");

    function showHideOptionsList(el) {

        if (this === window) {
            var optionsList = el;
        } else {
            var optionsList = $(this).next();
        }

        if (optionsList.css("display") === "none") {
            optionsList.slideDown("fast");
        } else {
            optionsList.slideUp("fast");
        }
    }

    var choicesArr = [
        {
            id: "type",
            list: [
                {
                    type: "clair",
                    price: 195
                },
                {
                    type: "margarita",
                    price: 299
                },
                {
                    type: "selena",
                    price: 349
                }
            ]
        },
        {
            id: "color",
            list: [
                {
                    color: "czerwony",
                    price: 0
                },
                {
                    color: "czarny",
                    price: 48
                },
                {
                    color: "pomarańczowy",
                    price: 99
                }
            ]
        },
        {
            id: "material",
            list: [
                {
                    material: "tkanina",
                    price: 0
                },
                {
                    material: "skóra",
                    price: 299
                }
            ]
        }
    ];

    var actualChoicesPrices = {
        type: 0,
        color: 0,
        material: 0,
        transport: 0
    }

    var calculatorItems = $(".calculator__item");

    calculatorItems.on("click", function () {

        var choice = this.innerText;

        $(this).parent()
        .prev()
        .prev()
        .text(choice)
        .css({
            color: "#959595"
        });

        var list = $(this).parent();

        showHideOptionsList(list);

        var id = list.data("id");
        addChoice(id,choice)

        var choicePrice = getPrice(id,choice);
        addChoicePrice(id,choicePrice)

        actualChoicesPrices[id] = choicePrice;

        setSumChairPrice()
    });

    var calculatorCheckbox = $(".calculator__checkbox");

    calculatorCheckbox.on("click", function () {

        $(this).toggleClass("active");

        var id = $(this).data("id");
        var choice = "";
        var choicePrice = "";

        actualChoicesPrices[id] = 0;

        if ($(this).hasClass("active")) {

            choice = "Transport";
            choicePrice = 79;
            actualChoicesPrices[id] = 79;
        }

        addChoice(id,choice);
        addChoicePrice(id,choicePrice);
        setSumChairPrice();
    });

    function addChoice(id,choice) {

        $(".calculator__panel-left").find("[data-id=" + id + "]")
        .text(choice);
    }

    function addChoicePrice(id,choicePrice) {

        $(".calculator__panel-right").find("[data-id=" + id + "]")
        .text(choicePrice + " zł");
    }

    function getPrice(id,choice) {

        choice = choice.toLowerCase();

        for (var i = 0; i < choicesArr.length; i++) {

            if (choicesArr[i].id === id) {

                for (var j = 0; j < choicesArr[i].list.length; j++) {

                    if (choicesArr[i].list[j][id] === choice) {

                        var choicePrice = choicesArr[i].list[j].price;
                        return choicePrice;
                    }

                }
            }
        }
    }

    function calculateChairPrice() {

        var chairPrice = 0;

        for (var variable in actualChoicesPrices) {

            if (actualChoicesPrices.hasOwnProperty(variable)) {
                chairPrice += actualChoicesPrices[variable];
            }
        }

        return chairPrice;
    }

    function setSumChairPrice() {

        $(".calculator__sum-value strong")
        .text(calculateChairPrice() + " zł");
    }

    navLinks.on("click", showHideSublist);
    hamburgerButton.on("click", showHideNavOnMobile);
    slides.each(setSlidesPosition);
    navButtons.on("click", moveToSlide);
    offersLinks.on("mouseover", hideOffersDetails);
    offersLinks.on("mouseout", showOffersDetails);
    dropdownArrow.on("click", showHideOptionsList);
});
