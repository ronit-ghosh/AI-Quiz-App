import { Router } from "express";
import multer from "multer";
import {
    createFromImageController,
    createFromPdfBulkController,
    createFromPdfController,
    createFromTextController
} from "../controllers/quiz.controller";
import {
    getCategoriesBulkController,
    getQuizesBulkController,
    getQuizesByIdController
} from "../controllers/get-quiz.controller";
import {
    deleteQuizByIdController
} from "../controllers/delete-quiz.controller";

export const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/create/pdf", createFromPdfController)
router.post("/create/pdf/bulk", upload.single("pdf"), createFromPdfBulkController)
router.post("/create/image", upload.single("image"), createFromImageController)
router.post("/create/text", createFromTextController)
router.get("/get", getQuizesBulkController)
router.get("/get/category", getCategoriesBulkController)
router.get("/get/:id", getQuizesByIdController)
router.delete("/delete/:id", deleteQuizByIdController)