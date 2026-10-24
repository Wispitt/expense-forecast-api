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

export const getTransactionSchema = z.object({
  month: z.string().optional(),
  year: z.string().optional(),
  type: z
    .enum([TransactionType.expense, TransactionType.income], {
      error: () => ({ message: "Type ivalid" }),
    })
    .optional(),
  categoryId: z
    .string()
    .refine(isValidObjecy, {
      error: () => ({ message: "Category ivalid" }),
    })
    .optional(),
});

export const getTransactionSummarySchema = z.object({
  month: z.string({ message: "The month is mandatory" }),
  year: z.string({ message: "The year is mandatory" }),
});

export const getTransactionHistoricalSchema = z.object({
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2000).max(2100),
  months: z.coerce.number().min(1).max(12).optional(),
});

export const deleteTransactionSchema = z.object({
  id: z.string().refine(isValidObjecy, {
    message: "Id invalid",
  }),
});

export type GetTransactionQuery = z.infer<typeof getTransactionSchema>;
export type CreateCategoryBody = z.infer<typeof createTransactionSchema>;
export type GetTransactionSummaryQuery = z.infer<typeof getTransactionSummarySchema>;
export type DeleteTransactionParams = z.infer<typeof deleteTransactionSchema>;
export type GetTransactionHistoricalQuery = z.infer<typeof getTransactionHistoricalSchema>;
