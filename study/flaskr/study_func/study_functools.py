"""Learn function attributes"""
# 1. build-in function don't have func_name attribute, __name__ and func_name all can be change,
# not readonly attribute
try:
    # print len.func_name
    temp = len.func_name
except AttributeError as e:
    # print e
    pass
# print len.__name__
# print foo_7.__name__
# print foo_7.func_name
# foo_7.__name__ = 'haha'
# print foo_7.__name__

# 2. module name
# print len.__module__
# print foo_7.__module__

# 3. func_globals record all global variables, readonly attribute
# print foo_7.func_globals

# func_dict, please use __dict__, pyhton 3 don't have func_dict attribute
# print foo_7.func_dict


msg = "Function: [{}], Attr: [{}], Value: [{}]"

def print_all(func, *args):
    print '**************************************'

    for attr in args:
        print msg.format(func.__name__, attr, getattr(func.__code__, attr))

    print '**************************************\n'




a = 5
def foo():
    global a
    a = 4

# if use global statement, a will go to co_names as a external module
# print_all(foo, 'co_varnames', 'co_nlocals', 'co_names', 'co_name')
# print_all(foo, 'co_cellvars', 'co_freevars', 'co_consts')


# task: learn partial
from functools import partial

def foo_7(a, b, c):
    return a + b + c

foo_8 = partial(foo_7, a='haha')
