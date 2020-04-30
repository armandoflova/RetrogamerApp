using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Dtos;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetrogamerController : ControllerBase
    {
        public IRetrogamerRepositorio _repo { get; }
        public IMapper _mapper { get; }
        public RetrogamerController(IRetrogamerRepositorio repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }
        [HttpGet ("Categoria/{idCategoria}")]
        public async Task<IActionResult> obtenerCategoria(int idCategoria) {
            var categoria = await _repo.ObtenerCategoria(idCategoria);
            var categoriaReturn = _mapper.Map<CategoriaReturnDtos>(categoria);
            return Ok(categoriaReturn);
        }
        [HttpGet ("Categoria")]
        public async Task<IActionResult> obtenerCategorias() {
            var categorias = await _repo.ObtenerCategorias();
            var categoriasReturn = _mapper.Map<IEnumerable<CategoriaReturnDtos>>(categorias);
            return Ok(categoriasReturn);
        }
        [HttpGet ("Modelo/{idModelo}")]
        public async Task<IActionResult> obtenerModelo(int idModelo) {
            var Modelo = await _repo.ObtenerModelo(idModelo);
            return Ok(Modelo);
        }
        [HttpGet ("Modelo")]
        public async Task<IActionResult> obtenerModelos() {
            var Modelos = await _repo.ObtenerModelos();
            return Ok(Modelos);
        }
        [HttpGet ("Producto/{idProducto}")]
        public async Task<IActionResult> obtenerProducto(int idProducto) {
            var Producto = await _repo.ObtenerProducto(idProducto);
            var productoreturn = _mapper.Map<ProductoReturnDtos>(Producto);
            return Ok(productoreturn);
        }
        [HttpGet ("ProductoVenta/{idProducto}")]
        public async Task<IActionResult> obtenerProductoVenta(int idProducto) {
            var productoVenta = await _repo.ObtenerProductoVenta(idProducto);
            return Ok(productoVenta);
        }
        [HttpGet ("Producto")]
        public async Task<IActionResult> obtenerProductos() {
            var Productos = await _repo.ObtenerProductos();
            var productosReturn = _mapper.Map<IEnumerable<ProductoReturnDtos>>(Productos);
            return Ok(productosReturn);
        }
        [HttpGet ("Ubigeo/{idPadreUbigeo}")]
        public async Task<IActionResult> obtenerUbigeos(int idPadreUbigeo) {
            var Ubigeos = await _repo.ObtenerUbigeo(idPadreUbigeo);
            var ubiegeoReturn = _mapper.Map<IEnumerable<UbigeoReturnDtos>>(Ubigeos);
            return Ok(ubiegeoReturn);
        }
       
         [HttpGet("{productoId}/Fotos")]

        public async Task<IActionResult> ObtenerFotos(int productoId)
        {
            var fotos = await _repo.ObtenerFotos(productoId);
            var fotosReturn = _mapper.Map<IEnumerable<FotosReturnDtos>>(fotos);
            return Ok(fotosReturn);
        }
         [HttpGet("{usuarioId}/Pedido")]

        public async Task<IActionResult> ObtenerPedido(int usuarioId)
        {
            var pedidos = await _repo.ObtenerPedidosUsuario(usuarioId);
            var pedidosReturn = _mapper.Map<IEnumerable<PedidoReturnDtos>>(pedidos);
            return Ok(pedidosReturn);
        }

        [HttpPost("{usuarioId}/Pedido")]

        public async Task<IActionResult> GuardarPedido(int usuarioId , PedidoGuardarDtos pedidoGuardar ) {
             if (usuarioId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                 return Unauthorized();
            
             var  CrearPedido= _mapper.Map<Pedido>(pedidoGuardar);
            _repo.Agregar(CrearPedido);

            if (await _repo.GuardarTodo())
                return Ok();
            throw new Exception("no se pudo guardar");
            
        }

        

        

        
    }
}