import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

const API_URL = 'http://localhost:8080'; // Backend API URL - adjust if your backend runs on a different port

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isBrowser ? this.hasToken() : false);
    this.currentUserSubject = new BehaviorSubject<any>(this.isBrowser ? this.getUserFromStorage() : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Check if token exists
  private hasToken(): boolean {
    if (!this.isBrowser) return false;
    return !!localStorage.getItem('token');
  }

  // Get current authentication status
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Get user from local storage
  private getUserFromStorage(): any {
    if (!this.isBrowser) return null;
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Get current user value
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Login user
  login(username: string, password: string): Observable<any> {
    console.log(`Attempting login for user: ${username}`);

    // Use responseType: 'text' to handle the JWT token as a string, not JSON
    return this.http.post(`${API_URL}/users/login`, { username, password }, {
      responseType: 'text',
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(token => {
        console.log('Login successful, received token');

        // Store JWT token if we're in a browser and token is valid
        if (token && token !== 'Failure' && this.isBrowser) {
          localStorage.setItem('token', token);

          // Store basic user info
          const user = {
            username: username
          };
          localStorage.setItem('currentUser', JSON.stringify(user));

          // Update subjects
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
        }
      }),
      catchError(error => {
        console.error('Login error:', error);

        // If we get a 200 status but a parsing error, it might be a successful login
        if (error.status === 200) {
          console.log('Login might have succeeded despite error');

          // Try to extract the token from the error response
          const token = error.error?.text || error.error?.toString() || '';

          if (token && token.startsWith('eyJ') && this.isBrowser) {
            // Looks like a JWT token
            localStorage.setItem('token', token);

            // Store basic user info
            const user = {
              username: username
            };
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Update subjects
            this.currentUserSubject.next(user);
            this.isAuthenticatedSubject.next(true);

            // Return the token
            return of(token);
          }
        }

        return throwError(() => new Error('Login failed. Please check your credentials.'));
      })
    );
  }

  // Register new user (Chercheur)
  register(chercheur: any): Observable<any> {
    // Ensure we're using the correct endpoint for Chercheur registration
    console.log(`Calling API: ${API_URL}/users/register with data:`, chercheur);

    // Try with the correct endpoint based on the backend controller
    return this.http.post<any>(`${API_URL}/users/register`, chercheur, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(response => {
        console.log('Registration response:', response);
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(() => new Error(error.error?.message || 'Registration failed. Please try again.'));
      })
    );
  }

  // Logout user
  logout(): void {
    if (this.isBrowser) {
      // Remove user and token from local storage
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
    }

    // Update subjects
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);

    // Navigate to login page
    this.router.navigate(['/login']);
  }

  // Get auth token
  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('token');
  }

  // Get HTTP options with Authorization header
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
