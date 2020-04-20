using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace webapi.Models
{
    public class User: IdentityUser<int>
    {
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string DNI { get; set; }
        public string Direccion { get; set; }
        public string Genero { get; set; }
        public bool Estado { get; set; }
        public DateTime Fecha_Nacimiento { get; set; }
        public DateTime Fecha_Registro { get; set; }
        public string Uri { get; set; }        
        public virtual Ubigeo Ubigeo { get; set; }
        public int UbigeoId { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; } 
    }
}