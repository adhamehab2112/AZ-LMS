import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { CourseTable } from "./course";
import { productStatusEnum } from "./products";
import { relations } from "drizzle-orm";


export const courseSectionsTable = pgTable("course-sections",{
    id : uuid().primaryKey().defaultRandom(),
    name : text().notNull(),
    status : productStatusEnum().notNull().default("private"),
    order : integer().notNull(),
    courseId : uuid().notNull().references(()=> CourseTable.id , {onDelete : "restrict"}),
    createdAt : timestamp({withTimezone:true}).notNull().defaultNow(),
    updatedAt : timestamp({withTimezone:true}).notNull().defaultNow().$onUpdate(()=> new Date()),
}) 

export const courseSectionRelationship = relations(courseSectionsTable,({one})=>({
    course : one(CourseTable,{
        fields : [courseSectionsTable.courseId],
        references : [CourseTable.id]
    })
}))