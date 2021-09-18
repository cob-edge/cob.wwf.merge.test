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
    public class RecentBlockTransactionsController : ControllerBase
    {
        private readonly ILogger<RecentBlockTransactionsController> _logger;

        public RecentBlockTransactionsController(ILogger<RecentBlockTransactionsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<RecentGas> Get()
        {
            Connect();
            //Read();
            return Enumerable.Range(1, 1).Select(index => new RecentGas
            {
                Recent10 = getRecent10()
            })
            .ToArray();
        }

        public long[] getRecent10()
        {
            Read();
            return recentGas.Recent10;
        }

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

        private RecentGas recentGas;
        public void Read() //could me modified for specific queires, then just retreive whole table
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@"
               SELECT TOP (10) From_Address, To_Address, Gas, Timestamp
                  FROM [dbo].[Block Transactions]
                  WHERE [From_Address] = (SELECT ew.Wallet_ID
                                                FROM [dbo].[User] u
                                          INNER JOIN [dbo].[Ethereum Wallet] ew ON u.[User_ID] = ew.[User_ID]
                                                WHERE u.[User_ID] = 14) /* User id here*/
                  ORDER BY Timestamp DESC;
               ", sqlc);
            DataTable Results = new DataTable();
            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            int SizeRecent10 = Results.Rows.Count;
            sqlc.Close();

            //Set database objects into a array, that can then be passed to webpage
            recentGas = new RecentGas();
            recentGas.Recent10 = new long[SizeRecent10];
            int i = 0;
            foreach (DataRow row in Results.Rows)
            {
                recentGas.Recent10[i] = (long)row["Gas"];
                i++;
            }

            Console.WriteLine("HERE IS RECENT GAS >> " + recentGas.Recent10);
        }
    }
}
