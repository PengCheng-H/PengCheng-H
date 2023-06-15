NAME=wms_ui
REPO=hcrobots/${NAME}
TAG=v1.2.0

# OS Specific Support.
darwin=false

#
[["$(uname)" == Darwin*]] && darwin=true

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
    pnpm install --registry https://registry.npm.taobao.org
}

pack() {
    pnpm run build
}

usage() {
    cat <<EOF
./tools.sh install
./tools.sh pack
./tools.sh build
./tools.sh rmi
./tools.sh save
./tools.sh load
./tools.sh run [new container name, default: ${NAME}]
./tools.sh start [new container name, default: ${NAME}]
./tools.sh stop [new container name, default: ${NAME}]
./tools.sh restart [new container name, default: ${NAME}]
./tools.sh remove [new container name, default: ${NAME}]
./tools.sh remove_force [new container name, default: ${NAME}]
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
*)
    echo "Error, see usage below:"
    echo
    usage
    ;;
esac
