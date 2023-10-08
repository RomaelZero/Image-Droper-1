// Selecting all require elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file;

button.onclick = ()=>{
  input.click();
};

input.addEventListener("change", function(){
  file = this.files[0];
    console.log(file);
    showFile();
    dropArea.classList.add("active");
});

//If user drag file over DragArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault();
  // console.log("File is over DragArea");
  dropArea.classList.add("active");
  dragText.textContent = "Release to upload File";
});

//If user leave dragged file from DragArea
dropArea.addEventListener("dragleave", ()=>{
  // console.log("File is outside DragArea");
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop upload File";
 });

 //If user drop File on DropArea
 dropArea.addEventListener("drop", (event)=>{
 event.preventDefault();
//  console.log("File has been dropped on dropArea.");
  file = event.dataTransfer.files[0];
  showFile();
 });
 
function showFile() {
  let fileType = file.type;
  console.log(file);
  console.log(fileType);

  let validExtensions = ["image/jpeg","image/png","image/jpg"];
  if(validExtensions.includes(fileType)){
    let fileReader = new FileReader();//creating new FileReader object
    fileReader.addEventListener("load",(event)=>{
    let fileURL = fileReader.result; // passing user file source in fileURL variable
    console.log(fileURL);
    let imgTag = `<img src="${fileURL}"/>`; //creating an img tag and passing user selected file source inside src attribute
    dropArea.innerHTML = imgTag; //adding that create img tag inside dropArea container
  });
  
  if(file){
    fileReader.readAsDataURL(file);
  }
  
} else {
  alert("This is not an Image File");
  dropArea.classList.remove("active");
}
}