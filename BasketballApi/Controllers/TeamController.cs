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
    public class TeamController : ControllerBase
    {
        private readonly ILogger<TeamController> _logger;
        private TeamDBHandler teamDBHandler = new TeamDBHandler();

        public TeamController(ILogger<TeamController> logger)
        {
            _logger = logger;
        }

        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("/teams")]
        public IEnumerable<Team> GetAllTeams()
        {
            return null;
        }
        [EnableCors("MyPolicy")]
        [HttpPost]
        public void PostTeam()
        {
            
        }
    }
}
