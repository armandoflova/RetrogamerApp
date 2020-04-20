using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Data
{
     public class DataContext : IdentityDbContext<User, Role, int , IdentityUserClaim<int>,
    UserRole , IdentityUserLogin<int> , IdentityRoleClaim<int> , IdentityUserToken<int>>  
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}
         public DbSet<Pedido> Pedidos {get; set;}
         public DbSet<Producto> Productos { get; set; }
         public DbSet<Foto> Fotos { get; set; }
         public DbSet<Categoria> Categorias { get; set; }
         public DbSet<ProductoPedido> ProductoPedidos { get; set; }
         public DbSet<Modelo> Modelos { get; set; }       
         public DbSet<Ubigeo> Ubigeos { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
           base.OnModelCreating(builder);
            builder.Entity<UserRole>(UserRole => {
                // UserRole.HasKey(ur => new {ur.UserId , ur.RoleId});

                UserRole.HasOne(ur => ur.Role)
                 .WithMany( r => r.UserRoles)
                 .HasForeignKey(ur => ur.RoleId)
                 .IsRequired();

                UserRole.HasOne(ur => ur.User)
                 .WithMany( r => r.UserRoles)
                 .HasForeignKey(ur => ur.UserId)
                 .IsRequired();
            });

             builder.Entity<ProductoPedido>(productopedido => {
               productopedido.HasKey(pp => new {pp.ProductoId , pp.PedidoId});

               productopedido.HasOne(pp => pp.Producto)
                  .WithMany( pr =>  pr.ProductoPedidos)
                  .HasForeignKey(pp => pp.ProductoId)
                   .OnDelete(DeleteBehavior.Restrict);

                productopedido.HasOne(pp => pp.Pedido)
                  .WithMany( pe =>  pe.ProductosPedidos)
                  .HasForeignKey(pp => pp.PedidoId)
                  .OnDelete(DeleteBehavior.Restrict);
             });
                
        }
    }
}