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

abstract class Reports {
    abstract genReport(): string;
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

    constructor(
        name: string,
        edad: number,
        id: number,
        public degree: string
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

    genReport(): string {
        return `Reporte de ${this.name}\nPromedio ${this.calculateAverage().toFixed(2)}.`;
    }

    Info(): string {
        return `Estudiante: ${this.name}\nGrado ${this.degree}\nID: ${this.id}`;
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
        return `Profesor: ${this.name}\nMateria: ${this.subject}\nID: ${this.id}`;
    }
}

class TimeTable {
    private TimeTables: { [grado: string]: [string, string][] } = {};

    public addTimeTables(degree: string, subject: string, timetable: string): void {
        if (!this.TimeTables[degree]) {
            this.TimeTables[degree] = [];
        }
        
        this.TimeTables[degree].push([subject, timetable]);
    }

    public printTimeTables(degree: string): [string, string][] | undefined {
        return this.TimeTables[degree];
    }
}

class SchoolManage {
    private student: { [id: number]: Student } = {};
    private teacher: { [id: number]: Teacher } = {};
    private timetable: TimeTable = new TimeTable();
}