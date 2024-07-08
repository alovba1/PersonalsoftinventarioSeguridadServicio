import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inventario } from 'src/app/Modelo/Inventario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private Url = 'http://localhost:8092/inventario';
  private token: string | null = null; // Aquí almacenas el token JWT

  constructor(private http: HttpClient) {}

  // Configura las cabeceras para incluir el token
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  // Métodos del servicio
  get(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.Url, { headers: this.getHeaders() });
  }

  create(inventario: Inventario): Observable<Inventario> {
    return this.http.post<Inventario>(this.Url, inventario, { headers: this.getHeaders() });
  }

  getId(id: number): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.Url}/${id}`, { headers: this.getHeaders() });
  }

  update(inventario: Inventario): Observable<Inventario> {
    return this.http.put<Inventario>(`${this.Url}/${inventario.id}`, inventario, { headers: this.getHeaders() });
  }

  // Método para establecer el token
  setToken(token: string): void {
    this.token = token;
  }

  // Método para obtener el token
  getToken(): string | null {
    return this.token;
  }
}
