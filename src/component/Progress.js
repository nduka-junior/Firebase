import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

function Progress({ percent }) {
  return <LinearProgress variant="determinate" value={percent} />;
}

export default Progress;
