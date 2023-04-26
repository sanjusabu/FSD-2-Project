const chai = require("chai");
const { expect } = require("chai");
const sinon = require("sinon");
const sinonCHai = require("sinon-chai");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const UserModel = require("../models/UserModel");
const chaiHttp = require("chai-http");
const { response } = require("express");
const userController = require("../controllers/usersController");

chai.use(chaiHttp);
chai.use(sinonCHai);
chai.should();

describe("userController", () => {
  before((done) => {
    mongoose
      .connect(
        // dont use the original databse name instead use the test database name ex. WBD_Project-test
        "mongodb+srv://vikyaths20:vikyath_123@cluster0.6qut1qv.mongodb.net/WBD_Project-test?retryWrites=true&w=majority",
        //"mongodb+srv://vikyaths20:vikyath_123@cluster0.kc91knb.mongodb.net/?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .then((result) => {
        const user = new UserModel({
          _id: "6443af22efea314081cbac9a",
          name: "abcd",
          email: "lavanyasanka525@gmail.com",
          password: "123456789",
          mobilenumber: 9857697894,
          _v: 0,
          photo: "vikyath.jpg",
          id: "641ae6e5ff00e23bbc71063c",
        });
        return user.save();
      })
      .then((result) => {
        return done();
      })
      .catch((err) => {
        console.log(err);
        return done();
      });
  });

  describe("signup", () => {
    let req = {
      body: {
        name: null,
        email: null,
        password: null,
        mobilenumber: null,
      },
    };

    const res = {
      statusCode: 1351,
      repsonseJson: null,
      responseSend: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(response) {
        this.repsonseJson = response;
        return this;
      },
      send(response) {
        this.responseSend = response;
        return this;
      },
    };

    afterEach(() => {
      req = {
        body: {
          name: null,
          email: null,
          password: null,
          mobilenumber: null,
        },
      };
      res.status(1351);
      res.json(null);
      res.send(null);
    });

    it("should create a new user and return 201 status code with user data", async () => {
      const req = {
        body: {
          name: "John Doe",
          email: "johndoe@example.com",
          password: "password",
          mobile: "1234567890",
        },
      };
      const res = {
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
        json: function (data) {
          this.responseData = data;
          return this;
        },
      };
      const next = function (error) {
        throw error;
      };
      try {
        await userController.signup(req, res, next);
      } catch (err) {
        console.log(err);
      }
      console.log(res.responseData);
      expect(res.statusCode).to.equal(201);
    });

    it("should return an error of HttpError: Signing up failed, please try again later. with code 500", async () => {
      let error;
      const next = sinon.spy((args) => (error = args));
      sinon.stub(UserModel, "findOne").returns(0);
      try {
        await userController.signup(req, res, next);
      } catch (err) {
        console.error(err);
      }
      UserModel.findOne.restore();
      expect(next).to.be.called;
      expect(error).have.property("message");
      expect(error.message).to.equal(
        "Signing up failed, please try again later."
      );
      expect(error).have.property("code");
      expect(error.code).to.equal(500);
    });

    it("should return an error of HttpError: User exists already, please login instead. with code 422", async () => {
      let error;
      const next = sinon.spy((args) => (error = args));
      sinon.stub(UserModel, "findOne").returns(1);
      try {
        await userController.signup(req, res, next);
      } catch (err) {
        console.error(err);
      }
      UserModel.findOne.restore();
      expect(next).to.be.called;
      expect(error).have.property("message");
      expect(error.message).to.equal(
        "User exists already, please login instead."
      );
      expect(error).have.property("code");
      expect(error.code).to.equal(422);
    });
  });

  describe("login", () => {
    let req = {
      body: {
        email: null,
        password: null,
      },
    };

    const res = {
      statusCode: 1351,
      repsonseJson: null,
      responseSend: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(response) {
        this.repsonseJson = response;
        return this;
      },
      send(response) {
        this.responseSend = response;
        return this;
      },
    };

    afterEach(() => {
      req = {
        body: {
          email: null,
          password: null,
        },
      };
      res.status(1351);
      res.json(null);
      res.send(null);
    });

    it("should return a token with 200 status code", async () => {
      const newUser = await UserModel.create({
        name: "test user",
        email: "testuser@example.com",
        password: "testpassword",
        mobilenumber: 1234567890,
      });

      const req = {
        body: {
          email: "testuser@example.com",
          password: "testpassword",
        },
      };
      const res = {
        statusCode: 200,
        data: null,
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(responseData) {
          this.data = responseData;
          return this;
        },
      };

      const next = sinon.spy();
      try {
        await userController.login(req, res, next);
      } catch (err) {
        console.log(err);
      }
      console.log(res.responseData);
      expect(res.statusCode).to.equal(200);
      expect(res.data).to.have.property("token");

      // delete the new user
      await UserModel.deleteOne({ _id: newUser._id });
    });

    it("should return an error of HttpError: Invalid email or password, please try again. with code 401", async () => {
      let error;
      const next = sinon.spy((args) => (error = args));
      sinon.stub(UserModel, "findOne").returns(0);
      try {
        await userController.login(req, res, next);
      } catch (err) {
        console.error(err);
      }
      UserModel.findOne.restore();
      expect(next).to.be.called;
      expect(error).have.property("message");
      expect(error.message).to.equal(
        "Invalid credentials, could not log you in."
      );
      expect(error).have.property("code");
      expect(error.code).to.equal(401);
    });
  });

  after((done) => {
    UserModel.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        return done();
      })
      .catch((err) => {
        console.log(err);
        return done();
      });
  });
});
