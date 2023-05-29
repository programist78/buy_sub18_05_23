// import "../styles/CheckoutForm.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import { Col, Row } from "antd";

const CheckoutPage = () => {
  const stripePromise = loadStripe(
    "pk_live_51Mh981BD1PAMw3US3xRCrPnRlmpC1pJKAwNPUpcyTvW4EV79xkfMZHkfCPuy6GX2Y1ddKeew35ebYp3sgS0J32s200QGQy2KKa"
  );
  return (
    <div style={{height: "1000px", paddingTop: "200px"}}>
    <Row>
      <Col offset={6} span={12} className="stripe-form-container">
        <div className="stripe-form">
          <Row gutter={12}>
            <Col span={14}>
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </Col>
            <Col span={10}>
              <OrderSummary />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
    </div>
  );
};

export default CheckoutPage;