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
    public class RecentBlockTimeDifController : ControllerBase
    {
        private readonly ILogger<RecentBlockTimeDifController> _logger;

        public RecentBlockTimeDifController(ILogger<RecentBlockTimeDifController> logger)
        {
            _logger = logger;
        }

        //GET METHOD FOR PAGE TwentyTwo CHART 1 
        [HttpGet]
        public RecentBlockTimeDif Get()
        {
            Connect();
            Read();
            return recentBlockTimeDif; 
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
        private RecentBlockTimeDif recentBlockTimeDif;
        public void Read() //could me modified for specific queires, then just retreive whole table
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@"SELECT TOP (11) [Timestamp] FROM [dbo].[Block Transactions] 
	                                            ORDER BY [Timestamp] DESC;", sqlc);
            DataTable Results = new DataTable();
            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            int size = Results.Rows.Count;
            sqlc.Close();

            //Set database objects into a array, that can then be passed to webpage
            int []recentTimeStampRecent11 = new int[size];
            int i = 0;
            foreach (DataRow row in Results.Rows)
            {
                recentTimeStampRecent11[i] = (int)row["Timestamp"];
                i++;
            }

            //Set actuall array to have difference in values
            recentBlockTimeDif = new RecentBlockTimeDif();
            recentBlockTimeDif.Recent10 = new int[size - 1]; //-1 becuase array will be subtracting against values 
            for(i = 0; i < (size - 1); i++)
            {
                recentBlockTimeDif.Recent10[i] = recentTimeStampRecent11[i] - recentTimeStampRecent11[i + 1];
                i++;
            }
        }
    }
}

public class RecentBlockTimeDif
{
    public int []Recent10 { get; set; }
}


