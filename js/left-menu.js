$(document).ready(function(){
    function radialMenu() {
        $('.radial-nav').on('click', function(evt){
            evt.stopPropagation();
            $('.nav, .item').removeClass('active');
            $(this).find('li').removeClass('selected');
            $('.content').removeClass('open');
            $(this).toggleClass('expanded');
        });

        $('.radial-nav li').not('.menu').click(function(evt){
            evt.stopPropagation();
            $('.radial-nav').removeClass('expanded');
            $(this).addClass('selected');
            $('.nav').addClass('active');
            $('.content').addClass('open');
            getContent(this);
        });

        function getContent(elem){
            $('#'+$(elem).attr('data-content')).addClass('active');
        }
    }
    radialMenu();
});