
angular
    .module("umbraco")
    .controller("nuPickers.Shared.TreePicker.TreePickerEditorController",
        ['$scope', 'nuPickers.Shared.Editor.EditorResource', 'dialogService',
        function ($scope, editorResource, dialogService, dataSourceResource, eventsService) {

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
            });
          }

          $scope.renderModel = [];
          if ($scope.model.config.treePicker == null)
            $scope.model.config.treePicker = { multipicker: false };

          //editorResource.getEditorDataItems($scope.model).then(function (response) {
          //  TODO: Implement?
          //});

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

          // load current data
          editorResource.getByIds($scope.model.config.dataSource.apiController, $scope.model.value).then(function (d) {

            //Ensure we populate the render model in the same order that the ids were stored!
            _.each(d.data, function (item) {
                $scope.renderModel.push({ name: item.name, id: item.id, icon: item.icon });
            });

            //everything is loaded, start the watch on the model
            startWatch();

          });

        }]);