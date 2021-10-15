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
    public class RecentCostVehicleController : ControllerBase
    {
        private readonly ILogger<RecentCostVehicleController> _logger;

        public RecentCostVehicleController(ILogger<RecentCostVehicleController> logger)
        {
            _logger = logger;
        }

        //GET METHOD FOR PAGE THIRTEEN CHART 3 CHART 4 
        [HttpGet("{id}")]
        public RecentCostVehicle Get(int id)
        {
            Connect();
            Read(id);
            return recentCostVehicle; 
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
        private RecentCostVehicle recentCostVehicle;
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

            recentCostVehicle = new RecentCostVehicle(); // max value from table
            recentCostVehicle.Vehicle_Regs = new string[size];
            recentCostVehicle.Vehicle_Costs = new Int64[size][];
            recentCostVehicle.Vehicle_CostAuds = new double[size][];

            int j = 0;
            foreach (DataRow row in Results.Rows)
            {
                int Vehicle_ID = (int)row["Vehicle_ID"];
                recentCostVehicle.Vehicle_Regs[j] = row["VehicleReg"].ToString();
                getGasCar(Vehicle_ID, j);
                j++;
            }
        }

        public void getGasCar(int Vehicle_ID, int j)
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@"SELECT TOP 10 [Gas]
	                                            FROM [dbo].[Block Transactions]
	                                            WHERE [Vehicle_ID] = '" + Vehicle_ID + @"'
	                                            ORDER BY Timestamp DESC;", sqlc);

            DataTable Results = new DataTable();
            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            int size = Results.Rows.Count;
            sqlc.Close();

            recentCostVehicle.Vehicle_Costs[j] = new Int64[size];
            recentCostVehicle.Vehicle_CostAuds[j] = new double[size];
            int i = 0;
            foreach (DataRow row in Results.Rows)
            {
                recentCostVehicle.Vehicle_Costs[j][i] = (Int64)row["Gas"];
                recentCostVehicle.Vehicle_CostAuds[j][i] = (Int64)row["Gas"] * WeiToAudRatio;

                i++;
            }
        }
    }
}

public class RecentCostVehicle
{
    public string []Vehicle_Regs { get; set; }

    public Int64 [][]Vehicle_Costs { get; set; }

    public double [][]Vehicle_CostAuds { get; set; }
}


