var app = angular.module("membrspaco", ["ngRoute", "xeditable", "ui.mask", "ngMessages",
                                   "ngSanitize", "ngFileUpload", "ngMaterial"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
