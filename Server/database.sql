
use assessments;
--
-- Table structure for table `todolist`
--
DROP TABLE IF EXISTS `todolist`;
CREATE TABLE `todolist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` varchar(100) DEFAULT NULL,
  `title` varchar(300) DEFAULT NULL,
  `description` varchar(10000) DEFAULT NULL,
  `label` varchar(100) DEFAULT 'ALL',
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
); 
--
-- Dumping data for table `todolist`
--

INSERT INTO `todolist`(userid,title,description,label,status) VALUES ('+919999999999','Search Jobs','Search Jobs on Linkedin','Jobs',0),('+919999999999','Apply Jobs','Apply Relevant Jobs on Linkedin','Jobs',0),('+919999999999','Complete Assessments','Complete Assessments sent by Employer','Assessments',0),('+919999999999','Revise Concepts','Revise React JS and Python Concepts','Study',0);
