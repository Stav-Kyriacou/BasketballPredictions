using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;

namespace BasketballApi
{
    public class TeamDBHandler : DatabaseHandler
    {
        public List<Team> GetAllTeams()
        {
            List<Team> teams = new List<Team>();

            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();

                using (SqlCommand command = new SqlCommand("SELECT * FROM Teams", conn))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            teams.Add(new Team()
                            {
                                TeamID = reader.GetInt32(0),
                                TeamName = reader.GetString(1),
                                DateMade = reader.GetDateTime(2)
                            });
                        }
                    }
                }
                conn.Close();
            }
            if (teams.Count == 0) return null;

            return teams;
        }
        public Team GetTeam(int teamId)
        {
            Team team = new Team();

            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();

                using (SqlCommand command = new SqlCommand("SELECT * FROM Teams WHERE TeamID = @TeamID", conn))
                {
                    command.Parameters.Add("@TeamID", SqlDbType.Int);
                    command.Parameters["@TeamID"].Value = teamId;

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            team = new Team()
                            {
                                TeamID = reader.GetInt32(0),
                                TeamName = reader.GetString(1),
                                DateMade = reader.GetDateTime(2)
                            };
                        }
                    }
                }
                conn.Close();
            }
            if (team.TeamName == null) return null;

            return team;
        }
        public string AddTeam(string newTeam)
        {
            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();

                using (SqlCommand command = new SqlCommand("ADD_TEAM", conn))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@pTeamID", 0);
                    command.Parameters.AddWithValue("@pTeamName", newTeam);
                    command.Parameters.AddWithValue("@pDateMade", System.DateTime.Now);

                    int rowsAffected = command.ExecuteNonQuery();
                    conn.Close();

                    if (rowsAffected >= 1)
                    {
                        return "Added Team";
                    }
                    else
                    {
                        return "Team could not be added";
                    }
                }
            }
        }
    }
}