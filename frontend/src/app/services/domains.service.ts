import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { backendUrl } from '../environement/environement';

export interface Domain {
  domainId : Number
  domainName : String,
  domainDesc : any
}

@Injectable({
  providedIn: 'root'
})
export class DomainsService {

  constructor(private http : HttpClient) { }

  getAllDomains() : Observable<String[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Domain[]>(`${backendUrl}/domains`, { headers })
      .pipe(
        map((domains: Domain[]) => domains.map(domain => domain.domainName))
      );
  }


}