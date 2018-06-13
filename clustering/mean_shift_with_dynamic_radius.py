import matplotlib.pyplot as plt
from matplotlib import style
import numpy as np
from sklearn.datasets.samples_generator import make_blobs

style.use('ggplot')

X, y = make_blobs(n_samples=15, centers=3, n_features=2) #this genrates data blobs
##X = np.array([[1, 2],
##              [1.5, 1.8],
##              [5, 8],
##              [8, 8],
##              [1, 0.6],
##              [9, 11],
##              [8, 2],
##              [10, 2],
##              [9, 3]])


##plt.scatter(X[:, 0],X[:, 1], marker = "x", s=150, linewidths = 5, zorder = 10)
##plt.show()

'''
1. Start at every datapoint as a cluster center

2. take mean of radius around cluster, setting that as new cluster center

3. Repeat #2 until convergence.

'''



class Mean_Shift:
    def __init__(self, radius = None, radius_norm_step = 100):
        self.radius = radius
        self.radius_norm_step = radius_norm_step #bandwidth steps

    def fit(self,data):
        #if there is no radius then take centre of all data
        #calculate its distance from the origin
        #divide it with the bandwidth step
        if self.radius == None:
            all_data_centroid = np.average(data,axis=0)
            all_data_norm = np.linalg.norm(all_data_centroid)
            self.radius = all_data_norm/self.radius_norm_step
            print(self.radius)

        centroids = {} #this is going to store centroids

        for i in range(len(data)):
            centroids[i] = data[i] #every datapoint is a centroid

        #an inverted list of weights = [99,98,97,....]
        weights = [i for i in range(self.radius_norm_step)][::-1]

        while True:
            new_centroids = [] #list is going to contain new caluculated centroids
            for i in centroids: #for every point in centroid list or every datapoint
                in_bandwidth = []
                centroid = centroids[i] #selecting element

                for featureset in data: #for every datapoint

                    distance = np.linalg.norm(featureset-centroid)#distance of datapoint
                                        #from the centroid we have chosen

                    if distance == 0: #distance of centroid from itself
                        distance = 0.00000000001

                    #weight_index we are going to that datapoint
                    #depends on the distance from the centroid
                    weight_index = int(distance/self.radius)

                    #if it is outside the max steps
                    if weight_index > self.radius_norm_step-1:
                        weight_index = self.radius_norm_step-1

                    #add the squares of weight_index multiplied with
                    #that datapoint
                    to_add = (weights[weight_index]**2)*[featureset]
                    #add that to bandwidth
                    in_bandwidth +=to_add

                new_centroid = np.average(in_bandwidth,axis=0) #mean shifts to centroid
                new_centroids.append(tuple(new_centroid)) #added new centroid to the list

            uniques = sorted(list(set(new_centroids))) #to eliminate duplicate centroids

            to_pop = [] #which centroid to pop out

            for i in uniques:
                for ii in [i for i in uniques]:
                    if i == ii:
                        pass
                    #to eliminate two centroids that are really close to each other
                    elif np.linalg.norm(np.array(i)-np.array(ii)) <= self.radius:
                        #print(np.array(i), np.array(ii))
                        to_pop.append(ii)
                        break

            #pops out the centroids
            for i in to_pop:
                try:
                    uniques.remove(i)
                except:
                    pass


            prev_centroids = dict(centroids)#make a copy of older centroids
            centroids = {} #new centroid dict
            for i in range(len(uniques)): #fill dict with unique centroids
                centroids[i] = np.array(uniques[i])

            optimized = True

            for i in centroids: #if both centroids are not equal
                                #we have to run loop again
                if not np.array_equal(centroids[i], prev_centroids[i]):
                    optimized = False

            if optimized: #if they are equal then we are optimized
                break

        self.centroids = centroids
        self.classifications = {}

        for i in range(len(self.centroids)): #dict containing classifications
                                            #and datapoint corresponding to them
            self.classifications[i] = []

        for featureset in data:
            #compare distance to either centroid
            distances = [np.linalg.norm(featureset-self.centroids[centroid]) for centroid in self.centroids]
            #print(distances)
            classification = (distances.index(min(distances)))

            # featureset that belongs to that cluster
            self.classifications[classification].append(featureset)


    def predict(self,data):
        #compare distance to either centroid
        distances = [np.linalg.norm(data-self.centroids[centroid]) for centroid in self.centroids]
        classification = (distances.index(min(distances)))
        return classification



clf = Mean_Shift()
clf.fit(X)

centroids = clf.centroids
print(centroids)

colors = 10*['r','g','b','c','k','y']

for classification in clf.classifications:
    color = colors[classification]
    for featureset in clf.classifications[classification]:
        plt.scatter(featureset[0],featureset[1], marker = "x", color=color, s=150, linewidths = 5, zorder = 10)

for c in centroids:
    plt.scatter(centroids[c][0],centroids[c][1], color='k', marker = "*", s=150, linewidths = 5)

plt.show()
