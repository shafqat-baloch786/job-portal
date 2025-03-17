function delete_item(collection_name, item_id) {
    // Showing confirmation prompt
    const confirmation = confirm(`Are you sure you want to delete this ${collection_name}?`);
    console.log("Collection", collection_name);
    console.log("Id", item_id);
    if (confirmation) {
        // Making AJAX request to delete item
        $.ajax({
            url: `/${collection_name}/${item_id}`,
            type: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'collection': collection_name,
            },
            success: function(response) {
                if (response.success) {
                    alert(`${collection_name} deleted successfully!`);
                    location.reload();

                    $(`#${item_id}`).remove();
                } else {
                    // Show the exact error message returned from the backend
                    alert(`Error: ${response.message}`);
                }
            },
            error: function(xhr, status, error) {
                console.log("Errorrrrrrr", error);

                // Show the exact error message from the backend
                const errorMessage = xhr.responseJSON ? xhr.responseJSON.message : 'An unexpected error occurred while deleting the item.';
                alert(`Error: ${errorMessage}`);
            }
        });
    }
}
