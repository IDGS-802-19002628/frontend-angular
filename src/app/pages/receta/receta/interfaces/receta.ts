export interface Receta {
    productoIdProducto: number;
    materiasPrimas: { materiaPid: number; cantidadRequerida: number }[];
  }