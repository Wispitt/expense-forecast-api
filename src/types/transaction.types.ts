import type { TransactionType } from "../../generated/prisma/enums";
import type { CategorySummary } from "./category.types";

export type TransactionFilter = {
  userId: string;
  date?: {
    gte: Date;
    lte: Date;
  };
  type?: TransactionType;
  categoryId?: string;
};

export type TransactionSummary = {
  totalExpenses: number;
  totalIncomes: number;
  balance: number;
  expensesByCategory: CategorySummary[];
}
