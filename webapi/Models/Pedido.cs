using System;
using System.Collections.Generic;

namespace webapi.Models
{
    public class Pedido
    {
         public int Id { get; set; }
        public bool Estado { get; set; }
        public DateTime Fecha_Registro { get; set; }
        public DateTime Fecha_Entrega { get; set; }
        public virtual User Comprador { get; set; }
        public int UserId { get; set; }
        public float PrecioTotal { get; set; }
        public virtual ICollection<ProductoPedido> ProductosPedidos {get; set;}
    }
}