// checkbox-thick

const checkbox_collection = document.querySelectorAll("input[type='checkbox']");
const thick_box = document.querySelectorAll(".thick-box");
thick_box.forEach(function(element){
	element.addEventListener("click",function(event){
		if(element.previousElementSibling.getAttribute("checked")!=="checked"){
			element.previousElementSibling.setAttribute("checked","checked");
		} else {element.previousElementSibling.removeAttribute("checked");}
	});
});
