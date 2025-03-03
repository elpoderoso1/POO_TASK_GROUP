import * as readline from "readline";
import { Student, Teacher, SchoolManage, AttendanceStatus, Evaluation, EvaluationType } from "./Exercise";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const studentManager = new SchoolManage<Student>();
const teacherManager = new SchoolManage<Teacher>();

function mainMenu(): void {
    console.log("\nSistema de Gestión Escolar");
    console.log("1. Registrar Estudiante");
    console.log("2. Registrar Profesor");
    console.log("3. Agregar Nota a Estudiante");
    console.log("4. Registrar Asistencia");
    console.log("5. Registrar Evaluación");
    console.log("6. Mostrar Reporte de Estudiante");
    console.log("7. Salir");
    rl.question("Seleccione una opción: ", (option) => {
        switch (option) {
            case "1":
                registerStudent();
                break;
            case "2":
                registerTeacher();
                break;
            case "3":
                addNote();
                break;
            case "4":
                registerAttendance();
                break;
            case "5":
                registerEvaluation();
                break;
            case "6":
                showStudentReport();
                break;
            case "7":
                console.log("Saliendo...");
                rl.close();
                break;
            default:
                console.log("Opción inválida.");
                mainMenu();
        }
    });
}

function registerStudent(): void {
    rl.question("Nombre del estudiante: ", (name) => {
        rl.question("Edad: ", (edad) => {
            rl.question("ID: ", (id) => {
                rl.question("Grado: ", (grade) => {
                    const student = new Student(name, parseInt(edad), parseInt(id), grade);
                    studentManager.addPerson(student);
                    console.log("Estudiante registrado con éxito.");
                    mainMenu();
                });
            });
        });
    });
}

function registerTeacher(): void {
    rl.question("Nombre del profesor: ", (name) => {
        rl.question("Edad: ", (edad) => {
            rl.question("ID: ", (id) => {
                rl.question("Materia: ", (subject) => {
                    const teacher = new Teacher(name, parseInt(edad), parseInt(id), subject);
                    teacherManager.addPerson(teacher);
                    console.log("Profesor registrado con éxito.");
                    mainMenu();
                });
            });
        });
    });
}

function addNote(): void {
    rl.question("ID del estudiante: ", (id) => {
        const student = studentManager.getPerson(parseInt(id));
        if (student) {
            rl.question("Materia: ", (subject) => {
                rl.question("Nota: ", (grade) => {
                    student.addNote(subject, parseFloat(grade));
                    console.log("Nota añadida correctamente.");
                    mainMenu();
                });
            });
        } else {
            console.log("Estudiante no encontrado.");
            mainMenu();
        }
    });
}

function registerAttendance(): void {
    rl.question("ID del estudiante: ", (id) => {
        const student = studentManager.getPerson(parseInt(id));
        if (student) {
            rl.question("Fecha (YYYY-MM-DD): ", (date) => {
                rl.question("Estado (Presente/Ausente): ", (status) => {
                    if (status in AttendanceStatus) {
                        student.registerAttendance(date, AttendanceStatus[status as keyof typeof AttendanceStatus]);
                        console.log("Asistencia registrada correctamente.");
                    } else {
                        console.log("Estado inválido.");
                    }
                    mainMenu();
                });
            });
        } else {
            console.log("Estudiante no encontrado.");
            mainMenu();
        }
    });
}

function registerEvaluation(): void {
    rl.question("ID del estudiante: ", (id) => {
        const student = studentManager.getPerson(parseInt(id));
        if (student) {
            rl.question("Materia: ", (subject) => {
                rl.question("Tipo (Examen/Tarea/Proyecto/Participación): ", (type) => {
                    if (type.toUpperCase() in EvaluationType) {
                        rl.question("Fecha (YYYY-MM-DD): ", (date) => {
                            rl.question("Nota: ", (grade) => {
                                const evaluation = new Evaluation(subject, EvaluationType[type as keyof typeof EvaluationType], date, parseFloat(grade));
                                student.addEvaluation(evaluation);
                                console.log("Evaluación registrada correctamente.");
                                mainMenu();
                            });
                        });
                    } else {
                        console.log("Tipo de evaluación inválido.");
                        mainMenu();
                    }
                });
            });
        } else {
            console.log("Estudiante no encontrado.");
            mainMenu();
        }
    });
}

function showStudentReport(): void {
    rl.question("ID del estudiante: ", (id) => {
        const student = studentManager.getPerson(parseInt(id));
        if (student) {
            console.log(student.genReport());
        } else {
            console.log("Estudiante no encontrado.");
        }
        mainMenu();
    });
}

mainMenu();