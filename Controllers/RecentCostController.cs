using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using System.Data;

namespace Harley.UAT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecentCostController : ControllerBase
    {
        private readonly ILogger<RecentCostController> _logger;

        public RecentCostController(ILogger<RecentCostController> logger)
        {
            _logger = logger;
        }

        //get method for api
        [HttpGet("{id}")]
        public RecentCost Get(int id)
        {
            Connect();
            Read(id);
            return recentCost; 
        }

        //connect to database object 
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

        private RecentCost recentCost;
        public void Read(int User_ID) //could me modified for specific queires, then just retreive whole table
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@"
               SELECT TOP (10) From_Address, To_Address, Gas, Timestamp
                  FROM [dbo].[Block Transactions]
                  WHERE [From_Address] = (SELECT ew.Wallet_ID
                                                FROM [dbo].[User] u
                                          INNER JOIN [dbo].[Ethereum Wallet] ew ON u.[User_ID] = ew.[User_ID]
                                                WHERE u.[User_ID] = '" + User_ID + @"')
                  ORDER BY Timestamp DESC;", sqlc);
            DataTable Results = new DataTable();
            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            int SizeRecent10 = Results.Rows.Count;
            sqlc.Close();

            //Set database objects into a array, that can then be passed to webpage
            recentCost = new RecentCost();
            recentCost.Recent10 = new double[SizeRecent10];
            int i = 0;
            foreach (DataRow row in Results.Rows)
            {
                recentCost.Recent10[i] = (int)row["Gas"];
                i++;
            }
        }
    }
}

public class RecentCost
{
    public double[] Recent10 { get; set; }
}
