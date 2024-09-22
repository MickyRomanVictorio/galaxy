import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CursosRoutingModule } from './cursos-routing.module';
import { MaterialModule } from '../material/material.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CursoPageComponent } from './pages/curso-page/curso-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    ListPageComponent,
    LayoutPageComponent,
    NewPageComponent,
    SearchPageComponent,
    CursoPageComponent,
    ReactiveFormsModule,
    MaterialModule
  ],
})
export class CursosModule { }
