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
    public class RecentPassengerAmountOverTimeController : ControllerBase
    {
        private readonly ILogger<RecentPassengerAmountOverTimeController> _logger;

        public RecentPassengerAmountOverTimeController(ILogger<RecentPassengerAmountOverTimeController> logger)
        {
            _logger = logger;
        }

        //GET METHOD FOR PAGE NINTEEN CHART 2
        [HttpGet]
        public RecentPassengerAmountOverTime Get(int id)
        {
            Connect();
            Read();
            return recentPassengerAmountOverTime; 
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
        private RecentPassengerAmountOverTime recentPassengerAmountOverTime;
        public void Read() //could me modified for specific queires, then just retreive whole table
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@" SELECT TOP (1000) *
                                                 FROM [dbo].[IOT]
                                                 WHERE Type = 'Static'
                                                 ORDER BY TimeStamp DESC;", sqlc);

            DataTable Results = new DataTable();
            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            int size = Results.Rows.Count;
            sqlc.Close();

            //Set database objects into a array, that can then be passed to webpage
            recentPassengerAmountOverTime = new RecentPassengerAmountOverTime();

            int total = 0;
            foreach (DataRow row in Results.Rows)
            {
                //given that a car has enter how many passengers
                if(((int)row["V1"]) == 1) //ie given that v1 is 1, the car has entered
                {
                    total = total + (int)row["V2"];
                } else
                {
                    //do nothing
                }
            }
            if(size == 0) { size = 1; } //incase of zero
            double average = ((double)total) / size;

            double daily = average / 15 * 60 * 60 * 24; //sim is generate value every 15 seconds math to get dailey value
            double weekly = daily * 7;
            double monthly = weekly * 4;
            double yearly = monthly * 12;

            recentPassengerAmountOverTime.Recent4 = new double[]{ daily, weekly, monthly, yearly };
        }
    }
}

public class RecentPassengerAmountOverTime
{
    public double[] Recent4 { get; set; }
}
