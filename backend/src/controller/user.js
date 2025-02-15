const UserService = require("../service/user");
const {
  createUserSchema,
  userSchema,
  loginSchema,
} = require("../schema/user.schema");
const checkRole = require("../util/checkRole");
const checkId = require("../util/checkId");
class UserController {
  async CreateUser(req, res) {
    try {
      const validation = createUserSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
      }

      const user = await UserService.CreateUser(validation.data);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async GetUsers(req, res) {
    try {
      if (!checkRole(req, "ADMIN")) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const users = await UserService.GetUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async GetUser(req, res) {
    try {
      const validation = userSchema.safeParse(req.params);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
      }
      if (checkRole(req, "admin") || checkId(req, req.params.id)) {
        const user = await UserService.GetUser(req.params.id);
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async UpdateUser(req, res) {
    try {
      const validation = userSchema.safeParse({
        id: req.params.id,
        ...req.body,
      });
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
      }
      if (checkRole(req, "admin") || checkId(req, req.params.id)) {
        const user = await UserService.UpdateUser(validation.data);
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async DeleteUser(req, res) {
    try {
      const validation = userSchema.safeParse(req.params);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
      }
      if (checkRole(req, "admin") || checkId(req, req.params.id)) {
        await UserService.DeleteUser(req.params.id);
        res.status(204).end();
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async LoginUser(req, res) {
    try {
      const validation = loginSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.format() });
      }
      const user = await UserService.LoginUser(validation.data);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
module.exports = new UserController();
