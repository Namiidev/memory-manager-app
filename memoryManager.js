const os = require('os');
const Table = require('cli-table3');

const table = new Table({
  head: ['Total', 'Used', 'Free'],
  colWidths: [15, 15, 15]
});

setInterval(() => {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  const memoryUsage = {
    total: formatBytes(totalMemory),
    used: formatBytes(usedMemory),
    free: formatBytes(freeMemory)
  };

  table.splice(0);  // Elimina todas las filas existentes en la tabla
  table.push([memoryUsage.total, memoryUsage.used, memoryUsage.free]);
  console.clear();
  console.log(table.toString());
}, 3000);

// Función auxiliar para formatear los bytes en una forma más legible
function formatBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = (bytes / Math.pow(1024, index)).toFixed(2);
  return `${size} ${units[index]}`;
}
