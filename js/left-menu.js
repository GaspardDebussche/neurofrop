$(document).ready(function(){
    function radialMenu() {
        $('.radial-nav').click(function(evt) {
            evt.stopPropagation();
            function subMenu(radial, menu) {
                var overlay_navigation = $('.overlay-navigation-' + menu),
                    top_bar = $('.bar-top'),
                    middle_bar = $('.bar-middle'),
                    bottom_bar = $('.bar-bottom');

                if (radial) {
                    overlay_navigation.toggleClass('overlay-active');
                }
                if (overlay_navigation.hasClass('overlay-active')) {
                    return overlay_navigation.velocity('transition.slideLeftIn', {
                        duration: 300,
                        delay: 0,
                        begin: function() {
                            $('#' + menu + ' ul li').velocity('transition.perspectiveLeftIn', {
                                stagger: 150,
                                delay: 0,
                                complete: function() {
                                    $('#' + menu + ' ul li a').velocity({
                                        opacity: [1, 0],
                                    }, {
                                        delay: 10,
                                        duration: 140
                                    });
                                }
                            })
                        }
                    })

                } else {
                    return $('#' + menu + ' ul li').velocity('transition.perspectiveRightOut', {
                        stagger: 0,
                        delay: 0,
                        complete: function() {
                            overlay_navigation.velocity('transition.fadeOut', {
                                delay: 0,
                                duration: 0,
                                complete: function() {
                                    $('#' + menu + ' ul li a').velocity({
                                        opacity: [0, 1],
                                    }, {
                                        delay: 0,
                                        duration: 0
                                    });
                                }
                            });
                        }
                    })
                }
            }

            if (!Array.from($('.radial-nav li')).every(li => !$(li).hasClass('selected'))) {
                $.when(
                    $('.overlay-navigation-team-menu').removeClass('overlay-active'),
                    $('.overlay-navigation-project-menu').removeClass('overlay-active'),
                    $('.overlay-navigation-wet-lab-menu').removeClass('overlay-active'),
                    $('.overlay-navigation-dry-lab-menu').removeClass('overlay-active'),
                    $('.overlay-navigation-results-menu').removeClass('overlay-active'),
                    $('.overlay-navigation-parts-menu').removeClass('overlay-active'),
                    $('.overlay-navigation-human-practices-menu').removeClass('overlay-active'),
                    $('.overlay-navigation-awards-menu').removeClass('overlay-active'),
                    subMenu(false, 'team-menu'),
                    subMenu(false, 'project-menu'),
                    subMenu(false, 'wet-lab-menu'),
                    subMenu(false, 'dry-lab-menu'),
                    subMenu(false, 'results-menu'),
                    subMenu(false, 'parts-menu'),
                    subMenu(false, 'human-practices-menu'),
                    subMenu(false, 'awards-menu')
                ).done(function () {
                    $('.nav, .item').removeClass('active');
                    $('.radial-nav').find('li').removeClass('selected');
                    $('.content').removeClass('open');
                    $('.radial-nav').toggleClass('expanded');
                });
            } else {
                $('.nav, .item').removeClass('active');
                $('.radial-nav').find('li').removeClass('selected');
                $('.content').removeClass('open');
                $('.radial-nav').toggleClass('expanded');
            }

                $('.radial-nav li').not('.menu').click(function (evt) {
                    evt.stopPropagation();
                    if (!$(this).hasClass('selected')) {
                        $('.radial-nav').removeClass('expanded');
                        $(this).addClass('selected');
                        $('.nav').addClass('active');
                        $('.content').addClass('open');
                        getContent(this);
                        subMenu(true, $(this).attr('data-content') + '-menu');
                    }
                });

                function getContent(elem) {
                    $('#' + $(elem).attr('data-content')).addClass('active');
                }
            })
        }

    radialMenu();

});