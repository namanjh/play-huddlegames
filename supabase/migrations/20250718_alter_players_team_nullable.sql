-- Alter the players table to allow NULL values for the 'team' column
ALTER TABLE players
ALTER COLUMN team DROP NOT NULL;
