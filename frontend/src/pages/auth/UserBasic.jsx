import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../../components/common/ResponsiveAppBar";

const UserBasic = () => {
    // !Check if the user is logged in...
  return (
    <>
      <ResponsiveAppBar
        pages={["Home", "Analysis", "TV", "News", "Broadcast"]}
        link={["/", "/analysis", "/tv", "/news", "/broadcast"]}
        // color="primary"
      />
      <Outlet />
    </>
  );
};

export default UserBasic;
