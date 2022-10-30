import NavBar from "./NavBar";
import portfolio from "./Images/portfolio.jpg";
import conclude from "./Images/Conclude.jpg";
import choices from "./Images/choices.jpg";
import goals from "./Images/goals.jpg";
import stocks from "./Images/stocks.jpg";
import "./Help.css";

const Help = () => {
  return (
    <div>
      <NavBar />
      <br />
      <h1>Help </h1>
      <div className="loginin">
        <h3>Login Instructions</h3>
        <ol>
          <li className="juii">
            If you already have an account then you can enter your credentials
            and login.
          </li>
          <li className="juii">
            If you are a new user then the first step is to register/signup into
            the website.
          </li>
          <li className="juii">
            Click on signup button viewed on home page it redirects to the new
            webpage, enter your credentials which are needed for a new SPD
            Account
          </li>
          <li className="juii">
            After entering your credentials click on signup button , now your
            new Account is created.
          </li>
          <li className="juii">
            Use these credentials for logging into your Account.{" "}
          </li>
        </ol>
      </div>
      <div className="FAQ">
        <h3>FAQ's</h3>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div id="container">
                <div className="product-details">
                  <h3>How to make a stock portfolio?</h3>
                  <br />
                  <p>
                    If you’re a beginner, here are some steps that you can
                    follow to create your very own stock portfolio. But before
                    you begin, make sure you have a demat account. Without it,
                    you won’t be able to invest in the stock market.
                  </p>
                </div>
                <div className="product-image">
                  <img src={portfolio} alt="portfolio" />
                </div>
              </div>
            </div>
            <div className="col">
              <div id="container">
                <div className="product-details">
                  <h3>Know what your goals are</h3>
                  <br />
                  <p>
                    Before you even begin creating a stock portfolio, it is
                    extremely essential to first identify your goals. This way,
                    you will be in a better position to create one that’s
                    perfect for you. Although your ultimate goal is to generate
                    returns, you would have to identify other aspects such as
                    the time frame within which you expect your goals to be
                    satisfied and the amount of money that you’re willing to
                    invest.
                  </p>
                </div>
                <div className="product-image">
                  <img src={goals} alt="goals" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div id="container">
                <div className="product-details">
                  <h3>Pick fundamentally good stocks</h3>
                  <br />{" "}
                  <p>
                    Once you’ve identified your goals, the next step is to start
                    picking the right stocks for your portfolio. When executing
                    this step, make sure to focus on fundamentally strong
                    companies. They’re the ones that are stable, less volatile,
                    and more likely to generate stellar returns over the
                    long-term. No matter how attractive a company may look from
                    the outside, if it doesn’t back it up with strong financials
                    and fundamentals, it is less likely to do well in the
                    future.
                  </p>
                </div>
                <div className="product-image">
                  <img src={stocks} alt="stocks" />
                </div>
              </div>
            </div>
            <div className="col">
              <div id="container">
                <div className="product-details">
                  <h3>Diversify your choices</h3>
                  <br />{" "}
                  <p>
                    There’s one thing that you should always keep in mind when
                    picking stocks for your portfolio - diversification. Try to
                    select stocks from multiple different sectors and
                    industries. This way, you can reduce the risk of your
                    portfolio underperforming during tough times. Concentrating
                    on just one or two sectors increases the chances of your
                    portfolio losing its value during periods of downturn.
                  </p>
                </div>
                <div className="product-image">
                  <img src={choices} alt="choices" />
                </div>
              </div>
            </div>
            {/* <div className="col">
              <div id="container">
                <div className="product-details">
                  <h3>Diversify your choices</h3>
                  <br />{" "}
                  <p>
                    There’s one thing that you should always keep in mind when
                    picking stocks for your portfolio - diversification. Try to
                    select stocks from multiple different sectors and
                    industries. This way, you can reduce the risk of your
                    portfolio underperforming during tough times. Concentrating
                    on just one or two sectors increases the chances of your
                    portfolio losing its value during periods of downturn.
                  </p>
                  <div className="product-image">
                    <img src={conclude} alt="conclude" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-3">
              <div id="container">
                <div className="product-details">
                  <h3>Conclusion</h3>
                  <br />
                  Following these three steps diligently can help you create the
                  perfect stock portfolio for yourself. If you haven't
                  registered to SPD yet then here's the link(
                  <a href="/register.html">Register Now</a>) to get registered
                  for an account.
                </div>
                <div className="product-image">
                  <img src={conclude} alt="conclude" />
                </div>
              </div>
            </div>
            <div className="col-3"></div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
