using System;
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
            //var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new IoT
            {
                SensorId = 1,
                TimeStamp = DateTime.Now,
                Description = "hello world desc",
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
        }

        /*
        public void Read()
        {
            //Read DB table 
            SqlCommand cmd = new SqlCommand(@"
               SELECT * FROM dbo.IOT
               ", sqlc);
            DataTable Results = new DataTable();
            // Read table from database and store it
            sqlc.Open();
            SqlDataReader reader = cmd.ExecuteReader();
            Results.Load(reader);
            sqlc.Close();
            foreach (DataRow row in Results.Rows)
            {
                JsonMsg jsonMsg = new JsonMsg();
                jsonMsg.id = (int)row["SensorId"];
                jsonMsg.Timestamp = row["TimeStamp"].ToString();
                jsonMsg.v1 = (int)row["V1"];
                jsonMsg.v2 = (int)row["V2"];
                jsonMsg.v3 = (int)row["V3"];
                jsonMsg.Desc = row["Description"].ToString();
                jsonMsg.EntityType = row["Type"].ToString();
                jsonMsg.Latitude = Convert.ToSingle(row["Latitude"]);
                jsonMsg.Longitude = Convert.ToSingle(row["Longitude"]);
                Console.WriteLine(jsonMsg.GetLogString());
            }
        }
        */
    }
}
