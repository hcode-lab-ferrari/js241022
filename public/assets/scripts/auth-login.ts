import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFormValues } from "./functions/getFormValues";

const formLogin = document.querySelector<HTMLFormElement>('form#login');

if (formLogin) {

    const auth = getAuth();

    formLogin.addEventListener('submit', (event) => {

        event.preventDefault();

        const formValues = getFormValues(formLogin);

        signInWithEmailAndPassword(auth, formValues.email, formValues.password)
            .then(() => {
                location.href = '/';
            })
            .catch((error) => console.error(error));

    });

}