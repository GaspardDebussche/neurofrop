$(document).ready(function () {
    var doc = window.document;

    function loopScroll(loopClass, clone) {
        var context = doc.querySelector(loopClass),
            clones = context.querySelectorAll(clone),
            disableScroll = false,
            scrollHeight = 0,
            scrollPos = 0,
            clonesHeight = 0,
            i = 0;

        function getScrollPos() {
            return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
        }

        function setScrollPos(pos) {
            context.scrollTop = pos;
        }

        function getClonesHeight() {
            clonesHeight = 0;

            for (i = 0; i < clones.length; i += 1) {
                clonesHeight = clonesHeight + clones[i].offsetHeight;
            }

            return clonesHeight;
        }

        function reCalc() {
            scrollPos = getScrollPos();
            scrollHeight = context.scrollHeight;
            clonesHeight = getClonesHeight();

            if (scrollPos <= 0) {
                setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
            }
        }

        function scrollUpdate() {
            if (!disableScroll) {
                scrollPos = getScrollPos();

                if (clonesHeight + scrollPos >= scrollHeight) {
                    // Scroll to the top when you’ve reached the bottom
                    setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
                    disableScroll = true;
                } else if (scrollPos <= 0) {
                    // Scroll to the bottom when you reach the top
                    setScrollPos(scrollHeight - clonesHeight);
                    disableScroll = true;
                }
            }

            if (disableScroll) {
                // Disable scroll-jumping for a short time to avoid flickering
                window.setTimeout(function () {
                    disableScroll = false;
                }, 40);
            }
        }

        function init() {
            reCalc();

            context.addEventListener('scroll', function () {
                window.requestAnimationFrame(scrollUpdate);
            }, false);

            window.addEventListener('resize', function () {
                window.requestAnimationFrame(reCalc);
            }, false);
        }

        if (document.readyState !== 'loading') {
            init()
        } else {
            doc.addEventListener('DOMContentLoaded', init, false)
        }
    }

    loopScroll('#js-loop-miniatures', '.is-clone-miniatures');
    // loopScroll('#js-loop-desc', '.is-clone-desc');

    const memberNames = ['aline', 'antoine', 'fahd', 'gaspard', 'hajar', 'lucas', 'marine', 'marvin', 'melodie', 'nina', 'pauline', 'pierre', 'romain',
        'aline-clone', 'antoine-clone', 'fahd-clone', 'gaspard-clone', 'hajar-clone', 'lucas-clone', 'marine-clone', 'marvin-clone', 'melodie-clone', 'nina-clone', 'pauline-clone', 'pierre-clone', 'romain-clone'];

    var controller = new ScrollMagic.Controller();


    for (let i = 0; i < memberNames.length; i++) {


        var height_desc = document.getElementById(memberNames[i].split('-')[0] + "-desc").offsetHeight;
        var height_pix = document.getElementById(memberNames[i].split('-')[0] + "-pix").offsetHeight;

        if (i < 13) {


            $("#" + memberNames[i] + "-desc").css('margin-top', (window.innerHeight - height_desc) / 2 + 10);
            $("#" + memberNames[i] + "-desc").css('margin-bottom', (window.innerHeight - height_desc) / 2 + 10);

            var tween = TweenMax.fromTo(document.getElementById(memberNames[i] + "-pix"), 2.5, {y: -height_pix - 10}, {
                ease: SlowMo.ease.config(0.1, 0.7, false),
                y: window.innerHeight + 10
            });
            new ScrollMagic.Scene({
                triggerElement: "#" + memberNames[i] + "-desc",
                duration: window.innerHeight,
                offset: -(window.innerHeight - height_desc) / 2
            })
                .setTween(tween)
                // .addIndicators()
                .addTo(controller);

            document.getElementById(memberNames[i]).onclick = () => TweenMax.to($("#js-loop-desc"), 1, {
                scrollTo: {
                    y: "#" + memberNames[i].split('-')[0] + "-desc",
                    offsetY: (memberNames[i].split('-')[0] == 'romain') ? 0 : (window.innerHeight - height_desc) / 2,
                    autoKill: false
                }
            });

        } else {
            document.getElementById(memberNames[i]).onclick = () => TweenMax.to($("#js-loop-desc"), 1, {
                scrollTo: {
                    y: "#" + memberNames[i].split('-')[0] + "-desc",
                    offsetY: (memberNames[i].split('-')[0] == 'romain') ? 0 : (window.innerHeight - height_desc) / 2,
                    autoKill: false
                }
            });

        }
    }
});