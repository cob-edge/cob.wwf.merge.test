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
    public class RecentCostVehicleOverTimeController : ControllerBase
    {
        private readonly ILogger<RecentCostVehicleOverTimeController> _logger;

        public RecentCostVehicleOverTimeController(ILogger<RecentCostVehicleOverTimeController> logger)
        {
            _logger = logger;
        }

        //GET METHOD FOR PAGE THIRTEEN CHART 1 CHART 2 
        [HttpGet("{id}")]
        public RecentCostVehicleOverTime Get(int id)
        {
            Connect();
            Read(id);
            return recentCostVehicleOverTime; 
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
        private RecentCostVehicleOverTime recentCostVehicleOverTime;
        public void Read(int User_ID) //could me modified for specific queires, then just retreive whole table
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@" SELECT * FROM [dbo].[Vehicle]
	                                                WHERE [User_ID] = '" + User_ID + @"';", sqlc);

            DataTable Results = new DataTable();
            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            int size = Results.Rows.Count;
            sqlc.Close();

            //Set database objects into a array, that can then be passed to webpage

            recentCostVehicleOverTime = new RecentCostVehicleOverTime(); // max value from table
            recentCostVehicleOverTime.Vehicle_Regs = new string[size];
            recentCostVehicleOverTime.Vehicle_CostDailyAuds = new double[size];
            recentCostVehicleOverTime.Vehicle_CostYearlyAuds = new double[size];

            int i = 0;
            foreach (DataRow row in Results.Rows)
            {
                int Vehicle_ID = (int)row["Vehicle_ID"];
                Int64 average = getGasCar(Vehicle_ID);

                Int64 daily = average / 15 * 60 * 60 * 6; //sim is generate value every 15 seconds math to get dailey value driving is using cars 6 hours per day 
                Int64 yearly = daily * 7 * 4 * 12;

                recentCostVehicleOverTime.Vehicle_Regs[i] = row["VehicleReg"].ToString();
                recentCostVehicleOverTime.Vehicle_CostDailyAuds[i] = daily * WeiToAudRatio;
                recentCostVehicleOverTime.Vehicle_CostYearlyAuds[i] = yearly * WeiToAudRatio;
                i++;
            }
        }

        public Int64 getGasCar(int Vehicle_ID)
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@"SELECT [Gas]
	                                          FROM [dbo].[Block Transactions]
	                                          WHERE [Vehicle_ID] = '" + Vehicle_ID + @"';", sqlc);

            DataTable Results = new DataTable();
            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            int size = Results.Rows.Count;
            sqlc.Close();

            Int64 total = 0;
            foreach (DataRow row in Results.Rows)
            {
                total = total + (Int64)row["Gas"];
            }
            if (size == 0) { size = 1; } //incase of zero
            Int64 average = total / size;

            return average;
        }
    }
}

public class RecentCostVehicleOverTime
{
    public string []Vehicle_Regs { get; set; }

    public double []Vehicle_CostDailyAuds { get; set; }

    public double []Vehicle_CostYearlyAuds { get; set; }
}


