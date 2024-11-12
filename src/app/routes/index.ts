import { Router } from "express";
import { MemberRoutes } from "../module/member/member.route";
import { BookRoutes } from "../module/book/book.route";
import { BorrowRecordRoutes } from "../module/borrow/borrow.route";
import { ReturnRoutes } from "../module/return/return.route";

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
  {
    path: "/borrow",
    route: BorrowRecordRoutes,
  },
  {
    path: "/return",
    route: ReturnRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
