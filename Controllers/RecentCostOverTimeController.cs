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
    public class RecentCostOverTimeController : ControllerBase
    {
        private readonly ILogger<RecentCostOverTimeController> _logger;

        public RecentCostOverTimeController(ILogger<RecentCostOverTimeController> logger)
        {
            _logger = logger;
        }

        //GET METHOD FOR PAGE TWELVE CHART 1 
        [HttpGet("{id}")]
        public RecentCostOverTime Get(int id)
        {
            Connect();
            Read(id);
            return recentCostOverTime;
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

        private static double WeiToAudRatio = 0.0000000000000045;
        private RecentCostOverTime recentCostOverTime;
        public void Read(int User_ID) //could me modified for specific queires, then just retreive whole table
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@"
                SELECT TOP (100000) [Gas]
                  FROM [dbo].[Block Transactions]
                  WHERE [User_ID] = '" + User_ID + @"'
                  ORDER BY Timestamp DESC;", sqlc);

            DataTable Results = new DataTable();
            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            int size = Results.Rows.Count;
            sqlc.Close();

            //Set database objects into a array, that can then be passed to webpage
            recentCostOverTime = new RecentCostOverTime();

            Int64 total = 0;
            foreach (DataRow row in Results.Rows)
            {
                total = total + (Int64)row["Gas"];
            }
            if(size == 0) { size = 1; } //incase of zero
            Int64 average = total / size;

            Int64 daily = average / 15 * 60 * 60 * 24; //sim is generate value every 15 seconds math to get dailey value
            Int64 weekly = daily * 7;
            Int64 monthly = weekly * 4;
            Int64 yearly = monthly * 12;

            recentCostOverTime.Recent4 = new Int64[]{ daily, weekly, monthly, yearly };
            recentCostOverTime.Recent4Aud = new double[]{ (daily* WeiToAudRatio), (weekly* WeiToAudRatio), (monthly* WeiToAudRatio), (yearly* WeiToAudRatio) };
        }
    }
}

public class RecentCostOverTime
{
    public Int64[] Recent4 { get; set; }

    public double[] Recent4Aud { get; set; }
}
