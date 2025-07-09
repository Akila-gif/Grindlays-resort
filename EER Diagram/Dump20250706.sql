CREATE DATABASE  IF NOT EXISTS `grindlays_resort` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `grindlays_resort`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: grindlays_resort
-- ------------------------------------------------------
-- Server version	8.0.40

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
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bedtype`
--

LOCK TABLES `bedtype` WRITE;
/*!40000 ALTER TABLE `bedtype` DISABLE KEYS */;
INSERT INTO `bedtype` VALUES (1,'Single'),(2,'Double'),(3,'Queen'),(4,'King');
/*!40000 ALTER TABLE `bedtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Contract'),(2,'Permenent');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
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
  `title` varchar(10) DEFAULT NULL,
  `customernumber` varchar(45) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `nic` varchar(45) NOT NULL,
  `country_id` int NOT NULL,
  `gender` varchar(45) NOT NULL,
  `mobile` varchar(45) NOT NULL,
  `address` text NOT NULL,
  `date_of_birth` date NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `customerstatus_id` int NOT NULL,
  `addeddatetime` datetime NOT NULL,
  `updatedatetime` datetime DEFAULT NULL,
  `deletedatetime` datetime DEFAULT NULL,
  `updateuserid` int DEFAULT NULL,
  `deleteuserid` int DEFAULT NULL,
  `addeduserid` int DEFAULT NULL,
  `note` text,
  `emg_cont_number` varchar(15) DEFAULT NULL,
  `emg_name` varchar(45) DEFAULT NULL,
  `passport` varchar(45) DEFAULT NULL,
  `citizenship` tinyint DEFAULT NULL,
  `civil_status` varchar(45) DEFAULT NULL,
  `editdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customernumber_UNIQUE` (`customernumber`),
  UNIQUE KEY `nicorpassport_UNIQUE` (`nic`),
  KEY `fk_customer_customerstatus1_idx` (`customerstatus_id`),
  KEY `fk_customer_country1_idx` (`country_id`),
  CONSTRAINT `fk_customer_country1` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`),
  CONSTRAINT `fk_customer_customerstatus1` FOREIGN KEY (`customerstatus_id`) REFERENCES `customerstatus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (2,'Mr','CUS1','Akila Weerasinghe','982551757V',1,'male','0775636604','nawala rajagiriya','1998-09-11','akilaweerasinghe@gmail.com',4,'2024-02-09 00:00:00',NULL,'2024-08-22 12:49:10',NULL,NULL,NULL,NULL,'0716052614','Kusu','78954678',1,'Marid',NULL),(3,'Mr','CUS2','kasun kalhara','984757487V',1,'Male','0757898789','no22 dampelessa Alawwa','1998-08-06','kasunkalhara@gmail.com',3,'2024-08-22 09:46:53',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'789654',1,'Marid',NULL),(4,'Mr','CUS3','Aruth Lakshan','981745698V',1,'Male','0716052614','no22 dampelessa Alawwa','1999-08-05','aruthlak@gmail.com',4,'2024-08-22 09:56:29',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'789456',1,'Marid',NULL),(5,'Mr','CUS4','Aruth Lakshan','981745645V',1,'Male','0716545789','no22 dampelessa Alawwa','1999-08-05','aruthlaks@gmail.com',3,'2024-08-22 10:09:36',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'789457',1,'Marid',NULL),(6,'Mrs','CUS5','NImni Reshani','894567894V',1,'Male','0764974060','no22 dampelessa Alawwa','1999-07-27','nimnireshani@gmail.com',1,'2024-08-22 10:32:04',NULL,NULL,NULL,NULL,NULL,NULL,'0775636604','Aklila','321645',1,'Marid','2024-08-23 11:37:36'),(7,'Mr','CUS6','Lahiru kumara','997894578V',1,'Male','0753523005','no 34 ,hiawheia, hnaiwea','1999-08-15','lahirukm@gmail.com',1,'2024-08-23 11:24:21',NULL,NULL,NULL,NULL,NULL,NULL,'0715647854','kasuni','78965474',1,'Marid','2024-08-23 11:34:34'),(8,'Mr','CUS7','BIruara Lakshan','234567894V',3,'Male','0771475487','no21 kowaea mawka na','2000-08-06','dssfs@gmail.com',3,'2024-08-23 11:47:55',NULL,NULL,NULL,NULL,NULL,NULL,'0714578963','Kasuni','1236547',0,'Marid',NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customerstatus`
--

DROP TABLE IF EXISTS `customerstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerstatus`
--

LOCK TABLES `customerstatus` WRITE;
/*!40000 ALTER TABLE `customerstatus` DISABLE KEYS */;
INSERT INTO `customerstatus` VALUES (1,'checking'),(2,'checkedout'),(3,'inactive'),(4,'delete');
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
  `date_of_recruitment` date NOT NULL,
  `epf_number` varchar(45) NOT NULL,
  `etf_number` varchar(45) NOT NULL,
  `basicsalary` decimal(10,2) NOT NULL,
  `designation_id` int NOT NULL,
  `add_date` datetime NOT NULL,
  `edit_date` datetime DEFAULT NULL,
  `delete_date` datetime DEFAULT NULL,
  `workingstatus_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile_UNIQUE` (`mobile`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `employee_id_UNIQUE` (`employeeid`),
  UNIQUE KEY `nic_UNIQUE` (`nic`),
  UNIQUE KEY `passport_UNIQUE` (`passport`),
  KEY `fk_employee_designation1_idx` (`designation_id`),
  KEY `fk_employee_workingstatus1_idx` (`workingstatus_id`),
  KEY `fk_employee_country1_idx` (`country_id`),
  KEY `fk_employee_category1_idx` (`category_id`),
  CONSTRAINT `fk_employee_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_employee_country1` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`),
  CONSTRAINT `fk_employee_designation1` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`id`),
  CONSTRAINT `fk_employee_workingstatus1` FOREIGN KEY (`workingstatus_id`) REFERENCES `workingstatus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'EMP0001','Akila weerasinghe','1',0,'982551754V',NULL,'male','0774585478','weerasingeh@gmail.com','asdd adasd','1999-11-14 00:00:00','unmaried',NULL,'2024-06-09','123450','123450',123.23,1,'2024-02-09 00:00:00','2024-02-09 17:04:40','2024-02-10 13:16:08',1,1),(2,'EMP0002','NImini Reshani','0',2,'992551754V','21313132','male','0764585478','werasingeh@gmail.com','asdd adasd','1998-11-14 00:00:00','unmaried',NULL,'2024-06-09','123451','123451',123.00,1,'2024-02-10 11:05:07','2024-02-10 13:30:23','2024-02-09 17:02:24',1,1),(3,'EMP0003','rha Reshani','1',1,'972551754V',NULL,'female','0764585474','wasingeh@gmail.com','asdd adasd','1998-11-14 00:00:00','unmaried',NULL,'2024-06-09','123452','123452',123.00,1,'2024-02-10 11:05:07','2024-02-10 13:30:23','2024-08-28 09:54:02',1,1),(4,'EMP0004','Kasun Shanaka','1',1,'982551757V','U12345678','Male','0775636604','akilamaduranganaweerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','1975-03-14 00:00:00','unmaried','','2024-06-09','123453','123453',123.00,1,'2024-03-19 11:03:04',NULL,'2024-03-28 11:57:33',1,2),(5,'EMP0005','W A Akila madurangana Weerasinghe','1',1,'982851757V','U19345678','','0775736604','akilamadurnganaweerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','1979-02-05 00:00:00','Marid','','2024-06-09','123454','123454',123.00,1,'2024-03-21 20:10:14',NULL,NULL,1,2),(6,'EMP0006','W A Akil madurangana Weerasinghe','1',1,'980551757V','EH878695','Male','0715636604','akilaaduranganaweerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','1985-02-22 00:00:00','unmaried','','2024-06-09','123455','123455',123.00,2,'2024-03-22 01:22:31',NULL,'2024-05-26 20:29:15',2,1),(7,'EMP0007','W A Akila madurangana Weerasinghe','1',1,'983441757V','P4366918','Male','0715636645','akilmaduranganaweerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','1984-03-10 00:00:00','Marid','','2024-06-09','123456','123456',123.00,2,'2024-03-22 15:00:00',NULL,'2024-06-13 02:14:03',2,1),(8,'EMP0008','W A Kasun madurangana Weerasinghe','1',1,'983441337V','P4366900','Male','0715636600','akilmakkranganaweerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','1984-03-10 00:00:00','Marid',NULL,'2024-06-09','123457','123457',123.00,2,'2024-03-22 15:12:48','2024-06-13 03:29:19',NULL,1,2),(9,'EMP0009','W A Krishan madurangana Weerasinghe','1',1,'874587854V',NULL,'Male','0777836604','akilamadurganaweerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','1999-06-08 00:00:00','unmaried','','2024-06-09','123458','123458',123.00,2,'2024-03-22 15:19:32',NULL,'2024-03-28 12:10:44',2,1),(10,'EMP0010','W A Krishan madurangana Weerasinghe','1',1,'804587854V',NULL,'Male','0777036604','akilamadurganawzzrasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','1999-06-08 00:00:00','unmaried','','2024-06-09','123459','123459',123.00,2,'2024-03-22 21:50:17',NULL,'2024-03-28 12:01:28',2,1),(11,'EMP0011','W A Akila madurangana Weerasinghe','0',2,'547891337V','98745784','Male','0775636699','akilamadurzzzeerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','1995-03-20 00:00:00','Marid',NULL,'2024-06-09','123460','123460',123.00,2,'2024-03-22 22:17:41','2024-06-13 03:26:55',NULL,1,2),(12,'EMP0012','W A Akila madurangana Weerasinghe','1',1,'981551757V',NULL,'Male','0771136604','akilamadzznganaweerasinghe@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla\nAlawwa','1995-03-13 00:00:00','unmaried',NULL,'2024-06-09','123461','123461',123.00,2,'2024-03-23 13:32:48','2024-06-13 03:21:53','2024-06-14 11:10:05',2,1),(13,'EMP0013','Lahiru Hettiarachchi','1',1,'992551234V',NULL,'Male','0755636604','lahiruas@gmail.com','No44,kohollepitiyawatta, Hittarapola, Maharachchimulla','1997-06-18 00:00:00','Marid',NULL,'2024-06-09','123462','123462',123.00,1,'2024-06-12 16:11:02',NULL,'2024-08-04 10:54:10',2,1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extraservice`
