# anime-shopping

Este e-commerce tiene como objetivo poder vender productos según una categoría de anime para seleccionar, para empezar tiene solo 2 animes seleccionables, pero la web está hecha de tal forma, que se le puede agregar otra categoría de anime, con solo agregar 1 Botón de dicha categoría y 1 JSON con sus productos.

-se le aplicó stylo con media queries adaptado a celular

-en la primera vista se creó botones para seleccionar el anime y dependiendo del que selecciones se cargara el JSON contenedor de productos y se cambiara el stylo de la web, adaptado al anime seleccionado

-una vez hayamos seleccionado un anime, podremos comenzar a agregar productos al carrito, estos serán agregados al localStorage

-en el localStorage se agrega el objeto seleccionado y si agregamos más de 1 producto del mismo tipo, se agrega al objeto la propiedad de "cantidad" 

-si queremos cambiar a otra categoría de anime, tenemos un botón con flechas que indica el cambio de categoría. Si es en computador, está en el borde izquierdo y si es en celular, está en la parte superior

-se puede agregar al carrito los productos de cualquier categoría

-cuando tengamos los productos listos, podemos ir al carrito y finalizar la compra

-en el carrito, tenemos 4 botones
  * el primero es para seguir comprando, este te devuelve a  seleccionar anime para volver a elegir productos
  * el segundo es para eliminar el producto del carrito
  que con este se elimina el índice del objeto en localStorage
  * el tercero es para vaciar completamente el carrito aplicando un clear al localStorage
  * el cuarto es para "COMPRAR" al seleccionarlo finalizar la compra usando una alerta de la librería SweetAlert
