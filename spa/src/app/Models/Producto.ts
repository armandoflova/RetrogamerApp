import { Foto } from './Foto';

export interface Producto {
    id: number;
    nombre?: string;
    descripcion: string;
    modeloId: number;
    categoriaId: number;
    serie: string;
    marca: string;
    urlPrincipal: string;
    fecha_Registro: Date;
    cantidad: number;
    estado: boolean;
    precio_Compra: number;
    precio_Venta: number;
    userId: any;
    fotos?: Foto[];
}
