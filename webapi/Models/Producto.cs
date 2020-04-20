using System;
using System.Collections.Generic;

namespace webapi.Models
{
    public class Producto
    {  public int Id { get; set; }
        public string Descripcion { get; set; }
        public virtual Modelo Modelo { get; set; }
        public int ModeloId { get; set; }
        public string Serie { get; set; }
        public string Marca { get; set; }
        public int Cantidad { get; set; }
        public string urlPrincipal { get; set; }
        public DateTime Fecha_Registro { get; set; }
        public bool Estado { get; set; }
        public float Precio_Compra { get; set; }
        public float Precio_Venta { get; set; }
        public virtual User User { get; set; }
        public int UserId { get; set; }
        public virtual  ICollection<Foto> Fotos{ get; set; }
        public virtual Categoria Categoria { get; set; }
        public virtual ICollection<ProductoPedido>  ProductoPedidos { get; set; }
        public int CategoriaId { get; set; }
    }
}