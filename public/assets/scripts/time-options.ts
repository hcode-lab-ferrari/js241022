import { format, parse } from "date-fns";
import locale from "date-fns/locale/pt-BR";
import { queryStringToJSON } from "./functions/queryStringToJSON";
import { TimeOptionItem } from "./types/timeOptionItem";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

const page = document.querySelector('#time-options') as HTMLElement;

if (page) {

    let timeOptions: TimeOptionItem[] = [];

    const database = getFirestore();

    const queryString = location.search.split('?')[1];

    const scheduleAt = queryString.split('=')[1];

    queryStringToJSON();

    const parsedScheduleAt = parse(scheduleAt, 'yyyy-MM-dd', new Date());

    if (String(parsedScheduleAt) === 'Invalid Date') {
        location.href = "schedules-new.html";
    } else {

        const checkSelectedOption = () => {

            const button = page.querySelector('[type=submit]') as HTMLButtonElement;

            if (page.querySelector('[name=time_option]:checked')) {
                button.disabled = false;
            } else {
                button.disabled = true;
            }


        }

        const options = page.querySelector('.options') as HTMLDivElement;

        const renderOptions = () => {

            options.innerHTML = '';

            timeOptions.sort((a, b) => {

                return Number(a.value) - Number(b.value);

            }).forEach((item) => {

                const label = document.createElement('label');
    
                label.innerHTML = `
                    <input type="radio" name="time_option" value="${item.value}" />
                    <span>${item.name}</span>
                `;
    
                const input = label.querySelector('input') as HTMLInputElement;
    
                input.addEventListener('change', () => checkSelectedOption());
    
                options.appendChild(label);
    
            });

        }

        const title = page.querySelector('h3') as HTMLHeadingElement;

        title.innerText = format(parsedScheduleAt, "cccc, d 'de' MMMM 'de' yyyy", {
            locale,
        });

        const scheduleEl = document.querySelector('[name=schedule_at]') as HTMLInputElement;

        scheduleEl.value = scheduleAt ?? '';

        onSnapshot(collection(database, 'time-options'), (collection) => {

            timeOptions = [];

            collection.forEach((document) => {
    
                timeOptions.push(document.data() as TimeOptionItem);
    
            });

            renderOptions();
    
        });

    }

}