-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: *******    Database: volunfind
-- ------------------------------------------------------
-- Server version	8.0.28

-- No longer in use script. Table names would need to be updated

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`category`),
  UNIQUE KEY `category_UNIQUE` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `nonprofits`
--

DROP TABLE IF EXISTS `nonprofits`;
CREATE TABLE `nonprofits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `home_url` varchar(255) NOT NULL,
  `volunteer_url` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `logo_url` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `category_link_idx` (`category`),
  CONSTRAINT `category_foreign` FOREIGN KEY (`category`) REFERENCES `categories` (`category`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `times`
--

DROP TABLE IF EXISTS `times`;
CREATE TABLE `times` (
  `day` enum('sunday','monday','tuesday','wednesday','thursday','friday','saturday') NOT NULL,
  `nonprofitid` int NOT NULL,
  `start` decimal(3,1) NOT NULL,
  `end` decimal(3,1) NOT NULL,
  KEY `nonprofitlink_idx` (`nonprofitid`),
  KEY `day_idx` (`day`),
  KEY `time_idx` (`start`,`end`),
  CONSTRAINT `nonprofitlink` FOREIGN KEY (`nonprofitid`) REFERENCES `nonprofits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping routines for database 'volunfind'
--
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `find_matches`(IN availability JSON, IN result_limit INT, IN result_offset INT)
    SQL SECURITY INVOKER
BEGIN
SELECT DISTINCT(times.nonprofitid) FROM times JOIN
  (SELECT * FROM JSON_TABLE(availability, "$[*]" COLUMNS (
    day VARCHAR(8) PATH "$.day" ERROR ON EMPTY ERROR ON ERROR,
    start DECIMAL(3, 1) PATH "$.start" ERROR ON EMPTY ERROR ON ERROR,
    end DECIMAL(3, 1) PATH "$.end"
  )) as avail) as avail
        ON times.day=avail.day AND avail.start BETWEEN times.start AND times.end
  ORDER BY
    CASE
        WHEN times.end > avail.end THEN avail.end - avail.start
        ELSE times.end - avail.start
    END DESC,
    times.start - avail.start DESC
    LIMIT result_offset, result_limit;
END ;;
DELIMITER ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `get_nonprofits`(IN nonprofitids JSON)
    SQL SECURITY INVOKER
BEGIN
SELECT * FROM nonprofits WHERE id in (
	SELECT * FROM JSON_TABLE(nonprofitids,
		"$[*]" COLUMNS (
			id INT PATH "$.id" ERROR ON EMPTY ERROR ON ERROR
		)
	) as nonprofitids
  );
END ;;
DELIMITER ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `get_nonprofits_times`(IN nonprofitids JSON)
    SQL SECURITY INVOKER
BEGIN
SELECT * FROM times WHERE nonprofitid in (
	SELECT * FROM JSON_TABLE(nonprofitids,
		"$[*]" COLUMNS (
			id INT PATH "$.id" ERROR ON EMPTY ERROR ON ERROR
		)
	) as nonprofitids
  );
END ;;
DELIMITER ;
-- Dump completed on 2022-11-02 19:25:08
