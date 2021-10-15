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
    public class RecentSleepTimeOverTimeController : ControllerBase
    {
        private readonly ILogger<RecentSleepTimeOverTimeController> _logger;

        public RecentSleepTimeOverTimeController(ILogger<RecentSleepTimeOverTimeController> logger)
        {
            _logger = logger;
        }

        //GET METHOD FOR PAGE TWELVE CHART 3
        [HttpGet]
        public RecentSleepTimeOverTime Get()
        {
            Connect();
            Read();
            return recentSleepTimeOverTime; 
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

        private RecentSleepTimeOverTime recentSleepTimeOverTime;
        public void Read() //could me modified for specific queires, then just retreive whole table
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@"
               SELECT TOP (50) [SensorId], [V3], [TimeStamp] 
                  FROM [dbo].[IOT]
	              WHERE [Type]='Vehicle'
	              ORDER BY [TimeStamp] DESC
               ", sqlc);

            DataTable Results = new DataTable();
            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            int size = Results.Rows.Count;
            sqlc.Close();

            //Set database objects into a array, that can then be passed to webpage
            recentSleepTimeOverTime = new RecentSleepTimeOverTime();

            double total = 0;
            foreach (DataRow row in Results.Rows)
            {
               total = total + (int)row["V3"];
            }
            if(size == 0) { size = 1; } //incase of zero
            double average = total / size;

            double daily = average / 15.0; //sim is generate value every 15 seconds math to get dailey value for 1 hour of driving average in a day 
            double weekly = daily * 7;
            double monthly = weekly * 4;
            double yearly = monthly * 12;

            recentSleepTimeOverTime.Recent4 = new double[]{ daily, weekly, monthly, yearly };
        }
    }
}

public class RecentSleepTimeOverTime
{
    public double[] Recent4 { get; set; }
}
