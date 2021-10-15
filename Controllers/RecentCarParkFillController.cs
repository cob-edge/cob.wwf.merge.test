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
    public class RecentCarParkFillController : ControllerBase
    {
        private readonly ILogger<RecentCarParkFillController> _logger;

        public RecentCarParkFillController(ILogger<RecentCarParkFillController> logger)
        {
            _logger = logger;
        }

        //GET METHOD FOR PAGE ELEVEN CHART 1 CHART 2 
        [HttpGet]
        public RecentCarParkFill Get()
        {
            Connect();
            Read();
            return recentCarParkFill; 
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

        //private static double WeiToAudRatio = 0.0000000000000045;
        private RecentCarParkFill recentCarParkFill;
        public void Read() //could me modified for specific queires, then just retreive whole table
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@"SELECT * FROM [dbo].[Car Park] ", sqlc);
            DataTable Results = new DataTable();
            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            int size = Results.Rows.Count;
            sqlc.Close();

            //Set database objects into a array, that can then be passed to webpage
            recentCarParkFill = new RecentCarParkFill();
            recentCarParkFill.Recent4 = new double[size];
            int i = 0;
            foreach (DataRow row in Results.Rows)
            {
                int cap = (int)row["Capacity"];
                recentCarParkFill.Recent4[i] = (int)row["Occupied"] / ((double)cap) * 100.0;
                i++;
            }
        }
    }
}

public class RecentCarParkFill
{
    public double[] Recent4 { get; set; }
}
