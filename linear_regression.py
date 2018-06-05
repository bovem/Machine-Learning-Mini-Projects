import quandl #To get stocks data
import pandas as pd #Making dataframes
from sklearn import svm, cross_validation, preprocessing
import pickle#
from sklearn.linear_model import LinearRegression
import numpy as np #For manipulating arrays
import math #For math things (calculating 1%)

df = quandl.get('WIKI/GOOGL') #Gets data for GOOGL

#We'll remove regular column for adjusted columns because of stock thing(split)
df = df[['Adj. Open','Adj. Close','Adj. Low','Adj. High','Adj. Volume']]

#High-Low percentage
df['HL_PCT'] = (df['Adj. High'] - df['Adj. Low']) / df['Adj. Close'] * 100.0

#Percentage change everyday
df['PCT_change'] = (df['Adj. Close'] - df['Adj. Open']) / df['Adj. Open'] * 100.0

#New dataframe
df = df[['Adj. Close', 'HL_PCT', 'PCT_change', 'Adj. Volume']]


forecast_col = 'Adj. Close' #Column we'll use to forecast values
df.fillna(value=-99999, inplace=True) #We fill null values with -99999 beacause algorithm will consider it as outlier now
forecast_out= int(math.ceil(0.01*len(df))) #We just need 1% of our observations
df['label'] = df[forecast_col].shift(-forecast_out)

#We drop any null values
df.dropna(inplace=True)

#We filter out everything except label
X=np.array(df.drop(['label'],1)) #Indexed at 1 because we don't need column labels

#We filter out label
Y=np.array(df['label'])

#Preprocessing before feeding data to machine
X=preprocessing.scale(X)
y=np.array(df['label'])

#Using Cross validation for random jumbling data such that model isn't bias
X_train, X_test, y_train, y_test = cross_validation.train_test_split(X, y, test_size=0.2)

clf = svm.SVR()
with open('linearregression.pickle','wb') as f:
    pickle.dump(clf, f)
#Trying different kernels for classifier and calculating confidence score

#clf = svm.SVR(kernel=k)
"""clf.fit(X_train, y_train)
confidence = clf.score(X_test, y_test)
print(k,confidence)"""
pickle_in = open('linearregression.pickle','rb')
clf = pickle.load(pickle_in)
"""
clf.fit(X_train,  y_train)
confidence = clf.score(X_test, y_test)

print(confidence)"""
print(confidence)
