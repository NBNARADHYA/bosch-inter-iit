export function changeCamelCaseToNormal(camelCase) {
  var name = camelCase.charAt(0).toLowerCase() + camelCase.substring(1);

  name = name.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
  return name;
}

export function displayParameterName(paraName) {
  if(paraName === "p") {
    return "Probability";
  }
  paraName = paraName.replace(/_/g, ' ');
  paraName = paraName.charAt(0).toUpperCase() + paraName.substring(1);
  return paraName;
}

export function removeQueryParams(url) {
  const indexQ = url.lastIndexOf("?");
  if(indexQ===-1)
    return url;
  else
    return url.substr(0,indexQ);
}