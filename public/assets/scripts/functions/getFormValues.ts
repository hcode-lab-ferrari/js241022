import { AnyObject } from "../types/anyObject";

export const getFormValues = (form: HTMLFormElement) => {

    const formValues: AnyObject = {};

    const data = new FormData(form);

    data.forEach((value, key) => {
        formValues[key] = value;
    });

    return formValues;

};