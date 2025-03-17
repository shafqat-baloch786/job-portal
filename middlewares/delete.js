import { Job } from "../models/jobs.js";
import { User } from "../models/users.js";

const models = {
    'job': Job,
    'user': User,
};

export const delete_item = async (req, res) => {
    try {
        const { item_id } = req.params;
        const collection_name = req.headers['collection']; // Get collection name from request headers
        console.log("Collection name from headers:", collection_name);

        if (!collection_name) {
            return res.status(400).json({
                success: false,
                message: "Collection name is required in the request headers."
            });
        }

        // Ensure the collection name is in lowercase to match model names
        const Model = models[collection_name.toLowerCase()];
        if (!Model) {
            return res.status(400).json({
                success: false,
                message: `Invalid collection name: ${collection_name}`
            });
        }

        // Find the item to delete by ID
        const item = await Model.findById(item_id);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: `${collection_name} with ID ${item_id} not found.`
            });
        }

        // Delete the item
        await Model.findByIdAndDelete(item_id);
        res.reload
        return res.status(200).json({
            success: true,
            message: `${collection_name} with ID ${item_id} has been deleted successfully!`
        });

    } catch (error) {
        console.error("Error deleting item:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the item. Error details: " + error.message
        });
    }
};
