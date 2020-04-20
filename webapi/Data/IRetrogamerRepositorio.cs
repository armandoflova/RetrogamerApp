using System.Collections.Generic;
using System.Threading.Tasks;
using webapi.Models;

namespace webapi.Data
{
    public interface IRetrogamerRepositorio
    {
        void Agregar<T>(T entity) where T : class;
        void Eliminar<T>(T entity) where T : class;
        Task<bool> GuardarTodo();
        public Task<Categoria> ObtenerCategoria(int idCategoria);
        public Task<IEnumerable<Categoria>> ObtenerCategorias();
        public Task<Modelo> ObtenerModelo(int idModelo);
        public Task<IEnumerable<Modelo>> ObtenerModelos();
        public Task<Producto> ObtenerProducto(int idProducto);
        public Task<IEnumerable<Producto>> ObtenerProductos();

        public Task<IEnumerable<Ubigeo>> ObtenerUbigeo(int idPadreUbigeo);
        public Task<User> ObtenerUsuario(int idUsuario);
        

    }
}