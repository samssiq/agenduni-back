import { Router } from "express";
import  sequelize from "../config/database";
import { UserController } from "../controllers/UserController";
import { authenticateJWT } from "../middleware/authMiddleware";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repository/UserRepository";

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/", async (req, res) => {await userController.createUser(req,res);});

router.post("/login", async (req, res) => {await userController.login(req,res);});

router.get("/users", async (req, res) => {await userController.getAllUsers(req,res);});

router.get("/:id", async (req, res) => {await userController.getUserById(req,res);});

router.patch("/:id",authenticateJWT, async (req, res) => {await userController.updateUser(req,res);});

router.delete("/:id",authenticateJWT,  async (req, res) => {await userController.deleteUser(req,res);});

export default router;