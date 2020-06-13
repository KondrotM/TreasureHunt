SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- users table
DROP TABLE IF EXISTS `users`; -- all table names are plural
CREATE TABLE `users` (
	`userID` int(11) NOT NULL AUTO_INCREMENT, -- all column names are camelCase
	`username` varchar(32) NOT NULL,
	`hashedPass` varchar(256) NOT NULL, -- using PHP password_create() and password_verify()
	`email` varchar(256) NOT NULL,
	PRIMARY KEY (`userID`), -- make the userID column the primary key
	UNIQUE KEY `username` (`username`) -- also require usernames to be unique
);

-- quests table
DROP TABLE IF EXISTS `quests`;
CREATE TABLE `quests` (
	`questID` int(11) NOT NULL AUTO_INCREMENT,
	`userID` int(11) NOT NULL,
	`locationUUID` char(36) NOT NULL,
	`difficulty` tinyint NOT NULL DEFAULT '0', -- tinyint allows for max 1 byte worth of integer characters, a max value of ~255
	`mapName` varchar(48) NOT NULL,
	`description` varchar(2048), -- varchar(2048) allows for almost roughly 3 paragraphs of latin-based text (tested based on character count of a generated lorem ipsum text of 5 paragraphs)
	`crumbs` int(11) NOT NULL DEFAULT '0',
	`dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`questID`),
	CONSTRAINT `foreignKey_quests_userID` -- all foreign keys follow the naming scheme "foreignKey_currentTableName_columnName"
		FOREIGN KEY (`userID`) REFERENCES `users`(`userID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
	CONSTRAINT `foreignKey_quests_locationUUID`
		FOREIGN KEY (`locationUUID`) REFERENCES `locations`(`locationUUID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT
);

-- comments table
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
	`commentID` int(11) NOT NULL AUTO_INCREMENT,
	`userID` int(11) NOT NULL,
	`questID` int(11) NOT NULL,
	`content` varchar(256) NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`commentID`),
	CONSTRAINT `foreignKey_comments_userID`
		FOREIGN KEY (`userID`) REFERENCES `users`(`userID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
	CONSTRAINT `foreignKey_comments_questID`
		FOREIGN KEY (`questID`) REFERENCES `quests`(`questID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT
);

-- ratings table
DROP TABLE IF EXISTS `ratings`;
CREATE TABLE `ratings` (
	`ratingID` int(11) NOT NULL AUTO_INCREMENT,
	`userID` int(11) NOT NULL,
	`questID` int(11) NOT NULL,
	`rating` int(4) NOT NULL,
	PRIMARY KEY (`ratingID`),
	CONSTRAINT `foreignKey_ratings_userID`
		FOREIGN KEY (`userID`) REFERENCES `users`(`userID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
	CONSTRAINT `foreignKey_ratings_questID`
		FOREIGN KEY (`questID`) REFERENCES `quests`(`questID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT
);

-- crumbs table
DROP TABLE IF EXISTS `crumbs`;
CREATE TABLE `crumbs` (
	`crumbID` int(11) NOT NULL AUTO_INCREMENT,
	`questID` int(11) NOT NULL,
	`order` int(11) NOT NULL,
	`hints` int(11) NOT NULL DEFAULT '0',
	PRIMARY KEY (`crumbID`),
	CONSTRAINT `foreignKey_crumbs_questID`
		FOREIGN KEY (`questID`) REFERENCES `quests`(`questID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT
);

-- riddles table
DROP TABLE IF EXISTS `riddles`;
CREATE TABLE `riddles` (
	`crumbID` int(11) NOT NULL,
	`question` varchar(128) NOT NULL,
	`answer` varchar(32) NOT NULL,
	CONSTRAINT `foreignKey_riddles_crumbID`
		FOREIGN KEY (`crumbID`) REFERENCES `crumbs`(`crumbID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT
);

-- locations table
DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
	`locationUUID` char(36) NOT NULL,
	`latitude` decimal(10,7) NOT NULL,
	`longitude` decimal(10,7) NOT NULL,
	PRIMARY KEY(`locationUUID`)
);

-- hints table
DROP TABLE IF EXISTS `hints`;
CREATE TABLE `hints` (
	`crumbID` int(11) NOT NULL,
	`hint` VARCHAR(64) NOT NULL,
	`order` int(11) NOT NULL,
	CONSTRAINT `foreignKey_hints_crumbID`
		FOREIGN KEY (`crumbID`) REFERENCES `crumbs`(`crumbID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT
);

-- progress table
DROP TABLE IF EXISTS `progresses`;
CREATE TABLE `progresses` (
	`userID` int(11) NOT NULL,
	`crumbID` int(11) NOT NULL,
	`completed` BOOLEAN NOT NULL DEFAULT 'FALSE',
	CONSTRAINT `foreignKey_progresses_crumbID`
		FOREIGN KEY (`crumbID`) REFERENCES `crumbs`(`crumbID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
);