import { getModelForClass, prop } from '@typegoose/typegoose';

export class ExpenseClass {
  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public amount!: number;

  @prop({ required: true, default: () => new Date() })
  public createdAt!: Date;
}

export const ExpenseModel = getModelForClass(ExpenseClass);

