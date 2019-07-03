import quandl #To get stocks data
import pandas as pd #Making dataframes
from sklearn import svm, cross_validation, preprocessing
#
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

df.to_csv('GOOGL.csv')
