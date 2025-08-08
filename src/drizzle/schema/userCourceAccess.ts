import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { CourseTable } from "./course";
import { relations } from "drizzle-orm";


export const userCoursesTable = pgTable("user-course-access", {
    userId: uuid().notNull().references(() => userTable.id, { onDelete: "cascade" }),
    courseId: uuid().notNull().references(() => CourseTable.id, { onDelete: "cascade" }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),

}, t => [primaryKey({ columns: [t.userId, t.courseId] })])
export const userCoursesRelationship = relations(userCoursesTable, ({ one }) => ({
    user: one(userTable, {
        fields: [userCoursesTable.userId],
        references: [userTable.id],
    }),
    course: one(CourseTable, {
        fields: [userCoursesTable.courseId],
        references: [CourseTable.id],
    }),
}))