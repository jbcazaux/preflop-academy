-- CreateTable
CREATE TABLE "Ranges" (
    "id" SERIAL NOT NULL,
    "move" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "versus" TEXT NOT NULL DEFAULT '',
    "range" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ranges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PushFold" (
    "id" SERIAL NOT NULL,
    "bb" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "range" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PushFold_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ranges_move_position_versus_key" ON "Ranges"("move", "position", "versus");

-- CreateIndex
CREATE UNIQUE INDEX "PushFold_bb_position_key" ON "PushFold"("bb", "position");
