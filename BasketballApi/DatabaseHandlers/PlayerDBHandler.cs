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
                                PlayerID = reader.GetInt32(1),
                                Team = reader.GetString(2),
                                Age = reader.GetInt32(3),
                                Year = reader.GetInt32(4),
                                GamesPlayed = reader.GetInt32(5),
                                Wins = reader.GetInt32(6),
                                Losses = reader.GetInt32(7),
                                MinutesPlayed = reader.GetDouble(8),
                                Points = reader.GetDouble(9),
                                FieldGoalsMade = reader.GetDouble(10),
                                FieldGoalsAttempted = reader.GetDouble(11),
                                FieldGoalPercentage = reader.GetDouble(12),
                                ThreePointsMade = reader.GetDouble(13),
                                ThreePointsAttempted = reader.GetDouble(14),
                                ThreePointsPercentage = reader.GetDouble(15),
                                FreeThrowsMade = reader.GetDouble(16),
                                FreeThrowsAttempted = reader.GetDouble(17),
                                FreeThrowsPercentage = reader.GetDouble(18),
                                OffensiveRebounds = reader.GetDouble(19),
                                DefensiveRebounds = reader.GetDouble(20),
                                Rebounds = reader.GetDouble(21),
                                Assists = reader.GetDouble(22),
                                Turnovers = reader.GetDouble(23),
                                Steals = reader.GetDouble(24),
                                Blocks = reader.GetDouble(25),
                                PersonalFouls = reader.GetDouble(26),
                                FantasyPoints = reader.GetDouble(27),
                                DoubleDouble = reader.GetDouble(28),
                                TripleDouble = reader.GetDouble(29),
                                PlusMinus = reader.GetDouble(30),
                                Efficiency = reader.GetDouble(31)
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
                                PlayerID = reader.GetInt32(1),
                                Team = reader.GetString(2),
                                Age = reader.GetInt32(3),
                                Year = reader.GetInt32(4),
                                GamesPlayed = reader.GetInt32(5),
                                Wins = reader.GetInt32(6),
                                Losses = reader.GetInt32(7),
                                MinutesPlayed = reader.GetDouble(8),
                                Points = reader.GetDouble(9),
                                FieldGoalsMade = reader.GetDouble(10),
                                FieldGoalsAttempted = reader.GetDouble(11),
                                FieldGoalPercentage = reader.GetDouble(12),
                                ThreePointsMade = reader.GetDouble(13),
                                ThreePointsAttempted = reader.GetDouble(14),
                                ThreePointsPercentage = reader.GetDouble(15),
                                FreeThrowsMade = reader.GetDouble(16),
                                FreeThrowsAttempted = reader.GetDouble(17),
                                FreeThrowsPercentage = reader.GetDouble(18),
                                OffensiveRebounds = reader.GetDouble(19),
                                DefensiveRebounds = reader.GetDouble(20),
                                Rebounds = reader.GetDouble(21),
                                Assists = reader.GetDouble(22),
                                Turnovers = reader.GetDouble(23),
                                Steals = reader.GetDouble(24),
                                Blocks = reader.GetDouble(25),
                                PersonalFouls = reader.GetDouble(26),
                                FantasyPoints = reader.GetDouble(27),
                                DoubleDouble = reader.GetDouble(28),
                                TripleDouble = reader.GetDouble(29),
                                PlusMinus = reader.GetDouble(30),
                                Efficiency = reader.GetDouble(31)
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