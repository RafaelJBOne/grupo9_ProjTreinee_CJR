-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_picture" BLOB,
    "gender" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "job_title_id" INTEGER NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Users_job_title_id_fkey" FOREIGN KEY ("job_title_id") REFERENCES "Job_title" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("admin", "created_at", "email", "gender", "id", "job_title_id", "password", "profile_picture", "updated_at", "username") SELECT "admin", "created_at", "email", "gender", "id", "job_title_id", "password", "profile_picture", "updated_at", "username" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
CREATE TABLE "new_Job_title" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Job_title" ("created_at", "id", "name", "team") SELECT "created_at", "id", "name", "team" FROM "Job_title";
DROP TABLE "Job_title";
ALTER TABLE "new_Job_title" RENAME TO "Job_title";
CREATE TABLE "new_Posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Posts" ("content", "created_at", "id", "updated_at", "user_id") SELECT "content", "created_at", "id", "updated_at", "user_id" FROM "Posts";
DROP TABLE "Posts";
ALTER TABLE "new_Posts" RENAME TO "Posts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
