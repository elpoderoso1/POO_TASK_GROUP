import * as readline from "readline";
import { movieList } from "./movies_list";

// Enums para los tipos de contenido y niveles de suscripción
enum ContentType {
    MOVIE = "Movie",
    SERIES = "Series",
    DOCUMENTARY = "Documentary"
}

enum SubscriptionType {
    BASIC = "Basic",
    PREMIUM = "Premium",
    VIP = "VIP"
}

const SubscriptionPrices: Record<SubscriptionType, number> = {
    [SubscriptionType.BASIC]: 5.99,
    [SubscriptionType.PREMIUM]: 9.99,
    [SubscriptionType.VIP]: 14.99
};

// Tipos para los datos del usuario y la plataforma
type User = {
    id: string;
    name: string;
    email: string;
    subscription: SubscriptionType;
};


class StreamingPlatform {
    private users: User[] = [];

    registerUser(user: User): void {
        if (this.users.find(u => u.email === user.email)) {
            throw new Error("El correo ya está registrado.");
        }
        this.users.push(user);
    }

    processPayment(userId: string): boolean {
        const user = this.users.find(u => u.id === userId);
        if (!user) throw new Error("Usuario no encontrado.");

        const amount = SubscriptionPrices[user.subscription];
        console.log(`Pago procesado de $${amount} para el usuario ${user.name}`);
        return true;
    }

    generateRecommendation(category: string): string | null {
        const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
        const availableContent: { id: string; title: string }[] | undefined = movieList[formattedCategory];

if (!availableContent || availableContent.length === 0) {
    console.log("No hay contenido disponible en esta categoría.");
    return null;
}
        
        if (!availableContent || availableContent.length === 0) {
            console.log("No hay contenido disponible en esta categoría.");
            return null;
        }
        return availableContent[Math.floor(Math.random() * availableContent.length)].title;
    }
    
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const platform = new StreamingPlatform();

function askQuestion(query: string): Promise<string> {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    try {
        const userName = await askQuestion("Ingrese su nombre: ");
        const userEmail = await askQuestion("Ingrese su email: ");
        const userSubscription = await askQuestion("Ingrese su tipo de suscripción (Basic/Premium/VIP): ");

        platform.registerUser({
            id: "1",
            name: userName,
            email: userEmail,
            subscription: userSubscription as SubscriptionType
        });

        console.log("Procesando pago de suscripción...");
        platform.processPayment("1");
        
        let category: string;
        let recommendation: string | null;
        do {
            category = await askQuestion("Elija una categoría (Movie/Series/Documentary): ");
            recommendation = platform.generateRecommendation(category);
        } while (!recommendation);
        
        console.log("Te recomendamos ver:", recommendation);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Se produjo un error desconocido.");
        }
    } finally {
        rl.close();
    }
}

main();