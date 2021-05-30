-- CreateTable
CREATE TABLE `user` (
    `email` CHAR(255) NOT NULL,
    `password` CHAR(128) NOT NULL,
    `salt` CHAR(32) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
