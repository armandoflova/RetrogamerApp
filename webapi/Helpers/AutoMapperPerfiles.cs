using System.Linq;
using AutoMapper;
using webapi.Dtos;
using webapi.Models;

namespace webapi.Helpers
{
    public class AutoMapperPerfiles: Profile
    {
        public AutoMapperPerfiles()
        {
            CreateMap<User , UserReturnDtos>();
            CreateMap<UserRegisterDtos , User>();
            CreateMap<Ubigeo , UbigeoReturnDtos>();
            CreateMap<CategoriaGuardarDtos , Categoria>();
            CreateMap<ModeloGuardarDtos , Modelo>();
            CreateMap<ProductoGuardarDtos , Producto>();
            CreateMap<FotoGuardarDtos , Foto>();
            CreateMap<FotosCreacionDtos , Foto>();
            CreateMap<Foto , FotosReturnDtos>();
            CreateMap<Categoria , CategoriaReturnDtos>();
            CreateMap<Producto , ProductoReturnDtos>();
            CreateMap<Producto , ProductoReturnDtos>()
            .ForMember(dest => dest.urlPrincipal , opt => opt.MapFrom ( src => 
            src.Fotos.FirstOrDefault( f => f.EsPrincipal).Url));
            CreateMap<Pedido , PedidoReturnDtos>();
            CreateMap<PedidoGuardarDtos, Pedido>();
            CreateMap<UsuarioEditar , User>();
        }
    }
}