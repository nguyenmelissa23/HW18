/**
 * AJAX calls 
 */

/**
 * End of AJAX call 
 */

/**
 * POPUP MODAL for NOTES 
 */
// Get the modal
$(".modal").removeClass("modal-display");

$(".main-container").on("click", ".note-btn" , function(){
	var currentArticleId = $(this).attr("data-articleId");
	var thisModal = $("#modal_"+currentArticleId);
	console.log(thisModal);
	thisModal.addClass("modal-display");
	var thisSpan = $("#modalspan_" + currentArticleId);
	console.log(thisSpan);
	thisSpan.on("click", function(){
		thisModal.removeClass("modal-display");
	});
	// $('window').on("click", function (event) {
	// 	thisModal.removeClass("modal-display");
	// });
})


/**
 * End of Modal
 */

// var modal = document.getElementById('myModal');

// // Get the button that opens the modal
// var btn = document.getElementsByClassName("note-btn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal 
// btn.onclick = function () {
// 	modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
// 	modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
// 	if (event.target == modal) {
// 		modal.style.display = "none";
// 	}
// }