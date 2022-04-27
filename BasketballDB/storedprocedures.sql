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
    DECLARE @ID BIGINT;
    SET @ID = NEXT VALUE FOR Count.CountBy1;
    BEGIN TRY
        INSERT INTO Teams
        (TeamID, TeamName, DateMade)
    VALUES
        (@ID, @pTeamName, @pDateMade)
    END TRY
    BEGIN CATCH
    END CATCH
END
GO

IF OBJECT_ID('CountBy1') IS NOT NULL
    DROP SEQUENCE Count.CountBy1;

IF OBJECT_ID('Count') IS NOT NULL
    DROP SCHEMA Count;


Create SCHEMA Count;
GO

CREATE SEQUENCE Count.CountBy1
    Start WITH 10
    INCREMENT BY 1;

------------------------------------------------------------
----------------------ADD TEAMALLOCATION--------------------
------------------------------------------------------------
IF OBJECT_ID('ADD_TEAM_ALLOCATION') IS NOT NULL
    DROP PROCEDURE ADD_TEAM_ALLOCATION;
GO

CREATE PROCEDURE ADD_TEAM_ALLOCATION
    @pTeamID INT,
    @pYear INT,
    @pPlayerID INT
AS
BEGIN
    DECLARE @TeamID BIGINT;
    SET @TeamID = NEXT VALUE FOR Count.CountBy1;
    BEGIN TRY
        INSERT INTO TeamAllocation
        (TeamID, Year, PlayerID)
    VALUES
        (@pTeamID, @pYear, @pPlayerID)
    END TRY
    BEGIN CATCH
    END CATCH
END
GO





