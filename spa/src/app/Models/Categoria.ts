import { Producto } from './Producto';

export interface Categoria {
    id: number;
    descripcion: string;
    productos?: Producto[];
}
