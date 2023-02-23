CREATE DATABASE IF NOT EXISTS `dwec` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `dwec`;

CREATE TABLE `users`
(
  `name` varchar(1024) NOT NULL,
  `phone` varchar(1024),
  `street` varchar(1024),
  `email` varchar(1024),
  `image` varchar(1024),
  CONSTRAINT id PRIMARY KEY (name)
)ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

