import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { ProductsTable } from "./products";
import { userCoursesTable } from "./userCourceAccess";

export const userRoles = ["student","instructor"] as const ; 
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user-rule",userRoles);

export const userTable = pgTable("users",{
    id : uuid().primaryKey().defaultRandom(),
    clerkUserId : text().notNull().unique(),
    email : text().notNull(),
    name : text().notNull(),
    role : userRoleEnum().notNull().default("student"),
    imgUrl : text(),
    createdAt : timestamp({withTimezone:true}).notNull().defaultNow(),
    updatedAt : timestamp({withTimezone:true}).notNull().defaultNow().$onUpdate(()=> new Date())
})

export const userRelation = relations(ProductsTable,({many})=>({
    userCourseAccess : many(userCoursesTable)
}))