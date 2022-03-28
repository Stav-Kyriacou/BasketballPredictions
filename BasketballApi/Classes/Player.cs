using System;

namespace BasketballApi
{
    public class Player
    {
        public string PlayerName { get; set; }
        public string Team { get; set; }
        public int Year { get; set; }
        public int Age { get; set; }
        public int GamesPlayed { get; set; }
        public int Wins { get; set; }
        public int Losses { get; set; }
        public double MinutesPlayed { get; set; }
        public double Points { get; set; }
        public double FieldGoalsMade { get; set; }
        public double FieldGoalsAttempted { get; set; }
        public double FieldGoalPercentage { get; set; }
        public double ThreePointsMade { get; set; }
        public double ThreePointsAttempted { get; set; }
        public double ThreePointsPercentage { get; set; }
        public double FreeThrowsMade { get; set; }
        public double FreeThrowsAttempted { get; set; }
        public double FreeThrowsPercentage { get; set; }
        public double OffensiveRebounds { get; set; }
        public double DefensiveRebounds { get; set; }
        public double Rebounds { get; set; }
        public double Assists { get; set; }
        public double Turnovers { get; set; }
        public double Steals { get; set; }
        public double Blocks { get; set; }
        public double PersonalFouls { get; set; }
        public double FantasyPoints { get; set; }
        public double DoubleDouble { get; set; }
        public double TripleDouble { get; set; }
        public double PlusMinus { get; set; }
        public double Efficiency { get; set; }
    }
}