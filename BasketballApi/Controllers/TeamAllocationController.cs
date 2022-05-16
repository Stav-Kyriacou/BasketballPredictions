using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace BasketballApi
{
    [ApiController]
    [Route("[controller]")]
    public class TeamAllocationController : ControllerBase
    {
        private TeamAllocationHandler _teamAllocationHandler = new TeamAllocationHandler();

        /// <summary>
        /// Get all Team Allocations
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [EnableCors("MyPolicy")]
        [Route("/TeamAllocation/{teamId}")]
        public IEnumerable<TeamAllocation> GetTeamAllocation(int teamId)
        {
            return _teamAllocationHandler.GetTeamAllocations(teamId);
        }
        /// <summary>
        /// Post a new Team Allocation
        /// </summary>
        /// <param name="TeamID"></param>
        /// <param name="PlayerID"></param>
        /// <param name="Year"></param>
        /// <returns></returns>
        [HttpPost]
        [EnableCors("MyPolicy")]
        [Route("/TeamAllocation")]
        public string PostTeamAllocation(int TeamID, int PlayerID, int Year)
        {
            return _teamAllocationHandler.AddTeamAllocation(TeamID, PlayerID, Year);
        }
        /// <summary>
        /// Remove a Team Allocation
        /// </summary>
        /// <param name="teamID"></param>
        /// <param name="playerID"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        [HttpDelete]
        [EnableCors("MyPolicy")]
        [Route("/TeamAllocation/{teamID}/{playerID}/{year}")]
        public string RemoveAllocation(int teamID, int playerID, int year)
        {
            return _teamAllocationHandler.RemoveAllocation(teamID, playerID, year);
        }
        /// <summary>
        /// Update players on a team
        /// </summary>
        /// <param name="newTeam"></param>
        [HttpPut]
        [EnableCors("MyPolicy")]
        public string UpdateTeamAllocation([FromBody] Team newTeam)
        {
            return _teamAllocationHandler.UpdateAllocation(newTeam);
        }
    }
}