using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;

namespace BasketballApi
{
    public class PlayerDBHandler : DatabaseHandler
    {
        public static List<Player> GetAllPlayers()
        {
            List<Player> players = new List<Player>();

            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();

                using (SqlCommand command = new SqlCommand("", conn))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            players.Add(new Player()
                            {

                            });
                        }
                    }
                }
                conn.Close();
            }

            return players;
        }
        public static Player GetPlayerById(int id)
        {
            Player player = new Player();

            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();

                using (SqlCommand command = new SqlCommand("SELECT * FROM PLAYER WHERE id = @Id;", conn))
                {
                    command.Parameters.Add("@Id", SqlDbType.Int);
                    command.Parameters["@Id"].Value = id;
                    
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            
                        }
                    }
                }
                conn.Close();
            }

            return player;
        }
    }
}