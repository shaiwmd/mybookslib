export function validateTitle(value) {
  value = value.trim();
  let reg = /^[A-Z][a-zA-Z_.: ]{3,80}$/;
  let check = reg.test(value);
  return check;
}
export function validateAuthor(value) {
  value = value.trim();
  let reg = /^[a-zA-Z_.: ]{3,60}$/;
  let check = reg.test(value);
  return check;
}

export function validateDate(value) {
  value = value.trim();
  let reg = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
  let check = reg.test(value);
  return check;
}
