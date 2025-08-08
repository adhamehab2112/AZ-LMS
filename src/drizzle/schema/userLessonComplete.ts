import { pgTable, uuid } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { LessonsTable } from "./lesson";
import { relations } from "drizzle-orm";

export const userLessonsCompleteTable = pgTable("user-completed-lessons",{
    userId : uuid().notNull().references(() => userTable.id , {onDelete : "cascade"}),
    lessonId : uuid().notNull().references(() => LessonsTable.id , {onDelete : "cascade"}),
});

export const userLessonCompleteRelation = relations(userLessonsCompleteTable,({one})=>({
    user : one(userTable,{
        fields : [userLessonsCompleteTable.userId],
        references : [userTable.id]
    }),
    lesson : one(LessonsTable,{
        fields : [userLessonsCompleteTable.userId],
        references : [LessonsTable.id]
    }),
}))
