using System;
using System.Collections.Generic;
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
            return teamDBHandler.GetAllTeams();
        }
        
        [EnableCors("MyPolicy")]
        [HttpGet]
        [Route("/team/{teamId}")]
        public Team GetTeam(int teamId)
        {
            return teamDBHandler.GetTeam(teamId);
        }

        [EnableCors("MyPolicy")]
        [HttpPost]
        public string PostTeam([FromBody]Team newTeam)
        {
            return teamDBHandler.AddTeam(newTeam);
        }
    }
}
