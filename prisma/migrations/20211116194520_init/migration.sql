-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('CAR', 'MOTORCYCLE');

-- CreateTable
CREATE TABLE "ParkingLot" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "cnpj" VARCHAR(20) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,

    CONSTRAINT "ParkingLot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "carCapacity" INTEGER NOT NULL,
    "motorcycleCapacity" INTEGER NOT NULL,
    "carOccupancy" INTEGER NOT NULL,
    "motorcycleOccupancy" INTEGER NOT NULL,
    "parkingLotId" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "licensePlate" VARCHAR(15) NOT NULL,
    "type" "VehicleType" NOT NULL DEFAULT E'CAR',
    "parkingLotId" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "entryTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exitTime" TIMESTAMP(3),
    "parkingLotId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParkingLot_email_key" ON "ParkingLot"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Status_parkingLotId_key" ON "Status"("parkingLotId");

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_parkingLotId_fkey" FOREIGN KEY ("parkingLotId") REFERENCES "ParkingLot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_parkingLotId_fkey" FOREIGN KEY ("parkingLotId") REFERENCES "ParkingLot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_parkingLotId_fkey" FOREIGN KEY ("parkingLotId") REFERENCES "ParkingLot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
