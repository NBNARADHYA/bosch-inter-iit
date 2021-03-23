import React from "react";
import MetricsTable from "./MetricsTable";
import ClasswiseAccuracy from "./ClasswiseAccuracy";

const Metrics = ({ train_metrics, test_metrics, wrost_acc_classes }) => {
  console.log(train_metrics, test_metrics, wrost_acc_classes);
  return (
    <div>
      <MetricsTable train_metrics={train_metrics} test_metrics={test_metrics} />
      <ClasswiseAccuracy worst_acc_classes={wrost_acc_classes} />
    </div>
  );
};

export default Metrics;
