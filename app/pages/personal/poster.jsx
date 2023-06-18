import { useRouter } from "next/router";
import PosterCabinetCom from "../../components/PersonalCabinet/PosterCabinet";
import { useSelector } from "react-redux";
import UnAuth from "../../components/UnAuth";
import NoAccess from "../../components/NOAccess";
import BigLoader from "../../components/Loaders/BigLoader";
import CustomHead from "../../components/CustomHead";
export default function Poster() {
  const pageTitle = "Postfordollars - Achieve more with us!";
  const pageDescription =
    "Welcome to PostForDollars - the ultimate platform that connects posters and businesses for mutually beneficial collaborations! Whether you're a business looking to promote your products or services or a poster seeking opportunities to earn rewards, PostForDollars is here to help.";

  const { userInfo, loading  } = useSelector((state) => state.userInfo);
  const router = useRouter()
  if (loading) {
    return <BigLoader />;
  }
  if (userInfo) {
  if (userInfo?.role == "USER") {
    return (
    <>
    <CustomHead pageTitle={pageTitle} pageDescription={pageDescription} />
    <PosterCabinetCom />
    </>)
  } else {
    router.reload()
    return <NoAccess />
  }} else {
    return <UnAuth />
  }
}
