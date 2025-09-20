import { Router } from "express";
import { LembretesController } from "../controllers/lembretesController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/", async (req, res) => {
    await LembretesController.create(req, res);
});

router.get("/lembretes/:id", async (req, res) => {
    await LembretesController.list(req, res);
});

router.get("/user/:id", async (req, res) => {
    await LembretesController.listByUser(req, res);
});

router.get("/:id", async (req, res) => {
    await LembretesController.findById(req, res);
});

router.patch("/:id", authenticateJWT, async (req, res) => {
    await LembretesController.update(req, res);
});

router.delete("/:id", authenticateJWT, async (req, res) => {
    await LembretesController.delete(req, res);
});

export default router;
