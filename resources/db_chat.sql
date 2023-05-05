-- MySQL Script generated by MySQL Workbench
-- Thu May  4 21:29:30 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_chat
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_chat
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_chat` DEFAULT CHARACTER SET utf8 ;
USE `db_chat` ;

-- -----------------------------------------------------
-- Table `db_chat`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_chat`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_chat`.`chats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_chat`.`chats` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_chat`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_chat`.`message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` TEXT NULL,
  `chats_id` INT NOT NULL,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_message_chats`
    FOREIGN KEY (`chats_id`)
    REFERENCES `db_chat`.`chats` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_users1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `db_chat`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_users2`
    FOREIGN KEY (`receiver_id`)
    REFERENCES `db_chat`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
