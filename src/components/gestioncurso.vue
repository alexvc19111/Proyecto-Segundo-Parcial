<template>
  <div class="curso__content">
    <div class="titulo">
      <h2>Gestionar Curso: {{ curso.nombre }}</h2>
    </div>
    <div class="tablecontent my-4">
      <div class="estudiantes__">
        <h3>Estudiantes registrados</h3>
        <div class="miscursos my-4">
          <div class="row">
            <div class="col-sm-5 col-md-5 col-lg-5 col-xl-12">
              <table class="table table-hover" id="estudiantes_">
                <caption>Lista de estudiantes</caption>
                <thead class="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre del estudiante</th>
                    <th scope="col">Correo institucional</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(estudiante, index) in curso.estudiantes" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ estudiante.nombre }}</td>
                    <td>{{ estudiante.correo }}</td>
                    <td>
                      <button class="btn btn-danger eliminar" @click="eliminarEstudiante(index)"
                        title="Eliminar estudiante"><i class="fas fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="form-group mt-4">
          <input v-model="nuevoEstudiante.nombre" class="form-control" placeholder="Nombre del nuevo estudiante">
          <input v-model="nuevoEstudiante.correo" type="email" class="form-control mt-2"
            placeholder="Correo institucional (ej:e1234567890@live.uleam.edu.ec )">
          <div class="text-danger mt-2" v-if="error">Complete los campos correctamente</div>
          <button class="btn btn-success mt-2" @click="agregarEstudiante">Agregar estudiante</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cursoId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      curso: {},
      nuevoEstudiante: {
        nombre: '',
        correo: ''
      },
      error:false
    };
  },
  created() {
    const cursoId = this.$route.params.cursoId;
    this.curso = this.obtenerCurso(cursoId);
  },
  methods: {
    obtenerCurso(cursoId) {
      const usuario = JSON.parse(localStorage.getItem('currentUser'));
      if (usuario) {
        const cursos = JSON.parse(localStorage.getItem(`cursos_${usuario.email}`)) || [];
        return cursos.find(curso => curso.id === parseInt(cursoId)) || {};
      }
      return {};
    },
    eliminarEstudiante(index) {
      this.curso.estudiantes.splice(index, 1);
      this.guardarCurso();
    },
    guardarCurso() {
      const usuario = JSON.parse(localStorage.getItem('currentUser'));
      if (usuario) {
        const cursos = JSON.parse(localStorage.getItem(`cursos_${usuario.email}`)) || [];
        const cursoIndex = cursos.findIndex(curso => curso.id === this.curso.id);
        if (cursoIndex !== -1) {
          cursos[cursoIndex] = this.curso;
          localStorage.setItem(`cursos_${usuario.email}`, JSON.stringify(cursos));
        }
      }
    },
    agregarEstudiante() {
      const nombreRegex = /^[a-zA-Z\s]+$/;
      const correoRegex = /^[eE]\d{10}@live\.uleam\.edu\.ec$/;

      if (this.nuevoEstudiante.nombre.trim() === '' || this.nuevoEstudiante.correo.trim() === '') {
        this.error = true;
      }
      else if (
        nombreRegex.test(this.nuevoEstudiante.nombre.trim()) &&
        correoRegex.test(this.nuevoEstudiante.correo.trim())
      ) {
        this.error = false; // Limpiar el mensaje de error si la validación es exitosa
        this.Agregar();
      } else {
        // Mostrar mensaje de error
        this.error = true;
      }
    },
    Agregar(){
      this.curso.estudiantes.push({
          nombre: this.nuevoEstudiante.nombre,
          correo: this.nuevoEstudiante.correo
        });
        this.guardarCurso();
        this.nuevoEstudiante.nombre = '';
        this.nuevoEstudiante.correo = '';
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para este componente */
.curso__content {
  padding: 20px;
}

.titulo {
  margin-bottom: 20px;
}

.tablecontent {
  overflow-x: auto;
}

.table {
  width: 100%;
}
</style>
