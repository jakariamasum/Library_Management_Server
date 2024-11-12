import { Router } from "express";
import { MemberControllers } from "./member.controller";

const router = Router();

router.get("/", MemberControllers.getMember);
export const MemberRoutes = router;
