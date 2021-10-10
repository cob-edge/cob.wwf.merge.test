using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data.SqlClient;

namespace Harley.UAT.Controllers
{
    public class Address
    {
        public string address_Input { get; set; }
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
            //will check and make recommendation

            for (int i = 0; i < MelbPC.Length; i++)
            {
                if (address.address_Input.Equals(MelbPC[i].ToString()))
                {
                    Console.WriteLine("Recommend LaTrobe Street Parking");
                    break;
                }
            }

            for (int i = 0; i < LatrobePC.Length; i++)
            {
                if (address.address_Input.Equals(LatrobePC[i].ToString()))
                {
                    Console.WriteLine("Recommend LaTrobe University CP3");
                    break;
                }
            }

            for (int i = 0; i < AirportPC.Length; i++)
            {
                if (address.address_Input.Equals(AirportPC[i].ToString()))
                {
                    Console.WriteLine("Recommend Melbourne Airport Parking");
                    break;
                }
            }

            for (int i = 0; i < EppingPC.Length; i++)
            {
                if (address.address_Input.Equals(EppingPC[i].ToString()))
                {
                    Console.WriteLine("Recommend Puma Epping Parking");
                    break;
                }
            }

            Console.WriteLine("Can't make a recommendation based on your current address");
        }

        [HttpPost]
        public string Post(Address address)
        {
            //clean address and get just the post code
            Console.WriteLine("User Input: " + address.address_Input); // the user input from webpage
            
            //checks the user input address to make parking reccommendation
            Check(address);

            /*for (int i = 0; i < MelbPC.Length; i++)
            {
                Console.WriteLine("Post code in area: " + MelbPC[i]);
            }*/

            return "{\"Postcode\": \" address.address_Input \"}";

            /*try
            {
                return "{\"Message\": \"Succesful\"}";
            } 
            catch (Exception)
            {
                return "{\"Message\": \"Unsucessful\"}";
            }*/

            //return "{\"Message\": \"Succesful\"}";
        }
    }
}