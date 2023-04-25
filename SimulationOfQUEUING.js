// Parámetros de la simulación
const tiempoSimulacion = 10000; // tiempo de simulación en unidades de tiempo

// tiempo actual de la simulación
let reloj = 0;
let fecha_arrival = new Date();
let fecha_service = new Date();


const InterrivalTimes = (probabilidad) => {

    if (probabilidad < 0.10) {
        return 2;
    }
    if (probabilidad < 0.35) {
        return 4;
    }
    if (probabilidad < 0.70) {
        return 6;
    }
    if (probabilidad < 0.90) {
        return 8;
    }
    else {
        return 10;
    }
}


const serviceTimes = (probabilidad) => {

    if (probabilidad < 0.15) {
        return 1;
    }
    if (probabilidad < 0.32) {
        return 3;
    }
    if (probabilidad < 0.62) {
        return 5;
    }
    if (probabilidad < 0.90) {
        return 7;
    }
    else {
        return 9;
    }
}


// Funciones auxiliares
const generarTiempo = () => {
    return Math.random()
}

// Función principal
let service_start;
let arrival_time;
let service_time;
setInterval(function () {


    //Generar numeros aleatorios para Arrival y servie
    const random_number_A = generarTiempo();
    const random_number_S = generarTiempo();


    //Generar interrival times y service times
    const interrival_times = InterrivalTimes(random_number_A);
    const service_times = serviceTimes(random_number_S);

    fecha_arrival.setMinutes(fecha_arrival.getMinutes() + service_times)

    if (fecha_arrival > fecha_service) {
        console.log(fecha_arrival.toLocaleTimeString('en-US'), fecha_service.toLocaleTimeString('en-US'), "arrival time es mayor que  service end")
        arrival_time = fecha_arrival.toLocaleTimeString('en-US');
        service_start = fecha_arrival.toLocaleTimeString('en-US');
        fecha_service.setMinutes(fecha_arrival.getMinutes() + service_times)
        service_time = fecha_service.toLocaleTimeString('en-US');


    } else {
        service_start = fecha_service.toLocaleTimeString('en-US');
        arrival_time = fecha_arrival.toLocaleTimeString('en-US');

        fecha_service.setMinutes(fecha_service.getMinutes() + service_times);
        service_time = fecha_service.toLocaleTimeString('en-US');

    }



    console.table({ random_number_A, interrival_times, arrival_time, service_start, random_number_S, service_times, service_time })
}, 1000);

