
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Inventario } from 'src/app/Modelo/Inventario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent  {
  id:number=0;
  producto="";
  cantidad:number=0;


  dataInventario!: Inventario;
  ids=0;

  constructor(private router:Router, private service:ServiceService) {
  
  }

  Guardar()
  {

    const inventario = new Inventario(
      this.id,
      this.producto,
      this.cantidad
   
      );
  
  
    this.service.create(inventario).subscribe(
      data=>{
        alert("se agrego con exito el registro"+this.id);
       this.router.navigate(["listar"]);
      },
      error=>{
             }
    )
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
    this.service.getId(this.ids).subscribe(
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
