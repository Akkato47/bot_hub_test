import { InsertModel } from '@/db/drizzle/schema/model/schema';

export class CreateModelDto implements InsertModel {
  name!: string;
  description!: string;
  token_cost!: number;
  api_link!: string;
  auth_token!: string;
}

export class UpdateModelDto implements Partial<InsertModel> {
  uid!: string;
  name?: string;
  description?: string;
  token_cost?: number;
  api_link?: string;
  auth_token?: string;
}
