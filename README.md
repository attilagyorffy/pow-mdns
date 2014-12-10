pow-mdns
========

Advertise Pow applications on the local network using Bonjour or Avahi.

pow-mdns uses multicast DNS services to advertise your Pow applications on the local network. It advertises your Pow applications via `xip.io` domains to access virtual
hosts on your development web server from devices on your local network, like iPads, iPhones, and other computers.

No configuration required!

![image](https://raw.github.com/liquid/pow-mdns/master/screen_shot.png)

### How to install

Make sure to install it globally, so that the executable will be symlinked to `/usr/local/bin/pow-mdns`.

    npm install -g pow-mdns

### How to run

If things went well, you can just run `pow-mdns` from your terminal.

### Credits

This package was made using the following components:

* [mdns](https://www.npmjs.com/package/mdns), to deal with multicast DNS service discovery
* [xip.io](http://xip.io), made by Sam Stephenson of Basecamp.
