const fileInput = document.querySelector("input");
const downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e =>{
    e.preventDefault();                 //Preventing form from submitting
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
});

function fetchFile(url)
{
    // Fetching file and returning response as blob
    fetch(url).then(res => res.blob()).then(file => {
        
        // Creating a url of the passed object
        let tempURL = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempURL;
        // Passing file lastname & extension as download value of aTag
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag);        //adding aTag inside body
        aTag.click();
        aTag.remove();
        URL.revokeObjectURL(tempURL);           //removing tempURL from the document
        downloadBtn.innerText = "Download File";
    }).catch(()=>{
        fileInput.value = "";
        fileInput.validity = false;
        // Catch method will be activated if some error occured while downloading
        downloadBtn.innerText = "Download File";
        alert("Failed to Download file!\nThe Request has been denied from the server")
    });
}