--

DROP TABLE IF EXISTS `extraservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extraservice` (
  `id` int NOT NULL,
  `discription` varchar(255) DEFAULT NULL,
  `service_category_id` int NOT NULL,
  `reservation_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_extraservice_service_category1_idx` (`service_category_id`),
  KEY `fk_extraservice_reservation1_idx` (`reservation_id`),
  CONSTRAINT `fk_extraservice_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`),
  CONSTRAINT `fk_extraservice_service_category1` FOREIGN KEY (`service_category_id`) REFERENCES `service_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extraservice`
--

LOCK TABLES `extraservice` WRITE;
/*!40000 ALTER TABLE `extraservice` DISABLE KEYS */;
/*!40000 ALTER TABLE `extraservice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `feature` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (1,'AC'),(2,'not-AC'),(3,'Mini bar'),(4,'Wifi'),(5,'MiniBar');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foodcategory`
--

DROP TABLE IF EXISTS `foodcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foodcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foodcategory`
--

LOCK TABLES `foodcategory` WRITE;
/*!40000 ALTER TABLE `foodcategory` DISABLE KEYS */;
INSERT INTO `foodcategory` VALUES (1,'Meat'),(2,'Vegetables'),(3,'Sauces'),(4,'Rice');
/*!40000 ALTER TABLE `foodcategory` ENABLE KEYS */;
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
  `ingredientsstatus_id` int NOT NULL,
  `foodcategory_id` int NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `count` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ingredients_ingredientsstatus1_idx` (`ingredientsstatus_id`),
  KEY `fk_ingredients_foodcategory1_idx` (`foodcategory_id`),
  CONSTRAINT `fk_ingredients_foodcategory1` FOREIGN KEY (`foodcategory_id`) REFERENCES `foodcategory` (`id`),
  CONSTRAINT `fk_ingredients_ingredientsstatus1` FOREIGN KEY (`ingredientsstatus_id`) REFERENCES `ingredientsstatus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'ING001','Chicken',1,1,250.00,50),(6,'ING002','Basmati Rice',1,2,150.00,50),(7,'ING003','Carrot',1,4,150.00,30);
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredientsstatus`
--

DROP TABLE IF EXISTS `ingredientsstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredientsstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quentity_status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredientsstatus`
--

LOCK TABLES `ingredientsstatus` WRITE;
/*!40000 ALTER TABLE `ingredientsstatus` DISABLE KEYS */;
INSERT INTO `ingredientsstatus` VALUES (1,'Available'),(2,'Not-Available'),(3,'Low-Quantity');
/*!40000 ALTER TABLE `ingredientsstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `per_amount_price` decimal(10,2) DEFAULT NULL,
  `menu_category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_menu_menu_category1_idx` (`menu_category_id`),
  CONSTRAINT `fk_menu_menu_category1` FOREIGN KEY (`menu_category_id`) REFERENCES `menu_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Burger meal',1500.00,1),(2,'Submarine meal',1000.00,2),(3,'Set menu',1200.00,2);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_category`
