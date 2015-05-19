namespace nuPickers.Shared.UmbracoTreeDataSource
{
    using System.Collections.Generic;
    using nuPickers.Shared.Editor;

    public class UmbracoTreeDataSource
    {
        public string TreeAlias { get; set; }

        public IEnumerable<EditorDataItem> GetEditorDataItems(int contextId)
        {
            var items = new List<EditorDataItem>();
            items.Add(new EditorDataItem() {Key = "123", Label = "456"});
            return items;
        }
    }
}
