var app = angular.module("membrspaco", ["ngRoute", "xeditable", "ui.mask", "ngMessages",
                                   "ngSanitize", "ngFileUpload", "ngMaterial"]);

app.config(['$compileProvider',
   function ($compileProvider) {
       $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob|data):/);
}]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
