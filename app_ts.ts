//PaintJS in TypeScript

const canvas = <HTMLCanvasElement> document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const brushSize = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
//캔버스 요소는 css에서 그려지는 사이즈와, 내부에 픽셀 해상도에대한 크기, 2개의 크기를 받아야한다
canvas.width = 700;
canvas.height = 700;
//선의 해상도에 대한 공부가 필요할듯

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function startPainting(){
    painting = true;
}
interface ArrayConstructor{
    from(arrayLike: any, mapFn?, thisArg?): Array<any>;
}
//마우스 좌표 가져옴
function onMouseMove(event){
    const x = event.offsetX; //client좌표는 전체 윈도우에 대한 좌표, offset은 내부에 대한 좌표
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        //ctx.moveTo(x, y);
    }else{
        console.log(`drawing ${x} ${y} to`);
        ctx.lineTo(x,y);
        ctx.stroke();
        console.log(`${x} ${y}`);
    }
}

function handleSaveClick(){
    //이미지 url 생성
    const image = canvas.toDataURL("image/jpeg");
    //앵커 태그를 만들어서 다운로드를 구현
    const link = document.createElement("a");
    link.href = image;
    //image 다운로드URL 하이퍼 링크
    link.download = "PaintJS";
    //파일명
    link.click();
}

function changeColor(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
}
function stopPainting(){
    painting=false;
}

function onMouseLeave(event){
    stopPainting();
}
function changeBrushSize(event){
    ctx.lineWidth = event.target.value;
    console.log(ctx.lineWidth);  
}
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

if(brushSize){
    brushSize.addEventListener("input",changeBrushSize);
}

//자식들에 게 각각의 이벤트 리스너를 만들어준다
Array.from('colors').forEach(color=> addEventListener("click",changeColor));