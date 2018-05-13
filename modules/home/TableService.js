/*!function () {
    "use strict";

    function t($rootScope, $http, $state, $stateParams, actionUtil) {
        console.log("$rootScope", $rootScope);
        console.log("$http", $http);
        console.log("$state", $state);
        console.log("$stateParams", $stateParams);
        console.log("actionUtil", actionUtil);

        function o(t) {
            this.endPoint = t.endPoint || "", this.collect = t.collect || [], this.collectOptions = t.collectOptions || {}, this.populate = t.populate || [], this.sort = t.sort || "id desc", this.limit = actionUtil.parseLimit($stateParams.action) || t.limit || 2, this.modelCriteriaMappingConfig = t.criteriaMapping || {}, this.sortBy = this.sort.split(" ")[0] || "id", this.sortOrder = this.sort.split(" ")[1] || "desc", this.lat = t.lat || "", this.lng = t.lng || "", this.distance = t.distance || ""
        }

        function r() {
            var t = {
                where: {},
                sort: null,
                lat: null,
                lang: null
            }
            return t;
        }

        function h(t) {
            $state.go(".", {
                action: actionUtil.stringify(this.getCurrentActionParam())
            }, {
                notify: !1
            }), this.requestData(t);
        }

        function c(t) {
            this.endPoint = t;
        }

        function l(t, i) {
            this.limit = t, $state.go(".", {
                action: actionUtil.stringify(this.getCurrentActionParam())
            }, {
                notify: !1
            }), this.requestData(i);
        }

        function d(t) {
            return this.datas = t, this
        }

        function p(t) {
            this.modelCriteriaMappingConfig = t
        }

        function g(t, i, a) {
            var e = i;
            return e || (e = t == this.sortBy ? "desc" === this.sortOrder ? "asc" : "desc" : this.sortOrder), this.sortBy = t, this.sortOrder = e, this.sort = [this.sortBy, this.sortOrder].join(" "), $state.go(".", {
                action: actionUtil.stringify(this.getCurrentActionParam())
            }, {
                notify: !1
            }), this.requestData(a), this
        }

        function u(t, i, a, e) {
            return "" == i ? delete this.where[t] : this.where[t] = i, this.page = 1, this.sort = [this.sortBy, this.sortOrder].join(" "), void 0 === a || a ? ($state.go(".", {
                action: actionUtil.stringify(this.getCurrentActionParam())
            }, {
                notify: !1
            }), this.requestData(e), this) : this
        }

        function m() {
            this.where = {};
        }

        function f(t) {
            this.collect = t;
        }

        function y(t) {
            this.skip = 0, this.page = 1, $state.go(".", {
                action: actionUtil.stringify(this.getCurrentActionParam())
            }, {
                notify: !1
            }), this.requestData(t);
        }

        function w(t) {
            "next" == t && this.goToPage(this.page + 1), "prev" == t && this.goToPage(this.page - 1)
        }

        function P(t, i) {
            return t < 1 ? alert("false input") : t > this.totalPage ? alert("false input") : (this.page = t, s.go(".", {
                action: n.stringify(this.getCurrentActionParam())
            }, {
                notify: !1
            }), void this.requestData(i))
        }

        function C(s) {
            var a = this;
            console.log("a", a);
            $rootScope.$broadcast("requestDataStart"), a.loadingdata = "inprogress";
            var n = {};
            this.populate && this.populate.length && (n.populate = this.populate.join(",")), this.collect && this.collect.length &&
            (n.collect = this.collect.join(",")), _.isEmpty(this.collectOptions) || (n.collectOptions = JSON.stringify(this.collectOptions)),
                n.sort = this.sort, n.skip = (this.page - 1) * this.limit, n.limit = this.limit, this.lat && (n.lat = this.lat), this.lng && (n.lng = this.lng),
                this.distance && (n.distance = this.distance), _.isEmpty(this.where) || (n.where = JSON.stringify(this.modelWhereMappingToReqParamWhere()));
            var o = "http://localhost:1337" + a.endPoint;
            console.log("o", o);
            this.endPoint.indexOf("http") > -1 && (o = this.endPoint), $http.get(o + "?" + querystring.stringify(n)).then(function(i) {
                console.log("i",i);
                return i ? ($rootScope.$broadcast("requestDataInprogress"),
                 a.datas = i.data, a.metadata = {}, 
                 void 0 !== i.skip ? a.metadata.numrows = i.numrows : a.metadata.numrows = i.metadata && void 0 !== i.metadata.numrows ? i.metadata.numrows : 0, 
                 void 0 !== i.skip ? a.metadata.limit = i.limit : a.metadata.limit = i.metadata && void 0 !== i.metadata.limit ? i.metadata.limit : 0, 
                 void 0 !== i.skip ? a.metadata.skip = i.skip : a.metadata.skip = i.metadata && void 0 !== i.metadata.skip ? i.metadata.skip : 0, 
                 a.startRow = a.skip + 1, 
                 a.endRow = a.page * a.limit, a.endRow > a.metadata.numrows && (a.endRow = a.metadata.numrows), 
                 a.totalPage = Math.ceil(a.metadata.numrows / a.limit), 
                 $rootScope.$broadcast("requestDataSuccess", i.data), 
                 a.loadingdata = "done", 
                 "function" == typeof s ? s(null, i.data) : void 0) : "function" == typeof s ? s("no data") : void 0
            }, function (i) {
                if (a.datas = [], $rootScope.$broadcast("requestDataError", i), a.loadingdata = "done", "function" == typeof s) return s(i)
            });
        }

        function v() {
            var t = this,
                i = {};
            return _.each(Object.keys(this.where), function (s) {
                if (s && "" != t.where[s])
                    if (t.modelCriteriaMappingConfig[s]) {
                        var a = {};
                        a[t.modelCriteriaMappingConfig[s]] = t.where[s], i[s] = a
                    } else i[s] = t.where[s]
            })
        }

        return function () {
            return this.endPoint = "", this.loadingdata = !1, this.datas = [], this.metadata = {}, this.populate = [], this.collect = [], this.where = actionUtil.parseCriteria($stateParams.action), this.skip = actionUtil.parseSkip($stateParams.action) || 0, this.limit = actionUtil.parseLimit($stateParams.action) || 2, this.page = actionUtil.parsePage($stateParams.action) || 1, this.sort = actionUtil.parseSort($stateParams.action) || "", this.lat = actionUtil.parseLat($stateParams.action) || "", this.lng = actionUtil.parseLng($stateParams.action) || "", this.distance = actionUtil.parseDistance($stateParams.action) || "", this.sortBy = "id", this.sortOrder = "desc", this.modelCriteriaMappingConfig = {}, this.currentPage = this.skip > 0 ? this.skip / this.limit + 1 : 1, this.startRow = this.skip + 1, this.endRow = this.page * this.limit, this.initialize = o, this.setCollect = f, this.setWhere = u, this.clearWhere = m, this.setSort = g, this.setData = d, this.setEndPoint = c, this.requestData = C, this.pageNav = w, this.goToPage = P, this.setLimit = 1, this.submitSearch = y, this.refresh = h, this.modelWhereMappingToReqParamWhere = v, this.setModelCriteriaMappingConfig = p, this.getCurrentActionParam = r, this
        };
    }
    t.$inject = ["$rootScope", "$http", "$state", "$stateParams", "actionUtil"], angular.module('app').factory("TableService", t)
}();*/


