import request from "supertest";
import { app, server } from "../index";

afterAll(() => {
  server.close();
});

describe("Test Update Stock API", () => {
  test("It should upsert stock", async () => {
    const res = await request(app)
      .patch("/update-stock")
      .expect("Content-Type", /json/)
      .send([
        {
          code: "33",
          size: "M",
          quantity: 15,
          quality: "average",
          pricePerUnit: 400,
        },
      ]);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Stock updated Successfully");
  });

  test("It should update stock", async () => {
    const res = await request(app)
      .patch("/update-stock")
      .expect("Content-Type", /json/)
      .send([
        {
          code: "1",
          size: "S",
          quantity: 5,
          quality: "good",
          pricePerUnit: 450,
        },
        {
          code: "1",
          size: "S",
          quantity: 50,
          quality: "average",
          pricePerUnit: 400,
        },
      ]);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Stock updated Successfully");
  });
});

describe("Test Check Stock API", () => {
  test("It should check if Stock is not available", async () => {
    const res = await request(app)
      .post("/check-stock")
      .expect("Content-Type", /json/)
      .send([
        {
          code: "88",
          sizes: {
            S: 3,
            M: 1,
          },
          quality: "good",
        },
      ]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Stock not available, code: 88");
  });

  test("It should check if Stock is available", async () => {
    const res = await request(app)
      .post("/check-stock")
      .expect("Content-Type", /json/)
      .send([
        {
          code: "1",
          sizes: {
            S: 3,
            M: 1,
          },
          quality: "good",
        },
      ]);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Sufficient stock available");
  });
});

describe("Test Lowest Price API", () => {
  test("It should check if Stock is available", async () => {
    const res = await request(app)
      .post("/check-lowest-price")
      .expect("Content-Type", /json/)
      .send([
        {
          code: "55",
          sizes: {
            M: 10,
          },
        },
      ]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Stock not available, code: 55");
  });

  test("It should return price if stock is available", async () => {
    const res = await request(app)
      .post("/check-lowest-price")
      .expect("Content-Type", /json/)
      .send([
        {
          code: "1",
          sizes: {
            M: 10,
            S: 10,
            L: 10,
          },
        },
        {
          code: "2",
          sizes: {
            M: 10,
            S: 10,
            L: 10,
          },
        },
      ]);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(
      "Lowest price to fullfill this order is ₹22900"
    );
  });
});
