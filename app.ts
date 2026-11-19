/**
 * ==============================================================
 * Sesiunea 7: Trecerea la TypeScript (Task Tracker Refactoring)
 * ==============================================================
 * Obiectiv: Migrează scriptul aplicației din JavaScript în TypeScript.
 * Adaugă adnotări de tipuri explicite, elimină orice apariție a lui 'any'
 * și securizează modelele de date înainte de testele automate Playwright!
 */

// 1. Tipizarea Primitivelor & Variabilelor de Configurare
// Cerință: Declară explicit tipurile: apiUrl: string, maxTasksLimit: number, isAppReady: boolean
const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
const maxTasksLimit = 5;
let isAppReady = false;

// 2. Tipul de Uniune (Union Type) pentru Statusul Task-ului
// Cerință: Definește un Type Alias numit TaskStatus ('todo' | 'in-progress' | 'completed')
// TODO: Definește type TaskStatus


// 3. Modelul de Date Tipizat (Type Alias TaskItem)
// Cerință: id: number, title: string, status: TaskStatus, completed: boolean, priority?: 'low' | 'medium' | 'high'
// TODO: Definește type TaskItem


// Declară array-ul principal tipizat explicit ca TaskItem[] (sau Array<TaskItem>)
// let listaTaskuri: TaskItem[] = [];


// 4. Semnăturile Funcțiilor & Eliminarea lui any (Zero Any Policy)
// Cerință: proceseazaTaskNou primește (taskObj: TaskItem) și returnează explicit : boolean
// TODO: Implementează proceseazaTaskNou


// Cerință: afiseazaTask primește (id: number) și returnează explicit : void
// TODO: Implementează afiseazaTask


// 5. Funcție Asincronă Tipizată (Fetch API & Promise)
// Cerință: async (): Promise<void> și asertare date primite cu as TaskItem[]
// const incarcaTaskuriInitiale = async (): Promise<void> => {
//   ...
// };


 // 1. Variabile de configurare tipizate

const apiUrl: string = 'https://jsonplaceholder.typicode.com/todos';
const maxTasksLimit: number = 5;
let isAppReady: boolean = false;


// 2. Tipul de uniune pentru statusul task-ului

type TaskStatus = 'todo' | 'in-progress' | 'completed';


// 3. Modelul de date pentru un task

type TaskItem = {
    id: number;
    title: string;
    status: TaskStatus;
    completed: boolean;
    priority?: 'low' | 'medium' | 'high';
};


// 4. Array de task-uri tipizat

let listaTaskuri: TaskItem[] = [];


// 5. Funcția pentru adăugarea unui task

const proceseazaTaskNou = (taskObj: TaskItem): boolean => {
    if (!taskObj.title) {
        console.error("Eroare: Task-ul trebuie să aibă un titlu!");
        return false;
    } else {
        listaTaskuri.push(taskObj);
        console.log("Task adăugat cu succes!");
        return true;
    }
};


// 6. Funcția pentru afișarea unui task

const afiseazaTask = (id: number): void => {
    const taskGasit = listaTaskuri.find(task => task.id === id);

    if (taskGasit) {
        console.log(taskGasit.title);
    } else {
        console.log("Task-ul nu a fost găsit!");
    }
};


// 7. Funcția asincronă pentru încărcarea task-urilor

const incarcaTaskuriInitiale = async (): Promise<void> => {
    try {
        const response = await fetch(
            `${apiUrl}?_limit=${maxTasksLimit}`
        );

        if (!response.ok) {
            throw new Error("Eroare la conectarea cu API-ul!");
        }

        const dateServer = await response.json() as TaskItem[];

        listaTaskuri = dateServer;
        isAppReady = true;

        console.log("Au fost încărcate " +
            listaTaskuri.length + " task-uri.");

    } catch (error) {
        console.error("Eroare la încărcarea task-urilor:", error);
    }
};


// 8. Testarea funcțiilor

incarcaTaskuriInitiale().then(() => {
    const taskNou: TaskItem = {
        id: 999,
        title: "Rulează suita Playwright",
        status: "todo",
        completed: false,
        priority: "high"
    };

    proceseazaTaskNou(taskNou);
    afiseazaTask(999);
});
