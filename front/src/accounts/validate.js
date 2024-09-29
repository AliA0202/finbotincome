const validator = require("validator");

const validateSignUpForm = payload => {
  let message = "";
  let isFormValid = true;

  if (
    !payload ||
    typeof payload.username !== "string" ||
    payload.username.trim().length === 0
  ) {
    isFormValid = false;
    message = "فیلد نام کاربری نباید خالی باشد";
  }

  //if (
  //  !payload ||
  //  typeof payload.phone !== "string" ||
  //  !isValidPhoneNumber(payload.phone)
  //) {
  //  isFormValid = false;
  //  message= "Please provide a valid Iranian phone number.";
  //}  

  //if (
  //  !payload ||
  //  typeof payload.email !== "string" ||
  //  !validator.isEmail(payload.email)
  //) {
  //  isFormValid = false;
  //  message = "Please provide a correct email address.";
  //}

  if (
    !payload ||
    typeof payload.password !== "string" ||
    payload.password.trim().length < 8
  ) {
    isFormValid = false;
    message = "گذرواژه باید بیشتر از 8 حرف باشد";
  }

  if (!payload || payload.pwconfirm !== payload.password) {
    isFormValid = false;
    message = "تکرار گذرواژه با آن همخوانی ندارد";
  }

  return {
    success: isFormValid,
    message
  };
};

const validateLoginForm = payload => {
  let message = "";
  let isFormValid = true;

  if (
    !payload ||
    typeof payload.username !== "string" ||
    payload.username.trim().length === 0
  ) {
    isFormValid = false;
    message += "لطفا نام کاربری را وارد کنید";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    payload.password.trim().length === 0
  ) {
    isFormValid = false;
    message += "لطفا رمز عبور را وارد کنید";
  }



  return {
    success: isFormValid,
    message,
  };
};

const ValidateProfile = payload => {
  let message = "";
  let isFormValid = true;

  if (
    !payload ||
    typeof payload.email !== "string" ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    message = "یک ایمیل معتبر وارد کنید";
  }

  if (
    !payload ||
    typeof payload.phone !== "string" ||
    !isValidPhoneNumber(payload.phone)
  ) {
    isFormValid = false;
    message= "یک شماره معتبر وارد کنید";
  }  



  return {
    success: isFormValid,
    message,
  };
};

function isValidPhoneNumber(phone) {
    const phoneRegex = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|9[0-4]|98)\d{7}$/;
    return phoneRegex.test(phone);
  }  

module.exports = {
  validateLoginForm: validateLoginForm,
  validateSignUpForm: validateSignUpForm,
  ValidateProfile: ValidateProfile
};
