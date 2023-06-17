# 本项目相关注意事项

## 1. Docker使用注意事项

### 1.1 MacOS构建镜像时找不到环境变量

- 请运行以下命令
``` shell
# OS Specific Support.
darwin=false
[[ "$(uname)" == Darwin* ]] && darwin=true
```

### 1.2 使用arm架构的芯片和intel芯片构建的镜像是不一样的，无法移植

- 使用MocOS m1/m2芯片构建的Docker镜像，无法移植到intel的工控机上部署使用。

- 需要再一台intel的打包机上镜像打包，再将docker镜像移植到目标机器上加载使用。



## 2. Nginx使用注意事项

### 2.1 错误的pid

- 如果使用重启nginx后，出现以下报错，说明nginx.pid文件丢失或nginx.pid文件中不存在pid。
``` shell
~：nginx -s reload

nginx: [error] invalid PID number "" in "/run/nginx/nginx.pid"
```

- 此时使用以下命令覆写一个pid后重启nginx即可。
``` shell
touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid && echo "1" > /var/run/nginx.pid
```

