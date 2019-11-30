## Instalação

- Entre nas pastas backend, frontend e mobile e de um **npm install** ou **yarn** para a instalação das dependencias.

- no backend entre: src/index.js e altere a linha do **mongoose.connect**
  - pode usar o docker para subir um container em mongo:

```
docker run --name mongoinsta -p 27017:27017 -d -t mongo
```

### No Backend e Frontend

```
yarn dev
```

### No Mobile

```
react-native run-ios ou android
```

<img src=".github/example.gif" />
