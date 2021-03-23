using Login.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Login.WebApi.Interfaces
{
    public interface ICustomerService
    {
        Model.Users getUser(int id);
        Model.Users Register(Model.Users request);
        Model.Users Login(string email, string password);
        Model.Users Update(int id, CustomerUpsert customer);
        bool Exist(string username);
    }
}
