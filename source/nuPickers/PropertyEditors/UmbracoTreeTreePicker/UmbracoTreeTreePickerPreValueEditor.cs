
namespace nuPickers.PropertyEditors.UmbracoTreeTreePicker
{
    using Umbraco.Core.PropertyEditors;

    internal class UmbracoTreeTreePickerPreValueEditor : PreValueEditor
    {
        [PreValueField("dataSource", "", EmbeddedResource.RootUrl + "UmbracoTreeDataSource/UmbracoTreeDataSourceConfig.html", HideLabel = true)]
        public string DataSource { get; set; }

        [PreValueField("treePicker", "", EmbeddedResource.RootUrl + "TreePicker/TreePickerConfig.html", HideLabel = true)]
        public string TreePicker { get; set; }
    }
}
