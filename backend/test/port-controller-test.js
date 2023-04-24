const chai = require("chai");
const { expect } = require("chai");
const sinon = require("sinon");
const sinonCHai = require("sinon-chai");
const mongoose = require("mongoose");
const PortfolioModel = require("../models/PortfolioModel");
const portController = require("../controllers/portController");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.use(sinonCHai);
chai.should();

describe("Port Controller", () => {
  // mongodb+srv://SANJU:sanju_123456@cluster0.f8yjf.mongodb.net/FSD2Project?retryWrites=true&w=majority
  before((done) => {
    mongoose
      .connect(
        // dont use the original databse name instead use the test database name ex. WBD_Project-test
        "mongodb+srv://vikyaths20:vikyath_123@cluster0.f8yjf.mongodb.net/WBD_Project-test?retryWrites=true&w=majority"
        ,
        // "mongodb+srv://vikyaths20:vikyath_123@cluster0.kc91knb.mongodb.net/WBD_Project-test?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      .then(() => {
        const port = new PortfolioModel({
          _id: "6443af22efea314081cbac9a",
          portfolio: "Sanju",
          platform: "icici",
          type: "Cryptocurrency",
          openingDate: "2023-03-01",
          images: [
            {
              name: "ICICI",
              address:
                "https://secure.icicidirect.com/BaseMasterPage/images/logo.jpg",
            },
          ],
          id: "641ae6e5ff00e23bbc71063c",
        });
        return port.save();
      })
      .then((result) => {
        return done();
      })
      .catch((err) => {
        console.log(err);
        return done();
      });
  });

  describe("form", () => {
    let req = {
      body: {
        portfolio: "",
        platform: "",
        type: "",
        openingDate: "",
        images: "",
        id: "",
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
          portfolio: "",
          platform: "",
          type: "",
          openingDate: "",
          images: "",
          id: "",
        },
      };
      res.status(1351);
      res.json(null);
      res.send(null);
    });

    it("should return an error of HttpError: User exists already, please login instead. with code 422", async () => {
      let error;
      const next = sinon.spy((args) => (error = args));
      sinon.stub(PortfolioModel, "findOne").returns(1);
      try {
        await portController.form(req, res, next);
      } catch (err) {
        console.error(err);
      }
      PortfolioModel.findOne.restore();
      expect(next).to.be.called;
      expect(error).have.property("message");
      expect(error.message).to.equal(
        "User exists already, please login instead."
      );
      expect(error).have.property("code");
      expect(error.code).to.equal(422);
    });

    it("should return a json with an _id, id field with id = 691ae6e5ff00e23bbc710669", async () => {
      (req.body.portfolio = "Vikyath"),
        (req.body.platform = "icici"),
        (req.body.type = "Cryptocurrency"),
        (req.body.openingDate = "2023-03-01"),
        (req.body.images = [
          {
            name: "ICICI",
            address:
              "https://secure.icicidirect.com/BaseMasterPage/images/logo.jpg",
          },
        ]),
        (req.body.id = "691ae6e5ff00e23bbc710669");

      const next = sinon.spy();
      try {
        await portController.form(req, res, next);
      } catch (error) {
        console.log(error);
      }

      expect(next).to.not.called;
      expect(res.repsonseJson).have.property("_id");
      expect(res.repsonseJson).have.property("id");
      expect(res.repsonseJson.id).to.equal("691ae6e5ff00e23bbc710669");
    });
  });

  describe("getformdets", () => {
    it("should return portfolio details", async () => {
      const req = { body: { id: 1 } };
      const res = { status: sinon.stub(), json: sinon.stub() };
      const findStub = sinon
        .stub(PortfolioModel, "find")
        .resolves([{ id: 1, name: "John Doe" }]);
  
      res.status.returnsThis();
      try{
        await portController.getformdets(req, res);
      }
      catch(error){
        console.log(error);
      }
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith([{ id: 1, name: "John Doe" }])).to.be.true;
      findStub.restore();
    });
  });

  
describe("getnum", () => {
  it("should return the correct number of portfolio items and their names", async () => {
    // Mock the request and response objects
    const req = { body: { id: 1 } };
    const res = { json: sinon.stub() };

    // Stub the PortfolioModel's find method to return mock data
    const mockData = [
      { id: 1, name: "John Doe" },
      { id: 1, name: "Jane Doe" },
    ];
    const findStub = sinon.stub(PortfolioModel, "find").resolves(mockData);

    // Call the getnum function and check the response
    try{
      await portController.getnum(req, res);
    }
    catch(error){
      console.log(error);
    }
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.calledWith({ len: 2, names: mockData })).to.be.true;

    // Restore the stub
    findStub.restore();
  });
});


describe("deletePort", () => {
  it("should delete the specified portfolio item", async () => {
    // Mock the request and response objects
    const req = { body: { id: 1, portfolio: "Stocks" } };
    const res = { json: sinon.stub() };

    // Stub the PortfolioModel's deleteOne method to return a mock response
    const mockResponse = { n: 1, deletedCount: 1, ok: 1 };
    const deleteOneStub = sinon
      .stub(PortfolioModel, "deleteOne")
      .resolves(mockResponse);

    // Call the deletePort function and check the response
    try{
      await portController.deletePort(req, res);
    }
    catch(error){
      console.log(error);
    }
    expect(deleteOneStub.calledOnce).to.be.true;
    expect(deleteOneStub.calledWith({ id: 1, portfolio: "Stocks" })).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.calledWith(mockResponse)).to.be.true;

    // Restore the stub
    deleteOneStub.restore();
  });
});

  after((done) => {
    PortfolioModel.deleteMany({})
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
