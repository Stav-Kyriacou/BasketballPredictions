using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Cors;

namespace BasketballApi
{
    [ApiController]
    [Route("[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly ILogger<PlayerController> _logger;
        private PlayerDBHandler playerDBHandler = new PlayerDBHandler();

        public PlayerController(ILogger<PlayerController> logger)
        {
            _logger = logger;
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("/players")]
        public IEnumerable<Player> GetAllPlayers()
        {
            return playerDBHandler.GetAllPlayers();
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("/players/{Name}/{Team}/{Year}")]
        public Player GetPlayer(string Name, string Team, int Year)
        {
            return playerDBHandler.GetPlayer(Name, Team, Year);
        }
    }
}
