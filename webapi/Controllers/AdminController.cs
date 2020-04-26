using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Dtos;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        public IRetrogamerRepositorio _repo { get; }
        public IMapper _mapper { get; }
        public IWebHostEnvironment _env { get; }
        public AdminController(IRetrogamerRepositorio repo, IMapper mapper, IWebHostEnvironment environment)
        {
            _env = environment;
            _mapper = mapper;
            _repo = repo;

        }

        [HttpPost("Categoria")]

        public async Task<IActionResult> guardarCategoria(CategoriaGuardarDtos categoriaGuardar)
        {
            var CrearCategoria = _mapper.Map<Categoria>(categoriaGuardar);
            _repo.Agregar(CrearCategoria);

            if (await _repo.GuardarTodo())
                return Ok();
            throw new Exception("no se pudo guardar");
        }

        [HttpPost("Modelo")]
        public async Task<IActionResult> guardarModelo(ModeloGuardarDtos ModeloGuardar)
        {
            var CrearModelo = _mapper.Map<Modelo>(ModeloGuardar);
            _repo.Agregar(CrearModelo);

            if (await _repo.GuardarTodo())
                return Ok();
            throw new Exception("no se pudo guardar");
        }
        [HttpPost("Producto")]
        public async Task<IActionResult> guardarProducto(ProductoGuardarDtos productoGuardar)
        {
             if (await _repo.existeProducto(productoGuardar.Serie))
                return BadRequest("Nro de Serie ya existe");

            productoGuardar.Fecha_Registro = DateTime.Now;
            productoGuardar.Estado = true;
            productoGuardar.Cantidad = 1;
            var producto = _mapper.Map<Producto>(productoGuardar);
            _repo.Agregar(producto);
            if (await _repo.GuardarTodo())
                return Ok(producto);
            throw new Exception("No se pudo guardar");
        }

        [HttpGet("{productoId}/Fotos")]

        public async Task<IActionResult> ObtenerFotos(int productoId)
        {
            var fotos = await _repo.ObtenerFoto(productoId);
            var fotosReturn = _mapper.Map<IEnumerable<FotosReturnDtos>>(fotos);
            return Ok(fotosReturn);
        }

        [HttpGet("{id}/Foto", Name = "obtenerFoto")]

        public async Task<IActionResult> ObtenerFoto(int id)
        {
            var foto = await _repo.ObtenerFoto(id);
            var fotoReturn = _mapper.Map<FotosReturnDtos>(foto);
            return Ok(fotoReturn);
        }

        [HttpPost("{id}/Foto")]

        public async Task<IActionResult> subirFoto(int id, [FromForm]FotosCreacionDtos fotosCreacion)
        {
            var producto = await _repo.ObtenerProducto(id);
            var archivo = fotosCreacion.File;
            fotosCreacion.Fecha = DateTime.Now;
            if (archivo.Length == 0 || archivo == null)
                throw new Exception("el archivo no es valido");

            var imagePath = @"/upload/images/";
            var uploadPath = _env.WebRootPath + imagePath;

            //crear directorio

            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            //crear un unico nombre

            var nombreUnico = $"{id}{fotosCreacion.Fecha.ToString("yymmssfff")}_Retrogamer";
            var filename = Path.GetFileName(nombreUnico + "." + fotosCreacion.File.FileName.Split(".")[1].ToLower());
            string fullPath = uploadPath + filename;

            //imagePath = imagePath + @"\";
            var filePath = @".." + Path.Combine(imagePath + filename);
            using (var fileStream = new FileStream(fullPath, FileMode.Create))
            {
                await fotosCreacion.File.CopyToAsync(fileStream);
            }
            if (!producto.Fotos.Any(p => p.EsPrincipal))
                fotosCreacion.EsPrincipal = true;

            fotosCreacion.Url = filePath;
            fotosCreacion.ProductoId = id;
            fotosCreacion.Estado = true;
            var foto = _mapper.Map<Foto>(fotosCreacion);

            producto.Fotos.Add(foto);

            if (await _repo.GuardarTodo())
                return CreatedAtRoute("ObtenerFoto", new Foto { Id = foto.Id }, foto);

            return BadRequest("no se pudo cargar Foto");
        }

        [HttpPost("{id}/esPrincipal/{idFoto}")]
        public async Task<IActionResult> setPrincipal(int id, int idFoto)
        {
            var producto = await _repo.ObtenerProducto(id);
            if (!producto.Fotos.Any(f => f.Id == idFoto))
                return Unauthorized();
            var FotoRepo = await _repo.ObtenerFoto(idFoto);

            if (FotoRepo.EsPrincipal)
                return BadRequest("Esta foto ya es Principal");

            var fotoActual = await _repo.obtenerFotoActual(id);
            fotoActual.EsPrincipal = false;
            FotoRepo.EsPrincipal = true;

            if (await _repo.GuardarTodo())
                return NoContent();
            return BadRequest("no se pudo establecer como foto principal");

        }

        [HttpPut("editar/{idFoto}")]

        public async Task<IActionResult> EditarFoto(int idFoto, FotoGuardarDtos fotoGuardar)
        {
            var Foto = await _repo.ObtenerFoto(idFoto);
            if (Foto.EsPrincipal)
                return BadRequest("No se actualizaron los datos de imagen");
            _mapper.Map(fotoGuardar, Foto);
            if (await _repo.GuardarTodo())
                return NoContent();
            return BadRequest("No se actualizaron los datos de imagen");
        }

        [HttpGet("Producto")]

        public async Task<IActionResult> ObtenerProductos()
        {
            var productos = await _repo.ObtenerProductosAdmin();
            return Ok(productos);
        }

        [HttpPut("{productoId}")]

        public async Task<IActionResult> editarProduto(int productoId, ProductoGuardarDtos productoGuardar)
        {
            var producto = await _repo.ObtenerProducto(productoId);
            _mapper.Map(productoGuardar , producto);
            if(await _repo.GuardarTodo())
                return NoContent();
            throw new Exception("No se pudo editar Proyecto");
        }

    }
}