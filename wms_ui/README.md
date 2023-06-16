# 概述

- 本项目是WMS系统的前端项目。


## 环境依赖

- node: v18.16.0
- npm: 9.5.1
- pnpm: 8.6.2
- vite: 4.3.9
- npm镜像源: 淘宝源 https://registry.npm.taobao.org
- docker镜像
  1. node:18.16.0-alpine
  2. nginx:1.23.1-alpine


## 部署步骤

- 在部署目标上通过git克隆本项目
``` shell
git clone http://10.1.20.100/catmurmurs/wms_ui
```

- 修改nginx.conf中wms的地址
``` shell 
# 进入项目目录
cd wms_ui

# 编辑nginx.conf
vim nginx.conf

# 将该行中的IP和端口号更换成对应的配置: proxy_pass http://10.0.64.76:8088;

# 保存修改 :wq
``` 

- 构建项目Docker镜像
``` shell
# 调用Docker镜像构建脚本
./build_tool build
```

- 运行项目Docker容器
``` shell
./build_tool run
```

## 目录结构
``` markdown
- .vscode                                   // 文件·vscode的环境配置文件
- wms_ui                                    // 目录·前端项目目录
    - docs                                  // 目录·文档目录
    - public                                // 目录·项目外其它静态资源目录
        - favicon.ico                       // 文件·网站图标
    - src                                   // 目录·源码目录
        - assets                            // 目录·项目内资源目录
        - common                            // 目录·公共组件目录
        - components                        // 目录·通用组件目录
        - config                            // 目录·项目内配置目录
            - index.json                    // 文件·默认json配置文件，存放有wms后端的接口配置
            - Index.ts                      // 文件·默认ts模块配置文件
        - interfaces                        // 目录·接口目录
            - http_request.interface.ts     // 文件·HTTP请求类的接口定义
            - http_response.interface.ts    // 文件·HTTP响应类的接口定义
            - interface.ts                  // 文件·其它公共接口类的接口定义
        - locales                           // 目录·国际化目录
            - en-US.ts                      // 文件·英文国际化文件
            - zh-CN.ts                      // 文件·中文国际化文件
        - pages                             // 目录·前端所有的业务页面
            - console                       // 目录·控制台一级目录
                - basic_data                // 目录·基础数据管理页面
                - inventory                 // 目录·库存数据管理页面
                - order                     // 目录·订单数据页面
                - task                      // 目录·任务数据页面
                - Index.tsx                 // 文件·控制台首页
            - workbench                     // 目录·工作台一级目录
            - user                          // 目录·用户一级目录
                - Index.tsx                 // 文件·用户管理页面
                - Login.tsx                 // 文件·用户登录页面
                - Registe.tsx               // 文件·用户注册页面
            - pda                           // 目录·手持设备一级目录
        - router                            // 目录·前端路由目录
            - Index.tsx                     // 文件·默认路由模块
        - types                             // 目录·枚举、常量等类型定义目录
            - Constants.ts                  // 文件·常量定义文件
            - Enum.ts                       // 文件·枚举定义文件
        - utils                             // 目录·枚举、常量等类型定义目录 
            - api.ts                        // 文件·接口访问类
            - HttpClient.ts                 // 文件·HTTP客户端访问模块
            - Index.ts                      // 文件·默认通用工具类
        - App.tsx                           // 文件·应用程序主体模块
        - main.css                          // 文件·应用程序主样式文件
        - Main.tsx                          // 文件·应用程序主入口文件
    - .eslintrc.cjs                         // 文件·CommonJS模块格式的ESLint配置文件，用于定义代码规范和检查规则
    - .prettierrc.cjs                       // 文件·CommonJS模块格式的Prettier配置文件
    - .build_tool.sh                        // 文件·项目的docker打包运行工具
    - Dockerfile                            // 文件·用于构建本项目Docker镜像的配置文件，用户描述镜像的构建过程
    - favicon.ico                           // 文件·网站logo
    - index.html                            // 文件·网站默认入口文件
    - nginx.conf                            // 文件·nginx配置文件，打包前在此处配置wms代理服务的IP地址；前端在打包镜像后，使用nginx托管打包后的静态资源，并作为和WMS服务之间的代理
    - package.json                          // 文件·node.js的配置文件，存放了项目的元数据和依赖包信息
    - postcss.config.cjs                    // 文件·PostCSS是一个用于转换CSS的工具，它使用插件来处理CSS，并提供自动添加前缀、压缩CSS、使用变量和嵌套等
    - tailwind.config.cjs                   // 文件·Tailwind CSS 是一个实用的 CSS 框架，它提供了一组现成的 CSS 类，可以快速构建和定制页面的样式
    - tsconfig.json                         // 文件·TypeScript 的配置文件，用于指定 TypeScript 编译器的行为和编译选项
    - tsconfig.node.json                    // 文件·在某些情况下，你可能需要针对不同的运行环境或目标平台设置不同的编译选项。这时，你可以创建额外的配置文件，如 tsconfig.node.json，来覆盖或扩展默认的配置
    - vite.config.ts                        // 文件·Vite 项目的配置文件，用于配置和定制 Vite 构建工具的行为和特性
    - README.md                             // 文件·项目说明文件

```


## 其它文档

- [更新日志](./docs/UPDATE.md)

- [功能文档](./docs/FUNCTIONS.md)

- [注意事项](./docs/NOTES.md)
