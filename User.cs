using System;

namespace Harley.UAT
{
    public class User
    {

        //block chain user class
        public int User_ID { get; set; }

        public string User_FirstName { get; set; }

        public string User_LastName { get; set; }

        public string User_Type { get; set; }

        public string User_Email { get; set; }

        private string User_Password { get; set; } // password should not be accessed at any point private

        public string User_PhoneNo { get; set; }

        public string User_Address_Street { get; set; }

        public string User_Address_City { get; set; }

        public int User_Address_Postcode { get; set; }

        public string User_LicenseNo { get; set; }

        public string User_LicenseExp { get; set; }
    }
}
