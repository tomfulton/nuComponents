
angular
    .module("umbraco")
    .controller("nuPickers.Shared.TreePicker.TreePickerEditorDialogController",
        ['$scope', 'nuPickers.Shared.Editor.EditorResource', 'eventsService',
          function($scope, editorResource, eventsService) {

            console.log($scope.dialogData)
            $scope.dialogTreeEventHandler = $({});

            //wires up selection
            function nodeSelectHandler(ev, args) {
              args.event.preventDefault();
              args.event.stopPropagation();

              eventsService.emit("dialogs.treePickerController.select", args);

              select(args.node.name, args.node.id);

              //toggle checked state
              args.node.selected = args.node.selected === true ? false : true;
            };

            function select(text, id, entity) {
              //if we get the root, we just return a constructed entity, no need for server data
              if (id < 0) {
                if ($scope.dialogData.config.treePicker.multipicker) {
                  $scope.select(id);
                }
                else {
                  var node = {
                    alias: null,
                    icon: "icon-folder",
                    id: id,
                    name: text
                  };
                  $scope.submit(node);
                }
              }
              else {
                if ($scope.dialogData.config.treePicker.multipicker) {
                  $scope.select(Number(id));
                }
                else {
                  var node = {
                    alias: null,
                    icon: "icon-folder",
                    id: id,
                    name: text
                  };
                  $scope.submit(node);
                }
              }
            };

            $scope.multiSubmit = function (result) {
              editorResource.getByIds($scope.dialogData.config.dataSource.apiController, result.join(",")).then(function(d) {
                var obj = [];
                _.each(d.data, function(item) {
                  obj.push({ id: item.id, name: item.name, icon: 'icon-folder' });
                });
                $scope.submit(obj);
              });
            };

            $scope.dialogTreeEventHandler.bind("treeNodeSelect", nodeSelectHandler);

            $scope.$on('$destroy', function() {
              $scope.dialogTreeEventHandler.unbind("treeNodeSelect", nodeSelectHandler);
            });


          }]);
