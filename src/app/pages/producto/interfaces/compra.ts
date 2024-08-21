import { Producto } from "./producto";

export interface Compra {
    productos: Producto[];
    cantidadTotal: number;
  }