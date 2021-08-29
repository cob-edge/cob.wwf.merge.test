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
            Connect();
            Read();

            //var rng = new Random(); //range is how many times they will appears
            return Enumerable.Range(1, 2).Select(index => new IoT
            {
                SensorId = IoTs[0].SensorId,
                TimeStamp = DateTime.Now,
                Description = IoTs[0].Description,
                Type = IoTs[0].Type,
                V1 = IoTs[0].V1, 
                V2 = IoTs[0].V2, 
                V3 = IoTs[0].V3, 
                Latitude = IoTs[0].Latitude, 
                Longitude = IoTs[0].Longitude
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

        private IoT[] IoTs;
        public void Read() //could me modified for specific queires, then just retreive whole table
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
            int SizeIoTs = Results.Rows.Count;
            sqlc.Close();

            //Set database objects into a array, that can then be passed to webpage
            IoTs = new IoT[SizeIoTs];
            int i = 0;
            foreach (DataRow row in Results.Rows)
            {
                IoTs[i] = new IoT {
                    SensorId = (int)row["SensorId"],
                    TimeStamp = DateTime.Now /* row["TimeStamp"].ToString() */,
                    Description = row["Description"].ToString(),
                    Type = row["Type"].ToString(),
                    V1 = (int)row["V1"],
                    V2 = (int)row["V2"],
                    V3 = (int)row["V3"],
                    Latitude = Convert.ToSingle(row["Latitude"]),
                    Longitude = Convert.ToSingle(row["Longitude"])
                };
                i++;
                /*
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
                */
            }
        }
        
    }
}
