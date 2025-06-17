let inputCounter = 1;

function addSubject() {
    inputCounter++;
    const subjectInputs = document.querySelector('.subject-inputs');
    const newEntry = document.createElement('div');
    newEntry.className = 'subject-entry';
    newEntry.dataset.index = inputCounter;
    newEntry.innerHTML = `
        <label for="credits-${inputCounter}">Kredit soati:</label>
        <input type="number" id="credits-${inputCounter}" min="1" placeholder="Kredit">
        <label for="grade-${inputCounter}">Baho:</label>
        <input type="number" id="grade-${inputCounter}" min="0" max="5" placeholder="Baho">
    `;
    subjectInputs.appendChild(newEntry);
}

function calculateGPA() {
    let totalGradePoints = 0;
    let totalCredits = 0;
    let hasValidEntry = false;

    const entries = document.querySelectorAll('.subject-entry');

    entries.forEach(entry => {
        const index = entry.dataset.index;
        const creditsInput = document.getElementById(`credits-${index}`);
        const gradeInput = document.getElementById(`grade-${index}`);
        const credits = parseFloat(creditsInput.value) || 0;
        const grade = parseFloat(gradeInput.value) || 0;

        if (credits > 0 || grade > 0) {
            hasValidEntry = true;
        }

        if ((credits > 0 || grade > 0) && (isNaN(credits) || isNaN(grade) || grade > 5 || credits < 1)) {
            alert(`${index}-fan uchun kredit (1 dan katta bo'lishi kerak) yoki baho (0-5 oralig'ida) to'g'ri kiritilmagan!`);
            return;
        }

        if (grade < 3) grade = 0;
        totalGradePoints += grade * credits;
        totalCredits += credits;
    });

    if (!hasValidEntry) {
        alert("Kamida bitta kredit soati va baho kiritilishi kerak!");
        return;
    }

    const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `Sizning umumiy GPA: ${gpa}`;
}