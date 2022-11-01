import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { AnyObject } from "./types/anyObject";

const formRegister = document.querySelector('form#register') as HTMLFormElement;

if (formRegister) {

    const auth = getAuth();

    formRegister.addEventListener('submit', (event) => {

        event.preventDefault();

        const formValues: AnyObject = {};

        const data = new FormData(formRegister);

        data.forEach((value, key) => {
            formValues[key] = value;
        });

        if (formValues.password !== formValues.password_confirm) {
            console.error('As senhas devem ser iguais');
            return;
        }

        createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
            .then((userCredential) => {

                updateProfile(userCredential.user, {
                    displayName: formValues.name,
                })
                    .then(() => location.href = "/")
                    .catch((error) => {
                        console.error(error);
                    });

            })
            .catch((error) => {
                console.error(error);
            });

    });

}