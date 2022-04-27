SELECT * FROM TeamAllocation 
Inner JOIN Players ON TeamAllocation.PlayerID=Players.PlayerID
WHERE TeamAllocation.TeamID = 1;

SELECT * FROM Teams