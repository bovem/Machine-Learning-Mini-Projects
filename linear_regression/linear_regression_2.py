import quandl #To get stocks data
import pandas as pd #Making dataframes
from sklearn import svm, cross_validation, preprocessing
#
from sklearn.linear_model import LinearRegression
import numpy as np #For manipulating arrays
import math #For math things (calculating 1%)

df = pd.read_csv('GOOGL.csv', index_col='Date')

forecast_col = 'Adj. Close' #Column we'll use to forecast values
df.fillna(value=-99999, inplace=True) #We fill null values with -99999 beacause algorithm will consider it as outlier now
forecast_out= int(math.ceil(0.01*len(df))) #We just need 1% of our observations
df['label'] = df[forecast_col].shift(-forecast_out)

#We filter out everything except label
X = np.array(df.drop(['label'], 1))
X = preprocessing.scale(X)
X_lately = X[-forecast_out:]
X = X[:-forecast_out]
 #Indexed at 1 because we don't need column labels

#We filter out label
Y=np.array(df['label'])

#Preprocessing before feeding data to machine
X=preprocessing.scale(X)
y=np.array(df['label'])

#Using Cross validation for random jumbling data such that model isn't bias
X_train, X_test, y_train, y_test = cross_validation.train_test_split(X, y, test_size=0.2)


clf = LinearRegression(n_jobs=-1)
clf.fit(X_train, y_train)
confidence = clf.score(X_test, y_test)
print(confidence)
