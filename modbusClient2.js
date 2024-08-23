const ModbusRTU = require('modbus-serial');
const client = new ModbusRTU();

// Dirección IP del PLC y puerto Modbus TCP 
// const plcAddress = '10.10.106.241';
const plcAddress = '10.74.103.8';

// Función para convertir un valor de 16 bits sin signo.... a un valor con signo
// En valores de 16 bits, los numeros positivos (con signo) no requieren ninguna conversion
// Pero los valores de 16 bits sin signo (En este caso, los negativos con signo -) si requieren conversion
// En este caso, el rango -32768 a 32767 en total son 65536, por lo que al llegar un numero negativo, se resta 655536

// Este detalle adicional se presenta debido a que en Modbus, los datos se almacenan como valores enteros sin signo de 16 bits

// function toSigned16Bit(value) {
//     // int 	16	-32768 a 32767
//     // Si el valor es mayor o igual a 32768, es negativo en la representación de 16 bits con signo
//     if (value >= 32768) {
//         return value - 65536 / 100; // 65536 es 2^16
//     }
//     return value;
// }

function divideByOneHundred(value) {
    return value / 100;
}

// Aqui se intenta conectar al PLC
async function connect() {
    try {
        await client.connectTCP(plcAddress);
        console.log('Conectado al PLC');
    } catch (error) {
        console.error('Error al conectar al PLC:', error);
    }
}

async function readRegisters() {
    try {
        // Aqui se leen los registros emitidos por el PLC mediante MODBUS
        // Por ejemplo, los registros del 40001 a 40016
        const data = await client.readHoldingRegisters(0, 126);
        // Convertir los valores leídos a enteros con signo
        // const signedData = data.data.map(toSigned16Bit);
        const signedData = data.data.map(divideByOneHundred);
        console.log(`Registros leídos desde ${plcAddress} MODBUS:`, signedData);
    } catch (error) {
        console.error('Error al leer los registros:', error);
    }
}

// Función para hacer lecturas cada 10 segundos
async function startReading() {
    await connect();

    setInterval(async () => {
        await readRegisters();
    }, 3000); // 8000 ms, equivale a 8 segundos
}

// Ejecutar la función de MODBUS startReading
startReading();
