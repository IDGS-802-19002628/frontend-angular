import { Component, OnInit } from '@angular/core';
import { ProductionV2Service } from '../../services/produccion-v2.service';
import { Producto } from 'src/app/pages/producto/interfaces/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-produccion-pendiente',
  templateUrl: './list-produccion-pendiente.component.html',
  styleUrls: ['./list-produccion-pendiente.component.scss']
})
export class ListProduccionPendienteComponent implements OnInit {
  productos: Producto[] = [];
  productions: any[] = [];
  
  newProduction: any = {
    recetaId: 0,
    cantidad: 0,
  };
  isLoading = true;

  constructor(private productionService: ProductionV2Service) {}

  ngOnInit(): void {
    this.getPendingProductions();
    this.getProductos();
  }

  getProductos(): void {
    this.productionService.getProductos().subscribe(
      (data: any) => {
        console.log('Productos obtenidos:', data.$values);
        this.productos = data.$values;
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener los productos:', error);
        this.isLoading = false;
      }
    );
  }

  getPendingProductions(): void {
    this.productionService.getProductions().subscribe(
      (data: any) => {
        this.productions = data.$values;
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener las producciones pendientes:', error);
        this.isLoading = false;
      }
    );
  }

  startProduction(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, iniciar producción!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.productionService.startProduction(id).subscribe(
          () => {
            Swal.fire('Iniciado!', 'La producción ha sido iniciada.', 'success');
            this.getPendingProductions();
          },
          error => {
            Swal.fire('Error!', 'Hubo un error al iniciar la producción.', 'error');
            this.isLoading = false;
          }
        );
      }
    });
  }

  completeProduction(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esto completará la producción.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, completar producción!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.productionService.completeProduction(id).subscribe(
          () => {
            Swal.fire('Completado!', 'La producción ha sido completada.', 'success');
            this.getPendingProductions();
          },
          error => {
            Swal.fire('Error!', 'Hubo un error al completar la producción.', 'error');
            this.isLoading = false;
          }
        );
      }
    });
  }

  cancelProduction(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esto cancelará la producción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar producción!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.productionService.cancelProduction(id).subscribe(
          () => {
            Swal.fire('Cancelado!', 'La producción ha sido cancelada.', 'success');
            this.getPendingProductions();
          },
          error => {
            Swal.fire('Error!', 'Hubo un error al cancelar la producción.', 'error');
            this.isLoading = false;
          }
        );
      }
    });
  }

  createProduction(): void {
    // Validaciones
    if (this.newProduction.recetaId <= 0) {
      Swal.fire('Error!', 'Selecciona una receta válida.', 'error');
      return;
    }
    if (this.newProduction.cantidad <= 0) {
      Swal.fire('Error!', 'La cantidad debe ser mayor que 0.', 'error');
      return;
    }

    Swal.fire({
      title: '¿Crear nueva producción?',
      text: "Esto registrará la nueva producción en el sistema.",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crear producción!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.productionService.createProduction(this.newProduction).subscribe(
          (data: any) => {
            Swal.fire('Creado!', 'La nueva producción ha sido registrada.', 'success');
            this.getPendingProductions();
            this.isLoading = false;
            this.newProduction = { recetaId: 0, cantidad: 0 }; // Reset form
          },
          error => {
            Swal.fire('Error!', 'Hubo un error al crear la producción.', 'error');
            this.isLoading = false;
          }
        );
      }
    });
  }

  doFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.productions = this.productions.filter(production => 
      production.receta?.producto.toLowerCase().includes(filterValue) ||
      production.cantidad.toString().includes(filterValue) ||
      production.estado.toLowerCase().includes(filterValue) ||
      production.fechaRegistro.toString().includes(filterValue)
    );
  }
}
