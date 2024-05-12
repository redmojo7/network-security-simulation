## Run the brute force attack using Hydra

```
hydra -l root -P passwords.txt ssh://{target_ip}
```

## Add Snort Alert
```
alert tcp any any -> $HOME_NET 22 (msg:"SSH Brute Force Attack"; flags:S,12 threshold:type both, track by_src, count 5 seconds 60; sid:9999990; rev:1;)
```

## Enable UFW
```
sudo ufw enable
sudo ufw deny from 192.168.1.114 to any port 22
sudo ufw allow ssh
sudo ufw status
```

## Check Alive SSH Sessions
```
last -a | grep still
```

## Kill SSH Sessions
```
fuser -k /dev/pts/7
```
