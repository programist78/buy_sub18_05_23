import { useSelector } from "react-redux";
import BusinessCabinetCom from "../../components/PersonalCabinet/BusinessCabinet";
import { useRouter } from "next/router";
import NoAccess from "../../components/NOAccess";
import UnAuth from "../../components/UnAuth";
import BigLoader from "../../components/Loaders/BigLoader";
export default function PersonalCabinetBusiness() {
  const { userInfo, loading  } = useSelector((state) => state.userInfo);
  const router = useRouter()
  if (loading) {
    return <BigLoader />;
  }
  if (userInfo) {
  if (userInfo?.role == "BUSINESS") {
    return <BusinessCabinetCom />;
  } else {
    router.reload()
    return <NoAccess />
  }} else {
    return <UnAuth />
  }
}
