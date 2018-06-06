import numpy as np
import matplotlib.pyplot as plt
from matplotlib import style
import warnings
from math import sqrt
from collections import Counter
style.use('fivethirtyeight')

dataset = {'k':[[1,2],[2,3],[3,1]], 'r':[[6,5],[7,7],[8,6]]} #raw data
new_features = [5,7] #data for prediction

#data visualisation
"""
[[plt.scatter(ii[0],ii[1],s=100,color=i) for ii in dataset[i]] for i in dataset] #Dope way of using plt.scatter
plt.scatter(new_features[0], new_features[1], s=100)

plt.show()
"""
def k_nearest_neighbors(data, predict, k=3):

    if len(data) >= k:
        warnings.warn('K is set to a value less than total voting groups!') #can have consequences

    distances = []
    for group in data:
        for features in data[group]:
            #measuring distance between both co-ordinates of k and r with [5,7] using euclidean_distance formula

            #euclidean_distance = sqrt( (features[0]-predict[0])**2 + (features[1]-predict[1])**2 )
            #euclidean_distance = np.sqrt(np.sum((np.array(features)-np.array(predict))**2))
            euclidean_distance = np.linalg.norm(np.array(features)-np.array(predict)) #euclidean_distance numpy way
            distances.append([euclidean_distance,group])
    votes = [i[1] for i in sorted(distances)[:k]] #[:k] because we needed the closest points
    #print(sorted(distances)[:k])
    vote_result = Counter(votes).most_common(1)[0][0]
    return vote_result
result = k_nearest_neighbors(dataset, new_features)
print(result)
