using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace BasketballApi
{
    [ApiController]
    [Route("[controller]")]
    public class PlayerController : ControllerBase
    {
        private PlayerDBHandler _playerDBHandler = new PlayerDBHandler();

        /// <summary>
        /// Get all Players
        /// </summary>
        [HttpGet]
        [EnableCors("MyPolicy")]
        [Route("/players")]
        public IEnumerable<Player> GetAllPlayers()
        {
            return _playerDBHandler.GetAllPlayers();
        }
        
        /// <summary>
        /// Get a single Player
        /// </summary>
        /// <param name="name"></param>
        /// <param name="team"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpGet]
        [EnableCors("MyPolicy")]
        [Route("/player/{name}/{team}/{year}")]
        public Player GetPlayer(string name, string team, int year)
        {
            return _playerDBHandler.GetPlayer(name, team, year);
        }
    }
}