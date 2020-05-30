export default function(data, prop, type) {
  let trueType = typeof data[prop];
  if (type !== trueType) {
    throw new TypeError(
      `the option '${prop}' should be type of ${type} but received ${trueType}`
    );
  } else {
    return true;
  }
}
