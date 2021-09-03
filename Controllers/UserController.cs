using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        private int i = 0;
        private int NextInt()
        {
            return i++;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            Connect();
            Read();

            return Enumerable.Range(5, 10).Select(index => new User
            {
                User_ID = UserData[i].User_ID,
                User_FirstName = UserData[i].User_FirstName,
                User_LastName = UserData[i].User_LastName,
                UserType = UserData[i].UserType,
                User_Email = UserData[NextInt()].User_Email
            })

            .ToArray();
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

        public void Read()
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand
            (@"SELECT TOP 10 * FROM [dbo].[User]", sqlc);
            //(@"SELECT TOP 10 [User_ID], [User_FirstName], [User_LastName], [UserType] FROM [dbo].[User]", sqlc);
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
                    UserType = row["UserType"].ToString(),
                    User_Email = row["User_Email"].ToString()
                };
                i++;
            }
        }  
    }
}