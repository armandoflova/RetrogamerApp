using System.ComponentModel.DataAnnotations;

namespace webapi.Dtos
{
    public class UserLoginDtos
    {
        [Required]
        public string Email { get; set; }
        [MinLength(8)]
        public string Password { get; set; } 
    }
}