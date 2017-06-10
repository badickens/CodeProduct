// exercise.js

$(function() {

	
	// sample JSON string:
	// var json_str = { "title": "Github", "link": "github.com"};
	
	var json_str = "";    		// initialize JSON string
	var num_of_objs = $('.objs').length;  // tracks number of objects in exercise 2
	console.log("# of objects in view = ", num_of_objs);
	
	console.log('here');
	
	//************ Exercise 1 ************
	
	// generate javaScript object from user inputs for exercise 1
	$("#ex1").on("click", function() {
		var title = $("#title").val();
		console.log("title = ", title);
		var link = $("#url").val();
		
		json_str = '{ "title": "' + title + '", "link": "' + link + '" }';
		console.log(json_str);
		
		var convert2Obj = JSON.parse(json_str);
		//console.log(convert2Obj);
		if (title !== '' && link !== '') {   // if any of the fields are empty, don't print to output
			console.log("in output");
			var output_to_link = output_link(convert2Obj);
			var output_to_print = output_for_print(output_to_link);
		
			$('<p></p>').append(output_to_print).appendTo('#output_ex1');
		}
				
		console.log( output_to_link );
		console.log( output_to_print );
		
				
		if (title !== '' || link !== '') { 
			$("#title").val("");   // clear the title field
			$("#url").val("");     // clear the link field
		};
		
	});
	
		
	function output_link(obj) {
	
		// Converts javaScript object to link in html code
		// sample --> <a href="example.com">really, really, really long title that will be cho…</a>
		
		// test title --> "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";   // 52 chars

		if (obj.title.length > 50) {
			var new_title = obj.title.substring(0,50) + '...';
			var html_link = '<a href="' + obj.link + '">' + new_title + '</a>';
		} else {
			var html_link = '<a href="' + obj.link + '">' + obj.title + '</a>';
		}
				
		return html_link;
	}
	
	function output_for_print(str) {
	
		// Converts link in html code to a printable version in the browser view
		// sample --> <a href="example.com">really, really, really long title that will be cho…</a>
		
		var replace_lt_char = str.replace(/</g, '&lt;');
		var replace_gt_char = replace_lt_char.replace(/>/g, '&gt;'); 
		
		return replace_gt_char;
	}	

	//************ Exercise 2 ************
	
	var arr = [];   // create empty array for objects
		
	function add_default_obj_to_array() {
	
		var title0 = $("#title0").val();
		var link0 = $("#url0").val();
		
		json_str = '{ "title": "' + title0 + '", "link": "' + link0 + '" }';
		//console.log(json_str);
		
		var convert2Obj = JSON.parse(json_str);   	// converts JSON string to javaScript object);
		
		arr[0] = convert2Obj;  						// add our base object to first index
		console.log(convert2Obj);    
		console.log("array length is ", arr.length);
	}
	
	
	add_default_obj_to_array();  // initialize the first default object
	console.log("DEFAULT object is at index ", arr.indexOf(arr[0]));
	console.log("array length is ", arr.length);
	
	// Add new key/value pair fields to the view
	$("#add_obj").on("click", function() {
					
		$('<div class="objs"><p class="indent1">{</p><label class="indent2">title: </label><input type="text" class="for_remove" placeholder="Title" /><br /><label class="indent2">link: </label><input type="text" class="for_remove" placeholder="URL" /><button class="rem">X</button><label>Remove</label><p class="indent1">},</p></div>').append().appendTo("#obj_view_extended");
		
		var title = '';
		//console.log("added obj title = ", title);
		var link = '';
		//console.log("added obj link = ", link);
		var obj_id = -1;       // id not assigned yet
		
		json_str = '{ "title": "' + title + '", "link": "' + link + '", "id": ' + obj_id + ' }';
		//console.log(json_str);
		
		var convert2Obj = JSON.parse(json_str);   	// converts JSON string to javaScript object);
		
		arr.push(convert2Obj);  					// add to our object array
		//console.log(convert2Obj);
		console.log("this object is at index ", arr.indexOf(convert2Obj));
		
		obj_id = arr.indexOf(convert2Obj);   		// store current location of object in array
		arr[obj_id].id = obj_id;
		
		$('#obj_view_extended div:last-child .rem').attr('id', obj_id);  // id used to locate this object in the array if Remove button is clicked
		//console.log("Remove id = ", $('#obj_view_extended div:last-child .rem').attr('id'));
		console.log('Now ID # ' + obj_id + ' is in array location ' + obj_id);
		console.log(arr[obj_id]);
		console.log("arr = ", arr);
		num_of_objs = $('.objs').length;
		console.log("# of objects in view = ", num_of_objs);
		
		
		$(".rem").on("click", function() {   		// to remove this object when clicking the 'X'
		
			console.log('ID # ' + this.id + ' was removed');
			console.log("Before remove, length of array is ", arr.length);
			
			var obj_removed;
			for (var i = 1; i < arr.length; i++) {
				console.log("for loop in remove -> i = ", i);
				if (arr[i].id == this.id) {
					obj_removed = arr.splice(i, 1);
				}
			}
			console.log(obj_removed);			
			console.log("After remove, length of array is ", arr.length);
		
			$(this).parent().remove(); 				// remove the object from the view
				
			console.log("arr = ", arr);
				
			num_of_objs = $('.objs').length;
			console.log("# of objects in view = ", num_of_objs);
		
		});
					
	});
	
	
	// generate javaScript object from user inputs for exercise 2
	$("#ex2").on("click", function() {
	
		add_default_obj_to_array();
			
		for (var i = 0; i < arr.length; i++) {
		
			console.log("i = ", i);
			if (i != 0) {     // if not the default object (index 0) in the array 
				arr[i].title = $('#obj_view_extended div:nth-child(' + i + ') input:first').val();
				console.log("In Convert to Link - added obj title = ", arr[i].title);
				arr[i].link = $('#obj_view_extended div:nth-child(' + i + ') input:last').val();
				console.log("In Convert to Link - added obj link = ", arr[i].link);
				
				if ( arr[i].title !== '' && arr[i].link !== '' ) {  // if any of the fields are empty, don't print to output
					var output_to_link = output_link(arr[i]);    					// converts to html link
					var output_to_print = output_for_print(output_to_link);
		
					$('<p></p>').append(output_to_print).appendTo('#output_ex2');   // print to view in Output: 
				}
				
			} else {
				var title = arr[i].title;
				var link = arr[i].link;
				
				if ( title !== '' && link !== '' ) { 		 // if any of the fields are empty, don't print to output
					var output_to_link = output_link(arr[i]);    					// converts to html link
					var output_to_print = output_for_print(output_to_link);
		
					$('<p></p>').append(output_to_print).appendTo('#output_ex2');   // print to view in Output: 
			}
			}
			
			
			console.log( output_to_link );
			console.log( output_to_print );
		}
		
		$('<p></p>').append("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-").appendTo('#output_ex2');  // divides each Convert to Link
		
		
		console.log("FINAL array length is ", arr.length);
		console.log("arr = ", arr);
		
		// Clear all Title and URL fields
		if (title !== '' || link !== '') { 
			$(".for_remove").val("");   		
		}
			
	});

});




























