const ModbusRTU = require('modbus-serial');
const client = new ModbusRTU();

// Códigos de escape ANSI para colores
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';

// Dirección IP del PLC y puerto Modbus TCP 
// Por defecto es el 502 ???
const plcAddress = '10.10.100.36';
const plcPort = 502;

async function readModbusData() {
  try {
    // Se conecta con el al servidor Modbus TCP
    await client.connectTCP(plcAddress, { port: plcPort });
    
    // ID de sclavo Modbus (la dirección del dispositivo)
    client.setID(1); 

    // Aqui se leen los registros 
    // Ejemplo: leer 10 registros de la dirección 40001)
    const startAddress = 40001;
    const numberOfRegisters = 10;
    
    const data = await client.readHoldingRegisters(startAddress, numberOfRegisters);

    // Mostrar los valores de los registros
    console.log('Valores de los registros:');
    data.data.forEach((value, index) => {
      console.log(`Registro ${startAddress + index}: ${value}`);
    });

    client.close();
  } catch (err) {
    console.error(`${RED}Error:${YELLOW}`, err.message);
  }
}

// Ejecutar la función de MODBUS readModbusData
readModbusData();
