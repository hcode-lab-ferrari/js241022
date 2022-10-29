const page = document.querySelector('#change-photo') as HTMLElement;

if (page) {

    const inputFile = page.querySelector('#file') as HTMLInputElement;
    const chooseButton = page.querySelector('.choose-photo') as HTMLButtonElement;

    chooseButton.addEventListener('click', () => {
        inputFile.click();
    });

    inputFile.addEventListener('change', (event) => {

        console.log(event);

    });

}