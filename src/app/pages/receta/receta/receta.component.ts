import { Component, OnInit } from '@angular/core';
import { RecetaService } from '../services/receta.service';
import { Producto } from '../../producto/interfaces/producto';
import { MateriaP } from './interfaces/materiaP';
import { Receta } from './interfaces/receta';
import { RecetaAgrupada } from './interfaces/receta-agrupada';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaFormComponent implements OnInit {
  receta: Receta = {
    productoIdProducto: 0,
    materiasPrimas: [
      { materiaPid: 0, cantidadRequerida: 0 }
    ]
  };

  productos: Producto[] = [];
  materiasPrimas: MateriaP[] = [];
  recetasAgrupadas: RecetaAgrupada[] = [];
  isLoading = true;
  showForm = false;

  constructor(private recetaService: RecetaService) {}

  ngOnInit(): void {
    this.getProductos();
    this.getMateriaP();
    this.obtenerRecetas();
  }

  getProductos(): void {
    this.recetaService.getProductos().subscribe(
      (data: any) => {
        this.productos = data.$values;
        this.isLoading = false;
      },
      error => {
        Swal.fire('Error', 'Error al obtener los productos.', 'error');
        this.isLoading = false;
      }
    );
  }

  getMateriaP(): void {
    this.recetaService.getMateriaP().subscribe(
      (data: any) => {
        this.materiasPrimas = data.$values;
        this.isLoading = false;
      },
      error => {
        Swal.fire('Error', 'Error al obtener los materiales.', 'error');
        this.isLoading = false;
      }
    );
  }

  obtenerRecetas(): void {
    this.recetaService.obtenerRecetas().subscribe({
      next: (data) => {
        this.recetasAgrupadas = data;
        this.isLoading = false;
      },
      error: (error) => {
        Swal.fire('Error', 'Error al obtener las recetas.', 'error');
        this.isLoading = false;
      },
      complete: () => {
        console.log('Recetas obtenidas correctamente.');
      }
    });
}


  agregarMateriaPrima() {
    this.receta.materiasPrimas.push({ materiaPid: 0, cantidadRequerida: 0 });
  }

  removerMateriaPrima(index: number) {
    this.receta.materiasPrimas.splice(index, 1);
  }

  registrarReceta() {
    if (this.receta.productoIdProducto === 0) {
      Swal.fire('Error', 'Debe seleccionar un producto.', 'error');
      return;
    }

    for (let mp of this.receta.materiasPrimas) {
      if (mp.materiaPid === 0 || mp.cantidadRequerida <= 0) {
        Swal.fire('Error', 'Debe seleccionar una materia prima y una cantidad válida.', 'error');
        return;
      }
    }

    const receta = {
      productoIdProducto: Number(this.receta.productoIdProducto),
      materiasPrimas: this.receta.materiasPrimas.map(mp => ({
        materiaPid: Number(mp.materiaPid),
        cantidadRequerida: mp.cantidadRequerida
      }))
    };

    this.recetaService.registrarReceta(receta).subscribe(
    response => {
      console.log('Receta registrada:', response); // Verificar la respuesta recibida
      Swal.fire('Éxito', 'Receta registrada con éxito.', 'success');
      this.obtenerRecetas();  // Actualiza la lista de recetas después de registrar una nueva
      this.resetForm();
    },
    error => {
      console.error('Error al registrar la receta:', error); // Mostrar más detalles del error en la consola
      Swal.fire('Error', 'Error al registrar la receta.', 'error');
    }
  );
    
    this.recetaService.registrarReceta(receta).subscribe(
      response => {
        Swal.fire('Éxito', 'Receta registrada con éxito.', 'success');
        this.obtenerRecetas();  // Actualiza la lista de recetas después de registrar una nueva
        this.resetForm();
      },
      error => {
        Swal.fire('Error', 'Error al registrar la receta.', 'error');
      }
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  resetForm() {
    this.receta = {
      productoIdProducto: 0,
      materiasPrimas: [
        { materiaPid: 0, cantidadRequerida: 0 }
      ]
    };
  }
}
