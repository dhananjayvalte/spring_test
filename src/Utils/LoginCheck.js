export const checkIsAdmin = (email, password) => {
  if (email == "admin@gmail.com" && password == "Admin@123") {
    return true;
  } else {
    return false;
  }
};
