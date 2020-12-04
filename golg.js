const rows = 30;
const cols = 40;

let now =[rows];
let next =[rows];

let started=false;// Set to true when use clicks start
let timer;//To control evolutions
let evolutionSpeed=500;// One second between generations

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

function getNeighborCount(row, col) {
    let count = 0;
    let numrow=Number(row);
    let numcol=Number(col);
    
        // Check if first row
        if (numrow - 1 >= 0) {
        // Check if top neighbour
        if (now[numrow - 1][numcol] == 1) 
            count++;
    }
        // Check if in first cell
        // Upper left corner
        if (numrow - 1 >= 0 && numcol - 1 >= 0) {
        // Check upper left neighbor
        if (now[numrow - 1][numcol - 1] == 1) 
            count++;
    }
        // Make sure we are not on the first row last column
        // Upper right corner
        if (numrow - 1 >= 0 && numcol + 1 < cols) {
        //Check upper right neighbor
            if (now[numrow - 1][numcol + 1] == 1) 
                count++;
        }
    // Make sure we are not on the first column
    if (numcol - 1 >= 0) {
        //Check left neighbor
        if (now[numrow][numcol - 1] == 1) 
            count++;
    }
    // Make sure we are not on the last column
    if (numcol + 1 < cols) {
        //Check right neighbor
        if (now[numrow][numcol + 1] == 1) 
            count++;
    }
    // Make sure we are not on the bottom left corner
    if (numrow + 1 < rows && numcol - 1 >= 0) {
        //Check bottom left neighbor
        if (now[numrow + 1][numcol - 1] == 1) 
            count++;
    }
    // Make sure we are not on the bottom right
    if (numrow + 1 < rows && numcol + 1 < cols) {
        //Check bottom right neighbor
        if (now[numrow + 1][numcol + 1] == 1) 
            count++;
    }
    
    
    // Make sure we are not on the last row
    if (numrow + 1 < rows) {
        //Check bottom neighbor
        if (now[numrow + 1][numcol] == 1) 
            count++;
    }
    
    
    return count;
}

function createNext() {
    for (row in now) {
        for (col in now[row]) {
           
            let neighbors = getNeighborCount(row, col);
         
            // Check rules
            // If Alive
            if (now[row][col] == 1) {
              
                if (neighbors < 2) {
                    next[row][col] = 0;
                } else if (neighbors == 2 || neighbors == 3) {
                    next[row][col] = 1;
                } else if (neighbors > 3) {
                    next[row][col] = 0;
                }
            } 
            else if (now[row][col] == 0) {
                // If Dead or Empty
            
                if (neighbors == 3) {
                    next[row][col] = 1;
                }
            }
        }
    }
    
}

function updateNow() {
    for (row in now) {
        for (col in now[row]) {
            // Update the current generation with
            // the results of createMow function
            now[row][col] = next[row][col];
            // Set next back to empty
            next[row][col] = 0;
        }
    }
 
}

function updateWorld() {
    let cell='';
    for (row in now) {
        for (col in now[row]) {
            cell = document.getElementById(row + '_' + col);
            if (now[row][col] == 0) {
                cell.setAttribute('class', 'dead');
            } else {
                cell.setAttribute('class', 'alive');
            }
        }
    }
}

function updateAll(){
    createNext();//Apply the rules
    updateNow();//Set Current values from new generation
    updateWorld();//Update the world view

    if (started) {
        timer = setTimeout(updateAll, evolutionSpeed);
    }
}

function startStopGolg(){
    let startstop=document.querySelector('#btnstartstop');
   
    if (!started) {
       started = true;
       startstop.value='Stop GOLG';
       updateAll();
     
     } else {
        started = false;
        startstop.value='Start GOLG';
        clearTimeout(timer); 
    }
}

function resetWorld() {
    location.reload();
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