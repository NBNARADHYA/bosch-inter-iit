import React from "react";
import Tour from "reactour";

const steps = [
  {
    selector: "#step1",
    content: "First, upload images of a particular class, here.",
  },
  {
    selector: "#step2",
    content: "Select any transformation here.",
  },
  {
    selector: "#step3",
    content: "Try changing some of the parameters of the transformation.",
  },
  {
    selector: "#step4",
    content:
      "The real-time transformed image for one of the uploaded images would be visible here. You can also download this preview here.",
  },
  {
    selector: "#step5",
    content:
      "Apply this transformation to save it and apply more transformations.",
  },
  {
    selector: "#step6",
    content:
      "All the applied transformations, along with their previews in sequence can be viewed here. You can also remove some transformations or restore a previous stage.",
  },
  {
    selector: "#step7",
    content:
      "Select this option to perform multiple iterations of the applied transformations and preview all the generated images. You can also download these images in a .zip folder or directly add to the dataset present on server.",
  },
  {
    selector: "#step8",
    content: "Use this option to remove all the applied transformations.",
  },
  {
    selector: "#step9",
    content: "View more features like balance dataset and split dataset here.",
  },
];

const DatasetUITour = (props) => {
  const { isOpen, onRequestClose } = props;
  return <Tour steps={steps} isOpen={isOpen} onRequestClose={onRequestClose} />;
};

export default DatasetUITour;
