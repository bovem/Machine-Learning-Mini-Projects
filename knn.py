#For data manipulation
import pandas as pd
import numpy as np

#Machine Learning
from sklearn import preprocessing, neighbors
from sklearn.model_selection import train_test_split

#data munging
df = pd.read_csv('breast-cancer-wisconsin.data')
df.replace('?',-99999, inplace=True)
df.drop(['id'], 1, inplace=True) #Not dropping 'id' column can have consequences

X = np.array(df.drop(['class'], 1)) #Features
y = np.array(df['class']) #Labels

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20) #New way of cross_validation

clf = neighbors.KNeighborsClassifier() #Use n_jobs for therading
#Use time for measuring execution time

clf.fit(X_train, y_train)
accuracy = clf.score(X_test, y_test)
print(accuracy)

#Prediction
"""example_measures = np.array([4,2,1,1,1,2,3,2,1])
example_measures = example_measures.reshape(1, -1)
prediction = clf.predict(example_measures)
print(prediction)
"""
example_measures = np.array([[4,2,1,1,1,2,3,2,1],[4,2,1,1,1,2,3,2,1]])
example_measures = example_measures.reshape(len(example_measures), -1) #Reshaping because algorithm wants us to do that
prediction = clf.predict(example_measures)
print(prediction)

# TODO: kneighborsclassifier, euclidean distance formula, KNearestNeighbor algorithm
