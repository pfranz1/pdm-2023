const data = [
    ['Apples', 10],
    ['Bananas', 2],
    ['Carrots', 5],
    ['Dates', 1],
    ['Eggplant', 3],
    ['Figs', 1],
    ['Gourds', 1],
];

var total = null;

function makeChain(data){
    function next(){
        //https://blobfolio.com/2019/randomizing-weighted-choices-in-javascript/
        const threshold = Math.random() * total;
    
       let runningTotal = 0;
        for (let i = 0; i < data.length - 1; ++i) {
        // Add the weight to our running total.
        runningTotal += data[i][1];
    
        // If this value falls within the threshold, we're done!
            if (runningTotal >= threshold) {
                return data[i][0];
            }
        }
    
        // Wouldn't you know it, we needed the very last entry!
        return data[data.length - 1][0];
    }

    var total = 0;
    for (let i = 0; i < data.length; ++i) {
        total += data[i][1];
    }

    return () => next();

}




