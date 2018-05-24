# grafana-remote-html

grafana-remote-html 是一款[grafana](https://grafana.com/)的插件，用于显示从后端服务器获取的html

grafana-remote-html的编辑界面如下

![option](https://github.com/liuxc0116/public/blob/master/grafana-remote-html/option.png?raw=true)

选择METHOD和填写URL后, grafana-remote-html会把获取的html显示在界面上


# 安装方法


```shell
# 安装[grafana](https://grafana.com/get)

cd /var/lib/grafana/plugins/
git clone https://github.com/liuxc0116/grafana-remote-html.git
service grafana-server restart
```


