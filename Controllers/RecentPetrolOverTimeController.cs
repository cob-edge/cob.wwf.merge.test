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
    public class RecentPetrolOverTimeController : ControllerBase
    {
        private readonly ILogger<RecentPetrolOverTimeController> _logger;

        public RecentPetrolOverTimeController(ILogger<RecentPetrolOverTimeController> logger)
        {
            _logger = logger;
        }

        //GET METHOD FOR PAGE TWELVE CHART 4
        [HttpGet]
        public RecentPetrolOverTime Get()
        {
            Connect();
            Read();
            return recentPetrolOverTime; 
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


        private RecentPetrolOverTime recentPetrolOverTime;
        public void Read() //could me modified for specific queires, then just retreive whole table
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@"
               SELECT TOP (50) [SensorId], [V2], [TimeStamp] 
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
            recentPetrolOverTime = new RecentPetrolOverTime();

            double total = 0;
            foreach (DataRow row in Results.Rows)
            {
               total = total + (int)row["V2"];
            }
            if(size == 0) { size = 1; } //incase of zero
            double average = total / size;

            double daily = average / 15.0 * 60 * 60 * 24; //sim is generate value every 15 seconds math to get dailey value
            double weekly = daily * 7;
            double monthly = weekly * 4;
            double yearly = monthly * 12;

            recentPetrolOverTime.Recent4 = new double[]{ daily, weekly, monthly, yearly };
        }
    }
}

public class RecentPetrolOverTime
{
    public double[] Recent4 { get; set; }
}
