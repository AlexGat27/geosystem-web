FROM node:latest AS web-server

# Устанавливаем рабочую директорию для бэкенда
WORKDIR /app/web-server

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости бэкенда
RUN npm install

# Копируем все файлы бэкенда в рабочую директорию
COPY . .

# Запускаем приложение при старте контейнера
CMD ["npm", "start"]