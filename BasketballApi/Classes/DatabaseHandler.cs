
using System;
using System.Data.SqlClient;

namespace BasketballApi
{
    public abstract class DatabaseHandler
    {
        public static string GetConnectionString()
        {
            try
            {
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
                builder.DataSource = "basketballeast.database.windows.net";
                builder.UserID = "basketballeast";
                builder.Password = "Skylines33!";
                builder.InitialCatalog = "basketballeast"; //databsase name
                return builder.ConnectionString;
            }
            catch (Exception e)
            {
                throw new Exception("Error in GetConnectionString(): " + e.Message);
            }
        }
    }
}