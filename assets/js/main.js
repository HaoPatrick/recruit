/**
 *
 * Created by hao on 7/5/16.
 */

$(document).ready(function ($) {
    var startTime=new Date().getTime();
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

    // signUPBtn = $('.btn');
    // signUPBtn.on('click', function (event) {
    //     event.preventDefault();
    //     // $('.cd-slider-wrapper').addClass('not-visible');
    //     $('.cd-slider-wrapper').animate({
    //         opacity: 0
    //     }, 1000, function () {
    //         this.remove();
    //         $('.ef-signup-wrapper').removeClass('not-visible');
    //     });
    //     // $('.cd-slider-wrapper').remove();
    //
    // });


//    Sign Up page transition
    var signUP = $('.ef-signup-wrapper');
    var signButton = $('.btn');
    var signClose = $('.ef-close');
    signButton.click(function () {
        signUP.removeClass('not-visible');
        // $('.cd-slider-wrapper').addClass('not-visible');
    });
    signClose.click(function () {
        signUP.addClass('not-visible');
        // $('.cd-slider-wrapper').removeClass('not-visible')
    });
    window.onclick = function () {
        if (event.target == signUP) signUP.addClass('not-visible');
    };


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
        setTimeout(function (ta) {
            ta.addClass('not-visible');
            ta.removeClass('scroll-up');
        }, 300, textarea);
    }

    function scroll_down(textarea) {
        textarea.addClass('scroll-down');
        textarea.removeClass('not-visible');
        setTimeout(function (ta) {
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
    });


//    Form Validation

    // TODO: Short_Phone number can be emoty
    var name = $('#name'),
        stuid = $('#stuid'),
        gender = $('#gender'),
        major = $('#major'),
        phone_number = $('#phone_number'),
        selfintro = $('#selfintro'),
        qscimage = $('#qscimage'),
        depart_imagination = $('#depart_imagination'),
        sharework = $('#sharework'),
        photo = $('#photo');

    $.validate({
        form: '#ef-only-form',
        borderColorOnError: 'rgb(231, 76, 60)',
        onError: function ($form) {
        },
        onSuccess: function ($form) {
            console.log('Validate Successful');
            submitForm();
            alert('提交成功，期待你的优秀表现~ 重复提交会覆盖旧的报名表')
            return false; // Will stop the submission of the form
        }
    });
    // inclination has been declared before.
    // phone_number.change(function (event) {
    //     if (phone_number.val().toString().length < 11) {
    //         this.setCustomValidity('手机号太短了哦~');
    //     } else if (phone_number.val().toString().length > 13) {
    //         this.setCustomValidity('手机号太长了嘛...');
    //     }
    //     else {
    //         this.setCustomValidity('');
    //     }
    // });
    // name.change(function (event) {
    //     if (!name.val().length) this.setCustomValidity('你叫啥名字啊？');
    //     else this.setCustomValidity('');
    // });
    // stuid.change(function (event) {
    //     if (stuid.val().length != 10) this.setCustomValidity('你的学号不太对？');
    //     else this.setCustomValidity('');
    // });
    // major.change(function (event) {
    //     if (major.val().length) this.setCustomValidity('你的专业呢，大类也行');
    //     else this.setCustomValidity('');
    // });
    // selfintro.change(function (event) {
    //     if (selfintro.val().length < 10) this.setCustomValidity('听说自我介绍越长越有机会通过哦');
    //     else  this.setCustomValidity('');
    // });
    // depart_imagination.change(function (event) {
    //     if (depart_imagination.val().length < 10) this.setCustomValidity('第一个问题好像还没有回答');
    //     else this.setCustomValidity('');
    // });
    //
    // qscimage.change(function (event) {
    //     if (qscimage.val().length < 10) this.setCustomValidity('第二个问题还没有写呢');
    //     else this.setCustomValidity('');
    // });
    //
    // sharework.change(function (event) {
    //     if (sharework.val().length) this.setCustomValidity('你的作品还没有填呢');
    //     else this.setCustomValidity('');
    // });
    //
    // photo.change(function (event) {
    //     if (photo.val().length) this.setCustomValidity('据说爆照可以让面试官先认识你~');
    //     else this.setCustomValidity('');
    // });

//    Submit the form
    function submitForm() {
        // event.preventDefault();
        var endTime=new Date().getTime();
        console.log(endTime-startTime);
        $.post("http://recruit.haoxiangpeng.me:8080/api/save/",
            {
                name: name.val(),
                student_id: stuid.val(),
                gender: gender.val(),
                major: major.val(),
                phone_number: phone_number.val(),
                self_intro: selfintro.val(),
                question_one: qscimage.val(),
                question_two: depart_imagination.val(),
                inclination_one: inclination1.val(),
                inclination_two: inclination2.val(),
                share_work: sharework.val(),
                photo: photo.val(),
                user_agent:navigator.userAgent,
                time_spend:endTime-startTime
            })
    }

});

var demo=new Vue({
    el:'#ef-only-form',
    data:{
        input_one:'# 报名表支持Markdown语法\n [Markdown介绍](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)',
        input_two:'',
        input_three:''
    },
    filters:{
        marked:marked
    }
})