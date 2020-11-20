-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2020 at 10:21 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hire_code`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `ac_id` int(11) UNSIGNED NOT NULL,
  `ac_name` varchar(50) DEFAULT NULL,
  `ac_email` varchar(50) DEFAULT NULL,
  `ac_phone` varchar(20) DEFAULT NULL,
  `ac_password` longtext,
  `ac_level` int(11) DEFAULT NULL,
  `ac_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ac_update_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`ac_id`, `ac_name`, `ac_email`, `ac_phone`, `ac_password`, `ac_level`, `ac_created_at`, `ac_update_at`) VALUES
(1, 'ajizul', 'ajizul2@gmail.com', '085779397330', '$2b$10$uSirp0/cFavF3XZB93qyyOy0Sa1vKw3LS2ZMkdQGwIcC5jC6ypjuW', 0, '2020-11-19 03:24:40', '2020-11-19 03:24:40'),
(3, 'alfi yata', 'alfi92@gmail.com', '085219676840', '$2b$10$MSca2D558L/xS.QKQZP7AOHoF/f9Lp4odx10qKQ95EospLKZg52ki', 1, '2020-11-19 03:27:03', '2020-11-19 03:27:03'),
(4, 'dafa bagus', 'dafa@gmail.com', '085779397330', '$2b$10$fkL2g1GBYeFj48SUW/9D.Og2NwJw703KWUqeXlAldrQVl7XO5U65O', 0, '2020-11-18 13:58:43', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `cn_id` int(10) UNSIGNED NOT NULL,
  `ac_id` int(10) UNSIGNED NOT NULL,
  `cn_perusahaan` varchar(100) DEFAULT NULL,
  `cn_jabatan` varchar(50) DEFAULT NULL,
  `cn_bidang` varchar(50) DEFAULT NULL,
  `cn_kota` varchar(50) DEFAULT NULL,
  `cn_deskripsi` text,
  `cn_instagram` varchar(50) DEFAULT NULL,
  `cn_linkedin` varchar(50) DEFAULT NULL,
  `cn_ft_profil` longtext,
  `cn_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cn_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`cn_id`, `ac_id`, `cn_perusahaan`, `cn_jabatan`, `cn_bidang`, `cn_kota`, `cn_deskripsi`, `cn_instagram`, `cn_linkedin`, `cn_ft_profil`, `cn_created_at`, `cn_updated_at`) VALUES
(1, 3, 'Tokopedia', 'Manager', 'Marketplace', 'Jakarta', '-', '-', '-', 'image-1605779495555.jpg', '2020-11-19 09:51:35', '2020-11-19 09:51:35');

-- --------------------------------------------------------

--
-- Table structure for table `engineer`
--

CREATE TABLE `engineer` (
  `en_id` int(11) UNSIGNED NOT NULL,
  `ac_id` int(11) UNSIGNED NOT NULL,
  `en_job_title` varchar(50) DEFAULT NULL,
  `en_job_type` enum('freelance','fulltime') DEFAULT NULL,
  `en_domisili` varchar(50) DEFAULT NULL,
  `en_deskripsi` text,
  `en_ft_profil` longtext,
  `en_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `en_update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `engineer`
--

INSERT INTO `engineer` (`en_id`, `ac_id`, `en_job_title`, `en_job_type`, `en_domisili`, `en_deskripsi`, `en_ft_profil`, `en_created_at`, `en_update_at`) VALUES
(1, 1, 'Android Developer', 'fulltime', 'jakarta', '-', '-', '2020-11-18 11:54:17', '2020-11-18 11:54:17'),
(3, 4, 'Web Developer', 'freelance', 'jakarta', '-', 'image-1605778871167.jpg', '2020-11-18 12:56:35', '2020-11-19 09:41:11');

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `ex_id` int(11) UNSIGNED NOT NULL,
  `en_id` int(11) UNSIGNED NOT NULL,
  `ex_posisi` varchar(50) DEFAULT NULL,
  `ex_perusahaan` varchar(100) DEFAULT NULL,
  `ex_start` date DEFAULT NULL,
  `ex_end` date DEFAULT NULL,
  `ex_deskripsi` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `experience`
--

INSERT INTO `experience` (`ex_id`, `en_id`, `ex_posisi`, `ex_perusahaan`, `ex_start`, `ex_end`, `ex_deskripsi`) VALUES
(2, 1, 'software engineer', 'Bukalapak', '2019-08-05', '2020-06-05', '-');

-- --------------------------------------------------------

--
-- Table structure for table `hire`
--

CREATE TABLE `hire` (
  `hr_id` int(11) UNSIGNED NOT NULL,
  `en_id` int(11) UNSIGNED NOT NULL,
  `pj_id` int(10) UNSIGNED NOT NULL,
  `hr_price` bigint(12) UNSIGNED DEFAULT NULL,
  `hr_message` text,
  `hr_status` enum('wait','reject','approve') DEFAULT NULL,
  `hr_date_confirm` datetime NOT NULL,
  `hr_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hire`
--

INSERT INTO `hire` (`hr_id`, `en_id`, `pj_id`, `hr_price`, `hr_message`, `hr_status`, `hr_date_confirm`, `hr_created_at`) VALUES
(1, 1, 2, 150000000, 'silahkan respon', 'approve', '0000-00-00 00:00:00', '2020-11-18 14:47:53');

-- --------------------------------------------------------

--
-- Table structure for table `portofolio`
--

CREATE TABLE `portofolio` (
  `pr_id` int(11) UNSIGNED NOT NULL,
  `en_id` int(11) UNSIGNED NOT NULL,
  `pr_aplikasi` varchar(50) DEFAULT NULL,
  `pr_deskripsi` text,
  `pr_link_pub` varchar(100) DEFAULT NULL,
  `pr_link_repo` varchar(50) DEFAULT NULL,
  `pr_tp_kerja` varchar(100) DEFAULT NULL,
  `pr_tipe` enum('aplikasi mobile','aplikasi web') NOT NULL,
  `pr_gambar` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `portofolio`
--

INSERT INTO `portofolio` (`pr_id`, `en_id`, `pr_aplikasi`, `pr_deskripsi`, `pr_link_pub`, `pr_link_repo`, `pr_tp_kerja`, `pr_tipe`, `pr_gambar`) VALUES
(1, 1, 'e-banking', 'cek akun banking', '-', '-', 'Bank BCA', 'aplikasi web', 'image-1605778303014.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `pj_id` int(11) UNSIGNED NOT NULL,
  `cn_id` int(11) UNSIGNED NOT NULL,
  `pj_nama_project` varchar(100) DEFAULT NULL,
  `pj_deskripsi` text,
  `pj_deadline` date DEFAULT NULL,
  `pj_gambar` text,
  `pj_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `pj_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`pj_id`, `cn_id`, `pj_nama_project`, `pj_deskripsi`, `pj_deadline`, `pj_gambar`, `pj_created_at`, `pj_updated_at`) VALUES
(2, 1, 'Mobile App Haistar', 'membuat android app haistar', '2020-08-08', '-', '2020-11-18 14:45:12', '0000-00-00 00:00:00'),
(3, 1, 'Mobile App Marketplace Haistar', 'membuat android app haistar', '2020-08-29', 'image-1605776875010.jpg', '2020-11-19 09:07:55', '2020-11-19 09:07:55');

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `sk_id` int(11) UNSIGNED NOT NULL,
  `en_id` int(11) UNSIGNED NOT NULL,
  `sk_nama_skill` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`sk_id`, `en_id`, `sk_nama_skill`) VALUES
(1, 1, 'kotlin'),
(2, 1, 'node.js');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ac_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`cn_id`);

--
-- Indexes for table `engineer`
--
ALTER TABLE `engineer`
  ADD PRIMARY KEY (`en_id`);

--
-- Indexes for table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`ex_id`);

--
-- Indexes for table `hire`
--
ALTER TABLE `hire`
  ADD PRIMARY KEY (`hr_id`);

--
-- Indexes for table `portofolio`
--
ALTER TABLE `portofolio`
  ADD PRIMARY KEY (`pr_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`pj_id`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`sk_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `ac_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `cn_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `engineer`
--
ALTER TABLE `engineer`
  MODIFY `en_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `experience`
--
ALTER TABLE `experience`
  MODIFY `ex_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hire`
--
ALTER TABLE `hire`
  MODIFY `hr_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `portofolio`
--
ALTER TABLE `portofolio`
  MODIFY `pr_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `pj_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `sk_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
