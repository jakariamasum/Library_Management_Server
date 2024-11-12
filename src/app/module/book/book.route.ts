import { Router } from "express";
import { BookControllers } from "./book.controller";

const router = Router();

router.post("/", BookControllers.createBook);
router.get("/", BookControllers.getAllBooks);
router.get("/:bookId", BookControllers.getSingleBook);
router.put("/:bookId", BookControllers.updateBook);
router.delete("/:bookId", BookControllers.deleteBooks);

export const BookRoutes = router;
