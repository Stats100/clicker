-- Since there are only 2 SQL statements, we can just have them in one file
-- There is no functionality tbh, I just want to have them all here

-- Create Database
CREATE TABLE IF NOT EXISTS clicks (
    epochTime INTEGER,
    clicks INTEGER
);

-- Update Clicks
INSERT INTO clicks (epochTime, clicks) VALUES (timestamp_value, click_count);
