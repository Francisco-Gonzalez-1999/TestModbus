// 1.- Conectarnos al PLC
// 2.- Hacer una funcion que lea los registros
// 3.- Hacer una funcion que lea los registros una vez conectado al PLC

const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

const plcAddress = '10.10.106.241';

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
    } catch (error) {
        
    }
}

function toSigned16Bit(value) {
    if (value >= 32768) {
        
    }
}