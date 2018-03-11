# App Comensal
Aplicación privativa para Menú para hoy
# Empezando

Estas instrucciones le permitirán obtener una copia del proyecto en funcionamiento en su máquina local para fines de desarrollo y prueba. Consulte la implementación para obtener notas sobre cómo implementar el proyecto en un sistema en vivo

### Prerequisites

#### Descargar e Intalar [node](https://nodejs.org/es/) 

Descargar en su version LTS de la pagina oficial. Para consultar si la instalación fué correcta, basta con teclear en la consola

```
node -v 
```
Para consultar si se instaló correctamente la version del administrador de paquetes de node, debe teclear

```
npm -v 
```

#### Instalar Ionic

En windows

```
npm install -g cordova ionic
```
En mac o Linux

```
sudo npm install -g cordova ionic
```

#### Instalar Android Studio 

En Linux, Primero debemos instalar Java SE Development Kit 8:

Desde consola ejecutamos los siguientes comandos:

```
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```

Para verificar la versión de java instalada escribimos:  

```
java -version
```

Ahora para configurar las variables de entorno escribimos lo siguiente:
```
sudo apt-get install oracle-java8-set-default
```

Para versiones de 64 bits tenemos que instalar los siguientes paquetes:

```
sudo dpkg --add-architecture amd64
sudo apt-get update
sudo apt-get install libncurses5:amd64 libstdc++6:amd64 zlib1g:amd64
```

Por ultimo Instalamos Android studio via ppa con los siguientes comandos:

```
sudo apt-add-repository ppa:paolorotolo/android-studio
sudo apt-get update
sudo apt-get install android-studio lib32stdc++6 mesa-utils
cd /opt/android-studio/bin
./studio.sh
```

#### Instalando Android Studio en Windows 

Instalamos java SE

Descargamos la última versión de aqui:

http://www.oracle.com/technetwork/es/java/javase/downloads/index.html

Buscamos variables de entorno en el panel de control, le damos añadir nueva y le damos el nombre de JAVA_HOME.

Despues le damos a examinar directorio y buscamos donde esta la carpeta del jdk, en mi caso en C:\Program Files\Java\jdk1.8.0_101

Le damos a aceptar y listo.

Ahora descargamos android studio de aquí:

https://developer.android.com/studio/install.html

Una vez descargado lo ejecutamos el instalador y ya tendríamos Android studio funcionando.

Ya configurada las harramintas de desarrollo, podremos clonar nuestro proyecto.

### Instalando 

Como primer paso debe clonar este repositorio via **https**

```
$git clone https://Osman8a2@bitbucket.org/menuparahoy_cl/comensal2.0.git
o con la cuenta de menu para hoy
git clone https://menuparahoycl@bitbucket.org/menuparahoy_cl/comensal2.0.git
(la autenticación se hace con la clave que tenga en gmail)
```

o tambien puede clonarlo via **ssh**

```
git@bitbucket.org:menuparahoy_cl/comensal2.0.git
```

Posteriormente debe situarse en la carpeta del proyecto e instalar todas las dependencia, usando npm o yarn. 

en caso de usar **yarn** 
```
$cd Comensal2.0 && yarn install
```
en caso de usar **npm** 
```
$cd Comensal2.0 && npm install
```

Subsiguintemente 

para correr la app 
```
$ionic serve-l [o con: yarn run android]
```

## Desarrollado con 

* [FireBase](https://firebase.google.com/?hl=es-419) -  plataforma para el desarrollo de aplicaciones web y aplicaciones móviles
* [Ionic2](https://ionicframework.com/docs/intro/installation/) - framework para el desarrollo de aplicaciones híbridas, inicialmente pensado para móviles y tablets, aunque ahora también capaz de implementar aplicaciones web e incluso dentro de poco aplicaciones de escritorio multiplataforma


## Contribución

aún no pose

## Versionado

Nosotros estamos usando [SemVer](http://semver.org/) para el versionamiento. y gitFlow para la gestión de ramas en nuestro repositorio [gitFlow](https://danielkummer.github.io/git-flow-cheatsheet/). 

## Autores

* **Osman Ochoa** - *Initial work* - [Osman8a](https://github.com/Osman8a)


## Licencia

Est proyecto se encuentra bajo licencia MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Agradecimintos


* etc