namespace nuPickers.Shared.TreePicker
{
    using System.Collections.Generic;

    public interface ITreePickerDataSource
    {
        /// <summary>
        /// Get a list of full nodes (name/id/icon) by a CSV list of ids
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        IEnumerable<TreePickerTreeNode> GetByIds(string ids);
    }
}
