/*
1. Качаем Docker Desktop https://www.docker.com/
2. docker images - посмотреть какие имиджи есть локально на пк
3. docker ps - выводит инфу какие контейнеры сейчас запущены
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 Если docker дает ошибку то нужно проверить разрешено ли запускать конейнеры на windows:
The error is related to that part:

In the default daemon configuration on Windows, the docker client must be run elevated to connect

You can do this in order to switch Docker daemon:

1. Open Powershell as administrator
2. Run following command: cd "C:\Program Files\Docker\Docker"
./DockerCli.exe -SwitchDaemon
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

4. Для создания своего образа нужно выполнить команду : docker build -t nestjs-rest-api .
t - это тег как мы назовем наш новый образ
. - указываем путь к тому с чего создаем образ , точка означает текущую директорию

Если получаем ошибку то не создан  Dockerfile:
[+] Building 0.2s (2/2) FINISHED
 => [internal] load build definition from Dockerfile                                                                                                                                                                                  0.2s
 => => transferring dockerfile: 2B                                                                                                                                                                                                    0.0s
 => [internal] load .dockerignore                                                                                                                                                                                                     0.1s
 => => transferring context: 2B                                                                                                                                                                                                       0.0s
failed to solve with frontend dockerfile.v0: failed to read dockerfile: open /var/lib/docker/tmp/buildkit-mount235895300/Dockerfile: no such file or directory

5.Создаем файл без расширения с именем Dockerfile в папке проекта:
FROM node:12.13-alpine As development -> https://hub.docker.com/_/node тут можно найти базовые образы NodeJs , alpine - означает компактная сборка ноды

RUN mkdir -p /usr/src/app -> создаем рабочую папку 

WORKDIR /usr/src/app  -> переходим в этот каталог

COPY package*.json ./ -> копирует 1-й параметр откуда и 2-й парм. куда  (copy only package.json and package-lock.json)

RUN npm install --only=development -> запустили в той папке установку модулей только devDependencies

EXPOSE 3000  -> указываем через какой порт будем пробрасывать связь

ENV TZ Europe/Kyiv -> создали переменную окружения TZ таймзона или альтернативный способ через парам -e при запуске: docker run --name MyNestJsApp -d --rm -p 3000:3000 -e TZ=Europe/Kyiv nestjs-rest-api

COPY . . -> копируем остальные наши файлы приложения в контейнер докера

RUN npm run build

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production ->  install only dependencies defined in dependencies in package.json

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"] -> команда которая говорит что нужно сделать когда запускаеться контейнер (docker start или docker run)
* можно так же вместо CMD (запускает через shell т.е запускаеться оболочка bin sh) использовать ENTRYPOINT ["node", "dist/main"] -> он выполняет без shell

6. И запускаем снова: docker build -t nestjs-rest-api .
7. Далее запускаем: docker run --name MyNestJsApp nestjs-rest-api и проверить командой docker ps что контейнер запущен (либо docker ps -a -> если контейнер был запущен и остановлен т.к все выполнил)
8. docker rm 'имя контейнера или ID' -> удалит контейнер
9. docker ps -a -q -> вывед ID всех контейнеров , далее можно передать на вход команде rm и убить все контейнеы одним махом
10. docker rm $(docker ps -qa) -> убиваем все контейнеры одной командой, может не сработать тк версия докера изменилась и скорее всего команду поменяли
11. docker stop 'имя контейнера или ID' - остановит контейнер
12. docker run --name MyNestJsApp -d --rm nestjs-rest-api  -> параметр d означает запуск контейнера в фоне, rm - означает удалиться контейнер автоматически после остановки/отработки
13. docker run --name MyNestJsApp -d --rm -p 3000:3000 nestjs-rest-api -> p порт нашей машины:порт контейнера (который указали в EXPOSE)
14. docker run --name MyNestJsApp -d --rm -p 3000:3000 -v C:/Users/Serhiim/Documents/nestjs-rest-api/localDb:/usr/src/app/localDb nestjs-rest-api  -> -v создает связь между локальной папкой с папкой в контейнере для передачи данных
15. docker volume ls -> просмотреть volume тоже самое что приконектить внешнюю папку
16. docker rmi $(docker images -q) -> удаляет все имиджи
 */
