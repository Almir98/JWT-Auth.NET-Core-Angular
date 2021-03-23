using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Login.Model;
using Login.WebApi.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Login.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {
        private readonly ICustomerService _service;
        private readonly IConfiguration _config;

        public CustomerController(ICustomerService service,IConfiguration config)
        {
            _service = service;
            _config = config;
        }

        [HttpGet("{id}")]
        public Model.Users GetUser(int id)
        {
            return _service.getUser(id);
        }

        [HttpPut("{id}")]
        public Model.Users Update(int id,CustomerUpsert request)
        {
            return _service.Update(id, request);
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody]Model.Users customer)
        {
            if (_service.Exist(customer.Email))
            {
                return BadRequest("Customer already exist");
            }
            _service.Register(customer);
            return StatusCode(200 + 1);
        }

        [HttpPost("login")]
        public IActionResult Login(UserLoginVM user)
        {
            var userRepos = _service.Login(user.Email.ToLower(), user.Password);

            if (userRepos == null)
            {
                return Unauthorized();
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,userRepos.UserId.ToString()),
                new Claim(ClaimTypes.Name,userRepos.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}