function parseCSV(content) {
    const lines = content.trim().split('\n');
    const lengthCount = {};

    lines.forEach(line => {
        const [length, count] = line.split(',').map(Number);
        lengthCount[length] = count;
    });

    return lengthCount;
}

const maxLength = 3.3;

document.getElementById('btn').addEventListener('click', function() {
    const file = document.getElementById('fileInput').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const lengthCount = parseCSV(content);
            const optimalNum = getOptimalNum(maxLength, lengthCount);
            const output = genOutput(optimalNum, maxLength);
            document.getElementById('output').textContent = output;
        };
        reader.readAsText(file);
    }
});
