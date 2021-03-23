using AutoMapper;
using Login.Model;
using Login.WebApi.Database;
using Login.WebApi.Helper;
using Login.WebApi.Interfaces;
using System;
using System.Linq;

namespace Login.WebApi.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly testContext _context;
        private readonly IMapper _mapper;

        public CustomerService(testContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public bool Exist(string email)
        {
            Database.Users user = _context.Users.FirstOrDefault(e => e.Email == email);
            if (user !=null)
                return true;
            return false;
        }

        public Model.Users getUser(int id)
        {
            Database.Users user = _context.Users.FirstOrDefault(e => e.UserId == id);
            if(user == null)
            {
                throw new Exception("User don't exist");
            }
            return _mapper.Map<Model.Users>(user);
        }

        public Model.Users Login(string email, string password)
        {
            Database.Users user = _context.Users.FirstOrDefault(e => e.Email == email);
            if(user != null)
            {
                var newHash = HashGenerator.GenerateHash(user.PasswordSalt, password);

                if(newHash == user.PasswordHash)
                {
                    return _mapper.Map<Model.Users>(user);
                }
            }
            return null;
        }

        public Model.Users Register(Model.Users request)
        {
            if(request.Password != request.PassworConfirm)
            {
                throw new Exception("Passwords don't match");
            }
            Database.Users user = _mapper.Map<Database.Users>(request);

            user.PasswordSalt = HashGenerator.GenerateSalt();
            user.PasswordHash = HashGenerator.GenerateHash(user.PasswordSalt, request.Password);

            _context.Users.Add(user);
            _context.SaveChanges();

            return _mapper.Map<Model.Users>(user);
        }

        public Model.Users Update(int id, CustomerUpsert customer)
        {
            Database.Users user = _context.Users.FirstOrDefault(e => e.UserId == id);
            if(user == null)
            {
                throw new Exception("User don't exist");
            }
            _context.Users.Attach(user);
            _context.Users.Update(user);
            _mapper.Map(customer, user);

            _context.SaveChanges();
            return _mapper.Map<Model.Users>(user);
        }
    }
}
