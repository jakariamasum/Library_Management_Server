import { PrismaClient } from "@prisma/client";
import { IMember } from "./member.interface";
import AppError from "../../errors/AppError";

const prisma = new PrismaClient();

const createMemberIntoDB = async (payload: IMember) => {
  const existingMember = await prisma.member.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingMember) {
    throw new AppError(400, "Email is already registered");
  }

  const newMember = await prisma.member.create({
    data: payload,
  });
  return newMember;
};

const getAllMembersFromDB = async () => {
  const Members = await prisma.member.findMany();
  return Members;
};

const getSingleMemberFromDB = async (id: string) => {
  const Member = await prisma.member.findUnique({
    where: {
      memberId: id,
    },
  });

  return Member;
};

const updateMemberIntoDB = async (id: string, payload: Partial<IMember>) => {
  // Throws an error if the member is not found
  await prisma.member.findUniqueOrThrow({
    where: {
      memberId: id,
    },
  });

  // If email is provided in the payload, check for uniqueness
  if (payload.email) {
    const existingMember = await prisma.member.findUnique({
      where: {
        email: payload.email,
      },
    });

    // If another member with the same email exists, throw an error
    if (existingMember && existingMember.memberId !== id) {
      throw new AppError(
        400,
        "Email is already registered with another member"
      );
    }
  }

  // update user
  const updatedMember = await prisma.member.update({
    where: {
      memberId: id,
    },
    data: {
      ...payload,
    },
  });
  return updatedMember;
};

const deleteMemberFromDB = async (id: string) => {
  return await prisma.$transaction(async (transaction) => {
    // Throws an error if the member is not found
    await transaction.member.findUniqueOrThrow({
      where: {
        memberId: id,
      },
    });

    // Delete all borrow records associated with the member
    await transaction.borrowRecord.deleteMany({
      where: { memberId: id },
    });

    // Delete the member and return the deleted member data
    const deletedMember = await transaction.member.delete({
      where: { memberId: id },
    });

    return deletedMember;
  });
};

export const MemberServices = {
  createMemberIntoDB,
  getAllMembersFromDB,
  getSingleMemberFromDB,
  updateMemberIntoDB,
  deleteMemberFromDB,
};
