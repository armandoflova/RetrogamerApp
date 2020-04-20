using System;

namespace webapi.Dtos
{
    public class UserRegisterDtos
    {
         public string UserName { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string DNI { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int UbigeoId { get; set; }
        public string Direccion { get; set; }
        public DateTime Fecha_Registro { get; set; }
        public DateTime Fecha_Nacimiento { get; set; }
        public string Uri { get; set; }
        public string Password { get; set; }
        public string Genero { get; set; }
        public UserRegisterDtos()
        {
            UserName = Email;
            Fecha_Registro = DateTime.Now;
        }
        
    }
}