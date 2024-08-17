def getOptimalNum(maxLength, lengthCount):
    res = []
    remainingLength = []
    for length in sorted(lengthCount, reverse=True):
        for _ in range(lengthCount[length]):
            if sum(remainingLength) == 0:
                remainingLength.append(maxLength)
                res.append([])
            hasCut = False
            for i in range(len(remainingLength)):
                if remainingLength[i] >= length:
                    remainingLength[i] -= length
                    res[i].append(length)
                    hasCut = True
                    break
            if not hasCut:
                remainingLength.append(maxLength - length)
                res.append([length])
    return res

maxLength = 3.3
lengthCount = {
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
}
optimalNum = getOptimalNum(maxLength, lengthCount)
totalCut = 0
totalWaste = 0
print(f"Need {len(optimalNum)} aluminium rods as follows:")
for i in range(len(optimalNum)):
    cut = sum(optimalNum[i])
    totalCut += cut
    waste = maxLength - cut
    totalWaste += waste
    print(f"{i + 1}. {str(optimalNum[i])} {cut:.2f}")
print(f"Wasted {totalWaste} in total")
