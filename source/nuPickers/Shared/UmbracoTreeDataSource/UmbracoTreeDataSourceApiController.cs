namespace nuPickers.Shared.UmbracoTreeDataSource
{
    using System.Collections.Generic;
    using System.Web.Http;
    using nuPickers.Shared.Editor;
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
    }
}
