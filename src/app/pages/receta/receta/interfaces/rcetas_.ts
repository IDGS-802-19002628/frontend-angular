export interface RecetaAgrupadas {
    ProductoNombre: string;
    Recetas: {
      IdReceta: number;
      MateriasPrimas: {
        Nombre: string;
        CantidadRequerida: number;
      }[];
    }[];
  }
  