// 1. Crear un sistema de gestión escolar que:

// Gestione matrículas y notas
// Controle asistencia
// Genere horarios
// Maneje evaluaciones
// Calcule promedios
// Genere reportes académicos

// Para resolver el ejercicio debe incluir:

// Interfaces
// Clases abstractas
// Clases concretas
// Herencia y polimorfismo

interface Reports {
    genReport(): string;
}

class Evaluation {
    constructor(
        public subject: string,
        public type: string,
        public date: string,
        public grade: string
    ) {}
}

abstract class Person {
    constructor(
        public name: string,
        public edad: number,
        public id: number
    ) {}

    abstract Info(): string;
}

class Student extends Person implements Reports {
    private notes: { [materia: string]: number[] } = {};
    private asistence: [string, boolean][] = [];
    private evaluations: Evaluation[] = [];

    constructor(
        name: string,
        edad: number,
        id: number,
        public grade: string
    ) {
        super(name, edad, id);
    }

    public addNote(subject: string, note: number): void {
        if (!this.notes[subject]) {
            this.notes[subject] = [];
        }

        this.notes[subject].push(note);
    }

    public resgisterAsistence(date: string, active: boolean): void {
        this.asistence.push([date, active]);
    }

    public calculateAverage(): number {
        let total = 0, quantity = 0;
        for (let notes of Object.values(this.notes)) {
            total += notes.reduce((a, b) => a + b, 0);
            quantity += notes.length;
        }
        return quantity > 0 ? (total / quantity) : 0;
    }

    public addEvaluation(evaluation: Evaluation): void {
        this.evaluations.push(evaluation);
    }

    public printEvaluations(): string {
        if (this.evaluations.length === 0) {
            return `${this.name} no tiene evaluaciones registradas.`;
        }
        return this.evaluations.map(e => `Materia: ${e.subject}, Tipo: ${e.type}, Fecha: ${e.date}, Nota: ${e.grade}`).join("\n");
    }

    genReport(): string {
        return `Reporte de ${this.name}.\n` + 
        `Promedio: ${this.calculateAverage().toFixed(2)}.\n` + 
        `Evaluaciones: ${this.printEvaluations()}.`;
    }

    Info(): string {
        return `Estudiante: ${this.name}\n` + 
        `Grado ${this.grade}\nID: ${this.id}`;
    }
}

class Teacher extends Person {
    constructor(
        name: string,
        edad: number,
        id: number,
        public subject: string
    ) {
        super(name, edad, id);
    }

    Info(): string {
        return `Profesor: ${this.name}\n` + 
        `Materia: ${this.subject}\nID: ${this.id}`;
    }
}

class TimeTable {
    private TimeTables: { [grade: string]: [string, string][] } = {};

    public addTimeTables(grade: string, subject: string, timetable: string): void {
        if (!this.TimeTables[grade]) {
            this.TimeTables[grade] = [];
        }
        this.TimeTables[grade].push([subject, timetable]);
    }

    public printTimeTables(grade: string): [string, string][] | undefined {
        return this.TimeTables[grade];
    }
}

class SchoolManage {
    private students: { [id: number]: Student } = {};
    private teachers: { [id: number]: Teacher } = {};
    public timetables: { [grade: string]: TimeTable } = {};

    public enrollStudent(student: Student): void {
        if (this.students[student.id]) {
            throw new Error(`El estudiante con ID ${student.id} ya está registrado.`);
        } else {
            this.students[student.id] = student;
        }
    }

    public addTeacher(teacher: Teacher): void {
        if (this.teachers[teacher.id]) {
            throw new Error(`El profesor con ID ${teacher.id} ya está registrado.`);
        } else {
            this.teachers[teacher.id] = teacher;
        }
    }

    public printStudent(id: number): void {
        const studentPrinter = this.students[id];
    
        if (!studentPrinter) {
            console.log(`No hay estudiantes asignados en el ID: ${id}.`);
            return;
        }
    
        console.log(`Estudiante en el ID: ${id}\n`, studentPrinter);
    }

