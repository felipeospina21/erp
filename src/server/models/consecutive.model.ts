import { Schema, model, models } from 'mongoose';

export interface Consecutive {
  name: string;
  count: number;
}

const consecutiveSchema = new Schema<Consecutive>(
  {
    name: { type: String, required: true },
    count: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const ConsecutiveModel =
  models.Consecutive || model<Consecutive>('Consecutive', consecutiveSchema);
