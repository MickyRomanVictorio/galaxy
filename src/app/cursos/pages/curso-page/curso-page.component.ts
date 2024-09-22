import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CursoServiceService } from '../../services/curso.service.service';
import { MaterialModule } from '../../../material/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-curso-page',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './curso-page.component.html',
  styleUrl: './curso-page.component.css'
})
export class CursoPageComponent implements OnInit {

  public curso?: any;

  constructor (
    private CursoServiceService: CursoServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.CursoServiceService.getCurso(id))
      )
      .subscribe( curso => {
        if (!curso) return this.router.navigate(['/cursos/list'])
        this.curso = curso;
        // console.log(curso);
        return;
      });

  }

  goBack(): void {
    this.router.navigateByUrl('cursos/list');
  }

}
