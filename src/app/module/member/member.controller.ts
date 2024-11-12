import { Request, Response } from "express";

const getMember = async (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Test complete",
  });
};

export const MemberControllers = {
  getMember,
};
