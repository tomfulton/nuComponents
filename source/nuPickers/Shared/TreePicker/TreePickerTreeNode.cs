namespace nuPickers.Shared.TreePicker
{
    using Newtonsoft.Json;
    using Umbraco.Core.Models.EntityBase;

    public class TreePickerTreeNode
    {

        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("icon")]
        public string Icon { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        public TreePickerTreeNode(IUmbracoEntity entity)
        {
            Name = entity.Name;
            Id = entity.Id;
            Icon = "icon-folder"; // TODO: Lookup
        }
    }
}
