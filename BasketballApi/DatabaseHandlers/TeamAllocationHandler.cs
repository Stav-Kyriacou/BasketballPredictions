using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System;

namespace BasketballApi
{
    public class TeamAllocationHandler : DatabaseHandler
    {
        public List<TeamAllocation> GetTeamAllocations(int teamId)

        {
            List<TeamAllocation> Allocation = new List<TeamAllocation>();

            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();

                using (SqlCommand command = new SqlCommand("SELECT * FROM TeamAllocation WHERE TeamID = @TeamID", conn))
                {
                    command.Parameters.Add("@TeamID", SqlDbType.Int);
                    command.Parameters["@TeamID"].Value = teamId;

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Allocation.Add(new TeamAllocation()
                            {
                                TeamID = reader.GetInt32(0),
                                Year = reader.GetInt32(1),
                                PlayerID = reader.GetInt32(2)
                            });
                        }
                    }
                }
                conn.Close();
            }
            if (Allocation == null) return null;

            return Allocation;
        }


        public string AddTeamAllocation(TeamAllocation allocation)
        {
            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();

                using (SqlCommand command = new SqlCommand("ADD_TEAM_ALLOCATION", conn))
                
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@pTeamID", 0);
                    command.Parameters.AddWithValue("@pYear", 0);
                    command.Parameters.AddWithValue("@pPlayerID", 0);
                    command.Parameters["@pTeamID"].Value = allocation.TeamID;
                    command.Parameters["@pYear"].Value = allocation.Year;
                    command.Parameters["@pPlayerID"].Value = allocation.PlayerID;
                    int rowsAffected = command.ExecuteNonQuery();
                    conn.Close();

                    if (rowsAffected >= 1)
                    {
                        return "Added Team Allocation";
                    }
                    else
                    {
                        return "Team Allocation could not be added";
                    }
                }
            }
        }
    }
}