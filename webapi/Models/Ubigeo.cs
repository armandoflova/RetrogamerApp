using System.Collections.Generic;

namespace webapi.Models
{
    public class Ubigeo
    {
        public int Id { get; set; }
        public int id_ubigeo { get; set; }
        public string nombre_ubigeo { get; set; }
        public int codigo_ubigeo { get; set; }
        public string etiqueta_ubigeo { get; set; }
        public string buscador_ubigeo { get; set; }
        public int numero_hijos_ubigeo { get; set; }
        public int nivel_ubigeo { get; set; }
        public int id_padre_ubigeo { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}