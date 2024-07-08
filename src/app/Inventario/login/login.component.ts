import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient, private service: ServiceService, private router: Router) {}

  login(): void {
    this.http.post<{ token: string }>('http://localhost:8092/login', { username: this.username, password: this.password })
      .subscribe(response => {
        // Establece el token en el servicio
        this.service.setToken(response.token);
        // Navega a otra ruta
        this.router.navigate(['listar']);
      }, error => {
        console.error('Error de autenticación', error);
      });
  }
}
