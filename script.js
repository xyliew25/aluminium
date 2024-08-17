function parseMaxLength() {
    const maxLength = parseFloat(document.getElementById('maxLengthInput').value);
    if (isNaN(maxLength) || maxLength < 0) {
        alert('Please enter a valid number for aluminium length.');
        return -1;
    }
    return maxLength;
}

function parseLengthCount(content) {
    const lines = content.trim().split('\n');
    const lengthCount = {};
    lines.forEach(line => {
        const [length, count] = line.split(',').map(Number);
        lengthCount[length] = count;
    });
    return lengthCount;
}

document.getElementById('btn').addEventListener('click', function() {
    const file = document.getElementById('fileInput').files[0];
    if (!file) {
        alert('Please upload a valid file.');
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        const maxLength = parseMaxLength();
        if (maxLength === -1) {
            return;
        }
        const lengthCount = parseLengthCount(e.target.result);
        const output = genOptimalNumOutput(maxLength, lengthCount);
        document.getElementById('output').textContent = output;
    };
    reader.readAsText(file);
});
