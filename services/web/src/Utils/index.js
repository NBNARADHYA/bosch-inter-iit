export function changeCamelCaseToNormal(camelCase) {
  var name = camelCase.charAt(0).toLowerCase() + camelCase.substring(1);

  name = name.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
  return name;
}

export function displayParameterName(paraName) {
  if (paraName === "p") {
    return "Probability";
  }
  paraName = paraName.replace(/_/g, " ");
  paraName = paraName.charAt(0).toUpperCase() + paraName.substring(1);
  return paraName;
}

export function removeQueryParams(url) {
  const indexQ = url.lastIndexOf("?");
  if (indexQ === -1) return url;
  else return url.substr(0, indexQ);
}

export function generateTransformationRequestBody(
  transformation,
  history,
  params,
  img,
  originalDimensions,
  historyDimensions,
  preview
) {
  const data = new FormData();
  if (
    transformation.parameters &&
    JSON.parse(transformation.parameters).filter((para) => para.name === "p")
      .length &&
    !params["p"]
  ) {
    params["p"] = 1.0;
  }
  data.append("transformation", transformation.id);
  if (history.length === 0) {
    data.append("image", img.img[0]);
    if (
      transformation.parameters &&
      JSON.parse(transformation.parameters).filter(
        (para) => para.name === "width"
      ).length &&
      !params["width"]
    ) {
      params["width"] = originalDimensions.width;
      params["height"] = originalDimensions.height;
    }
    if (
      transformation.parameters &&
      JSON.parse(transformation.parameters).filter(
        (para) => para.name === "x_max"
      ).length &&
      !params["x_max"]
    ) {
      params["x_max"] = originalDimensions.width;
      params["y_max"] = originalDimensions.height;
    }
  } else {
    data.append(
      "img_url",
      removeQueryParams(history[history.length - 1].image)
    );
    data.append("transformation_step", history.length - 1);
    if (
      transformation.parameters &&
      JSON.parse(transformation.parameters).filter(
        (para) => para.name === "width"
      ).length &&
      !params["width"]
    ) {
      params["width"] = historyDimensions.width;
      params["height"] = historyDimensions.height;
    }
    if (
      transformation.parameters &&
      JSON.parse(transformation.parameters).filter(
        (para) => para.name === "x_max"
      ).length &&
      !params["x_max"]
    ) {
      params["x_max"] = historyDimensions.width;
      params["y_max"] = historyDimensions.height;
    }
  }
  data.append("parameters", JSON.stringify(JSON.stringify(params)));
  return data;
}

export function downloadCSV(url, filename) {
  const requestOptions = {
    method: "GET",
  };
  fetch(url, requestOptions)
    .then((res) => res.text())
    .then((res) => {
      const element = document.createElement("a");
      const file = new Blob([res], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = filename;
      document.body.appendChild(element);
      element.click();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function getClassString(num) {
  let key = `${num}`;
  while (key.length < 5) key = `0${key}`;
  return key;
}

export function downloadImage(url) {
  fetch(url, { method: "GET" })
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(
          new Blob([buffer], { type: "image/*" })
        );
        const link = document.createElement("a");
        link.href = url;
        document.body.appendChild(link);
        link.click();
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
