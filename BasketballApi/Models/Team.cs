using System;
using System.Collections.Generic;
using System.Linq;

namespace BasketballApi
{
    public class Team
    {
        public int TeamID { get; set; }
        public string TeamName { get; set; }
        public DateTime DateMade { get; set; }
        public string UserID { get; set; }
        public int? Year { get; internal set; }
        public List<Player> Players { get; set; }
    
        public float GetEfficiency()
        {
            if (this.Players == null)
            {
                return 0f;
            }
            // return 0f;

            float result = 0f;
            float subs = 0f;
            int numSubs = 0;
            List<Player> playerByEfficiency = this.Players.OrderByDescending(Player => Player.Efficiency).ToList();
            foreach (var (p,index) in playerByEfficiency.Select((value, i ) => (value, i)))
            {
                if(index < 5){
                    result += (float)p.Efficiency;
                }else{
                    subs += (float)p.Efficiency;
                    numSubs+=1;
                }
            }
            if (numSubs != 0)
            {
                result+=(subs/numSubs);
            }
            if(result < 0)
            {
                return 6;
            }else{
                return result;
            }
            
        }
        
    }
}