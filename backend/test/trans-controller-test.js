const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const mongoose = require("mongoose");
const assert = require("assert");
const chaiAsPromised = require("chai-as-promised");
const TransactionsModel = require("../models/TransactionsModel");
const HttpError = require("../models/http-error");
const transController = require("../controllers/transController");

chai.use(chaiAsPromised);
chai.use(sinonChai);

const { expect } = chai;

describe("Trans Controller ", () => {
  before((done) => {
    mongoose
      .connect("mongodb+srv://vikyaths20:vikyath_123@cluster0.6qut1qv.mongodb.net/WBD_Project-test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => done())
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  describe("postdata", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
      req = {
        body: {
          portfolio: "Test Portfolio",
          ticker: "TEST",
          date: "2023-04-22",
          quantity: 10,
          price: 20,
          action: "BUY",
          total: 200,
          id: "12345",
        },
      };

      res = {
        json: sinon.spy(),
      };

      next = sinon.spy();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should save the transaction and return the transaction model", async () => {
      sinon
        .stub(TransactionsModel.prototype, "save")
        .returns(Promise.resolve());

      await transController.postdata(req, res, next);

      expect(res.json).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWith(
        sinon.match.instanceOf(TransactionsModel)
      );
      expect(next).to.not.have.been.called;
    });

    it("should call the next middleware with an error when there is a database error", async () => {
      const error = new Error("Database error");
      sinon
        .stub(TransactionsModel.prototype, "save")
        .returns(Promise.reject(error));

      await transController.postdata(req, res, next);

      expect(next).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith(sinon.match.instanceOf(HttpError));
      expect(next.args[0][0].message).to.equal("Transactions saving failed");
      expect(next.args[0][0].code).to.equal(500);
      expect(res.json).to.not.have.been.called;
    });
  });

  describe("getTrans", () => {
    it("should retrieve transaction data and return it as JSON", async () => {
      const req = {
        body: {
          id: "12345",
        },
      };
      const expectedResponse = [
        {
          id: "12345",
          type: "deposit",
          amount: 1000,
        },
        {
          id: "12345",
          type: "withdrawal",
          amount: 500,
        },
      ];
      const findStub = sinon
        .stub(TransactionsModel, "find")
        .returns(expectedResponse);
      const res = {
        json: sinon.spy(),
      };

      await transController.getTrans(req, res);

      findStub.restore();
      expect(findStub.calledWith({ id: "12345" })).to.be.true;
      expect(res.json.calledWith(expectedResponse)).to.be.true;
    });
  });

  describe("getnum", () => {
    it("should return the correct number of transaction items and their names", async () => {
      // Mock the request and response objects
      const req = { body: { id: 1 } };
      const res = { json: sinon.stub() };

      // Stub the PortfolioModel's find method to return mock data
      const mockData = [
        { id: 1, name: "John Doe" },
        { id: 1, name: "Jane Doe" },
      ];
      const findStub = sinon.stub(TransactionsModel, "find").resolves(mockData);

      // Call the getnum function and check the response
      await transController.getnum(req, res);

      // Restore the stub
      findStub.restore();
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.calledWith({ len: 2, names: mockData })).to.be.true;
    });
  });

  describe("deleteTrans", () => {
    it("should delete transactions from the database", async () => {
      const req = {
        body: {
          id: "123",
          deleteticker: "AAPL",
        },
      };
      const deleteManyStub = sinon
        .stub(TransactionsModel, "deleteMany")
        .resolves({ n: 1, ok: 1, deletedCount: 1 });
      const jsonSpy = sinon.spy();

      await transController.deleteTrans(req, { json: jsonSpy });

      deleteManyStub.restore();
      expect(
        deleteManyStub.calledOnceWithExactly({ id: "123", ticker: "AAPL" })
      ).to.be.true;
      expect(jsonSpy.calledOnceWithExactly({ n: 1, ok: 1, deletedCount: 1 })).to
        .be.true;
    });
  });

  describe("csvdata", () => {
    let req = {
      body: {
        data: null,
        portfolio: null,
        id: null,
      },
    };

    const res = {
      responseJson: null,
      json(response) {
        this.responseJson = response;
        return this;
      },
    };

    afterEach(() => {
      req = {
        body: {
          data: null,
          portfolio: null,
          id: null,
        },
      };
      res.json(null);
    });
  });
  after((done) => {
    mongoose
      .disconnect()
      .then(() => done())
      .catch((err) => {
        console.log(err);
        done();
      });
  });
});
