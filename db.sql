SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- Table structure & indexes for tablelogin
DROP TABLE IF EXISTS `tablelogin`;
CREATE TABLE `tablelogin` (
	`userID` int(11) NOT NULL,
	`username` varchar(32) NOT NULL,
	`password` varchar(64) NOT NULL,
	`email` varchar(128) NOT NULL
);

-- 
DROP TABLE IF EXISTS `tablemaps`;
CREATE TABLE `tablemaps` (
	`mapID` int(11) NOT NULL,
	`userID` int(11) NOT NULL,
	`locationID` int(11) NOT NULL DEFAULT '0',
	`difficulty` int(11) NOT NULL DEFAULT '0',
	`mapname` varchar(32) NOT NULL,
	`description` varchar(2048) NOT NULL DEFAULT 'No description.',
	`crumbs` int(11) NOT NULL DEFAULT '0',
	`datecreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `tablecomments`;
CREATE TABLE `tablecomments` (
	`commentID` int(11) NOT NULL,
	`userID` int(11) NOT NULL,
	`mapID` int(11) NOT NULL,
	`content` varchar(256) NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `tableratings`;
CREATE TABLE `tableratings` (
	`ratingID` int(11) NOT NULL,
	`userID` int(11) NOT NULL,
	`mapID` int(11) NOT NULL,
	`rating` int(4) NOT NULL
);

DROP TABLE IF EXISTS `tablebreadcrumbs`;
CREATE TABLE `tablebreadcrumbs` (
	`crumbID` int(11) NOT NULL,
	`mapID` int(11) NOT NULL,
	`typeID` int(11) NOT NULL,
	`order` int(11) NOT NULL,
	`hints` int(11) NOT NULL DEFAULT '0'
);

DROP TABLE IF EXISTS `tabletypes`;
CREATE TABLE `tabletypes` ( 
	`typeID` int(11) NOT NULL,
	`typeDesc` varchar(32) NOT NULL
);

DROP TABLE IF EXISTS `tableriddles`;
CREATE TABLE `tableriddles` (
	`crumbID` int(11) NOT NULL,
	`question` varchar(128) NOT NULL,
	`answer` varchar(32) NOT NULL
);

DROP TABLE IF EXISTS `tablelocations`;
CREATE TABLE `tablelocations` (
	`locationID` int(11) NOT NULL,
	`posX` decimal(10,7) NOT NULL,
	`posY` decimal(10,7) NOT NULL
);

DROP TABLE IF EXISTS `tablehints`;
CREATE TABLE `tablehints` (
	`crumbID` int(11) NOT NULL,
	`hint` VARCHAR(64) NOT NULL,
	`order` int(11) NOT NULL
);

ALTER TABLE `tablelogin`
	ADD PRIMARY KEY (`userID`),
	ADD UNIQUE KEY `username` (`username`);
	
ALTER TABLE `tablemaps`
	ADD PRIMARY KEY (`mapID`);

ALTER TABLE `tablecomments`
	ADD PRIMARY KEY (`commentID`);
	
ALTER TABLE `tableratings`
	ADD PRIMARY KEY (`ratingID`);

ALTER TABLE `tablebreadcrumbs`
	ADD PRIMARY KEY (`crumbID`);
	
ALTER TABLE `tabletypes`
	ADD PRIMARY KEY(`typeID`);
	
ALTER TABLE `tablelocations`
	ADD PRIMARY KEY(`locationID`);
    
ALTER TABLE `tablelogin`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT;
	
ALTER TABLE `tablemaps`
  MODIFY `mapID` int(11) NOT NULL AUTO_INCREMENT;
	
ALTER TABLE `tablecomments`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT;
	
ALTER TABLE `tableratings`
  MODIFY `ratingID` int(11) NOT NULL AUTO_INCREMENT;
	
ALTER TABLE `tablebreadcrumbs`
  MODIFY `crumbID` int(11) NOT NULL AUTO_INCREMENT;
	
ALTER TABLE `tabletypes`
  MODIFY `typeID` int(11) NOT NULL AUTO_INCREMENT;
	
ALTER TABLE `tablelocations`
  MODIFY `locationID` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `tablemaps`
	ADD CONSTRAINT `fk_map_userID`
		FOREIGN KEY (`userID`) REFERENCES `tablelogin`(`userID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
	ADD CONSTRAINT `fk_map_location`
		FOREIGN KEY (`locationID`) REFERENCES `tablelocations`(`locationID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT;
	
ALTER TABLE `tablecomments`
	ADD CONSTRAINT `fk_user_comment`
		FOREIGN KEY (`userID`) REFERENCES `tablelogin`(`userID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
	ADD CONSTRAINT `fk_map_comment`
		FOREIGN KEY (`mapID`) REFERENCES `tablemaps`(`mapID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT;
	
ALTER TABLE `tableratings`
	ADD CONSTRAINT `fk_user_rating`
		FOREIGN KEY (`userID`) REFERENCES `tablelogin`(`userID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
	ADD CONSTRAINT `fk_map_rating`
		FOREIGN KEY (`mapID`) REFERENCES `tablemaps`(`mapID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT;
		
ALTER TABLE `tablebreadcrumbs`
	ADD CONSTRAINT `fk_map_crumb`
		FOREIGN KEY (`mapID`) REFERENCES `tablemaps`(`mapID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT,
	ADD CONSTRAINT `fk_type_crumb`
		FOREIGN KEY (`typeID`) REFERENCES `tabletypes`(`typeID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT;
	
	
ALTER TABLE `tableriddles`
	ADD CONSTRAINT `fk_crumb_riddle`
		FOREIGN KEY (`crumbID`) REFERENCES `tablebreadcrumbs`(`crumbID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT;
	
ALTER TABLE `tablehints`
	ADD CONSTRAINT `fk_crumb_hint`
		FOREIGN KEY (`crumbID`) REFERENCES `tablebreadcrumbs`(`crumbID`)
		ON DELETE CASCADE
		ON UPDATE RESTRICT;	
	

	
