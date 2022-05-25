using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;

namespace BasketballApi
{
    public class TeamDBHandler : DatabaseHandler
    {
        public List<Team> GetAllTeams()

        {
            List<Team> output = new List<Team>();


            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();

                using (SqlCommand command = new SqlCommand("SELECT * FROM Teams;", conn))
                {

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Team team = new Team();
                            List<Player> players = new List<Player>();
                            team.TeamID = reader.GetInt32(0);
                            team.DateMade = reader.GetDateTime(2);
                            team.TeamName = reader.GetString(1);
                            team.Year = 2020;

                            // get all team allocations for team under team.TeamID with new connection to server
                            // repetition of the sql connection. | should be a way to make cleaner
                            using (SqlConnection connPlayer = new SqlConnection(GetConnectionString()))
                            {
                                connPlayer.Open();
                                // sql command gets all allocated players for the team with ID from previous select statement
                                using (SqlCommand commandPlayer = new SqlCommand($"SELECT * FROM TeamAllocation Inner JOIN Players ON TeamAllocation.PlayerID=Players.PlayerID WHERE TeamAllocation.TeamID = {team.TeamID};", connPlayer))
                                {
                                    using (SqlDataReader readerPlayer = commandPlayer.ExecuteReader())
                                    {
                                        while (readerPlayer.Read())
                                        {
                                            players.Add(new Player()
                                            {
                                                PlayerName = readerPlayer.GetString(3),
                                                PlayerID = readerPlayer.GetInt32(4),
                                                Team = readerPlayer.GetString(5),
                                                Age = readerPlayer.GetInt32(6),
                                                Year = readerPlayer.GetInt32(7),
                                                GamesPlayed = readerPlayer.GetInt32(8),
                                                Wins = readerPlayer.GetInt32(9),
                                                Losses = readerPlayer.GetInt32(10),
                                                MinutesPlayed = readerPlayer.GetDouble(11),
                                                Points = readerPlayer.GetDouble(12),
                                                FieldGoalsMade = readerPlayer.GetDouble(13),
                                                FieldGoalsAttempted = readerPlayer.GetDouble(14),
                                                FieldGoalPercentage = readerPlayer.GetDouble(15),
                                                ThreePointsMade = readerPlayer.GetDouble(16),
                                                ThreePointsAttempted = readerPlayer.GetDouble(17),
                                                ThreePointsPercentage = readerPlayer.GetDouble(18),
                                                FreeThrowsMade = readerPlayer.GetDouble(19),
                                                FreeThrowsAttempted = readerPlayer.GetDouble(20),
                                                FreeThrowsPercentage = readerPlayer.GetDouble(21),
                                                OffensiveRebounds = readerPlayer.GetDouble(22),
                                                DefensiveRebounds = readerPlayer.GetDouble(23),
                                                Rebounds = readerPlayer.GetDouble(24),
                                                Assists = readerPlayer.GetDouble(25),
                                                Turnovers = readerPlayer.GetDouble(26),
                                                Steals = readerPlayer.GetDouble(27),
                                                Blocks = readerPlayer.GetDouble(28),
                                                PersonalFouls = readerPlayer.GetDouble(29),
                                                FantasyPoints = readerPlayer.GetDouble(30),
                                                DoubleDouble = readerPlayer.GetDouble(31),
                                                TripleDouble = readerPlayer.GetDouble(32),
                                                PlusMinus = readerPlayer.GetDouble(33),
                                                Efficiency = readerPlayer.GetDouble(34)
                                            });
                                            team.Players = players;
                                        }
                                    }
                                }
                                connPlayer.Close();
                            }
                            output.Add(team);
                        }
                    }
                }
                conn.Close();
            }

            return output;
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

                            List<Player> players = new List<Player>();
                            team.TeamID = reader.GetInt32(0);
                            team.DateMade = reader.GetDateTime(2);
                            team.TeamName = reader.GetString(1);
                            team.Year = 2020;

                            // get all team allocations for team under team.TeamID with new connection to server
                            // repetition of the sql connection. | should be a way to make cleaner
                            using (SqlConnection connPlayer = new SqlConnection(GetConnectionString()))
                            {
                                connPlayer.Open();
                                // sql command gets all allocated players for the team with ID from previous select statement
                                using (SqlCommand commandPlayer = new SqlCommand($"SELECT * FROM TeamAllocation Inner JOIN Players ON TeamAllocation.PlayerID=Players.PlayerID WHERE TeamAllocation.TeamID = {team.TeamID};", connPlayer))
                                {
                                    using (SqlDataReader readerPlayer = commandPlayer.ExecuteReader())
                                    {
                                        while (readerPlayer.Read())
                                        {
                                            players.Add(new Player()
                                            {
                                                PlayerName = readerPlayer.GetString(3),
                                                PlayerID = readerPlayer.GetInt32(4),
                                                Team = readerPlayer.GetString(5),
                                                Age = readerPlayer.GetInt32(6),
                                                Year = readerPlayer.GetInt32(7),
                                                GamesPlayed = readerPlayer.GetInt32(8),
                                                Wins = readerPlayer.GetInt32(9),
                                                Losses = readerPlayer.GetInt32(10),
                                                MinutesPlayed = readerPlayer.GetDouble(11),
                                                Points = readerPlayer.GetDouble(12),
                                                FieldGoalsMade = readerPlayer.GetDouble(13),
                                                FieldGoalsAttempted = readerPlayer.GetDouble(14),
                                                FieldGoalPercentage = readerPlayer.GetDouble(15),
                                                ThreePointsMade = readerPlayer.GetDouble(16),
                                                ThreePointsAttempted = readerPlayer.GetDouble(17),
                                                ThreePointsPercentage = readerPlayer.GetDouble(18),
                                                FreeThrowsMade = readerPlayer.GetDouble(19),
                                                FreeThrowsAttempted = readerPlayer.GetDouble(20),
                                                FreeThrowsPercentage = readerPlayer.GetDouble(21),
                                                OffensiveRebounds = readerPlayer.GetDouble(22),
                                                DefensiveRebounds = readerPlayer.GetDouble(23),
                                                Rebounds = readerPlayer.GetDouble(24),
                                                Assists = readerPlayer.GetDouble(25),
                                                Turnovers = readerPlayer.GetDouble(26),
                                                Steals = readerPlayer.GetDouble(27),
                                                Blocks = readerPlayer.GetDouble(28),
                                                PersonalFouls = readerPlayer.GetDouble(29),
                                                FantasyPoints = readerPlayer.GetDouble(30),
                                                DoubleDouble = readerPlayer.GetDouble(31),
                                                TripleDouble = readerPlayer.GetDouble(32),
                                                PlusMinus = readerPlayer.GetDouble(33),
                                                Efficiency = readerPlayer.GetDouble(34)
                                            });
                                            team.Players = players;
                                        }
                                    }
                                }
                                connPlayer.Close();
                            }
                        }
                    }
                }
                conn.Close();
            }
            return team;
        }
        public int AddTeam(string newTeam)
        {
            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();

                using (SqlCommand command = new SqlCommand("ADD_TEAM2", conn))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@pTeamID", 0);
                    command.Parameters.AddWithValue("@pTeamName", newTeam);
                    command.Parameters.AddWithValue("@pDateMade", System.DateTime.Now);
                    var returnParameter = command.Parameters.Add("@pTeamID", SqlDbType.Int);
                    returnParameter.Direction = ParameterDirection.ReturnValue;

                    int rowsAffected = command.ExecuteNonQuery();
                    var result = returnParameter.Value;
                    conn.Close();

                    return (int)result;
                }
            }
        }

        public string DeleteTeam(int teamId)
        {
            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();

                using (SqlCommand command = new SqlCommand("DELETE_TEAM", conn))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@pTeamID", 0);
                    command.Parameters["@pTeamID"].Value = teamId;

                    int rowsAffected = command.ExecuteNonQuery();
                    conn.Close();
                }
                return "Team removed";
            }
        }
    }
}