using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;

namespace BasketballApi
{
    public class PlayerDBHandler : DatabaseHandler
    {
        public List<Player> GetAllPlayers()
        {
            List<Player> players = new List<Player>();

            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();

                using (SqlCommand command = new SqlCommand("SELECT * FROM Players", conn))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            players.Add(new Player()
                            {
                                PlayerName = reader.GetString(0),
                                Team = reader.GetString(1),
                                Age = reader.GetInt32(2),
                                Year = reader.GetInt32(3),
                                GamesPlayed = reader.GetInt32(4),
                                Wins = reader.GetInt32(5),
                                Losses = reader.GetInt32(6),
                                MinutesPlayed = reader.GetDouble(7),
                                Points = reader.GetDouble(8),
                                FieldGoalsMade = reader.GetDouble(9),
                                FieldGoalsAttempted = reader.GetDouble(10),
                                FieldGoalPercentage = reader.GetDouble(11),
                                ThreePointsMade = reader.GetDouble(12),
                                ThreePointsAttempted = reader.GetDouble(13),
                                ThreePointsPercentage = reader.GetDouble(14),
                                FreeThrowsMade = reader.GetDouble(15),
                                FreeThrowsAttempted = reader.GetDouble(16),
                                FreeThrowsPercentage = reader.GetDouble(17),
                                OffensiveRebounds = reader.GetDouble(18),
                                DefensiveRebounds = reader.GetDouble(19),
                                Rebounds = reader.GetDouble(20),
                                Assists = reader.GetDouble(21),
                                Turnovers = reader.GetDouble(22),
                                Steals = reader.GetDouble(23),
                                Blocks = reader.GetDouble(24),
                                PersonalFouls = reader.GetDouble(25),
                                FantasyPoints = reader.GetDouble(26),
                                DoubleDouble = reader.GetDouble(27),
                                TripleDouble = reader.GetDouble(28),
                                PlusMinus = reader.GetDouble(29),
                                Efficiency = reader.GetDouble(30)
                            });
                        }
                    }
                }
                conn.Close();
            }
            if (players.Count == 0) return null;
            
            return players;
        }
        public Player GetPlayer(string name, string team, int year)
        {
            Player player = new Player();

            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();

                using (SqlCommand command = new SqlCommand("SELECT * FROM Players WHERE PlayerName = @Name AND Team = @Team AND YEAR = @Year", conn))
                {
                    command.Parameters.Add("@Name", SqlDbType.NVarChar);
                    command.Parameters.Add("@Team", SqlDbType.NVarChar);
                    command.Parameters.Add("@Year", SqlDbType.Int);
                    command.Parameters["@Name"].Value = name;
                    command.Parameters["@Team"].Value = team;
                    command.Parameters["@Year"].Value = year;

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            player = new Player()
                            {
                                PlayerName = reader.GetString(0),
                                Team = reader.GetString(1),
                                Age = reader.GetInt32(2),
                                Year = reader.GetInt32(3),
                                GamesPlayed = reader.GetInt32(4),
                                Wins = reader.GetInt32(5),
                                Losses = reader.GetInt32(6),
                                MinutesPlayed = reader.GetDouble(7),
                                Points = reader.GetDouble(8),
                                FieldGoalsMade = reader.GetDouble(9),
                                FieldGoalsAttempted = reader.GetDouble(10),
                                FieldGoalPercentage = reader.GetDouble(11),
                                ThreePointsMade = reader.GetDouble(12),
                                ThreePointsAttempted = reader.GetDouble(13),
                                ThreePointsPercentage = reader.GetDouble(14),
                                FreeThrowsMade = reader.GetDouble(15),
                                FreeThrowsAttempted = reader.GetDouble(16),
                                FreeThrowsPercentage = reader.GetDouble(17),
                                OffensiveRebounds = reader.GetDouble(18),
                                DefensiveRebounds = reader.GetDouble(19),
                                Rebounds = reader.GetDouble(20),
                                Assists = reader.GetDouble(21),
                                Turnovers = reader.GetDouble(22),
                                Steals = reader.GetDouble(23),
                                Blocks = reader.GetDouble(24),
                                PersonalFouls = reader.GetDouble(25),
                                FantasyPoints = reader.GetDouble(26),
                                DoubleDouble = reader.GetDouble(27),
                                TripleDouble = reader.GetDouble(28),
                                PlusMinus = reader.GetDouble(29),
                                Efficiency = reader.GetDouble(30)
                            };
                        }
                    }
                }
                conn.Close();
            }
            if(player.PlayerName == null ) return null;

            return player;
        }
    }
}