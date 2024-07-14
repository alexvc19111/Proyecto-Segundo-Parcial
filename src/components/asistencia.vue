<template>
    <div class="asistencia__content">
      <div class="titulo">
        <h2>Elija el curso y la acción a realizar:</h2>
      </div>
      <div class="tablecontent">
        <div class="cursos__">
          <div class="miscursos my-3">
            <div class="row">
              <div class="col-sm-5 col-md-5 col-lg-5 col-xl-12">
                <table class="table table-hover" id="miscursos_">
                  <caption>Lista de cursos</caption>
                  <thead class="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre de curso</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(curso, index) in cursos" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ curso.nombre }}</td>
                      <td>
                        <button
                          class="btn btn-success tomar-asistencia"
                          title="Tomar asistencia"
                          @click="tomarAsistencia(curso.id)"
                        >
                          Tomar asistencia <i class="fas fa-check-square"></i>
                        </button>
                        <button
                          class="btn btn-primary ver-historial"
                          title="Ver historial"
                          @click="verHistorial(curso.id)"
                        >
                          Ver historial <i class="fas fa-history"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cursos: []
      };
    },
    created() {
      this.cargarCursos();
    },
    methods: {
        cargarCursos() {
        const usuario = JSON.parse(localStorage.getItem('currentUser'));
        if (usuario) {
          const cursos = JSON.parse(localStorage.getItem(`cursos_${usuario.email}`)) || [];
          this.cursos = cursos;
        }
      },
      
      tomarAsistencia(cursoId) {
        this.$router.push({ name: 'tomarasistencia', params: { cursoId: cursoId.toString() } });
      },
      verHistorial(cursoId) {
        this.$router.push({ name: 'historial', params: { cursoId: cursoId.toString() } });
      }
    },
  };
  </script>
  
  <style scoped>
    .asistencia__content {
    padding: 20px;
  }
  
  .titulo h2 {
    margin-bottom: 20px;
  }
  
  .tablecontent {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #bba694;
  }
  
  .cursos__ {
    width: 100%;
  }
  
  .miscursos {
    width: 100%;
  }
  
  .table-hover tbody tr:hover {
    background-color: #f5f5f5;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  .input-group .form-control {
    margin-right: 10px;
  }

  
  </style>