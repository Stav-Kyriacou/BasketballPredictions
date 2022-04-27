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
        /// <param name="Year"></param>
        /// <param name="PlayerID"></param>
        /// <returns></returns>
        [HttpPost]
        [EnableCors("MyPolicy")]
        [Route("/TeamAllocation")]
        public string PostTeamAllocation( int TeamID, int Year, int PlayerID )
        {
            return _teamAllocationHandler.AddTeamAllocation(TeamID, Year, PlayerID);
        }
    }
}
