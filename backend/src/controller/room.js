const RoomService = require("../service/room");
const { createRoomSchema, roomSchema } = require("../schema/room.schema");
const checkRole = require("../util/checkRole");

class RoomController {
  async GetRooms(req, res) {
    try {
      const rooms = await RoomService.GetRooms();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async GetRoom(req, res) {
    try {
      const validation = roomSchema.safeParse(req.params);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
      }
      const room = await RoomService.GetRoomById(validation.data);
      res.status(200).json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async CreateRoom(req, res) {
    try {
      const validation = createRoomSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
      }
      if (!checkRole(req, "ADMIN")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const room = await RoomService.CreateRoom(validation.data);
      res.status(201).json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async UpdateRoom(req, res) {
    try {
      const validation = roomSchema.safeParse({
        id: req.params.id,
        ...req.body,
      });
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
      }
      if (checkRole(req, "ADMIN")) {
        const room = await RoomService.UpdateRoom(validation.data);
        res.status(200).json(room);
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async DeleteRoom(req, res) {
    try {
      const validation = roomSchema.safeParse(req.params);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
      }
      if (checkRole(req, "ADMIN")) {
        const room = await RoomService.DeleteRoom(validation.data);
        res.status(200).json(room);
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new RoomController();
