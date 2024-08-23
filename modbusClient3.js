// 1.- Conectarnos al PLC
// 2.- Hacer una funcion que lea los registros
// 3.- Hacer una funcion que lea los registros una vez conectado al PLC

const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

const plcAddress = '10.74.103.8';

async function connect() {
    try {
        await client.connectTCP(plcAddress);
    } catch (error) {
        console.error('Error al conectar al PLC:', error);
    }
}

async function readRegisters() {
    try {
        const data = await client.readHoldingRegisters(0,20);
        const signedData = data.data.map(divideByOneHundred);
        console.log(`Registros leídos desde ${plcAddress} MODBUS:`, signedData);
    } catch (error) {
        console.error('Error al leer los registros:', error);
    }
}

function divideByOneHundred(value) {
    return value / 100;
}

async function startReading() {
    await connect();

    setInterval(async () => {
        await readRegisters();
    }, 3000);
}

startReading();
