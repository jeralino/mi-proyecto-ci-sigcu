# Imagen base
FROM node:20-alpine

# Crear carpeta de trabajo
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install --only=production

# Copiar el código
COPY src ./src

# Exponer puerto
EXPOSE 4000

# Comando de arranque
CMD ["node", "src/index.js"]

