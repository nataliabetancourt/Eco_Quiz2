const firebaseConfig = {
    apiKey: "AIzaSyDgUBRY8Q1koq-RB5yzGe05_4RjvBKEWcs",
    authDomain: "eco-quiz2-37983.firebaseapp.com",
    projectId: "eco-quiz2-37983",
    storageBucket: "eco-quiz2-37983.appspot.com",
    messagingSenderId: "222026450713",
    appId: "1:222026450713:web:248d611aff84f269cfa788"
};

export function getFirebaseConfig(){
    if (!firebaseConfig || !firebaseConfig.apiKey){
        throw new Error("Firebase configuration error");
    } else {
        return firebaseConfig;
    }
}
