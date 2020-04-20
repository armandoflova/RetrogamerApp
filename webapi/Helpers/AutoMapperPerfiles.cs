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
        }
    }
}