document.addEventListener('DOMContentLoaded', function() {
    // Get modal and form elements
    const modal = document.getElementById('editReviewModal');
    const form = document.getElementById('editReviewForm');
    const cancelButton = modal.querySelector('.cancel-button');
    
    // Add edit buttons to all reviews
    const reviews = document.querySelectorAll('.review-container');
    reviews.forEach(review => {
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fa fa-pencil"></i>';
        editButton.className = 'edit-review-button';
        review.appendChild(editButton);
    });

    // Current review being edited
    let currentReview = null;

    // Add click event listeners to all edit buttons
    document.querySelectorAll('.edit-review-button').forEach(button => {
        button.addEventListener('click', function(e) {
            currentReview = e.target.closest('.review-container');
            // Extract just the number from the rating text
            const ratingText = currentReview.querySelector('.star-rating').textContent.trim();
            const rating = parseInt(ratingText.match(/\d+/)[0]);
            const description = currentReview.querySelector('.description').textContent.trim();
            
            // Populate form with current values
            document.getElementById('editRating').value = rating;
            document.getElementById('editReviewText').value = description;
            
            // Show modal
            modal.style.display = 'block';
        });
    });

    // Handle form submission
     form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (currentReview) {
            const newRating = document.getElementById('editRating').value;
            const newText = document.getElementById('editReviewText').value;
            
            // Update review content
            currentReview.querySelector('.star-rating').innerHTML = 
                `<img class="star-icon-review" src="../../icons/star.png" alt="star icon"> ${newRating}`;
            currentReview.querySelector('.description').textContent = newText;
            
            // Add edited tag if not present, in the correct position
            if (!currentReview.querySelector('.edit-tag')) {
                const editTag = document.createElement('div');
                editTag.className = 'edit-tag';
                editTag.textContent = 'edited';
                
                // Find the voting div to use as a reference point
                const voteDiv = currentReview.querySelector('.vote');
                // Insert the edit tag before the voting div
                currentReview.insertBefore(editTag, voteDiv);
            }
        }
        
        modal.style.display = 'none';
    });

    // Handle cancel button
    cancelButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});