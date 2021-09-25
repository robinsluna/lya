# LYA TEST

####  Descarga el codigo fuente
```sh
    git clone https://github.com/robinsluna/lya.git
    cd lya
    cp .env.example .env
```
------------
#### Conexion a mongdoDB
*editar el archivo .env *
```sh
    MONGODB_URL= mongodb://127.0.0.1:27017/lyn
```
------------
#### Puesta en marcha
```sh
    npm install
    npm start
```
------------
#### Documentacion
```sh
http://localhost:3000/swagger/
```
#### Verificacion MQTT
```sh
npm install mqtt -g
mqtt sub -t 'lyatest/1044425211' -h 'test.mosquitto.org' -v
```


