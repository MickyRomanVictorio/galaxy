import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { CursoServiceService } from '../../services/curso.service.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-page',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent {

  public curso?: any;
  public cursoId: string | null = null;

  constructor(
    private CursoServiceService: CursoServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public cursoForm = new FormGroup({
    id: new FormControl<number | null>(null),
    titulo: new FormControl<string>('', { nonNullable: true }),
    descripcion: new FormControl<string>('', { nonNullable: true }),
    instructor: new FormControl<string | null>(null),
    imagen: new FormControl<string | null>(null),
    precio: new FormControl<number | null>(null),
    id_creador: new FormControl<number>(1, { nonNullable: true }),  // Asignando valor por defecto
    created_at: new FormControl<string | null>(null),
    updated_at: new FormControl<string | null>(null)
  });

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          this.cursoId = id;
          return this.CursoServiceService.getCurso(id)
        })
      )
      .subscribe( curso => {
        if (!curso) {
          this.router.navigate(['/cursos/list']);
          return;  // Redirecciona sin retornar un valor explícito
        }

        this.curso = curso;
        // console.log(curso);
        // return;

        // Llenar el formulario con los datos del curso si existe (editar)
        this.cursoForm.patchValue({
          titulo: curso["titulo"],
          descripcion: curso["descripcion"],
          instructor: curso["instructor"],
          imagen: curso["imagen"],
          precio: curso["precio"],
        });

      });

  }

  async onSubmit(){

    console.log({
      formIsValid: this.cursoForm.valid,
      value: this.cursoForm.value
    });

    if (this.cursoForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    // Si ya existe un curso, entonces es edición
    if (this.curso) {
      // console.log(this.cursoId); return;

      const response = await this.CursoServiceService.editarCurso(this.cursoId, this.cursoForm.value);
      console.log('Curso actualizado:', response);
    } else {
      // Si no hay curso, entonces es creación
      const response = await this.CursoServiceService.addCurso(this.cursoForm.value);
      console.log('Curso agregado:', response);
    }

    // Redireccionar después de guardar o actualizar
    this.router.navigate(['/cursos/list']);

  }

  async delete(id_curso: string | null){
    if (!id_curso) {
      console.error('El ID del curso es nulo o indefinido.');
      return;  // Evita que se ejecute el código si el id es inválido
    }
    const response = await this.CursoServiceService.eliminarCurso(id_curso);
    console.log('Curso eliminado:', response);
    this.router.navigate(['/cursos/list']);
  }

}
