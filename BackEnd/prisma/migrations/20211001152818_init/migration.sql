-- AlterTable
ALTER TABLE `post` ADD COLUMN `deletedAt` TIMESTAMP(6);

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deletedAt` TIMESTAMP(6),
    ADD COLUMN `updatedAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `imgURL` VARCHAR(500) DEFAULT 'http://localhost:3000/images/default.jpg';
