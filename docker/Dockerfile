# Используем официальный образ Node.js
FROM node:23-alpine

# Install python/pip (нужно для node-gyp который хочет его для parcel-bundler)
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
# это тоже хочет node-gyp для сборки
RUN apk --no-cache add build-base lscpu

# RUN python3 -m ensurepip
# RUN pip3 install --no-cache --upgrade pip setuptools

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Устанавливаем Parcel глобально
RUN npm install -g parcel-bundler --loglevel verbose

# Открываем порт для разработки
EXPOSE 1234
EXPOSE 44489

# Запускаем Parcel для разработки
# CMD ["parcel", "index.html"]
