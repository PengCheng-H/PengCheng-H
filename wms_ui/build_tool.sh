NAME=wms_ui
REPO=hcrobots/${NAME}
TAG=v1.2.0

# OS Specific Support.
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

install() {
    npm install --registry https://registry.npm.taobao.org -g pnpm
    pnpm install --registry https://registry.npm.taobao.org
}

pack() {
    pnpm run build
}

build() {
    docker build -f Dockerfile -t $REPO:$TAG .
}

build_no_cache() {
    docker build --no-cache -f Dockerfile -t $REPO:$TAG .
}

save() {
    docker save ${REPO}:${TAG} | gzip >${REPO//\//_}.${TAG}.tar.gz
}

load() {
    docker load <${REPO//\//_}.${TAG}.tar.gz
}

run() {
    docker run -itd --name $NAME -p 3000:80 $REPO:$TAG
}

# TOOD：有问题，会闪退，需要修改
exec() {
    docker exec -it ${NAME} /bin/sh
}

stop() {
    docker stop $NAME
}

start() {
    docker start $NAME
}

restart() {
    docker restart $NAME
}

remove() {
    docker rm $NAME
}

clear() {
    stop
    remove
}

rmi() {
    docker rmi ${REPO}:${TAG}
}

usage() {
    cat <<EOF
./tools.sh install              在本地环境中使用pnpm和淘宝源安装项目依赖包。
./tools.sh pack                 在本地环境中使用pnpm、tsc和vite将项目打包成静态资源。
./tools.sh build                在本地/生产环境中，将向项目打成docker镜像。
./tools.sh build_no_cache       在本地/生产环境中，将项目打成docker镜像，并且不使用缓存。
./tools.sh save                 在本地/生产环境中，将本项目的docker镜像保存为压缩文件，方便存储、移动、部署。
./tools.sh load                 在本地/生产环境中，通过本项目的docker镜像的压缩文件，加载为正常的docker镜像。
./tools.sh run                  在本地/生产环境中，通过本项目的docker镜像，生成并运行1个docker容器。
./tools.sh exec                 在本地/生产环境中，进入本项目的docker容器shell环境。 
./tools.sh stop                 在本地/生产环境中，停止运行本项目的docker容器。 
./tools.sh start                在本地/生产环境中，开始运行本项目的docker容器。 
./tools.sh restart              在本地/生产环境中，重新运行本项目的docker容器。 
./tools.sh remove               在本地/生产环境中，清除本项目的docker容器。 
./tools.sh clear                在本地/生产环境中，停止并清除本项目的docker容器。 
./tools.sh rmi                  在本地/生产环境中，删除本项目的docker镜像。  

EOF
}

case $1 in
"install")
    install
    ;;
"pack")
    pack
    ;;
"build")
    build
    ;;
"build_no_cache")
    build_no_cache
    ;;
"save")
    save
    ;;
"load")
    load
    ;;
"run")
    run
    ;;
"exec")
    exec
    ;;
"stop")
    stop
    ;;
"start")
    start
    ;;
"remove")
    remove
    ;;
"clear")
    clear
    ;;
"rmi")
    rmi
    ;;
*)
    echo "Error, see usage below:"
    echo
    usage
    ;;
esac
