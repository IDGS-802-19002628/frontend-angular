export interface Produccion {
    idProduccion: number; // Asegúrate de que el ID sea un número
    recetaId: string;     // Asegúrate de que recetaId sea un string
    cantidad: number;     // Asegúrate de que cantidad sea un número
    estado: string;       // El estado puede ser un string
    fechaRegistro: Date; // Asegúrate de que fechaRegistro sea un Date
    // Si tu modelo tiene propiedades adicionales, agrégalas aquí
}