-- DELIVERABLE --
-- created table with all columns of interest, match by key
-- load xml infile secure priv file, identify by <ROW>
-- total 82574 entries, 28671 with lat + lon data

CREATE DATABASE ntbs_data;
USE ntbs_data;

DROP TABLE aviation_accidents;

CREATE TABLE IF NOT EXISTS aviation_accidents (
  `EventId` VARCHAR(255) NOT NULL,
  `AccidentNumber` VARCHAR(255) NOT NULL,
  `InvestigationType` VARCHAR(255),
  `EventDate` VARCHAR(255) NOT NULL,
  `Location` VARCHAR(255),
  `Country` VARCHAR(255),
  `Latitude` VARCHAR(255),
  `Longitude` VARCHAR(255),
  `AirportCode` VARCHAR(255),
  `AirportName` VARCHAR(255),
  `AircraftCategory` VARCHAR(255),
  `RegistrationNumber` VARCHAR(255),
  `AirCarrier` VARCHAR(255),
  `Make` VARCHAR(255),
  `Model` VARCHAR(255),
  `AmateurBuilt` VARCHAR(255),
  `NumberOfEngines` VARCHAR(255),
  `EngineType` VARCHAR(255),
  `FARDescription` VARCHAR(255),  -- FEDERAL AVIATION REGULATIONS
  `AircraftDamage` VARCHAR(255),
  `InjurySeverity` VARCHAR(255),
  `TotalFatalInjuries` VARCHAR(255),
  `TotalSeriousInjuries` VARCHAR(255),
  `TotalMinorInjuries` VARCHAR(255),
  `TotalUninjured` VARCHAR(255),
  `Schedule` VARCHAR(255),    -- CAST INTO BOOLEAN
  `PurposeOfFlight` VARCHAR(255),
  `BroadPhaseOfFlight` VARCHAR(255),
  `WeatherCondition` VARCHAR(255),
  `ReportStatus` VARCHAR(255) NOT NULL,
  `PublicationDate` VARCHAR(255)
);

-- aviation_data_LAX.xml, aviation_data.xml
LOAD XML INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/aviation_data_LAX.xml'
	INTO TABLE aviation_accidents
    ROWS IDENTIFIED BY '<ROW>';

-- add primary key
ALTER TABLE aviation_accidents
	ADD id INT AUTO_INCREMENT PRIMARY KEY FIRST;

-- display table
SELECT * FROM aviation_accidents;

-- QUERIES --

-- limit dataset
-- INSERT INTO <table name>
SELECT COUNT(*) FROM aviation_accidents
WHERE (Latitude IS NOT NULL AND Longitude IS NOT NULL)
AND (AircraftCategory = 'Airplane' OR AircraftCategory = 'Helicopter')
AND (InvestigationType = 'Accident')
AND (BroadPhaseOfFlight <> 'TAXI'			-- replace if data is limited
AND BroadPhaseOfFlight <> 'UNKNOWN'
AND BroadPhaseOfFlight <> 'TAKEOFF'
AND BroadPhaseOfFlight <> 'STANDING'
AND BroadPhaseOfFlight <> 'OTHER');

-- show distinct years and accidents counts
SELECT YEAR(STR_TO_DATE(EventDate, '%m/%d/%Y')), COUNT(*) FROM aviation_accidents_coord
GROUP BY YEAR(STR_TO_DATE(EventDate, '%m/%d/%Y'))
ORDER BY YEAR(STR_TO_DATE(EventDate, '%m/%d/%Y'));

-- show distinct broad phases and counts
SELECT DISTINCT BroadPhaseOfFlight,COUNT(*) FROM aviation_accidents_coord
GROUP BY BroadPhaseOfFlight;

-- SETUP --
SHOW VARIABLES LIKE "secure_file_priv";
-- SHOW GLOBAL VARIABLES LIKE 'local_infile';
-- SET GLOBAL local_infile = 'ON';