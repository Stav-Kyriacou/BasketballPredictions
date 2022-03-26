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
        public PlayerController(ILogger<PlayerController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Player> Get()
        {
            var players = new List<Player>();
            players.Add(new Player { Name = "Stephen Curry", Team = "GSW" });
            players.Add(new Player { Name = "Kevin Durant", Team = "BKN" });
            players.Add(new Player { Name = "LeBron James", Team = "LAL" });

            return players;
        }
    }
}
