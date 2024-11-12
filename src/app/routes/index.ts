import { Router } from "express";
import { MemberRoutes } from "../module/member/member.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/members",
    route: MemberRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
