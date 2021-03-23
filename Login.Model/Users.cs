using System;
using System.Collections.Generic;
using System.Text;

namespace Login.Model
{
    public class Users
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Adress { get; set; }
        public string Password { get; set; }
        public string PassworConfirm { get; set; }

    }
}
