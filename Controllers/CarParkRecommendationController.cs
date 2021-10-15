using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;
using System.Text.RegularExpressions;

namespace Harley.UAT.Controllers
{
    public class Address
    {
        public string address_Input { get; set; }

        public string recommendation { get; set; }
    }

    [ApiController]
    [Route("[controller]")]
    public class CarParkRecommendationController : ControllerBase
    {
        private readonly ILogger<CarParkRecommendationController> _logger;

        //Arrays for the postcodes used to provides user reccomendations for parking
        readonly int[] AirportPC = new int[] { 3045, 3428, 3036, 3038, 3059, 3048, 3049, 3046, 3043, 3042, 3033, 3021, 3041, 3034, 3021, 3037};
        readonly int[] EppingPC = new int[] { 3076, 3075, 3074, 3062, 3061, 3082, 3090, 3091, 3089, 3752, 3060, 3047};
        readonly int[] LatrobePC = new int[] { 3086, 3073, 3083, 3087, 3085, 3072, 3071, 3081, 3084, 3079, 3088, 3094, 3093, 3107, 3078, 3070, 3105, 3104, 3102, 3101, 3044, 3058};
        readonly int[] MelbPC = new int[] { 3000, 3002, 3003, 3004, 3006, 3206, 3205, 3207, 3206, 3050, 3121, 3065, 3056, 3055, 3057, 3039, 3031, 3032, 3141, 3008, 3052, 3054, 3067, 3068, 3055, 3011, 3181, 3182, 3112, 3142, 3044, 3040, 3013, 3015, 3012, 3019, 3016};

        public CarParkRecommendationController(ILogger<CarParkRecommendationController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public void Check(Address address) //get carpark recommendation
        {
            bool found = false;
            //string recommend;
            int postCode;

            //split input string address to get postcode, postcode has to be at end in the formal Australian address format
            string[] parts = address.address_Input.Split(' ');
            postCode = parts.Length - 1;

            address.address_Input = parts[postCode];

            //Console.WriteLine("Part: [" + parts[postCode] + "]");

            //will check and make recommendation
            for (int i = 0; i < MelbPC.Length; i++)
            {
                if (address.address_Input.Trim().Equals(MelbPC[i].ToString()))
                {
                    address.recommendation = "LaTrobe Street Wilson's Parking";
                    Console.WriteLine(address.recommendation);
                    found = true;
                }
            }

            for (int i = 0; i < LatrobePC.Length; i++)
            {
                if (address.address_Input.Trim().Equals(LatrobePC[i].ToString()))
                {
                    address.recommendation = "LaTrobe Bundoora Campus, Car Park 3";
                    Console.WriteLine(address.recommendation);
                    found = true;
                }
            }

            for (int i = 0; i < AirportPC.Length; i++)
            {
                if (address.address_Input.Trim().Equals(AirportPC[i].ToString()))
                {
                    address.recommendation = "Melbourne Airport Parking";
                    Console.WriteLine(address.recommendation);
                    found = true;
                }
            }

            for (int i = 0; i < EppingPC.Length; i++)
            {
                if (address.address_Input.Trim().Equals(EppingPC[i].ToString()))
                {
                    address.recommendation = "Puma Epping Parking";
                    Console.WriteLine(address.recommendation);
                    found = true;
                }
            }

            if (found == false)
            {
                Console.WriteLine("Can't make a recommendation based on your current address");
            }
        }

        [HttpPost]
        public string Post(Address address)
        {
            //checks the user input address to make parking reccommendation
            Check(address);

            //prints user address input and recommendation to console
            Console.WriteLine("User Input: " + address.address_Input + "\nRecommended parking: " + address.recommendation);

            return "{\"Recommended\": \" address.recommendation \"}";
        }
    }
}