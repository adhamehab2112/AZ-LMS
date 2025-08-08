import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { CourseTable } from "./course";
import { courseSectionsTable } from "./courseSections";
import { relations } from "drizzle-orm";
import { userLessonsCompleteTable } from "./userLessonComplete";


export const lessonStatuses = ["public", "private", "preview"] as const;
export type LessonStatus = (typeof lessonStatuses)[number];
export const lessonStatusEnum = pgEnum("lesson-status-enum", lessonStatuses);

export const LessonsTable = pgTable("lessons", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    describtion: text(),
    youtubeVideo: text().notNull(),
    order: integer().notNull(),
    status: lessonStatusEnum().notNull().default("private"),
    sectionId: uuid().notNull().references(() => courseSectionsTable.id, { onDelete: "cascade" }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),

})

export const lessonRelationShip = relations(LessonsTable, ({ one , many }) => ({
    section: one(courseSectionsTable, {
        fields: [LessonsTable.sectionId],
        references: [courseSectionsTable.id]
    }),
    userLessonsComplete : many(userLessonsCompleteTable),
}))