    public printTeacher(id: number): void {
        const teacherPrinter = this.teachers[id];
    
        if (!teacherPrinter) {
            console.log(`No hay profesores asignados en el ID: ${id}.`);
            return;
        }
    
        console.log(`Profesor en el ID: ${id}\n`, teacherPrinter);
    }

    public printTimeTable(grade: string): void {
        const timetablePrinter = this.timetables[grade];
        
        if (!timetablePrinter) {
            console.log(`No hay horarios disponibles para el grado ${grade}.`);
            return;
        }
    
        console.log(`Horario para grado ${grade}:`);
        const timeTableEntries = timetablePrinter.printTimeTables(grade);
        if (timeTableEntries) {
            timeTableEntries.forEach(([subject, time]) => {
                console.log(`${subject}: ${time}`);
            });
        }
    }

    public registerEvaluation(id: number, evaluation: Evaluation): void {
        const student = this.students[id];
        if (student) {
            student.addEvaluation(evaluation);
        } else {
            console.log(`Estudiante con ID ${id} no encontrado.`);
        }
    }

    public printEvaluationsForStudent(id: number): void {
        const student = this.students[id];
        if (student) {
            console.log(student.printEvaluations());
        } else {
            console.log(`Estudiante con ID ${id} no encontrado.`);
        }
    }
}

// Crear un objeto de gestión escolar
const manager = new SchoolManage();

// Crear un estudiante y matricularlo
const student01 = new Student('Fatima', 20, 1, 'Tercer año de Universidad');
manager.enrollStudent(student01); // Cumple con "Gestiona matrículas"

// Crear un profesor y agregarlo
const teacher01 = new Teacher('Rosalina', 31, 1, 'Lenguaje');
manager.addTeacher(teacher01); // Cumple con "Gestiona profesores"

// Agregar notas a las materias del estudiante
student01.addNote('Lenguaje', 89);
student01.addNote('Matematica', 10);
student01.addNote('Ciencias', 50);
student01.addNote('Sociales', 70); // Cumple con "Gestiona notas"

// Registrar asistencia del estudiante
student01.resgisterAsistence('2025-03-01', true);
student01.resgisterAsistence('2025-03-02', false);
student01.resgisterAsistence('2025-03-03', false); // Cumple con "Controla asistencia"

// Crear horarios para el grado 'Tercer año de Universidad'
const timetable01 = new TimeTable();
timetable01.addTimeTables('Tercer año de Universidad', 'Lenguaje', 'Lunes 10:00 AM');
timetable01.addTimeTables('Tercer año de Universidad', 'Matematica', 'Martes 8:00 AM');
timetable01.addTimeTables('Tercer año de Universidad', 'Ciencia', 'Martes 10:00 AM');
manager.timetables['Tercer año de Universidad'] = timetable01; // Cumple con "Genera horarios"

// Generar reporte académico del estudiante (promedio)
console.log(student01.genReport()); // Cumple con "Genera reportes académicos"
console.log('\n');

// Imprimir información del estudiante con ID 1
manager.printStudent(1); // Cumple con "Maneja información de estudiantes"
console.log('\n');

// Imprimir información del profesor con ID 1
manager.printTeacher(1); // Cumple con "Maneja información de profesores"
console.log('\n');

// Imprimir horarios para 'Tercer año de Universidad'
manager.printTimeTable('Tercer año de Universidad'); // Cumple con "Genera horarios"
console.log('\n');

// Crear y registrar evaluaciones para el estudiante
const evaluation1 = new Evaluation('Lenguaje', 'Examen', '2025-03-15', '85');
const evaluation2 = new Evaluation('Matematica', 'Trabajo', '2025-03-20', '92');

manager.registerEvaluation(1, evaluation1); // Registra evaluación para el estudiante con ID 1
manager.registerEvaluation(1, evaluation2); // Registra evaluación para el estudiante con ID 1

// Imprimir evaluaciones del estudiante con ID 1
manager.printEvaluationsForStudent(1); // Cumple con "Maneja evaluaciones"
console.log('\n');

// Generar reporte académico del estudiante (promedio)
console.log(student01.genReport()); // Cumple con "Genera reportes académicos"
console.log('\n');

// Imprimir información del estudiante con ID 1
manager.printStudent(1); // Cumple con "Maneja información de estudiantes"