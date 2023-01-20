import React from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdsWidget = () => {
  // Grabe some colors
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primaryMain = palette.primary.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={primaryMain} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        className="w-full h-auto rounded-xl my-3 mx-0"
        alt="adervtisement"
        src="http://localhost:5000/assets/ads.jpg"
      />
      <FlexBetween>
        <Typography color={primaryMain}>Keep Learning</Typography>
        <Typography color={medium}>learning.org</Typography>
      </FlexBetween>
      <Typography color={main} margin="0.5rem 0">
        Live as if you were to die in next second. Learn as if you were to live
        forever.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdsWidget;
