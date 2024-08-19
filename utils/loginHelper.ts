import { signIn } from "next-auth/react";

type ILoginParams = {
  email: string;
  password: string;
};

export const LoginHelper = async ({ email, password }: ILoginParams) => {
  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  return res;
};
