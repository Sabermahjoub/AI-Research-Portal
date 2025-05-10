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

    // Ensure we have the user ID from the token
    const currentUser = this.authService.currentUserValue;
    if (!currentUser || !currentUser.id) {
      // Try to extract user ID from JWT token
      const jwtData = this.parseJwt(token);
      if (jwtData && jwtData.UserId) {
        userData.id = jwtData.UserId;
      } else {
        return throwError(() => new Error('User ID not found'));
      }
    } else {
      userData.id = currentUser.id;
    }

    console.log('Updating user with data:', userData);

    return this.http.put<any>(`${API_URL}/users/update`, userData, { headers })
      .pipe(
        tap(response => {
          console.log('User data updated:', response);

          // Update the current user in auth service
          const updatedUser = {
            ...this.authService.currentUserValue,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            address: userData.address,
            workAddress: userData.workAddress,
            jobTitle: userData.jobTitle
          };

          // Store updated user info in localStorage
          if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          }
        }),
        catchError(error => {
          console.error('Error updating user data:', error);
          return throwError(() => new Error('Failed to update user data. Please try again.'));
        })
      );
  }

  /**
   * Parse JWT token to get user information
   */
  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error parsing JWT token:', e);
      return null;
    }
  }
}
