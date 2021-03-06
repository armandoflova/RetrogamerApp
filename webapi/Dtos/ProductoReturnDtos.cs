using System;
using System.Collections.Generic;

namespace webapi.Dtos
{
    public class ProductoReturnDtos
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int ModeloId { get; set; }
        public string Serie { get; set; }
        public string Marca { get; set; }
        public int Cantidad { get; set; }
        public string urlPrincipal { get; set; }
        public DateTime Fecha_Registro { get; set; }
        public bool Estado { get; set; }
        public float Precio_Compra { get; set; }
        public float Precio_Venta { get; set; }
        public int UserId { get; set; }
        public  ICollection<FotosReturnDtos> Fotos{ get; set; }
        public int CategoriaId { get; set; }
    }
}