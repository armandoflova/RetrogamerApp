export interface ProductoPedido {
    id: number;
    productoId: number;
    pedidoId?: number;
    precio: number;
    descuento: number;
}
