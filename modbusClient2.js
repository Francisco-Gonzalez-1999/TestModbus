const ModbusRTU = require('modbus-serial');
const client = new ModbusRTU();

// Dirección IP del PLC y puerto Modbus TCP 
// Por defecto es el 502 ???
const plcAddress = '10.10.100.36';
const plcPort = 502;

// Aqui se intenta conectar al PLC
async function connect() {
    try {
        await client.connectTCP(PLC_IP, { port: PLC_PORT });
        console.log('Conectado al PLC');
    } catch (error) {
        console.error('Error al conectar al PLC:', error);
    }
}

async function readRegisters() {
    try {
        // Aqui se leen los registros emitidos por el PLC mediante MODBUS
        // Por ejemplo, los registros del 40001 a 40016
        const data = await client.readInputRegisters(40001, 40016);
        console.log('Registros leídos:', data.data);
    } catch (error) {
        console.error('Error al leer los registros:', error);
    }
}

// Función para hacer lecturas periódicas cada 10 segundos
async function startReading() {
    await connect();

    setInterval(async () => {
        await readRegisters();
    }, 10000); // 10000 ms, eqiovale a 10 segundos
}

// Ejecutar la función de MODBUS startReading
startReading();
