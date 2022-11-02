import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const formForget = document.querySelector<HTMLFormElement>('form#forget');

if (formForget) {

    const auth = getAuth();
    const loading = formForget.querySelector('.loading-wrap') as HTMLDivElement;
    const message = formForget.querySelector('.message') as HTMLDivElement;

    loading.style.display = 'flex';

    const email = sessionStorage.getItem('email');

    if (email) {

        sendPasswordResetEmail(auth, email)
            .then(() => {

                loading.style.display = 'none';
                message.style.display = 'flex';

            })
            .catch((error) => console.error(error));

    }

}