import User from "../models/user.model";

type FindOneUtilType = {
  id: string;
};

export const findOneUtil = async ({ id }: FindOneUtilType) => {
  console.log(typeof id);
  const findUser = await User.findById(id);
  if (!findUser) {
    const error = new Error("User not found");
    throw new Error(error.message);
  }
  return findUser;
};
