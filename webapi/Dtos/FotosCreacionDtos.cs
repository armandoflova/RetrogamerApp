using System;
using Microsoft.AspNetCore.Http;

namespace webapi.Dtos
{
    public class FotosCreacionDtos
    {
         public IFormFile File { get; set; }
        public string Descripcion { get; set; }
        public DateTime Fecha { get; set; }
        public bool Estado { get; set; }
        public string Url { get; set; }
        public bool EsPrincipal { get; set; }
        public int ProductoId { get; set; }

    }
}