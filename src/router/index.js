import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/components/login.vue'
import Register from '@/components/registro.vue'
import PrincipalView from '../views/PrincipalView.vue'
import AsistenciaView from '../views/AsistenciaView.vue'
import MiscursosView from '../views/MiscursosView.vue'
import Gestioncursoview from '../views/GestioncursoView.vue'
import TomarsistenciaView from '../views/TomarsistenciaView.vue'
import HistorialView from '../views/HistorialView.vue'

function isLoggedIn() {
  return localStorage.getItem('token') !== null;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registro',
      name: 'registro',
      component: Register
    },
    {
      path: '/Asistencia',
      name: 'asistencia',
      component: AsistenciaView,
      meta:{requiresAuth: true}
    },
    {
      path: '/Miscursos',
      name: 'miscursos',
      component: MiscursosView,
      meta:{requiresAuth: true}
    },
    {
      path: '/Miscursos/Gestionar-Curso/:cursoId',
      name: 'gestioncurso',
      component: Gestioncursoview,
      meta:{requiresAuth: true},
      props: true
    },
    {
      path: '/Asistencia/Tomar-Asistencia/:cursoId',
      name: 'tomarasistencia',
      component: TomarsistenciaView,
      meta:{requiresAuth: true},
      props: true
    },
    {
      path: '/Asistencia/Historial-asistencia/:cursoId',
      name: 'historial',
      component: HistorialView,
      meta:{requiresAuth: true},
      props: true
    },
    {
      path: '/Index',
      name: 'principal',
      component: PrincipalView,
      meta:{requiresAuth: true}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next({ name: 'login' }); // Redirige a la página de inicio de sesión si no está autenticado
    } else {
      next(); // Permite el acceso a la ruta protegida si está autenticado
    }
  } else {
    next(); // Continúa con la navegación para otras rutas
  }
});

export default router
