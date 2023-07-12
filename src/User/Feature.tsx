import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";

export const Feature = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial screen size

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
       {isMobile ? null :
        <Header badgeCount={0} addToCart={function (item: any): void {
          throw new Error("Function not implemented.");
      } } />}
      <div className="container">
        <Outlet />
        {isMobile ? <BottomNav /> : null}
      </div>
    </>
  );
};
