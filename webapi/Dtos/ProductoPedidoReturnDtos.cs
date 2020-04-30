namespace webapi.Dtos
{
    public class ProductoPedidoReturnDtos
    {
         public int Id { get; set; }
        public int ProductoId { get; set; }
        public int PedidoId { get; set; }
        public float Precio { get; set; }
        public float Descuento { get; set; } 
    }
}