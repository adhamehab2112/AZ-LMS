import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { courseProductTable } from "./courseProducts";

export const productStatuses = ["public", "private"] as const;
export type ProductStatus = (typeof productStatuses)[number];
export const productStatusEnum = pgEnum("product_status", productStatuses);

export const ProductsTable = pgTable("products", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    description: text().notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
    imgUrl: text().notNull(),
    priceInDollars: integer().notNull(),
    status: productStatusEnum().notNull().default("private")

})

export const productsRelationship = relations(ProductsTable, ({ many }) => ({
    courseProducts: many(courseProductTable),
}))