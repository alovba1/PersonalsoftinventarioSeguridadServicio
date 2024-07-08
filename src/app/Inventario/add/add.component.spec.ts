import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AddComponent } from './add.component';
import { ServiceService } from 'src/app/Service/service.service';
import { FormsModule } from '@angular/forms';
import { Inventario } from 'src/app/Modelo/Inventario';
import { of } from 'rxjs';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let service: ServiceService;
  let httpMock: HttpTestingController;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [AddComponent],
      providers: [
        ServiceService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ServiceService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should call create and navigate to listar on success', () => {
    component.id = 1;
    component.producto = 'Producto Test';
    component.cantidad = 10;

    const mockInventario: Inventario = new Inventario(
      component.id,
      component.producto,
      component.cantidad
    );

    component.Guardar();

    const req = httpMock.expectOne('http://localhost:8092/inventario');
    expect(req.request.method).toBe('POST');
    req.flush(mockInventario);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['listar']);
    expect(req.request.body).toEqual(jasmine.objectContaining({
      id: mockInventario.id,
      producto: mockInventario.producto,
      cantidad: mockInventario.cantidad
    }));
    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify();
  });
});