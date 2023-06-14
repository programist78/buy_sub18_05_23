import React from "react";
import BusinessPageCom from "../../components/Business/index.jsx";
export const getServerSideProps = async ({ query }) => {
  const queryId = query.id;
  return {
    props: { queryId },
  };
};

const OnePerson = ({ queryId }) => {
  return <BusinessPageCom queryId={queryId} />;
};

export default OnePerson;
