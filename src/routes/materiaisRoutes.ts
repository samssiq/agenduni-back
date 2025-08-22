import { Router } from "express";
import { MateriaisController } from "../controllers/materiaisController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/", async (req, res) => {
    await MateriaisController.create(req, res);
});

router.get("/materiais/:id", async (req, res) => {
    await MateriaisController.list(req, res);
});

router.get("/:id", async (req, res) => {
    await MateriaisController.findById(req, res);
});

router.patch("/:id", authenticateJWT, async (req, res) => {
    await MateriaisController.update(req, res);
});

router.delete("/:id", authenticateJWT, async (req, res) => {
    await MateriaisController.delete(req, res);
});

export default router;