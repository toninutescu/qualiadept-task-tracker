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
