--기존에 haarydb가 있을 경우
--drop database harrydb;

--------------------------------------------------------------
-- Schema 및 table 만들기 코드
--------------------------------------------------------------
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema harrydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `harrydb` DEFAULT CHARACTER SET utf8 ;
USE `harrydb` ;

-- -----------------------------------------------------
-- Table `harrydb`.`characters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harrydb`.`characters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `image` VARCHAR(200) NULL,
  `wordcloud` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `harrydb`.`speech`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harrydb`.`speech` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `speech` TEXT(500) NULL,
  `character` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `harrydb`.`spells`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harrydb`.`spells` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `spell` VARCHAR(200) NULL,
  `series` SMALLINT(10) NULL,
  `character` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `harrydb`.`emotions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harrydb`.`emotions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `anger` INT NULL,
  `fear` INT NULL,
  `anticipation` INT NULL,
  `trust` INT NULL,
  `surprise` INT NULL,
  `sadness` INT NULL,
  `joy` INT NULL,
  `disgust` INT NULL,
  `characters_id` INT NOT NULL,
  PRIMARY KEY (`id`, `characters_id`),
  INDEX `fk_emotions_characters1_idx` (`characters_id` ASC),
  CONSTRAINT `fk_emotions_characters1`
    FOREIGN KEY (`characters_id`)
    REFERENCES `harrydb`.`characters` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `harrydb`.`balance_game_options`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harrydb`.`balance_game_options` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `options` TEXT(1000) NULL,
  `image` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `harrydb`.`balance_game_responses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harrydb`.`balance_game_responses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `left` INT NULL,
  `right` INT NULL,
  `balance_game_options_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_balance_game_responses_balance_game_options1_idx` (`balance_game_options_id` ASC),
  UNIQUE INDEX `balance_game_options_id_UNIQUE` (`balance_game_options_id` ASC),
  CONSTRAINT `fk_balance_game_responses_balance_game_options1`
    FOREIGN KEY (`balance_game_options_id`)
    REFERENCES `harrydb`.`balance_game_options` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `harrydb`.`random_data`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harrydb`.`random_data` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(60) NULL,
  `element` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `harrydb`.`speech_has_characters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harrydb`.`speech_has_characters` (
  `speech_id` INT NOT NULL,
  `characters_id` INT NOT NULL,
  PRIMARY KEY (`speech_id`, `characters_id`),
  INDEX `fk_speech_has_characters_characters1_idx` (`characters_id` ASC),
  INDEX `fk_speech_has_characters_speech_idx` (`speech_id` ASC),
  CONSTRAINT `fk_speech_has_characters_speech`
    FOREIGN KEY (`speech_id`)
    REFERENCES `harrydb`.`speech` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_speech_has_characters_characters1`
    FOREIGN KEY (`characters_id`)
    REFERENCES `harrydb`.`characters` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `harrydb`.`spells_has_characters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harrydb`.`spells_has_characters` (
  `spells_id` INT NOT NULL,
  `characters_id` INT NOT NULL,
  PRIMARY KEY (`spells_id`, `characters_id`),
  INDEX `fk_spells_has_characters_characters1_idx` (`characters_id` ASC),
  INDEX `fk_spells_has_characters_spells1_idx` (`spells_id` ASC),
  CONSTRAINT `fk_spells_has_characters_spells1`
    FOREIGN KEY (`spells_id`)
    REFERENCES `harrydb`.`spells` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_spells_has_characters_characters1`
    FOREIGN KEY (`characters_id`)
    REFERENCES `harrydb`.`characters` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `harrydb`.`random_data_format`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harrydb`.`random_data_format` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `format` TEXT(2000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- 밸런스 게임 options 삽입코드
-- -----------------------------------------------------
insert into balance_game_options(options) values
('코딱지맛 젤리 먹기 vs 귀지맛 젤리 먹기'),
('스네이프와 밤새 물약 만들기 vs 해그리드와 밤새 금지된 숲 순찰하기'),
('말포이네 일일 집요정 vs 엄브릿지 일일 비서'),
('볼드모트에게 공개 고백받기 vs 볼드모트와 단 둘이 있을 때 고백받기'),
('내기니 한시간 돌보기 vs 아라고그 한시간 돌보기'),
('트롤 콧물로 샤워하기 vs 플러피 침으로 샤워하기');

-- -----------------------------------------------------
-- 밸런스 게임 responses 삽입코드(디폴트로 0 값 삽입)
-- -----------------------------------------------------
insert into balance_game_responses(`left`, `right`, `balance_game_options_id`)
values (0,0,1),(0,0,2),(0,0,3),(0,0,4),(0,0,5),(0,0,6);

-- -----------------------------------------------------
-- random data format 삽입코드
-- -----------------------------------------------------
INSERT INTO random_data_format(format)
VALUES
('안녕! 난 {character1}(이)야.space내가 편지를 보냈다는 걸 아무도 알아선 안돼.space내일 저녁 6시 {place}(으)로 가.space거기서 {food}을(를) 먹고 있는 자를 찾아.space그가 너에게 무엇을 해야할지 알려줄거야.space가는 길에 {creature}을(를) 조심해!'),
('당신은 어느날 우연히 {place}을(를) 방문했다가 {character1}을(를) 만나게 됩니다.space그 곳에서 당신은 {character1}이(가) {spell}라고 주문을 말하는 것을 듣게됩니다.space그 후 밖을 나온 당신은 {character2}를 만나게 됩니다.space당신은 {character2}에게 {item}을(를) 받고 그 댓가로 당신이 들은 말을 전해줍니다.space'),
('{character1}은(는) {character2}이(가) 밤마다 사라지는 것이 수상하다고 생각했다.space그래서 어느날 밤, {character1}은(는) {character2}을(를) 미행했다.space어둠을 뚫고, {character2}이(가) 향한 곳은 바로 {place}이었다.space{character2}은(는) 그곳에 {item}을(를) 보관하고 있었다.space{character1}는 왜 {character2}이(가) {item}을 보관하고 있었는지 궁금했다.space그때 {character2}이(가) "{spell}"라고 주문을 말했다.space'),
('익명으로 작성된 편지에는 이렇게 쓰여 있었다.space"나는 네가 그날 밤 {place}에서 한 일을 알고 있어."space{character1}은(는) 도대체 누가 이런 편지를 쓴 것인지, 진짜 목격자가 있던 것인지 불안해졌다.space혹시 목격자가 있었다면 {item}에 대한 이야기를 들은 것이 아닌지, 그의 계획이 탄로나버린 게 아닌지 걱정이 되었다.space계획을 바꿔야 할지도 모르겠다.space'),
('오늘은 당신이 호그와트에 입학한 첫번째 날입니다!space당신은 당신과 같은 기숙사 방을 쓰게 된 {character1}와(과) 가장 친한 친구가 되었습니다.space그러나 식당에서 실수로 {character2}에게 {food}를(을) 쏟은 당신은 {character2}의 숙적이 되었군요!space{character2}은(는) 당신에게 새벽 1시에 {place}에서 결투하자고 말합니다.space{place}에 도착한 당신은 {character1}의 도움을 받아 {spell} 주문을 써서 {character2}을(를) 극적으로 이깁니다.space'),
('오늘은 스네이프 교수님과의 수업이 있는 날입니다.space수업에 늦지 않기 위해 기숙사를 일찍 나왔건만 당신은 복도에서 {creature}을(를) 만나 결국 수업에 지각하게 됩니다.space복도에서 만난 {creature} 때문에 늦었다고 해명하는 당신에게 스네이프 교수님은 벌을 내립니다.space같이 지각한 {character1}와(과) {place} 청소를 해야하는 벌칙입니다!space오늘은 당신에게 불행한 날이군요.... space'),
('{character1}(으)로부터space안녕. 마지막 편지로부터 벌써 일주일이 지났네space그 동안 나는 매일 네가 그리워서 잠도 못잤어space네가 나와 같은 마음이란 걸 알고 얼마나 기뻤는지 몰라space우리 내일 {place}에서 만나기로 한 거 기억 나지?space{place}에서 {food}을(를) 같이 먹으면서 데이트 하자!space사실 널 위해 {item}을 준비했는데 네가 좋아했으면 좋겠다space다음에는 우리 집에 있는 {creature}을(를) 보러 놀러와!space벌써부터 내일 너와 {place}에서 데이트할 게 기대된다.space그대 눈동자에 뭐가 비치든 그대 눈동자에 건배!space널 너무나 사랑하는 {character1}이(가)');