CREATE DATABASE  IF NOT EXISTS `grindlays_resort` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `grindlays_resort`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: grindlays_resort
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bedtype`
--

DROP TABLE IF EXISTS `bedtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bedtype` (
  `id` int NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bedtype`
--

LOCK TABLES `bedtype` WRITE;
/*!40000 ALTER TABLE `bedtype` DISABLE KEYS */;
/*!40000 ALTER TABLE `bedtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country_code` varchar(45) NOT NULL,
  `country_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `country_code_UNIQUE` (`country_code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'+94','Sri lanka'),(2,'+91','India'),(3,'+93','Afghanistan'),(4,'+977','Nepal');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customernumber` varchar(45) NOT NULL,
  `fullname` varchar(45) NOT NULL,
  `nicorpassport` varchar(45) NOT NULL,
  `recident` tinyint NOT NULL,
  `gender` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `lan` varchar(45) DEFAULT NULL,
  `address` text NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `customerstatus_id` int NOT NULL,
  `addeddatetime` datetime NOT NULL,
  `updatedatetime` datetime DEFAULT NULL,
  `deletedatetime` datetime DEFAULT NULL,
  `updateuserid` int DEFAULT NULL,
  `deleteuserid` int DEFAULT NULL,
  `addeduserid` int NOT NULL,
  `note` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customernumber_UNIQUE` (`customernumber`),
  UNIQUE KEY `nicorpassport_UNIQUE` (`nicorpassport`),
  KEY `fk_customer_customerstatus1_idx` (`customerstatus_id`),
  CONSTRAINT `fk_customer_customerstatus1` FOREIGN KEY (`customerstatus_id`) REFERENCES `customerstatus` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customerstatus`
--

DROP TABLE IF EXISTS `customerstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerstatus` (
  `id` int NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerstatus`
--

LOCK TABLES `customerstatus` WRITE;
/*!40000 ALTER TABLE `customerstatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `customerstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `designation_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designation`
--

LOCK TABLES `designation` WRITE;
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
INSERT INTO `designation` VALUES (1,'Manager'),(2,'Cashier');
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employeeid` varchar(45) NOT NULL,
  `full_name` varchar(45) NOT NULL,
  `citizenship` varchar(10) NOT NULL,
  `country_id` int DEFAULT NULL,
  `nic` varchar(45) DEFAULT NULL,
  `passport` varchar(45) DEFAULT NULL,
  `gender` varchar(45) NOT NULL,
  `mobile` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `address` text NOT NULL,
  `date_of_birth` datetime NOT NULL,
  `civil_status` varchar(45) NOT NULL,
  `note` text,
  `designation_id` int NOT NULL,
  `add_date` datetime NOT NULL,
  `edit_date` datetime DEFAULT NULL,
  `delete_date` datetime DEFAULT NULL,
  `workingstatus_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile_UNIQUE` (`mobile`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `employee_id_UNIQUE` (`employeeid`),
  UNIQUE KEY `nic_UNIQUE` (`nic`),
  UNIQUE KEY `passport_UNIQUE` (`passport`),
  KEY `fk_employee_designation1_idx` (`designation_id`),
  KEY `fk_employee_workingstatus1_idx` (`workingstatus_id`),
  KEY `fk_employee_country1_idx` (`country_id`),
  CONSTRAINT `fk_employee_country1` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`),
  CONSTRAINT `fk_employee_designation1` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`id`),
  CONSTRAINT `fk_employee_workingstatus1` FOREIGN KEY (`workingstatus_id`) REFERENCES `workingstatus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'EMP0001','Akila weerasinghe','1',0,'982551754V',NULL,'male','0774585478','weerasingeh@gmail.com','asdd adasd','1999-11-14 00:00:00','single',NULL,1,'2024-02-09 00:00:00','2024-02-09 17:04:40','2024-02-10 13:16:08',2),(2,'EMP0002','NImini Reshani','0',0,'992551754V','21313132','male','0764585478','werasingeh@gmail.com','asdd adasd','1998-11-14 00:00:00','single',NULL,1,'2024-02-10 11:05:07','2024-02-10 13:30:23','2024-02-09 17:02:24',1),(3,'EMP0003','rha Reshani','1',1,'972551754V',NULL,'female','0764585474','wasingeh@gmail.com','asdd adasd','1998-11-14 00:00:00','single',NULL,1,'2024-02-10 11:05:07','2024-02-10 13:30:23','2024-02-09 17:02:24',1),(4,'EMP0004','','1',NULL,'982551757V','U12345678','Male','0775636604','akilamaduranganaweerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','2024-03-14 00:00:00','unmaried','',1,'2024-03-19 11:03:04',NULL,NULL,1),(5,'EMP0005','W A Akila madurangana Weerasinghe','1',NULL,'982851757V','U19345678','','0775736604','akilamadurnganaweerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','2005-02-05 00:00:00','Marid','',1,'2024-03-21 20:10:14',NULL,NULL,1),(6,'EMP0006','W A Akil madurangana Weerasinghe','1',NULL,'980551757V','EH878695','Male','0715636604','akilaaduranganaweerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','2002-02-22 00:00:00','unmaried','',2,'2024-03-22 01:22:31',NULL,NULL,1),(7,'EMP0007','W A Akila madurangana Weerasinghe','1',NULL,'983441757V','P4366918','Male','0715636645','akilmaduranganaweerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','2000-03-10 00:00:00','Marid','',2,'2024-03-22 15:00:00',NULL,NULL,1),(8,'EMP0008','W A Kasun madurangana Weerasinghe','1',NULL,'983441337V','P4366900','Male','0715636600','akilmakkranganaweerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','2000-03-10 00:00:00','Marid','',2,'2024-03-22 15:12:48',NULL,NULL,1),(9,'EMP0009','W A Krishan madurangana Weerasinghe','1',NULL,'874587854V',NULL,'Male','0777836604','akilamadurganaweerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','1999-06-08 00:00:00','unmaried','',2,'2024-03-22 15:19:32',NULL,NULL,1),(10,'EMP0010','W A Krishan madurangana Weerasinghe','1',NULL,'804587854V','','Male','0777036604','akilamadurganawzzrasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','1999-06-08 00:00:00','unmaried','',2,'2024-03-22 21:50:17',NULL,NULL,1),(11,'EMP0011','W A Akila madurangana Weerasinghe','0',NULL,'547891337V',NULL,'Male','0775636699','akilamadurzzzeerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','2000-03-20 00:00:00','Marid',NULL,2,'2024-03-22 22:17:41',NULL,NULL,1),(12,'EMP0012','W A Akila madurangana Weerasinghe','1',NULL,'981551757V',NULL,'Male','0771136604','akilamadzznganaweerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','2001-03-13 00:00:00','unmaried',NULL,2,'2024-03-23 13:32:48',NULL,NULL,1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `id` int NOT NULL,
  `feature` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ingredientscode` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meal`
--

DROP TABLE IF EXISTS `meal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meal` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal`
--

LOCK TABLES `meal` WRITE;
/*!40000 ALTER TABLE `meal` DISABLE KEYS */;
/*!40000 ALTER TABLE `meal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meal_has_ingredients`
--

DROP TABLE IF EXISTS `meal_has_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meal_has_ingredients` (
  `meal_id` int NOT NULL,
  `ingredients_id` int NOT NULL,
  PRIMARY KEY (`meal_id`,`ingredients_id`),
  KEY `fk_meal_has_ingredients_ingredients1_idx` (`ingredients_id`),
  KEY `fk_meal_has_ingredients_meal1_idx` (`meal_id`),
  CONSTRAINT `fk_meal_has_ingredients_ingredients1` FOREIGN KEY (`ingredients_id`) REFERENCES `ingredients` (`id`),
  CONSTRAINT `fk_meal_has_ingredients_meal1` FOREIGN KEY (`meal_id`) REFERENCES `meal` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal_has_ingredients`
--

LOCK TABLES `meal_has_ingredients` WRITE;
/*!40000 ALTER TABLE `meal_has_ingredients` DISABLE KEYS */;
/*!40000 ALTER TABLE `meal_has_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `id` int NOT NULL,
  `custome_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reservation_custome1_idx` (`custome_id`),
  CONSTRAINT `fk_reservation_custome1` FOREIGN KEY (`custome_id`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_has_room`
--

DROP TABLE IF EXISTS `reservation_has_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_has_room` (
  `reservation_id` int NOT NULL,
  `room_id` int NOT NULL,
  PRIMARY KEY (`reservation_id`,`room_id`),
  KEY `fk_reservation_has_room_room1_idx` (`room_id`),
  KEY `fk_reservation_has_room_reservation1_idx` (`reservation_id`),
  CONSTRAINT `fk_reservation_has_room_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`),
  CONSTRAINT `fk_reservation_has_room_room1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_has_room`
--

LOCK TABLES `reservation_has_room` WRITE;
/*!40000 ALTER TABLE `reservation_has_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation_has_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(45) NOT NULL,
  `maxheadcount` int NOT NULL,
  `roomstates_id` int NOT NULL,
  `bedcount` int DEFAULT NULL,
  `roomname` varchar(45) DEFAULT NULL,
  `roomtype_id` int NOT NULL,
  `bedtype_id` int NOT NULL,
  `viewtype_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `number_UNIQUE` (`number`),
  KEY `fk_room_roomstates1_idx` (`roomstates_id`),
  KEY `fk_room_roomtype1_idx` (`roomtype_id`),
  KEY `fk_room_bedtype1_idx` (`bedtype_id`),
  KEY `fk_room_viewtype1_idx` (`viewtype_id`),
  CONSTRAINT `fk_room_bedtype1` FOREIGN KEY (`bedtype_id`) REFERENCES `bedtype` (`id`),
  CONSTRAINT `fk_room_roomstates1` FOREIGN KEY (`roomstates_id`) REFERENCES `roomstates` (`id`),
  CONSTRAINT `fk_room_roomtype1` FOREIGN KEY (`roomtype_id`) REFERENCES `roomtype` (`id`),
  CONSTRAINT `fk_room_viewtype1` FOREIGN KEY (`viewtype_id`) REFERENCES `viewtype` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_has_features`
--

DROP TABLE IF EXISTS `room_has_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_has_features` (
  `room_id` int NOT NULL,
  `features_id` int NOT NULL,
  PRIMARY KEY (`room_id`,`features_id`),
  KEY `fk_room_has_features_features1_idx` (`features_id`),
  KEY `fk_room_has_features_room1_idx` (`room_id`),
  CONSTRAINT `fk_room_has_features_features1` FOREIGN KEY (`features_id`) REFERENCES `features` (`id`),
  CONSTRAINT `fk_room_has_features_room1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_has_features`
--

LOCK TABLES `room_has_features` WRITE;
/*!40000 ALTER TABLE `room_has_features` DISABLE KEYS */;
/*!40000 ALTER TABLE `room_has_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomstates`
--

DROP TABLE IF EXISTS `roomstates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomstates` (
  `id` int NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomstates`
--

LOCK TABLES `roomstates` WRITE;
/*!40000 ALTER TABLE `roomstates` DISABLE KEYS */;
/*!40000 ALTER TABLE `roomstates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomtype`
--

DROP TABLE IF EXISTS `roomtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomtype` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomtype`
--

LOCK TABLES `roomtype` WRITE;
/*!40000 ALTER TABLE `roomtype` DISABLE KEYS */;
/*!40000 ALTER TABLE `roomtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `passoword` varchar(45) DEFAULT NULL,
  `addeddate` datetime DEFAULT NULL,
  `updatedate` datetime DEFAULT NULL,
  `deletedate` datetime DEFAULT NULL,
  `status_id` int NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_status1_idx` (`status_id`),
  CONSTRAINT `fk_user_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viewtype`
--

DROP TABLE IF EXISTS `viewtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viewtype` (
  `id` int NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viewtype`
--

LOCK TABLES `viewtype` WRITE;
/*!40000 ALTER TABLE `viewtype` DISABLE KEYS */;
/*!40000 ALTER TABLE `viewtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workingstatus`
--

DROP TABLE IF EXISTS `workingstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workingstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workingstatus`
--

LOCK TABLES `workingstatus` WRITE;
/*!40000 ALTER TABLE `workingstatus` DISABLE KEYS */;
INSERT INTO `workingstatus` VALUES (1,'Add'),(2,'Remove');
/*!40000 ALTER TABLE `workingstatus` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-25 11:10:05
