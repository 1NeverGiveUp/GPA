let inputCounter = 1;

function addSubject() {
    inputCounter++;
    const subjectInputs = document.querySelector('.subject-inputs');
    const newEntry = document.createElement('div');
    newEntry.className = 'subject-entry';
    newEntry.dataset.index = inputCounter;
    newEntry.innerHTML = `
        <label for="credits-${inputCounter}">${inputCounter}.</label>
        <input type="number" id="credits-${inputCounter}" min="1" placeholder="Kredit">
        <input type="number" id="grade-${inputCounter}" min="0" max="5" placeholder="Baho">
    `;
    subjectInputs.appendChild(newEntry);
}

function calculateGPA() {
    let totalGradePoints = 0;
    let totalCredits = 0;
    let hasValidEntry = false;
    let hasError = false;

    const entries = document.querySelectorAll('.subject-entry');

    entries.forEach(entry => {
        const index = entry.dataset.index;
        const creditsInput = document.getElementById(`credits-${index}`);
        const gradeInput = document.getElementById(`grade-${index}`);
        const credits = parseFloat(creditsInput.value) || 0;
        let grade = parseFloat(gradeInput.value) || 0;

        // Agar kredit yoki baho kiritilgan bo'lsa
        if (credits > 0 || grade > 0) {
            hasValidEntry = true;
        }

        // Baho yoki kredit noto'g'ri kiritilgan bo'lsa
        if ((credits > 0 || grade > 0) && (isNaN(credits) || isNaN(grade) || grade > 5 || credits < 1) || !Number.isInteger(credits) || !Number.isInteger(grade)) {
            alert(`${index}-fan uchun baho yoki kredit soati noto'g'ri kiritilgan! (Baho 0-5 oralig'idagi butun son, kredit soati 1 va undan katta son bo'lishi kerak)`);
            hasError = true;
            return;
        }

        // Agar baho 3 dan kichik bo'lsa, uni 0 ga tenglashtiramiz
        if (grade < 3) {
            grade = 0;
        }

        totalGradePoints += grade * credits;
        totalCredits += credits;
    });

    // Agar xato bo'lsa, funksiyani to'xtatamiz
    if (hasError) {
        return;
    }

    // Agar hech qanday to'g'ri kiritilgan ma'lumot bo'lmasa
    if (!hasValidEntry) {
        alert("Kamida bitta kredit soati va baho kiritilishi kerak!");
        return;
    }

    // GPA hisoblash
    const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `Sizning umumiy GPA: ${gpa}`;
}