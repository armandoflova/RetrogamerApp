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
        Task<Categoria> ObtenerCategoria(int idCategoria);
        Task<IEnumerable<Categoria>> ObtenerCategorias();
        Task<Modelo> ObtenerModelo(int idModelo);
        Task<IEnumerable<Modelo>> ObtenerModelos();
        Task<Producto> ObtenerProducto(int idProducto);
        Task<IEnumerable<Producto>> ObtenerProductos();

        Task<IEnumerable<Ubigeo>> ObtenerUbigeo(int idPadreUbigeo);
        Task<User> ObtenerUsuario(int idUsuario);
        Task<Foto> ObtenerFoto(int idFoto);
         Task<bool> existeProducto(string serie);
         Task<Foto> obtenerFotoActual(int idProducto);
         Task<bool> existeModelo(string descripcion);
         Task<bool> existeCategoria(string descripcion);
         Task<IEnumerable<Foto>> ObtenerFotos(int idProduto);
         Task<IEnumerable<object>> ObtenerProductosAdmin();
         Task<object> ObtenerProductoVenta(int idProducto);
         Task<IEnumerable<Pedido>> ObtenerPedidos();
         Task<IEnumerable<Pedido>> ObtenerPedidosUsuario(int idUsuario);
         Task<Pedido> ObtenerPedido(int idPedido);
    }
}