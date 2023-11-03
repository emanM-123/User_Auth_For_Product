export const adminPasswordRule = (value) => {
  const totalCheck = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  if (!totalCheck.test(value)) {
    return "Password must be combination of minimum 1 lowercase letter,1 special character,1 number and min length 8 characters & max length 16";
  }
  return true;
};
