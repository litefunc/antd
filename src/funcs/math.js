export {mean, stdev, normalize}

function mean(data){
    var sum = data.reduce(function(sum, value){
        return sum + value;
    }, 0);
    
    var avg = sum / data.length;
    return avg;
    }

function stdev(values){
    var avg = mean(values);
    
    var squareDiffs = values.map(function(value){
      var diff = value - avg;
      var sqrDiff = diff * diff;
      return sqrDiff;
    });
    
    var avgSquareDiff = mean(squareDiffs);
  
    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

function normalize(values) {
    let m = mean(values);
    let std = stdev(values);
    return values.map(x => (x-m)/std);
}
  
