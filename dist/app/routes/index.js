"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_route_1 = require("../module/member/member.route");
const book_route_1 = require("../module/book/book.route");
const borrow_route_1 = require("../module/borrow/borrow.route");
const return_route_1 = require("../module/return/return.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/members",
        route: member_route_1.MemberRoutes,
    },
    {
        path: "/books",
        route: book_route_1.BookRoutes,
    },
    {
        path: "/borrow",
        route: borrow_route_1.BorrowRecordRoutes,
    },
    {
        path: "/return",
        route: return_route_1.ReturnRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
