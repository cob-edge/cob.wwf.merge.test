using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

namespace Harley.UAT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{ip}")]
        public User Get(string ip)
        {
            int User_ID = GetUser_ID(ip);
            int User_Pos = User_ID - 1;

            if(User_ID != -1)
            {
                return new User
                {
                    User_ID = UserData[User_Pos].User_ID,
                    User_FirstName = UserData[User_Pos].User_FirstName,
                    User_LastName = UserData[User_Pos].User_LastName,
                    User_Type = UserData[User_Pos].User_Type,
                    User_Email = UserData[User_Pos].User_Email,
                    User_PhoneNo = UserData[User_Pos].User_PhoneNo,
                    User_Address_Street = UserData[User_Pos].User_Address_Street,
                    User_Address_City = UserData[User_Pos].User_Address_City,
                    User_Address_Postcode = UserData[User_Pos].User_Address_Postcode,
                    User_LicenseNo = UserData[User_Pos].User_LicenseNo,
                    User_LicenseExp = UserData[User_Pos].User_LicenseExp,
                    User_IP_Address = UserData[User_Pos].User_IP_Address
                };
            }
            //Console.WriteLine("Here with the null!");
            return null;
        }

        public int GetUser_ID(string ipAddress)
        {
            Read();

            foreach (User user in UserData)
            {
                if (user.User_IP_Address == null)
                {
                    //nothing
                } if (user.User_IP_Address.Equals(ipAddress)) {
                    return user.User_ID;
                }
            }
            return -1;
        }

        private static SqlConnection sqlc;
        public void Connect()
        {
            String connectionString = "Server=tcp:cob-edge.database.windows.net,1433;Initial Catalog=IoTDB;Persist Security Info=False;User ID=cob.edge.admin;Password=Aoed7Test;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            
            try
            {
                if (!String.IsNullOrEmpty(connectionString))
                {
                    sqlc = new SqlConnection(connectionString);
                    Console.WriteLine("Connected to SQL Server");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("SQL Connection Exception: " + e.Message);
            }
        }

        private User[] UserData;
        public void Read()
        {
            Connect();

            //Read DB table 
            SqlCommand cmd = new SqlCommand
            (@"SELECT * FROM [dbo].[User]", sqlc);
            DataTable Results = new DataTable();

            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            int UserSize = Results.Rows.Count;
            sqlc.Close();

            UserData = new User[UserSize];
            int i = 0;

            foreach (DataRow row in Results.Rows)
            {
                UserData[i] = new User
                {
                    User_ID = (int)row["User_ID"],
                    User_FirstName = row["User_FirstName"].ToString(),
                    User_LastName = row["User_LastName"].ToString(),
                    User_Type = row["UserType"].ToString(),
                    User_Email = row["User_Email"].ToString(),
                    User_PhoneNo = row["User_PhoneNo"].ToString(),
                    User_Address_Street = row["User_Address_Street"].ToString(),
                    User_Address_City = row["User_Address_City"].ToString(),
                    User_Address_Postcode = (int)row["User_Address_Postcode"],
                    User_LicenseNo = row["User_LicenseNo"].ToString(),
                    User_LicenseExp = row["User_LicenseExp"].ToString(),
                    User_IP_Address = row["User_IP_Address"].ToString()
                };
                i++;
            }    
        }

        [HttpPost]
        public string Post(User user)
        {
            try
            {
                Connect();
                string query = @"INSERT INTO [dbo].[User] (User_ID, User_FirstName, User_LastName, UserType, User_Email)
                VALUES('" + user.User_ID + @"', 
                       '" + user.User_FirstName + @"', 
                       '" + user.User_LastName + @"',
                       '" + user.User_Type + @"',
                       '" + user.User_Email + @"');";

                DataTable Results = new DataTable();
                using (var cmd = new SqlCommand(query, sqlc))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(Results);
                }
                return "{\"Message\": \"Succesful\"}";
            } 
            catch (Exception)
            {
                return "{\"Message\": \"Unsucessful\"}";
            }
        }
    }
}