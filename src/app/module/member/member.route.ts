import { Router } from "express";
import { MemberControllers } from "./member.controller";

const router = Router();

router.post("/", MemberControllers.createMember);
router.get("/", MemberControllers.getAllMembers);
router.get("/:memberId", MemberControllers.getSingleMember);
router.put("/:memberId", MemberControllers.updateMember);
router.delete("/:memberId", MemberControllers.deleteMembers);

export const MemberRoutes = router;
