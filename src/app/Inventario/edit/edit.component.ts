import { Component } from '@angular/core';
import { Inventario } from 'src/app/Modelo/Inventario';
import { ServiceService } from 'src/app/Service/service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  dataInventario!: Inventario;
  id=0;
  constructor(private router:Router, private service:ServiceService) {
    
  }

  editar() {
    this.service.update(this.dataInventario).subscribe(
      (dataActualizada: Inventario) => {
        this.dataInventario = dataActualizada;
        console.log('Registro actualizado:', dataActualizada.producto);
        alert("Registro Actualizado");
        this.router.navigate(["listar"]);
      },
      (error) => {
        console.error('Error al actualizar el registro:', error);
        // Manejar el error según sea necesario
      }
    );
  }
  
    buscar() {
      this.service.getId(this.id).subscribe(
        (inventario: Inventario) => {
          this.dataInventario = inventario;
        },
        (error) => {
          console.error('Error al buscar id:', error);
          // Manejar el error según sea necesario
        }
      );
    }

}
