# Используем официальный образ Node.js
FROM node:23-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Устанавливаем Parcel глобально
RUN npm install -g parcel-bundler

# Открываем порт для разработки
EXPOSE 1234
EXPOSE 44489

# Запускаем Parcel для разработки
# CMD ["parcel", "index.html"]
