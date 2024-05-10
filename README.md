PROTECTO 4: CRM con Tailwind y React Router DOM
===============================================

node: v16.13.0
npm: 8.1.0


Iniciar el proyecto con vite e instalar taiwind

```
    npm create vite@latest
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
```

Modificar el fichero de configuración de tailwind 'tailwind.config.js' para especificar los ficheros que usarán tailwinds

```
module.exports = {
  content: ['index.html', './src/**/*.jsx'],

  [...]

```

Importar los módulos de tailwind en index.css

```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

Instalar React Router DOM

```
    npm install react-router-dom@6.4.0

```


Instalar un REST API Server Fake y ejecutarlo
```
    npm install -g json-server
    json-server --watch db.json
```




EJECUTAR EL PROYECTO:


1. Iniciar el entorno de NODE

```
. ../env/bin/activate
```


2. Arrancar el servidor json para la API:
```
    json-server --watch db.json
```


3. Arrancar la app
```
    npm run dev
```