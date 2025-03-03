// Interfaces de cada sección
interface IGestionCartelera {
    agregarPelicula(pelicula: Pelicula): void;
    eliminarPelicula(nombre: string): void;
    mostrarCartelera(): void;
}

interface IVentaBoletos {
    ventaBoletos(peliculaNombre: string, asiento: string): void;
    mostrarBoletos(): string[];
    mostrarTotal(): number;
}

interface IReservaAsientos {
    reservarAsiento(peliculaNombre: string, asiento: string): void;
    mostrarReserva(peliculaNombre: string): string[];
    mostrarTotal(): number;
}

interface IVentaSnacks {
    agregarSnack(snack: Snack): void;
    venderSnack(snackNombre: string): void;
    mostrarSnacks(): string[];
    mostrarTotal(): number;
}

interface ICalculoPromos {
    calcularPromo(boletos: number, snacks: number): number;
}

interface IReporteTaquilla {
    generarReporte(): string;
}


// Clases abstractas
abstract class Pelicula {
    public nombre: string;
    public duracion: number;

    constructor(nombre: string, duracion: number) {
        this.nombre = nombre;
        this.duracion = duracion;
    }

    public abstract mostrarDetalles(): void;
}

abstract class Venta {
    public cantidad: number;
    public total: number;

    constructor(cantidad: number) {
        this.cantidad = cantidad;
        this.total = 0;
    }

    public abstract procesarVenta(): void;
}


// Clases concretas

class Snack {
    public nombre: string;
    public precio: number;

    constructor(nombre: string, precio: number) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class PeliculaA extends Pelicula implements IGestionCartelera {
    private horarios: string[];
    private peliculas: Pelicula[] = [];

    constructor(nombre: string, duracion: number, horarios: string[]) {
        super(nombre, duracion);
        this.horarios = horarios;
    }

    public mostrarDetalles(): void {
        console.log(`Pelicula: ${this.nombre}, duración: ${this.duracion} min`);
        console.log(`Horarios disponibles: ${this.horarios.join(', ')}`);
    }

    public agregarPelicula(pelicula: Pelicula): void {
        this.peliculas.push(pelicula);
        console.log(`Película '${pelicula.nombre}' agregada a la cartelera.`);
    }

    public eliminarPelicula(nombre: string): void {
        this.peliculas = this.peliculas.filter(pelicula => pelicula.nombre !== nombre);
    }

    public mostrarCartelera(): void {
        console.log('Cartelera Actual:');
        this.peliculas.forEach(pelicula => pelicula.mostrarDetalles());
    }
}

class VentaBoletos extends Venta implements IVentaBoletos {
    public boletosVendidos: string[];

    constructor(cantidad: number) {
        super(cantidad);
        this.boletosVendidos = [];
    }

    public ventaBoletos(peliculaNombre: string, asiento: string): void {
        this.boletosVendidos.push(`Pelicula: ${peliculaNombre}, Asiento: ${asiento}`);
        console.log(`Boleto vendido para la película: ${peliculaNombre}, asiento: ${asiento}`);
    }

    public procesarVenta(): void {
        this.total = this.cantidad * 6;  
        console.log(`Venta realizada por $${this.cantidad} boletos, Total: $${this.total}`);
    }

    public mostrarBoletos(): string[] {
        return this.boletosVendidos;
    }

    public mostrarTotal(): number {
        return this.total;
    }
}

class ReservaAsiento extends Venta implements IReservaAsientos {
    public asientosReservados: string[];

    constructor(cantidad: number) {
        super(cantidad);
        this.asientosReservados = [];
    }

    public procesarVenta(): void {
        this.total = this.cantidad * 3;   
        console.log(`Reserva realizada por : $${this.cantidad} asientos, Total: $${this.total}`);
    }

    public reservarAsiento(peliculaNombre: string, asiento: string): void {
        this.asientosReservados.push(`Pelicula: ${peliculaNombre}, Asiento: ${asiento}`);
        console.log(`Asiento reservado para la película: ${peliculaNombre}, asiento: ${asiento}`);
    }

