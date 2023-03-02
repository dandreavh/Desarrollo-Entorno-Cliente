CREATE DATABASE IF NOT EXISTS `dwec` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `dwec`;

CREATE TABLE `movies_favs`
(
  `id` varchar(1024) NOT NULL,
  `original_title` varchar(1024),
  `overview` varchar(1024),
  `original_language` varchar(1024),
  `release_date` varchar(1024),
  `vote_average` varchar(1024),
  `poster_path` varchar(1024),
  CONSTRAINT id PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

