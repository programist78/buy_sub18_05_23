import { useRouter } from "next/router";
import PosterCabinetCom from "../../components/PersonalCabinet/PosterCabinet";
import { useSelector } from "react-redux";
import UnAuth from "../../components/UnAuth";
import NoAccess from "../../components/NOAccess";
import BusinessCabinetCom from "../../components/PersonalCabinet/BusinessCabinet";
import BigLoader from "../../components/Loaders/BigLoader";
export default function Poster() {
  const { userInfo, loading  } = useSelector((state) => state.userInfo);
  const router = useRouter()
  if (loading) {
    return <BigLoader />;
  }
  if (userInfo) {
  if (userInfo?.role == "BUSINESS") {
    return <BusinessCabinetCom />;
  } else {
    return <NoAccess />
  }} else {
    return <UnAuth />
  }
}
