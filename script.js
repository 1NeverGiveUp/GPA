function showSemesterInputs() {
    const course = parseInt(document.getElementById('course').value);
    const semesterInput = document.getElementById('semester-input');
    const semesterFields = document.getElementById('semester-fields');
    semesterFields.innerHTML = '';
    semesterInput.style.display = course > 0 ? 'block' : 'none';
    document.getElementById('subject-input').style.display = 'none';
    document.getElementById('result').style.display = 'none';

    if (course > 0) {
        for (let i = 1; i <= course; i++) {
            for (let j = 1; j <= 2; j++) {
                semesterFields.innerHTML += `
                    <div>
                        <label>${i}-kurs, ${j}-semestr fanlar soni:</label>
                        <input type="number" id="subjects-${i}-${j}" min="0" placeholder="Fanlar soni">
                    </div>
                `;
            }
        }
    }
}

function generateSubjectInputs() {
    const course = parseInt(document.getElementById('course').value);
    const subjectInput = document.getElementById('subject-input');
    const subjectFields = document.getElementById('subject-fields');
    subjectFields.innerHTML = '';
    subjectInput.style.display = 'block';
    document.getElementById('result').style.display = 'none';

    let valid = true;
    let hasValidSemester = false;
    for (let i = 1; i <= course; i++) {
        for (let j = 1; j <= 2; j++) {
            const numSubjects = parseInt(document.getElementById(`subjects-${i}-${j}`).value);
            if (isNaN(numSubjects)) {
                alert(`${i}-kurs, ${j}-semestr uchun fanlar sonini kiriting!`);
                valid = false;
                break;
            }
            if (numSubjects > 0) hasValidSemester = true;
        }
        if (!valid) break;
    }

    if (!valid || !hasValidSemester) {
        if (!hasValidSemester) alert("Kamida bitta semestr uchun fanlar soni 0 dan katta bo'lishi kerak!");
        return;
    }

    for (let i = 1; i <= course; i++) {
        for (let j = 1; j <= 2; j++) {
            const numSubjects = parseInt(document.getElementById(`subjects-${i}-${j}`).value);
            if (numSubjects === 0) continue;
            const semesterColumn = document.createElement('div');
            semesterColumn.className = 'semester-column';
            semesterColumn.innerHTML = `<h3>${i}-kurs, ${j}-semestr</h3>`;
            for (let k = 1; k <= numSubjects; k++) {
                semesterColumn.innerHTML += `
                    <div class="subject-entry">
                        <label>Fan ${k}:</label>
                        <input type="text" id="name-${i}-${j}-${k}" placeholder="Fan nomi">
                        <input type="number" id="credits-${i}-${j}-${k}" min="1" placeholder="Kredit">
                        <input type="number" id="grade-${i}-${j}-${k}" min="0" max="5" placeholder="Baho" oninput="restrictGrade(this)">
                    </div>
                `;
            }
            subjectFields.appendChild(semesterColumn);
        }
    }
}

function restrictGrade(input) {
    let value = parseFloat(input.value);
    if (isNaN(value)) {
        input.value = '';
        return;
    }
    if (value < 0) input.value = 0;
    if (value > 5) input.value = 5;
}

function calculateGPA() {
    const course = parseInt(document.getElementById('course').value);
    let totalGradePoints = 0;
    let totalCredits = 0;
    let valid = true;

    for (let i = 1; i <= course; i++) {
        for (let j = 1; j <= 2; j++) {
            const numSubjects = parseInt(document.getElementById(`subjects-${i}-${j}`).value);
            if (numSubjects === 0) continue;
            for (let k = 1; k <= numSubjects; k++) {
                const credits = parseFloat(document.getElementById(`credits-${i}-${j}-${k}`).value);
                let grade = parseFloat(document.getElementById(`grade-${i}-${j}-${k}`).value);
                if (isNaN(credits) || isNaN(grade)) {
                    alert(`${i}-kurs, ${j}-semestr, ${k}-fan uchun ma'lumotlar to'liq emas!`);
                    valid = false;
                    break;
                }
                if (grade < 3) grade = 0;
                totalGradePoints += grade * credits;
                totalCredits += credits;
            }
            if (!valid) break;
        }
        if (!valid) break;
    }

    if (!valid) return;

    const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `Sizning umumiy GPA: ${gpa}`;
}