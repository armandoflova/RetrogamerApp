using System;

namespace webapi.Dtos
{
    public class FotoGuardarDtos
    {
        public string Descripcion { get; set; }
        public DateTime Fecha { get; set; }
        public bool Estado { get; set; }
        public string Url { get; set; }
        public bool EsPrincipal { get; set; }
        public int ProductoId { get; set; }
    }
}