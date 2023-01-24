const Signin_inputs = [
  {
    field: "email",
    placeholder: "Email",
    opt: {
      type: "emailAddress",
    },
  },
  {
    field: "password",
    placeholder: "password",
    opt: {
      type: "password",
    },
  },
];
const Register_inputs = [
  {
    field: "FirstName",
    placeholder: "FirstName",
    opt: {
      type: "name",
    },
  },
  {
    field: "LastName",
    placeholder: "LastName",
    opt: {
      type: "familyName",
    },
  },
  {
    field: "email",
    placeholder: "Email",
    opt: {
      type: "emailAddress",
    },
  },
  {
    field: "password",
    placeholder: "Password",
    opt: {
      type: "password",
    },
  },
  {
    field: "repassword",
    placeholder: "re-enter password",
    opt: {
      type: "password",
    },
  },
];

const strongPasswordOpt = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};
export { Signin_inputs, Register_inputs, strongPasswordOpt };
