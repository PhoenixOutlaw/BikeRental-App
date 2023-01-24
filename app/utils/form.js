export default function form({ field, value, setvalues }) {
  let obj = {};
  obj[field] = value;
  setvalues((values) => {
    obj = { ...values, ...obj };
    if (value.length === 0) delete obj[field]; // if value 0 delete from obj
    return obj;
  });
}
