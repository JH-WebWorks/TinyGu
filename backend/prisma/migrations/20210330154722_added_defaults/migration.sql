-- CreateTable
CREATE TABLE `clicks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timestamp` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `linkKeyword` VARCHAR(200),
INDEX `linkKeyword`(`linkKeyword`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `links` (
    `keyword` VARCHAR(200) NOT NULL,
    `url` TEXT NOT NULL,
    `timestamp` DATETIME(0) NOT NULL,

    PRIMARY KEY (`keyword`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clicks` ADD FOREIGN KEY (`linkKeyword`) REFERENCES `links`(`keyword`) ON DELETE SET NULL ON UPDATE CASCADE;
