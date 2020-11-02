import gsap, { Power1 } from "gsap/gsap-core";
import React, { useEffect, useRef } from "react";

import "./index.less";

const Home = () => {
  let ref = useRef(null);
  useEffect(() => {
    gsap.to(ref, {
      opacity: 1,
      scale: 1,
      duration: 1,
      delay: 1,
      ease: Power1.easeIn,
    });
  }, []);

  return (
    <div className="homeContainer container">
      <img
        ref={(el) => (ref = el)}
        src="assets/img/cnlogo.jpg"
        alt="chez nestor logo"
        className="brandLogo"
      />
    </div>
  );
};

export default Home;
