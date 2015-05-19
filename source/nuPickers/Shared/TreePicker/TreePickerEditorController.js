
angular
    .module("umbraco")
    .controller("nuPickers.Shared.TreePicker.TreePickerEditorController",
        ['$scope', 'nuPickers.Shared.Editor.EditorResource', 'dialogService',
        function ($scope, editorResource, dialogService) {

          var entityType = "document";

          //the dialog options for the picker
          var dialogOptions = {
            multiPicker: $scope.model.config.multiPicker,
            entityType: $scope.model.config.dataSource.entityType,
            filterCssClass: "not-allowed not-published",
            startNodeId: null,
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
            treeAlias: $scope.model.config.dataSource.treeAlias,
            section: $scope.model.config.dataSource.sectionAlias
          };

          //since most of the pre-value config's are used in the dialog options (i.e. maxNumber, minNumber, etc...) we'll merge the 
          // pre-value config on to the dialog options
          angular.extend(dialogOptions, $scope.model.config);

          $scope.openTreePicker = function() {
            var d = dialogService.treePicker(dialogOptions);
          };

          editorResource.getEditorDataItems($scope.model).then(function (response) {
            // TODO: Implement
          });

        }]);