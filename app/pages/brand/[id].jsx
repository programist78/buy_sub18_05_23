import React from 'react'
import BrandPageCom from '../../components/Brand/index.jsx'
export const getServerSideProps = async ({ query }) => {
  const queryId = query.id
  return {
    props: {queryId}
  }
}

const OnePerson = ({ queryId }) => {
  return <BrandPageCom queryId={queryId} />;
};

export default OnePerson;