const forms = document.querySelectorAll("form[data-validate]");
const validated_inputs = document.querySelectorAll("form[data-validate] input[data-validate-rules]");

	const validate_type = {
		reset_validation: function(element){
			element.parentElement.classList.remove("error-field");
			element.parentElement.classList.remove("error-checkbox");
			//document.querySelectorAll(".validation_info").forEach(function(element){element.innerHTML=""});
		},
		required: function(element){
			const validate_info = element.parentNode.nextElementSibling;
			validate_info.innerText="";
			if(/^\s*$/.test(element.value)==true){
				validate_info.insertAdjacentHTML("beforeend","<p class='validation_details'>This field is required</p>");
				element.parentElement.classList.add("error-field");
			} else {
				if(element.parentElement.classList=="error-field"){
					return;
				}
			} 
		},
		minimum_length_5: function(element){
			const validate_info = element.parentNode.nextElementSibling;
			if(element.value.length<5){
				validate_info.insertAdjacentHTML("beforeend","<p class='validation_details'>This field must not contain less than 5 signs</p>");
				element.parentElement.classList.add("error-field");
			} else {
				if(element.parentElement.classList=="error-field"){
					return;
				}
			} 
		},
		max_length_15: function(element){
			const validate_info = element.parentNode.nextElementSibling;
			if(element.value.length>15){
				validate_info.insertAdjacentHTML("beforeend","<p class='validation_details'>This field must not contain more than 15 signs</p>");
				element.parentElement.classList.add("error-field");
			} else {
				if(element.parentElement.classList=="error-field"){
					return;
				}
			} 
		},
		max_length_30: function(element){
			const validate_info = element.parentNode.nextElementSibling;
			if(element.value.length>30){
				validate_info.insertAdjacentHTML("beforeend","<p class='validation_details'>This field must not contain more than 30 signs</p>");
				element.parentElement.classList.add("error-field");
			} else {
				if(element.parentElement.classList=="error-field"){
					return;
				}
			} 
		},
		email_pattern: function(element){
			const validate_info = element.parentNode.nextElementSibling;
			if(element.value!=""&&element.value.search(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)==-1||element.value==0){
				validate_info.insertAdjacentHTML("beforeend","<p class='validation_details'>Invalid email pattern</p>");
				element.parentElement.classList.add("error-field");
			} else {
				if(element.parentElement.classList=="error-field"){
					return;
				}
			} 
		},
		contain_number: function(element){
			const validate_info = element.parentNode.nextElementSibling;
			if(element.value.search( /\d{1}/)==-1){
				validate_info.insertAdjacentHTML("beforeend","<p class='validation_details'>Password must contain at least one digit</p>");
				element.parentElement.classList.add("error-field");
			} else {
				if(element.parentElement.classList=="error-field"){
					return;
				}
			} 
		},
		no_special_char: function(element){
			const validate_info = element.parentNode.nextElementSibling;
			if(/[\-\[\]\/\\,\\\{\}\(\)\*\+\?\.\^\$\|]/.test(element.value)==true){
				validate_info.insertAdjacentHTML("beforeend","<p class='validation_details'>This field should not contain any special characters or symbols</p>");
				element.parentElement.classList.add("error-field");
			} else {
				if(element.parentElement.classList=="error-field"){
					return;
				}
			} 
		},
		same_password: function(element){
			const validate_info = element.parentNode.nextElementSibling;
			if(element.value!==document.getElementById('password').value){
				validate_info.insertAdjacentHTML("beforeend","<p class='validation_details'>This is not your password</p>");
				element.parentElement.classList.add("error-field");
			} else {
				if(element.parentElement.classList=="error-field"){
					return;
				}
			}
		},
		checked: function(element){
			const validate_info = element.parentNode.nextElementSibling;
			validate_info.innerText="";
			if(element.getAttribute("checked")!=="checked"){
				validate_info.insertAdjacentHTML("beforeend","<p class='validation_details'>You have to accept the terms of use</p>");
				element.parentElement.classList.add("error-checkbox");
			} else {
				return;
			}
		},
		selected: function(element){
			const validate_info = element.parentNode.nextElementSibling;
			if(element.getAttribute.checked=="checked"){
				validate_info.insertAdjacentHTML("beforeend","<p class='validation_details'>This field should not contain more than 40 characters</p>");
				element.parentElement.classList.add("error-field");
			} else {
				if(element.parentElement.classList=="error-field"){
					return;
				}
			}
		}
	};

validated_inputs.forEach(function(element){element.parentNode.insertAdjacentHTML("afterend","<div class='validation_info'></div>")});

// validation on change for each input (with data validate rules)

for(let i=0;i<validated_inputs.length;i++){
	validated_inputs[i].addEventListener("change", function(){
		const attributes = validated_inputs[i].getAttribute("data-validate-rules").split(",");
		for(let index=0;index<attributes.length;index++){
			if(typeof validate_type[attributes[index]]==="function"){
				validate_type[attributes[index]](validated_inputs[i]);
			};
		};
	});
};

// validation on submit

forms.forEach(function(element){
	const inputs_to_final_validation = element.querySelectorAll("input[data-validate-rules]");
	const submit_button = element.querySelector("input[type=submit]");
	submit_button.addEventListener("click",function(event){
		event.preventDefault();
		for(let i=0;i<inputs_to_final_validation.length;i++){
			const attributes = inputs_to_final_validation[i].getAttribute("data-validate-rules").split(",");
			for(let index=0;index<attributes.length;index++){
				if(typeof validate_type[attributes[index]]==="function"){
				validate_type[attributes[index]](inputs_to_final_validation[i]);
				};
			};
		};
		let is_valid;
		document.querySelectorAll(".validation_info").forEach(function(element){
			if(element.textContent!=""){
				is_valid = false;
			};
		});
		if(is_valid == false){
			alert("formularz zawiera puste lub nieprawidłowo wypełnione pola")
		} else {alert("formularz gotowy do wysłania")
		//miejsce na kod z funkcją wysyłającą formularz na serwer
		};
	});
});


