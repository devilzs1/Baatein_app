import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Box } from "@mui/material";

const Image = forwardRef(
  ({ disabledEffect = false, effect = "blur", sx, ...other }, ref) => {
    const content = (
      <Box
        component="img"
        src={
          disabledEffect ? "/assets/transparent.png" : "/assets/placeholder.svg"
        }
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        {...other}
      />
    );

    return (
      <Box
        ref={ref}
        component="span"
        sx={{
          lineHeight: 1,
          display: "block",
          overflow: "hidden",
          position: "relative",
          ...sx,
        }}
      >
        {content}
      </Box>
    );
  }
);

Image.propTypes = {
  sx: PropTypes.object,
  effect: PropTypes.string,
  disabledEffect: PropTypes.bool,
};

export default Image;
