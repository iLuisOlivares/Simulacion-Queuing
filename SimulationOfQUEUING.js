//Objetivo: Simular el comportamiento de una cola de un supermercado
//By Luis Olivares

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

//Obtener minutos de los intervalos
const getMinutes = (intervals, probabilidad) => {
    for (const value in intervals) { if (probabilidad <= value) { return intervals[value]; } }
}

// Funciones auxiliares
const generarTiempo = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const calcularDiffHoras = (fecha1, fecha2) => {
    const diff = (fecha2.getTime() - fecha1.getTime()) / 1000 / 60
    return Math.abs(Math.round(diff));
}

//Numeros del libro
// const RANDOM_NUMBER_A = [94, 73, 78, 72, 59, 63, 85, 66, 61, 23, 71, 26, 96, 73, 77, 9, 14, 88, 64, 82]
// const RANDOM_NUMBER_S = [35, 46, 34, 70, 97, 80, 40, 94, 55, 43, 15, 67, 78, 21, 22, 41, 35, 87, 35, 29]

//Numeros para comparar con whatif2
const RANDOM_NUMBER_A = [35, 26, 34, 10, 47, 30, 51, 24, 55, 33, 75, 37, 18, 21, 32, 41, 15, 37, 15, 9]
const RANDOM_NUMBER_S = [64, 90, 98, 42, 89, 23, 95, 66, 51, 43, 51, 56, 66, 93, 57, 97, 74, 58, 84, 92]



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

for (let i = 0; i < numero_iteraciones; i++) {

    //Generar numeros aleatorios para Arrival y service
    // const random_number_A = generarTiempo(0, 99);
    // const random_number_S = generarTiempo(0, 99);

    //Usando los numeros del libro
    const random_number_A = RANDOM_NUMBER_A[i];
    const random_number_S = RANDOM_NUMBER_S[i];


    //Generar interrival times y service times
    const interrival_times = getMinutes(interrival_times_intervals, random_number_A);
    const service_times = getMinutes(service_times_intervals, random_number_S);


    //Variables waiting time of customers in Queue e Idle time of server
    let idle_time = 0;
    let waiting_time = 0;

    //Auxiliar para guardar la hora anterior de llegada de cliente
    arrival_hour.setMinutes(arrival_hour.getMinutes() + interrival_times)
    let last_arrival_minutes = arrival_hour;

    if (arrival_hour > service_hour) {

        arrival_time = arrival_hour.toLocaleTimeString('en-US');
        service_start = arrival_hour.toLocaleTimeString('en-US');
        idle_time = calcularDiffHoras(last_arrival_minutes, service_hour)

        service_hour.setHours(arrival_hour.getHours());
        service_hour.setMinutes(arrival_hour.getMinutes() + service_times)
        service_time = service_hour.toLocaleTimeString('en-US');

    } else {
        service_start = service_hour.toLocaleTimeString('en-US');
        arrival_time = arrival_hour.toLocaleTimeString('en-US');
        waiting_time = calcularDiffHoras(service_hour, arrival_hour)

        service_hour.setHours(service_hour.getHours());
        service_hour.setMinutes(service_hour.getMinutes() + service_times);
        service_time = service_hour.toLocaleTimeString('en-US');

    }


    arraySimulation.push({ random_number_A, interrival_times, arrival_time, service_start, random_number_S, service_times, service_time, waiting_time, idle_time })
}

console.table(arraySimulation)
console.table({
    total_waiting_time: arraySimulation.reduce((acc, curr) => acc + curr.waiting_time, 0),
    total_idle_time: arraySimulation.reduce((acc, curr) => acc + curr.idle_time, 0),
})