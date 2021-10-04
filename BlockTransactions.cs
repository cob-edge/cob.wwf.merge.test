using System;

namespace Harley.UAT
{   

    //block chain transactions class
    public class BlockTransactions 
    {
        public string Hash { get; set; }

        public int Nonce { get; set; }

        public string Block_Hash { get; set; }

        public int Block_Number { get; set; }

        public int Transaction_Index { get; set; }

        public string From_Address { get; set; }

        public string To_Address { get; set; }

        public int Value { get; set; }

        public int Gas { get; set; }

        public float Gas_Price { get; set; }

        public int Timestamp { get; set; }
        
        public int Max_Fee_Per_Gas { get; set; }

        public int Max_Priority_Fee_Per_Gas { get; set; }

        public int Transaction_Type { get; set; }

        public int Sensor_ID { get; set; }
    }

    public class RecentGas
    {
        public long[] Recent10 { get; set; }
    }
}
