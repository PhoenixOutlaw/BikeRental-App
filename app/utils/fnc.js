
import _ from "lodash";
import Notify from "./notification";

export function compare(a, b) {
  if (a.rating > b.rating) {
    return -1;
  }
  if (a.rating < b.rating) {
    return 1;
  }
  return 0;
}

export function noupdates(obj1, ref) {
  console.log(obj1, ref.getFieldValue);
  _.isEqual(obj1, ref.getFieldValue())
    ? Notify.error("No updates in field")
    : ref.submit();
}

export const trimspace = (value, prevVal, prevVals) => value.trim();
