// Grabbed from https://stackoverflow.com/a/35413963, changed slightly for formatting
export const isValidDate = (dateString: string) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) {
    return false;  // Invalid format
  }
  const d = new Date(dateString);
  const dNum = d.getTime();
  if(!dNum && dNum !== 0) {
    return false; // NaN value, Invalid date
  }
  return d.toISOString().slice(0,10) === dateString;
};