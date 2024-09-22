import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'curso-card',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './card.component.component.html',
  styleUrl: './card.component.component.css'
})
export class CardComponent {

  @Input()
  public curso!:any;

  ngOnInit(): void {
    if(!this.curso) throw new Error('Curso property is required');
  }
}
