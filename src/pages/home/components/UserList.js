import React, { Fragment, useState, useEffect } from "react";
import { v4 } from "uuid";
import { API_USERS_DATA } from "../../../global/constants";
import UserItem from "./UserItem";

const UserList = () => {
  // call api get data
  const [data, setData] = useState([]);
  // error
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);

      try {
        fetch(API_USERS_DATA)
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          });
      } catch (error) {
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <Fragment>
      {isError && <div>Something went wrong ...</div>}

      <div className="container">
        <div className="row text-center">
          {data.map((item) => (
            <div className="col-xl-3 col-sm-6 mb-5" key={v4()}>
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <div className="proflieimage">{item.name.substr(0, 1)}</div>
                <div className="profliename">{item.name}</div>
                <div className="proflieusername">{"@" + item.username}</div>
                <div className="profliewebsite">
                  <a href={"http://" + item.website}>http://{item.website}</a>
                </div>
                <UserItem recordId={item.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default UserList;
