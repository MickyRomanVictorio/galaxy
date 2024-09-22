import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { CursoServiceService } from '../../services/curso.service.service';
import { CardComponent } from '../../components/card/card.component.component';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [MaterialModule, CardComponent],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit {

  public cursos: any[] = [];

  constructor(private cursoService: CursoServiceService) { }

  ngOnInit(): void {
    this.cursoService.getCursos().subscribe(cursos => this.cursos = cursos);
  }

}
