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
    public class LoginController : ControllerBase
    {
        //GLOBAL VALUES FOR LOGIN INFORMATION ACCROSS WEBSITE

        private int GlobalUser_ID = -1;

        //GLOBAL VALUES FOR LOGIN INFORMATION ACCROSS WEBSITE

        private readonly ILogger<LoginController> _logger;

        public LoginController(ILogger<LoginController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public int Get() //get user information after calling post method if need be
        {
            return GlobalUser_ID; 
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
            catch (Exception e2)
            {
                Console.WriteLine("SQL Connection Exception: " + e2.Message);
            }
        }

        private User[] UserData;
        public void ReadUserData()
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
                    User_Email = row["User_Email"].ToString()
                };
                i++;
            }
        }

        [HttpPost]
        public int Post(Login login)
        {
            Console.WriteLine("helllloooooo >>> Email : " + login.login_Email_Input + " Password : " + login.login_Password_Input);
            
            login.login_Email_Input.Trim();
            if (login.login_Email_Input.Contains('@')) //check if valid email 
            {
                //check if it matches in sql data base
                try
                {
                    int User_ID = GetUser_ID(login.login_Email_Input);
                    if(User_ID != -1)
                    {
                        Console.WriteLine("helllloooooo >>> User_ID : " + User_ID);
                        GlobalUser_ID = User_ID; //setting user id for accross multiple signed in graphs and queries
                        return GlobalUser_ID;
                    }
                    else
                    {
                        return -1;
                    }
                }
                catch
                {
                    return -1;
                }
            }
            return -1;
        }

        public int GetUser_ID(string login_Email_Input)
        {
            ReadUserData();

            foreach(User user in UserData)
            {
                if(user.User_Email.Trim().Equals(login_Email_Input))
                {
                    return user.User_ID;
                }
            }
            return -1;
        }
    }

    public class Login {
        public string login_Email_Input { get; set; }
        public string login_Password_Input { get; set; }
    }
}