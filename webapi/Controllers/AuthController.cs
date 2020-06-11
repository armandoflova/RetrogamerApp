using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using webapi.Dtos;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public IConfiguration _configuration { get; }
        public UserManager<User> _userManager { get; }
        public SignInManager<User> _signInManager { get; }
        public IMapper _mapper { get; }
        
        
        public AuthController(IConfiguration configuration, UserManager<User> userManager,
         SignInManager<User> signInManager, IMapper mapper)
        {
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Loguear(UserLoginDtos usuarioLogin)
        {
            var usuario = await _userManager.FindByEmailAsync(usuarioLogin.Email);
            if(usuario == null) {
                return BadRequest("No Existe usuario");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(usuario, usuarioLogin.Password, false);

            if (result.Succeeded)
            {
                var userMap = _mapper.Map<UserReturnDtos>(usuario);
                return Ok(new
                {
                    token = await GenerarJWT(usuario),
                    user = userMap
                });
            }

            return Unauthorized();
        }

        [HttpPost("Registro")]

        public async Task<IActionResult> Registrar(UserRegisterDtos usuarioRegistro)
        {
            usuarioRegistro.UserName = usuarioRegistro.Email;
            var NuevoUsuario = _mapper.Map<User>(usuarioRegistro);
            var result = await _userManager.CreateAsync(NuevoUsuario, usuarioRegistro.Password);
                      await  _userManager.AddToRoleAsync(NuevoUsuario , "Miembro");
            var usuarioReturn = _mapper.Map<UserReturnDtos>(NuevoUsuario);
            
            if (result.Succeeded)
            {
              return Ok(usuarioReturn);
            }

            return BadRequest(result.Errors);
        }



        private async Task<string> GenerarJWT(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier , user.Id.ToString()),
                new Claim(ClaimTypes.Name , user.Nombres)
            };

            var Roles = await _userManager.GetRolesAsync(user);

            foreach (var role in Roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var key = new SymmetricSecurityKey(Encoding.UTF32.GetBytes(_configuration.GetSection("AppSettings:token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenhandler = new JwtSecurityTokenHandler();

            var token = tokenhandler.CreateToken(tokenDescriptor);

            return tokenhandler.WriteToken(token);
        }

         [HttpPost("Social")]

        public async Task<IActionResult> loginSocial(UserRegisterDtos usuarioRegistro)
        {
             var usuario = await _userManager.FindByEmailAsync(usuarioRegistro.Email);
             if(usuario != null)
             {
                 var result = await _signInManager.CheckPasswordSignInAsync(usuario, usuarioRegistro.Password, false);
                 if(result.Succeeded)
                 {
                        var userMap = _mapper.Map<UserReturnDtos>(usuario);
                        return Ok(new
                        {
                            token = await GenerarJWT(usuario),
                            user = userMap
                        });
                 }

                 return Unauthorized();
            }else {
                usuarioRegistro.UserName = usuarioRegistro.Email;
                var NuevoUsuario = _mapper.Map<User>(usuarioRegistro);
                var result = await _userManager.CreateAsync(NuevoUsuario, usuarioRegistro.Password);
                     await  _userManager.AddToRoleAsync(NuevoUsuario , "Miembro");
                var usuarioReturn = _mapper.Map<UserReturnDtos>(NuevoUsuario);
                
                if (result.Succeeded)
                {
                     var usuarioCreado = await _userManager.FindByEmailAsync(usuarioRegistro.Email);
                     var userMap = _mapper.Map<UserReturnDtos>(usuario);
                        return Ok(new
                        {
                            token = await GenerarJWT(usuarioCreado),
                            user = userMap
                        });
                }

                return BadRequest(result.Errors);
             }

        }
    }
}