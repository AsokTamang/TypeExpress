def calculatecount(p, s, target):
    totalcount = 0
    m = []
    for num in p:
        m.append(num)
    for num in s:
        if target - num in m:
            totalcount += 1
    return totalcount


def solution(primary, secondary, operations):
    ans = []
    for operation in operations:
        if len(operation) == 2:
            ans.append(calculatecount(primary, secondary, operation[1]))
        elif len(operation) == 3:
            targetindex = operation[1]
            targetvalue = operation[2]
            secondary[targetindex] = (
                targetvalue  # changing the value of secondary array using the target index and value from the current
            )
    return ans
print(solution([1, 2, 2], [2, 3],  operations = [[1, 4], [0, 0, 3], [1, 5]]))