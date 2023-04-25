#!/bin/bash

NAME=wms_ui
REPO=hcrobots/${NAME}
TAG=v1.0.2

# OS specific support.
darwin=false
[[ "$(uname)" == Darwin* ]] && darwin=true

# resolve links - $0 may be a softlink
PRG="$0"
while [ -h "$PRG" ]; do
    ls=$(ls -ld "$PRG")
    link=$(expr "$ls" : '.*-> \(.*\)$')
    if expr "$link" : '/.*' >/dev/null; then
        PRG="$link"
    else
        PRG=$(dirname "$PRG")/"$link"
    fi
done

PRGDIR=$(dirname "$PRG")
cd $PRGDIR

usage() {
    cat <<EOF
./build_tool.sh build
./build_tool.sh rmi
./build_tool.sh save
./build_tool.sh load
./build_tool.sh run [new container name, default: ${NAME}]
./build_tool.sh start [new container name, default: ${NAME}]
./build_tool.sh stop [new container name, default: ${NAME}]
./build_tool.sh restart [new container name, default: ${NAME}]
./build_tool.sh remove [new container name, default: ${NAME}]
./build_tool.sh remove_force [new container name, default: ${NAME}]
EOF
}

build() {
    [ -d ./wms_ui ] && rm -rf ./wms_ui
    mkdir -p wms_ui

    find .. -maxdepth 1 ! -name "node_modules" -a ! -name ".git" -a ! -name "dist" -a ! -name "dockerfile" -a ! -name ".." -exec cp -a "{}" wms_ui/ \;
    docker build -f .Dockerfile -t ${REPO}:${TAG} .

    [ -d ./wms_ui ] && rm -rf ./wms_ui
}

rmi() {
    docker rmi ${REPO}:${TAG}
}

save() {
    docker save ${REPO}:${TAG} | gzip >${REPO//\//_}.${TAG}.tar.gz
}

load() {
    docker load <${REPO//\//_}.${TAG}.tar.gz
}

run() {
    if [ "$1" == "--tmp" ]; then
        docker run -it --rm -e TZ=Asia/Shanghai \
            -p 3000:3000 \
            ${REPO}:${TAG} /bin/sh
        return
    fi

    if ${darwin}; then
        docker run -d --name $1 --restart=always -e TZ=Asia/Shanghai \
            -p 3000:3000 \
            ${REPO}:${TAG}
        return
    fi

    docker run -d --name $1 --restart=always -e TZ=Asia/Shanghai \
        --network host ${REPO}:${TAG}
}

start() {
    docker start $1
}

stop() {
    docker stop $1
}

restart() {
    docker restart $1
}

remove() {
    docker rm $1
}

remove_force() {
    docker stop $1
    docker rm $1
}

container_name=$2
[ -z ${container_name} ] && container_name=${NAME}

case $1 in

"build")
    build
    ;;
"rmi")
    rmi
    ;;
"save")
    save
    ;;
"load")
    load
    ;;
"run")
    run ${container_name}
    ;;
"start")
    start ${container_name}
    ;;
"stop")
    stop ${container_name}
    ;;
"restart")
    restart ${container_name}
    ;;
"remove")
    remove ${container_name}
    ;;
"remove_force")
    remove_force ${container_name}
    ;;
*)
    echo "Error, see usage below:"
    echo
    usage
    ;;
esac
