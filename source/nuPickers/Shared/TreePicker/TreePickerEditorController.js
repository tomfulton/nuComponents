
angular
    .module("umbraco")
    .controller("nuPickers.Shared.TreePicker.TreePickerEditorController",
        ['$scope', 'nuPickers.Shared.Editor.EditorResource', 'dialogService',
        function ($scope, editorResource, dialogService, eventsService) {

          function trim(str, chr) {
            var rgxtrim = (!chr) ? new RegExp('^\\s+|\\s+$', 'g') : new RegExp('^' + chr + '+|' + chr + '+$', 'g');
            return str.replace(rgxtrim, '');
          }

          function startWatch() {
            $scope.$watch(function () {
              return _.map($scope.renderModel, function (i) {
                return i.id;
              }).join();
            }, function (newVal) {
              var currIds = _.map($scope.renderModel, function (i) {
                return i.id;
              });
              $scope.model.value = trim(currIds.join(), ",");

              //Validate!
              if ($scope.model.config && $scope.model.config.minNumber && parseInt($scope.model.config.minNumber) > $scope.renderModel.length) {
                $scope.contentPickerForm.minCount.$setValidity("minCount", false);
              }
              else {
                $scope.contentPickerForm.minCount.$setValidity("minCount", true);
              }

              if ($scope.model.config && $scope.model.config.maxNumber && parseInt($scope.model.config.maxNumber) < $scope.renderModel.length) {
                $scope.contentPickerForm.maxCount.$setValidity("maxCount", false);
              }
              else {
                $scope.contentPickerForm.maxCount.$setValidity("maxCount", true);
              }
            });
          }

          $scope.renderModel = [];


          $scope.remove = function (index) {
            $scope.renderModel.splice(index, 1);
          };

          $scope.add = function (item) {
            var currIds = _.map($scope.renderModel, function (i) {
              return i.id;
            });

            if (currIds.indexOf(item.id) < 0) {
              item.icon = iconHelper.convertFromLegacyIcon(item.icon);
              $scope.renderModel.push({ name: item.name, id: item.id, icon: item.icon });
            }
          };

          $scope.clear = function () {
            $scope.renderModel = [];
          }

          if ($scope.model.config.treePicker == null)
            $scope.model.config.treePicker = { multipicker: false };

          editorResource.getEditorDataItems($scope.model).then(function (response) {
            // TODO: Implement
          });

          $scope.openTreePicker = function() {
            var options = {
              // TODO: Determine path properly
              template: "/App_Plugins/nuPickers/Shared/TreePicker/TreePickerEditorDialog.html",
              dialogData: $scope.model,
              callback: function (data) {
                if (angular.isArray(data)) {
                  _.each(data, function (item, i) {
                    $scope.add(item);
                  });
                } else {
                  $scope.clear();
                  $scope.add(data);
                }
              },

            };

            dialogService.open(options);
          };

          $scope.remove = function (index) {
            $scope.renderModel.splice(index, 1);
          };

          $scope.add = function (item) {
            var currIds = _.map($scope.renderModel, function (i) {
              return i.id;
            });

            if (currIds.indexOf(item.id) < 0) {
              item.icon = "icon-folder";//iconHelper.convertFromLegacyIcon(item.icon);
              $scope.renderModel.push({ name: item.name, id: item.id, icon: item.icon });
            }
          };

          $scope.clear = function () {
            $scope.renderModel = [];
          }

          startWatch();

        }]);