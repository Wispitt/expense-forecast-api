import { ObjectId } from "mongodb";
import { z } from "zod";
import { TransactionType } from "../../generated/prisma/enums";

const isValidObjecy = (id: string): boolean => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
  description: z.string().min(1, "Description is mandatory"),
  amount: z.number().positive("The value must be positive"),
  date: z.coerce.date({
    error: () => ({ message: "Date ivalid" }),
  }),
  categoryId: z.string().refine(isValidObjecy, {
    error: () => ({ message: "Category ivalid" }),
  }),
  type: z.enum([TransactionType.expense, TransactionType.income], {
    error: () => ({ message: "Type ivalid" }),
  }),
});
