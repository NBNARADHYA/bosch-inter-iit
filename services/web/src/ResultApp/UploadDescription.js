import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

function UploadDescription(props) {
  return <Alert
  severity="info"
  style={{
    width: "900px",
    padding: "30px",
    marginLeft: "auto",
    marginRight: "auto",
  }}
  >
  <AlertTitle>Post Evaluation</AlertTitle>
  This tool lets you test your trained model on the test dataset and
  analyze various metrics.
  <br /> Tweak your network and dataset based on the suggestions and
  features recommended by this tool, and decide what your next
  experiment can be.
  <br />
  <br /> <strong>Features :</strong>
  <ul>
    <li>Metrics Predictions</li>
    <li>Confusion Matrix</li>
    <li>Curves</li>
    <li>Heatmap</li>
    <li>Test your own image</li>
  </ul>
  Select a previously selected model or upload a new one
  </Alert>
}

export default UploadDescription;