namespace nuPickers.Shared.UmbracoTreeDataSource
{
    using System;
    using System.Collections.Generic;
    using nuPickers.Shared.TreePicker;
    using nuPickers.Shared.Editor;
    using Umbraco.Core;

    public class UmbracoTreeDataSource : ITreePickerDataSource
    {
        public string TreeAlias { get; set; }

        public IEnumerable<EditorDataItem> GetEditorDataItems(int contextId)
        {
            var items = new List<EditorDataItem>();
            items.Add(new EditorDataItem() {Key = "123", Label = "456"});
            return items;
        }

        // simply wraps the EntityService
        public IEnumerable<TreePickerTreeNode> GetByIds(string ids)
        {
            var result = new List<TreePickerTreeNode>();

            foreach (var idStr in ids.Split(new []{ ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                int id = 0;
                if (int.TryParse(idStr, out id))
                {
                    var entity = ApplicationContext.Current.Services.EntityService.Get(id);
                    if (entity != null)
                        result.Add(new TreePickerTreeNode(entity));
                }
            }

            return result;
        }
    }
}
