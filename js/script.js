/* SLICK-SLIDER options*/
$(document).ready(function() { // чтобы скрипт загружался только после того как верстка будет построена как документ
    $('.carousel__inner').slick({ // my class
        infinite: true,  // настройки (https://kenwheeler.github.io/slick/)
        speed: 1200,     // настройки (https://kenwheeler.github.io/slick/)
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>', // настройка стрелочек,путь до иконки стрелочки. Классы заранее сформированны в скачанных файлах slick.css и slick.min.js с сайта https://kenwheeler.github.io/slick/
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>', // настройка стрелочек,путь до иконки стрелочки. Классы заранее сформированны в скачанных файлах slick.css и slick.min.js с сайта https://kenwheeler.github.io/slick/
        responsive: [
            {
                breakpoint: 992,  // настройки на breakpoint's
                settings: {
                    dots: false, 
                    arrows: false,
                    swipe: true,
                    adaptiveHeight: true
                }
            }
        ]
    });

    /* подключаем tabs */
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() { /* вставляем название своих классов (catalog__tabs и catalog__tab_active) */
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active') /* вставляем название своих классов (catalog__tab_active) без точек */
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active'); /* вставляем название своих классов (catalog__content и catalog__content_active) без точек */
    });

    /* скрипт для переключения кнопки "подробнее" в catalog-item__content */
    /* ПОДРОБНЫЙ ВАРИАНТ */
/*     $('.catalog-item__link').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();   // отмена стандартного поведения браузера
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    })

    $('.catalog-item__back').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();  // отмена стандартного поведения браузера
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    }); */

    /* ЛАКОНИЧНЫЙ ВАРИАНТ */
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();  // отмена стандартного поведения браузера
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal
    $('[data-modal=consultation]').on('click', function() {  /* consultation */
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');  /* закрытие всех модальных окон */
    });

    $('.button_mini').each(function(i) {  /* кнопка купить */
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text()); /* замена текста после строчки "Ваш заказ:"(выбор пульсометра который выбран) */
            $('.overlay, #order').fadeIn('slow');
        });
    });

    /* Validation */
    function validateForms(form){
        $(form).validate({
            rules: {                      /* настройки валидации */
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {                  /* настройка сообщений которые выводятся при валидации */
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("{0} минимальное число символов!")
                },
                phone: "Пожалуйста, введите свой номер телефон",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес электронной почты"
                }
              }
        });
    };

    validateForms('#consultation-form');
    validateForms('#order form');
    validateForms('#consultation form');

    $('input[name=phone]').mask("+7(999) 999-99-99");

    // отправка писем с сайта
    $('form').submit(function(e) {     // обращаемся ко всем формам. (e) - event
        e.preventDefault();            // отмена стандартного поведения браузера
        $.ajax({
            type: "POST",              // POST - данные отправить
            url: "mailer/smart.php",   // кто будет отправлять
            data: $(this).serialize()  // какие данные
        }).done(function() {                 // действие после выполнения операции (отправка POST)
            $(this).find("input").val("");   // отчищаем строки в input (имя, телефон, почта)

            $('#consultation, #order').fadeOut();  // закрытие модальных окон после отправки письма
            $('.overlay, #thanks').fadeIn('slow'); // появление окошка благодарности за заказ

            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and pageup
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // Скрипт для плавного скрола
    // $("a[href=#up]").click(function() {
    //     const _href = $(this).attr("href");
    //     $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    //     return false;
    // });

    new WOW().init();  // подключаем wow.js для animate.css
});

// /* TINY-SLIDER */
// const slider = tns({
//     container: '.carousel__inner',
//     items: 1,
//     slideBy: 'page',
//     autoplay: false,
//     controls: false,
//     nav: false
// });

// // создаем метод для того чтобы добавить действие на нажатие 'prev', 'next' в tiny-slider
// document.querySelector('.prev').addEventListener('click', function () {
//     slider.goTo('prev');
// });

// document.querySelector('.next').addEventListener('click', function () {
//     slider.goTo('next');
// });
