<template>
    <div class="historial-asistencias">
      <div class="titulo">
        <h2>Historial de Asistencias para el curso: {{ curso.nombre }}</h2>
      </div>
      <div v-if="curso.asistencias && curso.asistencias.length > 0" class="historial-content">
        <div v-for="(asistencia, index) in curso.asistencias" :key="index" class="asistencia-item">
          <h3>Asistencia registrada el {{ asistencia.fechaHora }}</h3>
          <table class="table table-hover">
            <thead class="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre del estudiante</th>
                <th scope="col">Correo institucional</th>
                <th scope="col">Asistencia</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(estudiante, idx) in asistencia.estudiantes" :key="idx">
                <td>{{ idx + 1 }}</td>
                <td>{{ estudiante.nombre }}</td>
                <td>{{ estudiante.correo }}</td>
                <td>{{ estudiante.asistencia }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else class="no-asistencias">
        <p>No se han registrado asistencias para este curso.</p>
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
        curso: {}
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
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para este componente */
  .historial-asistencias {
    padding: 20px;
  }
  
  .titulo {
    margin-bottom: 20px;
  }
  
  .historial-content {
    margin-top: 20px;
  }
  
  .asistencia-item {
    margin-bottom: 20px;
  }
  
  .no-asistencias {
    margin-top: 20px;
    font-style: italic;
  }
  </style>
  