--

DROP TABLE IF EXISTS `menu_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_category`
--

LOCK TABLES `menu_category` WRITE;
/*!40000 ALTER TABLE `menu_category` DISABLE KEYS */;
INSERT INTO `menu_category` VALUES (1,'Other'),(2,'Table d’Hôte Menu (Set Menu)'),(3,'Buffet Menu'),(4,'In-Room Dining Menu'),(5,'Dessert Menu'),(6,'Beverage'),(7,'Special / Seasonal Menu'),(8,'Kids Menu'),(9,'Health Menu'),(10,'Café Menu'),(11,'Tasting Menu'),(12,'Banquet Menu'),(13,'Brunch Menu'),(14,'Live Counter Menu'),(15,'Themed Menu'),(16,'Senior Citizen Menu'),(17,'Takeaway '),(18,'Chef’s Special'),(19,'Vegan'),(20,'Gala Dinner Menu'),(21,'Ala Carte Menu');
/*!40000 ALTER TABLE `menu_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_has_menuitem`
--

DROP TABLE IF EXISTS `menu_has_menuitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_has_menuitem` (
  `menu_id` int NOT NULL,
  `menuitem_id` int NOT NULL,
  PRIMARY KEY (`menu_id`,`menuitem_id`),
  KEY `fk_menu_has_menuitem_menuitem1_idx` (`menuitem_id`),
  KEY `fk_menu_has_menuitem_menu1_idx` (`menu_id`),
  CONSTRAINT `fk_menu_has_menuitem_menu1` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`),
  CONSTRAINT `fk_menu_has_menuitem_menuitem1` FOREIGN KEY (`menuitem_id`) REFERENCES `menuitem` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_has_menuitem`
--

LOCK TABLES `menu_has_menuitem` WRITE;
/*!40000 ALTER TABLE `menu_has_menuitem` DISABLE KEYS */;
INSERT INTO `menu_has_menuitem` VALUES (1,1),(1,2);
/*!40000 ALTER TABLE `menu_has_menuitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menuitem`
--

DROP TABLE IF EXISTS `menuitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menuitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menuitem`
--

LOCK TABLES `menuitem` WRITE;
/*!40000 ALTER TABLE `menuitem` DISABLE KEYS */;
INSERT INTO `menuitem` VALUES (1,'Green Salad'),(2,'Hot Garlic Sauce');
/*!40000 ALTER TABLE `menuitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menuitem_has_ingredients`
--

DROP TABLE IF EXISTS `menuitem_has_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menuitem_has_ingredients` (
  `menuitem_id` int NOT NULL,
  `ingredients_id` int NOT NULL,
  PRIMARY KEY (`menuitem_id`,`ingredients_id`),
  KEY `fk_menuitem_has_ingredients_ingredients1_idx` (`ingredients_id`),
  KEY `fk_menuitem_has_ingredients_menuitem1_idx` (`menuitem_id`),
  CONSTRAINT `fk_menuitem_has_ingredients_ingredients1` FOREIGN KEY (`ingredients_id`) REFERENCES `ingredients` (`id`),
  CONSTRAINT `fk_menuitem_has_ingredients_menuitem1` FOREIGN KEY (`menuitem_id`) REFERENCES `menuitem` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menuitem_has_ingredients`
--

LOCK TABLES `menuitem_has_ingredients` WRITE;
/*!40000 ALTER TABLE `menuitem_has_ingredients` DISABLE KEYS */;
INSERT INTO `menuitem_has_ingredients` VALUES (1,1),(1,6),(2,7);
/*!40000 ALTER TABLE `menuitem_has_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES (1,'Employee'),(2,'User'),(3,'Privilage'),(4,'Customer'),(5,'Room');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_method`
--

DROP TABLE IF EXISTS `payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_method` (
  `id` int NOT NULL AUTO_INCREMENT,
  `method` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_method`
--

LOCK TABLES `payment_method` WRITE;
/*!40000 ALTER TABLE `payment_method` DISABLE KEYS */;
INSERT INTO `payment_method` VALUES (1,'Card Payment'),(2,'Cash Payment');
/*!40000 ALTER TABLE `payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilage`
--

DROP TABLE IF EXISTS `privilage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privilage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `insert` tinyint NOT NULL,
  `delete` tinyint NOT NULL,
  `select` tinyint NOT NULL,
  `update` tinyint NOT NULL,
  `role_id` int NOT NULL,
  `module_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_privilage_role1_idx` (`role_id`),
  KEY `fk_privilage_module1_idx` (`module_id`),
  CONSTRAINT `fk_privilage_module1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`),
  CONSTRAINT `fk_privilage_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilage`
--

LOCK TABLES `privilage` WRITE;
/*!40000 ALTER TABLE `privilage` DISABLE KEYS */;
INSERT INTO `privilage` VALUES (1,1,1,1,1,1,1),(4,0,1,1,0,1,2),(5,1,1,1,1,2,4),(6,1,1,1,1,3,3),(7,1,0,1,0,1,5),(8,1,1,1,1,5,1),(9,1,0,0,0,5,2);
/*!40000 ALTER TABLE `privilage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservation_number` varchar(45) DEFAULT NULL,
  `Headcount` int DEFAULT NULL,
  `state_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `reservationtotalpayment` decimal(10,2) DEFAULT NULL,
  `paymentstatus` tinyint DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `totalpaidamount` decimal(10,2) DEFAULT NULL,
  `addeddate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reservation_state1_idx` (`state_id`),
  KEY `fk_reservation_customer1_idx` (`customer_id`),
  CONSTRAINT `fk_reservation_customer1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `fk_reservation_state1` FOREIGN KEY (`state_id`) REFERENCES `reservation_state` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (1,'RES10',0,1,2,10000.00,0,100.00,33102.00,'2024-02-09 00:00:00'),(21,'RES11',5,4,2,10000.00,0,100.00,1200.00,'2024-02-09 00:00:00'),(22,'RES3',5,1,2,10000.00,0,1000.00,6000.00,'2024-02-09 00:00:00'),(23,'RES4',5,1,2,10000.00,0,1000.00,6000.00,'2024-02-09 00:00:00'),(24,'RES5',7,1,2,10000.00,0,1000.00,6000.00,'2024-02-09 00:00:00'),(25,'RES6',7,1,2,10000.00,0,1000.00,6000.00,'2024-02-09 00:00:00'),(26,'RES7',7,1,2,10000.00,0,1000.00,6000.00,'2024-02-09 00:00:00'),(27,'RES8',7,1,2,10000.00,0,100.00,1200.00,'2024-02-09 00:00:00'),(28,'RES9',7,1,3,10000.00,0,100.00,1200.00,'2024-02-09 00:00:00'),(31,'RES10',7,1,4,10000.00,0,100.00,1200.00,'2024-02-09 00:00:00'),(32,'RES10',7,1,4,10000.00,0,100.00,1200.00,'2024-02-09 00:00:00');
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_has_menu`
--

DROP TABLE IF EXISTS `reservation_has_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_has_menu` (
  `reservation_id` int NOT NULL,
  `menu_id` int NOT NULL,
  `quentity` int NOT NULL,
  `totalprice` decimal(10,2) NOT NULL,
  `dateandtime` datetime NOT NULL,
  PRIMARY KEY (`reservation_id`,`menu_id`),
  KEY `fk_reservation_has_menu_menu1_idx` (`menu_id`),
  KEY `fk_reservation_has_menu_reservation1_idx` (`reservation_id`),
  CONSTRAINT `fk_reservation_has_menu_menu1` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`),
  CONSTRAINT `fk_reservation_has_menu_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_has_menu`
--

LOCK TABLES `reservation_has_menu` WRITE;
/*!40000 ALTER TABLE `reservation_has_menu` DISABLE KEYS */;
INSERT INTO `reservation_has_menu` VALUES (1,1,2,1200.00,'2025-07-06 13:30:00');
/*!40000 ALTER TABLE `reservation_has_menu` ENABLE KEYS */;
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
  `checkingdate` date DEFAULT NULL,
  `checkoutdate` date DEFAULT NULL,
  `reservation_room_status_id` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`reservation_id`,`room_id`),
  KEY `fk_reservation_has_room_room1_idx` (`room_id`),
  KEY `fk_reservation_has_room_reservation1_idx` (`reservation_id`),
  KEY `fk_reservation_has_room_reservation_room_status1_idx` (`reservation_room_status_id`),
  CONSTRAINT `fk_reservation_has_room_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`),
  CONSTRAINT `fk_reservation_has_room_reservation_room_status1` FOREIGN KEY (`reservation_room_status_id`) REFERENCES `reservation_room_status` (`id`),
  CONSTRAINT `fk_reservation_has_room_room1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_has_room`
