using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpGet]
        public IEnumerable<IoT> Get()
        {
            // Having trouble linking DB objects to web elements on page 4

            return Enumerable.Range(1, 5).Select(index => new IoT
            {
                SensorId = 1,
                TimeStamp = DateTime.Now,
                Description = "Hello World",
                Type = "type",
                V1 = 1.11, 
                V2 = 2.22, 
                V3 = 3.33, 
                Latitude = 6.66, 
                Longitude = 9.99
            })
            .ToArray();
        }

        private static SqlConnection sqlc;

        public class SQLWraper
        {
            public string connectionString { set; get; }
            //private SqlConnection sqlc;
            public SQLWraper()
            {
                connectionString = "Server=tcp:cob-edge.database.windows.net,1433;Initial Catalog=IoTDB;Persist Security Info=False;User ID=cob.edge.admin;Password=Aoed7Test;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
                Connect();
            }
            public void Connect()
            {
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

            public void Read()
            {
                //Read DB table 
                SqlCommand cmd = new SqlCommand(@"
                SELECT * FROM [dbo].[IOT]
                ", sqlc);
                DataTable Results = new DataTable();
                // Read table from database and store it
                sqlc.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                Results.Load(reader);
                sqlc.Close();
                foreach (DataRow row in Results.Rows)
                {
                    IoT jsonMsg = new IoT();
                    jsonMsg.SensorId = (int)row["SensorId"];
                    jsonMsg.TimeStamp = (DateTime)row["TimeStamp"];
                    jsonMsg.V1 = (int)row["V1"];
                    jsonMsg.V2 = (int)row["V2"];
                    jsonMsg.V3 = (int)row["V3"];
                    jsonMsg.Description = row["Description"].ToString();
                    jsonMsg.Type = row["Type"].ToString();
                    jsonMsg.Latitude = Convert.ToSingle(row["Latitude"]);
                    jsonMsg.Longitude = Convert.ToSingle(row["Longitude"]);
                }
            }
        }
        
    }
}