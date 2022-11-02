import { confirmPasswordReset, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFormValues } from "./functions/getFormValues";
import { queryStringToJSON } from "./functions/queryStringToJSON";

const formReset = document.querySelector<HTMLFormElement>('form#reset');

if (formReset) {

    const auth = getAuth();

    formReset.addEventListener('submit', (event) => {

        event.preventDefault();

        const { oobCode } = queryStringToJSON();
        const { password } = getFormValues(formReset);

        confirmPasswordReset(auth, oobCode, password)
            .then(() => {

                const email = sessionStorage.getItem('email');

                if (email) {

                    signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        location.href = '/';
                    })
                    .catch(() => {
                        location.href = '/auth.html#login';
                    });

                } else {
                    location.href = '/auth.html#login';
                }

            })
            .catch((error) => console.error(error));

    });

}