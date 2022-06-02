using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;

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
        [Authorize]
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
        [Route("/create-team")]
        public int PostTeam([FromBody] string newTeam)
        {
            return _teamDBHandler.AddTeam(newTeam);
        }
        /// <summary>
        /// Delete a Team
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        [HttpDelete]
        [EnableCors("MyPolicy")]
        [Route("/team")]
        public string DeleteTeam(int teamId)
        {
            return _teamDBHandler.DeleteTeam(teamId);
        }

        /// <summary>
        /// Compare two teams' win rate %
        /// </summary>
        /// <param name="teamAId"></param>
        /// <param name="teamBId"></param>
        /// <returns></returns>
        [HttpGet]
        [EnableCors("MyPolicy")]
        [Route("/compare")]
        public float CompareTeam(int teamAId, int teamBId)
        {
            var teamA = _teamDBHandler.GetTeam(teamAId);
            var teamB = _teamDBHandler.GetTeam(teamBId);

            var teamAEfficiency = teamA.GetEfficiency();
            var teamBEfficiency = teamB.GetEfficiency();

            if (teamAEfficiency <= 0 && teamBEfficiency <= 0)
            {
                return 50;
            }

            var result = (teamAEfficiency / (teamAEfficiency + teamBEfficiency)) * 100;

            return result;
        }
    }
}