import Typography from "@material-ui/core/Typography";
import React from "react"

export default function Description() {
  return (
      <><Typography variant = "body2" paragraph>This feature lets user manually
          check result of the network on any desired image
              .</Typography>
            <Typography variant="subtitle2" gutterBottom>Post - Evaluation</Typography>
      <Typography variant = "body2" paragraph style = {{ marginTop: "10px" }}>
          User can deduce how model is performing on an input image with various
              set of augmentation applied.</Typography>
        </>)
}