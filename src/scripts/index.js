(function() {
  'use strict';

  /**
   * Determina si está sucediendo la animación del cambio de luces
   */
  var g_changingDayTime = false;
  /**
   * Determina si está sucediendo el cambio de idioma
   */
  var g_changingLanguage = false;
  /**
   * Determina el idioma del sitio web
   */
  var g_language;

  /**
   * Traduce el sitio web
   * @param language 'es'|'en'
   */
  function translate(language) {
    $.getJSON('locales/' + language + '.json', function(data) {
      $('.translate').each(function() {
        $(this).text(data[$(this).attr('data-key')]);
      });

      $('.traducir-placeholder').each(function() {
        $(this).attr('placeholder', data[$(this).attr('data-key')]);
      });

      //Mostrar texto
      TweenLite.to('.translate', 0.5, { opacity: 1 });
    });
  }

  $(document).ready(function() {

    g_language = 'es';

    //Traducir el sitio web
    translate('es');

    /**
     * Iniciar el slider
     */
    new Swiper ('.swiper-container', {
      autoplay: {
        delay: 5000,
      },
      speed: 800,
      loop: true,
      lazy: true,
      effect: 'coverflow',
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });

    /**
     * Ajustar volumen de los audios
     */
    $('audio').prop('volume', '0.1');

    /**
     * Enlaces del navbar
     */
    $('nav a').click(function(e) {
      e.preventDefault();
      var href = $(this).attr('href');

      if(href) {
        TweenLite.to(window, 1, { scrollTo: { y: href, offsetY: 50 }});
        $('#navbar-collapse').collapse('hide');
      }
    });

    /**
     * Botón para apagar/encender las luces
     */
    $('#btn-cambiar-horario').click(function() {
      console.log('click?');
      if(!g_changingDayTime) {

        g_changingDayTime = true;

        //Si es de día, cambiar a noche
        if( $('body').hasClass('day') ) {
          $('.day').removeClass('day').addClass('night');
        }
        //Si es de noche, cambiar a día
        else {
          $('.night').removeClass('night').addClass('day');
        }

        g_changingDayTime = false;

        //Cambiar el estado del botón de cambio de horario
        $(this).toggleClass('active');
      }
    });

    /**
     * Botón para traducir el sitio web
     */
    $('.btn-traductor').click(function() {

      //Cambiar idioma si no se está ejecutando un cambio del mismo
      if(!g_changingLanguage) {

        //Capturar idioma
        var language = $(this).attr('data-idioma');

        //Cambiar idioma si es diferente al idioma actual
        if(language !== g_language) {

          //Declarar el comienzo del cambio de idioma
          g_changingLanguage = true;

          TweenLite.to('.translate', 0.25, { opacity: 0, onComplete: function() {
            translate(language)
          }});

          //Actualizar la variable global de idioma
          g_language = language;

          //Declarar el fin del cambio de idioma
          g_changingLanguage = false;
        }
      }
    });

    /**
     * Hover a los logos en conocimientos
     */
    $('.conocimiento').hover(function() {
        $('#etiqueta').text( $(this).attr('data-etiqueta') );
        TweenLite.to('#etiqueta', 0.5, { opacity: 1 });
      }, function() {
        TweenLite.to('#etiqueta', 0.5, { opacity: 0 })
      }
    );

    /**
     * Reproducir sonidos
     */
    $('#svg-triforce').click(function() {
      $('#botw-secret').get(0).play();
    });

    //Escribir mensaje en consola
    console.log("%c¡Hola! Si deseas ver el código fuente con fines evaluativos o por curiosidad, visita https://github.com/keilermora/keiler-mora", "font-family: 'Arial'; font-size: 16px");
  });
})();
