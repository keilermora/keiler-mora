# Keiler Mora
[keilermora.dualemento.com](http://keilermora.dualemento.com)

Segunda versión web de mi currículum vitae. Ha pasado aproximadamente dos años desde que desarrollé la primera versión, es por ello que requería una actualización.

### Cambios con la versión anterior

* Debido a la popularidad de `Bootstrap`, se decidió reemplazar el framework `Materialize CSS` con éste.
* El formato de los logos de la sección Conocimientos pasaron a tener el formato `.svg`.
* El plugin `jQueryUI` fue reemplazado por `GSAP` para realizar las animaciones. Gracias a ello, se mejoró considerablemente la fluidés de las animaciones en el sitio web.
* El sitio web ahora detecta el idioma del navegador y la hora del servidor antes de mostrar el contenido de la página, en lugar de hacerlo vía script.
* Se sustituyó el manejador de dependencias Bower por Yarn, según lo recomendado en el [blog oficial de Bower.io](https://bower.io/blog/2017/how-to-migrate-away-from-bower/).

### Dependencias del proyecto

* [Bootstrap](https://getbootstrap.com/docs/3.3/) - The most popular HTML, CSS, and JS library in the world
* [Font Awesome](http://fontawesome.io/) - The iconic font and CSS toolkit
* [GSAP](https://greensock.com/gsap) - The new standard for HTML5 and javascript animation
* [jQuery](https://jquery.com/) - Write less, do more
* [Swiper](http://idangero.us/swiper/) - Most Modern Mobile Touch Slider

### Construir la versión de desarrollo

El proyecto requiere [Node.js](https://nodejs.org/) y [Yarn](https://yarnpkg.com/lang/en/) para instalar las dependencias. Se deben ejecutar la línea de comandos en la carpeta raíz del proyecto.

```sh
$ yarn install
```

Para modificar los estilos del sitio web, es necesario contar con [Gulp](https://gulpjs.com/) para poder traducir el lenguaje `SCSS` a `CSS 3` en tiempo real

```sh
$ gulp start
```

Gulp detectará los cambios una ves sea modificado algún documento `.scss`.

### Construir la versión de producción

En la carpeta `src` se encuentra la versión de desarrollo del proyecto. Para la versión de producción...

```sh
$ gulp build
```