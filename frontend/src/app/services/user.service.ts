import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

const API_URL = 'http://localhost:8080'; // Backend API URL

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   * Get current user information
   */
  getCurrentUser(): Observable<any> {
    const token = this.authService.getToken();
    
    if (!token) {
      return throwError(() => new Error('User not authenticated'));
    }
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<any>(`${API_URL}/users/current`, { headers })
      .pipe(
        tap(user => console.log('User data retrieved:', user)),
        catchError(error => {
          console.error('Error fetching user data:', error);
          return throwError(() => new Error('Failed to fetch user data. Please try again.'));
        })
      );
  }

  /**
   * Get user by username
   */
  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/users/${username}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching user data:', error);
          return throwError(() => new Error('Failed to fetch user data. Please try again.'));
        })
      );
  }

  /**
   * Update user information
   */
  updateUser(userData: any): Observable<any> {
    const token = this.authService.getToken();
    
    if (!token) {
      return throwError(() => new Error('User not authenticated'));
    }
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.put<any>(`${API_URL}/users/update`, userData, { headers })
      .pipe(
        tap(response => console.log('User data updated:', response)),
        catchError(error => {
          console.error('Error updating user data:', error);
          return throwError(() => new Error('Failed to update user data. Please try again.'));
        })
      );
  }
}
