(function(utils, evenNav, verge) {

    // check for vibration support in browser
    navigator.vibrate = navigator.vibrate ||
        navigator.webkitVibrate ||
        navigator.mozVibrate ||
        navigator.msVibrate;

    function init() {
        var elems = document.querySelectorAll(".topNav");

        for(var i=0; i<elems.length; i++){
            var el = elems[i];
            el.setAttribute("data-uid", utils.getUID()); // adds a unique id (uid) to the component
            setTodayTitle(el);
            setSubTitle(el);
            setEvenNav(el);
            onTapVibrate(el);
        }
    }


    // Changes the upper case characters of '.topNav-subTitle' to pascal case
    function setSubTitle(el) {
        var subTitleEl = el.querySelector(".topNav-subTitle");
        subTitleEl.innerText = utils.toPascalCase(subTitleEl.innerText, ["has", "offices", "in", "and"], ["LEVO", "NSW", "VIC"]);
    }


    // Replaces '--WEEK_DAY_NAME--' and '--MONTH_NAME--' with dynamic contents in element '.topNav-title'
    function setTodayTitle(el) {
        var titleEl = el.querySelector(".topNav-title");
        titleEl.innerText = titleEl.innerText.replace("--WEEK_DAY_NAME--", utils.getWeekDay())
            .replace("--MONTH_NAME--", utils.getMonthName());
    }


    // gets the window viewport width if its a mobile device
    function isMobileVP() {
        return verge.viewportW() < 768 ;
    }


    // gets the window viewport width if its a tablet device
    function isTabletVP(){
        return verge.viewportW() >= 768 && verge.viewportW() < 992;
    }


    // set the library 'EvenNav', which evenly sizes navigation elements horizontally
    function setEvenNav(el) {
        
        evenNav.init(el, {
            condition: !isMobileVP() // ignores mobile
        });

        // needs a resize handler so it can clear mobile styles and recalculate when window is resized
        window.addEventListener("resize", function() {
            var isMb = isMobileVP();

            evenNav.clearClasses(el, !isMb);
            if(!isMb) evenNav.resize(el, !isMb);
        });
    }

    // add vibrate to every button if available
    function onTapVibrate(el) {
        var buttons = el.querySelectorAll(".nav-btn");

        function vibrateDevice(){
            if (navigator.vibrate) {
                console.log('vibration supported');
                navigator.vibrate(500);
            }
            else {
                console.log('vibration not supported');
            }
        }
        for(var i=0; i<buttons.length; i++){
            buttons[i].addEventListener("touchstart", vibrateDevice);
        }
    }


    init();

// "app/Global/js/Utils.js", "./node_modules/verge/verge.js", "./libs/evennav/evennav.js"
})(window.utils, window.evenNav, window.verge); // adds libraries and utils