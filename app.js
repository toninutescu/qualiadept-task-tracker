// ============================================================
// Sesiunea 3: JavaScript Basics (Business Logic & Validare)
// ============================================================
// Cerințe Tehnice (Acceptance Criteria):
// 1. Array de Obiecte: Declară constanta listaTaskuri cu cele 2 task-uri inițiale (id, nume, completat).
// 2. Funcție Săgeată (Arrow Function): proceseazaTaskNou(taskObj) cu validare strictă if/else.
//    - Dacă numele lipsește ("") sau este undefined: afișează mesaj de eroare în consolă.
//    - Dacă datele sunt valide: adaugă noul task în array (push) și afișează mesaj de succes.
// 3. Buclă de Raportare: Parcurge listaTaskuri cu o buclă for și afișează numele fiecărui task.
// ============================================================

// 1. Baza temporară de date (Array de Obiecte)


// 2. Funcția de Validare (Arrow Function)


// 3. Testează funcția apelând-o cu un task invalid și unul valid


// 4. Bucla for pentru raportarea task-urilor din memorie
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
// Sesiunea 4: JS DOM Manipulation (Task Tracker)
// ============================================================
// Cerințe Tehnice:
// 1. Selectare elemente DOM: formular (#add-task-form), input (#task-name), tbody.
// 2. Ascultător de eveniment 'submit' pe formular cu preventDefault().
// 3. Creare dinamică rând nou (document.createElement('tr')).
// 4. Structura rândului: celule <td> cu numele task-ului și buton cu clasa 'delete-row'.
// 5. Inserare în DOM folosind appendChild() sau append().
// 6. Resetare valoare câmp input (input.value = '').
// 7. Ștergere dinamică din DOM cu .remove() la click pe butonul 'delete-row'.
// ============================================================

// 1. Selectare elemente DOM


// 2. Ascultător eveniment 'submit' și adăugare dinamică în tabel


// 3. Ștergere dinamică din DOM (Event Delegation pe document sau click pe buton)


const formular = document.querySelector('#add-task-form');
const inputTask = document.querySelector('#task-name');
const tabelTaskuri = document.querySelector('tbody');

formular.addEventListener('submit', (event) => {
    event.preventDefault();

    const textNou = inputTask.value;

    if (textNou !== "") {
        const randNou = document.createElement('tr');

        const celulaId = document.createElement('td');
        celulaId.textContent = "1003";

        const celulaNume = document.createElement('td');
        celulaNume.textContent = textNou;

        const celulaActiuni = document.createElement('td');

        const butonStergere = document.createElement('button');
        butonStergere.textContent = "Șterge";
        butonStergere.className = "delete-row";

        celulaActiuni.appendChild(butonStergere);

        randNou.appendChild(celulaId);
        randNou.appendChild(celulaNume);
        randNou.appendChild(celulaActiuni);

        tabelTaskuri.appendChild(randNou);

        inputTask.value = "";

        console.log("Task adăugat cu succes: " + textNou);


        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-row')) {
                e.target.closest('tr').remove();
            }
        });

// ============================================================
// Sesiunea 5: JS Asincron (Fetch API & Task-uri Active)
// ============================================================
// Cerințe Tehnice:
// 1. Declară o Arrow Function asincronă:
//    const incarcaTaskuriInitiale = async () => { ... };
// 2. În interiorul funcției, apelează:
//    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
// 3. Despachetează răspunsul: const taskuri = await response.json();
// 4. Selectează lista din HTML: const activeTasksList = document.querySelector('#active-tasks-list');
// 5. Iterează prin taskuri (cu forEach sau for):
//    - Creează dinamic un element <li> (document.createElement('li')).
//    - Setează textul cu titlul task-ului (li.textContent = task.title).
//    - Adaugă elementul în listă (activeTasksList.appendChild(li)).
// 6. Apelează funcția la finalul fișierului: incarcaTaskuriInitiale();
// ============================================================

// Adaugă aici funcția asincronă incarcaTaskuriInitiale și apelarea ei:


const incarcaTaskuriInitiale = async () => {
    const listaTaskuri = document.querySelector('#active-tasks-list');

    const raspuns = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');

    const taskuri = await raspuns.json();

    for (let i = 0; i < taskuri.length; i++) {
        const liNou = document.createElement('li');

        liNou.textContent = taskuri[i].title;

        listaTaskuri.appendChild(liNou);
    }
};

incarcaTaskuriInitiale();

