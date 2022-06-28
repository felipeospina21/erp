import { UpdateClient, UpdateClientValues } from '@/redux/services';
import { UserBody } from '@/redux/services/userApi';

export interface InputField {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  required: boolean;
  options?: Array<undefined | { _id: string; name: string }>;
}

export type FormValues = UpdateClient | UpdateClientValues | UserBody;
