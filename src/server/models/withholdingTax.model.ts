import { Schema, model } from 'mongoose';

export interface WithholdingTax {
  _id: string;
  concept: string;
  base: number;
  percentage: number;
}

const withholdingTaxSchema = new Schema<WithholdingTax>(
  {
    concept: { type: String, required: true },
    base: { type: Number, required: true },
    percentage: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const WithholdingTaxModel = model<WithholdingTax>('WithholdingTax', withholdingTaxSchema);
