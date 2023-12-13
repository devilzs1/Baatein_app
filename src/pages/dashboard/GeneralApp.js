import React, { Suspense, lazy } from "react";

const Wait = lazy(() => import("../../components/Wait"));

const GeneralApp = () => {
  return (
    <>
      <Suspense fallback="Loading...">
        {/* <Wait /> */}
      </Suspense>
    </>
  );
};

export default GeneralApp;
