import {Entity, model, property} from '@loopback/repository';

@model()
export class Coupons extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    default: 0,
  })
  value?: number;

  @property({
    type: 'string',
  })
  message?: string;


  constructor(data?: Partial<Coupons>) {
    super(data);
  }
}

export interface CouponsRelations {
  // describe navigational properties here
}

export type CouponsWithRelations = Coupons & CouponsRelations;
