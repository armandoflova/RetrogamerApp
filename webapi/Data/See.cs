using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using webapi.Models;

namespace webapi.Data
{
    public class See
    {
        public static void SeedUbigeos(DataContext context)
        {
            if (!context.Ubigeos.Any())
            {
                var ubigeoData = System.IO.File.ReadAllText("Data/DataUbigeo.json");
                var ubigeos = JsonConvert.DeserializeObject<List<Ubigeo>>(ubigeoData);
                foreach( var ubigeo in ubigeos)
                {
                    context.Ubigeos.Add(ubigeo);
                }
                context.SaveChanges();
            }
        }
    }
}