const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  describe("creation fails with proper statuscode and message", () => {
    test("if username already taken", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "root",
        name: "Superuser",
        password: "salainen",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("expected `username` to be unique");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test("if username is shorter than 3 characters", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "ro",
        name: "Superuser",
        password: "salainen",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test("if password is shorter than 3 characters", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "root",
        name: "Superuser",
        password: "sa",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain(
        "password must be at least 3 characters long",
      );

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test("if username is missing", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        name: "Superuser",
        password: "saas",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("`username` is required");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });

    test("if password is missing", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "root",
        name: "Superuser",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("password is required");

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toEqual(usersAtStart);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
