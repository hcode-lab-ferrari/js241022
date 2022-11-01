import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { formatCurrency } from "./functions/formatCurrency";
import { queryStringToJSON } from "./functions/queryStringToJSON";
import { setFormValues } from "./functions/setFormValues";
import { ServiceItem } from "./types/serviceItem";

const page = document.querySelector('#schedules-services') as HTMLElement;

if (page) {

    let services: ServiceItem[] = [];
    const database = getFirestore();
    const values = queryStringToJSON();
    setFormValues(values);

    services.filter(({ id, description, name, price }) => {

        id
        description
        name
        price

    });

    let selectedServices: number[] = [];

    const renderSummary = () => {

        const tbody = page.querySelector('tbody') as HTMLTableSectionElement;

        tbody.innerHTML = '';

        selectedServices.forEach((id) => {

            const service = services.find((item) => {

                return item.id === id;

            });

            if (service) {

                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${service.name}</td>
                    <td class="price">${formatCurrency(service.price)}</td>
                `;

                tbody.appendChild(tr);

            }

        });   

    }

    const calcTotal = () => {

        const totalElement = page.querySelector('.total') as HTMLSpanElement;

        const selecteds = services.filter((item) => {

            return selectedServices.includes(Number(item.id));
            
        });

        let total = 0;

        /*
        selecteds.forEach((service) => {
            total = total + Number(service.price);
        });
        */

        const prices = selecteds.map((item) => {
            return item.price;
        });

        total = prices.reduce((valorAnterior, valorAtual) => {
            return valorAnterior + valorAtual;
        }, 0);

        totalElement.innerText = formatCurrency(total);

    }

    const options = page.querySelector('.options') as HTMLDivElement;

    const renderServices = () => {

        options.innerHTML = '';

        services.forEach((item) => {

            const label = document.createElement('label');

            label.innerHTML = `
                <input type="checkbox" name="service" value="${item.id}" />
                <div class="square">
                    <div></div>
                </div>
                <div class="content">
                    <span class="name">${item.name}</span>
                    <span class="description">${item.description}</span>
                    <span class="price">${formatCurrency(item.price)}</span>
                </div>
            `;

            const input = label.querySelector('input') as HTMLInputElement;

            input.addEventListener('change', (event) => {

                const element = event.target as HTMLInputElement;

                if (element.checked) {
                    selectedServices.push(Number(element.value));
                } else {
                    selectedServices = selectedServices.filter((id) => {
                        return id !== Number(element.value);
                    });
                }

                renderSummary();
                calcTotal();

            });

            options.appendChild(label);

        });

    }

    renderSummary();

    onSnapshot(collection(database, 'services'), (collection) => {

        services = [];

        collection.forEach((doc) => {

            services.push(doc.data() as ServiceItem);

        });

        renderServices();

    });

}



/*
    for (let i = 0; i < services.length; i++) {

        const item = services[i];

        const label = document.createElement('label');

        label.innerHTML = `
            <input type="checkbox" name="service" value="${item.id}" />
            <div class="square">
                <div></div>
            </div>
            <div class="content">
                <span class="name">${item.name}</span>
                <span class="description">${item.description}</span>
                <span class="price">${formatCurrency(item.price)}</span>
            </div>
        `;

        options.appendChild(label);

    }
*/