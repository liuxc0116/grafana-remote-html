'use strict';

System.register(['lodash', 'jquery', 'app/plugins/sdk'], function (_export, _context) {
    "use strict";

    var _, $, PanelCtrl, _createClass, RemoteHtmlPanelCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_lodash) {
            _ = _lodash.default;
        }, function (_jquery) {
            $ = _jquery.default;
        }, function (_appPluginsSdk) {
            PanelCtrl = _appPluginsSdk.PanelCtrl;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('PanelCtrl', _export('RemoteHtmlPanelCtrl', RemoteHtmlPanelCtrl = function (_PanelCtrl) {
                RemoteHtmlPanelCtrl.$inject = ['$scope', '$injector', 'templateSrv', '$sce'];

                _inherits(RemoteHtmlPanelCtrl, _PanelCtrl);

                /** @ngInject **/
                function RemoteHtmlPanelCtrl($scope, $injector, templateSrv, $sce) {
                    _classCallCheck(this, RemoteHtmlPanelCtrl);

                    var _this = _possibleConstructorReturn(this, (RemoteHtmlPanelCtrl.__proto__ || Object.getPrototypeOf(RemoteHtmlPanelCtrl)).call(this, $scope, $injector));

                    _this.panelDefaults = {
                        method: 'GET', // 'GET', 'POST'
                        url: ""
                    };
                    _this.content = "";

                    _.defaults(_this.panel, _this.panelDefaults);
                    _this.templateSrv = templateSrv;
                    _this.$sce = $sce;
                    _this.tmp_url = "";

                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.events.on('refresh', _this.onRefresh.bind(_this));
                    _this.events.on('render', _this.onRender.bind(_this));

                    // $scope.$watch(
                    //   'ctrl.panel.url',
                    //   _.throttle(() => {
                    //     this.render();
                    //   }, 1000)
                    // );
                    return _this;
                }

                _createClass(RemoteHtmlPanelCtrl, [{
                    key: 'onInitEditMode',
                    value: function onInitEditMode() {
                        this.addEditorTab('Options', 'public/plugins/grafana-remote-html/editor.html');
                        this.editorTabIndex = 1;
                        if (this.panel.method === 'undefined') {
                            this.panel.method = 'GET';
                        }
                    }
                }, {
                    key: 'onRefresh',
                    value: function onRefresh() {
                        this.render();
                    }
                }, {
                    key: 'onRender',
                    value: function onRender() {
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
                                    "success": function success(data) {
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
                }, {
                    key: 'renderText',
                    value: function renderText(content) {
                        content = content.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/\n/g, '<br/>');
                        this.updateContent(content);
                    }
                }, {
                    key: 'updateContent',
                    value: function updateContent(html) {
                        try {
                            this.content = this.$sce.trustAsHtml(html);
                        } catch (e) {
                            console.log('Text panel error: ', e);
                            this.content = this.$sce.trustAsHtml(html);
                        }
                    }
                }]);

                return RemoteHtmlPanelCtrl;
            }(PanelCtrl)));

            _export('RemoteHtmlPanelCtrl', RemoteHtmlPanelCtrl);

            RemoteHtmlPanelCtrl.templateUrl = 'module.html';

            _export('PanelCtrl', RemoteHtmlPanelCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map
