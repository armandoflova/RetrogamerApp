using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using webapi.Data;

namespace webapi
{
    public class Program
    {
        public static void Main(string[] args)
        {
          var host = CreateHostBuilder(args).Build();
          using ( var scope = host.Services.CreateScope())
          {
              var Services = scope.ServiceProvider;
              try
              {
                  var context = Services.GetRequiredService<DataContext>();
                  context.Database.Migrate();
                  See.SeedUbigeos(context);

              }
              catch (Exception ex)
              {
                var logger = Services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex , "Ocurrio un error durante la migracion");
              }
          }

          host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
