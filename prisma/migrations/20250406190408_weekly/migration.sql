-- CreateTable
CREATE TABLE `User` (
    `_id` VARCHAR(191) NOT NULL,
    `profileImage` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NULL,
    `middleName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NULL,
    `dateOfBirth` VARCHAR(191) NULL,
    `telePhone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `cityName` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `pinCode` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `password` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'USER', 'STUDENT', 'TEACHER') NOT NULL DEFAULT 'STUDENT',
    `typeOfIdentificationCard` VARCHAR(191) NULL,
    `identificationCardNumber` VARCHAR(191) NULL,
    `identificationFile` VARCHAR(191) NULL,
    `isTwoFactorEnabled` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `_id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NULL,
    `access_token` VARCHAR(191) NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` VARCHAR(191) NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_email_token_key`(`email`, `token`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordResetToken` (
    `_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PasswordResetToken_token_key`(`token`),
    UNIQUE INDEX `PasswordResetToken_email_token_key`(`email`, `token`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TwoFactorToken` (
    `_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TwoFactorToken_token_key`(`token`),
    UNIQUE INDEX `TwoFactorToken_email_token_key`(`email`, `token`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TwoFactorConfirmation` (
    `_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TwoFactorConfirmation_userId_key`(`userId`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SearchQuery` (
    `_id` VARCHAR(191) NOT NULL,
    `query` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Challenge` (
    `_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `description` JSON NULL,
    `image` VARCHAR(191) NULL,
    `challengeType` VARCHAR(191) NULL,
    `startDate` VARCHAR(191) NULL,
    `endDate` VARCHAR(191) NULL,
    `reward` VARCHAR(191) NULL,
    `Visibility` BOOLEAN NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `description` JSON NULL,
    `image` VARCHAR(191) NULL,
    `github` VARCHAR(191) NULL,
    `projectLink` VARCHAR(191) NULL,
    `videoDemoLink` VARCHAR(191) NULL,
    `Inspiration` VARCHAR(191) NULL,
    `challengesFaced` VARCHAR(191) NULL,
    `challengeId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TwoFactorConfirmation` ADD CONSTRAINT `TwoFactorConfirmation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Challenge` ADD CONSTRAINT `Challenge_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_challengeId_fkey` FOREIGN KEY (`challengeId`) REFERENCES `Challenge`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
