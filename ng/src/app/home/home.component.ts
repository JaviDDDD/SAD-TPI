import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TareaListComponent } from "../tarea-list/tarea-list.component";

@Component({
  selector: 'app-home',
  imports: [MatCardModule, TareaListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
