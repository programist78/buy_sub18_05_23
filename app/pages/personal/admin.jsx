import React from "react";
import AdminCom from "../../components/Admin";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import NoAccess from "../../components/NOAccess";
import SmallLoader from "../../components/Loaders/SmallLoader";
import UnAuth from "../../components/UnAuth";
import BigLoader from "../../components/Loaders/BigLoader";

export default function Admin() {
  const { userInfo, loading  } = useSelector((state) => state.userInfo);
  const router = useRouter()
  if (loading) {
    return <BigLoader />;
  }
  if (userInfo) {
  if (userInfo?.role == "ADMIN") {
    return <AdminCom />;
  } else {
    // router.reload()
    return <NoAccess />
  }} else {
    return <UnAuth />
  }
  // console.log(userInfo?.role)
 
}
