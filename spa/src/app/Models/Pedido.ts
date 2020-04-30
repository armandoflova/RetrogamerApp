import { ProductoPedido } from './ProductoPedido';

export interface Pedido {
    id: number;
    estado: boolean;
    fecha_Registro: Date;
    fecha_Entrga: Date;
    userId: number;
    precioTotal: number;
    productoPedido: ProductoPedido[];
}
