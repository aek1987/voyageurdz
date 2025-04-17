import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

export interface Voyageur {
  id: number;
  numeroPassport: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  dateExpirationPassport: string;
  datePrevuVoyage: string;
  posteSortiePrevu: string;
  montantDroitChange: number;
  nin: string;
}

@Injectable({
  providedIn: 'root'
})
export class VoyageurService {
  private jsonPath = 'assets/db.json'; // Chemin vers le fichier JSON local

  constructor(private http: HttpClient) {}
  getVoyageurs(): Observable<Voyageur[]> {
//this.checkDbFileExists();
    return this.http.get<{ voyageursInfos: Voyageur[] }>(this.jsonPath).pipe(
      map(response => response.voyageursInfos),
      catchError(error => {
        console.error('Erreur lors de la récupération des voyageurs:', error);
        return of([]); // retourne une liste vide en cas d'erreur
      })
    );
  }



getVoyageurByNumeroPassport(numeroPassport: string): Observable<Voyageur | undefined> {
  return this.getVoyageurs().pipe(
    map((voyageurs: Voyageur[]) =>
      voyageurs.find(v => v.numeroPassport === numeroPassport)
    ),
    catchError(error => {
      console.error('Erreur lors de la recherche du voyageur :', error);
      return of(undefined);
    })
  );
}



  checkDbFileExists() {
    return this.http.get('src/assets/db.json', { responseType: 'text' }).pipe(
      catchError(err => {
        if (err.status === 404) {
          console.error('Fichier db.json introuvable');
        } else {
          console.error('Erreur lors du chargement :', err);
        }
        return of(null); // retourne null en cas d’erreur
      })
    );
  }


  
}
