import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

const page = document.querySelector('#change-photo') as HTMLElement;

if (page) {

    const storage = getStorage();
    const auth = getAuth();

    const inputFile = page.querySelector('#file') as HTMLInputElement;
    const chooseButton = page.querySelector('.choose-photo') as HTMLButtonElement;
    const imgPreview = page.querySelector('#photo-preview') as HTMLImageElement;

    const form = page.querySelector('form') as HTMLFormElement;

    onAuthStateChanged(auth, () => {

        if (auth.currentUser) {

            imgPreview.src = auth.currentUser.photoURL ?? 'assets/images/user.png';

        } else {
            location.href = '/';
        }

    });

    chooseButton.addEventListener('click', () => {
        inputFile.click();
    });

    inputFile.addEventListener('change', () => {

        if (inputFile.files?.length) {

            const file = inputFile.files[0];

            const reader = new FileReader();

            reader.onload = () => {

                if (reader.result) {

                    imgPreview.src = String(reader.result);

                }

            }

            reader.readAsDataURL(file);

        }

    });

    form.addEventListener('submit', (event) => {

        event.preventDefault();

        if (inputFile.files?.length) {

            const file = inputFile.files[0];

            const extension = file.type.split('/')[1];

            const fileReference = ref(storage, `photos/${uuid()}.${extension}`);

            uploadBytes(fileReference, file)
                .then(() => {

                    getDownloadURL(fileReference)
                        .then((url) => {

                            if (auth.currentUser) {

                                updateProfile(auth.currentUser, {
                                    photoURL: url,
                                });

                                const photoElement = document.querySelector('#header div.menu div.footer > div img') as HTMLImageElement;

                                photoElement.src = url;

                            }

                        })
                        .catch((error) => console.error(error))

                })
                .catch((error) => console.error(error))

        }

    });

}