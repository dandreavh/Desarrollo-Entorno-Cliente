# Preparación de entorno

Copia los siguientes ficheros al raíz de tu espacio de trabajo del módulo:

- docker-compose.yml
- carpeta db_files
- carpeta phpdocker

# Despliegue de entorno

```bash
docker-compose up
```
Eso dejará una consola abierta con la ejecución de los contenedores, si quieres pararlo, pulsa ```Ctrl-C```.

Si lo prefieres, puedes dejar la ejecución en modo demonio mediante el siguiente comando:

```bash
docker-compose up -d
```

# Puertos que tienen que ser libres

- server web (nginx) -> 8090
- mariadb -> 8093
- phpmyadmin -> 8080 

Se tendrán a disposición las siguientes URLs:

- http://localhost:8090/   (como URL base. A partir de aquí y siguiendo ruta relativa hasta el fichero, podréis servir localmente vuestros ficheros html y php. Por ejemplo http://localhost:8090/U6/U6T1/6_Ajax-Texto.html)
- http://localhost:8080/   (para gestionar la BD con phpmyadmin)