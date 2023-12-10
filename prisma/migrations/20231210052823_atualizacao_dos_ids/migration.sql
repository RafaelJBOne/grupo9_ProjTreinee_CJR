/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.
  - The primary key for the `Comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Comments` table. All the data in the column will be lost.
  - The primary key for the `Posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Posts` table. All the data in the column will be lost.
  - The primary key for the `Job_title` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Job_title` table. All the data in the column will be lost.
  - Added the required column `id_USER` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_COMMENT` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_POST` to the `Posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_JOB` to the `Job_title` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id_USER" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_picture" BLOB,
    "gender" TEXT,
    "email" TEXT NOT NULL,
    "job_title_id" INTEGER NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Users_job_title_id_fkey" FOREIGN KEY ("job_title_id") REFERENCES "Job_title" ("id_JOB") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("admin", "created_at", "email", "gender", "job_title_id", "password", "profile_picture", "updated_at", "username") SELECT "admin", "created_at", "email", "gender", "job_title_id", "password", "profile_picture", "updated_at", "username" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
CREATE TABLE "new_Comments" (
    "id_COMMENT" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    CONSTRAINT "Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts" ("id_POST") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id_USER") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comments" ("content", "post_id", "user_id") SELECT "content", "post_id", "user_id" FROM "Comments";
DROP TABLE "Comments";
ALTER TABLE "new_Comments" RENAME TO "Comments";
CREATE TABLE "new_Posts" (
    "id_POST" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id_USER") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Posts" ("content", "created_at", "updated_at", "user_id") SELECT "content", "created_at", "updated_at", "user_id" FROM "Posts";
DROP TABLE "Posts";
ALTER TABLE "new_Posts" RENAME TO "Posts";
CREATE TABLE "new_Job_title" (
    "id_JOB" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "team" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Job_title" ("created_at", "name", "team") SELECT "created_at", "name", "team" FROM "Job_title";
DROP TABLE "Job_title";
ALTER TABLE "new_Job_title" RENAME TO "Job_title";
CREATE UNIQUE INDEX "Job_title_name_key" ON "Job_title"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
