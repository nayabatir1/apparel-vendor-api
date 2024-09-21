import {
  CheckLowestPriceSchema,
  CheckStockPayloadSchema,
  Quality,
  Size,
  UpdateStockPayloadSchema,
} from "../validations/types";
import db from "../db";

export async function updateStockService(payload: UpdateStockPayloadSchema[]) {
  const pr: Array<Promise<void>> = [];

  payload.forEach((i) => {
    if (i.quantity)
      pr.push(db.updateStock(i.code, i.quality, i.size, i.quantity));

    if (i.pricePerUnit)
      pr.push(db.updatePrice(i.code, i.quality, i.size, i.pricePerUnit));
  });

  return Promise.all(pr);
}

export async function checkStockService(payload: CheckStockPayloadSchema[]) {
  return Promise.all(
    payload.map((i) => db.checkStock(i.code, i.quality, i.sizes))
  );
}

export async function checkLowestPriceService(
  payload: CheckLowestPriceSchema[]
) {
  await Promise.all(payload.map((i) => db.findStock(i.code)));

  let totalPrice = 0;

  await Promise.all(
    payload.map(async (i) => {
      return Promise.all(
        Object.keys(i.sizes).map(async (size) => {
          const sizeType = size as Size;

          const price = await db.findPrice(i.code, Quality.average, sizeType);

          if (!price.amount)
            throw new Error(
              "Price is not set for, code: ".concat(
                i.code,
                ", quality: ",
                Quality.average,
                ", size: ",
                sizeType
              )
            );

          const quantity = i.sizes[sizeType];

          totalPrice += price.amount * quantity;
        })
      );
    })
  );

  return "Lowest price to fullfill this order is ₹" + totalPrice;
}
