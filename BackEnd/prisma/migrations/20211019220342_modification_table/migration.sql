/*
  Warnings:

  - You are about to alter the column `imgURL` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(255)`.
  - You are about to alter the column `imgURL` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(500)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `message` TEXT,
    MODIFY `imgURL` VARCHAR(255);

-- AlterTable
ALTER TABLE `user` MODIFY `imgURL` VARCHAR(255) DEFAULT 'http://localhost:3000/images/default.jpg';
