namespace webapi.Models
{
    public class ProductoPedido
    {
        public int Id { get; set; }
        public virtual Producto Producto { get; set; }

        public int ProductoId { get; set; }
        public virtual Pedido Pedido { get; set; }

        public int PedidoId { get; set; }
        public float Precio { get; set; }
        public float Descuento { get; set; } 
    }
}