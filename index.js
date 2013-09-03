/*

  Pow application advertisement via mDNS (Avahi/Bonjour)

  1) Find all Pow applications automatically
  2) ✓ query local network host
  3) ✓ generate xip-io hostname
  4) ✓ advertise the host on the network
  5) find out how to bloody test this

  TODO:

  Per application based advertising
  ---------------------------------
  Allow per-application based advertising. Possibly through a .announce file in the application root.

  OS X app
  --------
  Add a main screen where could list all applications and display a QR code that points to the hosts
  so that people with mobile devices could quickly access the host

*/


/*

  This should be automated, but for now we list all applications that we want to advertise.
  Do NOT add the .dev fragment of the host. For example to advertise example.dev, add 'example'

*/

var pow_applications = ['example', 'pow']; // these will start advertising example.dev and pow.dev

var mdns = require('mdns');
var dns = require('dns');

function start_advertisement(local_hostname) {
  process.stdout.write('DO THE LOCOMOTION!\n\n');
  
  function xip_io_hostname(fragment) {
    return fragment + '.' + local_hostname + '.xip.io';
  }
  
  // Loop through the applications and start advertising them
  for (var i = 0; i < pow_applications.length; i++) {
    var app_name = pow_applications[i];
    var local_pow_host = app_name + '.dev';
    var xip_host = xip_io_hostname(app_name);
    
    var ad = mdns.createAdvertisement(mdns.tcp('http'), 80, { name: local_pow_host, host: xip_host });
    ad.start();
    
    process.stdout.write('- ' + local_pow_host + ' => ' + xip_host + '\n');
  }
}

// Query the local hostname and start advertisement when ready.
(function() {
  dns.lookup(require('os').hostname(), function (err, address, family) {
    start_advertisement(address);
  });
})();
