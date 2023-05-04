//Objetivo: Simular el comportamiento de una cola de un supermercado


const interrival_times_intervals = {
    9: 2,
    34: 4,
    69: 6,
    89: 8,
    99: 10
}

const service_times_intervals = {
    14: 1,
    31: 3,
    61: 5,
    89: 7,
    99: 9
}
const service_times_fast_intervals = {
    30: 2,
    90: 5,
    99: 7
}

//Obtener minutos de los intervalos
const getMinutes = (intervals, probabilidad) => {
    for (const value in intervals) {
        if (probabilidad <= value) {
            return intervals[value];
        }
    }
}

// Funciones auxiliares
const generarTiempo = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const calcularDifHoras = (fecha1, fecha2) => {
    const diff = (fecha2.getTime() - fecha1.getTime()) / 1000 / 60
    return Math.abs(Math.round(diff));
}

//Numeros del libro
const RANDOM_NUMBER_A = [25, 16, 24, 10, 27, 20, 10, 14, 5, 23, 35, 27, 38, 11, 22, 11, 25, 17, 15, 9]
const RANDOM_NUMBER_S = [94, 90, 98, 72, 89, 73, 95, 86, 91, 83, 61, 86, 76, 93, 87, 97, 94, 78, 84, 92]


//Tiempo actual de la simulación
let arrival_hour = new Date();
let service_hour = new Date();

//Inicializamos las horas a las 9:00 am
arrival_hour.setHours(9, 0, 0, 0);
service_hour.setHours(9, 0, 0, 0);

// Variables comienzo de servicio y tiempo de llegada del cliente y tiempo de servicio
let service_start;
let arrival_time;
let service_time;

//Array de objetos en el que guardamos el resultado de cada iteracion
let arraySimulation = [];

const numero_iteraciones = RANDOM_NUMBER_A.length;
let last_waiting = 0
for (let i = 0; i < numero_iteraciones; i++) {

    //Generar numeros aleatorios para Arrival y service
    // const random_number_A = generarTiempo(0, 99);
    // const random_number_S = generarTiempo(0, 99);

    //Usando los numeros del libro
    const random_number_A = RANDOM_NUMBER_A[i];
    const random_number_S = RANDOM_NUMBER_S[i];


    //Generar interrival times y service times
    const interrival_times = getMinutes(interrival_times_intervals, random_number_A);

    const service_times = (last_waiting > 5)
        ? getMinutes(service_times_intervals, random_number_S)
        : getMinutes(service_times_fast_intervals, random_number_S)


    //Variables waiting time of customers in Queue e Idle time of server
    let idle_time = 0;
    let waiting_time = 0;

    //Auxiliar para guardar la hora anterior de llegada de cliente
    arrival_hour.setMinutes(arrival_hour.getMinutes() + interrival_times)
    let last_arrival_minutes = arrival_hour;

    if (arrival_hour > service_hour) {

        arrival_time = arrival_hour.toLocaleTimeString('en-US');
        service_start = arrival_hour.toLocaleTimeString('en-US');
        idle_time = calcularDifHoras(last_arrival_minutes, service_hour)

        service_hour.setMinutes(arrival_hour.getMinutes() + service_times)
        service_time = service_hour.toLocaleTimeString('en-US');

    } else {
        service_start = service_hour.toLocaleTimeString('en-US');
        arrival_time = arrival_hour.toLocaleTimeString('en-US');
        waiting_time = calcularDifHoras(service_hour, arrival_hour)
        service_hour.setMinutes(service_hour.getMinutes() + service_times);
        service_time = service_hour.toLocaleTimeString('en-US');

    }

    last_waiting = waiting_time

    arraySimulation.push({ random_number_A, interrival_times, arrival_time, service_start, random_number_S, service_times, service_time, waiting_time, idle_time })
}

console.table(arraySimulation)
console.table({
    total_waiting_time: arraySimulation.reduce((acc, curr) => acc + curr.waiting_time, 0),
    total_idle_time: arraySimulation.reduce((acc, curr) => acc + curr.idle_time, 0),
})