--

LOCK TABLES `reservation_has_room` WRITE;
/*!40000 ALTER TABLE `reservation_has_room` DISABLE KEYS */;
INSERT INTO `reservation_has_room` VALUES (1,1,'2024-10-20','2024-10-20',3),(1,14,'2024-12-23','2024-12-23',4),(1,21,'2025-05-12','2025-05-12',3),(1,25,'2025-05-11','2025-05-16',4),(1,26,'2025-05-12','2025-05-16',4),(21,21,'2025-05-11','2025-05-17',3),(21,23,'2025-05-11','2025-05-17',3),(21,24,'2024-12-23','2024-12-23',3),(21,25,'2024-12-23','2024-12-23',3),(21,26,'2024-12-23','2024-12-29',4),(22,24,'2024-12-23','2024-12-29',0),(22,25,'2024-12-23','2024-12-29',0),(22,26,'2024-12-23','2024-12-29',0),(23,24,'2024-12-23','2024-12-29',0),(23,25,'2024-12-23','2024-12-29',0),(23,26,'2024-12-23','2024-12-29',0),(24,25,NULL,NULL,0),(24,26,NULL,NULL,0),(25,25,NULL,NULL,0),(25,26,NULL,NULL,0),(26,25,NULL,NULL,0),(26,26,NULL,NULL,0),(27,24,'2025-01-08','2025-01-07',0),(27,25,'2025-01-08','2025-01-07',0),(27,26,'2025-01-08','2025-01-07',0),(28,25,'2025-01-12','2025-01-16',0),(28,26,'2025-01-12','2025-01-16',1),(31,23,'2025-05-07','2025-05-10',1),(31,25,'2025-05-07','2025-05-10',1),(31,26,'2025-05-07','2025-05-10',1),(32,18,'2025-05-07','2025-05-10',1),(32,20,'2025-05-07','2025-05-10',1),(32,23,'2025-05-07','2025-05-10',1);
/*!40000 ALTER TABLE `reservation_has_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_has_roompackage`
--

DROP TABLE IF EXISTS `reservation_has_roompackage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_has_roompackage` (
  `reservation_id` int NOT NULL,
  `roompackage_id` int NOT NULL,
  `amount` int DEFAULT NULL,
  `totalprice` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`,`roompackage_id`),
  KEY `fk_reservation_has_roompackage_roompackage1_idx` (`roompackage_id`),
  KEY `fk_reservation_has_roompackage_reservation1_idx` (`reservation_id`),
  CONSTRAINT `fk_reservation_has_roompackage_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`),
  CONSTRAINT `fk_reservation_has_roompackage_roompackage1` FOREIGN KEY (`roompackage_id`) REFERENCES `roompackage` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_has_roompackage`
--

LOCK TABLES `reservation_has_roompackage` WRITE;
/*!40000 ALTER TABLE `reservation_has_roompackage` DISABLE KEYS */;
INSERT INTO `reservation_has_roompackage` VALUES (1,2,1,3500.00),(1,3,1,4500.00),(22,1,4,7025.00),(22,3,4,4500.00),(23,1,4,7025.00),(23,3,4,4500.00),(24,1,NULL,NULL),(24,2,NULL,NULL),(25,1,NULL,NULL),(25,2,NULL,NULL),(26,1,NULL,NULL),(26,2,NULL,NULL),(27,1,2,7025.00),(28,1,2,7025.00),(31,1,2,7025.00),(31,2,2,3500.00),(32,1,2,7025.00),(32,2,2,3500.00);
/*!40000 ALTER TABLE `reservation_has_roompackage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_has_service`
--

DROP TABLE IF EXISTS `reservation_has_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_has_service` (
  `reservation_id` int NOT NULL,
  `service_id` int NOT NULL,
  `amount` int DEFAULT NULL,
  `totalprice` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`,`service_id`),
  KEY `fk_reservation_has_service_service1_idx` (`service_id`),
  KEY `fk_reservation_has_service_reservation1_idx` (`reservation_id`),
  CONSTRAINT `fk_reservation_has_service_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`),
  CONSTRAINT `fk_reservation_has_service_service1` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_has_service`
--

LOCK TABLES `reservation_has_service` WRITE;
/*!40000 ALTER TABLE `reservation_has_service` DISABLE KEYS */;
INSERT INTO `reservation_has_service` VALUES (1,1,7,7000.00),(1,3,2,5002.00),(22,1,4,4000.00),(22,4,4,18096.00),(23,1,4,4000.00),(23,4,4,18096.00),(24,1,NULL,NULL),(25,1,NULL,NULL),(26,1,NULL,NULL),(27,1,2,2000.00),(28,1,2,2000.00),(31,3,1,2501.00),(32,3,1,2501.00);
/*!40000 ALTER TABLE `reservation_has_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_room_status`
--

DROP TABLE IF EXISTS `reservation_room_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_room_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_room_status`
--

LOCK TABLES `reservation_room_status` WRITE;
/*!40000 ALTER TABLE `reservation_room_status` DISABLE KEYS */;
INSERT INTO `reservation_room_status` VALUES (1,'checked in'),(2,'checked out'),(3,'reserved'),(4,'cancel');
/*!40000 ALTER TABLE `reservation_room_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_state`
--

DROP TABLE IF EXISTS `reservation_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_state` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_state`
--

LOCK TABLES `reservation_state` WRITE;
/*!40000 ALTER TABLE `reservation_state` DISABLE KEYS */;
INSERT INTO `reservation_state` VALUES (1,'available'),(2,'unavailable'),(3,'reservation update'),(4,'Canceled');
/*!40000 ALTER TABLE `reservation_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservationpayment`
--

DROP TABLE IF EXISTS `reservationpayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservationpayment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservation_id` int NOT NULL,
  `paidamount` decimal(10,2) DEFAULT NULL,
  `dateandtime` datetime DEFAULT NULL,
  `discription` varchar(45) DEFAULT NULL,
  `payment_method_id` int NOT NULL,
  PRIMARY KEY (`id`,`payment_method_id`),
  KEY `fk_ReservationPayment_payment_method1_idx` (`payment_method_id`),
  KEY `fk_ReservationPayment_reservation1_idx` (`reservation_id`),
  CONSTRAINT `fk_ReservationPayment_payment_method1` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`),
  CONSTRAINT `fk_ReservationPayment_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservationpayment`
--

LOCK TABLES `reservationpayment` WRITE;
/*!40000 ALTER TABLE `reservationpayment` DISABLE KEYS */;
INSERT INTO `reservationpayment` VALUES (1,27,1000.00,'2025-01-12 16:37:40','pay for thing',1),(2,28,1000.00,'2025-01-12 16:48:53','pay for thing',1),(3,31,1000.00,'2025-05-07 01:24:48','pay for thing',1),(4,32,1000.00,'2025-05-07 01:25:50','pay for thing',1),(5,1,1000.00,'2025-05-07 09:32:29','pay for thing',1),(6,1,1000.00,'2025-05-07 09:38:12','pay for thing',1),(7,1,1000.00,'2025-05-07 09:41:20','pay for thing',1),(8,1,1000.00,'2025-05-07 09:46:42','pay for thing',1),(9,1,1000.00,'2025-05-07 10:01:56','pay for thing',1),(10,1,1000.00,'2025-05-07 12:46:08','pay for thing',1),(11,1,1000.00,'2025-05-07 12:53:03','pay for thing',1),(12,1,1000.00,'2025-05-07 13:34:36','pay for thing',1),(13,1,1000.00,'2025-05-07 13:36:13','pay for thing',1),(14,1,1000.00,'2025-05-07 13:38:21','pay for thing',1),(15,1,1000.00,'2025-05-07 13:40:04','pay for thing',1),(16,1,1000.00,'2025-05-08 10:50:27','pay for thing',1),(17,1,1000.00,'2025-05-08 11:17:35','pay for thing',1),(18,1,1000.00,'2025-05-08 11:29:55','pay for thing',1),(19,1,1000.00,'2025-05-08 11:36:57','pay for thing',1),(20,1,1000.00,'2025-05-08 11:44:34','pay for thing',1),(21,1,1000.00,'2025-05-08 12:14:46','pay for thing',1),(22,1,1000.00,'2025-05-08 12:21:00','pay for thing',1),(23,1,1000.00,'2025-05-08 12:58:59','pay for thing',1),(24,1,1000.00,'2025-05-08 13:02:33','pay for thing',1),(25,1,1000.00,'2025-05-08 13:29:44','pay for thing',1),(26,1,1000.00,'2025-05-08 13:33:22','pay for thing',1),(27,1,1000.00,'2025-05-08 21:55:44','pay for thing',1),(28,1,1000.00,'2025-05-08 22:15:54','pay for thing',1),(29,1,1000.00,'2025-05-08 22:30:19','pay for thing',1),(30,1,1000.00,'2025-05-08 22:37:28','pay for thing',1),(31,1,1000.00,'2025-05-09 00:05:34','pay for thing',1),(32,1,1000.00,'2025-05-09 00:13:42','pay for thing',1),(33,1,1000.00,'2025-05-09 07:47:37','pay for thing',1),(34,1,1000.00,'2025-05-09 12:12:45','pay for thing',1),(35,1,1000.00,'2025-05-09 12:19:35','pay for thing',1),(36,1,1000.00,'2025-05-09 12:53:00','pay for thing',1),(37,1,1000.00,'2025-05-09 12:56:37','pay for thing',1),(38,21,1000.00,'2025-05-10 08:39:13','pay for thing',1),(39,1,1000.00,'2025-05-10 09:33:59','pay for thing',1),(40,1,1000.00,'2025-05-10 09:51:59','pay for thing',1),(41,1,1000.00,'2025-05-10 21:39:11','pay for thing',1),(42,1,1000.00,'2025-05-12 10:12:55','pay for thing',1),(43,1,1000.00,'2025-05-13 12:35:24','pay for thing',1),(44,1,1000.00,'2025-05-13 12:37:37','pay for thing',1),(45,1,1000.00,'2025-05-13 12:37:45','pay for thing',1);
/*!40000 ALTER TABLE `reservationpayment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Manager'),(2,'Assistant_Manager'),(3,'Receptionist'),(4,'Owner'),(5,'admin');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
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
  `roomname` varchar(45) DEFAULT NULL,
  `roomtype_id` int NOT NULL,
  `viewtype_id` int NOT NULL,
  `roomprice` decimal(10,0) DEFAULT NULL,
  `totalbedcount` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `number_UNIQUE` (`number`),
  KEY `fk_room_roomstates1_idx` (`roomstates_id`),
  KEY `fk_room_roomtype1_idx` (`roomtype_id`),
  KEY `fk_room_viewtype1_idx` (`viewtype_id`),
  CONSTRAINT `fk_room_roomstates1` FOREIGN KEY (`roomstates_id`) REFERENCES `roomstates` (`id`),
  CONSTRAINT `fk_room_roomtype1` FOREIGN KEY (`roomtype_id`) REFERENCES `roomtype` (`id`),
  CONSTRAINT `fk_room_viewtype1` FOREIGN KEY (`viewtype_id`) REFERENCES `viewtype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'R0001',5,3,'garden view Luxury 7 person',3,1,5000,NULL),(13,'R0002',6,3,'garden view Deluxe 7 person',1,1,1345,NULL),(14,'R0003',3,3,'garden view Luxury 6 person',3,1,12343,NULL),(15,'R0004',10,3,'garden view Suit 12 person',2,1,12341,NULL),(16,'R0005',10,3,'garden view Suit 12 person',2,1,12341,NULL),(17,'R0006',2,1,'garden view Suit 2 person',2,1,12341,NULL),(18,'R0007',2,1,'garden view Suit 2 person',2,1,12341,NULL),(19,'R0008',2,3,'garden view Suit 2 person',2,1,12341,NULL),(20,'R0009',2,1,'garden view Suit 2 person',2,1,12341,NULL),(21,'R0010',2,1,'garden view Suit 2 person',2,1,12341,NULL),(22,'R0011',2,3,'garden view Suit 2 person',2,1,12341,NULL),(23,'R0012',5,1,'garden view Suit 5 person',2,1,12341,NULL),(24,'R0013',2,1,'garden view Luxury 2 person',3,1,23244,NULL),(25,'R0014',1,1,'Mount View Luxury 1 person',3,2,12343,NULL),(26,'R0015',2,1,'garden view Suit 2 person',2,1,1234,NULL),(27,'R0016',3,3,'garden view Suit 3 person',2,1,12343,NULL);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_has_bedtype`
--

DROP TABLE IF EXISTS `room_has_bedtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_has_bedtype` (
  `room_id` int NOT NULL,
  `bedtype_id` int NOT NULL,
  `bed_count` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`,`room_id`,`bedtype_id`),
  KEY `fk_room_has_bedtype_bedtype1_idx` (`bedtype_id`),
  KEY `fk_room_has_bedtype_room1_idx` (`room_id`),
  CONSTRAINT `fk_room_has_bedtype_bedtype1` FOREIGN KEY (`bedtype_id`) REFERENCES `bedtype` (`id`),
  CONSTRAINT `fk_room_has_bedtype_room1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_has_bedtype`
--

LOCK TABLES `room_has_bedtype` WRITE;
/*!40000 ALTER TABLE `room_has_bedtype` DISABLE KEYS */;
INSERT INTO `room_has_bedtype` VALUES (17,2,3,10),(18,2,1,11),(19,2,1,12),(20,2,1,13),(21,2,1,14),(22,2,1,15),(23,2,1,16),(23,3,1,17),(23,1,1,18),(24,2,1,19),(25,1,1,20),(26,1,2,21),(27,2,1,39),(27,1,1,40),(14,2,1,102),(14,4,1,103),(15,2,1,112),(15,1,10,113),(16,1,10,114),(13,2,3,115),(1,1,2,116),(1,4,1,117);
/*!40000 ALTER TABLE `room_has_bedtype` ENABLE KEYS */;
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
INSERT INTO `room_has_features` VALUES (1,1),(13,1),(14,1),(23,1),(24,1),(25,1),(26,1),(27,1),(27,2),(15,3),(16,3),(17,3),(18,3),(19,3),(20,3),(21,3),(22,3),(23,3),(25,3),(1,4);
/*!40000 ALTER TABLE `room_has_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roompackage`
--

DROP TABLE IF EXISTS `roompackage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roompackage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `packagename` varchar(45) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roompackage`
--

LOCK TABLES `roompackage` WRITE;
/*!40000 ALTER TABLE `roompackage` DISABLE KEYS */;
INSERT INTO `roompackage` VALUES (1,'Room only',7025.00,1),(2,'Bed and Breakfast',3500.00,1),(3,'All Inclusive',4500.00,0),(13,'all inclusive',12000.00,1),(14,'all inclusive',12000.00,1),(15,'Hony Moon',1200.00,1);
/*!40000 ALTER TABLE `roompackage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomstates`
--

DROP TABLE IF EXISTS `roomstates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomstates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomstates`
--

LOCK TABLES `roomstates` WRITE;
/*!40000 ALTER TABLE `roomstates` DISABLE KEYS */;
INSERT INTO `roomstates` VALUES (1,'Avalilable'),(2,'Received'),(3,'unavailable');
/*!40000 ALTER TABLE `roomstates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomtype`
--

DROP TABLE IF EXISTS `roomtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomtype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `permaxheadprice` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomtype`
--

LOCK TABLES `roomtype` WRITE;
/*!40000 ALTER TABLE `roomtype` DISABLE KEYS */;
INSERT INTO `roomtype` VALUES (1,'Deluxe',NULL),(2,'Suit',NULL),(3,'Luxury',NULL),(4,'superior',NULL),(5,'Family',NULL);
/*!40000 ALTER TABLE `roomtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `peramount` decimal(10,2) DEFAULT NULL,
  `servicecategory_id` int NOT NULL,
  `serviceavaliability_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_service_servicecategory1_idx` (`servicecategory_id`),
  KEY `fk_service_serviceAvaliability1_idx` (`serviceavaliability_id`),
  CONSTRAINT `fk_service_serviceAvaliability1` FOREIGN KEY (`serviceavaliability_id`) REFERENCES `serviceavaliability` (`id`),
  CONSTRAINT `fk_service_servicecategory1` FOREIGN KEY (`servicecategory_id`) REFERENCES `servicecategory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'external pool access',1000.00,2,2),(3,'internel bufert',2501.00,1,2),(4,'externel bufert',4524.00,1,1),(5,'Delivery',4500.00,1,2),(6,'Party',1500.00,1,1),(7,'spa',4500.00,2,1);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_category`
--

DROP TABLE IF EXISTS `service_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_category` (
  `id` int NOT NULL,
  `title` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_category`
--

LOCK TABLES `service_category` WRITE;
/*!40000 ALTER TABLE `service_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `service_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_has_roompackage`
--

DROP TABLE IF EXISTS `service_has_roompackage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_has_roompackage` (
  `roompackage_id` int NOT NULL,
  `service_id` int NOT NULL,
  PRIMARY KEY (`roompackage_id`,`service_id`),
  KEY `fk_service_has_roompackage_roompackage1_idx` (`roompackage_id`),
  KEY `fk_service_has_roompackage_service1_idx` (`service_id`),
  CONSTRAINT `fk_service_has_roompackage_roompackage1` FOREIGN KEY (`roompackage_id`) REFERENCES `roompackage` (`id`),
  CONSTRAINT `fk_service_has_roompackage_service1` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_has_roompackage`
--

LOCK TABLES `service_has_roompackage` WRITE;
/*!40000 ALTER TABLE `service_has_roompackage` DISABLE KEYS */;
INSERT INTO `service_has_roompackage` VALUES (1,3),(1,4),(2,1),(2,3),(2,4),(2,5),(3,1),(3,3),(3,4),(13,3),(13,4),(14,3),(14,4),(15,1),(15,3),(15,4),(15,5);
/*!40000 ALTER TABLE `service_has_roompackage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `serviceavaliability`
--

DROP TABLE IF EXISTS `serviceavaliability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `serviceavaliability` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `serviceavaliability`
--

LOCK TABLES `serviceavaliability` WRITE;
/*!40000 ALTER TABLE `serviceavaliability` DISABLE KEYS */;
INSERT INTO `serviceavaliability` VALUES (1,'Available'),(2,'NotAvailable');
/*!40000 ALTER TABLE `serviceavaliability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicecategory`
--

DROP TABLE IF EXISTS `servicecategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicecategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicecategory`
--

LOCK TABLES `servicecategory` WRITE;
/*!40000 ALTER TABLE `servicecategory` DISABLE KEYS */;
INSERT INTO `servicecategory` VALUES (1,'room'),(2,'pool'),(3,'Banquet');
/*!40000 ALTER TABLE `servicecategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(150) NOT NULL,
  `addeddate` datetime NOT NULL,
  `updatedate` datetime DEFAULT NULL,
  `deletedate` datetime DEFAULT NULL,
  `employee_id` int NOT NULL,
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_user_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_user_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ak','46792755','2024-04-19 00:00:00',NULL,NULL,1,1),(2,'ma','1507776099','2024-04-19 00:00:00',NULL,NULL,2,0),(11,'maaa','1234','2024-05-26 11:32:38',NULL,NULL,6,0),(12,'ASD','Akila','2024-05-26 11:35:44',NULL,NULL,5,1),(13,'Weerasinghe','Akila','2024-05-26 14:14:20',NULL,NULL,7,1),(14,'Akkkila','Akila','2024-05-26 15:06:48',NULL,NULL,9,1),(15,'admin','$2a$10$IWVKI7Ln0hvuK1e4gqfB2OWXcnmXkbrDBuXGJAnLVCd3FBTFJ7vAO','2024-06-01 14:11:07',NULL,NULL,1,1),(16,'Akila','$2a$10$j4Ue7MwNMYT2SGfxO3T/ke5BBZijo6aU4vLJ2SfoXtQWpwoSOeBKK','2024-07-21 10:30:26',NULL,NULL,2,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_has_role`
--

DROP TABLE IF EXISTS `user_has_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_has_role` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `fk_user_has_role_role1_idx` (`role_id`),
  KEY `fk_user_has_role_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_has_role_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `fk_user_has_role_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_has_role`
--

LOCK TABLES `user_has_role` WRITE;
/*!40000 ALTER TABLE `user_has_role` DISABLE KEYS */;
INSERT INTO `user_has_role` VALUES (1,1),(12,1),(16,1),(1,2),(2,2),(11,2),(12,2),(14,2),(14,3),(14,4),(15,5);
/*!40000 ALTER TABLE `user_has_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viewtype`
--

DROP TABLE IF EXISTS `viewtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viewtype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viewtype`
--

LOCK TABLES `viewtype` WRITE;
/*!40000 ALTER TABLE `viewtype` DISABLE KEYS */;
INSERT INTO `viewtype` VALUES (1,'garden view'),(2,'Mount View');
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

-- Dump completed on 2025-07-06 23:20:29
