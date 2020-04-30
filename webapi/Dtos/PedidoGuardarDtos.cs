using System;

namespace webapi.Dtos
{
    public class PedidoGuardarDtos
    {
        public bool Estado { get; set; }
        public DateTime Fecha_Registro { get; set; }
        public DateTime Fecha_Entrega { get; set; }
         public int UserId { get; set; }
         public float PrecioTotal { get; set; }
    }
}