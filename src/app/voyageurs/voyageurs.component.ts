import { Component, OnInit } from '@angular/core';
import { Voyageur, VoyageurService } from '../../services/voyageur.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-voyageurs',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './voyageurs.component.html',
  styleUrls: ['./voyageurs.component.css']
})
export class VoyageursComponent implements OnInit {
  voyageurs: Voyageur[] = [];
  numeroPassportRecherche: string = '';
  voyageurTrouve?: Voyageur;
  rechercheEffectuee: boolean = false;
  constructor(private voyageurService: VoyageurService) {}

  ngOnInit(): void {
    this.voyageurService.getVoyageurs().subscribe(data => {
      console.log('Données reçues :', data); // ←←← Ajoute ça
      this.voyageurs = data;
    });
  }
  rechercherVoyageur(): void {
    this.voyageurService.getVoyageurByNumeroPassport(this.numeroPassportRecherche)
      .subscribe(v => {
        this.voyageurTrouve = v;
        this.rechercheEffectuee = true;
      });
  }
}
