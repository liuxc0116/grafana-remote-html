import _ from 'lodash';
import $ from 'jquery';
import { PanelCtrl } from 'app/plugins/sdk';

export class RemoteHtmlPanelCtrl extends PanelCtrl {
    /** @ngInject **/
    constructor($scope, $injector, templateSrv, $sce) {
        super($scope, $injector);

        this.panelDefaults = {
            method: 'GET', // 'GET', 'POST'
            url:  "",
        };
        this.content = "";

        _.defaults(this.panel, this.panelDefaults);
        this.templateSrv = templateSrv;
        this.$sce = $sce;
        this.tmp_url = "";

        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on('refresh', this.onRefresh.bind(this));
        this.events.on('render', this.onRender.bind(this));

        // $scope.$watch(
        //   'ctrl.panel.url',
        //   _.throttle(() => {
        //     this.render();
        //   }, 1000)
        // );
    }

    onInitEditMode() {
        this.addEditorTab('Options', 'public/plugins/grafana-remote-html/editor.html');
        this.editorTabIndex = 1;
        if (this.panel.method === 'undefined') {
            this.panel.method = 'GET';
        }
    }

    onRefresh() {
        this.render();
    }

    onRender() {
        if (this.panel.url != "" && this.panel.method != "") {
            var method = this.panel.method;
            var url = this.templateSrv.replace(this.panel.url, this.panel.scopedVars);
            if (url == this.tmp_url) {
                this.renderingCompleted();
                return;
            }
            console.log(url);
            var p = this;
            if (method == "GET") {
              // $.get(url, function (data, status) {
              //         console.log(data);
              //         p.tmp_url = url;
              //         p.updateContent(data);
              //         p.renderingCompleted();
              //     }
              // );
                $.ajax({
                    "url": url,
                    "type": "GET",
                    "async": false,
                    "success": function (data) {
                        p.tmp_url = url;
                        console.log(data);
                        p.updateContent(data);
                    }
                });
            } else if (method == "POST") {
                console.log("POST");
            }
        }
        this.renderingCompleted();
    }

    renderText(content) {
        content = content
          .replace(/&/g, '&amp;')
          .replace(/>/g, '&gt;')
          .replace(/</g, '&lt;')
          .replace(/\n/g, '<br/>');
        this.updateContent(content);
    }

    updateContent(html) {
        try {
            this.content = this.$sce.trustAsHtml(html);
        } catch (e) {
            console.log('Text panel error: ', e);
            this.content = this.$sce.trustAsHtml(html);
        }
    }
}

RemoteHtmlPanelCtrl.templateUrl = 'module.html';
export { RemoteHtmlPanelCtrl as PanelCtrl };
