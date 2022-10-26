import { addDays, addMonths, differenceInDays, differenceInSeconds, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, subMonths } from "date-fns";
import locale from "date-fns/locale/pt-BR";

const page = document.querySelector('#schedules-new') as HTMLElement;

if (page) {

    const hoje = new Date();
    let inicioMes = startOfMonth(hoje);
    const btnAnterior = page.querySelector('.btn-prev') as HTMLButtonElement;
    const btnProximo = page.querySelector('.btn-next') as HTMLButtonElement;
    const btnHoje = page.querySelector('.btn-today') as HTMLButtonElement;
    const titulo = page.querySelector('h2') as HTMLHeadingElement;
    const calendario = page.querySelector('.days') as HTMLUListElement;

    const render = () => {

        titulo.innerText = format(inicioMes, "MMMM yyyy", {
            locale,
        });

        calendario.innerHTML = '';

        let diaCorrente = startOfWeek(inicioMes);
        const ultimoDia = endOfWeek(endOfMonth(inicioMes));

        while (differenceInSeconds(ultimoDia, diaCorrente) > 0) {

            const li = document.createElement('li');

            li.innerText = format(diaCorrente, 'd');

            if (format(diaCorrente, 'yyyyMM') < format(inicioMes, 'yyyyMM')) {
                li.classList.add('month-prev');
            }

            if (format(diaCorrente, 'yyyyMM') > format(inicioMes, 'yyyyMM')) {
                li.classList.add('month-next');
            }

            if (format(diaCorrente, 'yyyyMMdd') === format(hoje, 'yyyyMMdd')) {
                li.classList.add('active');
            }

            calendario.appendChild(li);

            diaCorrente = addDays(diaCorrente, 1);

        }        

    }

    btnAnterior.addEventListener('click', () => {
        inicioMes = subMonths(inicioMes, 1);
        render();
    });

    btnProximo.addEventListener('click', () => {
        inicioMes = addMonths(inicioMes, 1);
        render();
    });

    btnHoje.addEventListener('click', () => {
        inicioMes = startOfMonth(hoje);
        render();
    });

    render();

}