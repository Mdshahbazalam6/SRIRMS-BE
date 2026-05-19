import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const submitFeedbackValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = Joi.object({
            rating: Joi.number().min(1).max(5).required(),
            comment: Joi.string().required(),
        })

        const result = payload.validate(req.body);
        if (result.error) throw Error(result.error.message);


        next();
    } catch (error) {
        console.log(error)
        res.status(422).json("Error while validating the request");
    }
}