<template>
    <div class="curso__content">
      <div class="titulo">
        <h2>Tomar Asistencia: {{ curso.nombre }}</h2>
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
                      <th scope="col">Asistencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(estudiante, index) in curso.estudiantes" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ estudiante.nombre }}</td>
                      <td>{{ estudiante.correo }}</td>
                      <td>
                        <select v-model="estudiante.asistencia" @change="guardarAsistencia()">
                          <option value="asistio">Asistió</option>
                          <option value="retraso">Retraso</option>
                          <option value="falta-justificada">Falta justificada</option>
                          <option value="falta">Falta</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="mt-3" v-if="!todosConAsistencia()">
            <div class="alert alert-warning" role="alert">
              Debe registrar la asistencia de todos los estudiantes antes de guardar.
            </div>
          </div>
          <div v-else>
            <button class="btn btn-primary" @click="guardarAsistenciaRegistrada">Guardar Asistencia</button>
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
        error: false
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
      guardarAsistencia() {
        // Lógica para guardar la asistencia actualizada (se guarda automáticamente al seleccionar)
      },
      todosConAsistencia() {
        // Verifica si todos los estudiantes tienen una asistencia registrada
        return this.curso.estudiantes.every(estudiante => estudiante.asistencia !== '');
      },
      guardarAsistenciaRegistrada() {
        if (this.todosConAsistencia()) {
          // Agregar fecha y hora actual
          const fechaHoraRegistro = new Date().toLocaleString();
          
          // Guardar asistencia con fecha y hora en localStorage
          this.curso.asistencias = this.curso.asistencias || [];
          this.curso.asistencias.push({
            fechaHora: fechaHoraRegistro,
            estudiantes: this.curso.estudiantes.map(estudiante => ({
              nombre: estudiante.nombre,
              correo: estudiante.correo,
              asistencia: estudiante.asistencia
            }))
          });
  
          // Limpiar selección de asistencia
          this.curso.estudiantes.forEach(estudiante => {
            estudiante.asistencia = '';
          });
  
          // Guardar curso actualizado en localStorage
          this.guardarCurso();
  
          alert('Asistencia registrada correctamente.');
  
          // Redireccionar o realizar otra acción después de guardar
          // Por ejemplo, redireccionar a la página de historial de asistencias
          this.$router.push({ name: 'historial', params: { cursoId: this.curso.id } });
        } else {
          alert('Debe registrar la asistencia de todos los estudiantes antes de guardar.');
        }
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
  