import * as z from "zod";

export const itemValidation = z.object({
    itemName: z
    .string()
    .min(1, { message: "Name cannot be empty" })
    .min(3, { message: "Name cannot be less than 3 characters" })
    .max(15),
    price: z.string().min(1, { message: "Price cannot be empty" }).max(7 , { message: "Ahh price cannot be this big" }),
  category: z.string(),
});
