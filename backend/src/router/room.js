const RoomController = require("../controller/room");
const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, RoomController.GetRooms);
router.get("/:id", auth, RoomController.GetRoom);
router.post("/", auth, RoomController.CreateRoom);
router.put("/:id", auth, RoomController.UpdateRoom);
router.delete("/:id", auth, RoomController.DeleteRoom);

module.exports = router;
