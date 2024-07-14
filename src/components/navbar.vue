<template>
    <header>
        <!-- Barra de navegacion -->
        <nav class="menu">
            <section class="menu__container">
                <h1 class="menu__logo">SCAE</h1>


                <ul class="menu__links">
                    <li class="menu__item ">
                        <a @click="inicio" class="menu__link">Inicio</a>
                    </li>


                    <li class="menu__item menu__item--show">
                        <a @click="asistencia" class="menu__link">Asistencia<img src="../assets/arrow.svg"
                                class="menu__arrow"></a>

                        <ul class="menu__nesting">
                            <li class="menu__inside">
                                <a @click="asistencia" class="menu__link menu__link--inside">Tomar asistencia</a>
                            </li>
                            <li class="menu__inside">
                                <a @click="asistencia" class="menu__link menu__link--inside">Ver historial</a>
                            </li>
                        </ul>

                    </li>

                    <li class="menu__item menu__item--show">
                        <a @click="miscursos" class="menu__link">Mis Cursos<img src="../assets/arrow.svg"
                                class="menu__arrow"></a>
                        <ul class="menu__nesting">
                            <li class="menu__inside">
                                <a @click="miscursos" class="menu__link menu__link--inside">Mis cursos</a>
                            </li>
                            <li class="menu__inside">
                                <a @click="miscursos" class="menu__link menu__link--inside">Gestionar cursos</a>
                            </li>
                        </ul>
                    </li>

                    <li class="menu__item menu__item--show">
                        <a  class="menu__link" @click="logout"><i class="fa-solid fa-arrow-right-from-bracket fa-rotate-180"></i>Cerrar sesion</a>
                    </li>
                </ul>

            </section>

        </nav>
    </header>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token'); // Eliminar el token del localStorage
      localStorage.removeItem('currentUser'); // También eliminar el usuario actual del localStorage
      this.$router.push('/login'); // Redirigir al usuario a la página de inicio de sesión
    },
    asistencia(){
        this.$router.push('/Asistencia');
    },
    inicio(){
        this.$router.push('/Index');
    },
    miscursos(){
        this.$router.push('/Miscursos');
    }
  }
};
</script>

<style scoped>

header .menu__logo{
    color: #ffffd5;
    font-size: 2em;
    text-decoration: none;
    text-transform: uppercase;
    background: #9b7239;
    padding: 0 10px;
    font-family: 'lora', serif;
    font-weight: 600;
    border-radius: 5px;
 }
.menu {
    background-color: #af9976;
    color: #fffacd;
    height: 100px;  
}

.menu__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;
    height: 100%;
}

.menu__links {
    height: 100%;
    transition: transform .5s;
    display: flex;
}

.menu__item {
    position: relative;
    list-style: none;
    height: 100%;
    --clip: polygon(0 0, 100% 0, 100% 0, 0% 0);
    --transform: rotate(-90deg);
}


.menu__item:hover {
    --clip: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    --transform: rotate(0);
}

.menu__link {
    color: #7a551c;
    text-decoration: none;
    padding: 0 30px;
    display: flex;
    height: 100%;
    align-items: center;
}

.menu__link:hover {
    background-color: #a18860;
    cursor: pointer;
}


.menu__arrow {
    transform: var(--transform);
    transition: transform .3s;
    display: block;
    margin-left: 3px;
}

.menu__nesting {
    list-style: none;
    transition: clip-path .3s;
    clip-path: var(--clip);
    position: absolute;
    right: 0;
    bottom: 0;
    width: 150px;
    transform: translateY(100%);
    z-index: 1050;
}

.menu__link--inside {
    padding: 30px 100px 30px 20px;
    border: none;
    background-color: #a18860;


}


.menu__link--inside:hover {
    background-color: #947649;
    cursor: pointer;
}
</style>