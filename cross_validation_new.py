from sklearn.model_selection import train_test_split, KFold
from sklearn import datasets
from sklearn import svm

#Normal Splitting
train, validation = train_test_split(data, test_size=0.50, random_state = 5)

#KFold
from sklearn.model_selection import KFold
kf = RepeatedKFold(n_splits=5, n_repeats=10, random_state=None)

for train_index, test_index in kf.split(X):
      print("Train:", train_index, "Validation:",test_index)
      X_train, X_test = X[train_index], X[test_index]
      y_train, y_test = y[train_index], y[test_index]
