import { Router } from "express";
import multer from "multer";
import {
    checkStatusController,
    createFromImageController,
    createFromPdfBulkController,
    createFromPdfController,
    createFromTextController
} from "../controllers/quiz.controller";
import {
    getCategoriesBulkController,
    getQuizesByIdController,
    getQuizzesLengthController
} from "../controllers/get-quiz.controller";
import {
    deleteQuizByIdController
} from "../controllers/delete-quiz.controller";

export const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

router.post("/create/pdf", createFromPdfController)
router.post("/create/pdf/bulk", upload.single("pdf"), createFromPdfBulkController)
router.post("/create/image", upload.single("image"), createFromImageController)
router.post("/create/text", createFromTextController)
router.get("/get/category", getCategoriesBulkController)
router.get("/get/length", getQuizzesLengthController)
router.get("/get/:id", getQuizesByIdController)
router.get("/get/status/:id", checkStatusController)
router.delete("/delete/:id", deleteQuizByIdController)