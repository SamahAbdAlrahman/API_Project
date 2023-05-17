-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2023 at 10:00 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apicrud`
--

-- --------------------------------------------------------

--
-- Table structure for table `applicant`
--

CREATE TABLE `applicant` (
  `idApplicant` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `ScientificQualification` varchar(255) DEFAULT NULL,
  `MobileNumber` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `priorExperiences` varchar(255) DEFAULT NULL,
  `moreDetails` varchar(255) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `jobApplicantName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applicant`
--

INSERT INTO `applicant` (`idApplicant`, `fullname`, `address`, `age`, `ScientificQualification`, `MobileNumber`, `email`, `priorExperiences`, `moreDetails`, `job_id`, `jobApplicantName`) VALUES
(3, 'samah saeed', 'salfet', 21, 'eng', '0599', 'tt@gmail.com', 'no', 'no', 3, 'hardware eng'),
(6, 'samah saeed', 'salfet', 21, 'eng', '0599', 'tt@gmail.com', 'no', 'no', 12, 'y12'),
(7, 'samah saeed', 'updateApplications', 2, '34', '34', 'tr', 'tt', 'gtrrrrrrrrrrrrrrr', 1, 'Software Engineer');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `jname` varchar(200) NOT NULL,
  `jaddress` varchar(200) NOT NULL,
  `jsalary` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `jname`, `jaddress`, `jsalary`) VALUES
(1, 'Software Engineer', 'borqa', '3500'),
(2, 'markting22', 'salfet2', '3000'),
(3, 'hardware eng', 'qlqeleah', '2000'),
(4, 'civil engineer', 'jennen', '1000'),
(10, 'private teacher', 'online!', '9000'),
(12, 'y12', 'nablus rafedia', 'undefined'),
(13, 'marketing', 'Nablus', '1000'),
(14, 'online marketing', 'online ', '500');

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `mid` int(11) NOT NULL,
  `mname` varchar(200) NOT NULL,
  `mpass` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`mid`, `mname`, `mpass`) VALUES
(1, 'samah', 's123'),
(2, 'samah2', 's123'),
(3, 'smsm', 'smsm123'),
(4, 'yzan18', '1234'),
(5, 'misam', '***'),
(6, 'misam_k', 'mis123'),
(7, 'misam222222222', '***');

-- --------------------------------------------------------

--
-- Table structure for table `searched_jobs`
--

CREATE TABLE `searched_jobs` (
  `id` int(11) NOT NULL,
  `job_name` varchar(255) NOT NULL,
  `search_date` date DEFAULT curdate(),
  `applicant_fullname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `searched_jobs`
--

INSERT INTO `searched_jobs` (`id`, `job_name`, `search_date`, `applicant_fullname`) VALUES
(1, '12', '2023-05-17', NULL),
(2, 'y12', '2023-05-17', NULL),
(3, 'hardware eng', '2023-05-17', NULL),
(4, 'hardware eng', '2023-05-17', 'samah saeed'),
(5, 'hardware eng', '2023-05-17', 'samah saeed'),
(6, 'Software Engineer', '2023-05-17', 'samah saeed'),
(7, 'civil engineer', '2023-05-17', 'samah saeed'),
(8, 'hardware eng', '2023-05-17', 'samah saeed');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applicant`
--
ALTER TABLE `applicant`
  ADD PRIMARY KEY (`idApplicant`),
  ADD KEY `job_id` (`job_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `searched_jobs`
--
ALTER TABLE `searched_jobs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `searched_jobs`
--
ALTER TABLE `searched_jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applicant`
--
ALTER TABLE `applicant`
  ADD CONSTRAINT `applicant_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
