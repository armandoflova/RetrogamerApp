using System;
using System.Collections.Generic;

namespace webapi.Dtos
{
    public class PedidoReturnDtos
    {
        public int Id { get; set; }
        public bool Estado { get; set; }
        public DateTime Fecha_Registro { get; set; }
        public DateTime Fecha_Entrega { get; set; }
        public int UserId { get; set; }
        public float PrecioTotal { get; set; }
        public virtual ICollection<ProductoPedidoReturnDtos> ProductosPedidos {get; set;}
    }
}