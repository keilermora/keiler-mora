/**
 * Determina si está sucediendo la animación del cambio de luces
 */
var g_cambiandoHorario = false;
/**
 * Determina si está sucediendo el cambio de idioma
 */
var g_cambiandoIdioma = false;
/**
 * Determina el idioma del sitio web
 */
var g_idioma;

/**
 * Función que muestra al usuario algún mensaje arrojado por el sitio web,
 * el idioma dependerá del seleccionado en el sitio web.
 * Los mensajes están escritos en los archivos json dentro de la carpeta locales/,
 * al menos que sea un error inesperado.
 * @function mostrarMensaje
 * @param {string} mensaje - Mensaje que mostrará el toast
 * @param {string} [clase] - Clase que tendrá el toast mostrado
 */
function mostrarMensaje(mensaje, clase) {
  if (!clase) {
    clase = '';
  }
  else {
    $('.alert').removeClass('alert-danger')
     .removeClass('alert-success')
     .addClass(clase);
  }

  //Cargar JSON del idioma y traducir el mensaje
  $.getJSON('locales/' + g_idioma + '.json', function(data) {
    if (data[mensaje] !== undefined) {
      $('.alert').text(data[mensaje]);
    }
    else {
      $('.alert').text(mensaje);
    }

    //Mostrar el Toast
    TweenLite.to('.alert', 0.25, { opacity: 1, onComplete: function() {
      setTimeout(function() {
          //Ocultar el Toast
          TweenLite.to('.alert', 0.25, { opacity: 0 });
        }, 3000);
    }});
  });
}

$(document).ready(function() {

  //Detectar idioma
  g_idioma = $('#idiomas-dropdown').text() == 'Idioma' ? 'es' : 'en';

  /**
   * Iniciar el slider
   */
  var mySwiper = new Swiper ('.swiper-container', {
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

    if(href !== undefined) {
      TweenLite.to(window, 1, {scrollTo: href });
    }
  });

  /**
   * Botón para apagar/encender las luces
   */
  $('#btn-cambiar-horario').click(function() {
    if(!g_cambiandoHorario) {

      g_cambiandoHorario = true;

      //Si es de día, cambiar a noche
      if( $('body').hasClass('dia') ) {
        $('.dia').removeClass('dia').addClass('noche');

        //Ocultar nubes
        TweenLite.to('#particles-nubes', 1.5, { opacity: 0 });

        //Mostrar estrellas
        TweenLite.to('#particles-estrellas', 1.5, { opacity: 1 });
      }
      //Si es de noche, cambiar a día
      else {
        $('.noche').removeClass('noche').addClass('dia');

        //Mostrar nubes
        TweenLite.to('#particles-nubes', 1.5, { opacity: 1 });

        //Ocultar estrellas
        TweenLite.to('#particles-estrellas', 1.5, { opacity: 0 });
      }

      g_cambiandoHorario = false;

      //Cambiar el estado del botón de cambio de horario
      $(this).toggleClass('active');
    }
  });

  /**
   * Botón para traducir el sitio web
   */
  $('.btn-traductor').click(function() {

    //Cambiar idioma si no se está ejecutando un cambio del mismo
    if(!g_cambiandoIdioma) {

      //Capturar idioma
      var idioma = $(this).attr('data-idioma');

      //Cambiar idioma si es diferente al idioma actual
      if(idioma != g_idioma) {

        //Declarar el comienzo del cambio de idioma
        g_cambiandoIdioma = true;
        
        TweenLite.to('.traducir', 0.25, { opacity: 0, onComplete: function() {

          //Traducir el sitio web
          $.getJSON('locales/' + idioma + '.json', function(data) {
            $('.traducir').each(function() {
              $(this).text(data[$(this).attr('data-key')]);
            });

            $('.traducir-placeholder').each(function() {
              $(this).attr('placeholder', data[$(this).attr('data-key')]);
            });

            //Mostrar texto
            TweenLite.to('.traducir', 0.5, { opacity: 1 });
          });
        }});

        //Actualizar la variable global de idioma
        g_idioma = idioma;

        //Declarar el fin del cambio de idioma
        g_cambiandoIdioma = false;
      }
    }
  });

  /**
   * Hover a los logos en conocimientos
   */
  $('.conocimiento').hover(
    function() {
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

  /**
   * Botón submit para el formulario de contacto
   */
  $('#form-contacto').submit(function(e) {
    e.preventDefault();

    var nombre  = $('#nombre').val(),
        correo  = $('#correo').val(),
        mensaje = $('#mensaje').val(),
        cc      = $('#cc').prop('checked');

    if( nombre == '' || correo == '' || mensaje == '' ) {
      mostrarMensaje('error-campos-vacios', 'alert-danger');
    }
    else if( !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(correo) ) {
      mostrarMensaje('error-correo-invalido', 'alert-danger');
    }
    else {
      //Almacenar el texto actual del botón, debido al cambio de idioma
      var btnTexto = $('#btn-enviar').text();
      //Cambiar el texto del botón por un spinner animado
      $('#btn-enviar')
        .html('<i class="fa fa-spin fa-refresh" aria-hidden="true"></i>')
        .prop('disabled', true);

      $.ajax({
        url: 'functions/enviar_correo.php',
        data: {
          nombre: nombre,
          correo: correo,
          mensaje: mensaje,
          cc: cc,
          idioma: g_idioma
        },
        type: 'POST',
        success: function(data) {

          //Recuperar texto del botón
          $('#btn-enviar').html(btnTexto).prop('disabled', false);

          try {
            var respuesta = JSON.parse(data);

            switch(respuesta.estado) {
              case 'correcto':

                TweenLite.to(window, 1, {scrollTo: '#section-inicio' });
                $('#form-contacto').trigger('reset');
                mostrarMensaje(respuesta.descripcion, 'alert-success');

              break;
              case 'error':
              default:
                mostrarMensaje('error-inesperado', 'alert-danger');
                console.log(respuesta.descripcion);
              break;
            }
          }
          catch (e) {
            mostrarMensaje('error-inesperado', 'alert-danger');
            console.log(data);
          }
        }
      });
    }
  });

  //Escribir mensaje en consola
  console.log("%c¡Hola! Te estaba esperando. Si deseas ver el código fuente con fines evaluativos o simple curiosidad, visita https://github.com/keilermora/keiler-mora-v2", "font-family: 'Arial'; font-size: 16px");
});