import { Router } from "express";
import  sequelize from "../config/database";
import { UserController } from "../controllers/userController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

const userController = new UserController();

router.post("/", async (req, res) => {await userController.createUser(req,res);});

router.post("/login",async (req,res)=> {await userController.login(req,res);});

// app.get("/users", async (req, res) => {await userController.getAllUsers(req,res);});

router.get("/", async (req, res) => {await userController.getUser(req,res);});

router.patch("/",authenticateJWT, async (req, res) => {await userController.update(req,res);});

router.delete("/",authenticateJWT,  async (req, res) => {await userController.deleteUser(req,res);});

export default router;