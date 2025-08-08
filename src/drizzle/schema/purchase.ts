import { integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { ProductsTable } from "./products";
import { relations } from "drizzle-orm";

export const PurchaseTable = pgTable('purchase', {
    id: uuid().primaryKey().defaultRandom(),
    pricePaidInCents: integer().notNull(),
    productDetails: jsonb().notNull().$type<{ name: string; description: string; imgUrl: string }>(),
    userId: uuid().notNull().references(() => userTable.id, { onDelete: "restrict" }),
    productId: uuid().notNull().references(() => ProductsTable.id, { onDelete: "restrict" }),
    stripSessionId: text().notNull().unique(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
    refundAt: timestamp({ withTimezone: true }),
})

export const purchaseRelations = relations(PurchaseTable,({one})=> ({
    user : one(userTable,{
        fields : [PurchaseTable.userId],
        references : [userTable.id]
    }),
    product : one(ProductsTable,{
        fields : [PurchaseTable.productId],
        references : [ProductsTable.id]
    }),
}))