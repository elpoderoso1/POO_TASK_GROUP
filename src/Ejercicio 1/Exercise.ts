// Enum para tipos de evaluaciones
enum EvaluationType {
    EXAMEN = "Examen",
    TAREA = "Tarea",
    PROYECTO = "Proyecto",
    PARTICIPACION = "Participación"
}

// Enum para estados de asistencia
enum AttendanceStatus {
    PRESENTE = "Presente",
    AUSENTE = "Ausente"
}

// Type para registro de notas
type GradeRecord = {
    [subject: string]: number[];
};

// Type para registro de asistencia
type AttendanceRecord = {
    date: string;
    status: AttendanceStatus;
};

// Interfaz para generación de reportes
interface Reports {
    genReport(): string;
}

// Clase de Evaluación
class Evaluation {
    constructor(
        public subject: string,
        public type: EvaluationType,
        public date: string,
        public grade: number
    ) {}
}

// Clase abstracta Persona
abstract class Person {
    constructor(
        public name: string,
        public edad: number,
        public id: number
    ) {}

    abstract Info(): string;
}

// Clase Estudiante
class Student extends Person implements Reports {
    private notes: GradeRecord = {};
    private attendance: AttendanceRecord[] = [];
    private evaluations: Evaluation[] = [];

    constructor(name: string, edad: number, id: number, public grade: string) {
        super(name, edad, id);
    }

    public addNote(subject: string, note: number): void {
        if (!this.notes[subject]) {
            this.notes[subject] = [];
        }
        this.notes[subject].push(note);
    }

    public registerAttendance(date: string, status: AttendanceStatus): void {
        this.attendance.push({ date, status });
    }

    public calculateAverage(): number {
        let total = 0, count = 0;
        for (const grades of Object.values(this.notes)) {
            total += grades.reduce((a, b) => a + b, 0);
            count += grades.length;
        }
        return count > 0 ? total / count : 0;
    }

    public addEvaluation(evaluation: Evaluation): void {
        this.evaluations.push(evaluation);
    }

    public printEvaluations(): string {
        return this.evaluations.length === 0 ? `${this.name} no tiene evaluaciones registradas.`
            : this.evaluations.map(e => 
                `Materia: ${e.subject}, Tipo: ${e.type}, Fecha: ${e.date}, Nota: ${e.grade}`).join("\n");
    }

    genReport(): string {
        return `Reporte de ${this.name}.\nPromedio: ${this.calculateAverage().toFixed(2)}\nEvaluaciones:\n${this.printEvaluations()}`;
    }

    Info(): string {
        return `Estudiante: ${this.name}, Grado: ${this.grade}, ID: ${this.id}`;
    }
}

// Clase Profesor
class Teacher extends Person {
    constructor(name: string, edad: number, id: number, public subject: string) {
        super(name, edad, id);
    }

    Info(): string {
        return `Profesor: ${this.name}, Materia: ${this.subject}, ID: ${this.id}`;
    }
}

// Clase Horarios
class TimeTable {
    private timeTables: { [grade: string]: [string, string][] } = {};

    public addTimeTables(grade: string, subject: string, timetable: string): void {
        if (!this.timeTables[grade]) {
            this.timeTables[grade] = [];
        }
        this.timeTables[grade].push([subject, timetable]);
    }

    public printTimeTables(grade: string): [string, string][] | undefined {
        return this.timeTables[grade];
    }
}

// Clase genérica para la gestión escolar
class SchoolManage<T extends Person> {
    private records: { [id: number]: T } = {};

    public addPerson(person: T): void {
        if (this.records[person.id]) {
            throw new Error(`El ID ${person.id} ya está registrado.`);
        }
        this.records[person.id] = person;
    }

    public getPerson(id: number): T | null {
        return this.records[id] || null;
    }

    public printPerson(id: number): void {
        const person = this.records[id];
        if (person) {
            console.log(person.Info());
        } else {
            console.log(`No se encontró el ID ${id}.`);
        }
    }
}

// Instancia de gestión escolar para estudiantes y profesores
const studentManager = new SchoolManage<Student>();
const teacherManager = new SchoolManage<Teacher>();

// Crear y registrar un estudiante
const student01 = new Student("Fatima", 20, 1, "Tercer año de Universidad");
studentManager.addPerson(student01);

// Crear y registrar un profesor
const teacher01 = new Teacher("Rosalina", 31, 1, "Lenguaje");
teacherManager.addPerson(teacher01);

// Generar reporte académico del estudiante
console.log(student01.genReport());
console.log("\n");

// Agregar notas
student01.addNote("Lenguaje", 89);
student01.addNote("Matemática", 10);
student01.addNote("Ciencias", 50);
student01.addNote("Sociales", 70);

// Registrar asistencia
student01.registerAttendance("2025-03-01", AttendanceStatus.PRESENTE);
student01.registerAttendance("2025-03-02", AttendanceStatus.AUSENTE);
student01.registerAttendance("2025-03-03", AttendanceStatus.AUSENTE);

// Crear horarios
const timetable01 = new TimeTable();
timetable01.addTimeTables("Tercer año de Universidad", "Lenguaje", "Lunes 10:00 AM");
timetable01.addTimeTables("Tercer año de Universidad", "Matemática", "Martes 8:00 AM");
timetable01.addTimeTables("Tercer año de Universidad", "Ciencia", "Martes 10:00 AM");

// Crear y registrar evaluaciones
const evaluation1 = new Evaluation("Lenguaje", EvaluationType.EXAMEN, "2025-03-15", 85);
const evaluation2 = new Evaluation("Matemática", EvaluationType.TAREA, "2025-03-20", 92);

student01.addEvaluation(evaluation1);
student01.addEvaluation(evaluation2);

// Generar reporte académico del estudiante
console.log(student01.genReport());
console.log("\n");

// Imprimir información del estudiante y profesor
studentManager.printPerson(1);
console.log("\n");
teacherManager.printPerson(1);
