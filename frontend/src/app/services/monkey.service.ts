import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Monkey } from '../models/monkey';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MonkeyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMonkeys(): Observable<Monkey[]> {
    return this.http.get<Monkey[]>(`${this.apiUrl}/monkeys`);
  }

  getMonkeyById(id: string): Observable<Monkey> {
    return this.http.get<Monkey>(`${this.apiUrl}/monkeys/${id}`);
  }

  addMonkey(formData: Monkey): Observable<Monkey> {
    return this.http.post<Monkey>(`${this.apiUrl}/monkeys`, formData);
  }

  updateMonkey(id: string, formData: Monkey): Observable<Monkey> {
    return this.http.put<Monkey>(`${this.apiUrl}/monkeys/${id}`, formData);
  }
}
