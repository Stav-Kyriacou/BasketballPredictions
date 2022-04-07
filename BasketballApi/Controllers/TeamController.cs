using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace BasketballApi
{
    [ApiController]
    [Route("[controller]")]
    public class TeamController : ControllerBase
    {
        private TeamDBHandler _teamDBHandler = new TeamDBHandler();

        /// <summary>
        /// Get all Teams
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [EnableCors("MyPolicy")]
        [Route("/teams")]
        public IEnumerable<Team> GetAllTeams()
        {
            return _teamDBHandler.GetAllTeams();
        }

        /// <summary>
        /// Get a single Team
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        [HttpGet]
        [EnableCors("MyPolicy")]
        [Route("/team/{teamId}")]
        public Team GetTeam(int teamId)
        {
            return _teamDBHandler.GetTeam(teamId);
        }
        
        /// <summary>
        /// Post a new Team
        /// </summary>
        /// <param name="newTeam"></param>
        /// <returns></returns>
        [HttpPost]
        [EnableCors("MyPolicy")]
        [Route("/team")]
        public string PostTeam([FromBody] Team newTeam)
        {
            return _teamDBHandler.AddTeam(newTeam);
        }
    }
}