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

### Detecting Semicolons in Input with Snort

To detect semicolons in input, use the following Snort rule:

```plaintext
alert tcp $HOME_NET any -> $EXTERNAL_NET 3000 (msg:"Possible command injection attempt - semicolon in input (\;)"; content:"%3B"; nocase; sid:1000001; rev:1;)
```

### Detecting Multiple Commands in Input with Snort

To detect multiple commands in input, use the following Snort rule:

```plaintext
alert tcp $HOME_NET any -> $EXTERNAL_NET 3000 (msg:"Possible command injection attempt - multiple commands in input (&&)"; content:"%26%26"; nocase; sid:1000002; rev:1;)
```