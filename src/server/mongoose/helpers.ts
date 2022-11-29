/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type {
  Category,
  Client,
  Product,
  Sale,
  User,
  WithholdingTax,
  Consecutive,
  Invoice,
} from '@/server/models';
import { Model } from 'mongoose';
import Logger from '@/server/utils/logger';

export type ModelTypes =
  | Category
  | Client
  | Product
  | Sale
  | User
  | Consecutive
  | Invoice
  | WithholdingTax;

export async function createNewElement(
  Schema: Model<any>,
  payload: ModelTypes
): Promise<ModelTypes> {
  try {
    return Schema.create(payload);
  } catch (error) {
    Logger.error(error);
    throw error;
  }
}

export async function findAll(Schema: Model<any>, sortBy?: string): Promise<ModelTypes[]> {
  try {
    return Schema.find().sort(sortBy);
  } catch (error) {
    Logger.error(error);
    throw error;
  }
}

export async function findById(
  Schema: Model<any>,
  id: string,
  field?: string
): Promise<ModelTypes> {
  try {
    return Schema.findById(id).select(field);
  } catch (error) {
    Logger.error(error);
    throw error;
  }
}

export async function findOneByField(
  Schema: Model<any>,
  field: { [key: string]: string }
): Promise<ModelTypes> {
  try {
    const result = await Schema.findOne(field);
    return result;
  } catch (error) {
    Logger.error(error);
    throw error;
  }
}

export async function deletetById(Schema: Model<any>, id: string): Promise<ModelTypes> {
  try {
    const deletedElement = await Schema.findByIdAndDelete(id);
    if (!deletedElement) {
      throw new Error('Element not found');
    }
    return deletedElement;
  } catch (error) {
    throw String(error);
  }
}

export async function updateById(
  Schema: Model<any>,
  id: string,
  update: object
): Promise<ModelTypes> {
  try {
    const updatedElement = await Schema.findByIdAndUpdate(id, update);
    if (!updatedElement) {
      throw new Error('Element not found');
    }
    return updatedElement;
  } catch (error) {
    throw String(error);
  }
}
