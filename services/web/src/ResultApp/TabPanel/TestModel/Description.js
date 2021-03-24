import React from "react"
import Typography from "@material-ui/core/Typography";

export default function Description() {
    return (
        <>
            <Typography variant="body1" paragraph>
                This feature lets user manually check result of the network on any desired image.
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom><i>Post - Evaluation</i></Typography>
            <Typography variant="body1" paragraph style={{marginTop: "10px"}}>
                User can deduce how model is performing on an input image with various set of augmentation applied.
            </Typography>
        </>
    )
}