var app = angular.module("membrspaco", ["ngRoute", "xeditable", "ui.mask", "ngMessages",
                                   "ngSanitize", "ngFileUpload", "ngMaterial"])
                 .filter("localeOrderBy", [function () {
                     return function (array, sortPredicate, reverseOrder) {
                         if (!Array.isArray(array)) return array;
                         if (!sortPredicate) return array;

                         var isString = function (value) {
                             return (typeof value === "string");
                         };

                         var isNumber = function (value) {
                             return (typeof value === "number");
                         };

                         var isBoolean = function (value) {
                             return (typeof value === "boolean");
                         };

                         var arrayCopy = [];
                         angular.forEach(array, function (item) {
                             arrayCopy.push(item);
                         });

                         arrayCopy.sort(function (a, b) {
                             var valueA = a[sortPredicate];
                             var valueB = b[sortPredicate];

                             if (isString(valueA))
                                 return !reverseOrder ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);

                             if (isNumber(valueA) || isBoolean(valueA))
                                 return !reverseOrder ? valueA - valueB : valueB - valueA;

                             return 0;
                         });

                         return arrayCopy;
                     }
                 }]);
app.config(['$compileProvider',
   function ($compileProvider) {
       $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob|data):/);
}]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
