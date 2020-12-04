const rows = 50;
const cols = 50;

let now =[rows];
let next =[rows];

//OnClick function
function cellClick() {
    let loc = this.id.split("_");
    let row = Number(loc[0]);//Get i
    let col = Number(loc[1]);//Get j
    // Toggle cell alive or dead
    if (this.className==='alive'){
        this.setAttribute('class', 'dead');
        now[row][col] = 0;
       
    }else{
        this.setAttribute('class', 'alive');
        now[row][col] = 1;
    }
}

// Declares two-dimensional arrays
function declareArrays() {
    for (let i = 0; i < rows; i++) {
        now[i] = new Array(cols);
        next[i] = new Array(cols);
    }
}

//Intiliazes the 2 arrays to 'Dead'
function initArrays() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            now[i][j] = 0;
            next[i][j] = 0;
        }
    }
}

function createWorld(){
    let world = document.querySelector('#world');

    let tableh = document.createElement('table');
    tableh.setAttribute('id', 'worldgrid');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('id', i + '_' + j);
            cell.setAttribute('class', 'dead');
            cell.addEventListener('click',cellClick);         
                 
            tr.appendChild(cell);
        }
        tableh.appendChild(tr);
    }
    world.appendChild(tableh);
}

window.onload = () =>{
    createWorld();
    declareArrays();
    initArrays();
}