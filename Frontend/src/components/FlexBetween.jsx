import { Box } from "@mui/material";
import { styled } from "@mui/system";

// MUI styled component for Some Styling --> Box used as Component property
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
