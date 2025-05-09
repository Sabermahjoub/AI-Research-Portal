import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { backendUrl } from '../environement/environement';

export interface Publication {
  id : number;
  title: string;
  description: string;
  publicationDate : string;
  domains: any[];
  accepted : boolean;
  admin : any | null;
  commentaires : any[];
  team : any[];
  content: File | null;
}

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(private http: HttpClient) { }

  getAllPublications() : Observable<Publication[]> {
    return this.http.get<Publication[]>(`${backendUrl}/publications/get_all_by_acceptance/true`).pipe(
      catchError(error => {
        console.error('Error fetching publications:', error);
        return throwError(() => error);
      })
    );
  }

  CreateNewPublication(publication: any): Observable<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('Authentication token not found');
      return throwError(() => new Error('Authentication token not found'));
    }
  
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // if (token) {
    //   headers = headers.set('Authorization', `Bearer ${token}`);
    //   headers = headers.set('Accept', '*/*'); 
    // }
    
    // const httpOptions = {headers};
  
    // console.log('Sending request with token:', token.substring(0, 10) + '...');
    // console.log('HTTP Options:', httpOptions);

    return this.http.post<any>(`${backendUrl}/publications`, publication)
      .pipe(
        catchError(error => {
          console.error('API Error:', error);
          if (error.status === 401) {
            console.error('Unauthorized: Token might be invalid, expired, or headers missing.');
          }
          return throwError(() => error);
        })
      );
  }
  
}