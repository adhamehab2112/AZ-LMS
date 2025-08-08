import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { courseProductTable } from "./courseProducts";
import { userCoursesTable } from "./userCourceAccess";

export const CourseTable = pgTable("courses",{
    id : uuid().primaryKey().defaultRandom(),
    name : text().notNull(),
    description : text().notNull(),
    createdAt : timestamp({withTimezone:true}).notNull().defaultNow(),
    updatedAt : timestamp({withTimezone:true}).notNull().defaultNow().$onUpdate(()=> new Date()),
})

export const CourseRelationShips = relations(CourseTable,({many})=>({
    courseProducts : many(courseProductTable),   
    userCourseAccess : many(userCoursesTable)
}) )