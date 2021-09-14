using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

namespace Harley.UAT.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IoTController : ControllerBase
    {
        private readonly ILogger<IoTController> _logger;

        public IoTController(ILogger<IoTController> logger)
        {
            _logger = logger;
        }

        private int i = 0;
        private int NextInt()
        {
            return i++;
        }

        [HttpGet]
        public IEnumerable<IoT> Get()
        {
            Connect();
            Read();

            return Enumerable.Range(5, 10).Select(index => new IoT
            {
                SensorId = IoTData[i].SensorId,
                TimeStamp = IoTData[i].TimeStamp,
                Description = IoTData[i].Description,
                Type = IoTData[i].Type,
                V1 = IoTData[i].V1,
                V2 = IoTData[i].V2,
                V3 = IoTData[i].V3,
                Latitude = IoTData[i].Latitude,
                Longitude = IoTData[NextInt()].Longitude
            })

            .ToArray();
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

        private IoT[] IoTData;

        public void Read()
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand
                (@"SELECT TOP 10 * FROM [dbo].[IOT]
                ORDER BY [Timestamp] DESC", sqlc);
            DataTable Results = new DataTable();

            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            int IoTSize = Results.Rows.Count;
            sqlc.Close();

            IoTData = new IoT[IoTSize];
            int i = 0;

            foreach (DataRow row in Results.Rows)
            {
                IoTData[i] = new IoT
                {
                    SensorId = (int)row["SensorId"],
                    TimeStamp = row["TimeStamp"].ToString(),
                    V1 = (int)row["V1"],
                    V2 = (int)row["V2"],
                    V3 = (int)row["V3"],
                    Description = row["Description"].ToString(),
                    Type = row["Type"].ToString(),
                    Latitude = Convert.ToSingle(row["Latitude"]),
                    Longitude = Convert.ToSingle(row["Longitude"]),
                };
                i++;
            }
        }  
    }
}