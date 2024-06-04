var textColor = document.querySelector("#text-color-picker");
var bgColor = document.querySelector("#bg-color-picker");
var fontSize = document.querySelector("#font-size-picker");
var canvas = document.querySelector("#draw-area");
var action = document.querySelector(".act-btn-container");
var canvasContext = canvas.getContext("2d");
var lastX = 0, lastY = 0, isDrawing = false;

// default setup
canvasContext.strokeStyle = textColor.value;
canvasContext.lineWidth = fontSize.value;

textColor.addEventListener("change", ()=>{
    canvasContext.strokeStyle = textColor.value;
})


fontSize.addEventListener("change", (e)=>{
    canvasContext.lineWidth = e.target.value;
})

bgColor.addEventListener("change", ()=>{
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = bgColor.value;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
})


canvas.addEventListener("mousedown", (e)=>{
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
})

canvas.addEventListener("touchdown", (e)=>{
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
})

canvas.addEventListener("mousemove", (e)=>{
    if(isDrawing) {
        canvasContext.beginPath();
        canvasContext.moveTo(lastX, lastY);
        canvasContext.lineTo(e.offsetX, e.offsetY);
        canvasContext.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    } else {
        return;
    }
})

canvas.addEventListener("touchmove", (e)=>{
    if(isDrawing) {
        canvasContext.beginPath();
        canvasContext.moveTo(lastX, lastY);
        canvasContext.lineTo(e.offsetX, e.offsetY);
        canvasContext.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    } else {
        return;
    }
})

canvas.addEventListener("mouseup", ()=>{
    isDrawing = false;
    canvasContext.closePath();
})

canvas.addEventListener("touchup", ()=>{
    isDrawing = false;
    canvasContext.closePath();
})

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    canvasContext.closePath();
});

canvas.addEventListener('touchout', () => {
    isDrawing = false;
    canvasContext.closePath();
});

actionListeners = {
    clear: ()=>{
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    },
    save: ()=>{
        localStorage.setItem("canvasContext", canvas.toDataURL());
        let downloadLink = document.createElement('a');
        downloadLink.download = "signature.png";
        // base64 image format
        downloadLink.href = canvas.toDataURL();
        downloadLink.click();
        // clean-up
        downloadLink.remove();
    },
    retrieve: function(){
        this.clear();
        let canvasData = localStorage.getItem("canvasContext");
        // draw img data on canvas
        if(canvasData){
            let img = new Image();
            img.src = canvasData;
            canvasContext.drawImage(img, 0, 0)
        }
    }
}

action.addEventListener("click", (e)=>{
    switch(e.target.value){
        case "clear canvas": actionListeners.clear();
        break;
        case "save signature": actionListeners.save();
        break
        case "retrieve signature": actionListeners.retrieve();
    }
})