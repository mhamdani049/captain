var amActionUtils = angular.module("amActionUtil", []);
! function() {
    "use strict";

    function r() {
        function r(r) {
            var n = {};
            if (r) {
                var t = querystring.parse(r.split("+").join(" ")),
                    i = _.omit(t, ["page", "skip", "limit", "sort"]);
                _.each(Object.keys(i), function(r) {
                    var i = l(t[r]);
                    i ? n[r] = i : n[r] = t[r]
                })
            }
            return console.log("parseCriteria - oWhere: ", i), n
        }

        function n(r) {
            var n = querystring.parse(r);
            return n.skip || void 0
        }

        function t(r) {
            var n;
            return r && (n = querystring.parse(r.split("+").join(" "))), n || void 0
        }

        function i(r) {
            var n = querystring.parse(r);
            return parseInt(n.page) || void 0
        }

        function e(r) {
            var n = querystring.parse(r);
            return parseInt(n.limit) || void 0
        }

        function s(r) {
            var n = querystring.parse(r);
            return parseInt(n.lat) || void 0
        }

        function a(r) {
            var n = querystring.parse(r);
            return parseInt(n.lng) || void 0
        }

        function o(r) {
            var n = querystring.parse(r);
            return parseInt(n.distance) || void 0
        }

        function u(r) {
            var n = p(r.where),
                t = c(r),
                i = [];
            return n.length > 0 && i.push(n), t.length > 0 && i.push(t), i.join("&")
        }

        function c(r) {
            var n = {},
                t = "";
            return r ? (r.where && delete r.where, _.each(Object.keys(r), function(t) {
                "" != r[t] && (n[t] = r[t])
            }), console.log("querystring.stringify(oOptionName): ", querystring.stringify(n)), _.isEmpty(n) || (t = querystring.stringify(n), t = t.split("%20").join("+"), t = t.split("%2C").join(",")), t) : t
        }

        function p(r) {
            var n = {},
                t = "";
            return r ? (_.each(Object.keys(r), function(t) {
                "" != r[t] && ("object" == typeof r[t] ? n[t] = JSON.stringify(r[t]) : n[t] = r[t])
            }), console.log("querystring.stringify(oWhere): ", querystring.stringify(n)), _.isEmpty(n) || (t = querystring.stringify(n), t = t.split("%20").join("+"), t = t.split("%2C").join(",")), t) : t
        }

        function g(r) {
            return r = r.split(" ").join("+")
        }

        function f(r) {
            return r = r.split("+").join(" ")
        }

        function y(r) {
            var n = r || {};
            return _.each(Object.keys(n), function(r) {
                n[r] = f(n[r])
            }), n
        }

        function l(r) {
            var n;
            try {
                n = JSON.parse(r)
            } catch (t) {}
            return n
        }
        return {
            parseCriteria: r,
            parseSort: t,
            parsePage: i,
            parseLimit: e,
            parseSkip: n,
            parseLat: s,
            parseLng: a,
            parseDistance: o,
            stringify: u,
            stringEncode: g,
            valueDecode: y
        }
    }
    var n = "actionUtil";
    amActionUtils.factory(n, r), r.$inject = []
}();