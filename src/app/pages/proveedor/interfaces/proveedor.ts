export interface Proveedor {
    idProveedor: number;
    nombre: string;
    telefono?: string;
    email?: string;
    direccion?: string;
    status: 1 | 2;
}
