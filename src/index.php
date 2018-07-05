<?php
  /**
   * Detectar el idioma del navegador
   */
  $idioma_navegador = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
  /**
   * Establecer el idioma del sitio web
   */
  $idioma = $idioma_navegador == 'en' ? 'en' : 'es';
  /**
   * Cargar el archivo json con el idioma
   */
  $json = file_get_contents('locales/'.$idioma.'.json');

  /**
   * Descifrar el json y guardarlo en un arreglo
   * @var $t[] Traductor
   */
  $t = json_decode($json, true);

  /**
   * Detectar la hora del servidor. Si la hora se encuentra entre las 06:00pm y las 06:00am,
   * algunos elementos serán afectados con la clase 'apagada', cambiando así su apariencia.
   * @var $h Horario
   */
  $hora_servidor = getdate()['hours'];
  if($hora_servidor >=6 && $hora_servidor <= 18) {
    $h = 'dia';
  }
  else {
    $h = 'noche';
  }
?>

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no">
    <title>Keiler Mora: Desarrollador Web</title>

    <!-- Fuentes -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merienda+One|Ubuntu">

    <!-- build:css styles/bootstrap.min.css -->
    <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css">
    <!-- /build -->
    <!-- build:css styles/font-awesome.min.css -->
    <link rel="stylesheet" href="../node_modules/font-awesome/css/font-awesome.min.css">
    <!-- /build -->
    <!-- build:css styles/swiper.min.css -->
    <link rel="stylesheet" href="../node_modules/swiper/dist/css/swiper.min.css">
    <!-- /build -->
    <link rel="stylesheet" href="styles/style.css">
  </head>
  <body class="<?php echo $h ?>" data-spy="scroll" data-target=".navbar" data-offset="300">
    <!-- Google analytics -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-104412278-2', 'auto');
      ga('send', 'pageview');
    </script>
    
    <!-- Navbar -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>

        <div id="navbar-collapse" class="collapse navbar-collapse">

          <!-- Botones de navegación -->
          <ul class="nav navbar-nav">
            <li><a class="traducir" href="#section-inicio" data-key="acerca-de-mi"><?php echo $t['acerca-de-mi'] ?></a></li>
            <li><a class="traducir" href="#section-conocimientos" data-key="conocimientos"><?php echo $t['conocimientos'] ?></a></li>
            <li><a class="traducir" href="#section-portafolios" data-key="portafolios"><?php echo $t['portafolios'] ?></a></li>
            <li><a class="traducir" href="#section-contacto" data-key="contacto"><?php echo $t['contacto'] ?></a></li>
          </ul>
          
          <!-- Botones adicionales a la derecha del navbar -->
          <ul class="nav navbar-nav navbar-right hidden-xs">

            <!-- Botón para cambiar idioma -->
            <li class="dropdown">
              <a id="idiomas-dropdown" class="dropdown-toggle traducir" data-key="idioma" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><?php echo $t['idioma'] ?></a>
              <ul class="dropdown-menu">
                <li><a class="btn-traductor" data-idioma="en">EN</a></li>
                <li><a class="btn-traductor" data-idioma="es">ES</a></li>
              </ul>
            </li>

            <!-- Botón para encender/apagar las luces -->
            <li>
              <?php if ($h == 'dia'): ?>
              <a id="btn-cambiar-horario" class="nav-link active">
              <?php else: ?>
              <a id="btn-cambiar-horario" class="nav-link">
              <?php endif ?>
              <i class="nav-i fa fa-lightbulb-o" aria-hidden="true"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenedor principal del sitio web -->
    <main>

      <!-- Sección inicio -->
      <section id="section-inicio">
      	<div class="container">
          <div class="row">

            <!-- Imagen de perfil -->
            <div class="col-xs-* col-md-3">
              <img class="img-responsive center-block" width="200" src="images/keilermora.jpg">
            </div>

            <!-- Decripción acerca de mi -->
            <div class="col-xs-* col-md-9">
              <h1 class="text-center <?php echo $h ?>">Keiler Mora</h1>
              <div id="acerca-de-mi" class="<?php echo $h ?>">
                <p class="traducir" data-key="descripcion-acerca-de-mi">
                  <?php echo $t['descripcion-acerca-de-mi'] ?>
                </p>
                <?php include_once('images/triforce.svg') ?>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección conocimientos -->
      <section id="section-conocimientos">

        <!-- Título de la sección conocimientos -->
        <h1 class="text-center traducir <?php echo $h ?>" data-key="conocimientos"><?php echo $t['conocimientos'] ?></h1>

        <!-- Logos que representan los conocimientos -->
        <div class="conocimientos-logos-container text-center">
          <?php echo file_get_contents('images/angular.svg') ?>
          <?php echo file_get_contents('images/bootstrap.svg') ?>
          <?php include_once('images/css3.svg') ?>
          <?php echo file_get_contents('images/git.svg') ?>
          <?php echo file_get_contents('images/gulp.svg') ?>
          <?php echo file_get_contents('images/html5.svg') ?>
          <?php echo file_get_contents('images/javascript.svg') ?>
          <?php include_once('images/jquery.svg') ?>
          <?php echo file_get_contents('images/json.svg') ?>
          <?php echo file_get_contents('images/materializecss.svg') ?>
        </div>

        <!-- Texto de detalles de los conocimientos -->
        <div id="conocimientos-detalles" class="<?php echo $h ?> container-fluid text-center hidden-xs">
          <span id="etiqueta"></span>
        </div>

        <!-- Más logos que representan los conocimientos -->
        <div class="conocimientos-logos-container text-center">
          <?php include_once('images/mongodb.svg') ?>
          <?php echo file_get_contents('images/mysql.svg') ?>
          <?php include_once('images/nodejs.svg') ?>
          <?php echo file_get_contents('images/php.svg') ?>
          <?php echo file_get_contents('images/python.svg') ?>
          <?php echo file_get_contents('images/react.svg') ?>
          <?php echo file_get_contents('images/redux.svg') ?>
          <?php echo file_get_contents('images/ruby.svg') ?>
          <?php include_once('images/sass.svg') ?>
          <?php include_once('images/wordpress.svg') ?>
        </div>
      </section>

      <!-- Sección portafolios -->
      <section id="section-portafolios">

        <!-- Título de la sección portafolios -->
        <h1 class="text-center traducir <?php echo $h ?>" data-key="portafolios"><?php echo $t['portafolios'] ?></h1>

        <!-- Slider con los trabajos más destacados -->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide">
              <div class="container">
                <div class="row">
                  <div class="col-xs-12 col-sm-4 col-md-5 col-lg-6 portafolio-imagen">
                    <img class="img-responsive center-block" src="images/aliciatorres.png">
                  </div>
                  <div class="col-xs-12 col-sm-8 col-md-7 col-lg-6 portafolio-detalles text-center <?php echo $h ?>">
                    <div>
                      <span class="portafolio-titulo">Libros Favoritos de Alicia</span><br>
                      <small><a class="portafolio-enlace" href="http://aliciatorres.dualemento.com" target="_blank">aliciatorres.com</a></small>
                      <div class="portafolio-descripcion">
                        <p class="hidden-xs hidden-sm traducir" data-key="aerohome.com">
                          <?php echo $t['aliciatorres.com'] ?>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="container">
                <div class="row">
                  <div class="col-xs-12 col-sm-4 col-md-5 col-lg-6 portafolio-imagen">
                    <img class="img-responsive center-block" src="images/dualemento.png">
                  </div>
                  <div class="col-xs-12 col-sm-8 col-md-7 col-lg-6 portafolio-detalles text-center <?php echo $h ?>">
                    <div>
                      <span class="portafolio-titulo">Dualemento</span><br>
                      <small><a href="http://dualemento.com" target="_blank">dualemento.com</a></small>
                      <div class="portafolio-descripcion">
                        <p class="hidden-xs hidden-sm traducir" data-key="dualemento.com">
                          <?php echo $t['dualemento.com'] ?>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="container">
                <div class="row">
                  <div class="col-xs-12 col-sm-4 col-md-5 col-lg-6 portafolio-imagen">
                    <img class="img-responsive center-block" src="images/aerohome.png">
                  </div>
                  <div class="col-xs-12 col-sm-8 col-md-7 col-lg-6 portafolio-detalles text-center <?php echo $h ?>">
                    <div>
                      <span class="portafolio-titulo">Aerohome</span><br>
                      <small><a class="portafolio-enlace" href="http://aerohome.dualemento.com" target="_blank">aerohome.com</a></small>
                      <div class="portafolio-descripcion">
                        <p class="hidden-xs hidden-sm traducir" data-key="aerohome.com">
                          <?php echo $t['aerohome.com'] ?>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="container">
                <div class="row">
                  <div class="col-xs-12 col-sm-4 col-md-5 col-lg-6 portafolio-imagen">
                    <img class="img-responsive center-block" src="images/diagnostico-loreal-professionnel.png">
                  </div>
                  <div class="col-xs-12 col-sm-8 col-md-7 col-lg-6  portafolio-detalles text-center <?php echo $h ?>">
                    <div>
                      <span class="portafolio-titulo">Diagnostico L'Oréal</span><br>
                      <small><a href="http://diagnosticolorealprofessionnel.dualemento.com" target="_blank">diagnosticolorealprofessionnel.com</a></small>
                      <div class="portafolio-descripcion">
                        <p class="hidden-xs hidden-sm traducir" data-key="diagnosticolorealprofessionnel.com">
                          <?php echo $t['diagnosticolorealprofessionnel.com'] ?>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Paginación -->
          <div class="swiper-pagination <?php echo $h ?>"></div>
          
          <!-- Botones de paginación -->
          <div class="swiper-button-prev hidden-xs hidden-sm">
            <span class="<?php echo $h ?>">
              <i class="fa fa-caret-left" aria-hidden="true"></i>
            </span>
          </div>
          <div class="swiper-button-next hidden-xs hidden-sm">
            <span class="<?php echo $h ?>">
              <i class="fa fa-caret-right" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer id="section-contacto">
      <div class="container">
        <div class="row">

          <!-- Información adicional -->
          <div class="col-md-6">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-* footer-container">
                  <span class="traducir" data-key="contactame">
                    <?php echo $t['contactame'] ?>
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-* footer-container">
                  <a class="enlace-contacto" href="https://www.facebook.com/keilermora" target="_blank">
                    <i class="fa fa-facebook-official" aria-hidden="true"></i>
                  </a>
                  <a class="enlace-contacto" href="https://www.linkedin.com/in/keilermora" target="_blank">
                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                  <a class="enlace-contacto" href="https://github.com/keilermora" target="_blank">
                    <i class="fa fa-github" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulario de contacto -->
          <div class="col-md-6">
            <form id="form-contacto">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <input id="nombre" type="text" class="form-control traducir-placeholder" data-key="nombre" placeholder="<?php echo $t['nombre'] ?>">
                    </div> 
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <input id="correo" type="text" class="form-control traducir-placeholder" data-key="correo" placeholder="<?php echo $t['correo'] ?>">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12">
                    <div class="form-group">
                      <textarea id="mensaje" class="form-control traducir-placeholder" data-key="mensaje" placeholder="<?php echo $t['mensaje'] ?>"></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-9 col-md-8">
                    <label class="form-check-label">
                      <input id="cc" type="checkbox" class="form-check-input">
                      <span class="traducir" data-key="deseo-recibir-copia"><?php echo $t['deseo-recibir-copia'] ?></span>
                    </label>
                  </div>
                  <div class="col-lg-3 col-md-4">
                    <button type="submit" id="btn-enviar" class="btn btn-primary traducir" data-key="enviar"><?php echo $t['enviar'] ?></button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>

    <!-- Toast para mostrar mensajes al usuario -->
    <div class="alert" role="alert"></div>

    <!-- build:js scripts/jquery.min.js -->
    <script src="../node_modules/jquery/dist/jquery.min.js"></script>
    <!-- /build -->

    <!-- build:js scripts/bootstrap.min.js -->
    <script src="../node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- /build -->
    <!-- build:js scripts/swiper.min.js -->
    <script src="../node_modules/swiper/dist/js/swiper.min.js"></script>
    <!-- /build -->
    <!-- build:js scripts/TweenMax.min.js -->
    <script src="../node_modules/gsap/src/minified/TweenLite.min.js"></script>
    <script src="../node_modules/gsap/src/minified/easing/EasePack.min.js"></script>
    <script src="../node_modules/gsap/src/minified/plugins/CSSPlugin.min.js"></script>
    <script src="../node_modules/gsap/src/minified/plugins/ScrollToPlugin.min.js"></script>
    <!-- /build -->

    <script src="scripts/index.js"></script>

    <!-- Etiquetas de audio -->
    <audio id="botw-secret">
      <source src="sounds/botw-secret.wav" type="audio/wav"/>
    </audio>
  </body>
</html>