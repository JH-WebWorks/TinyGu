-- CreateTable
CREATE TABLE "clicks" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "linkKeyword" VARCHAR(200),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "keyword" VARCHAR(200) NOT NULL,
    "url" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("keyword")
);

-- CreateTable
CREATE TABLE "user" (
    "email" CHAR(255) NOT NULL,
    "salt" CHAR(32) NOT NULL,
    "password_hash" CHAR(128) NOT NULL,

    PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "session" (
    "sid" VARCHAR NOT NULL,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,

    PRIMARY KEY ("sid")
);

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "session"("expire");

-- AddForeignKey
ALTER TABLE "clicks" ADD FOREIGN KEY ("linkKeyword") REFERENCES "links"("keyword") ON DELETE SET NULL ON UPDATE CASCADE;
