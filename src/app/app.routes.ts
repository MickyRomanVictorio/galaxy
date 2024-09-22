import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule),
  },
  {
    path:'',
    redirectTo: 'cursos',
    pathMatch: 'full'
  }
];
