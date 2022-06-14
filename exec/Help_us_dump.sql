-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: k6c106.p.ssafy.io    Database: donation
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(45) NOT NULL,
  `board_id` int NOT NULL,
  `member_id` int NOT NULL,
  `comment_group` int NOT NULL,
  `depth` int NOT NULL DEFAULT '1',
  `content` varchar(100) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `parent_comment_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `fk_comment_comment1_idx` (`parent_comment_id`),
  CONSTRAINT `fk_comment_comment1` FOREIGN KEY (`parent_comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `donation_id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` varchar(500) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `percent` double NOT NULL DEFAULT '0',
  `status` varchar(45) NOT NULL DEFAULT '진행',
  PRIMARY KEY (`donation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` VALUES (1,21,'책을 기부해주세요!','감사합니다!','2022-05-20 09:25:50',NULL,'2022-05-31',0,'마감'),(2,21,'아이들을 위한 책 기부 부탁드려요','감사합니다','2022-05-20 09:42:01',NULL,'2022-05-26',90,'마감'),(5,17,'운동회를 열게 되었습니다!','안녕하세요\n저희 시설에서 코로나 이후 2년만에 운동회를 개최하게 되었습니다.\n많은 아이들이 손꼽아 기다리고 있는데요,,\n성공적인 운동회를 위해 기부를 해주시면 감사하겠습니다.\n','2022-05-20 10:13:29',NULL,'2022-06-03',0,'진행'),(6,7,'아이들을 위해 스케치북과 색연필을 기부해주세요.','아이들을 위해 스케치북과 색연필을 기부해주세요.','2022-05-20 10:15:13',NULL,'2022-05-27',0,'진행'),(7,21,'유아용 책 기부 부탁드려요!','언제나 감사합니다','2022-05-20 10:23:04',NULL,'2022-05-31',30,'진행'),(8,9,'아이들을 위한 간식을 기부해주세요.','아이들을 위한 간식을 기부해주세요.','2022-05-20 10:23:58',NULL,'2022-05-27',0,'진행'),(10,13,'아이들을 위해 장난감을 기부해주세요!','저희 기관의 아이들이 점점 늘어남에 따라 장난감의 수가 많이 부족합니다.\n항상 아이들이 싸우기도 하구요..\n잘 쓰지 않는 장난감을 기부해주시면 감사하겠습니다.','2022-05-20 10:29:24',NULL,'2022-06-30',0,'진행'),(11,18,'아이들의 간식 기부 부탁드려요','성장기인 아이들 잘 클 수 있도록 도와주세요!','2022-05-20 10:35:22',NULL,'2022-05-31',56.66667,'진행'),(12,21,'교육 봉사를 위한 책상, 의자 기부 부탁드립니다!','언제나 감사합니다!','2022-05-20 10:42:37',NULL,'2022-06-11',25,'진행'),(13,8,'유기견을 위해 기부해주세요.','강아지 용품들이 필요합니다.','2022-05-20 11:14:25',NULL,'2022-06-27',0,'진행'),(14,8,'유기견을 위해 기부해주세요.','부탁드립니다.','2022-05-20 11:23:22',NULL,'2022-05-31',10,'진행');
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation_apply`
--

DROP TABLE IF EXISTS `donation_apply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation_apply` (
  `donation_apply_id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `parcel` varchar(45) DEFAULT NULL,
  `invoice` varchar(45) DEFAULT NULL,
  `count` int NOT NULL,
  `invoice_end_date` date DEFAULT ((curdate() + 5)),
  `donation_date` date NOT NULL DEFAULT (curdate()),
  `status` varchar(45) NOT NULL DEFAULT '배송대기',
  `donation_product_id` int NOT NULL,
  `donation_id` int NOT NULL,
  PRIMARY KEY (`donation_apply_id`),
  KEY `fk_donation_apply_donation_product1_idx` (`donation_product_id`),
  KEY `fk_donation_apply_donation1_idx` (`donation_id`),
  CONSTRAINT `fk_donation_apply_donation1` FOREIGN KEY (`donation_id`) REFERENCES `donation` (`donation_id`),
  CONSTRAINT `fk_donation_apply_donation_product1` FOREIGN KEY (`donation_product_id`) REFERENCES `donation_product` (`donation_product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation_apply`
--

LOCK TABLES `donation_apply` WRITE;
/*!40000 ALTER TABLE `donation_apply` DISABLE KEYS */;
INSERT INTO `donation_apply` VALUES (3,22,'04','364176903021',3,'2022-05-25','2022-05-20','배송완료',3,2),(4,26,'04','234567',3,'2022-05-25','2022-05-20','배송완료',3,2),(5,6,'04','128967',3,'2022-05-25','2022-05-20','배송완료',3,2),(6,27,'04','364176903021',10,'2022-05-25','2022-05-20','배송중',7,5),(7,27,'04','364176903021',10,'2022-05-25','2022-05-20','배송중',9,6),(8,27,'04','364176903021',3,'2022-05-25','2022-05-20','배송완료',11,7),(9,27,'04','364176903021',3,'2022-05-25','2022-05-20','배송완료',17,11),(10,27,'04','364176903021',3,'2022-05-25','2022-05-20','배송완료',18,11),(11,27,'04','364176903021',5,'2022-05-25','2022-05-20','배송완료',19,11),(12,27,'04','364176903021',3,'2022-05-25','2022-05-20','배송중',16,10),(13,27,'04','364176903021',10,'2022-05-25','2022-05-20','배송중',12,8),(14,27,'04','364176903021',5,'2022-05-25','2022-05-20','배송중',13,8),(15,27,'04','364176903021',3,'2022-05-25','2022-05-20','배송중',14,8),(16,22,'04','364176903021',3,'2022-05-25','2022-05-20','배송완료',17,11),(17,22,'04','364176903021',3,'2022-05-25','2022-05-20','배송완료',18,11),(18,22,'04','364176903021',5,'2022-05-25','2022-05-20','배송중',16,10),(19,22,NULL,NULL,20,'2022-05-25','2022-05-20','배송대기',8,5),(20,27,'04','364176903021',5,'2022-05-25','2022-05-20','배송완료',20,12),(21,28,'08','1111',5,'2022-05-25','2022-05-20','배송중',10,6),(22,28,NULL,NULL,10,'2022-05-25','2022-05-20','배송대기',14,8),(23,28,NULL,NULL,10,'2022-05-25','2022-05-20','배송대기',13,8),(24,26,'04','234567',10,'2022-05-25','2022-05-20','배송완료',24,14),(25,29,'08','309334585626',3,'2022-05-25','2022-05-20','배송중',22,13),(26,29,'08','309334585626',20,'2022-05-25','2022-05-20','배송중',23,13);
/*!40000 ALTER TABLE `donation_apply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation_confirm`
--

DROP TABLE IF EXISTS `donation_confirm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation_confirm` (
  `donation_confirm_id` int NOT NULL AUTO_INCREMENT,
  `donation_id` int NOT NULL,
  `member_id` int NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` varchar(500) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`donation_confirm_id`),
  KEY `fk_donation_confirm_donation1_idx` (`donation_id`),
  CONSTRAINT `fk_donation_confirm_donation1` FOREIGN KEY (`donation_id`) REFERENCES `donation` (`donation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation_confirm`
--

LOCK TABLES `donation_confirm` WRITE;
/*!40000 ALTER TABLE `donation_confirm` DISABLE KEYS */;
INSERT INTO `donation_confirm` VALUES (6,2,21,'책 기부 감사합니다!','책 총 9권을 기부 받았습니다. 이번에는 동화책 9권을 기부 받았습니다. 기부 받은 도서는 기관 도서관에 전시했으며, 기부한 도서가 잘 사용되고 있는지 오셔서 확인도 가능합니다 :) 기부해주셔서 감사합니다. ','2022-05-20 10:29:50',NULL);
/*!40000 ALTER TABLE `donation_confirm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation_confirm_image`
--

DROP TABLE IF EXISTS `donation_confirm_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation_confirm_image` (
  `donation_confirm_image_id` int NOT NULL AUTO_INCREMENT,
  `donation_confirm_id` int NOT NULL,
  `url` varchar(200) NOT NULL,
  PRIMARY KEY (`donation_confirm_image_id`),
  KEY `fk_donation_comfirm_image_donation_confirm1_idx` (`donation_confirm_id`),
  CONSTRAINT `fk_donation_comfirm_image_donation_confirm1` FOREIGN KEY (`donation_confirm_id`) REFERENCES `donation_confirm` (`donation_confirm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation_confirm_image`
--

LOCK TABLES `donation_confirm_image` WRITE;
/*!40000 ALTER TABLE `donation_confirm_image` DISABLE KEYS */;
INSERT INTO `donation_confirm_image` VALUES (2,6,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/774dc159-609e-495c-97f0-f39d2569c038phong-duong-HRyg1YnwJ1k-unsplash%20%281%29.jpg');
/*!40000 ALTER TABLE `donation_confirm_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation_image`
--

DROP TABLE IF EXISTS `donation_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation_image` (
  `donation_image_id` int NOT NULL AUTO_INCREMENT,
  `donation_id` int NOT NULL,
  `url` varchar(200) NOT NULL,
  PRIMARY KEY (`donation_image_id`),
  KEY `fk_DonationPhoto_Donation1_idx` (`donation_id`),
  CONSTRAINT `fk_DonationPhoto_Donation1` FOREIGN KEY (`donation_id`) REFERENCES `donation` (`donation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation_image`
--

LOCK TABLES `donation_image` WRITE;
/*!40000 ALTER TABLE `donation_image` DISABLE KEYS */;
INSERT INTO `donation_image` VALUES (1,1,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/ef4dc6ac-1adf-47ee-8381-7f96c1433c56phong-duong-HRyg1YnwJ1k-unsplash%20%281%29.jpg'),(2,2,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/f2ee5195-b6cd-4b0e-b4e6-682d4830ac87phong-duong-HRyg1YnwJ1k-unsplash.jpg'),(3,3,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/cdd1c549-5a4e-40c4-bd88-21685cb7523elogo3.png'),(4,4,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/733ea6e9-a2b7-41f4-abdc-e48f6f1cdfdeDFgucLdVwAA904r.jpg'),(5,5,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/e4dbedfd-db2f-4b65-ada6-38f3897f88caimg_20190613125739_62616c98.jpg'),(6,6,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/e92a8f10-7057-42d3-b846-c98c7bd96e6c%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C.jpg'),(7,7,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/f3400770-dd37-4075-ab56-f72356dabc9fphong-duong-HRyg1YnwJ1k-unsplash%20%281%29.jpg'),(8,8,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/858dc33d-94a3-4fd1-8224-0d604f2ec47f%EC%A0%9C%EB%AA%A9%20%EC%97%86%EC%9D%8C.jpg'),(9,9,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/8d85610f-0317-44d8-b4e0-34d8047414c120191113_f6f280560384db2d6c6d797a281e52b1.png'),(10,10,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/5642320c-443c-4966-95b7-9ad83a7bc54330081517756.20211214032318.jpg'),(11,10,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/9468260c-b5af-4fca-a6d2-77baa4980b2d29908311629.20220217015001.jpg'),(12,11,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/fc46be1e-c1d8-4523-b698-40df9b956bc5olivia-herlambang-tham-ceTcTwZ-Pew-unsplash.jpg'),(13,11,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/624f1c7e-05e5-4bbd-94b1-901491025900logo3.png'),(14,12,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/73bc478b-1e43-45be-ae26-e7e3bacf38b9hope-house-press-leather-diary-studio-PJzc7LOt2Ig-unsplash%20%281%29.jpg'),(15,12,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/ab347e12-2d99-4069-8390-2b805f255a64janko-ferlic-sfL_QOnmy00-unsplash.jpg'),(16,13,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/bf45b619-06c3-471b-94f7-af6f1b95430d%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%284%29.jpg'),(17,13,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/8ae9024c-a076-425d-98b3-a808401329d1%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%285%29.jpg'),(18,14,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/b52b3fbe-7c8f-4300-870f-7091ac34132b%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%286%29.jpg');
/*!40000 ALTER TABLE `donation_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation_product`
--

DROP TABLE IF EXISTS `donation_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation_product` (
  `donation_product_id` int NOT NULL AUTO_INCREMENT,
  `donation_id` int NOT NULL,
  `product_name` varchar(45) NOT NULL,
  `product_info` varchar(100) NOT NULL,
  `total_count` int NOT NULL,
  `finish_count` int NOT NULL DEFAULT '0',
  `delivery_count` int NOT NULL DEFAULT '0',
  `waiting_count` int NOT NULL DEFAULT '0',
  `percent` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`donation_product_id`),
  KEY `fk_Product_Donation_idx` (`donation_id`),
  CONSTRAINT `fk_Product_Donation` FOREIGN KEY (`donation_id`) REFERENCES `donation` (`donation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation_product`
--

LOCK TABLES `donation_product` WRITE;
/*!40000 ALTER TABLE `donation_product` DISABLE KEYS */;
INSERT INTO `donation_product` VALUES (1,1,'책','초등학생용',10,0,0,3,0),(2,1,'과자','',10,0,0,2,0),(3,2,'책','초등학생용',10,9,0,0,90),(4,3,'123','123',123,0,0,0,0),(5,4,'스케치북','B4 스케치북',20,0,0,0,0),(6,4,'색연필','12가지 색상',20,0,0,0,0),(7,5,'간식','과자, 음료수 등등 ',50,0,10,0,0),(8,5,'물','500ml',100,0,0,20,0),(9,6,'스케치북','B5 스케치북',20,0,10,0,0),(10,6,'색연필','12가지 색상',20,0,5,0,0),(11,7,'책','유아용',10,3,0,0,30),(12,8,'홈런볼','Home Run Balllllllllll',30,0,10,0,0),(13,8,'칸쵸','칸쵸',30,0,5,10,0),(14,8,'콜라','코카콜라',30,0,3,10,0),(15,9,'ㅇ','ㄴ',3,0,0,0,0),(16,10,'장난감','장난감 종류나 브랜드 상관없습니다. 아이들이 갖고 놀 수 잇는 장난감이면 됩니다!',20,0,8,0,0),(17,11,'빵',' ',10,6,0,0,60),(18,11,'우유','',10,6,0,0,60),(19,11,'영양제','비타민',10,5,0,0,50),(20,12,'책상','어른용',10,5,0,0,50),(21,12,'의자','어른용',10,0,0,0,0),(22,13,'강아지 사료','10kg',100,0,3,0,0),(23,13,'배변 패드','100개입',100,0,20,0,0),(24,14,'사료','10kg',100,10,0,0,10);
/*!40000 ALTER TABLE `donation_product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20 11:44:04
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: k6c106.p.ssafy.io    Database: volunteer
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `comment_group` int NOT NULL,
  `depth` int NOT NULL DEFAULT '0',
  `content` varchar(100) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `volunteer_id` int NOT NULL,
  `parent_comment_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `fk_comment_volunteer1_idx` (`volunteer_id`),
  KEY `fk_comment_comment1_idx` (`parent_comment_id`),
  CONSTRAINT `fk_comment_comment1` FOREIGN KEY (`parent_comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comment_volunteer1` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteer` (`volunteer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=327 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer`
--

DROP TABLE IF EXISTS `volunteer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteer` (
  `volunteer_id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `category` varchar(20) NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` varchar(500) NOT NULL,
  `vol_zipcode` int DEFAULT NULL,
  `vol_address` varchar(100) DEFAULT NULL,
  `people` int DEFAULT NULL,
  `applicant` int DEFAULT '0',
  `vol_date` datetime DEFAULT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `percent` double DEFAULT '0',
  `time` double DEFAULT '0',
  PRIMARY KEY (`volunteer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer`
--

LOCK TABLES `volunteer` WRITE;
/*!40000 ALTER TABLE `volunteer` DISABLE KEYS */;
INSERT INTO `volunteer` VALUES (85,9,'ORG','청소 봉사자 모집합니다','시설 청소 봉사자 모집합니다.',5323,'서울 강동구 천호동 314-36 들꽃 청소년 지역아동센터',5,2,'2022-05-27 12:00:00','2022-05-20 06:36:14',NULL,0,40,3),(86,8,'ORG','유기견 돌보미를 모집합니다.','유기견 한 마리를 구한다고 세상이 바뀌지는 않습니다. 하지만 그 소중한 생명체의 삶은 온전하게 바꿀 수 있습니다.\n‘사람과 동물이 함께 행복한 세상’ 팅커벨 프로젝트\n가여운 유기동물들의 생명을 구하는데 힘을 보태주세요. 여럿이 힘을 모으면 작은 힘도 큰 힘이 됩니다.\n팅커벨 프로젝트의 최종 목표는 가정 입양입니다.\n이를 위해 팅커벨 입양센터는 1년 365일 연중무휴로 운영합니다.\n\n팅커벨 프로젝트는 시보호소 안락사 명단에 있어서 우리가 구하지 않으면 생명을 잃는 유기견(묘)을 중심으로 구조합니다. 구조 후 불과 1주일 만에 입양 가는 경우도 있는가 하면, 입양을 가는 데 몇 년이 걸리는 경우도 적잖습니다. 하지만 아무리 시간이 걸리더라도 반드시 좋은 가족을 찾아준다는 각오로 돌보고 있습니다.',7741,'서울 강서구 곰달래로 255 ',20,3,'2022-05-29 23:00:00','2022-05-20 06:38:52',NULL,0,15,3),(87,10,'ORG','연탄나르기 봉사자 모집합니다.','연탄나르기 봉사자 모집합니다.',61422,'광주 동구 계림동 178-38 행복복지센터',20,2,'2022-12-12 11:00:00','2022-05-20 06:48:11',NULL,0,10,5),(89,20,'ORG','낭독 봉사자를 모집합니다.','하상점자 도서관에서 시각장애인을 위한 낭독 봉사자를 모집합니다.',6335,'서울 강남구 개포로 613 ',2,1,'2022-06-04 22:00:00','2022-05-20 07:30:51',NULL,0,50,2),(90,9,'ORG','무료급식 봉사자 모집합니다.','무료급식 봉사자 모집합니다.',5323,'서울 강동구 천호동 314-36  ',15,1,'2022-05-25 21:30:00','2022-05-20 08:21:44',NULL,0,6.666666666666667,4.5),(91,21,'ORG','교육 봉사를 모집합니다!','학원을 가지 못하는 아이들 교육 봉사를 해주세요!',25511,'강원 강릉시 가작로 6  ',5,1,'2022-05-28 09:00:00','2022-05-20 09:17:34',NULL,0,20,4),(92,22,'USER','코딩 교육 재능 기부합니다!','주말에 광주에서 가능합니다!',0,NULL,0,0,NULL,'2022-05-20 09:43:23',NULL,0,0,0),(93,26,'USER','지정 헌혈 가능합니다!','전혈, 혈장 모두 가능합니다\n지정 헌혈이 필요하신 분 알려주세요!!',0,NULL,0,0,NULL,'2022-05-20 10:06:15',NULL,0,0,0),(94,17,'ORG','시설 대청소를 진행합니다.','봉사 내용 : 전반적인 청소 봉사',21970,'인천 연수구 봉재산로 68 ',5,1,'2022-05-25 19:00:00','2022-05-20 10:18:16',NULL,0,20,4),(95,8,'ORG','강아지 산책 봉사 모집합니다.','5월 마지막 주 일요일 강아지 산책 봉사 하실 분 모집합니다.',7741,'서울 강서구 곰달래로 255 ',10,2,'2022-05-29 20:00:00','2022-05-20 10:23:19',NULL,0,20,2),(96,16,'ORG','한글 교육 봉사자를 모집합니다!','안녕하세요!!\n저희 시설에 한글을 열정적으로 배우고 싶어하시는 어르신 분들이 많습니다!!\n교육 봉사를 해보신 적이 있으시거나 처음이어도 어르신과 얘기하며 편안한 분위기로 가르쳐 주실분이면 누구든 상관없습니다!\n많이 지원 부탁드려요',6336,'서울 강남구 개포로 617-8 ',5,1,'2022-05-28 18:00:00','2022-05-20 10:47:16',NULL,0,20,4),(97,20,'ORG','입력 봉사자를 모집합니다.','5월 도서 입력 봉사자를 모집합니다.\n\n입력 봉사는 시각 장애인 분들이 책을 읽을 수 있도록\n도서 한권을 전부 명확하게 작성 후 점자로 변환합니다.\n\n따라서 도서에 적힌 내용 뿐만 아니라 이미지나 사진도 최대한 자세하고 객관적으로 작성해 주셔야 합니다.\n\n또한 저희 도서관에 없는 도서로 작성해야 하며 아무 도서나 할 수 없습니다.\n봉사 접수가 확정이 되면 저희 기관과 책 협의를 진행해야 합니다.\n\n기관은 총 두 번 방문하시면 됩니다.\n처음 책 선정 후, 입력 봉사 종료 후\n\n입력 봉사 중간에 어떻게 작성하고 있는지 확인 메일도 보내주셔야 합니다.\n\n시각 장애인 분들에게 눈이 되어주는 일인 만큼 성실히 임해 주시길 바랍니다.',6335,'서울 강남구 개포로 613 ',10,1,'2022-05-21 09:00:00','2022-05-20 10:52:01',NULL,0,10,7),(98,8,'ORG','강아지 목욕 봉사가 필요합니다.','많은 지원 부탁드립니다.',12640,'경기 여주시 세종대왕면 중부대로 2166 ',10,1,'2022-05-31 22:00:00','2022-05-20 11:23:37',NULL,0,10,3);
/*!40000 ALTER TABLE `volunteer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer_apply`
--

DROP TABLE IF EXISTS `volunteer_apply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteer_apply` (
  `volunteer_apply_id` int NOT NULL AUTO_INCREMENT,
  `volunteer_id` int NOT NULL,
  `member_id` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `write_id` int NOT NULL,
  PRIMARY KEY (`volunteer_apply_id`),
  KEY `fk_volunteer_apply_volunteer1_idx` (`volunteer_id`),
  CONSTRAINT `fk_volunteer_apply_volunteer1` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteer` (`volunteer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer_apply`
--

LOCK TABLES `volunteer_apply` WRITE;
/*!40000 ALTER TABLE `volunteer_apply` DISABLE KEYS */;
INSERT INTO `volunteer_apply` VALUES (62,86,6,1,8),(63,85,6,1,9),(64,87,6,0,10),(65,91,22,1,21),(66,95,22,0,8),(67,94,22,0,17),(68,96,28,0,16),(69,90,27,0,9),(70,89,27,0,20),(71,85,27,0,9),(72,86,28,0,8),(73,95,27,0,8),(74,86,27,0,8),(75,87,27,0,10),(76,97,27,0,20),(77,98,26,0,8);
/*!40000 ALTER TABLE `volunteer_apply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer_image`
--

DROP TABLE IF EXISTS `volunteer_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteer_image` (
  `volunteer_image_id` int NOT NULL AUTO_INCREMENT,
  `volunteer_id` int NOT NULL,
  `url` varchar(200) NOT NULL,
  PRIMARY KEY (`volunteer_image_id`),
  KEY `fk_VolunteerPhoto_Volunteer1_idx` (`volunteer_id`),
  CONSTRAINT `fk_VolunteerPhoto_Volunteer1` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteer` (`volunteer_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer_image`
--

LOCK TABLES `volunteer_image` WRITE;
/*!40000 ALTER TABLE `volunteer_image` DISABLE KEYS */;
INSERT INTO `volunteer_image` VALUES (83,85,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/07648c3d-51b7-4ef7-b853-affeb9ade172%EB%93%A4%EA%BD%83.jpg'),(84,86,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/709141c2-033b-4cdc-b610-6650d6a94135%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%285%29.jpg'),(85,86,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/70d9667b-b645-4743-bab9-319b9f2a4ea1%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%286%29.jpg'),(86,86,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/5e2ce319-c661-49ee-8ffd-cd63dc4dbb42%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%282%29.jpg'),(87,86,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/30d7e9ff-1dd3-461c-9238-fea4ef7c1ea6%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%283%29.jpg'),(88,86,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/dfb372eb-281b-46bb-8d1d-11bf57463ef2%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%284%29.jpg'),(89,87,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/091964da-53f0-43bc-b60c-d8149f526082IMG_9022.jpg'),(90,88,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/3940e940-11ae-45f1-927a-22378915d195%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%282%29.jpg'),(91,89,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/65ade334-20b2-470e-9a3b-b5199a5e120f%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%287%29.jpg'),(92,89,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/fde7ee25-e292-4b54-b587-146136b886bb%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%288%29.jpg'),(93,91,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/8cd54346-3bfb-491d-b4ad-9ee91f70aab9phong-duong-HRyg1YnwJ1k-unsplash.jpg'),(94,92,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/bdce5b42-2232-4bd5-88aa-a8318020f749client.png'),(95,95,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/0c23d831-b5ff-492e-ac86-3720443e3d3320191113_f6f280560384db2d6c6d797a281e52b1.png'),(96,96,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/d474d228-6bd4-4197-807a-fe125c85fad9%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.jpg'),(97,97,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/1cdba6d7-1ebf-4b04-84eb-00fc8c42481b%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.jpg'),(98,98,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/dcb4ecab-3c58-4e7e-8d64-a29c49bf61b8%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%282%29.jpg');
/*!40000 ALTER TABLE `volunteer_image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20 11:44:04
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: k6c106.p.ssafy.io    Database: member
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

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
-- Table structure for table `certification`
--

DROP TABLE IF EXISTS `certification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certification` (
  `certification_id` int NOT NULL AUTO_INCREMENT,
  `cerification_num` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`certification_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certification`
--

LOCK TABLES `certification` WRITE;
/*!40000 ALTER TABLE `certification` DISABLE KEYS */;
INSERT INTO `certification` VALUES (1,'S6H4-NMUG-7YPB-UH7E','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/5d2fe7e6-1804-45db-8a58-d819a9e0ac81blob'),(2,'N67N-QV73-K8PC-TUDK','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/eea3e58b-1254-48eb-94eb-46cb04da1dcablob'),(3,'VQ66-H7Q3-GRUS-5Y6R','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/26321a2b-3201-445d-8ffc-7ca6ea3314d6blob'),(4,'YSRS-CLA7-AL9M-KCGW','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/4238202c-f252-47e4-a6fb-1983fe694898blob'),(5,'WQ5U-LNZN-MJ25-QSGW','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/e8493068-5715-4a89-96be-c3fa8830ea33blob'),(6,'65R3-NRAG-2F77-QMPN','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/6eaba6c0-3a7e-4822-b934-b218fd1f4bb6blob'),(7,'ZBWU-7P8U-VGSE-37FG','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/3c229086-571e-4c2b-9953-21e709a66e36blob');
/*!40000 ALTER TABLE `certification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_log`
--

DROP TABLE IF EXISTS `chat_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_log` (
  `message_id` int unsigned NOT NULL AUTO_INCREMENT,
  `date` datetime(6) DEFAULT NULL,
  `is_over` bit(1) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `sender` varchar(255) DEFAULT NULL,
  `chatroom_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `FKfu00vyepktotpkpe9vyosg2ih` (`chatroom_id`),
  CONSTRAINT `FKfu00vyepktotpkpe9vyosg2ih` FOREIGN KEY (`chatroom_id`) REFERENCES `chat_room` (`chatroom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_log`
--

LOCK TABLES `chat_log` WRITE;
/*!40000 ALTER TABLE `chat_log` DISABLE KEYS */;
INSERT INTO `chat_log` VALUES (1,'2022-05-20 05:14:57.000000',NULL,'test1','1',1),(2,'2022-05-20 05:15:12.000000',NULL,'test2','2',1),(3,'2022-05-20 08:45:23.612000',_binary '\0',NULL,'1',1),(4,'2022-05-20 09:12:28.141000',_binary '\0',NULL,'1',1),(5,'2022-05-20 09:12:45.333000',_binary '\0',NULL,'1',1),(6,'2022-05-20 09:14:03.365000',_binary '\0',NULL,'1',1),(7,'2022-05-20 09:14:43.220000',_binary '\0',NULL,'1',1),(8,'2022-05-20 09:17:29.011000',_binary '\0',NULL,'1',1),(9,'2022-05-20 09:23:51.000000',NULL,'test11','1',1),(10,'2022-05-20 09:23:52.000000',NULL,'test22','2',1),(11,'2022-05-20 09:23:55.000000',NULL,'test222','2',1),(12,'2022-05-20 09:23:59.000000',NULL,'test1111','1',1),(13,'2022-05-20 09:24:00.000000',NULL,'test2222','2',1),(14,'2022-05-20 09:24:13.000000',NULL,'test11112','1',1),(15,'2022-05-20 09:24:15.000000',NULL,'test22222','2',1),(16,'2022-05-20 09:24:18.000000',NULL,'test222223','2',1),(17,'2022-05-20 09:24:21.000000',NULL,'test111125','1',1),(18,'2022-05-20 09:53:57.771000',NULL,NULL,'1',1),(19,'2022-05-20 10:12:15.015000',NULL,NULL,'1',1),(20,'2022-05-20 10:13:10.373000',NULL,NULL,'1',1),(21,'2022-05-20 10:17:57.165000',NULL,NULL,'1',1),(22,'2022-05-20 10:20:08.691000',NULL,NULL,'1',1),(23,'2022-05-20 10:21:18.014000',NULL,NULL,'1',1),(24,'2022-05-20 10:23:12.122000',NULL,NULL,'1',1),(25,'2022-05-20 10:24:36.058000',NULL,'test10','1',1),(26,'2022-05-20 10:25:40.322000',NULL,'qq','1',1),(27,'2022-05-20 10:30:47.370000',NULL,'ww','1',1),(28,'2022-05-20 10:32:26.649000',NULL,'asdf','1',1),(29,'2022-05-20 10:35:44.086000',NULL,'test입니다.','1',1),(30,'2022-05-20 10:51:19.758000',NULL,'aaa','1',1),(31,'2022-05-20 10:53:30.267000',NULL,'check','1',1),(32,'2022-05-20 10:57:25.607000',NULL,'tt','1',1);
/*!40000 ALTER TABLE `chat_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_room` (
  `chatroom_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user1` varchar(255) DEFAULT NULL,
  `user2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`chatroom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=231 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` VALUES (1,'1','2'),(2,'1','21'),(3,'','2'),(4,'','2'),(5,'1','20'),(6,'','2'),(7,'','2'),(8,'','2'),(9,'','2'),(10,'','2'),(11,'','2'),(12,'','2'),(13,'','2'),(14,'','2'),(15,'','2'),(16,'','2'),(17,'','2'),(18,'','2'),(19,'','2'),(20,'','NaN'),(21,'','NaN'),(22,'','NaN'),(23,'','NaN'),(24,'0','1'),(25,'','2'),(26,'','2'),(27,'','2'),(28,'','2'),(29,'','NaN'),(30,'','NaN'),(31,'','NaN'),(32,'','NaN'),(33,'','NaN'),(34,'','NaN'),(35,'','NaN'),(36,'','NaN'),(37,'','2'),(38,'','2'),(39,'','2'),(40,'','2'),(41,'','2'),(42,'','2'),(43,'','2'),(44,'','2'),(45,'','NaN'),(46,'','NaN'),(47,'','2'),(48,'','2'),(49,'','2'),(50,'','2'),(51,'','2'),(52,'','2'),(53,'','2'),(54,'','2'),(55,'','2'),(56,'','2'),(57,'','2'),(58,'','2'),(59,'2','null'),(60,'','NaN'),(61,'','NaN'),(62,'','2'),(63,'','2'),(64,'','2'),(65,'','2'),(66,'','2'),(67,'','2'),(68,'','2'),(69,'','2'),(70,'','2'),(71,'','2'),(72,'','2'),(73,'','2'),(74,'','2'),(75,'','2'),(76,'','NaN'),(77,'','NaN'),(78,'','NaN'),(79,'','NaN'),(80,'','2'),(81,'','2'),(82,'','2'),(83,'','2'),(84,'','2'),(85,'','2'),(86,'','2'),(87,'','2'),(88,'','2'),(89,'','2'),(90,'','2'),(91,'','2'),(92,'','NaN'),(93,'','NaN'),(94,'','2'),(95,'','2'),(96,'','NaN'),(97,'','NaN'),(98,'','2'),(99,'','2'),(100,'','NaN'),(101,'','NaN'),(102,'','NaN'),(103,'','NaN'),(104,'','2'),(105,'','2'),(106,'','2'),(107,'','2'),(108,'','2'),(109,'','2'),(110,'','2'),(111,'','2'),(112,'','2'),(113,'','2'),(114,'','NaN'),(115,'','NaN'),(116,'','NaN'),(117,'','NaN'),(118,'','NaN'),(119,'','NaN'),(120,'','NaN'),(121,'','NaN'),(122,'','NaN'),(123,'','NaN'),(124,'','NaN'),(125,'','NaN'),(126,'','NaN'),(127,'','NaN'),(128,'','NaN'),(129,'','NaN'),(130,'','NaN'),(131,'','NaN'),(132,'','NaN'),(133,'','NaN'),(134,'','NaN'),(135,'','NaN'),(136,'','NaN'),(137,'','NaN'),(138,'','NaN'),(139,'','NaN'),(140,'','NaN'),(141,'','NaN'),(142,'','NaN'),(143,'','NaN'),(144,'','NaN'),(145,'','NaN'),(146,'','NaN'),(147,'','NaN'),(148,'','NaN'),(149,'','NaN'),(150,'','NaN'),(151,'','NaN'),(152,'','NaN'),(153,'0','20'),(154,'','NaN'),(155,'','NaN'),(156,'','NaN'),(157,'','NaN'),(158,'','NaN'),(159,'','NaN'),(160,'','NaN'),(161,'','NaN'),(162,'','NaN'),(163,'','NaN'),(164,'','NaN'),(165,'','NaN'),(166,'','NaN'),(167,'','NaN'),(168,'','NaN'),(169,'','NaN'),(170,'','2'),(171,'','2'),(172,'','2'),(173,'','2'),(174,'','2'),(175,'','2'),(176,'','NaN'),(177,'','NaN'),(178,'','NaN'),(179,'','NaN'),(180,'','NaN'),(181,'','NaN'),(182,'20','26'),(183,'','NaN'),(184,'','NaN'),(185,'','NaN'),(186,'','NaN'),(187,'','NaN'),(188,'','NaN'),(189,'','NaN'),(190,'','NaN'),(191,'','NaN'),(192,'','NaN'),(193,'','NaN'),(194,'','NaN'),(195,'','NaN'),(196,'','NaN'),(197,'','NaN'),(198,'','NaN'),(199,'','NaN'),(200,'','NaN'),(201,'','NaN'),(202,'','NaN'),(203,'','NaN'),(204,'','2'),(205,'','2'),(206,'','NaN'),(207,'','NaN'),(208,'','NaN'),(209,'','NaN'),(210,'','NaN'),(211,'','NaN'),(212,'','NaN'),(213,'','NaN'),(214,'','NaN'),(215,'','NaN'),(216,'','NaN'),(217,'','NaN'),(218,'','NaN'),(219,'','NaN'),(220,'','NaN'),(221,'','NaN'),(222,'','NaN'),(223,'','NaN'),(224,'','NaN'),(225,'','NaN'),(226,'','NaN'),(227,'','NaN'),(228,'','NaN'),(229,'','NaN'),(230,'','NaN');
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `help_desk`
--

DROP TABLE IF EXISTS `help_desk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `help_desk` (
  `help_desk_id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `update_date` datetime(6) DEFAULT NULL,
  `visible` varchar(255) DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`help_desk_id`),
  KEY `FKk47nidekboepabejquy5k39lb` (`member_id`),
  CONSTRAINT `FKk47nidekboepabejquy5k39lb` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `help_desk`
--

LOCK TABLES `help_desk` WRITE;
/*!40000 ALTER TABLE `help_desk` DISABLE KEYS */;
INSERT INTO `help_desk` VALUES (5,'문의','문의드립니다.','2022-05-20 08:09:05',NULL,'문의합니다.',NULL,'비공개',6),(7,'신고','신고합니다.','2022-05-20 08:34:23',NULL,'신고합니다.',NULL,'비공개',6),(8,'문의','광주 광산구 수완동 1242\n로 주소 변경 요청드립니다!','2022-05-20 09:14:57',NULL,'주소 변경 문의드립니다!',NULL,'비공개',21),(9,'정보수정','내용 : 이번에 시설 이름을 바꾸게 되었습니다. 가온누리 지역 아동센터에서 온누리 아동복지센터란 이름으로 변경해주시면 감사하겠습니다.','2022-05-20 10:39:12',NULL,'기관 이름 변경 요청드립니다',NULL,'비공개',13),(11,'정보수정','내용 : 주소 변경 요청합니다.ㅊ','2022-05-20 10:41:59',NULL,'주소 변경 요청합니다.',NULL,'비공개',9),(12,'도움','내용 : 강원도 산불 재난으로 피해받은 사람들 도움이 필요합니다.\n강원도 복지센터로 도움의 손길을 보냈으면 합니다.','2022-05-20 10:46:19',NULL,'재난으로 피해받은 사람들 도움이 필요합니다.',NULL,'공개',7),(13,'도움','저희 동네에 주민등록번호 말소가 되신 어르신이 계십니다.\n기초연금을 못 받으셔서 생활이 힘드신데 기관과 연결 부탁드립니다.','2022-05-20 10:47:59',NULL,'주변에 도움 요청드립니다.',NULL,'공개',27);
/*!40000 ALTER TABLE `help_desk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `help_desk_comment`
--

DROP TABLE IF EXISTS `help_desk_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `help_desk_comment` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `help_desk_id` bigint DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FK39kwqjsoce6b0nudqp2gjpcnc` (`help_desk_id`),
  KEY `FK7etbd5u1eknar5gnaiwatymgd` (`member_id`),
  CONSTRAINT `FK39kwqjsoce6b0nudqp2gjpcnc` FOREIGN KEY (`help_desk_id`) REFERENCES `help_desk` (`help_desk_id`),
  CONSTRAINT `FK7etbd5u1eknar5gnaiwatymgd` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `help_desk_comment`
--

LOCK TABLES `help_desk_comment` WRITE;
/*!40000 ALTER TABLE `help_desk_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `help_desk_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `help_desk_image`
--

DROP TABLE IF EXISTS `help_desk_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `help_desk_image` (
  `help_desk_image_id` bigint NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `help_desk_id` bigint DEFAULT NULL,
  PRIMARY KEY (`help_desk_image_id`),
  KEY `FKapx697v3ibhdpudg6532xq4oj` (`help_desk_id`),
  CONSTRAINT `FKapx697v3ibhdpudg6532xq4oj` FOREIGN KEY (`help_desk_id`) REFERENCES `help_desk` (`help_desk_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `help_desk_image`
--

LOCK TABLES `help_desk_image` WRITE;
/*!40000 ALTER TABLE `help_desk_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `help_desk_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `org_zipcode` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `registration` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `warn_count` int DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,NULL,NULL,'user1@user.com','my name is user1','user1',NULL,'$2a$10$xgppyCswl62ijF1LTNWYNeY430gKCkV1fF98i0gzYEaV0BZArLNUK',NULL,NULL,'USER','01090129099',0),(2,NULL,NULL,'user2@user.com','my name is user2','user2',NULL,'$2a$10$atsAaNGVrMLt8jdsnh7bnOJLef3tq1Hk.ERUTrkRDxJGVfnZ8u6g2','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/85e592d0-8357-42cf-baed-2d6314e59ec9%EC%9D%80%EC%B2%9C%EC%A3%BC%EA%B0%84%EB%B3%B4%ED%98%B8%EC%84%BC%ED%84%B0.PNG',NULL,'USER','01090129099',0),(3,'서울특별시 강남구 개포로 617-8','2022-05-20 05:42:46','kfwclove@hanmail.net','','해마을주간보호센터','06336','$2a$10$ed.KPXAd/gVHA1x2e0hq7uQz4ANa46/tpGge.p9ybf7gWZtIrGCui',NULL,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/ba11beea-5531-4380-af20-0caeef7fa3d7%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','02-3412-7747',0),(5,NULL,NULL,'admin@admin.com','my name is admin','admin',NULL,'$2a$10$j9cjVZbb4TPXOCu1ANzMtentu/AVBI6se3I43061iD1m.FMudhnyO',NULL,NULL,'ADMIN','01000000000',0),(6,NULL,'2022-05-20 05:10:48','choidawoon96@naver.com',':)','최다운',NULL,'$2a$10$ejuCfZSI9uwZogjG0FYa2.eg27JiKOarA25KlOAG2Sv/FvCZDksT.','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/09181496-903d-4c5b-ac6f-5bf9f41fa980%E3%85%8A%E3%84%B7%E3%85%87.png',NULL,'USER','010-7689-2309',0),(7,'대전광역시 대덕구 신탄진로 101','2022-05-20 05:42:35','seongwu@daum.net','안녕하세요 성우보육원 입니다.','성우보육원','06336','$2a$10$vvy47rtLPaFM5I.k10VRnOMof9fStGQIyHYl8Z1K1UTU3GshGudz.','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/cb66859e-fac4-4a02-9696-d9aa1b741661images.png','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/320f14e0-285f-4307-a41f-ee9a2e429920%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','042-627-6800',0),(8,'서울특별시 강서구 곰달래로 255 2층','2022-05-20 06:03:53','tinkerbell@daum.net','반갑습니다.','팅커벨 프로젝트','06336','$2a$10$0Y8ptINWHpPxJR2YFnPTTOc.kdoIAqsgD0btvDHlG703woXQrBO3G','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/96454c8e-6253-466e-bdba-be183c367049%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%282%29.jpg','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/71be55fb-a848-41b8-afe2-30f9e6e69340%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','02-2647-8255',0),(9,'서울특별시 강동구 천중로 39','2022-05-20 06:03:57','emfRhc@naver.com','들꽃 청소년 지역아동센터 입니다.','들꽃 청소년 지역아동센터','06574','$2a$10$Ke.UgKWL.t7u8vCiHkdDJuMcDm4kNzd3VfiB.RZyCvP8hMj8h0JuC','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/fddb7800-85f1-47bc-856e-53a83591e591%EB%93%A4%EA%BD%83.jpg','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/20c2d11b-c3ec-403d-9233-4fe0cc2f10b0%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','02-478-0504',0),(10,'광주광역시 동구 경양로 247번길 26','2022-05-20 06:04:02','happy@naver.com','','계림1동 행복복지센터','04874','$2a$10$b7o.BlVDSFRziw.uPbgwju8vnmUqKo0WuJHhD/R/MEIB/MzpaQ8AG',NULL,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/5a1499dd-cc53-4376-a1ab-a7301b056b28%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','062-608-3560',0),(11,'서울특별시 강동구 상암로 87-1 2층','2022-05-20 06:04:05','dkatk@naver.com','','암사 꿈나무 지역 아동센터','08174','$2a$10$8YGgjPxAx2jihuAMy.PqT.vO9awwTZp.lPx01k3r.PZ7RvYgS6G1G',NULL,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/b096387c-c017-401e-ab70-45cb68ad8dbe%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','051-241-5855',0),(12,'인천 연수구 용담로 54(청학동) 2층','2022-05-20 06:04:07','cjdeka@naver.com','','청담지역 아동센터','09574','$2a$10$COLFJnxXWyVyKVU.kXuXW.cf9fpbxCaY2SSzj7/JM6OWdHcoI7MeK',NULL,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/14467f39-41c6-4fcd-8bad-0df541c2eeed%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','070-8805-8005',0),(13,'인천광역시 연수구 새말로 146 목민교회','2022-05-20 06:04:16','rkdhs@naver.com','','가온누리 지역 아동센터','05874','$2a$10$DReEJmrrl5w3gvM7BOWs/O8YTfCWC1hhQI33kPE95HDZ7YMU6Jy6S',NULL,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/ee9df2eb-3791-4e27-914e-93294f76a415%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','032-822-3004',0),(14,'대전광역시 중구 대종로 488번길 9','2022-05-20 06:10:40','eowjs@naver.com','','대전 남자 단기 청소년쉼터','03274','$2a$10$XtXhBRu28JcG5N8il8jFP.mZGnQ/aveC2/VefN2l1Nlh3wjYZ3Bka',NULL,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/d7111b52-7246-4bf6-ae23-bb4cdbe3b1c6%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','042-257-2000',0),(15,'울산광역시 남구 꽃대나리로 15번길 6','2022-05-20 06:10:44','dnftks@naver.com','','울산 남구 여자 중장기 청소년쉼터','03274','$2a$10$7Ex9RBy7ZEElKAmSFiNLhe/U/clbSKux0AaVEKMzNGgCFxfWLeajS',NULL,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/caaea62e-8949-4150-b677-8e7254895a0a%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','052-265-1388',0),(16,'서울특별시 강남구 개포로 617-8','2022-05-20 06:10:48','sunvillage@naver.com','','해마을 주간 보호센터','06144','$2a$10$O8aPzAusE63A6RYFjqzaA.186UV.QOEmoIYFQhJMQBtUJSUV4YVbu',NULL,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/6a1bb339-e48c-4d42-a155-6d50a1dbf8f2%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','02-3412-7747',0),(17,'인천광역시 연수구 봉재산로 68','2022-05-20 06:10:51','brightmind@naver.com','','밝은마음','06132','$2a$10$YzlcS4JAIHNtJFA48PGT3uHTjQrcFMKEixBf28aTM6qDJMvWFpV3G',NULL,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/198a6272-60cf-48f4-ab8c-59fe63e50cb0%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','032-817-2070',0),(18,'인천광역시 연수구 경원대로 588번길 5','2022-05-20 06:19:28','peacehouse@hanmail.net','','평화의집','21907','$2a$10$lWrqjbu30QpGkPDt..Lvk.UiGTTUroFufZdL8iQ8uAU3ZW/ufQXNy',NULL,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/9cc06470-c83c-43ee-95b1-83290001d027%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','032-427-4145',0),(19,'서울특별시 강서구 허준로5길 37','2022-05-20 06:19:31','grenntree@naver.com','','늘푸른 나무복지관','07524','$2a$10$DS5cHjM6MJE1e12U2H885evP4dJL9k8TEIVNuqrVdbsQIxiixWuwS',NULL,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/dcfdc5b3-683d-47f0-a004-d8c61ce94061%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','02-3661-3164',0),(20,'서울특별시 강남구 개포로 613','2022-05-20 06:19:33','hasanglibrary@naver.com','강남구에 위치한 장애인 복지관입니다.','하상점자 도서관','06335','$2a$10$YKyzJg2QVTDJHeEplIWEZeJLdfrsJ8LctH3A/jZIrD8Cao6JFOSk.','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/d1eb5c10-cfab-45a3-a7cb-726d29fb2d17%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20%289%29.jpg','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/3cc7e691-a3d5-4d60-bc86-053659487012%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','02-451-6000',0),(21,'강원도 강릉시 강변로 450','2022-05-20 09:11:25','kaboop@daum.net','','강릉교육','25578','$2a$10$0xz7w/1xa6Oit/BAlXHuYuGPu0nX2i7tfc.pOhklQ5K7BLSPg.jbW','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/8db17152-58d0-4b8f-b217-222e0c73ee38phong-duong-HRyg1YnwJ1k-unsplash.jpg','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/8b74415c-4940-4c6f-9c75-5e2034ef4dba%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG','033-652-7263',0),(22,NULL,'2022-05-20 08:56:13','ssafy1@ssafy.com','안녕하세요','김싸피',NULL,'$2a$10$6kmOHPkrNyU1N1tMCnxmO.3amTgTYhBzDb5jAm5P/vM.1NpnFYW3O','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/69d1e936-6945-474d-aacd-56b79371ff12ssafy.jpg',NULL,'USER','010-0000-1111',0),(23,'인천광역시 연수구 봉재산로 68','2022-05-20 09:11:12','circle@naver.com','','동심원','21970','$2a$10$A2iYv26u6deqNJ8Wv3iMMuXsFes9w1UWibndHujl8BoomoYbHHayq',NULL,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/bfbc616f-a31d-414a-a731-19fa0c87fa0c%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG_WAIT','032-817-2070',0),(24,'광주 광산구 하남산단6번로 107 ','2022-05-20 09:10:53','ssafy2@ssafy.com','안녕하세요','싸피복지관','62218','$2a$10$.RXaXrmE7nbrH5ZgOpV11OR0qqmT1/3RZDVrIJGhBpIicQEX0u28G',NULL,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/062b1d36-f9aa-4639-9209-0bea5cacdb261212.jpg','ORG','062-1234-1234',0),(25,'경기도 용인시 처인구 모현읍 백옥대로 2366번길 10-7','2022-05-20 09:10:56','rainbowkids@daum.net','','무지개 지역 아동센터','17035','$2a$10$GRmJBkdeXgU9tk14IgVWZu6.Jp6P6RFsp/4AzPcOyqWMQQ8l6coxy',NULL,'https://c106-helpus.s3.ap-northeast-2.amazonaws.com/60af374d-f2ad-4860-86de-150190a75983%EC%82%AC%EC%97%85%EC%9E%90%EB%93%B1%EB%A1%9D%EC%A6%9D.jpg','ORG_WAIT','031-339-2046',0),(26,NULL,'2022-05-20 09:40:25','thgml36928@gmail.com','','박소희',NULL,'$2a$10$rCTxmL63gVgsXazUcO0oLuDKRz36ky2VJPkcued7BJUedKcNqgNuW',NULL,NULL,'USER','010-2058-6270',0),(27,NULL,'2022-05-20 10:20:32','jemmm12@gmail.com','안녕하세요','이제민',NULL,'$2a$10$x.so.dRvayO1ja6TxrLop.dcrIACvvpIXDh59vmDMUjNM8p0H6YcW','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/fb65db6f-f9dd-4d8a-a7d4-1fc28fdf954cssafy.jpg',NULL,'USER','010-3151-8652',0),(28,NULL,'2022-05-20 10:48:34','qlrqod6513@naver.com','안녕하세요, 이다예입니다.','이다예',NULL,'$2a$10$SJcV6ndtyTAh6dJqyQf9ruqJwaeOm6LVIszMqu1dqtE8ZxeIIkjby',NULL,NULL,'USER','010-8373-0693',0),(29,NULL,'2022-05-20 11:41:23','ny3021@gmail.com','반갑습니다. 하하하','김나영',NULL,'$2a$10$NqZJpdpPYaUQiUP8fht7C.fa9xPBHQ/HpYezSttWTFDbTOz9UoS12','https://c106-helpus.s3.ap-northeast-2.amazonaws.com/49597d36-b9c7-4442-801f-104f880040600dd24cbca2f3b73d7e30df8043310c11.jpg',NULL,'USER','010-3021-8856',0);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20 11:44:06
