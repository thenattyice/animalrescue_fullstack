import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dog } from '../models/dog';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDogs(): Observable<Dog[]> {
    return this.http.get<Dog[]>(`${this.apiUrl}/dogs`);
  }

  getDogById(id: string): Observable<Dog> {
    return this.http.get<Dog>(`${this.apiUrl}/dogs/${id}`);
  }

  addDog(formData: Dog): Observable<Dog> {
    return this.http.post<Dog>(`${this.apiUrl}/dogs`, formData);
  }

  updateDog(id: string, formData: Dog): Observable<Dog> {
    return this.http.put<Dog>(`${this.apiUrl}/dogs/${id}`, formData);
  }
}
