"use strict";

var runFieldService = {
	init: function() {
		var uiForm = document.querySelector('#field-service-form');
		var uiButton = document.querySelector('#field-service-save');

		/*addEvent(uiButton, 'click', function(event) {
			//console.log('Clicked!');
      event.preventDefault();
			processChoices(uiForm);
		});*/

    // VALIDATION BEGIN
    // These are the constraints used to validate the form
    var constraints = {
      inputLabel: {
        // You need to pick a label
        presence: true,
        // And it must be between 3 and 20 characters long
        length: {
          minimum: 3,
          maximum: 20
        }
      }
    }

    var form = uiForm;
    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      if ( handleFormSubmit(form) ) {
        processChoices(form);
      };
    });

    function handleFormSubmit(form, input) {
      // validate the form aainst the constraints
      var errors = validate(form, constraints);
      // then we update the form to reflect the results
      showErrors(form, errors || {});
      if (!errors) {
        //showSuccess();
        return true;
      }
    }

    // Updates the inputs with the validation errors
    function showErrors(form, errors) {
      // We loop through all the inputs and show the errors for that input
      _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
        // Since the errors can be null if no errors were found we need to handle
        // that
        showErrorsForInput(input, errors && errors[input.name]);
      });
    }

    // Shows the errors for a specific input
    function showErrorsForInput(input, errors) {
      // This is the root of the input
      var formGroup = closestParent(input.parentNode, "form-group")
        // Find where the error messages will be insert into
        , messages = formGroup.querySelector(".messages");
      // First we remove any old messages and resets the classes
      resetFormGroup(formGroup);
      // If we have errors
      if (errors) {
        // we first mark the group has having errors
        formGroup.classList.add("has-error");
        // then we append all the errors
        _.each(errors, function(error) {
          addError(messages, error);
        });
      } else {
        // otherwise we simply mark it as success
        formGroup.classList.add("has-success");
      }
    }

    // Recusively finds the closest parent that has the specified class
    function closestParent(child, className) {
      if (!child || child == document) {
        return null;
      }
      if (child.classList.contains(className)) {
        return child;
      } else {
        return closestParent(child.parentNode, className);
      }
    }

    function resetFormGroup(formGroup) {
      // Remove the success and error classes
      formGroup.classList.remove("has-error");
      formGroup.classList.remove("has-success");
      // and remove any old messages
      _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
        el.parentNode.removeChild(el);
      });
    }

    // Adds the specified error with the following markup
    // <p class="help-block error">[message]</p>
    function addError(messages, error) {
      var block = document.createElement("p");
      block.classList.add("help-block");
      block.classList.add("error");
      block.innerText = error;
      messages.appendChild(block);
    }

    function showSuccess() {
      // We made it \:D/
      alert("Success!");
    }
    // VALIDATION END

	}
}

function processChoices(form) {
  var obj = {};
  // Select all list items in choices field and convert to JSON
 	var arr1 = Array.from(document.querySelectorAll('[data-val]'));
  arr1.map(function(el, index) {
    return obj[el.dataset.val] = el.textContent;
  });
  var jsonData = JSON.stringify(obj);
	//console.log(arr1); console.log(arr2); console.log(jsonData);

	validate({}, {inputLabel: {presence: {message: "^You must enter a label"}}});

 	//return jsonData;
	FieldService.saveField(jsonData);
}

//https://plainjs.com/javascript/ajax/send-ajax-get-and-post-requests-47/
function postAjax(url, data, success) {
  var params = typeof data == 'string' ? data : Object.keys(data).map(
          function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
      ).join('&');

  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open('POST', url);
  xhr.onreadystatechange = function() {
      if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  return xhr;
}

function getAjax(url, success) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
      if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send();
  return xhr;
}

// example request
//getAjax('http://foo.bar/?p1=1&p2=Hello+World', function(data){ console.log(data); });

// Binding and unbinding of event handlers
function addEvent(el, type, handler) {
    if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
}
function removeEvent(el, type, handler) {
    if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
}


(function(){
	// Document is ready
	// if document is already rendered
	if (document.readyState!='loading') runFieldService.init();
	// modern browsers
	else if (document.addEventListener) document.addEventListener('DOMContentLoaded', runFieldService.init);
	// IE <= 8
	else document.attachEvent('onreadystatechange', function(){
	    if (document.readyState=='complete') runFieldService.init();
	});
})();
