import Joi from "joi";

// validation register default / basic
const registerSchema = Joi.object({
  username: Joi.string().required().min(5),
  fullname: Joi.string().required().min(5),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

// validation register custom

// const registerSchema = Joi.object({
//     fullname: Joi.string().required().min(5),
//     email: Joi.string().email().required(),
//     password: Joi.string().required().min(8),
//     address: Joi.string().required(),
//     phone_number: Joi.string().required(),
//     gender: Joi.string().valid("Pria", "Wanita").required(),
//     role: Joi.string().valid("USER", "ADMIN").required()
// })

export default registerSchema;
