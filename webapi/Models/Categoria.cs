using System.Collections.Generic;

namespace webapi.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public virtual ICollection<Producto> Productos { get; set; } 
    }
}