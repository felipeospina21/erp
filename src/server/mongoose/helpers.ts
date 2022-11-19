/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Category } from '@/server/models';
import { Model } from 'mongoose';
import Logger from '@/server/utils/logger';

export type ModelsTypes = Category; //| IProduct | ISale | IUser | IWithholdingTax;

export async function createNewElement(Schema: Model<ModelsTypes>, payload: ModelsTypes) {
  try {
    const newElement = await Schema.create(payload);
    return newElement;
  } catch (error) {
    Logger.error(error);
    throw error;
  }
}

export async function findAll(Schema: Model<ModelsTypes>, sortBy?: string) {
  try {
    const elementsList = await Schema.find().sort(sortBy);
    return elementsList;
  } catch (error) {
    Logger.error(error);
    throw error;
  }
}

export async function findById(Schema: Model<ModelsTypes>, id: string, field?: string) {
  try {
    const element = await Schema.findById(id).select(field);
    return element;
  } catch (error) {
    Logger.error(error);
    throw error;
  }
}

export async function findOneByField(Schema: Model<ModelsTypes>, field: { [key: string]: string }) {
  try {
    const element = await Schema.findOne(field);
    return element;
  } catch (error) {
    Logger.error(error);
    throw error;
  }
}

export async function deletetById(Schema: Model<ModelsTypes>, id: string) {
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

export async function updateById(Schema: Model<ModelsTypes>, id: string, update: object) {
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
