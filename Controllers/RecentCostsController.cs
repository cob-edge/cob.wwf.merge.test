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
    public class RecentCostsController : ControllerBase
    {
        private readonly ILogger<RecentCostsController> _logger;

        public RecentCostsController(ILogger<RecentCostsController> logger)
        {
            _logger = logger;
        }

        //GET METHOD FOR PAGE THIRTEEN CHART 3 CHART 4 
        [HttpGet("{segment5}")]
        public RecentCosts Get(int segment5)
        {
            Connect();
            Read(segment5);
            return recentCosts; 
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
        private RecentCosts recentCosts;
        public void Read(int segment5) //could me modified for specific queires, then just retreive whole table
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@"SELECT DISTINCT u.[User_ID], u.[User_Email]
                                              FROM [dbo].[Vehicle] v
                                              LEFT JOIN [dbo].[User] u ON v.[User_ID] = u.[User_ID]
                                              ORDER BY u.[User_ID] ASC;", sqlc); //gets all users that have a vehicle

            DataTable Results = new DataTable();
            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            int size = Results.Rows.Count;
            sqlc.Close();

            //Set database objects into a array, that can then be passed to webpage

            recentCosts = new RecentCosts(); // max value from table

            int segmentSize = 5;
            recentCosts.User_Emails = new string[segmentSize];
            recentCosts.User_Costs = new Int64[segmentSize][];
            recentCosts.User_CostAuds = new double[segmentSize][];

            User[] users = new User[size];
            int k = 0;
            foreach (DataRow row in Results.Rows)
            {
                users[k] = new User();
                users[k].User_ID = (int)row["User_ID"];
                users[k].User_Email = row["User_Email"].ToString();
                k++;
            }

            int segLow = getSegment5Low(segment5);
            int segHigh = getSegment5High(segment5);

            if (segHigh > (size - 1)) { /* do nothing */ }
            else
            {
                for (int j = 0; j < segmentSize; )
                {
                    recentCosts.User_Emails[j] = users[segLow].User_Email;
                    getGasUser(users[segLow].User_ID /* the recorded user id */, j);

                    j++;
                    segLow++;
                }
            }
        }


        public void getGasUser(int User_ID, int j)
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@"SELECT TOP 10 [Gas]
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

            recentCosts.User_Costs[j] = new Int64[size];
            recentCosts.User_CostAuds[j] = new double[size];
            int i = 0;
            foreach (DataRow row in Results.Rows)
            {
                recentCosts.User_Costs[j][i] = (Int64)row["Gas"];
                recentCosts.User_CostAuds[j][i] = (Int64)row["Gas"] * WeiToAudRatio;
                i++;
            }
        }

        public int getSegment5Low(int segment5)
        {
            return segment5 * 5; //ie 1 = 5, 2 = 10, 3 = 15
        }

        public int getSegment5High(int segment5)
        {
            return (segment5 * 5) + 4; //ie 1 = 9, 2 = 14, 3 = 19
        }
    }
}

public class RecentCosts
{
    public string []User_Emails { get; set; }

    public Int64 [][]User_Costs { get; set; }

    public double [][]User_CostAuds { get; set; }
}


