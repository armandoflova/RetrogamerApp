using System;

namespace webapi.Models
{
    public class Foto
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public DateTime Fecha { get; set; }
        public bool Estado { get; set; }
        public string Url { get; set; }
        public bool EsPrincipal { get; set; }
        public virtual Producto Producto { get; set; }
        public int ProductoId { get; set; }
    }
}