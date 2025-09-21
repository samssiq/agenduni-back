import { Router } from "express";
import { DisciplinaController } from "../controllers/disciplinaController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/", async (req, res) => {
    await DisciplinaController.create(req, res);
});

router.get("/", async (req, res) => {
    await DisciplinaController.listAll(req, res);
});

router.get("/user/:userId", async (req, res) => {
    await DisciplinaController.listByUser(req, res);
});

router.get("/:id", async (req, res) => {
    await DisciplinaController.findById(req, res);
});

router.patch("/:id", authenticateJWT, async (req, res) => {
    await DisciplinaController.update(req, res);
});

router.delete("/:id", authenticateJWT, async (req, res) => {
    await DisciplinaController.delete(req, res);
});

export default router;