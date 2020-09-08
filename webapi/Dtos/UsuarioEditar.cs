namespace webapi.Dtos
{
    public class UsuarioEditar
    {
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string DNI { get; set; }
        public string Direccion { get; set; }

        public string Celular { get; set; }
        public bool Estado { get; set; }
       
        public int UbigeoId { get; set; }
        
    }
}