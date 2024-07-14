<template>
    <button  class="regresar" @click="regreso">REGRESAR</button>
    <div class="container">
      <div class="form">
        <h1>Registro</h1>
        <form class="formulario" id="form__registro" @submit.prevent="registro">
          <div class="inputgroup">
            <!-- Grupo: Nombres -->
            <div class="formulario__grupo" id="grupo__nombre">
              <div class="formulario__grupo-input">
                <i class="fa-solid fa-user"></i>
                <input type="text" class="formulario__input" v-model="name" placeholder="Ingrese su nombre" required />
              </div>
              <p class="formulario__input-error" v-if="!validarNombre">El nombre solo puede tener letras, acentos y espacios</p>
            </div>
            <!-- Grupo: Email -->
            <div class="formulario__grupo" id="grupo__correo">
              <div class="formulario__grupo-input">
                <i class="fa-solid fa-envelope"></i>
                <input type="email" class="formulario__input" v-model="email" placeholder="Ingrese su correo electrónico" required />
              </div>
              <p class="formulario__input-error" v-if="!validarEmail">Ingrese un correo válido</p>
              <p class="formulario__input-error" v-if="correoExistente">Este correo electrónico ya está registrado</p>
            </div>
            <!-- Grupo: Password -->
            <div class="formulario__grupo" id="grupo__password">
              <div class="formulario__grupo-input">
                <i class="fa-solid fa-lock"></i>
                <input type="password" class="formulario__input" v-model="password" placeholder="Ingrese su contraseña" required />
              </div>
              <p class="formulario__input-error" v-if="!validarPassword">La contraseña debe tener entre 4 y 12 caracteres</p>
            </div>
            <p>¿Ya tienes una cuenta? <router-link to="/login">INICIA SESIÓN AQUÍ!</router-link></p>
          </div>
          <div class="formulario__mensaje" id="formulario__mensaje" v-if="error">
            <p><i class="fas fa-exclamation-triangle"></i> <b>Error:</b> Por favor complete correctamente todos los campos</p>
          </div>
          <!-- BOTON DE REGISTRAR -->
          <div class="formulario__grupo formulario__grupo-btn-enviar">
            <button class="formulario__btn" id="registro__btn" type="submit">
              <i class="fa-regular fa-clipboard"></i> Registrarse
            </button>
            <p class="formulario__mensaje-exito" id="formulario__mensaje-exito" v-if="success">Registrado exitosamente. Iniciando sesión...</p>
          </div>
        </form>
      </div>
    </div>
  </template>


<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: false,
      success: false,
      correoExistente: false
    };
  },
  computed: {
    validarNombre() {
      // Validar nombre: solo letras, acentos y espacios
      return /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(this.name);
    },
    validarEmail() {
      // Validar email: patrón básico de email
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    },
    validarPassword() {
      // Validar contraseña: entre 4 y 12 caracteres
      return this.password.length >= 4 && this.password.length <= 12;
    }
  },
  methods: {
    regreso(){
        this.$router.push('/');
    },
    registro() {
      // Validar campos antes de registrar
      if (this.validarNombre && this.validarEmail && this.validarPassword) {
        // Verificar si el correo ya está registrado
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const correoRegistrado = users.some(user => user.email === this.email);
        
        if (correoRegistrado) {
          // Mostrar mensaje de correo existente
          this.correoExistente = true;
          this.error = false;
          return;
        }
        
        // Si no hay correo duplicado, guardar en localStorage
        const newUser = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Mostrar mensaje de éxito y limpiar campos
        this.success = true;
        this.error = false;
        
        // Redirigir después del registro
        setTimeout(() => {
          this.$router.push('/login');
        }, 1000); // Redirigir después de 1 segundo
      } else {
        // Mostrar mensaje de error si los campos no son válidos
        this.error = true;
        this.success = false;
      }
    }
  }
};



</script>