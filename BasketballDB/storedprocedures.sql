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

------------------------------------------------------------
--------------------REMOVE TEAM ALLOC-----------------------
------------------------------------------------------------
IF OBJECT_ID('REMOVE_TEAM_ALLOCATION') IS NOT NULL
    DROP PROCEDURE REMOVE_TEAM_ALLOCATION
GO
CREATE PROCEDURE REMOVE_TEAM_ALLOCATION
    @pTeamID INT,
    @pYear INT,
    @pPlayerID INT
AS
BEGIN
    BEGIN TRY
    DELETE FROM TeamAllocation
    WHERE TeamID = @pTeamID
        AND Year = @pYear
        AND PlayerID = @pPlayerID

------------------------------------------------------------
------------------------REMOVE TEAM-------------------------
------------------------------------------------------------

IF OBJECT_ID('DELETE_TEAM') IS NOT NULL
DROP PROCEDURE DELETE_TEAM
GO
CREATE PROCEDURE DELETE_TEAM @pTeamID INT AS
BEGIN
    BEGIN TRY
        DELETE FROM TeamAllocation
        WHERE TeamID = @pTeamID;
        DELETE FROM Teams
        WHERE TeamID = @pTeamID;
        IF @@ROWCOUNT = 0
            THROW 50060, 'Team not found', 1
    END TRY
    BEGIN CATCH
        IF ERROR_NUMBER() = 50060
            THROW
    END CATCH
END
GO

EXEC DELETE_TEAM @pTeamID = 1;

SELECT * FROM Teams;
