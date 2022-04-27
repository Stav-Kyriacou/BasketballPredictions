using System;
using System.Collections.Generic;

namespace BasketballApi
{
    public class Team
    {
        public int TeamID { get; set; }
        public string TeamName { get; set; }
        public DateTime DateMade { get; set; }
        public int? Year { get; internal set; }
        public List<Player> Players { get; set; }
    }
}