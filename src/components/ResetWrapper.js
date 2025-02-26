import React from "react";
import useReset from "./useReset";

const ResetWrapper = ({ children }) => {
    useReset();
    return <>{children}</>;
}

export default ResetWrapper