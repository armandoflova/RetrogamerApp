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
        }
    }
}