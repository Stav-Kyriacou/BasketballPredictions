
using System;
using System.Data.SqlClient;

namespace BasketballApi
{
    //must add package to use => dotnet add package System.Data.SqlClient
    public abstract class DatabaseHandler
    {
        public static string GetConnectionString()
        {
            try
            {
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
                builder.DataSource = "";
                builder.UserID = "";
                builder.Password = "";
                // like a sql USE statement => USE APIDemo
                builder.InitialCatalog = "";
                return builder.ConnectionString;
            }
            catch (Exception e)
            {
                throw new Exception("Error in GetConnectionString(): " + e.Message);
            }
        }
    }
}