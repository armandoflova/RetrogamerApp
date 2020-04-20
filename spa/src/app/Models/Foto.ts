export interface Foto {
    id: number;
    descripcion: string;
    fecha: Date;
    estado: boolean;
    url: string;
    esPrincipal: boolean;
    productoId: number;
}
