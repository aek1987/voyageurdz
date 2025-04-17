import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VoyageursComponent } from './voyageurs/voyageurs.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VoyageursComponent],
  template: `<app-voyageurs />`
})
export class AppComponent {}
