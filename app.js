
// ============================================================
// SESIUNEA 3 - JavaScript Basics
// ============================================================

const listaTaskuri = [
    {
        id: 1001,
        nume: "Setare Boilerplate HTML",
        completat: true
    },
    {
        id: 1002,
        nume: "Înțelegere Arhitectură Client-Server",
        completat: true
    }
];

const proceseazaTaskNou = (taskObj) => {
    if (taskObj.nume === "" || taskObj.nume === undefined) {
        console.log("Eroare: Task-ul trebuie să aibă un nume!");
    } else {
        listaTaskuri.push(taskObj);
        console.log("Task adăugat cu succes!");
    }
};

proceseazaTaskNou({
    id: 1003,
    nume: "Învață selectoare CSS",
    completat: true
});

for (let i = 0; i < listaTaskuri.length; i++) {
    console.log(listaTaskuri[i].nume);
}


// ============================================================
// SESIUNEA 6 - TASK TRACKER
// ============================================================

// 1. Selectarea elementelor HTML

const form = document.querySelector('#add-task-form');
const inputNode = document.querySelector('#task-name');
const submitBtn = document.querySelector('#submit-task-btn');
const errorMsg = document.querySelector('#error-msg');
const taskList = document.querySelector('#task-list');
const spinner = document.querySelector('#loading-spinner');

const API_URL = 'https://jsonplaceholder.typicode.com/todos';


// 2. Desenarea unui task în DOM

const deseneazaTaskInDOM = (id, titlu) => {
    const li = document.createElement('li');

    li.className = 'task-item';

    li.innerHTML = `
        <span class="task-title">${titlu}</span>
        <button class="btn-delete"
                data-testid="delete-btn-${id}">
            Șterge
        </button>
    `;

    taskList.appendChild(li);
};


// 3. GET - Încărcarea celor 5 task-uri inițiale

const incarcaDateServer = async () => {
    try {
        const response = await fetch(`${API_URL}?_limit=5`);

        if (!response.ok) {
            throw new Error("Eroare la încărcarea task-urilor!");
        }

        const data = await response.json();

        spinner.style.display = 'none';

        data.forEach(task => {
            deseneazaTaskInDOM(task.id, task.title);
        });

    } catch (error) {
        spinner.textContent = "Eroare la aducerea datelor!";
        spinner.style.backgroundColor = "#f8d7da";
        console.error(error);
    }
};

incarcaDateServer();


// 4. Validarea formularului

inputNode.addEventListener('input', () => {
    if (inputNode.value.trim().length > 0) {
        submitBtn.disabled = false;
        errorMsg.style.display = 'none';
    } else {
        submitBtn.disabled = true;
        errorMsg.style.display = 'block';
    }
});


// 5. POST - Salvarea unui task nou

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const taskTitle = inputNode.value.trim();

    if (taskTitle === '') {
        errorMsg.style.display = 'block';
        return;
    }

    // Senior Bonus: prevenirea task-urilor duplicate

    const toateTaskurile = document.querySelectorAll('.task-title');

    for (let i = 0; i < toateTaskurile.length; i++) {
        if (toateTaskurile[i].textContent.toLowerCase() ===
            taskTitle.toLowerCase()) {

            alert("Acest task există deja!");
            return;
        }
    }

    submitBtn.textContent = "Se salvează...";
    submitBtn.disabled = true;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: taskTitle,
                completed: false,
                userId: 1
            })
        });

        if (response.status === 201) {
            const newTask = await response.json();

            deseneazaTaskInDOM(newTask.id, newTask.title);

            inputNode.value = '';
            errorMsg.style.display = 'none';
        }

    } catch (error) {
        alert("Eroare la salvarea pe rețea!");

    } finally {
        submitBtn.textContent = "Salveaza Task";
        submitBtn.disabled = true;
    }
});


// 6. Marcarea task-urilor ca finalizate

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('task-title')) {
        e.target.classList.toggle('completed');
    }
});


// 7. DELETE - Ștergerea task-urilor de pe server

taskList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-delete')) {

        const deleteBtn = e.target;
        const randTask = deleteBtn.closest('.task-item');

        const testId = deleteBtn.getAttribute('data-testid');
        const taskId = testId.split('-')[2];

        deleteBtn.textContent = 'Se șterge...';
        deleteBtn.disabled = true;
        randTask.style.opacity = '0.6';

        try {
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                randTask.remove();
            } else {
                throw new Error("Serverul a refuzat ștergerea!");
            }

        } catch (error) {
            alert("Eroare de rețea la ștergere!");

            deleteBtn.textContent = 'Șterge';
            deleteBtn.disabled = false;
            randTask.style.opacity = '1';
        }
    }
});


// 8. CHAOS MODE - Pop-up promoțional

const initChaosMode = () => {
    const randomDelay = Math.floor(Math.random() * 4000) + 2000;

    setTimeout(() => {
        const modal = document.createElement('div');

        modal.className = 'overlay-modal';
        modal.setAttribute('data-testid', 'promo-overlay');

        modal.innerHTML = `
            <div class="promo-box">
                <h3>Ofertă Specială!</h3>
                <p>Fă upgrade la versiunea Premium!</p>
                <button class="btn-close-promo"
                        data-testid="close-promo-btn">
                    Nu, mulțumesc
                </button>
            </div>
        `;

        const closeBtn = modal.querySelector('.btn-close-promo');

        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        document.body.appendChild(modal);

    }, randomDelay);
};

initChaosMode();
