<template>
    <button  class="regresar" @click="regreso">REGRESAR</button>
    <div class="container">
    <div class="form">
    <h1>Iniciar sesión</h1>
    <form class="formulario" id="form__login" @submit.prevent="login">
      <div class="inputgroup">
        <!-- Grupo: Email -->
        <div class="formulario__grupo" id="grupo__correo">
          <div class="formulario__grupo-input">
            <i class="fa-solid fa-envelope"></i>
            <input type="text" class="formulario__input" v-model="email" placeholder="Ingrese su correo electrónico" required />
            
          </div>
          <p class="formulario__input-error" v-if="error">Ingrese un correo valido</p>
        </div>
        <!-- Grupo: Password -->
        <div class="formulario__grupo" id="grupo__password">
          <div class="formulario__grupo-input">
            <i class="fa-solid fa-lock"></i>
            <input type="password" class="formulario__input" v-model="password" placeholder="Ingrese su contraseña" required />
          </div>
          <p class="formulario__input-error" v-if="error">La contraseña tiene que ser de 4 a 12 dígitos</p>
        </div>
        <p>No tienes una cuenta? <router-link to="/registro">REGISTRATE AQUI!</router-link></p>
      </div>
      <div class="formulario__mensaje" id="formulario__mensaje" v-if="error">
        <p><i class="fas fa-exclamation-triangle"></i> <b>Error:</b> Ingrese unas credenciales válidas!</p>
      </div>
      <!-- BOTON DE REGISTRAR -->
      <div class="formulario__grupo formulario__grupo-btn-enviar">
        <button class="formulario__btn" id="registro__btn" type="submit">
          <i class="fa-regular fa-clipboard"></i> Iniciar Sesión
        </button>
        <p class="formulario__mensaje-exito" id="formulario__mensaje-exito" v-if="success">Iniciando sesión...</p>
      </div>
    </form>
  </div>
</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        error:false,
        success:false
      };
    },
    methods: {
        regreso(){
        this.$router.push('/');
    },
    login() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(
        user => user.email === this.email && user.password === this.password
      );
      if (user) {
        const token = this.generateToken();
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.success = true;
        this.error = false;
        setTimeout(() => {
          this.$router.push('/Index');
        }, 1000);
      } else {
        this.error = true;
        this.success = false;
        setTimeout(() => {
          this.error = false;
        }, 3000); // Ocultar el mensaje de error después de 3 segundos
      }
        
      
    },
    generateToken() {return Math.random().toString(36).substr(2);
  }
}
};
  </script>

  <style>
.container {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}</style>