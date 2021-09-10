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

        private int i = 0;
        private int nextInt()
        {
            return i++;
        }

        [HttpGet]
        public IEnumerable<IoT> Get()
        {
            Connect();
            Read();
            //var rng = new Random(); //range is how many times they will appears
            return Enumerable.Range(1, 10).Select(index => new IoT
            {
                SensorId = IoTs[i].SensorId,
                TimeStamp = DateTime.Now,
                Description = IoTs[i].Description,
                Type = IoTs[i].Type,
                V1 = IoTs[i].V1,
                V2 = IoTs[i].V2,
                V3 = IoTs[i].V3,
                Latitude = IoTs[i].Latitude,
                Longitude = IoTs[nextInt()].Longitude
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
            }
        }
    }
}
