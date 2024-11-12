import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MemberServices } from "./member.service";

const createMember = catchAsync(async (req, res) => {
  const result = await MemberServices.createMemberIntoDB(req.body);
  if (!result) {
    throw new AppError(404, "Something went wrong!");
  }

  sendResponse(res, {
    success: true,
    status: 201,
    message: "Member created successfully",
    data: result,
  });
});
const getAllMembers = catchAsync(async (req, res) => {
  const result = await MemberServices.getAllMembersFromDB();
  if (!result) {
    throw new AppError(404, "Something went wrong!");
  }

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Members retrieved successfully",
    data: result,
  });
});
const getSingleMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const result = await MemberServices.getSingleMemberFromDB(memberId);
  if (!result) {
    throw new AppError(404, "Something went wrong!");
  }

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Member retrieved successfully",
    data: result,
  });
});
const updateMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const result = await MemberServices.updateMemberIntoDB(memberId, req.body);
  if (!result) {
    throw new AppError(404, "Something went wrong!");
  }

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Member updated successfully",
    data: result,
  });
});
const deleteMembers = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const result = await MemberServices.deleteMemberFromDB(memberId);
  if (!result) {
    throw new AppError(404, "Something went wrong!");
  }

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Member successfully deleted",
  });
});

export const MemberControllers = {
  createMember,
  getAllMembers,
  getSingleMember,
  updateMember,
  deleteMembers,
};
