import { writeFile } from "fs/promises";
import db from "./data.json";
import { Quality, Size, Sizes } from "../validations/types";

class Database {
  private data;

  constructor() {
    this.data = db;
  }

  private async syncData() {
    await writeFile("./src/db/data.json", JSON.stringify(this.data, null, 2));
  }

  async checkStock(code: string, quality: Quality, sizes: Sizes) {
    const stock = await this.findStock(code, quality);

    Object.keys(sizes).forEach((size) => {
      const sizeType = size as Size;

      if (stock.sizes[sizeType] < sizes[sizeType])
        throw new Error(
          "Insufficient Stock for".concat(
            " code: ",
            code,
            ", quality: ",
            quality,
            ", size: ",
            size
          )
        );
    });
  }

  async findStock(code: string, quality?: Quality) {
    const stock = this.data.stock.find((i) => {
      if (!quality) return i.code === code;
      return i.code === code && i.quality === quality;
    });

    if (!stock) throw new Error("Stock not available, code: " + code);

    return stock;
  }

  async upsertStock(code: string, quality: Quality) {
    const stock = this.data.stock.find(
      (i) => i.code === code && i.quality === quality
    );

    if (stock) return stock;

    const newStock = {
      code,
      quality,
      sizes: {
        S: 0,
        M: 0,
        L: 0,
      },
    };

    this.data.stock.push(newStock);

    const newPrices = Object.values(Size).map((i) => ({
      code,
      size: i,
      amount: 0,
      quality,
    }));

    this.data.price.push(...newPrices);

    return newStock;
  }

  async updateStock(
    code: string,
    quality: Quality,
    size: Size,
    quantity: number
  ) {
    const stock = await this.upsertStock(code, quality);

    stock.sizes[size] = quantity;

    return this.syncData();
  }

  async findPrice(code: string, quality: Quality, size: Size) {
    const price = this.data.price.find(
      (i) => i.code === code && i.quality === quality && i.size === size
    );

    if (!price)
      throw new Error(
        "Price not found, code: ".concat(
          code,
          ", quality: ",
          quality,
          ", size: ",
          size
        )
      );

    return price;
  }

  async updatePrice(
    code: string,
    quality: Quality,
    size: Size,
    amount: number
  ) {
    await this.findStock(code, quality);

    const stockPrice = await this.findPrice(code, quality, size);

    stockPrice.amount = amount;

    return this.syncData();
  }
}

const database = new Database();

export default database;
