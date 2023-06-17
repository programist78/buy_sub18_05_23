import { useState } from "react";
import { GET_BUSINESS_REGISTER, GET_BUSINESS_REGISTER_ADDINFO, GET_BUSINESS_REGISTER_NEED_ADDINFO } from "../../apollo/admin";
import styles from "./Admin.module.scss";
import { useQuery } from "@apollo/client";
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";

export default function AdminCom() {
  return (
    <div className={styles.back}>
    <BusineRegistration />
    </div>
  )
}

function BusineRegistration() {
  const [page1, setPage1] = useState(1);
  const [leftFilter1, setLeftFilter1] = useState("All Businesses");
  const [argument1, setArgument1] = useState("createdAt");
  const { data: data1, loading: loading1, error: error1 } = useQuery(GET_BUSINESS_REGISTER, {
    variables: { argument: argument1, page: page1.toString() },
  });

  const { data: data1_signedup, loading: loading1_signedup, error: error1_signedup } = useQuery(GET_BUSINESS_REGISTER_ADDINFO, {
    variables: { argument: argument1, page: page1.toString() },
  });

  

  const { data: data1_addinfo, loading: loading1_addinfo, error: error1_addinfo } = useQuery(GET_BUSINESS_REGISTER_NEED_ADDINFO, {
    variables: { argument: argument1, page: page1.toString() },
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(Number(timestamp));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${month}/${day} ${hours}:${minutes < 10 ? "0" + minutes : minutes}${
      hours >= 12 ? "pm" : "am"
    }`;
    return formattedDate;
  };

  const filterData = () => {
    if (leftFilter1 === "All Businesses") {
      return data1?.getBusinessRegister;
    } else if (leftFilter1 === "Signed Up") {
      return data1_signedup?.getBusinessRegisterwAddInfo;
    } else if (leftFilter1 === "Needs Additional Info") {
      return data1_addinfo?.getBusinessRegisterNeedAddInfo;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
      <div className={styles.part}>
        <p className="title">Business Registration</p>
        <div className={styles.filters}>
          <div onClick={() => setLeftFilter1("All Businesses")} className={`text ${(leftFilter1 == "All Businesses") ? styles.this : ""}`}>All Businesses</div>
          <div onClick={() => setLeftFilter1("Signed Up")} className={`text ${(leftFilter1 == "Signed Up") ? styles.this : ""}`}>Signed Up</div>
          <div onClick={() => setLeftFilter1("Needs Additional Info")} className={`text ${(leftFilter1 == "Needs Additional Info") ? styles.this : ""}`}>Needs Additional Info</div>
          <div className={styles.sortby}>
      <div className={`text ${styles.button}`} onClick={toggleMenu}>
        <p>Sort by columns</p>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {isOpen && (
        <div className={styles.menu}>
          <div onClick={() => setArgument1("createdAt")} className="text">Date</div>
          <div onClick={() => setArgument1("address")} className="text">Location</div>
          <div onClick={() => setArgument1("brandname")} className="text">Organization</div>
          <div onClick={() => setArgument1("brandDescription")} className="text">Action</div>
        </div>
      )}
    </div>
        </div>
        {loading1 ? (
           <table className={styles.custom_table}>
             <thead>
              <tr>
                <th className="text">Date</th>
                <th className="text">Organisation</th>
                <th className="text">Location</th>
                <th className="text">Action</th>
              </tr>
            </thead>
  <tbody>
 <tr>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 </tr>
 <tr>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 </tr>
 <tr>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 </tr>
 <tr>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 </tr>
 <tr>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 </tr>
 <tr>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 <td className="text">Loading...</td>
 </tr>
 </tbody>
</table>
        ) : (
          <table className={styles.custom_table}>
            <thead>
              <tr>
                <th className="text">Date</th>
                <th className="text">Organisation</th>
                <th className="text">Location</th>
                <th className="text">Action</th>
              </tr>
            </thead>
            <tbody>
              {filterData()?.map((data, index) => (
                <tr key={index}>
                  <td className="text">{formatTimestamp(data.createdAt)}</td>
                  <td className="text">{data.brandname}</td>
                  <td className="text">{data.address}</td>
                  {data.brandDescription ? (
                    <td className="text">
                      <div className={styles.green}>Successfully Signed Up</div>
                    </td>
                  ) : (
                    <td className="text">
                      <div className={styles.yellow}>Needs Additional Info</div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className={styles.foot}>
          <IoIosArrowBack className={styles.arrow} onClick={() => {
      if (page1 > 1) {
        setPage1(page1 - 1);
      }
    }}/>
          <input type="text" className="text" value={page1} onChange={(e) => setPage1(e.target.value)} />
          {/* <p className="text">Next page</p> */}
          <IoIosArrowForward className={styles.arrow} onClick={() => setPage1(page1 + 1)}/>
        </div>
      </div>
  
  );
}