import { Router } from "express";
import { MemberRoutes } from "../module/member/member.route";
import { BookRoutes } from "../module/book/book.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/members",
    route: MemberRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
