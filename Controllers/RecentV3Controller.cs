﻿using System;
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
    public class RecentV3Controller : ControllerBase
    {
        private readonly ILogger<RecentV3Controller> _logger;

        public RecentV3Controller(ILogger<RecentV3Controller> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<RecentV3> Get()
        {
            Connect();
            //Read();
            return Enumerable.Range(1, 1).Select(index => new RecentV3
            {
                Recent10 = getRecent10()
            })
            .ToArray();
        }

        public double[] getRecent10()
        {
            Read();
            return recentV3.Recent10;
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

        private RecentV3 recentV3;
        public void Read() //could me modified for specific queires, then just retreive whole table
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@"
               SELECT TOP (10) [SensorId], [V3], [TimeStamp] 
                  FROM [dbo].[IOT]
	              WHERE [Type]='Vehicle' AND [SensorId]=66
	              ORDER BY [TimeStamp] DESC
               ", sqlc);
            DataTable Results = new DataTable();
            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            int SizeRecent10 = Results.Rows.Count;
            sqlc.Close();

            //Set database objects into a array, that can then be passed to webpage
            recentV3 = new RecentV3();
            recentV3.Recent10 = new double[SizeRecent10];
            int i = 0;
            foreach (DataRow row in Results.Rows)
            {
                recentV3.Recent10[i] = (int)row["V3"];
                i++;
            }
        }
    }
}
