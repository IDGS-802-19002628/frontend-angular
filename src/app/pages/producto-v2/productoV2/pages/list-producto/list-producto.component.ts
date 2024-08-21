import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from '../../../servicios/productos.service';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css']
})
export class ListProductoComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }
}
