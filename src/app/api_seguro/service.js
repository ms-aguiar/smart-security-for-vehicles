var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Back-End do Seguro',
  description: 'Efetua os cálculos e monitora o db',
  script: 'C:\\Users\\Matheus Aguiar\\Desktop\\Curso Node.js\\tcc_plataforma_web\\src\\app\\api_seguro\\service.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();