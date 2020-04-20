using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Dtos;

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
            return Ok(categoria);
        }
        [HttpGet ("Categoria")]
        public async Task<IActionResult> obtenerCategorias() {
            var categorias = await _repo.ObtenerCategorias();
            return Ok(categorias);
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
            return Ok(Producto);
        }
        [HttpGet ("Producto")]
        public async Task<IActionResult> obtenerProductos() {
            var Productos = await _repo.ObtenerProductos();
            return Ok(Productos);
        }
        [HttpGet ("Ubigeo/{idPadreUbigeo}")]
        public async Task<IActionResult> obtenerUbigeos(int idPadreUbigeo) {
            var Ubigeos = await _repo.ObtenerUbigeo(idPadreUbigeo);
            var ubiegeoReturn = _mapper.Map<IEnumerable<UbigeoReturnDtos>>(Ubigeos);
            return Ok(ubiegeoReturn);
        }
       


        
    }
}