

/*
OVERVIEW

 The user uses the radio buttons to   
to predict  the model on the submitted images.

*/

//############################

// PAGE LOAD

//############################


BREAST_CANCER_MODEL_SELECTED = 'yes';

// show the text showing which model is active
$('.breast-cancer').show();



//############################

// RADIO BUTTON CHANGE EVENTS

//############################

// This change event fires when the breast_cancer option is selected.

$('#breast_cancer_input').change(function(){
	
	//console.log('breast_cancer');
	
	BREAST_CANCER_MODEL_SELECTED = 'yes';
	
	
	// Show the message saying which analyzer is active.
	$('.breast-cancer').show();
});


//#############################################################






// BREAST CANCER MODEL
// load the model


let breast_cancer_model;
(async function () {
	
	breast_cancer_model = await tf.loadModel("idc_model_v1/model.json");
	$("#selected-image").attr("src", "assets/normal.png");
	
	// Hide the model loading spinner
	$('.progress-bar').hide();
	$('.breast-cancer').show();
	breast_cancer_predictOnLoad();
})();

	


// ### 2. MAKE A PREDICTION ON THE FRONT PAGE IMAGE WHEN THE PAGE LOADS

//######################################################################

// After the model loads we want to make a prediction on the default image.
// Thus, the user will see predictions when the page is first loaded.

function simulateClick(tabID) {
	
	document.getElementById(tabID).click();
}

function breast_cancer_predictOnLoad() {
	
	// Simulate a click on the predict button
	setTimeout(simulateClick.bind(null,'predict-button'), 500);
}



// This make a idc_cancer prediction when the page loads.
// idc cancer model images have size 50x50
$("#predict-button").click(async function () {
	
	let image = undefined;
	
	image = $('#selected-image').get(0);
	
	// Pre-process the image
	let tensor = tf.fromPixels(image)
	.resizeNearestNeighbor([50,50]) // change the image size here
	.toFloat()
	.div(tf.scalar(255.0))
	.expandDims();
	
	
	// Pass the tensor to the model and call predict on it.
	// Predict returns a tensor.
	// data() loads the values of the output tensor and returns
	// a promise of a typed array when the computation is complete.
	// Notice the await and async keywords are used together.
	let predictions = await breast_cancer_model.predict(tensor).data();
	let top5 = Array.from(predictions)
		.map(function (p, i) { // this is Array.map
			return {
				probability: p,
				className: BREAST_CANCER_CLASSES[i]
			};
				
			
		}).sort(function (a, b) {
			return b.probability - a.probability;
				
		}).slice(0, 2);
	

		// Append the file name to the prediction list
		var file_name = 'default_image.png';
		$("#prediction-list").append(`<li class="w3-text-teal">${file_name}</li>`);
		
		//$("#prediction-list").empty();
		top5.forEach(function (p) {
		
			$("#prediction-list").append(`<ol>${p.className}: ${p.probability.toFixed(6)}</ol>`);
		
			
		});
	
	
});




// Code that will be executed when the user submits images.

// The code below directs the execution to the breast_cancer_analyzer.js

//##########################################################


// This listens for a change. It fires when the user submits images.

$("#image-selector").change(async function () {
	
	
	// if the breast cancer radio button was selected
	// The variable value was set above by a change event.
	if (BREAST_CANCER_MODEL_SELECTED === 'yes') {
	
		// the FileReader reads one image at a time
		fileList = $("#image-selector").prop('files');
		
		//$("#prediction-list").empty();
		
		// Start predictiing
		breast_processArray(fileList);
	}
    

	
});





