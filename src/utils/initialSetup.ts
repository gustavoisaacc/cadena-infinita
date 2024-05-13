import Role from "../models/roles.model";

export const createRole = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    const values = await Promise.allSettled([
      new Role({ name: "superadmin" }).save(),
      new Role({ name: "admin" }).save(),
      new Role({ name: "customer" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.log(error);
  }
};
