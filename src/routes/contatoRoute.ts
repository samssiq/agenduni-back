import { Router } from "express";
import { ContatoController } from "../controllers/contatoController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/", async (req, res) => {
    await ContatoController.create(req, res);
});

router.get("/user/:id", async (req, res) => {
   await ContatoController.listByUser(req, res);
});

router.get("/disciplina/:id", async (req, res) => {
   await ContatoController.list(req, res);
});

router.patch("/:id", authenticateJWT, async (req, res) => {
   await ContatoController.update(req, res);
});

router.delete("/:id", authenticateJWT, async (req, res) => {
   await ContatoController.delete(req, res);
});

export default router;