! function() {
    "use strict";

    function t(t, i, s, a, n) {
        function o(t) {
            this.endPoint = t.endPoint || "", this.collect = t.collect || [], this.collectOptions = t.collectOptions || {}, this.populate = t.populate || [], this.sort = t.sort || "id desc", this.limit = n.parseLimit(a.action) || t.limit || 2, this.modelCriteriaMappingConfig = t.criteriaMapping || {}, this.sortBy = this.sort.split(" ")[0] || "id", this.sortOrder = this.sort.split(" ")[1] || "desc", this.lat = t.lat || "", this.lng = t.lng || "", this.distance = t.distance || ""
        }

        function r() {
            var t = {
                where: this.where,
                sort: this.sort,
                lat: this.lat,
                lng: this.lng,
                distance: this.distance
            };
            return this.page > 1 && (t.page = this.page), 2 != this.limit && (t.limit = this.limit), t
        }

        function h(t) {
            s.go(".", {
                action: n.stringify(this.getCurrentActionParam())
            }, {
                notify: !1
            }), this.requestData(t)
        }

        function c(t) {
            this.endPoint = t
        }

        function l(t, i) {
            this.limit = t, s.go(".", {
                action: n.stringify(this.getCurrentActionParam())
            }, {
                notify: !1
            }), this.requestData(i)
        }

        function d(t) {
            return this.datas = t, this
        }

        function p(t) {
            this.modelCriteriaMappingConfig = t
        }

        function g(t, i, a) {
            var e = i;
            return e || (e = t == this.sortBy ? "desc" === this.sortOrder ? "asc" : "desc" : this.sortOrder), this.sortBy = t, this.sortOrder = e, this.sort = [this.sortBy, this.sortOrder].join(" "), s.go(".", {
                action: n.stringify(this.getCurrentActionParam())
            }, {
                notify: !1
            }), this.requestData(a), this
        }

        function u(t, i, a, e) {
            return "" == i ? delete this.where[t] : this.where[t] = i, this.page = 1, this.sort = [this.sortBy, this.sortOrder].join(" "), void 0 === a || a ? (s.go(".", {
                action: n.stringify(this.getCurrentActionParam())
            }, {
                notify: !1
            }), this.requestData(e), this) : this
        }

        function m() {
            this.where = {}
        }

        function f(t) {
            this.collect = t
        }

        function y(t) {
            this.skip = 0, this.page = 1, s.go(".", {
                action: n.stringify(this.getCurrentActionParam())
            }, {
                notify: !1
            }), this.requestData(t)
        }

        function w(t) {
            "next" == t && this.goToPage(this.page + 1), "prev" == t && this.goToPage(this.page - 1)
        }

        function P(t, i) {
            console.log("t",t);
            return t < 1 ? alert("false input") : t > this.totalPage ? alert("false input") : (this.page = t, s.go(".", {
                action: n.stringify(this.getCurrentActionParam())
            }, {
                notify: !1
            }), void this.requestData(i))
        }

        function C(s) {
            var a = this;
            t.$broadcast("requestDataStart"), this.loadingdata = "inprogress";
            var n = {};
            this.populate && this.populate.length && (n.populate = this.populate.join(",")), this.collect && this.collect.length && (n.collect = this.collect.join(",")), _.isEmpty(this.collectOptions) || (n.collectOptions = JSON.stringify(this.collectOptions)), n.sort = this.sort, n.skip = (this.page - 1) * this.limit, n.limit = this.limit, this.lat && (n.lat = this.lat), this.lng && (n.lng = this.lng), this.distance && (n.distance = this.distance), _.isEmpty(this.where) || (n.where = JSON.stringify(this.modelWhereMappingToReqParamWhere()));
            var o = "http://localhost:1337" + a.endPoint;
            this.endPoint.indexOf("http") > -1 && (o = this.endPoint), i.get(o + "?" + querystring.stringify(n)).then(function(i) {
                console.log("i",i)
                if (void 0 !== i.skip) {
                    console.log("AAAAAAAAA")
                } else {
                    if (a.metadata.numrows = i.metadata && void 0 !== i.metadata.numrows) {
                        console.log("BBBBBBBB");
                    } else {
                        console.log("CCCCCCCC");
                    }
                }

                return i ? (t.$broadcast("requestDataInprogress"), 
                    a.datas = i.data, 
                    a.metadata = {}, 
                    void 0 !== i.skip ? a.metadata.numrows = i.numrows : a.metadata.numrows = i.metadata && void 0 !== i.metadata.numrows ? i.metadata.numrows : 0, 
                    void 0 !== i.skip ? a.metadata.limit = i.limit : a.metadata.limit = i.metadata && void 0 !== i.metadata.limit ? i.metadata.limit : 0, 
                    void 0 !== i.skip ? a.metadata.skip = i.skip : a.metadata.skip = i.metadata && void 0 !== i.metadata.skip ? i.metadata.skip : 0, 
                    a.startRow = a.skip + 1, 
                    a.endRow = a.page * a.limit, a.endRow > a.metadata.numrows && (a.endRow = a.metadata.numrows), 
                    a.totalPage = Math.ceil(a.metadata.numrows / a.limit), 
                    t.$broadcast("requestDataSuccess", i.data), 
                    a.loadingdata = "done", 
                    "function" == typeof s ? s(null, i.data) : void 0) : "function" == typeof s ? s("no data") : void 0
            }, function(i) {
                if (a.datas = [], t.$broadcast("requestDataError", i), a.loadingdata = "done", "function" == typeof s) return s(i)
            });
        }

        function v() {
            var t = this,
                i = {};
            return _.each(Object.keys(this.where), function(s) {
                if (s && "" != t.where[s])
                    if (t.modelCriteriaMappingConfig[s]) {
                        var a = {};
                        a[t.modelCriteriaMappingConfig[s]] = t.where[s], i[s] = a
                    } else i[s] = t.where[s]
            }), i
        }
        return function() {
            return this.endPoint = "", this.loadingdata = !1, this.datas = [], this.metadata = {}, this.populate = [], this.collect = [], this.where = n.parseCriteria(a.action), this.skip = n.parseSkip(a.action) || 0, this.limit = n.parseLimit(a.action) || 2, this.page = n.parsePage(a.action) || 1, this.sort = n.parseSort(a.action) || "", this.lat = n.parseLat(a.action) || "", this.lng = n.parseLng(a.action) || "", this.distance = n.parseDistance(a.action) || "", this.sortBy = "id", this.sortOrder = "desc", this.modelCriteriaMappingConfig = {}, this.currentPage = this.skip > 0 ? this.skip / this.limit + 1 : 1, this.startRow = this.skip + 1, this.endRow = this.page * this.limit, this.initialize = o, this.setCollect = f, this.setWhere = u, this.clearWhere = m, this.setSort = g, this.setData = d, this.setEndPoint = c, this.requestData = C, this.pageNav = w, this.goToPage = P, this.setLimit = l, this.submitSearch = y, this.refresh = h, this.modelWhereMappingToReqParamWhere = v, this.setModelCriteriaMappingConfig = p, this.getCurrentActionParam = r, this
        }
    }
    t.$inject = ["$rootScope", "$http", "$state", "$stateParams", "actionUtil"], angular.module('app').factory("TableService", t)
}();