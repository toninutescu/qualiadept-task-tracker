// ============================================================
// Sesiunea 6: Livrarea Proiectului "Task Tracker" (Capstone)
// ============================================================
// Cerințe Tehnice (Acceptance Criteria):
// Task 1: Integrarea completă a codului (GET 5 task-uri & ascunde spinner, POST la salvare, DELETE la ștergere, Modul Chaos)
// Task 2: Funcționalitatea Nouă (Marcare ca Finalizat la click pe .task-title prin toggle pe clasa 'completed')
// Task 3: Auditul de Testabilitate (Verifică atributele data-testid pe input, submit-btn, error-msg, task-list, delete-btn-ID, close-promo-btn)
// ============================================================

// 1. SELECTOARE (Prindem elementele din HTML)
const form = document.querySelector('#add-task-form');
const inputNode = document.querySelector('#task-name');
const submitBtn = document.querySelector('#submit-task-btn');
const errorMsg = document.querySelector('#error-msg');
const taskList = document.querySelector('#task-list');
const spinner = document.querySelector('#loading-spinner');

// API-ul public pentru testare
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// 2. FUNCȚIE: Desenarea unui rând HTML în listă
const deseneazaTaskInDOM = (id, titlu) => {
  const li = document.createElement('li');
  li.className = 'task-item';

  // TODO Task 3: Adaugă atributul dinamic de test pe butonul de ștergere
  li.innerHTML = `
    <span class="task-title">${titlu}</span>
    <button class="btn-delete">Șterge</button>
  `;

  taskList.appendChild(li);
};

// 3. GET: Aducerea celor 5 task-uri inițiale de la Server și ascunderea spinner-ului
const incarcaDateServer = async () => {
  try {
    const response = await fetch(`${API_URL}?_limit=5`);
    if (!response.ok) throw new Error('A picat serverul!');
    const data = await response.json();

    // TODO Task 1: Ascunde indicatorul de latență (spinner.style.display = 'none')

    // Desenăm fiecare task primit
    data.forEach((task) => {
      deseneazaTaskInDOM(task.id, task.title);
    });
  } catch (error) {
    if (spinner) {
      spinner.textContent = 'Eroare la aducerea datelor!';
      spinner.style.backgroundColor = '#f8d7da';
    }
    console.error(error);
  }
};

incarcaDateServer();

// 4. POST: Adăugarea unui task nou pe rețea
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const taskTitle = inputNode.value.trim();
  if (!taskTitle) return;

  // TODO Task 1: Trimite noul task la server prin fetch cu method: "POST", headers JSON și body { title, completed: false, userId: 1 }
  // Adaugă-l în DOM cu deseneazaTaskInDOM doar după ce primești status 201 de la server.
  deseneazaTaskInDOM(Date.now(), taskTitle);
  inputNode.value = '';
});

// 5. VALIDARE LIVE: Evenimentul 'input' pentru deblocarea butonului și afișarea erorii
inputNode.addEventListener('input', () => {
  if (inputNode.value.trim().length > 0) {
    submitBtn.disabled = false;
    errorMsg.style.display = 'none';
  } else {
    submitBtn.disabled = true;
    errorMsg.style.display = 'block';
  }
});

// 6. EVENT DELEGATION pe lista <ul> (Ștergere pe rețea + Task 2: Marcare ca Finalizat)
taskList.addEventListener('click', async (e) => {
  // TODO Task 2: Dacă dăm click pe titlul task-ului (.task-title), adăugăm/eliminăm clasa .completed (e.target.classList.toggle('completed'))

  // TODO Task 1: Trimite cererea fetch pe rețea cu method: "DELETE" înainte de a elimina rândul din DOM (.remove())
  if (e.target.classList.contains('btn-delete')) {
    const deleteBtn = e.target;
    const randTask = deleteBtn.closest('.task-item');
    randTask.remove();
  }
});

// 7. MODUL CHAOS: Pop-up promoțional aleatoriu cu buton de închidere
const initChaosMode = () => {
  const randomDelay = Math.floor(Math.random() * 4000) + 2000;

  setTimeout(() => {
    // TODO Task 1 & 3: Creează pop-up-ul overlay-modal având un buton de închidere (close-promo-btn)
    // și ascultător de click pentru închiderea pop-up-ului (modal.remove()).
  }, randomDelay);
};

initChaosMode();
