import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { CourseTable } from "./course";
import { ProductsTable } from "./products";
import { primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const courseProductTable = pgTable("courses-products", {
    courseId: uuid().notNull().references(() => CourseTable.id, { onDelete: "restrict" }),
    productId: uuid().notNull().references(() => ProductsTable.id, { onDelete: "cascade" }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
}, t => [primaryKey({ columns: [t.courseId, t.productId] })])

export const courseProductRelationship = relations(courseProductTable, ({ one }) => ({
    course: one(CourseTable, {
        fields: [courseProductTable.courseId],
        references: [CourseTable.id]
    }),
    product: one(ProductsTable, {
        fields: [courseProductTable.productId],
        references: [ProductsTable.id]
    }),
}))