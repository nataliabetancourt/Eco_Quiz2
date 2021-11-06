import { getDatabase, ref, onValue, set, update } from 'firebase/database';

export class studentCard{
    constructor(student){
        this.student = student;
    }

    render(pointsNum, hide, level){
        //Box where all elements will be
        let card = document.createElement("div");
        card.className = "cards";

        //Course that was registered
        let course = document.createElement("p");
        course.className = "courseTxt";
        course.innerHTML = this.student.course;

        //Name that was registered
        let name = document.createElement("p");
        name.className = "nameTxt";
        name.innerHTML = this.student.name;

        //Code that was registered
        let code = document.createElement("p");
        code.className = "codeTxt";
        code.innerHTML = this.student.code;

        //Number of times participated 
        let participation = document.createElement("p");
        participation.className = "participationTxt";
        participation.innerHTML = this.student.participation;

        //Buttons to delete and add participation
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteBtn";
        deleteBtn.innerHTML = "X";
        deleteBtn.addEventListener("click", (e, ev) => {
            //Get database
            const db = getDatabase();
            let studentRef = ref(db, 'students/' + this.student.id);
            console.log("delete student");
            set(studentRef, null);
            card.className = "hidden";
        });

        //Adding participation points
        let addPBtn = document.createElement("button");
        addPBtn.className = "addBtn";
        addPBtn.innerHTML = "+";

        //Variable that changes
        let points = this.student.participation;
        addPBtn.addEventListener("click", (e, ev) =>{
            //Get database
            const db = getDatabase();
            let studentRef = ref(db, 'students/' + this.student.id);

            //Add participation
            points++;

            //Show changes
            participation.innerHTML = points;
            update(studentRef, {"participation": points});

            if (points > pointsNum) {
                update(studentRef, {"type": level});
                if (hide) {
                    card.className = "hidden";
                }    
            }
    
        });

        card.appendChild(course);
        card.appendChild(name);
        card.appendChild(code);
        card.appendChild(participation);
        card.appendChild(addPBtn);
        card.appendChild(deleteBtn);
        return card;
    }
}