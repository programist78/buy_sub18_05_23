import { useState } from "react";

const YES = <>✅&nbsp;&nbsp;Yes.</>;
const NO = <>❌&nbsp;&nbsp;No.</>;

const ConnectStripeButton = ({ data }) => {
  return (
    <>
        <button
          type="button"
          className="b_button"
          onClick={() => {
            if (window) {
              const url = `https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=${
                process.env.NEXT_PUBLIC_STRIPE_OAUTH_CLIENT_ID
              }&scope=read_write&state=${Math.random() * 100}&redirect_uri=${
                process.env.NEXT_PUBLIC_BASE_URL
              }`;

              window.document.location.href = url;
            }
          }}
        >
          {data?.data?.account?.id ? (
            <span>Connected: {data?.data?.account?.display_name}</span>
          ) : (
            <span>Connect with Stripe</span>
          )}
        </button>

        {data?.req?.code?.startsWith('ac_') && (
          <>
            <br />
            <br />
            <hr />
            <br />
          </>
        )}

        {data?.data?.account?.id && (
          <>
            <div className="accountAnalysis">
              <div>
                <h3>Payouts Enabled?</h3>
                <h2>{data?.data?.account?.payouts_enabled ? YES : NO}</h2>
              </div>
              <div>
                <h3>Charges Enabled?</h3>
                <h2>{data?.data?.account?.charges_enabled ? YES : NO}</h2>
              </div>
              <div>
                <h3>Details Submitted?</h3>
                <h2>{data?.data?.account?.details_submitted ? YES : NO}</h2>
              </div>
            </div>

            <br />
            <hr />
            <br />

            <div className="allowUnlink">
              <h3>Allow Unlink?</h3>
              <h2>{data?.data?.shouldAllowUnlink ? YES : NO}</h2>
            </div>

            <br />
            <hr />
            <br />
          </>
        )}

        {/* {data?.req?.code?.startsWith('ac_') && (
          <>
            <div className="fetchedData">
              <h3>Fetched data</h3>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>

            <>
              <br />
            </>
          </>
        )} */}
    </>
  );
};

export default ConnectStripeButton;

