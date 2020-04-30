using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using webapi.Data;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        public IRetrogamerRepositorio _repo { get; }
        public IMapper _mapper { get; }
        public PedidoController(IRetrogamerRepositorio repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }
        
    }
}