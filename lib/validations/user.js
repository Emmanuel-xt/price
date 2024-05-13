import * as z from "zod";

export const userValidation = z.object({
  fullname: z
    .string()
    .min(1, { message: "fullname cannot be empty" })
    .min(6, { message: "please enter your full name" }),
  username: z
    .string()
    .min(1, { message: "username cannot be empty" })
    .max(15, { message: "Ahh username cannot be this big" }),
  department: z.string(),
  level: z.string({
    required_error: "Please select an email to display.",
  }),
});
