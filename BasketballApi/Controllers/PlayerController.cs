using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BasketballApi
{
    [ApiController]
    [Route("[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly ILogger<PlayerController> _logger;
        private List<Player> players = new List<Player>();

        public PlayerController(ILogger<PlayerController> logger)
        {
            _logger = logger;
            players.Add(new Player { Id = 1, Name = "Stephen Curry", Team = "GSW" });
            players.Add(new Player { Id = 2, Name = "Kevin Durant", Team = "BKN" });
            players.Add(new Player { Id = 3, Name = "LeBron James", Team = "LAL" });
        }

        [HttpGet]
        [Route("/players")]
        public IEnumerable<Player> GetAllPlayers()
        {
            return players;
        }
        [HttpGet]
        [Route("/player/{Id}")]
        public Player GetPlayer(int Id)
        {
            return players.Single(x => x.Id == Id);
        }
    }
}
