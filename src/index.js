import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, set, onValue } from 'firebase/database';

import { getFirebaseConfig } from './firebase-config';
import { studentCard } from './student-card';

// Inicializar firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);

//Adding student to the firebase
function addStudent(student){
    //Get database
    const db = getDatabase();
    const newStuRef = push(ref(db, 'students'));
    student["id"] = newStuRef.key;
    //Add student to database
    set(newStuRef, student);
}

function getStudents(){
    //Get database
    const db = getDatabase();
    const studentsRef = ref(db, 'students');
    //Get updates from database info
    onValue(studentsRef, (snapshot) => {
        const data = snapshot.val();
        studentCards(data);
    });
}

function studentCards(data){
    if(data){
        noBonus.innerHTML = "";
        silverBonus.innerHTML = "";
        goldBonus.innerHTML = "";
        Object.keys(data).forEach((k, i) => {
            const cards = new studentCard(data[k]);
            if (data[k].type === 'no bonus') {
                noBonus.appendChild(cards.render(5, true, "silver bonus"));
            }

            if (data[k].type === 'silver bonus') {
                silverBonus.appendChild(cards.render(10, true, "gold bonus"));
            }

            if (data[k].type === 'gold bonus') {
                goldBonus.appendChild(cards.render(0, false, "gold bonus"));
            }
        });
    }
}

const name = document.getElementById("studentName");
const code = document.getElementById("studentCode");
const course = document.getElementById("studenteCourse");
const registerBtn = document.getElementById("register");
const noBonus = document.getElementById("noBonus");
const silverBonus = document.getElementById("silverBonus");
const goldBonus = document.getElementById("goldBonus");

//Button event
const registerStudent = (e, event) => {
    const student = {
        name: name.value,
        code: code.value,
        course: course.value,
        type: "no bonus",
        participation: 0
    }
    //Add to firebase
    addStudent(student);

    //Set inputs to empty
    name.value = '';
    code.value = '';
    course.value = '';
}

registerBtn.addEventListener("click", registerStudent);
getStudents();