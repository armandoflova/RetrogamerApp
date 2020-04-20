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
    }
}