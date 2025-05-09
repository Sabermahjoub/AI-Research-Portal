import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { backendUrl } from '../environement/environement';
import { Publication } from './publications.service';

@Injectable({
  providedIn: 'root'
})
export class PendingPublicationsService {

  constructor(private http: HttpClient) { }

  getAllPendingPublications() : Observable<Publication[]> {
    return this.http.get<Publication[]>(`${backendUrl}/publications/get_all_by_acceptance/false`).pipe(
      catchError(error => {
        console.error('Error fetching pending publications:', error);
        return throwError(() => error);
      })
    );
  }

  updatePublication(publication : Publication) : Observable<Publication> {
    return this.http.put<Publication>(`${backendUrl}/publications`, publication).pipe(
      catchError(error => {
        console.error('Error updating publication', error);
        return throwError(() => error);
      })
    );
  }

}
