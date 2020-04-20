import { Producto } from './Producto';

export interface Modelo {
    id: number;
    descripcion: string;
    productos?: Producto[];
}
