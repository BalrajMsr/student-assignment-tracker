/**
 * Assignment model with validation and business logic
 */
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAssignment extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  subject: string;
  description?: string;
  dueDate: Date;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: Date;
  updatedAt: Date;
}

const AssignmentSchema = new Schema<IAssignment>(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return value >= new Date(new Date().setHours(0, 0, 0, 0));
        },
      },
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'In Progress', 'Completed', 'Overdue'],
      },
      default: 'Pending',
      index: true,
    },
    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High'],
      },
      default: 'Medium',
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        const { __v, ...assignmentObject } = ret;
        return assignmentObject;
      },
    },
  }
);

// Compound index for efficient user queries
AssignmentSchema.index({ userId: 1, status: 1 });
AssignmentSchema.index({ userId: 1, dueDate: 1 });

// // Pre-save hook to update status based on due date
// (AssignmentSchema as any).pre('save', function (this: IAssignment, next: (err?: Error | null) => void) {
//     return (new Promise<void>((resolve) => {
//       if (this.isModified('dueDate') || this.isNew) {
//         const now = new Date();
//         if (this.dueDate < now && this.status !== 'Completed') {
//           this.status = 'Overdue';
//         }
//       }
//       resolve();
//     }) as unknown as Promise<void>);  
// });

export default mongoose.model<IAssignment>('Assignment', AssignmentSchema);