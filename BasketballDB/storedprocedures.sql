------------------------------------------------------------
--------------------------ADD TEAM--------------------------
------------------------------------------------------------
IF OBJECT_ID('ADD_TEAM') IS NOT NULL
    DROP PROCEDURE ADD_TEAM;

GO
CREATE PROCEDURE ADD_TEAM
    @pTeamID INT,
    @pTeamName NVARCHAR(100),
    @pDateMade DATE
AS
BEGIN
    BEGIN TRY
        INSERT INTO Teams
        (TeamID, TeamName, DateMade)
    VALUES
        (@pTeamID, @pTeamName, @pDateMade)
    END TRY
    BEGIN CATCH
    END CATCH
END
GO