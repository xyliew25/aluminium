function getOptimalNum(maxLength, lengthCount) {
    let res = [];
    let remainingLength = [];
    
    let lengths = Object.keys(lengthCount).map(Number).sort((a, b) => b - a);
    
    lengths.forEach(length => {
        for (let i = 0; i < lengthCount[length]; i++) {
            if (remainingLength.reduce((a, b) => a + b, 0) === 0) {
                remainingLength.push(maxLength);
                res.push([]);
            }
            let hasCut = false;
            for (let j = 0; j < remainingLength.length; j++) {
                if (remainingLength[j] >= length) {
                    remainingLength[j] -= length;
                    res[j].push(length);
                    hasCut = true;
                    break;
                }
            }
            if (!hasCut) {
                remainingLength.push(maxLength - length);
                res.push([length]);
            }
        }
    });
    
    return res;
}

function genOutput(optimalNum, maxLength) {
    let output = "";
    let totalCut = 0;
    let totalWaste = 0;
    output += `Need ${optimalNum.length} aluminium rods as follows:\n`;
    
    optimalNum.forEach((cuts, i) => {
        let cut = cuts.reduce((a, b) => a + b, 0);
        totalCut += cut;
        let waste = maxLength - cut;
        totalWaste += waste;
        output += `${i + 1}. ${JSON.stringify(cuts)} ${cut}\n`;
    });
    
    output += `Wasted ${totalWaste} in total`;
    return output;
}

document.getElementById('btn').addEventListener('click', function() {
    const maxLength = 3.3;
    const lengthCount = {
        0.42: 76,
        1.294: 6,
        1.28: 2,
        1.246: 2,
        1.245: 2,
        1.402: 12,
        1.401: 2,
        1.387: 2,
        1.482: 8,
        1.342: 6,
        1.451: 10,
        1.25: 24,
    };

    const optimalNum = getOptimalNum(maxLength, lengthCount);
    const output = genOutput(optimalNum, maxLength);
    document.getElementById('output').textContent = output;
});
