import { useRouter } from "next/router";
import CreatePostCom from "../../components/Admin/Createpost";
import { useSelector } from "react-redux";
export default function CreatePost() {
    const router = useRouter()
    const {auth} = useSelector((state) => state.auth);
    {!auth && router.push("/")}
    return (
        <>
            <CreatePostCom />
        </>
    )
}