from statistics import mean
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import style
style.use('ggplot')

xs = np.array([1,2,3,4,5], dtype=np.float64)
ys = np.array([5,4,6,5,6], dtype=np.float64)

def best_fit_slope(xs, ys):
    m = ( (mean(xs) * mean(ys)) - mean(xs*ys) ) / (mean(xs)**2 - mean(xs*xs))
    return m

m = best_fit_slope(xs,ys)
print("Slope: {}".format(m))

#y = mx + b
#b = y - mx

def y_intercept(xs,ys,m):
    b = mean(ys) - m*mean(xs)
    return b
b = y_intercept(xs,ys,m)
print("y_intercept: {}".format(b))

regression_line = [m*x + b for x in xs]

"""
predict_x = 7
predict_y = (m*predict_x)+b
print(predict_y)
plt.scatter(xs,ys,color='#003F72',label='data')
plt.plot(xs, regression_line, label='regression line')
plt.scatter(predict_x, predict_y, label='prediction', color='Green')
plt.legend(loc=4)
plt.show()"""

def squared_error(ys_orig,ys_line):
    return sum((ys_line - ys_orig) * (ys_line - ys_orig))

def coefficient_of_determination(ys_orig,ys_line):
    y_mean_line = [mean(ys_orig) for y in ys_orig]
    squared_error_regr = squared_error(ys_orig, ys_line)
    squared_error_y_mean = squared_error(ys_orig, y_mean_line)
    return 1 - (squared_error_regr/squared_error_y_mean)

r_squared = coefficient_of_determination(ys,regression_line)
print("Coefficient of Determination: {}".format(r_squared))
# TODO: linear regression, classifiers, cross validation, slope and intercept, mean sqaured error, coefficient of determination

    
