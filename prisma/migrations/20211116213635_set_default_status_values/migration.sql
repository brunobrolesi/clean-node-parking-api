-- AlterTable
ALTER TABLE "Status" ALTER COLUMN "carCapacity" SET DEFAULT 0,
ALTER COLUMN "motorcycleCapacity" SET DEFAULT 0,
ALTER COLUMN "carOccupancy" DROP NOT NULL,
ALTER COLUMN "carOccupancy" SET DEFAULT 0,
ALTER COLUMN "motorcycleOccupancy" DROP NOT NULL,
ALTER COLUMN "motorcycleOccupancy" SET DEFAULT 0;
