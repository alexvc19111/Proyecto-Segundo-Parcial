<template>
    <nav class="menu">
      <div class="menu__links">
        <div class="menu__item">
          <router-link to="/login">Iniciar sesion</router-link>
        </div>
        <div class="menu__item">
          <router-link to="/registro">Registrarse</router-link>
        </div>
      </div>
    </nav>
</template>

<style>
.menu {
  display: flex;
  justify-content: center; /* Centra los elementos horizontalmente */
  background-color: #af9976; /* Color de fondo del menú */
  padding: 10px 0; /* Espacio interno superior e inferior */
}

.menu__links {
  display: flex; /* Hace que los enlaces estén en línea */
}

.menu__item {
  margin: 0 10px; /* Espacio entre los elementos del menú */
}

.menu__item a {
  color: white; /* Color del texto de los enlaces */
  text-decoration: none; /* Quita el subrayado de los enlaces */
  padding: 10px;
   /* Espacio interno de los enlaces */
}

.menu__item a:hover {
  background-color: #a18860;; /* Subrayado al pasar el mouse */
}

nav a.router-link-exact-active {
  color: #7a551c;
  font-weight: 1000;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>