using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Dtos;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public IRetrogamerRepositorio _repo { get; }
        public IMapper _mapper { get; }
        public UserController(IRetrogamerRepositorio repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet("{idUsuario}")]

        public async Task<IActionResult> obtenerUsuario(int idUsuario) {
            var Usuario = await _repo.ObtenerUsuario(idUsuario);
            var usuarioReturn = _mapper.Map<UserReturnDtos>(Usuario);
            return Ok(usuarioReturn);
        }
    }
}