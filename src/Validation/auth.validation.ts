import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { REGEX } from '../constants/Regex';
import { ROLES } from '../constants';

export const registerUserValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = Joi.object({
            name: Joi.string().pattern(REGEX.name).required(),
            email: Joi.string().pattern(REGEX.email).required(),
            password: Joi.string().pattern(REGEX.password),
        })

        const result = payload.validate(req.body);
        if (result.error) throw Error(result.error.message);


        next();
    } catch (error) {
        console.log(error)
        res.status(422).json("Error while validating the request");
    }
}

export const loginUserValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = Joi.object({
            email: Joi.string().pattern(REGEX.email).required(),
            password: Joi.string().pattern(REGEX.password),
            role: Joi.string().valid(...Object.values(ROLES))
        })

        const result = payload.validate(req.body);
        if (result.error) throw Error(result.error.message);


        next();
    } catch (error) {
        console.log(error)
        res.status(422).json("Error while validating the request");
    }
}