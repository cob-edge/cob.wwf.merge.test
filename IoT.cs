using System;

namespace Harley.UAT
{
    public class IoT
    {
        public int SensorId { get; set; }

        public DateTime TimeStamp { get; set; }

        public string Description { get; set; }

        public string Type { get; set; }

        public double V1 { get; set; }

        public double V2 { get; set; }

        public double V3 { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }
    }

    public class RecentV1
    {
        public double[] Recent10 { get; set; }
    }
}
