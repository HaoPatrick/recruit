/**
 *
 * Created by hao on 7/5/16.
 */

$(document).ready(function ($) {
    var sliderContainers = $('.cd-slider-wrapper');

    if (sliderContainers.length > 0) initBlockSlider(sliderContainers);

    function initBlockSlider(sliderContainers) {
        sliderContainers.each(function () {
            var sliderContainer = $(this),
                slides = sliderContainer.children('.cd-slider').children('li'),
                sliderPagination = createSliderPagination(sliderContainer);

            sliderPagination.on('click', function (event) {
                event.preventDefault();
                var selected = $(this),
                    index = selected.index();
                updateSlider(index, sliderPagination, slides);
            });

            sliderContainer.on('swipeleft', function () {
                var bool = enableSwipe(sliderContainer),
                    visibleSlide = sliderContainer.find('.is-visible').last(),
                    visibleSlideIndex = visibleSlide.index();
                if (!visibleSlide.is(':last-child') && bool) {
                    updateSlider(visibleSlideIndex + 1, sliderPagination, slides);
                }
            });

            sliderContainer.on('swiperight', function () {
                var bool = enableSwipe(sliderContainer),
                    visibleSlide = sliderContainer.find('.is-visible').last(),
                    visibleSlideIndex = visibleSlide.index();
                if (!visibleSlide.is(':first-child') && bool) {
                    updateSlider(visibleSlideIndex - 1, sliderPagination, slides);
                }
            });
        });
    }

    function createSliderPagination(container) {
        var wrapper = $('<ol class="cd-slider-navigation"></ol>');
        var totalNum = container.children('.cd-slider').find('li').length;
        container.children('.cd-slider').find('li').each(function (index) {
            var dotWrapper, dot;
            if (index == 0) {
                dotWrapper = $('<li class="selected"></li>');
            } else if (index == totalNum - 1) {
                dotWrapper = $('<li class="about"></li>')
            }
            else {
                dotWrapper = $('<li></li>');
            }
            dot = $('<a href="#0"></a>').appendTo(dotWrapper);
            dotWrapper.appendTo(wrapper);
            var dotText = (index + 1 < 10) ? '0' + (index + 1) : index + 1;
            dot.text(dotText);
        });
        wrapper.appendTo(container);
        return wrapper.children('li');
    }

    function updateSlider(n, navigation, slides) {
        navigation.removeClass('selected').eq(n).addClass('selected');
        slides.eq(n).addClass('is-visible').removeClass('covered').prevAll('li').addClass('is-visible' +
            ' covered').end().nextAll('li').removeClass('is-visible covered');
        navigation.parent('ul').addClass('slider-animating').on('webkitTransitionEnd ' +
            'otransitionend oTransitionEnd transitionend', function () {
            $(this).removeClass('slider-animating');
        });
    }

    function enableSwipe(container) {
        return (container.parents('.touch').length > 0);
    }

    signUPBtn = $('.btn');
    signUPBtn.on('click', function (event) {
        event.preventDefault();
        // $('.cd-slider-wrapper').addClass('not-visible');
        $('.cd-slider-wrapper').animate({
            opacity: 0
        }, 1000, function () {
            this.remove();
            $('.ef-signup-wrapper').removeClass('not-visible');
        });
        // $('.cd-slider-wrapper').remove();

    });


//    Control the background music

    var bgm = document.getElementById('cd-bgm');
    var isPlaying = false;
    var stopButton = $('.stop-music');
    stopButton.on('click', function (event) {
        event.preventDefault();
        if (isPlaying) {
            bgm.pause();
            stopButton.css({"background": "url(../../images/play.svg)"});
        } else {
            bgm.play();
            stopButton.css({"background": "url(../../images/stop.svg)"});
        }
        isPlaying = !isPlaying;
    });


//    Different Questions from different department.
    var totalQuestions = {
        技术研发中心: 'question for tech',
        设计与创意中心: 'question for design',
        产品运营部门: 'question for PM',
        人力资源部门: 'question for HR',
        水朝夕工作室: 'question for tide',
        新闻资讯中心: 'question for news',
        摄影部: 'question for photograph',
        视频团队摄像与剪辑: 'question for QSC video',
        视频团队主持人: 'question for QSC host',
        推广策划中心: 'question for promotion'
    };
    // TODO: Refactor this part of code.
    // TODO: Add animation to the transition.
    var inclination1 = $('#inclination1'), inclination2 = $('#inclination2');
    var question1 = $('#ef-question1'), question2 = $('#ef-question2');

    // NOTICE: these 2 functions below also change the 'not-visible' class
    function scroll_up(textarea) {
        textarea.addClass('scroll-up');
        setTimeout(function(ta) {
            ta.addClass('not-visible');
            ta.removeClass('scroll-up');
        }, 300, textarea);
    }

    function scroll_down(textarea) {
        textarea.addClass('scroll-down');
        textarea.removeClass('not-visible');
        setTimeout(function(ta) {
            ta.removeClass('scroll-down');
        }, 300, textarea);
    }

    inclination1.change(function () {
        if (inclination1.val() == '快选一个吧') {
            if (!question1.hasClass('not-visible')) {
                scroll_up(question1);
            }
            return;
        }
        if (question1.hasClass('not-visible')) {
            scroll_down(question1);
        }
        document.getElementById('ef-question1-content').innerHTML = totalQuestions[inclination1.val()];
    });

    inclination2.change(function () {
        if (inclination2.val() == '快选一个吧') {
            if (!question2.hasClass('not-visible')) {
                scroll_up(question2);
            }
            return;
        }
        if (question2.hasClass('not-visible')) {
            scroll_down(question2);
        }
        document.getElementById('ef-question2-content').innerHTML = totalQuestions[inclination2.val()];
    })
});