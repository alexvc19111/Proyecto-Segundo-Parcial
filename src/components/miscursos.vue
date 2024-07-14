<template>
    <div class="miscursos__content">
      <div class="titulo">
        <h2>Mis cursos:</h2>
      </div>
      <div class="tablecontent">
        <div class="cursos__">
          <div class="miscursos my-4">
            <div class="row">
              <div class="col-sm-5 col-md-5 col-lg-5 col-xl-12">
                <table class="table table-hover" id="miscursos_">
                  <caption>Lista de cursos</caption>
                  <thead class="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre de curso</th>
                      <th scope="col">Estudiantes registrados</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(curso, index) in cursos" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ curso.nombre }}</td>
                      <td>{{ curso.estudiantes.length }}</td>
                      <td>  
                        <button class="btn btn-warning gestionar" @click="gestionarCurso(curso.id)" title="Gestionar curso"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger eliminar" @click="eliminarCurso(index)" title="Eliminar curso"><i class="fas fa-trash"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="form-group mt-4">
                  <input v-model="nuevoCurso" class="form-control" placeholder="Nombre del nuevo curso">
                  <button class="btn btn-success mt-2" @click="agregarCurso">Agregar curso</button>
                </div>
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
        
        cursos: [],
        nuevoCurso: ''
      };
    },
    mounted() {
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
      guardarCursos() {
        const usuario = JSON.parse(localStorage.getItem('currentUser'));
        if (usuario) {
          localStorage.setItem(`cursos_${usuario.email}`, JSON.stringify(this.cursos));
        }
      },
      agregarCurso() {
        if (this.nuevoCurso.trim() !== '') {
          this.cursos.push({
            id: Date.now(),
            nombre: this.nuevoCurso,
            estudiantes: []
          });
          this.nuevoCurso = '';
          this.guardarCursos();
        }
      },
      gestionarCurso(cursoId) {
      this.$router.push({ name: 'gestioncurso', params: { cursoId: cursoId.toString() } });

    },
      eliminarCurso(index) {
        this.cursos.splice(index, 1);
        this.guardarCursos();
      }
    }
  };
  </script>
  
  <style>
  .miscursos__content {
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
  
  .form-group {
    margin-top: 20px;
  }
  </style>