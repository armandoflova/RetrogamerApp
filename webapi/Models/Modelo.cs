using System.Collections.Generic;

namespace webapi.Models
{
    public class Modelo
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<Producto> Productos {get; set;}
    }
}