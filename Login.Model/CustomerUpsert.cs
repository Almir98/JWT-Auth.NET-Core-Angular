using System;
using System.Collections.Generic;
using System.Text;

namespace Login.Model
{
    public class CustomerUpsert
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
    }
}