    public mostrarReserva(peliculaNombre: string): string[] {
        return this.asientosReservados.filter(reserva => reserva.includes(peliculaNombre));
    }

    public mostrarTotal(): number {
        return this.total;
    }
}

class VentaSnack extends Venta implements IVentaSnacks {
    public snackVendidos: string[];
    public snacks: Snack[] = [];

    constructor(cantidad: number) {
        super(cantidad);
        this.snackVendidos = [];
    }

    public agregarSnack(snack: Snack): void {
        this.snacks.push(snack);
        console.log(`Snack agregado: ${snack.nombre}`);
    }

    public venderSnack(snackNombre: string): void {
        const snack = this.snacks.find(snack => snack.nombre === snackNombre);
        if (snack) {
            this.snackVendidos.push(snack.nombre);
            this.total += snack.precio;   
            console.log(`Snack vendido: ${snack.nombre}`);
        } else {
            console.log(`Snack con nombre ${snackNombre} no encontrado.`);
        }
    }

    public procesarVenta(): void {
        console.log(`Venta realizada por $${this.cantidad} snacks, Total: $${this.total}`);
    }

    public mostrarSnacks(): string[] {
        return this.snackVendidos;
    }

    public mostrarTotal(): number {
        return this.total;
    }
}

class Promocion implements ICalculoPromos {
    public calcularPromo(boletos: number, snacks: number): number {
        let descuento = 0;

        if (boletos >= 5 && snacks >= 3) {
            descuento += 10;
        } else if (boletos >= 7) {
            descuento += 15;
        }

        return descuento;
    }
}

class ReporteTaquilla implements IReporteTaquilla {
    public totalRecaudado: number;

    constructor(totalRecaudado: number) {
        this.totalRecaudado = totalRecaudado;
    }

    public generarReporte(): string {
        return `El total recaudado en taquilla es: $${this.totalRecaudado}`;
    }
}


//Podemos realizar la gestion de varias formas, ejemplo de uso:
const pelicula1 = new PeliculaA('Limitless', 148, ['10:00 AM', '01:00 PM', '04:00 PM']);
pelicula1.mostrarDetalles();
 
const pelicula2 = new PeliculaA('Matrix', 136, ['11:00 AM', '02:00 PM', '05:00 PM']);
pelicula2.mostrarDetalles();
 
// Crear snacks
const snack1 = new Snack('Palomitas', 2.5);
const snack2 = new Snack('Gaseosa', 1.5);

// Crear venta de boletos
const ventaBoletos1 = new VentaBoletos(3);

// Crear reserva de asientos
const reservaAsientos1 = new ReservaAsiento(2);

// Crear venta de snacks
const ventaSnack1 = new VentaSnack(5);

// Crear promoción
const promocion = new Promocion();

// Crear reporte de taquilla
const reporteTaquilla = new ReporteTaquilla(1000);

// Ejemplo de agregar una película a la cartelera
pelicula1.agregarPelicula(pelicula2);

// Ejemplo de vender boletos
ventaBoletos1.ventaBoletos('Limitless', 'A1');   
ventaBoletos1.procesarVenta();   

// Ejemplo de reservar un asiento
reservaAsientos1.reservarAsiento('Limitless', 'B2');   
reservaAsientos1.procesarVenta();   

// Ejemplo de agregar y vender un snack
ventaSnack1.agregarSnack(snack1);   
ventaSnack1.venderSnack('Palomitas');   
ventaSnack1.procesarVenta();   

// Ejemplo de generar reporte de taquilla
console.log(reporteTaquilla.generarReporte());

// Mostrar los resultados
console.log('Boletos vendidos:', ventaBoletos1.mostrarBoletos());  
console.log('Snacks vendidos:', ventaSnack1.mostrarSnacks());  
console.log('Reservas de asientos:', reservaAsientos1.mostrarReserva('Limitless'));

// Mostrar totales de cada sección
console.log(`Total de boletos vendidos:', $${ventaBoletos1.mostrarTotal()}`);  
console.log(`Total de snacks vendidos:', $${ventaSnack1.mostrarTotal()}`);   
console.log(`Total de reservas de asientos:', $${reservaAsientos1.mostrarTotal()}`);  


