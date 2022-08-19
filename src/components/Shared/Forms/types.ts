import { UpdateClient, UpdateClientValues } from '@/redux/services';
import { LoginData } from '@/redux/services/api/userApi';

export interface InputField {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  required: boolean;
  options?: Array<undefined | { _id: string; name: string }>;
}

export type FormValues = UpdateClient | UpdateClientValues | LoginData;
