export interface RecetaAgrupada {
    ProductoNombre: string;
    Recetas: {
      IdReceta: number;
      MateriasPrimas: {
        Nombre: string;
        CantidadRequerida: number;
      }[];
    }[];
  }
  
  