export interface Producto {
  idProducto?: number;      // Identificador único del producto
  nombre: string;         // Nombre del producto
  descripcion: string;    // Descripción del producto
  precio: number;         // Precio del producto
  rutaImagen?: string;     // Ruta de la imagen del producto
  stock?: number | undefined;          // Cantidad en stock del producto
  idCategoria?: number;    // Identificador de la categoría del producto
  status?: number;         // Estado del producto (por ejemplo, activo/inactivo)
}
