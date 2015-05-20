namespace nuPickers.Shared.UmbracoTreeDataSource
{
    using System;
    using System.Collections.Generic;
    using System.Web.Http;
    using nuPickers.Shared.Editor;
    using nuPickers.Shared.TreePicker;
    using Umbraco.Web.Editors;
    using Umbraco.Web.Mvc;

    [PluginController("nuPickers")]
    public class UmbracoTreeDataSourceApiController : UmbracoAuthorizedJsonController
    {
        [HttpPost]
        public IEnumerable<EditorDataItem> GetEditorDataItems([FromUri] int currentId, [FromUri] int parentId, [FromUri] string propertyAlias, [FromBody] dynamic data)
        {
            return new List<EditorDataItem>();
        }

        [HttpPost]
        public IEnumerable<TreePickerTreeNode> GetByIds(string ids)
        {
            // TODO: This logic is duplicated in UmbracoTreeDataSource, we should just use that, but not sure best way to get it from here.
            var result = new List<TreePickerTreeNode>();

            foreach (var idStr in ids.Split(new []{ ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                int id = 0;
                if (int.TryParse(idStr, out id))
                {
                    var entity = Services.EntityService.Get(id);
                    if (entity != null)
                        result.Add(new TreePickerTreeNode(entity));
                }
            }

            return result;
        }
    }
}
