const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class RoomService {
  async GetRooms() {
    return await prisma.room.findMany();
  }
  async GetRoomById(roomData) {
    return await prisma.room.findUnique({
      where: {
        id: Number(roomData.id),
      },
    });
  }
  async CreateRoom(roomData) {
    return await prisma.room.create({
      data: {
        name: roomData.name,
        location: roomData.location,
        capacity: roomData.capacity,
        features: roomData.features,
      },
    });
  }
  async UpdateRoom(roomData) {
    const room = await prisma.room.findUnique({
      where: {
        id: roomData.id,
      },
    });
    if (!room) {
      throw new Error("Room not found");
    }
    return await prisma.room.update({
      where: {
        id: roomData.id,
      },
      data: {
        name: roomData.name || room.name,
        location: roomData.location || room.location,
        capacity: roomData.capacity || room.capacity,
        features: roomData.features || room.features,
      },
    });
  }
  async DeleteRoom(roomData) {
    return await prisma.room.delete({
      where: {
        id: roomData.id,
      },
    });
  }
}

module.exports = new RoomService();
