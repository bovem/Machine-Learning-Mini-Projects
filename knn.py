import pandas as pd
import numpy as np
from sklearn import preprocessing, neighbors
from sklearn.model_selection import train_test_split

df = pd.read_csv('breast-cancer-wisconsin.data')
df.replace('?',-99999, inplace=True)
df.drop(['id'], 1, inplace=True) #Not dropping 'id' column can have staggering consequences

X = np.array(df.drop(['class'], 1)) #Features
y = np.array(df['class']) #Labels

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20)

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
example_measures = example_measures.reshape(len(example_measures), -1)
prediction = clf.predict(example_measures)
print(prediction)
