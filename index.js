/*

  Pow application advertisement via mDNS (Avahi/Bonjour)

  1) ✓ Find all Pow applications automatically
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

var mdns = require('mdns');
var os = require('os');
var fs = require('fs');

function getPowApplications() {
  function getPowDirectoryPath() {
    return process.env.HOME + '/.pow';
  }
  return fs.readdirSync(getPowDirectoryPath());
}

var pow_applications = getPowApplications();

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
  var hostname = null;
  var interfaces = require('os').networkInterfaces();
  for (var dev in interfaces) {
    interfaces[dev].forEach(function (details) {
      if (details.family == 'IPv4') {
        var addr = details.address;
        if (addr == '127.0.0.1') return;
        if (addr == 'undefined') return;
        hostname = addr;
      }
    });
  }
  if (hostname == null) {
    throw new Error('Could not detect IPv4 hostname.');
    process.exit(1);
  }
  else {
    start_advertisement(hostname);
  }
})();
