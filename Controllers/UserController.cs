﻿using System;
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

        private int i = 0;
        private int NextInt() { return i++; }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            Read();

            return Enumerable.Range(1, 10).Select(index => new User
            {
                User_ID = UserData[i].User_ID,
                User_FirstName = UserData[i].User_FirstName,
                User_LastName = UserData[i].User_LastName,
                User_Type = UserData[i].User_Type,
                User_Email = UserData[i].User_Email,
                User_PhoneNo = UserData[i].User_PhoneNo,
                User_Address_Street = UserData[i].User_Address_Street,
                User_Address_City = UserData[i].User_Address_City,
                User_Address_Postcode = UserData[i].User_Address_Postcode,
                User_LicenseNo = UserData[i].User_LicenseNo,
                User_LicenseExp = UserData[NextInt()].User_LicenseExp
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
            Connect();

            //Read DB table 
            SqlCommand cmd = new SqlCommand
            (@"SELECT TOP 10 * FROM [dbo].[User]", sqlc);
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
                    User_LicenseExp = row["User_LicenseExp"].ToString()
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
                string query = @"INSERT INTO [dbo].[User] (User_ID, User_FirstName, User_LastName, UserType)
                VALUES(300, 'Test', 'Jarvis', 'A');";

                DataTable Results = new DataTable();
                using (var cmd = new SqlCommand(query, sqlc))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(Results);
                }
                return "Succesful";
            } 
            catch (Exception)
            {
                return "Unsuccesful";
            }
        }
    }
}