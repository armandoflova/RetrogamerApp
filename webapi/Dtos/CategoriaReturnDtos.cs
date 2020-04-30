using System.Collections.Generic;

namespace webapi.Dtos
{
    public class CategoriaReturnDtos
    {
         public int Id { get; set; }
        public string Descripcion { get; set; }
        public  ICollection<ProductoReturnDtos> Productos { get; set; } 
    }
}