import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
//import { catchError, tap } from 'rxjs/operators';
import { backendUrl } from '../environement/environement';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(private http : HttpClient) { 
  }

  CreateNewPublication(publication : any) : Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${backendUrl}/publications`, publication, { headers });
  }

}
