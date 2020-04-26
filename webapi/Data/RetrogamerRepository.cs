using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Data
{
    public class RetrogamerRepository: IRetrogamerRepositorio
    {
        public DataContext _context { get; }
        public RetrogamerRepository(DataContext context)
        {
            _context = context;

        }
        public void Agregar<T>(T entity) where T : class
        {
             _context.Add(entity);
        }

        public void Eliminar<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> GuardarTodo()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        
        public async Task<Categoria> ObtenerCategoria(int idCategoria)
        {
            var categoria = await _context.Categorias.FirstOrDefaultAsync(c => c.Id == idCategoria);
            return categoria;
        }

        public async Task<IEnumerable<Categoria>> ObtenerCategorias()
        {
            var categorias = await _context.Categorias.ToListAsync();

            return categorias;
        }
        public async Task<Modelo> ObtenerModelo(int idModelo)
        {
           var modelo = await _context.Modelos.FirstOrDefaultAsync(m => m.Id == idModelo);
           return modelo;
        }

        public async Task<IEnumerable<Modelo>> ObtenerModelos()
        {
            var modelos = await _context.Modelos.ToListAsync();
            return modelos;
        }

        public async Task<Producto> ObtenerProducto(int idProducto)
        {
            var Producto = await _context.Productos.FirstOrDefaultAsync(p => p.Id == idProducto);
            return Producto;
        }

        public async Task<IEnumerable<Producto>> ObtenerProductos()
        {
            var productos = await _context.Productos.ToListAsync();
            return productos;
        }

        public async Task<IEnumerable<Ubigeo>> ObtenerUbigeo(int idPadreUbigeo)
        {
            var ubigeos = await _context.Ubigeos.Where(u => u.id_padre_ubigeo == idPadreUbigeo).ToListAsync();
            return ubigeos;
        }

        public async Task<User> ObtenerUsuario(int idUsuario)
        {
            var usuario = await _context.Users.FirstOrDefaultAsync(u => u.Id == idUsuario);
            return usuario;
        }

         public async Task<IEnumerable<Foto>> ObtenerFotos(int idProducto)
        {
            var fotos =  _context.Fotos.Where(x => x.ProductoId == idProducto).AsQueryable();
            fotos = fotos.Where(f => f.Estado == true);
            return await fotos.ToListAsync();
        }

        public async Task<Foto> ObtenerFoto(int idFoto)
        {
            var foto = await _context.Fotos.FirstOrDefaultAsync(x => x.Id == idFoto);
            return foto;
        }

        public async Task<bool> existeProducto(string serie)
        {
            if( await _context.Productos.AnyAsync( p => p.Serie == serie)) {
                return true;
            }

            return false;
        }
        public async Task<bool> existeModelo(string descripcion)
        {
            if( await _context.Modelos.AnyAsync( m => m.Descripcion == descripcion)) {
                return true;
            }

            return false;
        }
        public async Task<bool> existeCategoria(string descripcion)
        {
            if( await _context.Categorias.AnyAsync( c => c.Descripcion == descripcion)) {
                return true;
            }

            return false;
        }

           public async Task<Foto> obtenerFotoActual(int idProducto)
        {
           var fotoActual = await _context.Fotos.Where(f => f.ProductoId == idProducto).FirstOrDefaultAsync(f => f.EsPrincipal);
           return fotoActual;
        }

        public async Task<IEnumerable<object>> ObtenerProductosAdmin()
        {
            var producto = await (from p in _context.Productos 
                            join m in _context.Modelos on 
                            p.ModeloId equals m.Id
                            join c in _context.Categorias
                            on p.CategoriaId equals c.Id
                            orderby p.Fecha_Registro descending
                            select new {
                                Id = p.Id,
                                Nombre = p.Nombre,
                                Categoria = c.Descripcion,
                                Modelo = m.Descripcion,
                                Marca = p.Marca,
                                Cantidad = p.Cantidad,
                                PrecioCompra = p.Precio_Compra,
                                PrecioVenta = p.Precio_Venta,
                                Fecha = p.Fecha_Registro,
                                Estado = p.Estado,
                            } ).ToListAsync();
            return producto;
        }
    }
}