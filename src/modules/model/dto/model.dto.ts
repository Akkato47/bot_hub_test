import { InsertModel } from '@/db/drizzle/schema/model/schema';
import { ChatModel } from 'openai/resources';

export class CreateModelDto implements InsertModel {
  name!: string;
  description!: string;
  token_cost!: number;
  api_link!: string;
  auth_token!: string;
  type: ChatModel;
}

export class UpdateModelDto implements Partial<InsertModel> {
  uid!: string;
  name?: string;
  description?: string;
  token_cost?: number;
  api_link?: string;
  auth_token?: string;
}
