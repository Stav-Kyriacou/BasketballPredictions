using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
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
    }
}