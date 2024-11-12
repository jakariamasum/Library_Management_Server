import { PrismaClient } from "@prisma/client";
import { IMember } from "./member.interface";

const prisma = new PrismaClient();

const createMemberIntoDB = async (payload: IMember) => {
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
  const deletedMember = await prisma.member.delete({
    where: {
      memberId: id,
    },
  });
  return deletedMember;
};

export const MemberServices = {
  createMemberIntoDB,
  getAllMembersFromDB,
  getSingleMemberFromDB,
  updateMemberIntoDB,
  deleteMemberFromDB,
};
