export enum Quality {
  good = "good",
  average = "average",
}

export enum Size {
  S = "S",
  M = "M",
  L = "L",
}

export interface UpdateStockPayloadSchema {
  code: string;
  quality: Quality;
  size: Size;
  pricePerUnit?: number;
  quantity: number;
}

export type Sizes = {
  [key in Size]: number;
};
export interface CheckStockPayloadSchema {
  code: string;
  sizes: Sizes;
  quality: Quality;
}

export interface CheckLowestPriceSchema {
  code: string;
  sizes: Sizes;
}
